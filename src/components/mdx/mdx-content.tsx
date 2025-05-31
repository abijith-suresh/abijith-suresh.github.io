import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import { useMDXComponents } from '../../../mdx-components'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export default async function MDXContent(props: MDXRemoteProps) {
  const mdxComponents = useMDXComponents({})

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <MDXRemote
        {...props}
        components={{
          ...mdxComponents,
          code: Code,
          ...(props.components || {})
        }}
      />
    </div>
  )
}