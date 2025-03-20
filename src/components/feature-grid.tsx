import { FeatureGridProps } from './types';

export const FeatureGrid: React.FC<FeatureGridProps> = () => (
  <div className="grid md:grid-cols-3 gap-8">
    {[
      {
        icon: "📚",
        title: "Smart Task Organization",
        description: "Automatically organize and prioritize your assignments. Break down complex projects into manageable subtasks.",
        features: [
          "Auto-categorization by due date",
          "Smart priority assignment",
          "Subtask management",
          "Progress tracking"
        ]
      },
      {
        icon: "🔄",
        title: "LMS Integration",
        description: "Seamlessly sync with your university's learning management system. Never miss an assignment or deadline.",
        features: [
          "Canvas integration",
          "Brightspace sync",
          "Blackboard support",
          "Real-time updates"
        ]
      },
      {
        icon: "🤖",
        title: "AI Study Planning",
        description: "Let AI handle your study schedule. Get personalized plans based on your learning style and workload.",
        features: [
          "Smart time allocation",
          "Adaptive scheduling",
          "Focus time optimization",
          "Study pattern analysis"
        ]
      },
      {
        icon: "⏱️",
        title: "Time Tracking",
        description: "Track your study time and optimize your productivity. Understand where your time goes and improve focus.",
        features: [
          "Focus session tracking",
          "Progress analytics",
          "Study pattern insights",
          "Break reminders"
        ]
      },
      {
        icon: "📊",
        title: "Progress Analytics",
        description: "Visualize your academic progress with detailed analytics. Stay motivated with clear progress indicators.",
        features: [
          "Completion rate tracking",
          "Time usage analysis",
          "Performance trends",
          "Goal achievement stats"
        ]
      },
      {
        icon: "🎯",
        title: "Smart Reminders",
        description: "Get intelligent reminders based on your study patterns and deadlines. Stay on track without the stress.",
        features: [
          "AI-powered notifications",
          "Priority alerts",
          "Study streak tracking",
          "Break reminders"
        ]
      }
    ].map((feature, i) => (
      <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/5">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
            <span className="text-2xl">{feature.icon}</span>
          </div>
          <h3 className="text-xl text-white font-light">{feature.title}</h3>
        </div>
        <p className="text-gray-400 font-light mb-6 leading-relaxed">
          {feature.description}
        </p>
        <div className="space-y-3">
          {feature.features.map((item, j) => (
            <div key={j} className="flex items-center gap-3">
              <span className="text-pink-500/60">→</span>
              <span className="text-gray-400 font-light text-sm hover:text-pink-500 transition-colors">{item}</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);
