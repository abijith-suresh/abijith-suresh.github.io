import { highlight } from 'sugar-high'
import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'

/**
 * Renders code blocks with syntax highlighting using the 'sugar-high' library.
 * The highlighted HTML is injected directly using `dangerouslySetInnerHTML`.
 */
function Code({ children, ...props }: React.ComponentProps<'code'>) {
  const codeString = Array.isArray(children)
    ? children.join('')
    : String(children)
  const codeHTML = highlight(codeString)
  return (
    <code
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      className='bg-muted rounded px-[0.3rem] py-[0.2rem] font-mono text-sm'
      {...props}
    />
  )
}

export const mdxServerComponents: MDXComponents = {
  // Add proper heading styles
  h1: ({ children }) => (
    <h1 className='mt-8 mb-4 text-4xl font-bold'>{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className='mt-8 mb-4 text-3xl font-semibold'>{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className='mt-6 mb-4 text-2xl font-semibold'>{children}</h3>
  ),
  // Add proper paragraph spacing
  p: ({ children }) => <p className='my-4 leading-7'>{children}</p>,
  // Add proper list spacing
  ul: ({ children }) => (
    <ul className='my-4 ml-6 list-disc space-y-2'>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className='my-4 ml-6 list-decimal space-y-2'>{children}</ol>
  ),
  // Custom image component for responsive images
  img: props => (
    <Image
      {...props}
      alt={props.alt || ''}
      width={800}
      height={450}
      className='my-4 rounded-lg'
    />
  ),
  // Custom link component for consistent styling
  a: ({ children, ...props }) => (
    <a {...props} className='text-primary underline hover:no-underline'>
      {children}
    </a>
  ),
  // Custom blockquote styling
  blockquote: ({ children }) => (
    <blockquote className='border-primary border-l-4 pl-4 italic'>
      {children}
    </blockquote>
  ),
  // Custom pre (code block) styling
  pre: ({ children }) => (
    <pre className='overflow-x-auto rounded-md bg-gray-800 p-4 text-white'>
      {children}
    </pre>
  ),
  code: Code
}
