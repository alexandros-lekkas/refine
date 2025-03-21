export const AIAssistantPreview = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/5">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white text-xl">
            AI
          </div>
          <div>
            <h3 className="text-white font-light text-xl">Study Plan Assistant</h3>
            <p className="text-gray-400 text-sm">Analyzing your learning style...</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              Based on your course load and learning patterns, here's a suggested study schedule for this week:
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                <p className="text-white text-sm">Physics: 2 hours (Focus: Quantum Mechanics)</p>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <p className="text-white text-sm">Calculus: 1.5 hours (Practice Integration)</p>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <p className="text-white text-sm">Literature: 1 hour (Essay Planning)</p>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-pink-400 text-sm">💡 Smart Suggestion</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your performance data shows better retention in morning study sessions. Consider starting with Physics at 9 AM when your analytical skills peak.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-white/5 text-white rounded-lg text-sm hover:bg-white/10 transition-colors">
              Adjust Schedule
            </button>
            <button className="px-4 py-2 bg-white/5 text-white rounded-lg text-sm hover:bg-white/10 transition-colors">
              View Details
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Accuracy</span>
            <div className="w-20 h-2 rounded-full bg-white/10">
              <div className="w-4/5 h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
