"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useTask } from "@/lib/providers/tasks";
import { cn } from "@/lib/utils";

interface Phase {
  id: string;
  title: string;
  description: string;
  plannedTime: { hours: number; minutes: number };
  dueDate: Date;
  completed: boolean;
}

interface Task {
  id: string;
  courseCode: string;
  title: string;
  dueDate: Date;
  status: "due-today" | "due-soon" | "start-soon";
  completed: boolean;
  progress?: {
    completed: number;
    total: number;
  };
}

export default function TasksPage() {
  const router = useRouter();
  const { tasks } = useTask();

  const handleTaskClick = (taskId: string) => {
    router.push(`/dashboard/tasks/${taskId}`);
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'due-today':
        return 'bg-red-50';
      case 'due-soon':
        return 'bg-pink-50';
      case 'start-soon':
        return 'bg-gray-50';
    }
  };

  const getStatusTextColor = (status: Task['status']) => {
    switch (status) {
      case 'due-today':
        return 'text-red-500';
      case 'due-soon':
        return 'text-pink-500';
      case 'start-soon':
        return 'text-gray-500';
    }
  };

  const getStatusTitle = (status: Task['status']) => {
    switch (status) {
      case 'due-today':
        return 'Due Today';
      case 'due-soon':
        return 'Due Soon';
      case 'start-soon':
        return 'Start Soon';
    }
  };

  const getProgressColor = (status: Task['status']) => {
    switch (status) {
      case 'due-today':
        return 'bg-red-500';
      case 'due-soon':
        return 'bg-pink-500';
      case 'start-soon':
        return 'bg-gray-500';
    }
  };

  const getDueText = (task: Task) => {
    switch (task.status) {
      case 'due-today':
        return 'Due in 3 hours';
      case 'due-soon':
        return task.dueDate.getDate() === new Date().getDate() + 1 
          ? 'Due tomorrow'
          : `Due in ${Math.ceil((task.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days`;
      case 'start-soon':
        return 'Due next week';
    }
  };

  return (
    <main className="max-w-7xl mx-auto p-6">
      {/* Header with navigation and add task button */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-2">
          <Button className="bg-primary rounded-full text-white font-medium">All Tasks</Button>
          <Button variant="secondary" className="bg-gray-100 rounded-full text-gray-600 font-medium">Calendar</Button>
          <Button variant="secondary" className="bg-gray-100 rounded-full text-gray-600 font-medium">Today</Button>
          <Button variant="secondary" className="bg-gray-100 rounded-full text-gray-600 font-medium">Week</Button>
          <Button variant="secondary" className="bg-gray-100 rounded-full text-gray-600 font-medium">Month</Button>
        </div>
        <Button className="bg-primary rounded-full text-white font-medium">
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      {/* Date display */}
      <div className="text-lg text-gray-600 mb-6">
        {format(new Date(), "EEEE, MMMM do")}
      </div>

      {/* Task columns */}
      <div className="grid grid-cols-3 gap-8">
        {(['due-today', 'due-soon', 'start-soon'] as const).map((status) => {
          const statusTasks = tasks.filter(task => task.status === status);
          return (
            <div key={status} className={cn("rounded-3xl p-6", getStatusColor(status))}>
              <div className="flex justify-between items-center mb-6">
                <h2 className={cn("font-medium", getStatusTextColor(status))}>{getStatusTitle(status)}</h2>
                <span className={cn("text-sm", getStatusTextColor(status))}>{statusTasks.length} tasks</span>
              </div>
              <div className="space-y-4">
                {statusTasks.map((task) => (
                  <Card
                    key={task.id}
                    className="p-4 bg-white rounded-xl cursor-pointer hover:shadow-md transition-all"
                    onClick={() => handleTaskClick(task.id)}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm text-gray-600 mb-1">{task.courseCode}</div>
                          <div className="font-medium text-gray-900">{task.title}</div>
                        </div>
                        <div className="text-sm text-gray-500">{getDueText(task)}</div>
                      </div>
                      {task.progress && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>{task.progress.completed}/{task.progress.total} completed</span>
                            <span>{Math.round((task.progress.completed / task.progress.total) * 100)}%</span>
                          </div>
                          <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={cn("h-full", getProgressColor(status))}
                              style={{ width: `${(task.progress.completed / task.progress.total) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}