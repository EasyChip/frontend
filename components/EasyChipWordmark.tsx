export default function EasyChipWordmark({
  size = 28,
  showTagline = false,
}: {
  size?: number
  showTagline?: boolean
}) {
  return (
    <div className="text-center">
      <h1
        className="font-display font-semibold text-white"
        style={{ fontSize: size, letterSpacing: '-0.02em' }}
      >
        EasyChip
      </h1>
      {showTagline && (
        <p className="font-display text-[13px] text-accent-amber uppercase mt-1 tracking-[0.12em]">
          Prompt In. Silicon Out.
        </p>
      )}
    </div>
  )
}
