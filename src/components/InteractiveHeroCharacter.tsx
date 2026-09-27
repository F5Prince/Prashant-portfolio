import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { eyePathFrame, frameIndexForAngle, lerpAngle, pointerAngle } from '../utils/angle'
import { isFrameManifest, loadFrameSet, loadImage } from '../utils/frames'

type Props = {
  className?: string
  /** Share of the shorter viewport side. Kept inside the 8–15% band. */
  deadzoneRatio?: number
  /** Shortest-angle smoothing. Responsive without snapping. */
  lerpFactor?: number
  /** Face position inside the character box, as width/height fractions. */
  faceAnchor?: { x: number; y: number }
  /** Rotate the frame map if the extracted sequence faces the wrong way. */
  angleOffset?: number
}

const TRACK_QUERY = '(hover: hover) and (pointer: fine) and (min-width: 768px)'

export function InteractiveHeroCharacter({
  className = '',
  deadzoneRatio = 0.12,
  lerpFactor = 0.22,
  faceAnchor = { x: 0.5, y: 0.34 },
  angleOffset = 0,
}: Props) {
  const boxRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canTrack = useMediaQuery(TRACK_QUERY)
  const reduce = useReducedMotion()
  const [fallback, setFallback] = useState<'pending' | 'photo' | 'monogram'>('pending')

  useEffect(() => {
    const box = boxRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!box || !canvas || !context) return

    let cancelled = false
    let frameId = 0
    let visible = true
    let frames: HTMLImageElement[] = []
    let center: HTMLImageElement | null = null
    let photo: HTMLImageElement | null = null
    let drawn: CanvasImageSource | null = null
    let mapping: 'circle' | 'eye-path' = 'circle'
    const pointer = { x: 0, y: 0, seen: false }
    const motion = { current: 0, target: 0, deadzone: true }

    const warn = (message: string) => {
      if (import.meta.env.DEV) console.warn(`[hero] ${message}`)
    }

    const resize = () => {
      const rect = box.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = Math.max(1, Math.round(rect.width * dpr))
      const height = Math.max(1, Math.round(rect.height * dpr))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        drawn = null
      }
    }

    const paint = (image: HTMLImageElement | null) => {
      if (!image || image.width === 0) return
      if (drawn === image) return
      context.setTransform(1, 0, 0, 1, 0, 0)
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.imageSmoothingEnabled = true
      context.imageSmoothingQuality = 'high'
      const scale = Math.min(canvas.width / image.width, canvas.height / image.height)
      const width = image.width * scale
      const height = image.height * scale
      context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height)
      drawn = image
    }

    const settleFrame = () => {
      const idle = !canTrack || reduce || motion.deadzone || !pointer.seen || frames.length === 0
      if (idle) return { image: center ?? frames[0] ?? photo, moving: false }
      const previous = motion.current
      motion.current = lerpAngle(motion.current, motion.target, lerpFactor)
      const delta = Math.abs(((motion.current - previous + 540) % 360) - 180)
      const index =
        mapping === 'eye-path'
          ? eyePathFrame(motion.current + angleOffset)
          : frameIndexForAngle(motion.current, frames.length, angleOffset)
      const image = frames[index] ?? center
      return { image, moving: delta > 0.25 }
    }

    const tick = () => {
      frameId = 0
      if (cancelled || !visible || document.hidden) return
      resize()

      if (canTrack && !reduce && pointer.seen) {
        const rect = box.getBoundingClientRect()
        const faceX = rect.left + rect.width * faceAnchor.x
        const faceY = rect.top + rect.height * faceAnchor.y
        const dx = pointer.x - faceX
        const dy = pointer.y - faceY
        const viewportReach = Math.min(window.innerWidth, window.innerHeight) * deadzoneRatio
        const layoutReach = Math.min(rect.width, rect.height) * 0.3
        motion.deadzone = Math.hypot(dx, dy) <= Math.min(viewportReach, layoutReach)
        if (!motion.deadzone) motion.target = pointerAngle(dx, dy)
      } else {
        motion.deadzone = true
      }

      const next = settleFrame()
      paint(next.image)
      if (next.moving || drawn === null) frameId = requestAnimationFrame(tick)
    }

    const wake = () => {
      if (!frameId) frameId = requestAnimationFrame(tick)
    }

    const boot = async () => {
      photo = await loadImage('/character.jpg')
      if (cancelled) return

      const needsDirection = canTrack && !reduce
      if (!needsDirection) {
        center = (await loadImage('/frames/center.webp')) ?? photo
        if (cancelled) return
        if (!center && !photo) {
          setFallback('monogram')
          warn('Add public/character.jpg, or public/character.mp4 then run python scripts/extract-frames.py.')
          return
        }
        setFallback(center?.src.includes('/frames/') ? 'pending' : 'photo')
        if (!center?.src.includes('/frames/') && import.meta.env.DEV) {
          warn('center.webp was not found. Showing /character.jpg until frames are extracted.')
        }
        paint(center ?? photo)
        wake()
        return
      }

      try {
        const response = await fetch('/frames/manifest.json')
        if (!response.ok) throw new Error('missing manifest')
        const data: unknown = await response.json()
        if (!isFrameManifest(data)) throw new Error('invalid manifest')
        const set = await loadFrameSet(data)
        if (cancelled) return
        mapping = data.mapping === 'eye-path' ? 'eye-path' : 'circle'
        frames = set.frames
        center = set.center ?? set.frames[0] ?? photo
        if (!frames.length || !center) throw new Error('empty frames')
        setFallback('pending')
        paint(center)
      } catch {
        if (cancelled) return
        center = photo
        if (photo) {
          setFallback('photo')
          paint(photo)
          warn('Directional frames are missing. Showing /character.jpg. Add public/character.mp4 and run python scripts/extract-frames.py.')
        } else {
          setFallback('monogram')
          warn('Character assets are missing. Add public/character.jpg and public/character.mp4.')
        }
      }

      wake()
    }

    const onPointer = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.seen = true
    }

    const onReset = () => {
      pointer.seen = false
      motion.deadzone = true
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting)
      if (visible) wake()
    })
    const resizeObserver = new ResizeObserver(() => {
      drawn = null
      wake()
    })

    observer.observe(box)
    resizeObserver.observe(box)
    const onPointerMove = (event: PointerEvent) => {
      onPointer(event)
      wake()
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('blur', onReset)
    document.addEventListener('visibilitychange', wake)
    void boot()

    return () => {
      cancelled = true
      cancelAnimationFrame(frameId)
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('blur', onReset)
      document.removeEventListener('visibilitychange', wake)
    }
  }, [angleOffset, canTrack, deadzoneRatio, faceAnchor.x, faceAnchor.y, lerpFactor, reduce])

  const idle = !canTrack && !reduce && fallback !== 'monogram'

  return (
    <div
      ref={boxRef}
      className={`relative ${idle ? 'character-idle' : ''} ${className}`}
      role="img"
      aria-label="Portrait of Prashant Mahato"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      {fallback === 'monogram' && (
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="font-display text-7xl tracking-[0.14em] text-[#f3e7d6]">PM</p>
            <p className="mt-3 text-[11px] tracking-[0.22em] text-[#b7aa9c] uppercase">
              Add character.jpg to preview
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
