'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { HTMLMotionProps } from './motion'

interface StaggerInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  delay?: number
  staggerDelay?: number
}

// Animation variants
/**
 * Defines animation variants for a container that staggers its children's animations.
 * `hidden` sets initial opacity to 0. `show` sets opacity to 1 and staggers children.
 */
export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

/**
 * Defines animation variants for individual items within a staggered animation container.
 * `hidden` sets initial opacity to 0 and moves the item down by 20px. `show` animates to full opacity and original position.
 */
export const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98]
    }
  }
}

// Animation components
/**
 * A container component that orchestrates staggered animations for its children.
 * Children wrapped in `StaggerItem` will animate in sequence.
 * @param children - The React nodes to be animated.
 * @param delay - Initial delay before the animation starts.
 * @param staggerDelay - Delay between each child's animation.
 * @param className - Optional CSS class names.
 */
export function StaggerIn({
  children,
  delay = 0,
  staggerDelay = 0.1,
  className,
  ...props
}: StaggerInProps) {
  return (
    <motion.div
      variants={{
        ...container,
        show: {
          ...container.show,
          transition: {
            ...container.show.transition,
            delayChildren: delay,
            staggerChildren: staggerDelay
          }
        }
      }}
      initial='hidden'
      animate='show'
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * A component that applies an individual animation defined by the `item` variant.
 * Should be used as a child of `StaggerIn` to participate in staggered animations.
 * @param children - The React nodes to be animated.
 * @param className - Optional CSS class names.
 */
export function StaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<'div'>) {
  return (
    <motion.div variants={item} className={cn(className)} {...props}>
      {children}
    </motion.div>
  )
}
