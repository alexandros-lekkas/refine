"use client";

import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Card } from "@/components/ui/card";
import { ArrowRight, CheckSquare, Calendar, Settings, Brain } from "lucide-react";
import Link from "next/link";
import { ParallaxSection } from "@/components/parallax-section";
import { useTask } from "@/lib/contexts/TaskContext";
import { format } from "date-fns";

function TaskPreview() {
  const { tasks } = useTask();

  return (
    <div className="space-y-4">
      {tasks.slice(0, 3).map((task) => (
        <Card key={task.id} className="bg-black/40 backdrop-blur-sm border-white/10">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="text-sm font-medium text-primary">{task.courseCode}</span>
                <h3 className="text-lg font-semibold text-white">{task.title}</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                task.status === "due-today" ? "bg-red-500/20 text-red-300" :
                task.status === "due-soon" ? "bg-blue-500/20 text-blue-300" :
                "bg-gray-500/20 text-gray-300"
              }`}>
                {format(task.dueDate, "MMM d")}
              </span>
            </div>
            <div className="text-sm text-gray-400">
              {task.phases && task.phases.length > 0 && (
                <div className="mt-2 space-y-1">
                  {task.phases.slice(0, 2).map((phase) => (
                    <div key={phase.id} className="flex items-center">
                      <CheckSquare className="h-4 w-4 mr-2 text-primary/60" />
                      <span>{phase.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function AIWritingPreview() {
  return (
    <div className="space-y-4">
      <div className="bg-black/40 backdrop-blur-sm border-white/10 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-5 w-5 text-primary" />
          <span className="text-primary font-medium">AI Assistant</span>
        </div>
        <div className="space-y-2 text-gray-300">
          <p>Based on your task, here's a suggested study plan:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Break down the neural network implementation into modules</li>
            <li>Start with data preprocessing (1.5 hours)</li>
            <li>Focus on model architecture (2 hours)</li>
            <li>Test and validate results (1 hour)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

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
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full min-h-[80vh] flex items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-background" />
        <div className="container mx-auto px-4 relative">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
            STUDY SMARTER,{" "}
            <span className="animate-in fade-in slide-in-from-bottom-4 duration-1000 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
              LEARN BETTER
            </span>
          </h1>
          <p className="text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Your AI-powered academic companion. Organize tasks, optimize study time, and excel in your courses.
          </p>
          <div className="flex flex-col items-center gap-8">
            <Link href="/dashboard">
              <RainbowButton>
                Join Early Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </RainbowButton>
            </Link>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-primary" />
                <span>50+ Universities</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Limited Spots</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-primary" />
                <span>2,000+ Students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Task Management Section */}
      <ParallaxSection
        title="SYNC ALL YOUR COURSES SEAMLESSLY"
        description="Overwhelmed by multiple courses? Now all your assignments and deadlines are in one place."
        imageSide="left"
      >
        <TaskPreview />
      </ParallaxSection>

      {/* AI Writing Section */}
      <ParallaxSection
        title="AI-POWERED STUDY ASSISTANCE FROM START TO FINISH"
        description="Get personalized study plans, task breakdowns, and time estimates powered by AI."
        imageSide="right"
      >
        <AIWritingPreview />
      </ParallaxSection>

      {/* Problems Section */}
      {problemsSection}

      {/* Comparison Section */}
      {comparisonSection}
    </div>
  );
}
