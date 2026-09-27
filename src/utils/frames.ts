export type FrameManifest = {
  count: number
  frames: string[]
  center: string
  mapping?: 'circle' | 'eye-path' | string
}

export function isFrameManifest(value: unknown): value is FrameManifest {
  if (!value || typeof value !== 'object') return false
  const record = value as Partial<FrameManifest>
  return (
    Array.isArray(record.frames) &&
    record.frames.length > 0 &&
    record.frames.every((frame) => typeof frame === 'string') &&
    typeof record.center === 'string'
  )
}

export function loadImage(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = () => {
      resolve(image)
    }
    image.onerror = () => {
      resolve(null)
    }
    image.src = src
  })
}

export async function loadFrameSet(manifest: FrameManifest) {
  const frames = await Promise.all(
    manifest.frames.map((file) => loadImage(`/frames/${file}`)),
  )
  const center = await loadImage(`/frames/${manifest.center}`)
  return {
    frames: frames.filter((frame): frame is HTMLImageElement => frame !== null),
    center,
  }
}
