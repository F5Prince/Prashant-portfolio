export type Project = {
  title: string
  description: string
  image?: string
  video?: string
  tech: string[]
  github?: string
  live?: string
  featured?: boolean
  category: string
}

/**
 * Media is optional. Drop a file in public/images or public/videos and set
 * `image` or `video` to a root-relative path such as "/images/schedule.jpg".
 * Leave github and live unset when a real URL does not exist.
 */
export const projects: Project[] = [
  {
    title: 'Rolling Schedule Planning',
    category: 'Production Planning',
    description:
      'Plans and monitors structural rolling schedules to support optimum mill utilization and reliable customer order fulfillment.',
    tech: ['PPC', 'Capacity', 'Sequencing'],
    featured: true,
  },
  {
    title: 'Inventory & Material Flow',
    category: 'Materials',
    description:
      'Manages finished goods and raw material inventory in line with norms, MRP parameters, BOM, routing, and production versions.',
    tech: ['MRP', 'BOM', 'Raw Material'],
    featured: true,
  },
  {
    title: 'Dispatch Coordination',
    category: 'Logistics',
    description:
      'Coordinates with logistics and marketing teams to plan dispatches, resolve order queries, and maintain delivery commitments.',
    tech: ['Logistics', 'Marketing', 'Orders'],
    featured: true,
  },
  {
    title: 'Family Tree Experience',
    category: 'Personal Web Project',
    description:
      'An interactive family tree page built from JSON data and styled as a dedicated page alongside the earlier portfolio.',
    tech: ['HTML', 'CSS', 'JavaScript', 'JSON'],
    github: 'https://github.com/F5Prince/Prashant-Mahato',
    featured: true,
  },
]
