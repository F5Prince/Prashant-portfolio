import { publicUrl } from '../utils/frames'

export const profile = {
  name: 'Prashant Mahato',
  role: 'Production Planning & Control Engineer',
  location: 'Jamshedpur, East Singhbhum, Jharkhand',
  email: 'prashant.jsr.013@gmail.com',
  phone: '+91 80025 83303',
  phoneHref: 'tel:+918002583303',
  resume: publicUrl('resume.pdf'),
  summary:
    'PPC engineer with 6+ years in structural rolling mill operations at Jindal Steel, focused on production planning, logistics coordination, SAP workflows, inventory control, and on-time customer order fulfillment.',
  about: [
    'I am Prashant Mahato, a Production Planning & Control Engineer from Jamshedpur, Jharkhand. I have 6+ years of experience in structural rolling mill operations at Jindal Steel, where my work connects production planning, scheduling, logistics coordination, inventory control, and marketing coordination.',
    'I work on rolling schedules, capacity planning, raw material and finished goods inventory, dispatch planning, SAP PP/MM activities, and cross-functional coordination with Production, SMS, Logistics, Marketing, Quality, and Roll Shop teams.',
    'I want to keep contributing to steel manufacturing by improving planning accuracy, reducing delays, optimizing resources, and supporting reliable customer order fulfillment.',
  ],
  focus: [
    {
      title: 'Production Planning',
      text: 'Rolling schedules that improve mill utilization, align production with customer orders, and keep execution moving with fewer delays.',
    },
    {
      title: 'Inventory Control',
      text: 'Raw material and finished goods planned against standard norms, MRP requirements, material flow, and rolling sequence readiness.',
    },
    {
      title: 'Dispatch & Logistics',
      text: 'Coordination with logistics teams, marketing requirements, and order commitments for timely movement of structural steel products.',
    },
  ],
} as const

export const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/F5Prince',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/prashant-mahato-74107a1b0',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/its_me.prashant',
  },
  {
    label: 'Email',
    href: 'mailto:prashant.jsr.013@gmail.com',
  },
] as const

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const
