"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useTask } from "@/contexts/TaskContext";

interface Task {
  id: string;
  courseCode: string;
  courseTitle: string;
  title: string;
  dueDate: Date;
  dueTime: string;
  startMar: number;
  status: "due-today" | "due-soon" | "start-soon";
}

export default function TasksPage() {
  const router = useRouter();
  const { tasks } = useTask();

  const handleTaskClick = (taskId: string) => {
    router.push(`/dashboard/tasks/${taskId}`);
  };

  return (
    <main className="container mx-auto p-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-bold">Tasks - {format(new Date(), "EEEE, MMMM do")}</h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <Button className="bg-pink-500 hover:bg-pink-600 text-white px-4">
            <Plus className="mr-2 h-4 w-4" />
            Add Task +
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Due Today Column */}
          <div className="flex flex-col gap-4">
            <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full w-fit">
              Due Today
            </div>
            <div className="space-y-3">
              {tasks
                .filter((task) => task.status === "due-today")
                .map((task) => (
                  <Card 
                    key={task.id} 
                    className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleTaskClick(task.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                          <span>{task.courseCode}</span>
                          <span className="text-gray-300">•</span>
                          <span className="truncate">{task.courseTitle}</span>
                        </div>
                        <div className="font-medium mb-1">{task.title}</div>
                        <div className="text-sm text-gray-500">
                          Due: Mar {task.startMar}, {task.dueTime}
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          {/* Due Soon Column */}
          <div className="flex flex-col gap-4">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full w-fit">
              Due Soon
            </div>
            <div className="space-y-3">
              {tasks
                .filter((task) => task.status === "due-soon")
                .map((task) => (
                  <Card 
                    key={task.id} 
                    className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleTaskClick(task.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                          <span>{task.courseCode}</span>
                          <span className="text-gray-300">•</span>
                          <span className="truncate">{task.courseTitle}</span>
                        </div>
                        <div className="font-medium mb-1">{task.title}</div>
                        <div className="text-sm text-gray-500">
                          Due: Mar {task.startMar}, {task.dueTime}
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                    </div>
                  </Card>
                ))}
            </div>
          </div>

          {/* Start Soon Column */}
          <div className="flex flex-col gap-4">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full w-fit">
              Start Soon
            </div>
            <div className="space-y-3">
              {tasks
                .filter((task) => task.status === "start-soon")
                .map((task) => (
                  <Card 
                    key={task.id} 
                    className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleTaskClick(task.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-sm text-gray-600 mb-1 flex items-center gap-2">
                          <span>{task.courseCode}</span>
                          <span className="text-gray-300">•</span>
                          <span className="truncate">{task.courseTitle}</span>
                        </div>
                        <div className="font-medium mb-1">{task.title}</div>
                        <div className="text-sm text-gray-500">
                          Due: Mar {task.startMar}, {task.dueTime}
                        </div>
                      </div>
                      <ArrowUpRight className="h-4 w-4 text-gray-400 flex-shrink-0 mt-1" />
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}