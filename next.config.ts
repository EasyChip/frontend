import type { NextConfig } from 'next'

/**
 * The v3 revamp collapsed 22 routes to 7. Everything the old site published
 * redirects to the surface that now carries that content, so external links,
 * search results and the old sitemap all keep landing somewhere real.
 *
 * The former signed-in area (/login, /dashboard, /onboarding, /admin) is gone:
 * this site has no product surface, so those addresses now go to the one place
 * where someone can actually reach the team.
 */
const nextConfig: NextConfig = {
  async redirects() {
    const to = (source: string, destination: string) => ({
      source,
      destination,
      permanent: true,
    })

    return [
      // Product surfaces
      to('/tools', '/platform'),
      to('/tools/:slug*', '/platform'),
      to('/pricing', '/platform'),
      to('/docs', '/platform'),
      to('/use-cases', '/platform'),

      // The local-first / IP story now lives with the AI layer
      to('/escanor', '/intelligence'),
      to('/security', '/intelligence'),

      // Company surfaces
      to('/about', '/company'),
      to('/vision', '/company'),
      to('/blog', '/company'),
      to('/newsroom', '/company'),
      to('/events', '/company'),
      to('/careers', '/company'),
      to('/customers', '/company'),
      to('/roadmap', '/company'),

      // Contact and the retired account area
      to('/book', '/contact'),
      to('/card', '/contact'),
      to('/connect', '/contact'),
      to('/demo', '/contact'),
      to('/login', '/contact'),
      to('/dashboard', '/contact'),
      to('/onboarding', '/contact'),
      to('/admin/:path*', '/contact'),
      to('/auth/:path*', '/contact'),
    ]
  },
}

export default nextConfig
