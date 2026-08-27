import { OFFICE } from '@/lib/site'
import { Eyebrow } from '@/components/core/Type'

/**
 * Where the company actually sits, in the aside beside the contact form.
 *
 * Google's keyless embed endpoint, so no Maps API key has to be issued, billed
 * or rotated for what is a static pin. The address is the query rather than
 * the centre's name, because a name that long geocodes unpredictably.
 *
 * This is the one deliberate exception to the no-hue rule, and it is a
 * legibility call rather than a decorative one: a desaturated map turns the
 * marker the same grey as the roads, and a pin nobody can pick out defeats the
 * only reason the map is here.
 *
 * `loading="lazy"` matters: this sits well below the fold on a page whose job
 * is booking, and it should never compete with the calendar for the connection.
 */
export default function OfficeMap() {
  const query = encodeURIComponent(OFFICE.mapQuery)

  return (
    <div className="overflow-hidden rounded-md border border-[color:var(--hairline)]">
      <iframe
        title={`Map showing ${OFFICE.name}`}
        src={`https://maps.google.com/maps?q=${query}&z=17&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[300px] w-full border-0"
      />

      <div className="border-t border-[color:var(--hairline)] p-7">
        <Eyebrow tone="muted">Where we are</Eyebrow>
        <p className="mt-4 text-off-white">{OFFICE.name}</p>
        <address className="mt-3 text-xs not-italic leading-relaxed text-gray-2">
          {OFFICE.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </address>
        <p className="mt-5 text-xs leading-relaxed text-gray-2">{OFFICE.note}</p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${query}`}
          target="_blank"
          rel="noreferrer"
          className="label mt-6 inline-flex items-center gap-2 text-gray-2 underline-offset-4 transition-colors duration-[120ms] ease-[var(--ease-out)] hover:text-white hover:underline"
        >
          Get directions
          <span aria-hidden>↗</span>
        </a>
      </div>
    </div>
  )
}
