"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Bold,
  Italic,
  Underline,
  List,
  AlignLeft,
  Link as LinkIcon,
  Type,
  MoreHorizontal,
  Clock,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTask } from "@/contexts/TaskContext";
import { useEffect, useState } from "react";

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { getTask, updateTask } = useTask();
  const [task, setTask] = useState(getTask(params.id));

  useEffect(() => {
    if (!task) {
      router.push("/dashboard/tasks");
    }
  }, [task, router]);

  if (!task) return null;

  const handleSubtaskChange = (subtaskId: string, completed: boolean) => {
    const updatedSubtasks = task.subtasks?.map(subtask => 
      subtask.id === subtaskId ? { ...subtask, completed } : subtask
    ) || [];
    
    updateTask(task.id, { subtasks: updatedSubtasks });
  };

  const addSubtask = (title: string) => {
    const newSubtask = {
      id: Math.random().toString(),
      title,
      completed: false
    };
    const updatedSubtasks = [...(task.subtasks || []), newSubtask];
    updateTask(task.id, { subtasks: updatedSubtasks });
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">{task.courseCode} - {task.courseTitle}</span>
              <Button variant="ghost" size="sm" className="h-6">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="text-green-600">
                Mark complete
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold mb-6">{task.title}</h1>

          {/* Editor Toolbar */}
          <div className="border rounded-lg p-2 mb-4 flex items-center gap-2">
            <select className="text-sm border rounded px-2 py-1">
              <option>Normal</option>
            </select>
            <div className="h-5 w-px bg-gray-200 mx-2" />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Bold className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Italic className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Underline className="h-4 w-4" />
            </Button>
            <div className="h-5 w-px bg-gray-200 mx-2" />
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Type className="h-4 w-4" />
            </Button>
          </div>

          {/* Description */}
          <div className="border rounded-lg p-4 min-h-[200px] mb-6">
            <p className="text-gray-400">{task.description || "Description..."}</p>
          </div>

          {/* Subtasks */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Subtasks</h2>
              <Button variant="ghost" size="sm">
                Hide completed
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400 p-2">
                <input 
                  type="checkbox" 
                  className="h-4 w-4" 
                  disabled
                />
                <input
                  type="text"
                  placeholder="Type in subtask and press enter"
                  className="flex-1 bg-transparent border-none outline-none"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.trim()) {
                      addSubtask(e.currentTarget.value.trim());
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
              {task.subtasks?.map((subtask) => (
                <div 
                  key={subtask.id} 
                  className={`flex items-center gap-2 p-2 rounded-lg ${
                    subtask.completed ? "bg-gray-50" : "bg-orange-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={subtask.completed}
                    onChange={(e) => handleSubtaskChange(subtask.id, e.target.checked)}
                  />
                  <span className={subtask.completed ? "line-through text-gray-500" : ""}>
                    {subtask.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Assignments */}
          <div>
            <h2 className="text-lg font-medium mb-4">Assignments:</h2>
            <div className="space-y-2">
              {task.assignments?.map((assignment, index) => (
                <div key={index}>
                  <p>{assignment.title}</p>
                  <Link
                    href={assignment.url}
                    className="text-blue-600 hover:underline break-all"
                  >
                    {assignment.url}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 border-l p-6">
        <div className="space-y-6">
          {/* Time Used Section */}
          <div>
            <h3 className="text-xs uppercase text-gray-500 mb-2">TIME USED</h3>
            <div className="flex items-center gap-4">
              <div className="text-blue-500">{task.timeUsed?.hours}h</div>
              <div className="text-gray-400">{task.timeUsed?.hours}h</div>
              <div>{task.timeUsed?.minutes}m</div>
            </div>
          </div>

          {/* Planned For Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs uppercase text-gray-500">PLANNED FOR</h3>
              <h3 className="text-xs uppercase text-gray-500">FOCUS</h3>
            </div>
            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between text-sm mb-2">
                <div>Mar {task.startMar}, {task.dueTime}</div>
                <div className="text-gray-400">I will work on...</div>
              </div>
              <Button variant="ghost" size="sm" className="text-blue-500 h-6">
                + Add time entry
              </Button>
            </div>
          </div>

          {/* Time Planning Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs uppercase text-gray-500">PLANNED</h3>
              <h3 className="text-xs uppercase text-gray-500">ACTUAL</h3>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{task.plannedTime?.hours}h</span>
                <span className="text-gray-400">{task.plannedTime?.minutes}m</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{task.actualTime}</span>
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <div className="text-sm text-green-500 mt-1">Planned</div>
          </div>
        </div>
      </div>
    </div>
  );
}
