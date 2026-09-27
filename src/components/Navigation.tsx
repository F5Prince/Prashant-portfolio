import { useEffect, useState } from 'react'
import { navItems, profile } from '../data/profile'
import { publicUrl } from '../utils/frames'
import { useActiveSection } from '../hooks/useActiveSection'
import { scrollToId } from '../utils/scroll'

const sectionIds = navItems.map((item) => item.id)

export function Navigation() {
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-white/10 bg-[#0c0b0a]/90 px-3 py-2 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:px-4">
        <a
          href="#home"
          className="flex items-center gap-2 rounded-full py-1 pr-3 pl-1 font-display text-lg tracking-[0.18em] text-[#f3e7d6]"
          onClick={(event) => {
            event.preventDefault()
            go('home')
          }}
        >
          <img src={publicUrl('favicon.svg')} alt="" className="h-8 w-8" />
          {profile.name.split(' ')[0]}
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const current = active === item.id
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={current ? 'true' : undefined}
                className={`rounded-full px-3 py-1.5 text-[11px] tracking-[0.16em] uppercase transition-colors ${
                  current ? 'bg-white/10 text-white' : 'text-[#cbbdae] hover:text-white'
                }`}
                onClick={(event) => {
                  event.preventDefault()
                  go(item.id)
                }}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full border border-[#d4b483]/40 px-4 py-1.5 text-[11px] tracking-[0.18em] text-[#f3e7d6] uppercase transition-colors hover:border-[#d4b483] md:inline-flex"
          onClick={(event) => {
            event.preventDefault()
            go('contact')
          }}
        >
          Let's Talk
        </a>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#f3e7d6] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? 'Close' : 'Menu'}</span>
          <span aria-hidden="true" className="flex flex-col gap-1.5">
            <span className={`block h-px w-4 bg-current transition ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`block h-px w-4 bg-current transition ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="mx-auto mt-3 max-w-6xl rounded-3xl border border-white/10 bg-[#0c0b0a]/95 p-4 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block rounded-2xl px-3 py-3 text-sm tracking-[0.16em] text-[#f3e7d6] uppercase"
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    go(item.id)
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
