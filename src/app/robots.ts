import { siteConfig } from '@/config/site'
import { MetadataRoute } from 'next'

/**
 * Generates a robots.txt file for search engine crawlers.
 * Disallows crawling for development environments and specific paths in production.
 * @returns A `MetadataRoute.Robots` object defining crawling rules.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: siteConfig.isDevelopment ? [] : '/',
      disallow: siteConfig.isDevelopment
        ? ['/']
        : ['/api/', '/admin/', '/*.json', '/*.xml']
    },
    sitemap: `${siteConfig.url}/sitemap.xml`
  }
}
