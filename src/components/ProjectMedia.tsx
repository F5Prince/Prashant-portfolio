import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { Project } from '../data/projects'

type Props = {
  project: Project
}

export function ProjectMedia({ project }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const { image, video, title } = project

  useEffect(() => {
    const node = ref.current
    if (!node || (!image && !video)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '240px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [image, video])

  if (!image && !video) return null

  return (
    <div ref={ref} className="relative aspect-video overflow-hidden rounded-xl bg-[#120f0c]">
      {video && visible ? (
        <video
          className="h-full w-full object-cover"
          src={video}
          poster={image}
          muted
          loop
          playsInline
          autoPlay={!reduce}
          preload="metadata"
          aria-label={`${title} preview`}
        />
      ) : image && visible ? (
        <img src={image} alt={`${title} preview`} className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(212,180,131,0.18),transparent_55%)]" />
      )}
    </div>
  )
}
