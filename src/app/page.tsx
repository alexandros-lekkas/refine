import { ParallaxSection } from '../components/parallax-section';

const Hero = () => (
  <section className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10"></div>
    <div className="container mx-auto px-4 py-32 relative z-10">
      <div className="max-w-4xl">
        <p className="text-pink-500 font-medium mb-4">FOR STUDENTS</p>
        <h1 className="text-6xl font-bold mb-6">
          Academic Success.
          <br />
          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Lightning fast planning.</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl">
          Refine enables smart academic planning and task management for both students and educators
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg text-lg font-medium hover:opacity-90 transition-all shadow-lg shadow-pink-500/20">
          Get early access
        </button>
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

const CoreFeatures = () => (
  <section className="bg-gradient-to-br from-gray-900 to-black text-white py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5"></div>
    <div className="container mx-auto px-4 relative">
      <p className="text-pink-500 font-medium mb-4">FOR STUDENTS</p>
      <h2 className="text-4xl font-bold mb-4">Core Features.</h2>
      <p className="text-gray-400 mb-12 max-w-2xl">
        Core features enable real-time academic planning via automated task management and smart scheduling.
      </p>
      
      <div className="grid md:grid-cols-2 gap-16">
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
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <span className="mr-3 text-pink-500 opacity-60 group-hover:opacity-100 transition-opacity">→</span>
              <span className="group-hover:text-pink-400 transition-colors">{feature.title}</span>
            </h3>
            <p className="text-gray-400 pl-8">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const problemsSection = (
  <section className="bg-gradient-to-b from-white to-pink-50 py-24">
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
        Why Students Need Refine
      </h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold mb-8">Without Refine:</h3>
          {[
            { icon: '🔍', text: 'Hard to locate assignments across Canvas, Brightspace, and Blackboard' },
            { icon: '📅', text: 'Manually tracking deadlines leads to forgotten assignments' },
            { icon: '😰', text: 'No clear starting point for big projects' },
            { icon: '⏰', text: 'Guessing how much time assignments will take' },
            { icon: '📚', text: 'Tasks pile up with no smart prioritization' },
            { icon: '🔄', text: 'Constant manual schedule adjustments' },
            { icon: '📱', text: 'Switching between too many different tools' },
            { icon: '😓', text: 'School stress feels unmanageable' },
          ].map((item, i) => (
            <div key={i} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold mb-8">With Refine:</h3>
          {[
            { icon: '✨', text: 'All your assignments automatically synced in one place' },
            { icon: '🎯', text: 'Smart deadline tracking and reminders' },
            { icon: '🤖', text: 'AI breaks down big projects into manageable steps' },
            { icon: '⚡️', text: 'Intelligent time estimates based on your work style' },
            { icon: '📊', text: 'Automated task prioritization and scheduling' },
            { icon: '🔄', text: 'Dynamic rescheduling when things change' },
            { icon: '🎯', text: 'Everything integrated in one powerful tool' },
            { icon: '😌', text: 'Peace of mind with an organized system' },
          ].map((item, i) => (
            <div key={i} className="flex items-start space-x-4 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg shadow-sm border border-pink-100">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 text-center">
        <button className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full text-lg font-semibold hover:opacity-90 transition-opacity">
          Start Organizing Your Academic Life
        </button>
      </div>
    </div>
  </section>
);

const comparisonSection = (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-16">
        {/* Manual Planning Side */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Manually plan your schedule</h3>
            <p className="text-gray-600">The old way is holding you back</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl">
            <ul className="space-y-4">
              {[
                { text: 'Endless to-do lists', desc: 'Never check everything off' },
                { text: 'Manual prioritization', desc: 'Worry priorities are wrong' },
                { text: 'Constant replanning', desc: 'Interruptions wreck your plans' },
                { text: 'Overambitious deadlines', desc: 'Work weekends to meet them' },
                { text: 'Forgotten tasks', desc: 'Things slip through the cracks' },
                { text: 'Too many meetings', desc: "It's hard to get anything done" },
                { text: 'Context switching', desc: 'No time to focus' },
                { text: 'Too many tools', desc: 'Calendars, to-do lists, and spreadsheets' },
                { text: 'Stress and overwhelm', desc: 'Life feels out of control' },
                { text: 'No personal life', desc: 'What is a weekend, anyway?' },
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-3 text-red-500">❌</span>
                  <div>
                    <p className="font-medium">{item.text}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Refine AI Side */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Let Refine build your schedule</h3>
            <p className="text-gray-600">AI-powered academic planning</p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl border border-pink-100">
            <ul className="space-y-4">
              {[
                { text: 'Complete everything', desc: 'Refine builds a schedule for you' },
                { text: 'Stop prioritizing', desc: 'Refine automatically prioritizes work' },
                { text: 'No replanning', desc: 'Refine reschedules undone work' },
                { text: 'Finish early', desc: 'Refine ensures you meet deadlines' },
                { text: 'Forget nothing', desc: 'Refine tracks all your priorities' },
                { text: 'Meet less', desc: 'Refine limits meetings' },
                { text: 'Focus', desc: 'Refine guards time for uninterrupted work' },
                { text: 'One tool', desc: 'Everything in 1 place' },
                { text: 'Relax', desc: "Refine's got your back" },
                { text: 'Enjoy life', desc: 'Refine protects your weekends' },
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="mr-3 text-blue-500">✓</span>
                  <div>
                    <p className="font-medium">{item.text}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
          <p className="text-pink-500 font-medium mb-4">FEATURES</p>
          <h2 className="text-4xl font-bold text-white mb-8">
            Bringing speed and intelligence<br />
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">to academic planning</span>
          </h2>
          <FeatureGrid />
        </div>
      </ParallaxSection>

      <ParallaxSection
        className="relative bg-black overflow-hidden"
        speed={0.3}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <CoreFeatures />
      </ParallaxSection>

      {problemsSection}
      {comparisonSection}
    </div>
  );
}
