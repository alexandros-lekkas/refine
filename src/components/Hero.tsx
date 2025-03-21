export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] bg-[length:40px] opacity-[0.02]" />
      <div className="absolute w-[800px] h-[800px] bg-purple-500/30 rounded-full blur-3xl -top-48 -right-48" />
      <div className="absolute w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-3xl -bottom-32 -left-32" />
      
      <div className="relative z-10 text-center px-8 scale-[0.85] origin-top">
        <p className="text-pink-500 font-normal text-sm uppercase tracking-wide mb-2">
          AI-POWERED TASK MANAGEMENT
        </p>
        <h1 className="text-[4rem] font-extralight text-white mb-4 tracking-tight">
          Your Personal Study Planner.
        </h1>
        <p className="text-lg leading-8 text-gray-400 font-light mb-12 max-w-xl mx-auto opacity-75">
          Refine transforms how students plan and manage their academic tasks. Our AI assistant helps break down complex assignments, suggests optimal study schedules, and adapts to your learning style.
        </p>
        <div className="flex items-center justify-center gap-x-6">
          <a
            href="#features"
            className="rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-3 text-sm font-light text-white shadow-sm hover:from-pink-600 hover:to-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 transition-all duration-200"
          >
            See Features
          </a>
          <a href="#tasks" className="text-sm font-light leading-6 text-white hover:text-pink-500 transition-colors duration-200">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};
