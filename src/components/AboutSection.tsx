import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'
import { publicUrl } from '../utils/frames'

const walkingVideo = publicUrl('Prashant%20Walking%20video.mp4')

export function AboutSection() {
  const reduce = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    if (reduce) {
      video.pause()
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        void video.play().catch(() => undefined)
      } else {
        video.pause()
      }
    })

    observer.observe(section)
    return () => observer.disconnect()
  }, [reduce])

  return (
    <section id="about" ref={sectionRef} className="relative scroll-mt-24">
      <div className="sticky top-0 z-0 h-[100svh] overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={walkingVideo}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Prashant Mahato walking"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 bg-[#070605]/30 px-5 py-16 sm:px-8 lg:py-20">
        <p className="mb-8 text-center text-[11px] tracking-[0.32em] text-[#f3e7d6]/80 uppercase">01 / About</p>
        <div className="mx-auto max-w-3xl space-y-5 text-sm leading-7 text-[#f3ece4]/75 sm:text-[15px]">
          {profile.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
          {profile.focus.map((item, index) => (
            <motion.article
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              className="rounded-2xl border border-white/10 bg-black/25 p-5 backdrop-blur-[2px]"
            >
              <p className="text-[11px] tracking-[0.22em] text-[#d4b483] uppercase">0{index + 1}</p>
              <h3 className="mt-3 text-lg text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#b7aa9c]">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
