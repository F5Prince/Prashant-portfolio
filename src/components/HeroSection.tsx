import { motion, useReducedMotion } from 'framer-motion'
import { profile, socials } from '../data/profile'
import { InteractiveHeroCharacter } from './InteractiveHeroCharacter'
import { scrollToId } from '../utils/scroll'

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
}

export function HeroSection() {
  const reduce = useReducedMotion()

  return (
    <section id="home" className="relative min-h-screen overflow-x-hidden bg-[#070605] text-[#f3ece4]">
      <div className="atmosphere pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_42%,rgba(212,180,131,0.16),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-6xl items-start gap-10 px-5 pt-28 pb-16 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:items-center lg:gap-8 lg:pt-24">
        <motion.div
          initial={reduce ? false : 'hidden'}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
          }}
        >
          <motion.p variants={fade} transition={{ duration: 0.7 }} className="text-[11px] tracking-[0.34em] text-[#d4b483] uppercase">
            Hi, I'm
          </motion.p>
          <motion.h1
            variants={fade}
            transition={{ duration: 0.8 }}
            className="mt-3 font-display text-[4.2rem] leading-[0.82] tracking-tight text-white uppercase sm:text-7xl lg:text-[6.4rem]"
          >
            Prashant
            <span className="block text-[#d4b483]">Mahato</span>
          </motion.h1>
          <motion.p
            variants={fade}
            transition={{ duration: 0.7 }}
            className="mt-5 max-w-xl font-serif text-2xl text-[#f0e2cf] italic sm:text-3xl"
          >
            {profile.role}
          </motion.p>
          <motion.p variants={fade} transition={{ duration: 0.7 }} className="mt-4 max-w-xl text-sm leading-7 text-[#cbbdae] sm:text-[15px]">
            {profile.summary}
          </motion.p>

          <motion.div variants={fade} className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center rounded-full bg-[#f3e7d6] px-5 py-3 text-[11px] tracking-[0.18em] text-black uppercase"
              onClick={(event) => {
                event.preventDefault()
                scrollToId('projects')
              }}
            >
              View Work
            </a>
            <a
              href={profile.resume}
              className="inline-flex items-center rounded-full border border-white/15 px-5 py-3 text-[11px] tracking-[0.18em] text-[#f3e7d6] uppercase hover:border-[#d4b483]"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-[#d4b483]/50 px-5 py-3 text-[11px] tracking-[0.18em] text-[#f3e7d6] uppercase hover:border-[#d4b483]"
              onClick={(event) => {
                event.preventDefault()
                scrollToId('contact')
              }}
            >
              Let's Talk
            </a>
          </motion.div>

          <motion.ul variants={fade} className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] tracking-[0.18em] text-[#b7aa9c] uppercase">
            {socials.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-white" target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}>
                  {item.label}
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-[16/10] w-full max-w-[560px] lg:max-w-none"
        >
          <div className="pointer-events-none absolute inset-x-10 bottom-6 h-16 rounded-full bg-[#d4b483]/10 blur-3xl" />
          <InteractiveHeroCharacter className="h-full w-full" faceAnchor={{ x: 0.5, y: 0.38 }} />
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
