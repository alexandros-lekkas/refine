export const FeatureGrid = () => {
  const features = [
    {
      icon: "📊",
      title: "Smart Analytics",
      description: "Track your study patterns and get insights to optimize your learning efficiency."
    },
    {
      icon: "🎯",
      title: "Task Prioritization",
      description: "AI-powered system automatically prioritizes your assignments and deadlines."
    },
    {
      icon: "🧠",
      title: "Learning Style Analysis",
      description: "Personalized study recommendations based on your unique learning patterns."
    },
    {
      icon: "⚡️",
      title: "LMS Integration",
      description: "Seamlessly sync with Canvas, Brightspace, and other major learning platforms."
    },
    {
      icon: "📱",
      title: "Cross-Platform",
      description: "Access your study plans and tasks from any device, anywhere."
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description: "Easy sharing and collaboration features for group projects and study sessions."
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:bg-white/10 transition-colors group"
        >
          <div className="text-2xl mb-4">{feature.icon}</div>
          <h3 className="text-white font-light text-lg mb-2">{feature.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
          <div className="mt-4 flex items-center gap-2 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-sm">Learn more</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};
