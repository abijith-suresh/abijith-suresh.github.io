'use client';

import { StaggerItem } from './animations/stagger-in';

interface HeroAnimationProps {
  children: React.ReactNode;
}

export function HeroAnimation({ children }: HeroAnimationProps) {
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
  );
}