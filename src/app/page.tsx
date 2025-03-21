"use client";

import { ParallaxSection } from '../components/parallax-section';

const Hero = () => {
  const scrollToTasks = () => {
    const element = document.getElementById('tasks');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#0B0A0F]"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5"></div>
      
      <div className="container mx-auto px-4 py-32 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="grid grid-cols-3 gap-8 mb-12">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF3DC0] to-purple-500">87%</div>
              <p className="text-sm text-gray-400">Average Time Saved on Planning</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF3DC0] to-purple-500">2.5x</div>
              <p className="text-sm text-gray-400">Improved Study Efficiency</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF3DC0] to-purple-500">100%</div>
              <p className="text-sm text-gray-400">Assignment Coverage</p>
            </div>
          </div>

          <h1 className="text-[5rem] text-white font-extralight tracking-tight mb-8 leading-[1.1]">
            Your Academic Success,
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent block mt-2">
              AI-Powered
            </span>
          </h1>

          <p className="text-gray-400 text-xl font-light mb-12 leading-relaxed opacity-75">
            Seamlessly sync with your LMS, get AI-powered study plans, and never miss a deadline. Join thousands of students transforming their academic journey.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl text-lg font-normal hover:opacity-90 transition-opacity">
              Sign Up & Sync Your LMS
            </button>
            <button 
              onClick={scrollToTasks}
              className="px-8 py-4 bg-white/5 text-white rounded-xl text-lg font-normal hover:bg-white/10 transition-colors border border-white/5"
            >
              See How It Works
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureGrid = () => (
  <section className="relative">
    <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-2">FOR STUDENTS</p>
    <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-4">Core Features.</h2>
    <p className="text-gray-400 text-xl font-light mb-12">
      Core features enable real-time academic planning via automated task management.
    </p>
    <div className="grid grid-cols-2 gap-8">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl text-white font-light mb-4">Task Management</h3>
        <p className="text-gray-400 font-light">Intelligent task organization to enable natural planning.</p>
      </div>
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl text-white font-light mb-4">LMS Integration</h3>
        <p className="text-gray-400 font-light">All course data sync to enable seamless assignment tracking.</p>
      </div>
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl text-white font-light mb-4">Time Planning</h3>
        <p className="text-gray-400 font-light">Smart time allocation to ensure successful study schedules.</p>
      </div>
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl text-white font-light mb-4">Progress Tracking</h3>
        <p className="text-gray-400 font-light">Real-time progress monitoring with smart notifications.</p>
      </div>
    </div>
  </section>
);

const TaskPreview = () => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
    <div className="flex items-center justify-between mb-8">
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-pink-500 text-white rounded-lg text-sm">All Tasks</button>
        <button className="px-4 py-2 bg-white/5 text-white rounded-lg text-sm">Today</button>
        <button className="px-4 py-2 bg-white/5 text-white rounded-lg text-sm">Week</button>
      </div>
      <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg text-sm">
        + Add Task
      </button>
    </div>
    <div className="grid grid-cols-3 gap-8">
      <div className="bg-red-500/10 rounded-xl p-6">
        <h3 className="text-red-400 font-light text-lg mb-6">Due Today</h3>
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/60 text-sm mb-1">CS 101</p>
            <p className="text-white font-light mb-2">Algorithm Analysis</p>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-500/10 rounded-xl p-6">
        <h3 className="text-blue-400 font-light text-lg mb-6">Due Soon</h3>
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/60 text-sm mb-1">PHYS 202</p>
            <p className="text-white font-light mb-2">Lab Report</p>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-500/10 rounded-xl p-6">
        <h3 className="text-gray-400 font-light text-lg mb-6">Start Soon</h3>
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/60 text-sm mb-1">BIO 301</p>
            <p className="text-white font-light mb-2">Genetics Project</p>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AIAssistantPreview = () => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
    <div className="grid grid-cols-2 gap-8">
      <div>
        <div className="bg-white/5 rounded-xl p-6 mb-6">
          <h3 className="text-white font-light mb-4">Project Breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Research Phase</span>
                <span className="text-pink-500">4 hours</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Writing Phase</span>
                <span className="text-pink-500">6 hours</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-white font-light mb-4">Suggested Schedule</h3>
          <div className="space-y-3">
            {[
              { day: "Monday", tasks: ["Research", "Initial Draft"] },
              { day: "Tuesday", tasks: ["Writing", "Review"] },
              { day: "Wednesday", tasks: ["Final Edits", "Submit"] }
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
      <div className="space-y-6">
        <div className="bg-white/5 rounded-xl p-6">
          <h3 className="text-white font-light mb-4">Time Usage Analytics</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-400">Weekly Study Hours</p>
                <p className="text-white font-light">32h</p>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ComparisonSection = () => (
  <section className="relative">
    <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-2">WHY REFINE</p>
    <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-4">The Smart Choice.</h2>
    <p className="text-gray-400 text-xl font-light mb-12">
      See how Refine transforms your academic planning experience with AI-powered features.
    </p>
    <div className="grid grid-cols-2 gap-8">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl text-white font-light mb-6">Traditional Planning</h3>
        <div className="space-y-4">
          {[
            "Manual Task Management",
            "No LMS Integration",
            "Basic Time Tracking",
            "Static Planning"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-red-500">✕</span>
              <p className="text-gray-400 font-light">{item}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8">
        <h3 className="text-2xl text-white font-light mb-6">Refine AI Assistant</h3>
        <div className="space-y-4">
          {[
            "AI-Powered Organization",
            "Seamless LMS Sync",
            "Smart Time Analytics",
            "Adaptive Planning"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-green-500">✓</span>
              <p className="text-white font-light">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="relative">
    <div className="grid grid-cols-2 gap-8">
      {[
        {
          name: "Sarah Chen",
          role: "Computer Science Major",
          text: "The task breakdown feature is incredible. What used to take me hours to plan now gets organized in minutes.",
          metric: "3x faster completion"
        },
        {
          name: "Michael Park",
          role: "Engineering Student",
          text: "I love how it integrates with my university's LMS. All my assignments are automatically synced.",
          metric: "98% completion rate"
        }
      ].map((testimonial, i) => (
        <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20"></div>
            <div>
              <p className="text-white font-light">{testimonial.name}</p>
              <p className="text-gray-400 text-sm">{testimonial.role}</p>
            </div>
          </div>
          <p className="text-gray-400 font-light mb-4">{testimonial.text}</p>
          <div className="pt-4 border-t border-white/5">
            <span className="text-pink-500 text-sm">{testimonial.metric}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const CTASection = () => (
  <section className="relative bg-gradient-to-b from-[#0B0A0F] to-black py-16">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-6">
          Ready to Transform Your
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent block mt-2">
            Academic Journey?
          </span>
        </h2>
        <p className="text-gray-400 text-xl font-light mb-8">
          Join thousands of students already using Refine to excel in their studies.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-light">
            Sign Up & Sync LMS
          </button>
          <button className="px-8 py-3 bg-white/5 text-white rounded-lg font-light border border-white/5">
            Schedule Demo
          </button>
        </div>
      </div>
    </div>
  </section>
);

const Navigation = () => (
  <nav className="fixed top-0 right-0 z-50 p-8 flex items-start justify-between w-full" aria-label="Main navigation">
    <a href="#hero" className="bg-white/5 backdrop-blur-sm rounded-xl p-4" aria-label="Refine - Back to home">
      <span className="text-white font-light text-xl">refine</span>
      <span className="text-pink-500" aria-hidden="true">.</span>
    </a>
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
      <ul className="space-y-4" role="menubar">
        {[
          { id: "hero", label: "Home" },
          { id: "features", label: "Features" },
          { id: "tasks", label: "Tasks" },
          { id: "ai-assistant", label: "AI Assistant" },
          { id: "comparison", label: "Compare" },
          { id: "testimonials", label: "Stories" }
        ].map(({ id, label }) => (
          <li key={id} role="none">
            <a
              href={`#${id}`}
              className="text-white/60 hover:text-white focus:text-white font-light text-sm transition-colors block py-1 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
              role="menuitem"
              aria-label={`Navigate to ${label} section`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

const HeroSection = () => (
  <section className="relative text-center">
    <div className="relative">
      <div className="flex justify-center gap-16 mb-20">
        {[
          { value: "1.0s", label: "Study Efficiency", desc: "Response Time" },
          { value: "98%", label: "Time Saved", desc: "vs Manual Planning" },
          { value: "24/7", label: "Availability", desc: "AI Support" }
        ].map((kpi, i) => (
          <div key={i} className="text-center">
            <p className="text-pink-500 text-5xl font-light mb-2">{kpi.value}</p>
            <p className="text-white text-sm font-light mb-1">{kpi.label}</p>
            <p className="text-gray-400 text-xs font-light">{kpi.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-2">AI Study Planning Assistant</p>
      <h1 className="text-[5rem] text-white font-extralight tracking-tight mb-4 leading-none">
        Your Academic Success,<br />
        AI-Powered
      </h1>
      <p className="text-gray-400 text-xl font-light mb-12 max-w-2xl mx-auto">
        Seamlessly sync with your LMS, get AI-powered study plans, and never miss a deadline. Let Refine transform your academic journey.
      </p>
      <div className="flex justify-center gap-4">
        <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-light hover:opacity-90 transition-opacity">
          Sign Up & Sync LMS
        </button>
        <button className="px-8 py-3 bg-white/5 text-white rounded-lg font-light border border-white/5 hover:bg-white/10 transition-colors">
          See How it Works
        </button>
      </div>
      <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
        {[
          { icon: "📚", title: "Smart Planning", desc: "AI-powered study schedules" },
          { icon: "🔄", title: "LMS Sync", desc: "Automatic task import" },
          { icon: "📊", title: "Time Analytics", desc: "Track your progress" }
        ].map((feature, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/10 transition-colors">
            <span className="text-3xl mb-4 block">{feature.icon}</span>
            <h3 className="text-white font-light mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="flex flex-col bg-black">
      <Navigation />
      <ParallaxSection
        id="hero"
        className="relative bg-gradient-to-b from-[#0B0A0F] to-black overflow-hidden h-screen snap-y snap-mandatory"
        speed={0.5}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="h-screen flex flex-col justify-center">
          <div className="scale-[0.85] origin-top w-full container mx-auto px-4">
            <HeroSection />
          </div>
        </div>
      </ParallaxSection>

      <ParallaxSection
        id="features"
        className="relative bg-gradient-to-b from-[#0B0A0F] to-black overflow-hidden h-screen snap-y snap-mandatory"
        speed={0.5}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="h-screen flex flex-col justify-start pt-8">
          <div className="scale-[0.85] origin-top w-full container mx-auto px-4">
            <FeatureGrid />
          </div>
        </div>
      </ParallaxSection>

      <ParallaxSection
        id="tasks"
        className="relative bg-gradient-to-b from-[#0B0A0F] to-black overflow-hidden h-screen snap-y snap-mandatory"
        speed={0.5}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="h-screen flex flex-col justify-start pt-8">
          <div className="scale-[0.85] origin-top w-full container mx-auto px-4">
            <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-2">TASK MANAGEMENT</p>
            <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-4">Your Tasks, Organized.</h2>
            <p className="text-gray-400 text-xl font-light mb-12">
              See all your assignments at a glance. Refine automatically organizes your tasks by due date and priority.
            </p>
            <TaskPreview />
          </div>
        </div>
      </ParallaxSection>

      <ParallaxSection
        id="ai-assistant"
        className="relative bg-gradient-to-b from-[#0B0A0F] to-black overflow-hidden h-screen snap-y snap-mandatory"
        speed={0.5}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="h-screen flex flex-col justify-start pt-8">
          <div className="scale-[0.85] origin-top w-full container mx-auto px-4">
            <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-2">AI ASSISTANT</p>
            <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-4">Study Smarter.</h2>
            <p className="text-gray-400 text-xl font-light mb-12">
              Get personalized study plans, time estimates, and smart suggestions based on your learning style.
            </p>
            <AIAssistantPreview />
          </div>
        </div>
      </ParallaxSection>

      <ParallaxSection
        id="comparison"
        className="relative bg-gradient-to-b from-[#0B0A0F] to-black overflow-hidden h-screen snap-y snap-mandatory"
        speed={0.5}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="h-screen flex flex-col justify-start pt-8">
          <div className="scale-[0.85] origin-top w-full container mx-auto px-4">
            <ComparisonSection />
          </div>
        </div>
      </ParallaxSection>

      <ParallaxSection
        id="testimonials"
        className="relative bg-gradient-to-b from-[#0B0A0F] to-black overflow-hidden h-screen snap-y snap-mandatory"
        speed={0.5}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="h-screen flex flex-col justify-start pt-8">
          <div className="scale-[0.85] origin-top w-full container mx-auto px-4">
            <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-2">TESTIMONIALS</p>
            <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-4">Student Stories.</h2>
            <p className="text-gray-400 text-xl font-light mb-12">
              See how students are transforming their academic life with Refine.
            </p>
            <Testimonials />
          </div>
        </div>
      </ParallaxSection>

      <CTASection />
    </div>
  );
}
