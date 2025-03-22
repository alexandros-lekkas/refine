"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { TaskDetails } from "@/app/dashboard/[id]/task-details";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MessageSquare, Timer } from "lucide-react";

export default function TaskPage() {
  const params = useParams();
  const router = useRouter();
  const [task, setTask] = React.useState({
    id: "1",
    title: "Lab Report: Wave Motion",
    description: "Complete the lab report on wave motion experiments, including data analysis and theoretical comparisons.",
    courseCode: "PHYS202",
    courseTitle: "Quantum Mechanics",
    completed: false,
    dueDate: "2025-03-28",
    plannedTime: "4 hours",
    type: "Assignment" as const,
    currentPhase: 0,
    phaseProgress: [0, 0, 0, 0, 0],
    subtasks: [
      { id: "1", title: "Review experimental data", completed: true },
      { id: "2", title: "Create graphs and visualizations", completed: false },
      { id: "3", title: "Compare with theoretical predictions", completed: false },
      { id: "4", title: "Write discussion section", completed: false },
      { id: "5", title: "Format and proofread", completed: false }
    ]
  });

  const handleComplete = (taskId: string) => {
    setTask(prev => ({
      ...prev,
      completed: !prev.completed
    }));
  };

  const handlePhaseUpdate = (phaseIndex: number, progress: number) => {
    setTask(prev => {
      const newPhaseProgress = [...prev.phaseProgress];
      newPhaseProgress[phaseIndex] = progress;
      return {
        ...prev,
        phaseProgress: newPhaseProgress,
        currentPhase: progress === 100 ? Math.min(phaseIndex + 1, prev.phaseProgress.length - 1) : phaseIndex
      };
    });
  };

  const handleSubtaskToggle = (subtaskId: string) => {
    setTask(prev => ({
      ...prev,
      subtasks: prev.subtasks.map(st =>
        st.id === subtaskId ? { ...st, completed: !st.completed } : st
      )
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="text-gray-600"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              <div>
                <div className="text-sm text-gray-600">{task.courseCode}</div>
                <h1 className="text-xl font-semibold text-gray-900">{task.title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-pink-600 hover:text-pink-700"
              >
                <MessageSquare className="w-4 h-4 mr-1.5" />
                Chat Assistant
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleComplete(task.id)}
                className={task.completed ? "text-green-600 hover:text-green-700" : ""}
              >
                {task.completed ? "Completed" : "Mark Complete"}
              </Button>
              <Button
                variant="default"
                size="sm"
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <Timer className="w-4 h-4 mr-1.5" />
                Start Timer
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <TaskDetails
                task={task}
                onClose={() => {}}
                onComplete={handleComplete}
                onPhaseUpdate={handlePhaseUpdate}
                onSubtaskToggle={handleSubtaskToggle}
              />
            </div>
            <div>
              <div className="bg-white rounded-lg shadow p-4 mb-4">
                <h2 className="text-lg font-semibold mb-4">Navigation</h2>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" className="w-[48%]">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous Task
                  </Button>
                  <Button variant="outline" size="sm" className="w-[48%]">
                    Next Task
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
