import type { Metadata } from 'next'
import EasyChipWordmark from '@/components/EasyChipWordmark'

export const metadata: Metadata = {
  title: 'EasyChip — Connect with the Founders',
}

const FOUNDERS = [
  {
    name: 'Rakshit Mishra',
    role: 'Co-founder, EasyChip',
    linkedin: 'https://www.linkedin.com/in/rakshitmishra9695/',
  },
  {
    name: 'Parth Parekh',
    role: 'Co-founder, EasyChip',
    linkedin: 'https://www.linkedin.com/in/parth-parekh-131820357/',
  },
]

export default function ConnectPage() {
  return (
    <div className="fixed inset-0 z-[100] bg-bg-void overflow-auto">
      {/* Subtle radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(200,150,46,0.12) 0%, transparent 70%)',
        }}
      />

      <main className="relative z-10 flex flex-col items-center min-h-screen max-w-[480px] mx-auto px-6">
        {/* Header */}
        <header className="pt-12 pb-2 text-center">
          <EasyChipWordmark size={28} />
        </header>

        <h1 className="text-[24px] font-semibold font-display text-white mt-4 mb-8 text-center">
          Connect with the founders
        </h1>

        {/* Founder cards */}
        <div className="w-full flex flex-col gap-4">
          {FOUNDERS.map((founder) => (
            <div
              key={founder.name}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5"
            >
              <p className="text-[18px] font-semibold font-display text-white">
                {founder.name}
              </p>
              <p className="text-[13px] font-display text-white/60 mt-0.5">
                {founder.role}
              </p>
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center w-full rounded-xl bg-accent-amber text-bg-void font-semibold font-display text-[15px] py-3 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber focus-visible:ring-offset-2 focus-visible:ring-offset-bg-void"
              >
                Connect on LinkedIn&nbsp;&rarr;
              </a>
            </div>
          ))}
        </div>

        {/* Footer link */}
        <footer className="mt-auto pb-8 pt-8 text-center">
          <a
            href="https://easychip.vercel.app"
            className="text-[13px] font-display text-white/60 hover:text-white/80 transition-colors"
          >
            &larr; Back to easychip.vercel.app
          </a>
        </footer>
      </main>
    </div>
  )
}
