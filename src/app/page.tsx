"use client";

import { Footer } from "@/components/layout/footer";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { AuroraText } from "@/components/magicui/aurora-text";

const HeroSection = () => {
  const scrollToTasks = () => {
    const element = document.getElementById('tasks');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-32 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">87%</div>
              <p className="text-sm text-muted-foreground">Average Time Saved on Planning</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">2.5x</div>
              <p className="text-sm text-muted-foreground">Improved Study Efficiency</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">100%</div>
              <p className="text-sm text-muted-foreground">Assignment Coverage</p>
            </div>
          </div>

          <h1 className="text-[5rem] text-foreground font-semibold tracking-tight mb-8 leading-[1.1]">
            Your Academic Success,
            <AuroraText colors={["#FF3DC0", "#FF1A8D", "#FF69B4", "#DA70D6", "#BA55D3", "#9932CC", "#8B008B", "#FF00FF", "#FF69B4", "#FF1493"]}>AI Powered</AuroraText>
          </h1>

          <p className="text-muted-foreground text-xl font-light mb-12 leading-relaxed max-w-2xl mx-auto opacity-75">
            Seamlessly sync with your LMS, get AI-powered study plans, and never miss a deadline. Join thousands of students transforming their academic journey.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-xl text-lg font-normal hover:opacity-90 transition-opacity">
              Sign Up & Sync Your LMS
            </button>
            <button 
              onClick={scrollToTasks}
              className="px-8 py-4 bg-secondary text-secondary-foreground rounded-xl text-lg font-normal hover:bg-secondary/80 transition-colors border border-border"
            >
              <AnimatedShinyText>

              See How It Works
              </AnimatedShinyText>

            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TaskPreview = () => (
  <section
    id="tasks"
    className="relative bg-gradient-to-b from-[#0B0A0F] to-black overflow-hidden py-32"
  >
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
    <div className="container mx-auto px-4">
      <p className="text-primary font-normal text-sm uppercase tracking-wide mb-2">
        TASK MANAGEMENT
      </p>
      <h2 className="text-[3rem] text-foreground font-extralight tracking-tight mb-4">
        Your Tasks, Organized.
      </h2>
      <p className="text-muted-foreground text-base font-light mb-6 max-w-2xl leading-relaxed opacity-75">
        See all your assignments at a glance. Refine automatically organizes
        your tasks by due date and priority.
      </p>
      <div className="bg-card/5 backdrop-blur-sm rounded-xl border border-border p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-normal">All Tasks</button>
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-normal">Calendar</button>
            </div>
            <div className="h-6 w-px bg-border"></div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-normal">Today</button>
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-normal">Week</button>
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-normal">Month</button>
            </div>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg text-sm font-normal">
            + Add Task
          </button>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {[
            {
              title: "Due Today",
              color: "bg-destructive/10",
              textColor: "text-destructive",
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
              color: "bg-primary/10",
              textColor: "text-primary",
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
              color: "bg-muted/10",
              textColor: "text-muted-foreground",
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
                <span className="text-muted-foreground text-sm">{column.tasks.length} tasks</span>
              </div>
              <div className="space-y-4">
                {column.tasks.map((task, j) => (
                  <div key={j} className="bg-card/5 backdrop-blur-sm rounded-lg p-4 border border-border">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-muted-foreground text-sm mb-1">{task.course}</p>
                        <p className="text-foreground font-light">{task.title}</p>
                      </div>
                      <div className="bg-secondary px-2 py-1 rounded text-sm text-muted-foreground">
                        {task.time}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{task.subtasks}</span>
                        <span className="text-muted-foreground">{task.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const AIAssistantPreview = () => (
  <section
    id="ai-assistant"
    className="relative bg-gradient-to-b from-[#0B0A0F] to-black overflow-hidden py-32"
  >
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
    <div className="container mx-auto px-4">
      <p className="text-pink-500 font-normal text-sm uppercase tracking-wide mb-2">
        AI ASSISTANT
      </p>
      <h2 className="text-[3rem] text-white font-extralight tracking-tight mb-4">
        Study Smarter.
      </h2>
      <p className="text-gray-400 text-base font-light mb-6 max-w-2xl leading-relaxed opacity-75">
        Get personalized study plans, time estimates, and smart suggestions
        based on your learning style.
      </p>
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/5 p-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="bg-white/5 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <p className="text-foreground font-light">AI Assistant</p>
                  <p className="text-muted-foreground text-sm">Analyzing your workload...</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-card/5 rounded-lg p-4">
                  <p className="text-foreground font-light mb-2">Project Breakdown</p>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground hover:text-primary transition-colors">Research Phase</span>
                        <span className="text-primary">4 hours</span>
                      </div>
                      <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground hover:text-primary transition-colors">Data Analysis</span>
                        <span className="text-primary">3 hours</span>
                      </div>
                      <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground hover:text-primary transition-colors">Report Writing</span>
                        <span className="text-primary">3 hours</span>
                      </div>
                      <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-card/5 rounded-lg p-4">
                  <p className="text-foreground font-light mb-3">Suggested Schedule</p>
                  <div className="space-y-3">
                    {[
                      { day: "Monday", tasks: ["Research: Literature Review", "Data Collection"] },
                      { day: "Tuesday", tasks: ["Data Analysis", "Initial Findings"] },
                      { day: "Wednesday", tasks: ["Report Writing", "Final Review"] }
                    ].map((day, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="text-muted-foreground text-sm w-24">{day.day}</div>
                        <div className="flex-1">
                          {day.tasks.map((task, j) => (
                            <div key={j} className="text-foreground/80 text-sm mb-1 font-light hover:text-primary transition-colors">{task}</div>
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
    </div>
  </section>
);

const FeatureGrid = () => (
  <section
    id="features"
    className="relative bg-gradient-to-b from-[#0B0A0F] to-black overflow-hidden py-32"
  >
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
    <div className="container mx-auto px-4">
      <p className="text-primary font-normal text-sm uppercase tracking-wide mb-2">
        FEATURES
      </p>
      <h2 className="text-[3rem] text-foreground font-extralight tracking-tight mb-4">
        Everything You Need.
      </h2>
      <p className="text-muted-foreground text-base font-light mb-6 max-w-2xl leading-relaxed opacity-75">
        A complete suite of tools designed to transform your academic
        planning experience.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            icon: "📚",
            title: "Smart Task Organization",
            description: "Auto-organize and prioritize assignments with AI-powered subtask management.",
            features: ["Auto-categorization", "Priority assignment", "Subtask tracking", "Progress metrics"]
          },
          {
            icon: "🔄",
            title: "LMS Integration",
            description: "Seamless sync with your university's LMS for real-time assignment tracking.",
            features: ["Canvas sync", "Brightspace", "Blackboard", "Auto-updates"]
          },
          {
            icon: "🤖",
            title: "AI Study Planning",
            description: "Personalized study schedules based on your learning style and workload.",
            features: ["Smart scheduling", "Adaptive plans", "Focus optimization", "Pattern analysis"]
          },
          {
            icon: "⏱️",
            title: "Time Tracking",
            description: "Track study time and optimize productivity with smart analytics.",
            features: ["Focus sessions", "Progress stats", "Study insights", "Break timers"]
          },
          {
            icon: "📊",
            title: "Progress Analytics",
            description: "Visual progress tracking with detailed performance metrics.",
            features: ["Completion rates", "Time analysis", "Trend tracking", "Goal metrics"]
          },
          {
            icon: "🎯",
            title: "Smart Reminders",
            description: "AI-powered notifications based on study patterns and deadlines.",
            features: ["Smart alerts", "Priority notices", "Streak tracking", "Break reminders"]
          }
        ].map((feature, i) => (
          <div key={i} className="bg-card/5 backdrop-blur-sm rounded-lg p-4 border border-border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-lg">{feature.icon}</span>
              </div>
              <h3 className="text-base text-foreground font-light">{feature.title}</h3>
            </div>
            <p className="text-muted-foreground text-sm font-light mb-3 leading-relaxed">
              {feature.description}
            </p>
            <div className="space-y-1.5">
              {feature.features.map((item, j) => (
                <div key={j} className="flex items-center gap-2">
                  <span className="text-primary/60 text-xs">→</span>
                  <span className="text-muted-foreground font-light text-xs hover:text-primary transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ComparisonSection = () => (
  <section
    id="comparison"
    className="relative bg-gradient-to-b from-[#0B0A0F] to-black overflow-hidden py-32"
  >
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
    <div className="container mx-auto px-4">
      <div className="max-w-4xl">
        <p className="text-primary font-normal text-base uppercase tracking-wide mb-4">
          WHY REFINE
        </p>
        <h2 className="text-[4rem] text-foreground font-extralight tracking-tight mb-6">
          The Smart Choice.
        </h2>
        <p className="text-muted-foreground text-xl font-light mb-16 max-w-3xl leading-relaxed opacity-75">
          See how Refine transforms your academic planning experience with
          AI-powered features and seamless LMS integration.
        </p>

        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl text-foreground font-light mb-8">
              Traditional Planning
            </h3>
            <div className="space-y-6">
              {[
                {
                  icon: "✕",
                  title: "Manual Task Management",
                  description:
                    "Spend hours organizing assignments and creating study schedules",
                },
                {
                  icon: "✕",
                  title: "No LMS Integration",
                  description:
                    "Manually copy assignments and deadlines from your LMS",
                },
                {
                  icon: "✕",
                  title: "Basic Time Tracking",
                  description:
                    "Simple timers without insights or pattern analysis",
                },
                {
                  icon: "✕",
                  title: "Static Planning",
                  description:
                    "Fixed schedules that don't adapt to your progress",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary backdrop-blur-sm bg-card/[0.02] transition-all"
                >
                  <span className="text-destructive/70 text-lg mt-1">
                    {item.icon}
                  </span>
                  <div>
                    <h4 className="text-foreground font-light mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl text-foreground font-light mb-8">
              Refine AI Assistant
            </h3>
            <div className="space-y-6">
              {[
                {
                  icon: "✓",
                  title: "AI-Powered Organization",
                  description:
                    "Automatically organize and break down tasks into optimal study blocks",
                },
                {
                  icon: "✓",
                  title: "Seamless LMS Sync",
                  description:
                    "Auto-sync with Canvas, Brightspace, and Blackboard in real-time",
                },
                {
                  icon: "✓",
                  title: "Smart Time Analytics",
                  description:
                    "Track study patterns and get personalized optimization tips",
                },
                {
                  icon: "✓",
                  title: "Adaptive Planning",
                  description:
                    "AI adjusts your schedule based on progress and learning style",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary backdrop-blur-sm bg-card/[0.02] transition-all"
                >
                  <span className="text-primary text-lg mt-1">
                    {item.icon}
                  </span>
                  <div>
                    <h4 className="text-foreground font-light mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section
    id="testimonials"
    className="relative bg-gradient-to-b from-[#0B0A0F] to-black overflow-hidden py-32"
  >
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
    <div className="container mx-auto px-4">
      <p className="text-primary font-normal text-base uppercase tracking-wide mb-4">TESTIMONIALS</p>
      <h2 className="text-[4rem] text-foreground font-extralight tracking-tight mb-6">Student Stories.</h2>
      <p className="text-muted-foreground text-xl font-light mb-24 max-w-3xl leading-relaxed opacity-75">
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
          <div key={i} className="bg-card/5 backdrop-blur-sm rounded-xl p-8 border border-border">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-2xl">{"👤"}</span>
              </div>
              <div>
                <p className="text-foreground font-light">{testimonial.author}</p>
                <p className="text-muted-foreground text-sm">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-foreground/90 font-light text-lg leading-relaxed mb-6">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-2">
              <span className="text-primary">↗</span>
              <span className="text-muted-foreground text-sm">{testimonial.metric}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section
    id="cta"
    className="relative bg-gradient-to-b from-[#0B0A0F] to-black overflow-hidden py-32"
  >
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5"></div>
    
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-[4rem] text-foreground font-extralight tracking-tight mb-6">
          Ready to Transform Your
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent block mt-2">
            Academic Journey?
          </span>
        </h2>
        <p className="text-muted-foreground text-xl font-light mb-12 leading-relaxed opacity-75">
          Join thousands of students who are already using Refine to excel in their studies. Get started in minutes with our seamless LMS integration.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
          <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl text-lg font-normal hover:opacity-90 transition-opacity">
            Sign Up & Sync Your LMS
          </button>
          <button className="px-8 py-4 bg-secondary text-secondary-foreground rounded-xl text-lg font-normal hover:bg-secondary/80 transition-colors border border-border">
            Schedule Demo
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="bg-card/5 backdrop-blur-sm rounded-xl p-6 border border-border">
            <div className="text-2xl mb-2">⚡️</div>
            <p className="text-foreground font-light mb-2">2-Minute Setup</p>
            <p className="text-muted-foreground text-sm font-light">Quick LMS sync with Canvas, Brightspace & Blackboard</p>
          </div>
          <div className="bg-card/5 backdrop-blur-sm rounded-xl p-6 border border-border">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-foreground font-light mb-2">Secure & Private</p>
            <p className="text-muted-foreground text-sm font-light">Your academic data is always safe and protected</p>
          </div>
          <div className="bg-card/5 backdrop-blur-sm rounded-xl p-6 border border-border">
            <div className="text-2xl mb-2">💬</div>
            <p className="text-foreground font-light mb-2">24/7 Support</p>
            <p className="text-muted-foreground text-sm font-light">Get help anytime you need assistance</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="bg-[#0B0A0F]">
      <HeroSection />
      <TaskPreview />
      <AIAssistantPreview />
      <FeatureGrid />
      <ComparisonSection />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  );
}
