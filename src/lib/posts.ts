import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

const rootDirectory = path.join(process.cwd(), 'content', 'posts')

export type Post = {
  metadata: PostMetadata
  content: string
}

export type PostMetadata = {
  title?: string
  summary?: string
  image?: string
  author?: string
  publishedAt?: string
  slug: string
}

// Ensure the posts directory exists
function ensureDirectoryExists() {
  if (!fs.existsSync(rootDirectory)) {
    fs.mkdirSync(rootDirectory, { recursive: true })
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
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
        title: data.title || 'Untitled Post',
        summary: data.summary || 'No summary available'
      },
      content
    }
  } catch (error) {
    console.error('Failed to load post:', error)
    return null
  }
}

export async function getPosts(limit?: number): Promise<PostMetadata[]> {
  ensureDirectoryExists()

  try {
    const files = fs.readdirSync(rootDirectory)

    // Filter for only .mdx files
    const mdxFiles = files.filter(file => file.endsWith('.mdx'))

    if (mdxFiles.length === 0) {
      return []
    }

    const posts = mdxFiles
      .map(file => getPostMetadata(file))
      .filter((post): post is PostMetadata => post !== null)
      .sort((a, b) => {
        if (new Date(a.publishedAt ?? '') < new Date(b.publishedAt ?? '')) {
          return 1
        } else {
          return -1
        }
      })

    if (limit) {
      return posts.slice(0, limit)
    }

    return posts
  } catch (error) {
    console.error('Failed to get posts:', error)
    return []
  }
}

export function getPostMetadata(filepath: string): PostMetadata | null {
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
      title: data.title || 'Untitled Post',
      summary: data.summary || 'No summary available'
    }
  } catch (error) {
    console.error('Failed to get post metadata:', error)
    return null
  }
}