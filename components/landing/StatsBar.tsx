const stats = [
  { value: '10,000+', label: 'Designs Generated' },
  { value: '94%', label: 'First-Pass Rate' },
  { value: '< 30s', label: 'Avg Generation' },
  { value: '100%', label: 'Formally Verified' },
]

export default function StatsBar() {
  return (
    <section className="py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card glow-border rounded-2xl px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-0">
              <div className="flex-1 text-center">
                <div className="text-2xl font-extrabold gradient-text">{stat.value}</div>
                <div className="text-xs text-text-muted mt-0.5 uppercase tracking-wider">{stat.label}</div>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden md:block w-px h-8 bg-white/5 ml-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
