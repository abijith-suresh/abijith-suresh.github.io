'use client'

interface MDXContentProps {
  children: React.ReactNode
}

/**
 * Renders MDX content within a styled container.
 * Applies `prose` classes for beautiful typography, handling dark mode automatically.
 */
function MDXContent({ children }: MDXContentProps) {
  return (
    <div className='prose prose-lg dark:prose-invert max-w-none'>
      {children}
    </div>
  )
}

export default MDXContent
