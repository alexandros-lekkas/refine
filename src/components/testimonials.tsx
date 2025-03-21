  export const Testimonials = () => {
  const testimonials = [
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
  ];

  return (
    <div className="scale-90 origin-top">
      <div className="text-center mb-12">
        <p className="text-pink-500 font-normal text-sm uppercase tracking-wide mb-2">TESTIMONIALS</p>
        <h2 className="text-[3rem] text-white font-extralight tracking-tight mb-4">Student Stories.</h2>
        <p className="text-gray-400 text-lg font-light mb-8 max-w-2xl mx-auto leading-relaxed opacity-75">
          See how students are transforming their academic life with Refine's AI-powered planning.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/5 scale-90 origin-top">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center">
                <span className="text-2xl" aria-hidden="true">👤</span>
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
              <span className="text-pink-500" aria-hidden="true">↗</span>
              <span className="text-gray-400 text-sm">{testimonial.metric}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
