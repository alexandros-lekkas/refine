export const TaskPreview = () => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/5">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white font-light text-xl mb-1">Research Paper</h3>
            <p className="text-gray-400 text-sm">Due in 5 days</p>
          </div>
          <span className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded-lg text-sm">High Priority</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center">
              <div className="w-3 h-3 bg-white/20 rounded-sm"></div>
            </div>
            <p className="text-gray-300">Literature review (2 hours)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center">
              <div className="w-3 h-3 bg-pink-500 rounded-sm"></div>
            </div>
            <p className="text-white">Draft introduction (1.5 hours)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center">
              <div className="w-3 h-3 bg-white/20 rounded-sm"></div>
            </div>
            <p className="text-gray-300">Methodology section (3 hours)</p>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"></div>
              <p className="text-gray-400 text-sm">Assigned by Dr. Smith</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-400">6.5h</span>
              <div className="w-20 h-2 rounded-full bg-white/10">
                <div className="w-1/3 h-full rounded-full bg-pink-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
