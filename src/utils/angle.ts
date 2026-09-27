/** Shortest-path interpolation on a 0–360 circle. */
export function lerpAngle(current: number, target: number, factor: number) {
  const diff = ((target - current + 540) % 360) - 180
  return (current + diff * factor + 360) % 360
}

export function pointerAngle(dx: number, dy: number) {
  const degrees = (Math.atan2(dy, dx) * 180) / Math.PI
  return (degrees + 360) % 360
}

export function frameIndexForAngle(angle: number, count: number, offset = 0) {
  if (count <= 0) return 0
  const normalized = (((angle + offset) % 360) + 360) % 360
  return Math.round((normalized / 360) * count) % count
}

/**
 * This eye clip is a path, not a spin:
 * camera, up, up-left, left, down-left, back to camera.
 * Angles use atan2: 0 right, 90 down, 180 left, 270 up.
 */
function gazeForEyeFrame(index: number) {
  if (index <= 4 || index >= 49) return 0
  if (index <= 8) return 315
  if (index <= 15) return 270
  if (index <= 22) return 230
  if (index <= 26) return 205
  if (index <= 33) return 180
  if (index <= 40) return 145
  return 95
}

export function eyePathFrame(angle: number) {
  let best = 0
  let bestDistance = 360
  for (let index = 0; index < 56; index += 1) {
    const gaze = gazeForEyeFrame(index)
    const distance = Math.abs(((angle - gaze + 540) % 360) - 180)
    if (distance < bestDistance) {
      bestDistance = distance
      best = index
    }
  }
  return best
}
