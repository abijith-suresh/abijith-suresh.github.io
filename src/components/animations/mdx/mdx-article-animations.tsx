'use client'

import { ReactNode } from 'react'
import { MotionDiv } from '../framer/motion'

interface MDXArticleAnimationsProps {
  header: ReactNode
  content: ReactNode
}

export default function MDXArticleAnimations({
  header,
  content
}: MDXArticleAnimationsProps) {
  return (
    <>
      <MotionDiv
        className='mb-8'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.21, 0.47, 0.32, 0.98]
        }}
      >
        {header}
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.21, 0.47, 0.32, 0.98],
          delay: 0.1
        }}
      >
        {content}
      </MotionDiv>
    </>
  )
}
