'use client'

import { HTMLMotionProps, motion } from 'framer-motion'

// Export motion components
/**
 * Re-exports of `framer-motion` components for consistent usage.
 * These components provide animation capabilities to standard HTML elements.
 */
export const MotionDiv = motion.div
export const MotionSection = motion.section
export const MotionH1 = motion.h1
export const MotionP = motion.p

// Export types
export type { HTMLMotionProps }
