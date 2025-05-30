import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import { JSX } from 'react'
import { highlight } from 'sugar-high'

function Code({ children, ...props }: any) {
  const codeHTML = highlight(children)
  return (
    <code
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
      {...props}
    />
  )
}

// Import our MDX components from the root mdx-components.tsx
import { useMDXComponents } from '../../mdx-components'

export default function MDXContent(
  props: JSX.IntrinsicAttributes & MDXRemoteProps
) {
  // Get our custom components
  const mdxComponents = useMDXComponents({})

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <MDXRemote
        {...props}
        components={{
          ...mdxComponents,
          code: Code,
          ...(props.components || {}),
        }}
      />
    </div>
  )
}