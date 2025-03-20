"use client";

import { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  id?: string;
}

export function ParallaxSection({ children, speed = 0.5, className = '', id }: ParallaxSectionProps) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 100 * speed]);

  return (
    <motion.section
      id={id}
      style={{ y }}
      className={`w-full relative ${className}`}
    >
      {children}
    </motion.section>
  );
}
