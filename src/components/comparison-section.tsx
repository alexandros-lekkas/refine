import { ComparisonSectionProps } from './types';

export const ComparisonSection: React.FC<ComparisonSectionProps> = () => (
  <div className="max-w-4xl">
    <div className="grid md:grid-cols-2 gap-16">
      <div>
        <h3 className="text-2xl text-white font-light mb-8">Traditional Planning</h3>
        <div className="space-y-6">
          {[
            {
              icon: "✕",
              title: "Manual Task Management",
              description: "Spend hours organizing assignments and creating study schedules"
            },
            {
              icon: "✕",
              title: "No LMS Integration",
              description: "Manually copy assignments and deadlines from your LMS"
            },
            {
              icon: "✕",
              title: "Basic Time Tracking",
              description: "Simple timers without insights or pattern analysis"
            },
            {
              icon: "✕",
              title: "Static Planning",
              description: "Fixed schedules that don't adapt to your progress"
            }
          ].map((item, i) => (
            <div key={i} className="group flex items-start gap-4 p-4 rounded-xl border border-white/5 hover:border-pink-500 backdrop-blur-sm bg-white/[0.02] transition-all">
              <span className="text-red-500/70 text-lg mt-1">{item.icon}</span>
              <div>
                <h4 className="text-white font-light mb-1">{item.title}</h4>
                <p className="text-gray-400 text-sm font-light">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl text-white font-light mb-8">Refine AI Assistant</h3>
        <div className="space-y-6">
          {[
            {
              icon: "✓",
              title: "AI-Powered Organization",
              description: "Automatically organize and break down tasks into optimal study blocks"
            },
            {
              icon: "✓",
              title: "Seamless LMS Sync",
              description: "Auto-sync with Canvas, Brightspace, and Blackboard in real-time"
            },
            {
              icon: "✓",
              title: "Smart Time Analytics",
              description: "Track study patterns and get personalized optimization tips"
            },
            {
              icon: "✓",
              title: "Adaptive Planning",
              description: "AI adjusts your schedule based on progress and learning style"
            }
          ].map((item, i) => (
            <div key={i} className="group flex items-start gap-4 p-4 rounded-xl border border-white/5 hover:border-pink-500 backdrop-blur-sm bg-white/[0.02] transition-all">
              <span className="text-green-400 text-lg mt-1">{item.icon}</span>
              <div>
                <h4 className="text-white font-light mb-1">{item.title}</h4>
                <p className="text-gray-400 text-sm font-light">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
