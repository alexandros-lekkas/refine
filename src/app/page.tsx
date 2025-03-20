"use client";

import React from 'react';
import { TaskPreview } from '../components/task-preview';
import { AIAssistantPreview } from '../components/ai-assistant-preview';
import { ComparisonSection } from '../components/comparison-section';
import { Testimonials } from '../components/testimonials';
import { FeatureGrid } from '../components/feature-grid';

export default function Home() {
  return (
    <div className="flex flex-col bg-black snap-y snap-mandatory h-screen overflow-y-auto">
      <section className="h-screen snap-start flex items-start justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#0B0A0F]"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5"></div>
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-pink-500/20 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 pt-12 relative">
          <div className="max-w-4xl mx-auto text-center scale-[0.9] origin-top">
            <div className="grid grid-cols-3 gap-8 mb-6">
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

            <h1 className="text-[5rem] text-white font-extralight tracking-tight mb-6 leading-[1.1]">
              Your Academic Success,
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent block mt-2">
                AI-Powered
              </span>
            </h1>

            <p className="text-gray-400 text-xl font-light mb-6 leading-relaxed max-w-2xl mx-auto opacity-75">
              Seamlessly sync with your LMS, get AI-powered study plans, and never miss a deadline. Join thousands of students transforming their academic journey.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl text-lg font-normal hover:opacity-90 transition-opacity">
                Sign Up & Sync Your LMS
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('tasks');
                  if (element) {
                    element.scrollIntoView({ block: 'start', behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 bg-white/5 text-white rounded-xl text-lg font-normal hover:bg-white/10 transition-colors border border-white/5"
              >
                See How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="tasks" className="h-screen snap-start flex items-start justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0A0F] to-black"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="container mx-auto px-4 pt-12 relative">
          <div className="scale-[0.8] origin-top">
            <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-4">TASK MANAGEMENT</p>
            <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-6">Your Tasks, Organized.</h2>
            <p className="text-gray-400 text-xl font-light mb-6 max-w-3xl leading-relaxed opacity-75">
              See all your assignments at a glance. Refine automatically organizes your tasks by due date and priority.
            </p>
            <TaskPreview />
          </div>
        </div>
      </section>

      <section className="h-screen snap-start flex items-start justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0A0F] to-black"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="container mx-auto px-4 pt-12 relative">
          <div className="scale-[0.8] origin-top">
            <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-4">AI ASSISTANT</p>
            <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-6">Study Smarter.</h2>
            <p className="text-gray-400 text-xl font-light mb-6 max-w-3xl leading-relaxed opacity-75">
              Get personalized study plans, time estimates, and smart suggestions based on your learning style.
            </p>
            <AIAssistantPreview />
          </div>
        </div>
      </section>

      <section className="h-screen snap-start flex items-start justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0A0F] to-black"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="container mx-auto px-4 pt-12 relative">
          <div className="scale-[0.75] origin-top">
            <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-4">COMPARISON</p>
            <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-6">The Difference.</h2>
            <p className="text-gray-400 text-xl font-light mb-6 max-w-3xl leading-relaxed opacity-75">
              See how our AI-powered approach transforms your study experience.
            </p>
            <ComparisonSection />
          </div>
        </div>
      </section>

      <section className="h-screen snap-start flex items-start justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0A0F] to-black"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="container mx-auto px-4 pt-12 relative">
          <div className="scale-[0.8] origin-top">
            <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-4">TESTIMONIALS</p>
            <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-6">Student Success.</h2>
            <p className="text-gray-400 text-xl font-light mb-6 max-w-3xl leading-relaxed opacity-75">
              Hear from students who transformed their academic journey with our AI-powered platform.
            </p>
            <Testimonials />
          </div>
        </div>
      </section>

      <section className="h-screen snap-start flex items-start justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0A0F] to-black"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="container mx-auto px-4 pt-12 relative">
          <div className="scale-[0.75] origin-top">
            <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-4">FEATURES</p>
            <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-6">Everything You Need.</h2>
            <p className="text-gray-400 text-xl font-light mb-6 max-w-3xl leading-relaxed opacity-75">
              A comprehensive suite of tools designed for academic excellence.
            </p>
            <FeatureGrid />
          </div>
        </div>
      </section>

      <section className="min-h-screen snap-start flex items-start justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0A0F] to-black"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]"></div>
        <div className="container mx-auto px-4 pt-12 relative">
          <div className="text-center scale-[0.9] origin-top">
            <p className="text-pink-500 font-normal text-base uppercase tracking-wide mb-4">GET STARTED</p>
            <h2 className="text-[4rem] text-white font-extralight tracking-tight mb-6">Ready to Transform Your Study Experience?</h2>
            <p className="text-gray-400 text-xl font-light mb-6 max-w-3xl mx-auto leading-relaxed opacity-75">
              Join thousands of students who are already using AI to study smarter, not harder.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
              <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl text-lg font-normal hover:opacity-90 transition-opacity">
                Sign Up & Sync Your LMS
              </button>
              <button className="px-8 py-4 bg-white/5 text-white rounded-xl text-lg font-normal hover:bg-white/10 transition-colors border border-white/5">
                Watch Demo
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div>
                <p className="text-4xl font-light bg-clip-text text-transparent bg-gradient-to-r from-[#FF3DC0] to-purple-500 mb-2">87%</p>
                <p className="text-white/60">Average Time Saved</p>
              </div>
              <div>
                <p className="text-4xl font-light bg-clip-text text-transparent bg-gradient-to-r from-[#FF3DC0] to-purple-500 mb-2">2.5x</p>
                <p className="text-white/60">Study Efficiency</p>
              </div>
              <div>
                <p className="text-4xl font-light bg-clip-text text-transparent bg-gradient-to-r from-[#FF3DC0] to-purple-500 mb-2">100%</p>
                <p className="text-white/60">Assignment Coverage</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
