import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import { mdxServerComponents } from '@/lib/mdx-server-components'

interface MDXRemoteWrapperProps extends MDXRemoteProps {
  children?: React.ReactNode
}

export async function MDXRemoteWrapper(props: MDXRemoteWrapperProps) {
  return (
    <MDXRemote
      {...props}
      components={{
        ...mdxServerComponents,
        ...(props.components || {})
      }}
    />
  )
}
