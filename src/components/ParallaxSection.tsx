import { ReactNode, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface ParallaxSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  speed?: number;
}

export const ParallaxSection = ({ id, children, className = '', speed = 0.5 }: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <section id={id} className={className} ref={sectionRef}>
      <motion.div style={{ y }} className="w-full">
        {children}
      </motion.div>
    </section>
  );
};
