"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { TaskDetails } from "@/components/tasks/task-details";

export default function TaskPage() {
  const params = useParams();
  const [task, setTask] = React.useState({
    id: "1",
    title: "Algorithm Analysis Assignment",
    description: "Complete the algorithm analysis assignment, focusing on time and space complexity of different sorting algorithms.",
    courseCode: "CS101",
    courseTitle: "Introduction to Computer Science",
    completed: false,
    dueDate: "2025-03-28",
    plannedTime: "4 hours",
    type: "Assignment" as const,
    subtasks: [
      { id: "1", title: "Review sorting algorithms", completed: true },
      { id: "2", title: "Analyze time complexity", completed: false },
      { id: "3", title: "Analyze space complexity", completed: false },
      { id: "4", title: "Write comparison report", completed: false }
    ]
  });

  const handleComplete = (taskId: string) => {
    setTask(prev => ({
      ...prev,
      completed: !prev.completed
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto py-8">
        <TaskDetails
          task={task}
          onClose={() => {}}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}
