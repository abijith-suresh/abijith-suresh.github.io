import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const withMDX = createMDX({
  // Add markdown plugins here, if needed
  options: {
    remarkPlugins: [],
    rehypePlugins: []
  }
})

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx']
}

export default withMDX(nextConfig)
