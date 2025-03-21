export const BubbleNav = () => {
  const sections = [
    { id: "hero", label: "refine" },
    { id: "tasks", label: "Tasks" },
    { id: "ai-assistant", label: "AI Assistant" },
    { id: "features", label: "Features" },
    { id: "comparison", label: "Why Refine" },
    { id: "testimonials", label: "Testimonials" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
      aria-label="Main navigation"
      role="navigation"
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative flex items-center"
          aria-label={`Navigate to ${section.label} section`}
          role="menuitem"
        >
          <div className="absolute right-full mr-4 px-2 py-1 rounded bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white/60 text-sm whitespace-nowrap">{section.label}</span>
          </div>
          <div className="w-3 h-3 rounded-full bg-white/5 border border-white/20 group-hover:bg-white/20 transition-colors"></div>
        </button>
      ))}
    </nav>
  );
};
