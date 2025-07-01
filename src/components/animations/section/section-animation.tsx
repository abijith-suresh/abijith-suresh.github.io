'use client'

import { StaggerItem } from '../framer/transitions'

interface SectionAnimationProps {
  children: React.ReactNode
}

/**
 * A component that applies a fade-in and slide-up animation to its children.
 * Utilizes `StaggerItem` from framer-motion for the animation effect, with a slight delay.
 */
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
