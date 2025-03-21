"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "refine" },
  { id: "tasks", label: "Tasks" },
  { id: "ai-assistant", label: "AI Assistant" },
  { id: "features", label: "Features" },
  { id: "comparison", label: "Why Refine" },
  { id: "testimonials", label: "Testimonials" },
];

export function BubbleNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(({ id }) => 
        document.getElementById(id)
      );

      const currentSection = sectionElements.find((element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav 
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50"
      aria-label="Section navigation"
    >
      <div className="flex flex-col items-center gap-6">
        {sections.map(({ id, label }) => (
          <div 
            key={id}
            className="group relative flex items-center"
            onMouseEnter={() => setHoveredSection(id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <button
              onClick={() => scrollToSection(id)}
              className={`relative z-10 w-2 h-2 rounded-full transition-all duration-300
                bg-white/20 hover:bg-pink-500 hover:scale-150
                ${activeSection === id ? 'bg-pink-500' : ''}`}
              aria-label={`Go to ${label} section`}
            />
            {hoveredSection === id && (
              <div className="absolute right-6 whitespace-nowrap
                bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg
                animate-in fade-in slide-in-from-right-2 duration-200">
                <span className="text-white/90 text-sm font-light">{label}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
