import { ParallaxSection } from '../components/parallax-section';

const Hero = () => (
  <section className="bg-gradient-to-b from-[#0B0A0F] to-black min-h-screen flex items-center relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5"></div>
    
    <div className="container mx-auto px-4 py-32 relative">
      <div className="max-w-4xl">
        <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-4">AI-POWERED ACADEMIC PLANNING</p>
        <h1 className="text-6xl font-light text-white mb-6 leading-tight">
          Study smarter with
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent block mt-2">
            AI-powered planning
          </span>
        </h1>
        <p className="text-gray-400 text-xl font-light mb-12 leading-relaxed max-w-2xl opacity-75">
          Let AI handle your deadlines and study planning. Automatically sync assignments from your LMS, get smart breakdowns of big projects, and never miss a deadline again.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6">
          <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl text-lg font-normal hover:opacity-90 transition-opacity">
            Sign Up & Sync Your LMS
          </button>
          <button className="px-8 py-4 bg-white/5 text-white rounded-xl text-lg font-normal hover:bg-white/10 transition-colors border border-white/10">
            See How It Works
          </button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/5 pt-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl text-white font-light">3x</span>
              <span className="text-pink-500">↑</span>
            </div>
            <p className="text-gray-400 font-light">Study Efficiency</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl text-white font-light">98%</span>
              <span className="text-pink-500">✓</span>
            </div>
            <p className="text-gray-400 font-light">Assignment Completion</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl text-white font-light">2h</span>
              <span className="text-pink-500">↓</span>
            </div>
            <p className="text-gray-400 font-light">Daily Time Saved</p>
          </div>
        </div>

        <div className="mt-16 grid sm:grid-cols-3 gap-6">
          {[
            {
              title: "Smart Sync",
              description: "Auto-sync with Canvas, Brightspace & Blackboard"
            },
            {
              title: "AI Planning",
              description: "Get personalized study schedules and task breakdowns"
            },
            {
              title: "Time Tracking",
              description: "Track progress and optimize your study patterns"
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5">
              <h3 className="text-white font-light text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 font-light text-sm opacity-75">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const FeatureGrid = () => (
  <div className="grid md:grid-cols-2 gap-8 mt-16">
    {[
      {
        icon: "🎯",
        title: "Error Prevention",
        description: "Catch assignment issues before submission to prevent missed deadlines"
      },
      {
        icon: "📊",
        title: "Predictive Analytics",
        description: "Understand how much time each task will take before you start"
      },
      {
        icon: "📱",
        title: "Task Status",
        description: "Get real-time updates on assignments and progress tracking"
      },
      {
        icon: "⚡️",
        title: "Smart Management",
        description: "Get instant insights for better academic performance"
      }
    ].map((feature, i) => (
      <div 
        key={i} 
        className="group relative p-8 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute inset-0 border border-gray-800 group-hover:border-pink-500/30 rounded-2xl transition-colors"></div>
        <div className="relative">
          <span className="text-3xl mb-4 block transform transition-transform group-hover:scale-110 group-hover:-rotate-12">{feature.icon}</span>
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-pink-400 transition-colors">{feature.title}</h3>
          <p className="text-gray-400">{feature.description}</p>
        </div>
      </div>
    ))}
  </div>
);

const TaskPreview = () => (
  <div className="grid md:grid-cols-3 gap-6 mt-16">
    {[
      {
        title: "Due Today",
        status: "due-today",
        tasks: [
          {
            courseCode: "CS401",
            title: "Neural Networks Project",
            date: "Mar 20",
            subtasks: ["Data preprocessing", "Model architecture"]
          }
        ]
      },
      {
        title: "Due Soon",
        status: "due-soon",
        tasks: [
          {
            courseCode: "MATH302",
            title: "Linear Algebra Assignment",
            date: "Mar 23",
            subtasks: ["Matrix operations", "Eigenvalues"]
          }
        ]
      },
      {
        title: "Start Soon",
        status: "start-soon",
        tasks: [
          {
            courseCode: "PHYS201",
            title: "Lab Report Analysis",
            date: "Mar 28",
            subtasks: ["Data visualization", "Error analysis"]
          }
        ]
      }
    ].map((column) => (
      <div key={column.title} className="space-y-4">
        <h3 className="text-lg font-semibold text-white">{column.title}</h3>
        {column.tasks.map((task) => (
          <div key={task.title} className="group bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800 hover:border-pink-500/20 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                column.status === "due-today" ? "bg-red-500/20 text-red-300" :
                column.status === "due-soon" ? "bg-blue-500/20 text-blue-300" :
                "bg-gray-500/20 text-gray-300"
              }`}>
                {task.date}
              </span>
              <span className="text-pink-500/80 text-sm">{task.courseCode}</span>
            </div>
            <h4 className="text-white font-medium mb-2 group-hover:text-pink-400 transition-colors">{task.title}</h4>
            <div className="space-y-1">
              {task.subtasks.map((subtask) => (
                <div key={subtask} className="flex items-center text-sm">
                  <span className="w-4 h-4 mr-2 rounded border border-gray-700 group-hover:border-pink-500/30 transition-colors"></span>
                  <span className="text-gray-400">{subtask}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const AIAssistantPreview = () => (
  <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
    <div className="space-y-6">
      <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
            <span className="text-lg">🤖</span>
          </div>
          <span className="text-pink-400 font-medium">AI Assistant</span>
        </div>
        <div className="space-y-4">
          <p className="text-gray-300">Here's your personalized study plan for the Neural Networks project:</p>
          <div className="space-y-3">
            {[
              { time: "1.5h", task: "Data Preprocessing", desc: "Clean and normalize dataset" },
              { time: "2h", task: "Model Architecture", desc: "Design neural network layers" },
              { time: "1h", task: "Training Setup", desc: "Configure hyperparameters" },
              { time: "1.5h", task: "Evaluation", desc: "Test and validate results" }
            ].map((item, i) => (
              <div key={i} className="flex items-start group">
                <div className="w-16 shrink-0">
                  <span className="text-pink-500/80 text-sm font-medium">{item.time}</span>
                </div>
                <div>
                  <p className="text-white group-hover:text-pink-400 transition-colors font-medium">{item.task}</p>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-800">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Total estimated time:</span>
              <span className="text-pink-400 font-medium">6 hours</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
            <span className="text-lg">📊</span>
          </div>
          <span className="text-pink-400 font-medium">Time Analytics</span>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Focus time today</span>
            <span className="text-white font-medium">2.5h / 6h</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full w-[42%] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="text-center p-2 rounded-lg bg-gray-800/50">
              <p className="text-pink-400 font-medium">85%</p>
              <p className="text-xs text-gray-400">Focus rate</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-gray-800/50">
              <p className="text-pink-400 font-medium">3</p>
              <p className="text-xs text-gray-400">Tasks done</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-gray-800/50">
              <p className="text-pink-400 font-medium">2</p>
              <p className="text-xs text-gray-400">To go</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="space-y-6">
      <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
            <span className="text-lg">✨</span>
          </div>
          <span className="text-pink-400 font-medium">Smart Suggestions</span>
        </div>
        <div className="space-y-4">
          <p className="text-gray-300">Based on your study patterns and deadlines:</p>
          <div className="space-y-3">
            {[
              "Schedule deep work session for Neural Networks project tomorrow morning",
              "Take a 15min break after completing Data Preprocessing",
              "Review Linear Algebra concepts before starting the assignment",
              "Consider starting Lab Report early to avoid weekend work"
            ].map((suggestion, i) => (
              <div key={i} className="flex items-start gap-3 group">
                <span className="text-pink-500/80">•</span>
                <p className="text-gray-300 group-hover:text-white transition-colors">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ComparisonSection = () => (
  <section className="bg-gradient-to-br from-gray-900 to-black py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl text-white font-normal mb-2">Without Refine</h3>
          <p className="text-gray-500 text-sm mb-8">The old way is holding you back</p>
          <div className="space-y-4">
            {[
              { title: "Hard to locate assignments", desc: "Scattered across Canvas, Brightspace, and Blackboard" },
              { title: "Manual deadline tracking", desc: "Leads to forgotten assignments" },
              { title: "No clear starting point", desc: "Big projects feel overwhelming" },
              { title: "Time estimation guesswork", desc: "Guessing how much time assignments will take" },
              { title: "No smart prioritization", desc: "Tasks pile up with no clear order" },
              { title: "Manual schedule adjustments", desc: "Constant manual schedule adjustments" },
              { title: "Tool overload", desc: "Switching between too many different tools" },
              { title: "Stress and overwhelm", desc: "School stress feels unmanageable" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-gray-900/50 backdrop-blur-sm rounded-xl">
                <span className="text-red-500 font-normal shrink-0">✕</span>
                <div>
                  <p className="text-gray-200 font-normal">{item.title}</p>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl text-white font-normal mb-2">With Refine</h3>
          <p className="text-gray-500 text-sm mb-8">AI-powered academic planning</p>
          <div className="space-y-4">
            {[
              { title: "Automatic assignment sync", desc: "All your assignments automatically synced in one place" },
              { title: "Smart deadline tracking", desc: "Smart deadline tracking and reminders" },
              { title: "AI project breakdown", desc: "AI breaks down big projects into manageable steps" },
              { title: "Intelligent estimates", desc: "Intelligent time estimates based on your work style" },
              { title: "Automated prioritization", desc: "Automated task prioritization and scheduling" },
              { title: "Dynamic rescheduling", desc: "Dynamic rescheduling when things change" },
              { title: "One unified tool", desc: "Everything integrated in one powerful tool" },
              { title: "Peace of mind", desc: "Peace of mind with an organized system" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-[#1a1625] backdrop-blur-sm rounded-xl">
                <span className="text-pink-500 font-normal shrink-0">✓</span>
                <div>
                  <p className="text-gray-200 font-normal">{item.title}</p>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CoreFeatures = () => (
  <section className="bg-gradient-to-b from-[#0B0A0F] to-black py-32 relative overflow-hidden">
    <div className="container mx-auto px-4">
      <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-4">FOR STUDENTS</p>
      <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-6">Core Features.</h2>
      <p className="text-gray-400 text-xl font-light mb-24 max-w-3xl leading-relaxed opacity-75">
        Core features enable real-time academic planning via automated task management and smart scheduling.
      </p>
      
      <div className="grid md:grid-cols-2 gap-x-32 gap-y-20">
        {[
          {
            title: "Task Management",
            description: "Automated task breakdown to reduce manual planning workload.",
          },
          {
            title: "LMS Integration",
            description: "Full course data sync to enable seamless assignment tracking.",
          },
          {
            title: "Time Planning",
            description: "Smart time allocation to ensure accurate study schedules.",
          },
          {
            title: "Progress Tracking",
            description: "Real-time progress monitoring with smart notifications.",
          }
        ].map((feature, i) => (
          <div key={i} className="group">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-pink-500/50 text-lg transform -translate-y-[1px]">→</span>
              <h3 className="text-[1.75rem] text-white font-light tracking-tight leading-none">{feature.title}</h3>
            </div>
            <p className="text-gray-400 text-lg font-light pl-8 leading-relaxed opacity-75">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="bg-gradient-to-b from-[#0B0A0F] to-black py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
    <div className="container mx-auto px-4">
      <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-4">TESTIMONIALS</p>
      <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-6">Student Stories.</h2>
      <p className="text-gray-400 text-xl font-light mb-24 max-w-3xl leading-relaxed opacity-75">
        See how students are transforming their academic life with Refine's AI-powered planning.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          {
            quote: "The task breakdown feature is incredible. What used to take me hours to plan now gets organized in minutes. The AI suggestions for breaking down big projects are spot-on.",
            author: "Sarah Chen",
            role: "Computer Science Major",
            metric: "3x faster project completion"
          },
          {
            quote: "I love how it integrates with my university's LMS. All my assignments are automatically synced and organized. The time tracking helps me understand my study patterns.",
            author: "Michael Park",
            role: "Engineering Student",
            metric: "98% assignment completion rate"
          },
          {
            quote: "The subtask management is a game-changer. Complex assignments become manageable steps, and the AI adjusts my schedule when things change.",
            author: "Emma Rodriguez",
            role: "Pre-Med Student",
            metric: "2 hours saved daily"
          },
          {
            quote: "Finally, a tool that understands how students actually work. The AI planning adapts to my style and helps me stay ahead of deadlines without burning out.",
            author: "David Kim",
            role: "Business Major",
            metric: "4.0 GPA maintained"
          }
        ].map((testimonial, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/5">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                <span className="text-2xl">{"👤"}</span>
              </div>
              <div>
                <p className="text-white font-light">{testimonial.author}</p>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-300 font-light text-lg leading-relaxed mb-6">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-2">
              <span className="text-pink-500">↗</span>
              <span className="text-gray-400 text-sm">{testimonial.metric}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="flex flex-col bg-black">
      <Hero />
      
      <ParallaxSection
        className="relative bg-gradient-to-br from-gray-900 to-black overflow-hidden"
        speed={0.5}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 py-32 relative">
          <CoreFeatures />
        </div>
      </ParallaxSection>

      <ParallaxSection
        className="relative bg-gradient-to-br from-gray-900 to-black overflow-hidden"
        speed={0.5}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 py-32 relative">
          <p className="text-pink-500 font-medium mb-4">TASK MANAGEMENT</p>
          <h2 className="text-4xl font-bold text-white mb-4">
            Your tasks, organized<br />
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">automatically.</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl">
            See all your assignments at a glance. Refine automatically organizes your tasks by due date and priority.
          </p>
          <TaskPreview />
        </div>
      </ParallaxSection>

      <ParallaxSection
        className="relative bg-gradient-to-br from-gray-900 to-black overflow-hidden"
        speed={0.5}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 py-32 relative">
          <ComparisonSection />
        </div>
      </ParallaxSection>

      <ParallaxSection
        className="relative bg-gradient-to-br from-gray-900 to-black overflow-hidden"
        speed={0.5}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 py-32 relative">
          <p className="text-pink-500 font-medium mb-4">AI ASSISTANT</p>
          <h2 className="text-4xl font-bold text-white mb-4">
            Study smarter with<br />
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">AI-powered planning.</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl">
            Get personalized study plans, time estimates, and smart suggestions based on your learning style.
          </p>
          <AIAssistantPreview />
        </div>
      </ParallaxSection>

      <ParallaxSection
        className="relative bg-gradient-to-br from-gray-900 to-black overflow-hidden"
        speed={0.5}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 py-32 relative">
          <Testimonials />
        </div>
      </ParallaxSection>

      <ParallaxSection
        className="relative bg-gradient-to-br from-gray-900 to-black overflow-hidden"
        speed={0.5}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 py-32 relative">
          <p className="text-pink-500 font-medium mb-4">FEATURES</p>
          <h2 className="text-4xl font-bold text-white mb-8">
            Bringing speed and intelligence<br />
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">to academic planning</span>
          </h2>
          <FeatureGrid />
        </div>
      </ParallaxSection>
    </div>
  );
}
