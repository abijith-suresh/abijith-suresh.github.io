import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

interface FadeInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  delay?: number
}

export function FadeIn({
  children,
  delay = 0,
  className,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}
