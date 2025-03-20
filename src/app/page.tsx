import { ParallaxSection } from '../components/parallax-section';

const Hero = () => (
  <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-[#0B0A0F]"></div>
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5"></div>
    
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-pink-500/20 to-transparent rounded-full blur-3xl"></div>
    
    <div className="container mx-auto px-4 py-32 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-white/5">
          <span className="text-pink-500 font-light">New</span>
          <span className="text-gray-400 font-light">AI Study Planning Now Available</span>
        </div>

        <h1 className="text-[5rem] text-white font-extralight tracking-tight mb-8 leading-[1.1]">
          Your Academic Success,
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent block mt-2">
            AI-Powered
          </span>
        </h1>

        <p className="text-gray-400 text-xl font-light mb-12 leading-relaxed max-w-2xl mx-auto opacity-75">
          Seamlessly sync with your LMS, get AI-powered study plans, and never miss a deadline. Join thousands of students transforming their academic journey.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
          <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl text-lg font-normal hover:opacity-90 transition-opacity">
            Sign Up & Sync Your LMS
          </button>
          <button className="px-8 py-4 bg-white/5 text-white rounded-xl text-lg font-normal hover:bg-white/10 transition-colors border border-white/5">
            See How It Works
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5">
            <div className="text-2xl mb-2">🎯</div>
            <p className="text-white font-light mb-2">Smart Planning</p>
            <p className="text-gray-400 text-sm font-light">AI-powered study schedules that adapt to your style</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5">
            <div className="text-2xl mb-2">🔄</div>
            <p className="text-white font-light mb-2">LMS Sync</p>
            <p className="text-gray-400 text-sm font-light">Instant sync with Canvas, Brightspace & more</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-white font-light mb-2">Time Analytics</p>
            <p className="text-gray-400 text-sm font-light">Track progress and optimize your study time</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeatureGrid = () => (
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
              <span className="text-gray-400 font-light text-sm">{item}</span>
            </div>
          ))}
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
              <div key={i} className="flex items-center gap-3">
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
  <section className="relative">
    <div className="max-w-4xl">
      <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-4">WHY REFINE</p>
      <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-6">The Smart Choice.</h2>
      <p className="text-gray-400 text-xl font-light mb-16 max-w-3xl leading-relaxed opacity-75">
        See how Refine transforms your academic planning experience with AI-powered features and seamless LMS integration.
      </p>

      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h3 className="text-2xl text-white font-light mb-8">Traditional Planning</h3>
          <div className="space-y-6">
            {[
              {
                title: "Manual Task Management",
                description: "Spend hours organizing assignments and creating study schedules"
              },
              {
                title: "No LMS Integration",
                description: "Manually copy assignments and deadlines from your LMS"
              },
              {
                title: "Basic Time Tracking",
                description: "Simple timers without insights or pattern analysis"
              },
              {
                title: "Static Planning",
                description: "Fixed schedules that don't adapt to your progress"
              }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-red-500/80 text-lg mt-1">✕</span>
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
                title: "AI-Powered Organization",
                description: "Automatically organize and break down tasks into optimal study blocks"
              },
              {
                title: "Seamless LMS Sync",
                description: "Auto-sync with Canvas, Brightspace, and Blackboard in real-time"
              },
              {
                title: "Smart Time Analytics",
                description: "Track study patterns and get personalized optimization tips"
              },
              {
                title: "Adaptive Planning",
                description: "AI adjusts your schedule based on progress and learning style"
              }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-green-400 text-lg mt-1">✓</span>
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
            <div className="flex items-center gap-4 mb-6">
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

const CTASection = () => (
  <section className="bg-gradient-to-b from-[#0B0A0F] to-black py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5"></div>
    
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-6">
          Ready to Transform Your
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent block mt-2">
            Academic Journey?
          </span>
        </h2>
        <p className="text-gray-400 text-xl font-light mb-12 leading-relaxed opacity-75">
          Join thousands of students who are already using Refine to excel in their studies. Get started in minutes with our seamless LMS integration.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
          <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl text-lg font-normal hover:opacity-90 transition-opacity">
            Sign Up & Sync Your LMS
          </button>
          <button className="px-8 py-4 bg-white/5 text-white rounded-xl text-lg font-normal hover:bg-white/10 transition-colors border border-white/5">
            Schedule Demo
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5">
            <div className="text-2xl mb-2">⚡️</div>
            <p className="text-white font-light mb-2">2-Minute Setup</p>
            <p className="text-gray-400 text-sm font-light">Quick LMS sync with Canvas, Brightspace & Blackboard</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-white font-light mb-2">Secure & Private</p>
            <p className="text-gray-400 text-sm font-light">Your academic data is always safe and protected</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/5">
            <div className="text-2xl mb-2">💬</div>
            <p className="text-white font-light mb-2">24/7 Support</p>
            <p className="text-gray-400 text-sm font-light">Get help anytime you need assistance</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#0B0A0F] border-t border-white/5 py-24 relative overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <h3 className="text-2xl text-white font-light mb-6">Refine</h3>
          <p className="text-gray-400 font-light mb-8 leading-relaxed max-w-sm">
            AI-powered academic planning that helps students excel. Seamlessly integrate with your LMS and transform your study experience.
          </p>
          <div className="flex gap-4">
            <button className="p-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors">
              <span className="text-xl">📱</span>
            </button>
            <button className="p-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors">
              <span className="text-xl">💻</span>
            </button>
          </div>
        </div>

        <div>
          <h4 className="text-white font-light mb-6">Features</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors font-light">Task Management</a></li>
            <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors font-light">AI Planning</a></li>
            <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors font-light">Time Tracking</a></li>
            <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors font-light">Progress Analytics</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-light mb-6">Integrations</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors font-light">Canvas</a></li>
            <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors font-light">Brightspace</a></li>
            <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors font-light">Blackboard</a></li>
            <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors font-light">More LMS</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-light mb-6">Support</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors font-light">Help Center</a></li>
            <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors font-light">Documentation</a></li>
            <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors font-light">Contact Us</a></li>
            <li><a href="#" className="text-gray-400 hover:text-pink-500 transition-colors font-light">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/5">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 font-light text-sm">
            &copy; 2024 Refine. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors font-light text-sm">Terms</a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors font-light text-sm">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors font-light text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <div className="flex flex-col bg-black">
      <Hero />
      
      <ParallaxSection
        className="relative bg-gradient-to-b from-[#0B0A0F] to-black overflow-hidden"
        speed={0.5}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="container mx-auto px-4 py-32">
          <CoreFeatures />
        </div>
      </ParallaxSection>

      <ParallaxSection
        className="relative bg-gradient-to-b from-[#0B0A0F] to-black overflow-hidden"
        speed={0.5}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="container mx-auto px-4 py-32">
          <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-4">TASK MANAGEMENT</p>
          <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-6">Your Tasks, Organized.</h2>
          <p className="text-gray-400 text-xl font-light mb-16 max-w-3xl leading-relaxed opacity-75">
            See all your assignments at a glance. Refine automatically organizes your tasks by due date and priority.
          </p>
          <TaskPreview />
        </div>
      </ParallaxSection>

      <ParallaxSection
        className="relative bg-gradient-to-b from-[#0B0A0F] to-black overflow-hidden"
        speed={0.5}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="container mx-auto px-4 py-32">
          <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-4">AI ASSISTANT</p>
          <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-6">Study Smarter.</h2>
          <p className="text-gray-400 text-xl font-light mb-16 max-w-3xl leading-relaxed opacity-75">
            Get personalized study plans, time estimates, and smart suggestions based on your learning style.
          </p>
          <AIAssistantPreview />
        </div>
      </ParallaxSection>

      <ParallaxSection
        className="relative bg-gradient-to-b from-[#0B0A0F] to-black overflow-hidden"
        speed={0.5}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="container mx-auto px-4 py-32">
          <ComparisonSection />
        </div>
      </ParallaxSection>

      <ParallaxSection
        className="relative bg-gradient-to-b from-[#0B0A0F] to-black overflow-hidden"
        speed={0.5}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="container mx-auto px-4 py-32">
          <Testimonials />
        </div>
      </ParallaxSection>

      <ParallaxSection
        className="relative bg-gradient-to-b from-[#0B0A0F] to-black overflow-hidden"
        speed={0.5}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="container mx-auto px-4 py-32">
          <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-4">FEATURES</p>
          <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-6">Everything You Need.</h2>
          <p className="text-gray-400 text-xl font-light mb-16 max-w-3xl leading-relaxed opacity-75">
            A complete suite of tools designed to transform your academic planning experience.
          </p>
          <FeatureGrid />
        </div>
      </ParallaxSection>

      <CTASection />
      <Footer />
    </div>
  );
}
