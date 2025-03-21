"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "features", label: "Features" },
  { id: "tasks", label: "Tasks" },
  { id: "ai-assistant", label: "AI Assistant" },
  { id: "comparison", label: "Comparison" },
  { id: "testimonials", label: "Testimonials" },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(({ id }) => 
        document.getElementById(id)
      );

      const currentSection = sectionElements.find((element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-8 left-8 flex flex-col space-y-4 z-50" aria-label="Main navigation">
      {/* Logo */}
      <button
        onClick={() => scrollToSection("hero")}
        className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
        aria-label="Refine - Back to home"
      >
        <span className="text-white font-light text-xl">refine</span>
        <span className="w-2 h-2 rounded-full bg-pink-500" aria-hidden="true" />
      </button>

      {/* Section Navigation */}
      <div 
        className="bg-white/5 backdrop-blur-sm rounded-xl py-2"
        role="menubar"
      >
        <ul className="flex flex-col space-y-1">
          {sections.slice(1).map(({ id, label }) => (
            <li key={id} role="none" className="px-2">
              <button
                onClick={() => scrollToSection(id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors
                  ${activeSection === id 
                    ? "text-white bg-white/10 border border-pink-500/50" 
                    : "text-white/60 hover:text-white hover:bg-white/5"}
                  focus:outline-none focus:ring-2 focus:ring-pink-500`}
                role="menuitem"
                aria-label={`Navigate to ${label} section`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
