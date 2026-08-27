/**
 * The numbered narrative - one flowing editorial sentence carrying the three
 * product motions, words filling from dim to bright as you scroll.
 *
 * Server-rendered and CSS-only. This was 26 framer-motion values driven by a
 * single `useScroll`, which cost a motion value per word on every scroll frame
 * and - worse - shipped the entire sentence at 0.18 opacity in the server HTML,
 * so the site's strongest paragraph was unreadable without JS. The fill now
 * runs on a scroll-linked timeline where one is available, and the resting
 * state is simply the finished sentence.
 */

type Token = { text: string; marker?: string }

const SENTENCE: Token[] = [
  { text: 'EasyChip' },
  { text: 'checks', marker: '01' },
  { text: 'your' },
  { text: 'RTL' },
  { text: 'the' },
  { text: 'moment' },
  { text: 'it' },
  { text: 'exists,' },
  { text: 'implements', marker: '02' },
  { text: 'from' },
  { text: 'spec' },
  { text: 'to' },
  { text: 'GDSII' },
  { text: 'in' },
  { text: 'one' },
  { text: 'cockpit,' },
  { text: 'and' },
  { text: 'signs' },
  { text: 'off', marker: '03' },
  { text: 'without' },
  { text: 'your' },
  { text: 'IP' },
  { text: 'ever' },
  { text: 'leaving' },
  { text: 'your' },
  { text: 'infrastructure.' },
]

function Marker({ value }: { value: string }) {
  return (
    <sup className="ml-0.5 font-mono text-[0.32em] font-medium tracking-widest text-brand-cyan">
      {value}
    </sup>
  )
}

export default function NarrativeStatement() {
  return (
    <section className="border-t border-hair">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-40">
        <p className="editorial-title text-3xl leading-[1.25] text-ink md:text-5xl md:leading-[1.2]">
          {SENTENCE.map((token, i) => (
            <span key={`${token.text}-${i}`}>
              <span
                className="word-brighten"
                style={{ ['--word-i' as string]: i }}
              >
                {token.text}
                {token.marker && <Marker value={token.marker} />}
              </span>{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
