'use client';

import { cn } from '@/lib/utils';
import { HTMLMotionProps, motion } from 'framer-motion';

interface StaggerInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  delay?: number
  staggerDelay?: number
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const item = {
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
      initial="hidden"
      animate="show"
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<'div'>) {
  return (
    <motion.div
      variants={item}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
