/**
 * Configuration for the site, including name, URL, environment, and static routes.
 */
export const siteConfig = {
  name: 'Abijith',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://abijith.sh',
  isDevelopment: process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production',
  // Add all your static routes here
  staticRoutes: ['/', '/about', '/blog', '/projects', '/contact']
}
