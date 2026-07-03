import type { MetadataRoute } from 'next'
import { LIVE } from '@/lib/tools'
import { SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes = [
    { path: '', priority: 1.0 },
    { path: '/platform', priority: 0.9 },
    { path: '/tools', priority: 0.9 },
    { path: '/escanor', priority: 0.9 },
    { path: '/vision', priority: 0.7 },
    { path: '/pricing', priority: 0.8 },
    { path: '/about', priority: 0.6 },
    { path: '/contact', priority: 0.8 },
    { path: '/blog', priority: 0.5 },
    { path: '/newsroom', priority: 0.5 },
    { path: '/events', priority: 0.4 },
    { path: '/careers', priority: 0.4 },
    { path: '/docs', priority: 0.5 },
    { path: '/privacy', priority: 0.2 },
    { path: '/terms', priority: 0.2 },
  ]

  const toolRoutes = LIVE.map((tool) => ({
    url: `${SITE.url}/tools/${tool.slug}`,
    lastModified,
    priority: 0.8,
  }))

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE.url}${r.path}`,
      lastModified,
      priority: r.priority,
    })),
    ...toolRoutes,
  ]
}
