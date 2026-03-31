import Link from 'next/link'

const cols = [
  { heading: null, brand: true },
  {
    heading: 'Product',
    links: [
      { label: 'Playground',  href: '/playground' },
      { label: 'Vision',      href: '/vision'      },
      { label: 'Roadmap',     href: '/roadmap'     },
      { label: 'Use Cases',   href: '/use-cases'   },
      { label: 'Docs',        href: '#'            },
      { label: 'Changelog',   href: '#'            },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'MIT License', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-0" style={{ background: 'var(--bg-raised)' }}>
      {/* Main footer links */}
      <div className="section-container pt-20 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-text-primary font-bold text-lg mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="EasyChip logo" width={22} height={22} style={{ objectFit: 'contain' }} />
              EasyChip
            </div>
            <p className="text-sm text-text-tertiary leading-relaxed mb-5 max-w-[200px]">
              AI-powered RTL generation and formal verification.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-tertiary hover:text-text-primary transition-colors" aria-label="GitHub">
                <svg viewBox="0 0 16 16" width="17" height="17" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-text-tertiary hover:text-text-primary transition-colors" aria-label="Twitter/X">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                </svg>
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-text-tertiary hover:text-text-primary transition-colors" aria-label="Discord">
                <svg viewBox="0 0 16 16" width="17" height="17" fill="currentColor">
                  <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {cols.slice(1).map((col) => (
            <div key={col.heading as string}>
              <h4 className="text-label text-text-primary mb-4">{col.heading}</h4>
              <ul className="space-y-2.5">
                {col.links?.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-text-tertiary hover:text-text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-tertiary">
          <span>© 2026 EasyChip. MIT License.</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
            Built with AI
          </span>
        </div>
      </div>
    </footer>
  )
}
