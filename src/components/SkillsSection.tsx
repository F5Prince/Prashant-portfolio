import { motion, useReducedMotion } from 'framer-motion'
import { skillGroups } from '../data/skills'
import { SectionHeading } from './SectionHeading'

export function SkillsSection() {
  const reduce = useReducedMotion()

  return (
    <section id="skills" className="scroll-mt-24 bg-[#070605] px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          eyebrow="Skills"
          title="Tools of the"
          accent="planning desk."
          aside="Planning, SAP, and logistics skills used in daily mill operations."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <motion.article
              key={group.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              className="rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-7"
            >
              <h3 className="text-xl text-white">{group.title}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-[#d4b483]/25 bg-[#14110e] px-3 py-1.5 text-[11px] tracking-[0.14em] text-[#f3e7d6] uppercase"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
