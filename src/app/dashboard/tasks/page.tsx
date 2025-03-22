"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Check,
  Clock,
  BarChart3,
} from "lucide-react";
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
  courseTitle: string;
  title: string;
  dueDate: Date;
  dueTime: string;
  startMar: number;
  status: "due-today" | "due-soon" | "start-soon";
  completed: boolean;
  timeUsed?: { hours: number; minutes: number };
  plannedTime?: { hours: number; minutes: number };
  isMultiPhase?: boolean;
  type?: string;
  phases?: Phase[];
}

export default function TasksPage() {
  const router = useRouter();
  const { tasks } = useTask();

  const handleTaskClick = (taskId: string) => {
    router.push(`/dashboard/tasks/${taskId}`);
  };

  const getTimeInfo = (task: Task) => {
    const timeUsed = task.timeUsed || { hours: 0, minutes: 0 };
    const plannedTime = task.plannedTime || { hours: 1, minutes: 0 };
    const progressPercentage = Math.min(
      ((timeUsed.hours * 60 + timeUsed.minutes) /
        (plannedTime.hours * 60 + plannedTime.minutes)) *
        100,
      100
    );
    return { timeUsed, plannedTime, progressPercentage };
  };

  const getPhaseProgress = (phases: Phase[] | undefined) => {
    if (!phases) return 0;
    const completedPhases = phases.filter((phase) => phase.completed).length;
    return Math.round((completedPhases / phases.length) * 100);
  };

  return (
    <main className="container mx-auto p-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-bold">
              Tasks - {format(new Date(), "EEEE, MMMM do")}
            </h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
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
                .map((task) => {
                  const { progressPercentage } = getTimeInfo(task);
                  const phaseProgress = getPhaseProgress(task.phases);
                  return (
                    <Card
                      key={task.id}
                      className={cn(
                        "p-4 cursor-pointer hover:shadow-md transition-shadow",
                        task.completed && "bg-green-500/10 dark:bg-green-500/20"
                      )}
                      onClick={() => handleTaskClick(task.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                            <span>{task.courseCode}</span>
                            <span className="text-muted-foreground/50">•</span>
                            <span className="truncate">{task.courseTitle}</span>
                          </div>
                          <div className="font-medium mb-2 flex items-center gap-2">
                            <span
                              className={cn(task.completed && "text-green-500")}
                            >
                              {task.title}
                            </span>
                            {task.completed && (
                              <Check className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>
                                Due: {format(task.dueDate, "MMM d")},{" "}
                                {task.dueTime}
                              </span>
                            </div>
                            {task.isMultiPhase && (
                              <div className="flex items-center gap-2">
                                <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                                  {task.type}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {phaseProgress}% complete
                                </div>
                              </div>
                            )}
                          </div>
                          {task.isMultiPhase ? (
                            <div className="mt-2 grid gap-1">
                              <div className="w-full bg-muted rounded-full h-1">
                                <div
                                  className={cn(
                                    "h-1 rounded-full",
                                    task.completed
                                      ? "bg-green-500"
                                      : "bg-primary"
                                  )}
                                  style={{ width: `${phaseProgress}%` }}
                                />
                              </div>
                              <div className="w-full bg-muted rounded-full h-1">
                                <div
                                  className="h-1 rounded-full bg-purple-500"
                                  style={{ width: `${progressPercentage}%` }}
                                />
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Phase Progress</span>
                                <span>Time Used</span>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-2 w-full bg-muted rounded-full h-1">
                              <div
                                className={cn(
                                  "h-1 rounded-full",
                                  task.completed ? "bg-green-500" : "bg-primary"
                                )}
                                style={{ width: `${progressPercentage}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
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
                .map((task) => {
                  const { progressPercentage } = getTimeInfo(task);
                  const phaseProgress = getPhaseProgress(task.phases);
                  return (
                    <Card
                      key={task.id}
                      className={cn(
                        "p-4 cursor-pointer hover:shadow-md transition-shadow",
                        task.completed && "bg-green-500/10 dark:bg-green-500/20"
                      )}
                      onClick={() => handleTaskClick(task.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                            <span>{task.courseCode}</span>
                            <span className="text-muted-foreground/50">•</span>
                            <span className="truncate">{task.courseTitle}</span>
                          </div>
                          <div className="font-medium mb-2 flex items-center gap-2">
                            <span
                              className={cn(task.completed && "text-green-500")}
                            >
                              {task.title}
                            </span>
                            {task.completed && (
                              <Check className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>
                                Due: {format(task.dueDate, "MMM d")},{" "}
                                {task.dueTime}
                              </span>
                            </div>
                            {task.isMultiPhase && (
                              <div className="flex items-center gap-2">
                                <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                                  {task.type}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {phaseProgress}% complete
                                </div>
                              </div>
                            )}
                          </div>
                          {task.isMultiPhase ? (
                            <div className="mt-2 grid gap-1">
                              <div className="w-full bg-muted rounded-full h-1">
                                <div
                                  className={cn(
                                    "h-1 rounded-full",
                                    task.completed
                                      ? "bg-green-500"
                                      : "bg-primary"
                                  )}
                                  style={{ width: `${phaseProgress}%` }}
                                />
                              </div>
                              <div className="w-full bg-muted rounded-full h-1">
                                <div
                                  className="h-1 rounded-full bg-purple-500"
                                  style={{ width: `${progressPercentage}%` }}
                                />
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Phase Progress</span>
                                <span>Time Used</span>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-2 w-full bg-muted rounded-full h-1">
                              <div
                                className={cn(
                                  "h-1 rounded-full",
                                  task.completed ? "bg-green-500" : "bg-primary"
                                )}
                                style={{ width: `${progressPercentage}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
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
                .map((task) => {
                  const { progressPercentage } = getTimeInfo(task);
                  const phaseProgress = getPhaseProgress(task.phases);
                  return (
                    <Card
                      key={task.id}
                      className={cn(
                        "p-4 cursor-pointer hover:shadow-md transition-shadow",
                        task.completed && "bg-green-500/10 dark:bg-green-500/20"
                      )}
                      onClick={() => handleTaskClick(task.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                            <span>{task.courseCode}</span>
                            <span className="text-muted-foreground/50">•</span>
                            <span className="truncate">{task.courseTitle}</span>
                          </div>
                          <div className="font-medium mb-2 flex items-center gap-2">
                            <span
                              className={cn(task.completed && "text-green-500")}
                            >
                              {task.title}
                            </span>
                            {task.completed && (
                              <Check className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>
                                Due: {format(task.dueDate, "MMM d")},{" "}
                                {task.dueTime}
                              </span>
                            </div>
                            {task.isMultiPhase && (
                              <div className="flex items-center gap-2">
                                <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                                  {task.type}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {phaseProgress}% complete
                                </div>
                              </div>
                            )}
                          </div>
                          {task.isMultiPhase ? (
                            <div className="mt-2 grid gap-1">
                              <div className="w-full bg-muted rounded-full h-1">
                                <div
                                  className={cn(
                                    "h-1 rounded-full",
                                    task.completed
                                      ? "bg-green-500"
                                      : "bg-primary"
                                  )}
                                  style={{ width: `${phaseProgress}%` }}
                                />
                              </div>
                              <div className="w-full bg-muted rounded-full h-1">
                                <div
                                  className="h-1 rounded-full bg-purple-500"
                                  style={{ width: `${progressPercentage}%` }}
                                />
                              </div>
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Phase Progress</span>
                                <span>Time Used</span>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-2 w-full bg-muted rounded-full h-1">
                              <div
                                className={cn(
                                  "h-1 rounded-full",
                                  task.completed ? "bg-green-500" : "bg-primary"
                                )}
                                style={{ width: `${progressPercentage}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
