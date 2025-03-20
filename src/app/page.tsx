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
    </div>
  );
}
