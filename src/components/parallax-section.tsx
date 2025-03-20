"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  title: string;
  description: string;
  imageSide?: "left" | "right";
  children?: React.ReactNode;
}

export function ParallaxSection({
  title,
  description,
  imageSide = "left",
  children,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  return (
    <section
      ref={ref}
      className="w-full min-h-screen py-20 bg-[#003B22] relative overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Content Container */}
      <div className="container mx-auto px-4 relative">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center ${
            imageSide === "right" ? "" : "md:grid-flow-dense"
          }`}
        >
          {/* Text Content */}
          <motion.div
            style={{ y, opacity }}
            className="space-y-6 text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              {title}
            </h2>
            <p className="text-lg text-gray-300">{description}</p>
          </motion.div>

          {/* Visual Content (Task Preview or AI Writing) */}
          <motion.div
            style={{ y: useTransform(y, (value) => `-${value}`), opacity }}
            className="relative"
          >
            <div className="bg-black/20 backdrop-blur-xl rounded-xl p-6 shadow-2xl border border-white/10">
              {children}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
