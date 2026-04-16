import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-void': 'var(--bg-void)',
        'bg-base': 'var(--bg-base)',
        'bg-raised': 'var(--bg-raised)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-overlay': 'var(--bg-overlay)',
        'bg-card': 'var(--bg-raised)',
        'accent-primary': 'var(--accent-primary)',
        'accent-secondary': 'var(--accent-secondary)',
        'accent-tertiary': 'var(--accent-tertiary)',
        'accent-gold': 'var(--accent-gold)',
        'accent-amber': 'var(--accent-amber)',
        'accent-start': 'var(--accent-primary)',
        'accent-mid': 'var(--accent-secondary)',
        'accent-end': 'var(--accent-tertiary)',
        'border-glow': 'var(--border-glow)',
        'border-subtle': 'var(--border-base)',
        'border-glass': 'var(--border-glass)',
        'border-hover': 'var(--border-hover)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
        'text-accent': 'var(--text-accent)',
        'text-muted': 'var(--text-tertiary)',
        // Event card tokens
        'navy-900': '#0F1B2D',
        'navy-800': '#1B4F72',
        'mint': '#00C896',
        // Legacy compat
        background: 'var(--bg-base)',
        surface: 'var(--bg-raised)',
        foreground: 'var(--text-primary)',
        muted: 'var(--text-secondary)',
        border: 'var(--border-base)',
        accent: 'var(--accent-primary)',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 50%, var(--accent-tertiary) 100%)',
        'gradient-hero': 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(200,150,46,0.12) 0%, transparent 70%)',
        'gradient-card': 'linear-gradient(135deg, rgba(200,150,46,0.06) 0%, rgba(200,150,46,0.03) 100%)',
        'gradient-cta': 'linear-gradient(135deg, #C8962E 0%, #A07524 100%)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-down': 'slide-down 0.2s ease-out',
        'cursor-blink': 'typing-cursor 1s step-end infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'marquee': 'marquee 30s linear infinite',
        'count-blur': 'count-blur 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'digit-flip': 'digit-flip 0.4s ease-in-out',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', boxShadow: '0 0 20px rgba(200, 150, 46, 0.3)' },
          '50%': { opacity: '1', boxShadow: '0 0 40px rgba(200, 150, 46, 0.6)' },
        },
        'typing-cursor': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'slide-down': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'count-blur': {
          from: { filter: 'blur(8px)', opacity: '0' },
          to: { filter: 'blur(0px)', opacity: '1' },
        },
        'digit-flip': {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(-90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'IBM Plex Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'Menlo', 'monospace'],
        display: ['var(--font-display)', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
