import { useState, type FormEvent } from 'react'
import { profile, socials } from '../data/profile'
import { SectionHeading } from './SectionHeading'

export function ContactSection() {
  const [sentHint, setSentHint] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const message = String(data.get('message') ?? '')
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSentHint(true)
  }

  return (
    <footer id="contact" className="scroll-mt-24 bg-[#070605] px-5 py-24 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="05" eyebrow="Contact" title="Let's work" accent="together." />

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <p className="max-w-md text-sm leading-7 text-[#cbbdae]">
              For planning roles, plant coordination, or a conversation about the work at Jindal Steel.
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a className="text-[#f3e7d6] hover:text-white" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </li>
              <li>
                <a className="text-[#f3e7d6] hover:text-white" href={profile.phoneHref}>
                  {profile.phone}
                </a>
              </li>
              <li className="text-[#b7aa9c]">{profile.location}</li>
            </ul>
            <ul className="flex flex-wrap gap-3">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="inline-flex rounded-full border border-white/10 px-4 py-2 text-[11px] tracking-[0.16em] text-[#f3e7d6] uppercase hover:border-[#d4b483]"
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={profile.resume}
              className="inline-flex rounded-full bg-[#f3e7d6] px-5 py-3 text-[11px] tracking-[0.18em] text-black uppercase"
            >
              Resume
            </a>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 lg:col-span-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-[11px] tracking-[0.16em] text-[#b7aa9c] uppercase">
                Name
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-[#d4b483]"
                />
              </label>
              <label className="block text-[11px] tracking-[0.16em] text-[#b7aa9c] uppercase">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-[#d4b483]"
                />
              </label>
            </div>
            <label className="mt-4 block text-[11px] tracking-[0.16em] text-[#b7aa9c] uppercase">
              Message
              <textarea
                required
                name="message"
                rows={5}
                className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-[#d4b483]"
              />
            </label>
            <button
              type="submit"
              className="mt-5 w-full rounded-full border border-[#d4b483]/40 py-3 text-[11px] tracking-[0.2em] text-[#f3e7d6] uppercase hover:bg-[#d4b483] hover:text-black"
            >
              Send email
            </button>
            {sentHint && (
              <p className="mt-3 text-sm text-[#d4b483]" role="status">
                Your email app should open with this message addressed to {profile.email}.
              </p>
            )}
          </form>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/10 pt-6 text-[11px] tracking-[0.16em] text-[#8d8276] uppercase sm:flex-row sm:items-center sm:justify-between">
          <p>Prashant Mahato</p>
          <p>© {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  )
}

export default ContactSection
