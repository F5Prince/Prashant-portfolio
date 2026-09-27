type ScrollListener = () => void

const listeners = new Set<ScrollListener>()

type LenisLike = {
  scrollTo: (
    target: HTMLElement | string | number,
    options?: { offset?: number },
  ) => void
  destroy: () => void
}

let lenis: LenisLike | null = null

export function registerLenis(instance: LenisLike | null) {
  lenis = instance
}

export function subscribeScroll(listener: ScrollListener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function emitScroll() {
  listeners.forEach((listener) => listener())
}

export function scrollToId(id: string) {
  const target = document.getElementById(id)
  if (!target) return

  if (lenis) {
    lenis.scrollTo(target, { offset: -28 })
    return
  }

  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
