import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import { mdxServerComponents } from '@/lib/mdx-server-components'

interface MDXRemoteWrapperProps extends MDXRemoteProps {
  children?: React.ReactNode
}

/**
 * A wrapper component for `next-mdx-remote/rsc` that integrates custom MDX components.
 * It merges `mdxServerComponents` with any additional components passed via props.
 */
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
