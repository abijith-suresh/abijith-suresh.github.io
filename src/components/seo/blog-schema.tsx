import { PostMetadata } from '@/lib/posts'

interface BlogSchemaProps {
  post: PostMetadata
  url: string
}

export default function BlogSchema({ post, url }: BlogSchemaProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary,
    image: post.image || '/og-image.jpg',
    datePublished: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author || 'Abijith',
      url: 'https://abijith.sh'
    },
    publisher: {
      '@type': 'Person',
      name: 'Abijith',
      url: 'https://abijith.sh'
    },
    url: url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    }
  }

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
