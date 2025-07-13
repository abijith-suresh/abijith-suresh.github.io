import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const rootDirectory = path.join(process.cwd(), 'content', 'projects')

export type Project = {
  metadata: ProjectMetadata
  content: string
}

export type ProjectMetadata = {
  title?: string
  summary?: string
  image?: string
  author?: string
  publishedAt?: string
  slug: string
}

// Ensure the projects directory exists
/**
 * Ensures that the projects content directory exists, creating it if it doesn't.
 */
function ensureDirectoryExists() {
  if (!fs.existsSync(rootDirectory)) {
    fs.mkdirSync(rootDirectory, { recursive: true })
  }
}

/**
 * Retrieves a single project by its slug.
 * @param slug - The slug of the project to retrieve.
 * @returns A Promise that resolves to the Project object or null if not found/error.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  ensureDirectoryExists()

  try {
    const filePath = path.join(rootDirectory, `${slug}.mdx`)
    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data, content } = matter(fileContent)
    return {
      metadata: {
        ...data,
        slug,
        title: data.title || 'Untitled Project',
        summary: data.summary || 'Project details coming soon'
      },
      content
    }
  } catch (error) {
    console.error('Failed to load project:', error)
    return null
  }
}

/**
 * Retrieves a list of project metadata, optionally limited by count.
 * Projects are sorted by published date in descending order.
 * @param limit - Optional. The maximum number of projects to return.
 * @returns A Promise that resolves to an array of ProjectMetadata.
 */
export async function getProjects(limit?: number): Promise<ProjectMetadata[]> {
  ensureDirectoryExists()

  try {
    const files = fs.readdirSync(rootDirectory)

    // Filter for only .mdx files
    const mdxFiles = files.filter(file => file.endsWith('.mdx'))

    if (mdxFiles.length === 0) {
      return []
    }

    const projects = mdxFiles
      .map(file => getProjectMetadata(file))
      .filter((project): project is ProjectMetadata => project !== null)
      .sort((a, b) => {
        if (new Date(a.publishedAt ?? '') < new Date(b.publishedAt ?? '')) {
          return 1
        } else {
          return -1
        }
      })

    if (limit) {
      return projects.slice(0, limit)
    }

    return projects
  } catch (error) {
    console.error('Failed to get projects:', error)
    return []
  }
}

/**
 * Extracts metadata from a single project MDX file.
 * @param filepath - The filename of the MDX project (e.g., 'my-project.mdx').
 * @returns The ProjectMetadata object or null if an error occurs.
 */
export function getProjectMetadata(filepath: string): ProjectMetadata | null {
  try {
    const slug = filepath.replace(/\.mdx$/, '')
    const filePath = path.join(rootDirectory, filepath)

    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
    const { data } = matter(fileContent)

    return {
      ...data,
      slug,
      title: data.title || 'Untitled Project',
      summary: data.summary || 'Project details coming soon'
    }
  } catch (error) {
    console.error('Failed to get project metadata:', error)
    return null
  }
}
