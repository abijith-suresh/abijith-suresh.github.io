'use client'

import { StaggerIn } from '../framer/transitions'

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

/**
 * A component that applies a staggered fade-in and slide-up animation to its children.
 * Utilizes `StaggerIn` from framer-motion for the animation effect.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <StaggerIn
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </StaggerIn>
  )
}
