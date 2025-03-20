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
  Calendar,
  Flag,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTask } from "@/contexts/TaskContext";
import { useEffect, useState } from "react";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { format, addDays, differenceInDays } from "date-fns";

interface PageParams {
  params: {
    id: string;
  };
}

export default function TaskDetailPage({ params }: PageParams) {
  const router = useRouter();
  const { getTask, updateTask, tasks } = useTask();
  const [task, setTask] = useState(getTask(params.id));
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  useEffect(() => {
    if (!task) {
      router.push("/dashboard/tasks");
    }
    if (task?.phases && task.phases.length > 0 && !selectedPhase) {
      setSelectedPhase(task.phases[0].id);
    }
  }, [task, router, selectedPhase]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    // Keep task in sync with context updates
    const updatedTask = getTask(params.id);
    if (updatedTask && JSON.stringify(updatedTask) !== JSON.stringify(task)) {
      setTask(updatedTask);
    }
  }, [params.id, getTask, task]);

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

  const handlePhaseChange = (phaseId: string, completed: boolean) => {
    const updatedPhases = task.phases?.map(phase => 
      phase.id === phaseId ? { ...phase, completed } : phase
    ) || [];
    
    updateTask(task.id, { phases: updatedPhases });
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

  const calculateDailyWorkload = () => {
    if (!task.phases) return null;
    
    const totalDays = differenceInDays(task.dueDate, new Date()) + 1;
    const totalMinutes = task.phases.reduce((acc, phase) => 
      acc + (phase.plannedTime.hours * 60 + phase.plannedTime.minutes), 0);
    
    return Math.ceil(totalMinutes / totalDays);
  };

  const dailyWorkload = calculateDailyWorkload();

  // Find current task index and adjacent tasks
  const currentTaskIndex = tasks.findIndex(t => t.id === task.id);
  const previousTask = currentTaskIndex > 0 ? tasks[currentTaskIndex - 1] : null;
  const nextTask = currentTaskIndex < tasks.length - 1 ? tasks[currentTaskIndex + 1] : null;

  const navigateToTask = (taskId: string) => {
    router.push(`/dashboard/tasks/${taskId}`);
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
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
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-2xl font-semibold">{task.title}</h1>
            <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
              {task.type}
            </span>
          </div>

          {/* Task Roadmap for multi-phase tasks */}
          {task.isMultiPhase && task.phases && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">Task Roadmap</h2>
              <div className="grid gap-4">
                {task.phases.map((phase, index) => (
                  <Card 
                    key={phase.id}
                    className={`p-4 border-l-4 ${
                      phase.completed ? 'border-l-green-500 bg-green-50' :
                      selectedPhase === phase.id ? 'border-l-blue-500' :
                      'border-l-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-medium">Phase {index + 1}</span>
                          <h3 className="font-medium">{phase.title}</h3>
                          <span className="text-sm text-muted-foreground">
                            {format(phase.dueDate, "MMM d")}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{phase.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{phase.plannedTime.hours}h {phase.plannedTime.minutes}m</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePhaseChange(phase.id, !phase.completed)}
                            className={`flex items-center gap-2 ${phase.completed ? 'text-green-600' : ''}`}
                          >
                            <Check className="h-4 w-4" />
                            {phase.completed ? 'Completed' : 'Mark Complete'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {dailyWorkload && (
                <Card className="mt-4 p-4 bg-blue-50">
                  <div className="flex items-center gap-2 text-blue-600">
                    <BarChart3 className="h-5 w-5" />
                    <span className="font-medium">Recommended Daily Schedule</span>
                  </div>
                  <p className="mt-2 text-sm text-blue-600">
                    To complete this task on time, plan to work approximately {Math.floor(dailyWorkload / 60)} hours and {dailyWorkload % 60} minutes each day.
                  </p>
                </Card>
              )}
            </div>
          )}

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
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => previousTask && navigateToTask(previousTask.id)}
                disabled={!previousTask}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => nextTask && navigateToTask(nextTask.id)}
                disabled={!nextTask}
              >
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
