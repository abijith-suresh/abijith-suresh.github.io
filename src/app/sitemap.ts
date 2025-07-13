import { siteConfig } from '@/config/site'
import { getPosts } from '@/lib/posts'
import { getProjects } from '@/lib/projects'
import { MetadataRoute } from 'next'

/**
 * Generates a sitemap for the application, including static pages, blog posts, and projects.
 * Dynamically fetches content to ensure the sitemap is always up-to-date.
 * @returns A Promise that resolves to an array of sitemap entries.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url

  // Get all dynamic content
  const posts = await getPosts()
  const projects = await getProjects()

  // Create static routes
  const staticRoutes = siteConfig.staticRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.8
  }))

  // Create blog post routes
  const blogRoutes = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.publishedAt || new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6
  }))

  // Create project routes
  const projectRoutes = projects.map(project => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: project.publishedAt || new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }))

  return [...staticRoutes, ...blogRoutes, ...projectRoutes]
}
