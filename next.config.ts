import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    // Old-site routes folded into the new IA (build spec Part B).
    return [
      { source: '/card', destination: '/events', permanent: true },
      { source: '/book', destination: '/contact', permanent: true },
      { source: '/roadmap', destination: '/vision', permanent: true },
      { source: '/use-cases', destination: '/platform', permanent: true },
      { source: '/demo', destination: '/vision', permanent: true },
      { source: '/connect', destination: '/contact', permanent: true },
      { source: '/tools/regmap', destination: '/tools/regbit', permanent: true },
    ]
  },
}

export default nextConfig
