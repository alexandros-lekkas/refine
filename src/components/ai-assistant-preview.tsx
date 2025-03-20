import { AIAssistantPreviewProps } from './types';

export const AIAssistantPreview: React.FC<AIAssistantPreviewProps> = () => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/5 p-8">
    <div className="grid grid-cols-2 gap-8">
      <div>
        <div className="bg-white/5 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <p className="text-white font-light">AI Assistant</p>
              <p className="text-gray-400 text-sm">Analyzing your workload...</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white font-light mb-2">Project Breakdown</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400 hover:text-pink-500 transition-colors">Research Phase</span>
                    <span className="text-pink-500">4 hours</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400 hover:text-pink-500 transition-colors">Data Analysis</span>
                    <span className="text-pink-500">3 hours</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400 hover:text-pink-500 transition-colors">Report Writing</span>
                    <span className="text-pink-500">3 hours</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white font-light mb-3">Suggested Schedule</p>
              <div className="space-y-3">
                {[
                  { day: "Monday", tasks: ["Research: Literature Review", "Data Collection"] },
                  { day: "Tuesday", tasks: ["Data Analysis", "Initial Findings"] },
                  { day: "Wednesday", tasks: ["Report Writing", "Final Review"] }
                ].map((day, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="text-gray-400 text-sm w-24">{day.day}</div>
                    <div className="flex-1">
                      {day.tasks.map((task, j) => (
                        <div key={j} className="text-white/80 text-sm mb-1 font-light hover:text-pink-500 transition-colors">{task}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white/5 rounded-xl p-6">
          <p className="text-white font-light mb-4">Time Usage Analytics</p>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400 hover:text-pink-500 transition-colors">Weekly Study Hours</p>
                <p className="text-white font-light">32h</p>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400 hover:text-pink-500 transition-colors">Task Completion Rate</p>
                <p className="text-white font-light">98%</p>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400 hover:text-pink-500 transition-colors">Focus Time</p>
                <p className="text-white font-light">5.2h/day</p>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6">
          <p className="text-white font-light mb-4">AI Suggestions</p>
          <div className="space-y-3">
            {[
              "Schedule deep work sessions in the morning for better focus",
              "Break down large assignments into 45-minute chunks",
              "Take a 15-minute break every 2 hours of study",
              "Review material from previous sessions before starting new topics"
            ].map((suggestion, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-pink-500 mt-1">→</span>
                <p className="text-gray-400 font-light hover:text-pink-500 transition-colors">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
