import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  index: string
  eyebrow: string
  title: string
  accent: string
  aside?: ReactNode
}

export function SectionHeading({ index, eyebrow, title, accent, aside }: Props) {
  const reduce = useReducedMotion()

  return (
    <div className="mb-8 flex flex-col gap-5 md:mb-10 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-4 flex items-center gap-4 text-[11px] tracking-[0.32em] text-[#d4b483] uppercase"
        >
          <span>
            {index} / {eyebrow}
          </span>
          <span className="h-px w-16 bg-gradient-to-r from-[#d4b483] to-transparent" />
        </motion.p>
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl leading-[0.9] tracking-tight text-white uppercase sm:text-5xl"
        >
          <span className="block">{title}</span>
          <span className="block text-[#d4b483]">{accent}</span>
        </motion.h2>
      </div>
      {aside && <div className="max-w-sm text-sm leading-relaxed text-[#b7aa9c]">{aside}</div>}
    </div>
  )
}
