'use client'

import { StaggerItem } from '../framer/transitions'

interface SectionAnimationProps {
  children: React.ReactNode
}

export function SectionAnimation({ children }: SectionAnimationProps) {
  return (
    <StaggerItem
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
    >
      {children}
    </StaggerItem>
  )
}
