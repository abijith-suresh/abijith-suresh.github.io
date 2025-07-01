import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import { useMDXComponents } from '../../../mdx-components'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Code({ children, ...props }: any) {
  const codeHTML = highlight(children)
  return (
    <code
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      className='bg-muted rounded px-[0.3rem] py-[0.2rem] font-mono text-sm'
      {...props}
    />
  )
}

interface MDXRemoteWrapperProps extends MDXRemoteProps {
  children?: React.ReactNode
}

export async function MDXRemoteWrapper(props: MDXRemoteWrapperProps) {
  const mdxComponents = useMDXComponents({})

  return (
    <MDXRemote
      {...props}
      components={{
        ...mdxComponents,
        code: Code,
        ...(props.components || {})
      }}
    />
  )
}
