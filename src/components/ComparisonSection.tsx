export const ComparisonSection = () => {
  const features = [
    {
      title: "Task Management",
      refine: "AI-powered prioritization, smart deadlines, and automatic scheduling",
      others: "Basic to-do lists with manual prioritization"
    },
    {
      title: "Learning Analysis",
      refine: "Personal learning style detection and adaptive study recommendations",
      others: "One-size-fits-all approach to study planning"
    },
    {
      title: "LMS Integration",
      refine: "Deep integration with automatic grade tracking and assignment sync",
      others: "Limited or no integration with learning platforms"
    },
    {
      title: "Study Planning",
      refine: "Dynamic study plans that adapt to your progress and schedule",
      others: "Static schedules that require manual updates"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <p className="text-pink-500 font-normal text-sm uppercase tracking-wide mb-2">WHY CHOOSE REFINE</p>
        <h2 className="text-[3rem] text-white font-extralight tracking-tight mb-4">The Smarter Choice</h2>
        <p className="text-gray-400 text-lg font-light mb-8 max-w-2xl mx-auto leading-relaxed opacity-75">
          See how Refine transforms your academic planning experience compared to traditional tools.
        </p>
      </div>

      <div className="grid gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5"
          >
            <h3 className="text-white font-light text-lg mb-4">{feature.title}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-white text-sm font-light">Refine</p>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed pl-8">
                  {feature.refine}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm font-light">Others</p>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed pl-8">
                  {feature.others}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl text-lg font-normal hover:opacity-90 transition-opacity">
          Start Using Refine
        </button>
      </div>
    </div>
  );
};
