import { siteConfig } from '@/config/site'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: siteConfig.isDevelopment ? [] : '/',
      disallow: siteConfig.isDevelopment ? ['/'] : [
        '/api/',
        '/admin/',
        '/*.json',
        '/*.xml',
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}