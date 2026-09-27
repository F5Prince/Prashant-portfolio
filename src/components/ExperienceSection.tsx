import { motion, useReducedMotion } from 'framer-motion'
import { education, experience, role } from '../data/experience'

export function ExperienceSection() {
  const reduce = useReducedMotion()

  return (
    <section id="experience" className="relative z-10 scroll-mt-24 bg-[#070605] px-5 py-20 sm:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 flex items-center gap-4 text-[11px] tracking-[0.32em] text-[#d4b483] uppercase">
          02 / Experience
          <span className="h-px w-16 bg-gradient-to-r from-[#d4b483] to-transparent" />
        </p>

        <div className="mb-10 flex flex-col gap-2 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl text-white sm:text-3xl">{role.title}</h2>
            <p className="mt-1 text-sm tracking-[0.14em] text-[#d4b483] uppercase">
              {role.organization} · {role.place}
            </p>
          </div>
          <p className="text-sm text-[#b7aa9c]">{role.period}</p>
        </div>

        <ol className="relative space-y-7 border-l border-white/10 pl-6">
          {experience.map((item, index) => (
            <motion.li
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="relative"
            >
              <span className="absolute top-1.5 -left-[1.68rem] h-2.5 w-2.5 rounded-full border border-[#d4b483] bg-[#070605]" />
              <p className="text-[11px] tracking-[0.18em] text-[#d4b483] uppercase">{item.organization}</p>
              <h3 className="mt-1 text-lg text-white">{item.title}</h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[#b7aa9c]">{item.description}</p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-16">
          <p className="text-[11px] tracking-[0.28em] text-[#d4b483] uppercase">Education</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {education.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 p-4">
                <p className="text-[11px] tracking-[0.16em] text-[#d4b483] uppercase">{item.period}</p>
                <h3 className="mt-2 text-base text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-[#b7aa9c]">{item.school}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection
