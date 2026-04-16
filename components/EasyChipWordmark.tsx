export default function EasyChipWordmark({
  size = 28,
  showTagline = false,
  showLogo = true,
}: {
  size?: number
  showTagline?: boolean
  showLogo?: boolean
}) {
  return (
    <div className="text-center flex flex-col items-center">
      <div className="flex items-center gap-2.5">
        {showLogo && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/logo.png"
            alt=""
            style={{ width: size, height: size, objectFit: 'contain' }}
          />
        )}
        <h1
          className="font-display font-semibold text-white"
          style={{ fontSize: size, letterSpacing: '-0.02em' }}
        >
          EasyChip
        </h1>
      </div>
      {showTagline && (
        <p className="font-display text-[13px] text-accent-amber uppercase mt-1 tracking-[0.12em]">
          Prompt In. Silicon Out.
        </p>
      )}
    </div>
  )
}
