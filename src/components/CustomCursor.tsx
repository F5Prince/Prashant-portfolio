import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'

const DESKTOP_CURSOR = '(hover: hover) and (pointer: fine) and (min-width: 768px)'

export function CustomCursor() {
  const finePointer = useMediaQuery(DESKTOP_CURSOR)
  const reduce = useReducedMotion()
  const enabled = finePointer && !reduce
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.classList.toggle('has-custom-cursor', enabled)
    return () => document.documentElement.classList.remove('has-custom-cursor')
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { ...pointer }
    let hovering = false
    let overField = false
    let frame = 0

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      const target = event.target
      if (!(target instanceof Element)) return
      overField = Boolean(target.closest('input, textarea, select, [data-native-cursor]'))
      hovering = Boolean(target.closest('a, button'))
    }

    const draw = () => {
      ring.x += (pointer.x - ring.x) * 0.2
      ring.y += (pointer.y - ring.y) * 0.2

      const dot = dotRef.current
      const aura = ringRef.current
      if (dot && aura) {
        const opacity = overField ? '0' : '1'
        dot.style.opacity = opacity
        aura.style.opacity = opacity
        dot.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`
        aura.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`
        const size = hovering ? 40 : 22
        aura.style.width = `${size}px`
        aura.style.height = `${size}px`
      }

      frame = requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame)
      } else {
        frame = requestAnimationFrame(draw)
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[80] rounded-full border border-[#d4b483]/45"
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[81] h-1.5 w-1.5 rounded-full bg-[#f6efe6]"
      />
    </>
  )
}
