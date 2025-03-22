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
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { TaskDialog } from "./task-dialog";
import React from "react";
import { Tables } from "@/types/supabase";

type Task = Tables<"tasks">;

export default function TasksPage() {
  const router = useRouter();
  const { tasks, loading, error } = useTasks();
  const [isTaskDialogOpen, setIsTaskDialogOpen] = React.useState(false);

  const handleTaskClick = (taskId: string) => {
    router.push(`/dashboard/tasks/${taskId}`);
  };

  const getProgressPercentage = (task: Task) => {
    if (!task.is_multi_phase) return task.completed ? 100 : 0;
    return Math.round(
      ((task.time_used_hours * 60 + task.time_used_minutes) /
        (task.planned_time_hours * 60 + task.planned_time_minutes)) *
        100
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl font-bold text-foreground">
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
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4"
            onClick={() => setIsTaskDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Due Today Column */}
          <div className="flex flex-col gap-4">
            <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-full w-fit dark:bg-destructive/20">
              Due Today
            </div>
            <div className="space-y-3">
              {tasks
                .filter((task) => task.status === "DUE_TODAY")
                .map((task) => {
                  const progressPercentage = getProgressPercentage(task);
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
                          <div className="text-sm text-muted-foreground mb-1">
                            {task.category}
                          </div>
                          <div className="font-medium mb-2 flex items-center gap-2">
                            <span
                              className={cn(
                                task.completed &&
                                  "text-green-500 dark:text-green-400"
                              )}
                            >
                              {task.title}
                            </span>
                            {task.completed && (
                              <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>
                                Due: {format(new Date(task.due_date), "MMM d")}
                              </span>
                            </div>
                            {task.is_multi_phase && (
                              <div className="text-xs text-muted-foreground">
                                {task.time_used_hours}h {task.time_used_minutes}
                                m / {task.planned_time_hours}h{" "}
                                {task.planned_time_minutes}m
                              </div>
                            )}
                          </div>
                          <div className="mt-2">
                            <div className="w-full bg-muted rounded-full h-1">
                              <div
                                className={cn(
                                  "h-1 rounded-full",
                                  task.completed
                                    ? "bg-green-500 dark:bg-green-400"
                                    : "bg-primary"
                                )}
                                style={{ width: `${progressPercentage}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>Progress</span>
                              <span>{progressPercentage}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </div>
          {/* Due Soon Column */}
          <div className="flex flex-col gap-4">
            <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full w-fit dark:bg-yellow-900/20 dark:text-yellow-200">
              Due Soon
            </div>
            <div className="space-y-3">
              {tasks
                .filter((task) => task.status === "DUE_SOON")
                .map((task) => {
                  const progressPercentage = getProgressPercentage(task);
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
                          <div className="text-sm text-muted-foreground mb-1">
                            {task.category}
                          </div>
                          <div className="font-medium mb-2 flex items-center gap-2">
                            <span
                              className={cn(
                                task.completed &&
                                  "text-green-500 dark:text-green-400"
                              )}
                            >
                              {task.title}
                            </span>
                            {task.completed && (
                              <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>
                                Due: {format(new Date(task.due_date), "MMM d")}
                              </span>
                            </div>
                            {task.is_multi_phase && (
                              <div className="text-xs text-muted-foreground">
                                {task.time_used_hours}h {task.time_used_minutes}
                                m / {task.planned_time_hours}h{" "}
                                {task.planned_time_minutes}m
                              </div>
                            )}
                          </div>
                          <div className="mt-2">
                            <div className="w-full bg-muted rounded-full h-1">
                              <div
                                className={cn(
                                  "h-1 rounded-full",
                                  task.completed
                                    ? "bg-green-500 dark:bg-green-400"
                                    : "bg-primary"
                                )}
                                style={{ width: `${progressPercentage}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>Progress</span>
                              <span>{progressPercentage}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </div>
          {/* Start Soon Column */}
          <div className="flex flex-col gap-4">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full w-fit dark:bg-blue-900/20 dark:text-blue-200">
              Start Soon
            </div>
            <div className="space-y-3">
              {tasks
                .filter((task) => task.status === "START_SOON")
                .map((task) => {
                  const progressPercentage = getProgressPercentage(task);
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
                          <div className="text-sm text-muted-foreground mb-1">
                            {task.category}
                          </div>
                          <div className="font-medium mb-2 flex items-center gap-2">
                            <span
                              className={cn(
                                task.completed &&
                                  "text-green-500 dark:text-green-400"
                              )}
                            >
                              {task.title}
                            </span>
                            {task.completed && (
                              <Check className="h-4 w-4 text-green-500 dark:text-green-400" />
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>
                                Due: {format(new Date(task.due_date), "MMM d")}
                              </span>
                            </div>
                            {task.is_multi_phase && (
                              <div className="text-xs text-muted-foreground">
                                {task.time_used_hours}h {task.time_used_minutes}
                                m / {task.planned_time_hours}h{" "}
                                {task.planned_time_minutes}m
                              </div>
                            )}
                          </div>
                          <div className="mt-2">
                            <div className="w-full bg-muted rounded-full h-1">
                              <div
                                className={cn(
                                  "h-1 rounded-full",
                                  task.completed
                                    ? "bg-green-500 dark:bg-green-400"
                                    : "bg-primary"
                                )}
                                style={{ width: `${progressPercentage}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>Progress</span>
                              <span>{progressPercentage}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <TaskDialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen} />
    </main>
  );
}
