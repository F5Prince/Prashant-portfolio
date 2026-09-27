import { useReducedMotion } from 'framer-motion'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { ProjectMedia } from './ProjectMedia'
import { SectionHeading } from './SectionHeading'
import ScrollStack, { ScrollStackItem } from './ScrollStack'

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-[#d4b483]/25 bg-[#100e0c] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.45)] sm:p-8">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4b483]/80 to-transparent" />
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-[11px] tracking-[0.24em] text-[#d4b483] uppercase">{project.category}</p>
          <h3 className="mt-3 text-2xl leading-tight text-white sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#cbbdae]">{project.description}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <li
                key={item}
                className="rounded-full border border-white/10 px-3 py-1 text-[10px] tracking-[0.14em] text-[#f3e7d6] uppercase"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-6 lg:col-span-5">
          <ProjectMedia project={project} />
          <div className="flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full border border-white/15 px-4 py-2 text-[11px] tracking-[0.16em] text-[#f3e7d6] uppercase hover:border-[#d4b483]"
              >
                GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-[#f3e7d6] px-4 py-2 text-[11px] tracking-[0.16em] text-black uppercase"
              >
                Live
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export function ProjectsSection() {
  const desktop = useMediaQuery('(min-width: 1024px)')
  const reduce = useReducedMotion()
  const stack = desktop && !reduce

  return (
    <section id="projects" className="scroll-mt-24 bg-[#070605] px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          eyebrow="Projects"
          title="Selected"
          accent="work."
          aside="Planning, inventory, and dispatch work from structural rolling mill operations."
        />

        {stack ? (
          <ScrollStack itemDistance={28} itemScale={0.03} itemStackDistance={24} stackPosition="18%" baseScale={0.9}>
            {projects.map((project) => (
              <ScrollStackItem key={project.title}>
                <ProjectCard project={project} />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        ) : (
          <div className="flex flex-col gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectsSection
