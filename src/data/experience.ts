export type ExperienceItem = {
  year: string
  title: string
  organization: string
  description: string
}

export const role = {
  organization: 'Jindal Steel',
  place: 'Raigarh',
  period: 'September 2019 — Present',
  title: 'Production Planning & Control',
} as const

export const experience: ExperienceItem[] = [
  {
    year: '2019 — Present',
    title: 'Production Planning',
    organization: 'Structural Rolling Mill',
    description:
      'Responsible for rolling schedule planning and production planning to achieve optimum mill utilization and on-time customer order fulfillment.',
  },
  {
    year: '2019 — Present',
    title: 'Inventory Control',
    organization: 'PPC & Logistics',
    description:
      'Managed finished goods and raw material inventory in compliance with standard inventory norms and production requirements.',
  },
  {
    year: '2019 — Present',
    title: 'Marketing Coordination',
    organization: 'Customer Orders',
    description:
      'Coordinated with Marketing for production scheduling, customer order planning, order execution, query resolution, and delivery commitments.',
  },
  {
    year: '2019 — Present',
    title: 'SAP Operations',
    organization: 'PP / MM / SD',
    description:
      'Handled SAP PP/MM activities including material master, MRP parameters, BOM, work centers, routing, and production versions.',
  },
  {
    year: '2019 — Present',
    title: 'Plant Coordination',
    organization: 'Cross-functional Teams',
    description:
      'Collaborated with Production, SMS, Logistics, Marketing, Quality, and Roll Shop teams for smooth plant operations and roll readiness.',
  },
]

export const education = [
  {
    period: '2019 — 2023',
    title: 'B.Tech in Electrical & Electronics Engineering',
    school: 'MITM Jamshedpur, JUT Ranchi',
  },
  {
    period: '2016 — 2019',
    title: 'Diploma in Electrical Engineering',
    school: 'Government Polytechnic Adityapur, SBTE Ranchi',
  },
  {
    period: '2014 — 2016',
    title: 'Intermediate',
    school: 'Patamda Inter College Jalla, JAC Ranchi',
  },
  {
    period: '2012 — 2014',
    title: 'Matriculation',
    school: 'SS +2 High School Patamda, JAC Ranchi',
  },
] as const
