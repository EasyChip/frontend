import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

/** Seven public routes. Priority follows the reading order of the site. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const routes = [
    { path: '', priority: 1.0 },
    { path: '/platform', priority: 0.9 },
    { path: '/intelligence', priority: 0.9 },
    { path: '/company', priority: 0.8 },
    { path: '/contact', priority: 0.8 },
    { path: '/privacy', priority: 0.2 },
    { path: '/terms', priority: 0.2 },
  ]

  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified,
    priority: r.priority,
  }))
}
