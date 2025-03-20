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
  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/5 p-8">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-pink-500 text-white rounded-lg text-sm font-normal">All Tasks</button>
          <button className="px-4 py-2 bg-white/5 text-white rounded-lg text-sm font-normal">Calendar</button>
        </div>
        <div className="h-6 w-px bg-white/10"></div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 text-white rounded-lg text-sm font-normal">Today</button>
          <button className="px-4 py-2 bg-white/5 text-white rounded-lg text-sm font-normal">Week</button>
          <button className="px-4 py-2 bg-white/5 text-white rounded-lg text-sm font-normal">Month</button>
        </div>
      </div>
      <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg text-sm font-normal">
        + Add Task
      </button>
    </div>

    <div className="grid grid-cols-3 gap-8">
      {[
        {
          title: "Due Today",
          color: "bg-red-500/10",
          textColor: "text-red-400",
          tasks: [
            {
              course: "CS 101",
              title: "Algorithm Analysis Assignment",
              time: "Due in 3 hours",
              progress: 80,
              subtasks: "4/5 completed"
            },
            {
              course: "MATH 201",
              title: "Linear Algebra Quiz",
              time: "Due in 5 hours",
              progress: 60,
              subtasks: "3/5 completed"
            }
          ]
        },
        {
          title: "Due Soon",
          color: "bg-blue-500/10",
          textColor: "text-blue-400",
          tasks: [
            {
              course: "PHYS 202",
              title: "Lab Report: Wave Motion",
              time: "Due tomorrow",
              progress: 40,
              subtasks: "2/6 completed"
            },
            {
              course: "ENG 301",
              title: "Research Paper Draft",
              time: "Due in 2 days",
              progress: 20,
              subtasks: "1/4 completed"
            }
          ]
        },
        {
          title: "Start Soon",
          color: "bg-gray-500/10",
          textColor: "text-gray-400",
          tasks: [
            {
              course: "BIO 301",
              title: "Genetics Project",
              time: "Due next week",
              progress: 0,
              subtasks: "0/5 planned"
            },
            {
              course: "CHEM 202",
              title: "Lab Experiment Report",
              time: "Due in 10 days",
              progress: 0,
              subtasks: "0/4 planned"
            }
          ]
        }
      ].map((column, i) => (
        <div key={i} className={`${column.color} rounded-xl p-6`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`${column.textColor} font-light text-lg`}>{column.title}</h3>
            <span className="text-white/60 text-sm">{column.tasks.length} tasks</span>
          </div>
          <div className="space-y-4">
            {column.tasks.map((task, j) => (
              <div key={j} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-white/60 text-sm mb-1">{task.course}</p>
                    <p className="text-white font-light">{task.title}</p>
                  </div>
                  <div className="bg-white/5 px-2 py-1 rounded text-sm text-white/60">
                    {task.time}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">{task.subtasks}</span>
                    <span className="text-white/60">{task.progress}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AIAssistantPreview = () => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/5 p-8">
    <div className="grid grid-cols-2 gap-8">
      <div>
        <div className="bg-white/5 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
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
                    <span className="text-gray-400">Research Phase</span>
                    <span className="text-pink-500">4 hours</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Data Analysis</span>
                    <span className="text-pink-500">3 hours</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Report Writing</span>
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
                        <div key={j} className="text-white/80 text-sm mb-1 font-light">{task}</div>
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
                <p className="text-gray-400 text-sm">Weekly Study Hours</p>
                <p className="text-white font-light">32h</p>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400 text-sm">Task Completion Rate</p>
                <p className="text-white font-light">98%</p>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400 text-sm">Focus Time</p>
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
              <div key={i} className="flex items-start gap-3">
                <span className="text-pink-500 mt-1">→</span>
                <p className="text-gray-400 text-sm font-light">{suggestion}</p>
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
