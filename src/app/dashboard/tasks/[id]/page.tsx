"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MoreHorizontal,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Timer,
  CheckCircle2,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTask } from "@/contexts/TaskContext";
import { useEffect, useState } from "react";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { format } from "date-fns";

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { getTask, updateTask } = useTask();
  const [task, setTask] = useState(getTask(params.id));
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!task) {
      router.push("/dashboard/tasks");
    }
  }, [task, router]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  if (!task) return null;

  const handleDescriptionChange = (content: string) => {
    updateTask(task.id, { description: content });
  };

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

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
    if (!isTimerRunning) {
      // Start timer
      const currentTimeUsed = task.timeUsed || { hours: 0, minutes: 0 };
      const currentTime = currentTimeUsed.hours * 3600 + currentTimeUsed.minutes * 60;
      setElapsedTime(currentTime);
    } else {
      // Stop timer and update task
      const hours = Math.floor(elapsedTime / 3600);
      const minutes = Math.floor((elapsedTime % 3600) / 60);
      updateTask(task.id, { timeUsed: { hours, minutes } });
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const timeUsed = task.timeUsed || { hours: 0, minutes: 0 };
  const plannedTime = task.plannedTime || { hours: 1, minutes: 0 };
  const progressPercentage = Math.min(
    ((timeUsed.hours) * 60 + timeUsed.minutes) /
    ((plannedTime.hours) * 60 + plannedTime.minutes) * 100,
    100
  );

  const toggleTaskCompletion = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{task.courseCode} - {task.courseTitle}</span>
              <Button variant="ghost" size="sm" className="h-6">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                className={`${
                  task.status === "due-today" ? "text-red-600" :
                  task.status === "due-soon" ? "text-blue-600" : "text-green-600"
                }`}
              >
                {task.status === "due-today" ? "Due Today" :
                 task.status === "due-soon" ? "Due Soon" : "Start Soon"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTaskCompletion}
                className={`flex items-center gap-2 ${task.completed ? 'bg-green-50' : ''}`}
              >
                {task.completed ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-green-600">Completed</span>
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Mark Complete</span>
                  </>
                )}
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTimer}
                  className="flex items-center gap-2"
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="h-4 w-4" />
                      <span>{formatTime(elapsedTime)}</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Start Timer</span>
                    </>
                  )}
                </Button>
              </div>
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

          {/* Description Editor */}
          <div className="space-y-4">
            <h2 className="text-sm font-medium">Description</h2>
            <RichTextEditor
              content={task.description || ''}
              onChange={handleDescriptionChange}
              placeholder="Add a description..."
            />
          </div>

          {/* Subtasks */}
          <div className="mt-8 space-y-4">
            <h2 className="text-sm font-medium">Subtasks</h2>
            <div className="space-y-2">
              {task.subtasks?.map((subtask) => (
                <div key={subtask.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={(e) => handleSubtaskChange(subtask.id, e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className={subtask.completed ? 'line-through text-muted-foreground' : ''}>
                    {subtask.title}
                  </span>
                </div>
              ))}
              <input
                type="text"
                placeholder="Add a subtask..."
                className="w-full px-2 py-1 text-sm border rounded"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value) {
                    addSubtask(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>
          </div>

          {/* Resources */}
          {task.assignments && task.assignments.length > 0 && (
            <div className="mt-8 space-y-4">
              <h2 className="text-sm font-medium">Resources</h2>
              <div className="space-y-2">
                {task.assignments.map((assignment, index) => (
                  <Link
                    key={index}
                    href={assignment.url}
                    target="_blank"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                  >
                    <LinkIcon className="h-4 w-4" />
                    {assignment.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 border-l p-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Due Date</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{format(task.dueDate, "MMM d")} at {task.dueTime}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Time Tracking</h3>
            <Card className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Planned</span>
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <span>{plannedTime.hours}h {plannedTime.minutes}m</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Used</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    <span>{timeUsed.hours}h {timeUsed.minutes}m</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </Card>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Navigation</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
