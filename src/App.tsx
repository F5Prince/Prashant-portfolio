import { Navigation } from './components/Navigation'
import { CustomCursor } from './components/CustomCursor'
import { SmoothScroll } from './components/SmoothScroll'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { ExperienceSection } from './components/ExperienceSection'
import { SkillsSection } from './components/SkillsSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'
import { scrollToId } from './utils/scroll'

export default function App() {
  return (
    <SmoothScroll>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:rounded-full focus:bg-[#f3e7d6] focus:px-4 focus:py-2 focus:text-black"
        onClick={(event) => {
          event.preventDefault()
          scrollToId('home')
        }}
      >
        Skip to content
      </a>
      <CustomCursor />
      <Navigation />
      <main className="bg-[#070605] text-[#f3ece4]">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </SmoothScroll>
  )
}
