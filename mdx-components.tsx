import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
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
    p: ({ children }) => (
      <p className='my-4 leading-7'>{children}</p>
    ),
    // Add proper list spacing
    ul: ({ children }) => (
      <ul className='my-4 ml-6 list-disc space-y-2'>{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className='my-4 ml-6 list-decimal space-y-2'>{children}</ol>
    ),
    // Merge with any other components passed in
    ...components,
  }
}