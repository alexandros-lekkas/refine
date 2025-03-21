export const Footer = () => (
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