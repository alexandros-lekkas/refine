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
import {
  format,
  isToday,
  isTomorrow,
  addDays,
  isWithinInterval,
} from "date-fns";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { TaskDialog } from "./task-dialog";
import React from "react";
import { Tables } from "@/types/supabase";
import { createClient } from "@/lib/supabase/client/client";
import { useAuth } from "@/lib/hooks/use-auth";

type Task = Tables<"tasks">;

type TaskCategory = "DUE_TODAY" | "DUE_SOON" | "START_SOON";

export default function TasksPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = React.useState(false);

  React.useEffect(() => {
    async function fetchTasks() {
      if (!user) return;

      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .eq("user_id", user.id)
          .order("due_date", { ascending: true });

        if (error) throw error;
        setTasks(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [user]);

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

  const categorizeTask = (task: Task): TaskCategory => {
    const dueDate = new Date(task.due_date);
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const endOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );
    const endOfDueSoon = addDays(endOfToday, 3); // Tasks due within next 3 days

    // Due Today: Due today (until end of day)
    if (dueDate <= endOfToday) {
      return "DUE_TODAY";
    }

    // Due Soon: Due within next 3 days
    if (dueDate <= endOfDueSoon) {
      return "DUE_SOON";
    }

    // Start Soon: Everything else
    return "START_SOON";
  };

  const getTasksByCategory = (category: TaskCategory) => {
    return tasks.filter((task) => categorizeTask(task) === category);
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
    <div className="w-full h-full max-w-[1600px] mx-auto px-6">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <h2 className="text-4xl font-bold text-foreground">Tasks</h2>
          <div className="flex items-center gap-3 ml-2.5">
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-secondary rounded-full">
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <div className="flex items-center gap-2">
                <span className="text-lg">{format(new Date(), "MMM d")}</span>
                <span className="text-sm text-muted-foreground">(Today)</span>
              </div>
              <button className="p-1 hover:bg-secondary rounded-full">
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>

        <TaskDialog />
      </div>

      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-140px)] w-full">
        {/* Due Today Column */}
        <div className="flex flex-col gap-4">
          <div className="bg-destructive/10 text-destructive px-3 py-1.5 rounded-md w-fit dark:bg-destructive/20">
            Due Today
          </div>
          <div className="space-y-3">
            {getTasksByCategory("DUE_TODAY").map((task: Task) => {
              const progressPercentage = getProgressPercentage(task);
              return (
                <Card
                  key={task.id}
                  className={cn(
                    "p-4 cursor-pointer hover:shadow-md transition-shadow relative",
                    task.completed && "bg-green-500/10 dark:bg-green-500/20"
                  )}
                  onClick={() => handleTaskClick(task.id)}
                >
                  {/* Static Checkmark Icon */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700 group">
                    <Check className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors" />
                  </div>

                  <div className="flex items-start justify-between pr-12">
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
                            {task.time_used_hours}h {task.time_used_minutes}m /{" "}
                            {task.planned_time_hours}h{" "}
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
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-md w-fit dark:bg-yellow-900/20 dark:text-yellow-200">
            Due Soon
          </div>
          <div className="space-y-3">
            {getTasksByCategory("DUE_SOON").map((task: Task) => {
              const progressPercentage = getProgressPercentage(task);
              return (
                <Card
                  key={task.id}
                  className={cn(
                    "p-4 cursor-pointer hover:shadow-md transition-shadow relative",
                    task.completed && "bg-green-500/10 dark:bg-green-500/20"
                  )}
                  onClick={() => handleTaskClick(task.id)}
                >
                  {/* Static Checkmark Icon */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700 group">
                    <Check className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors" />
                  </div>

                  <div className="flex items-start justify-between pr-12">
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
                            {task.time_used_hours}h {task.time_used_minutes}m /{" "}
                            {task.planned_time_hours}h{" "}
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
          <div className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-md w-fit dark:bg-blue-900/20 dark:text-blue-200">
            Start Soon
          </div>
          <div className="space-y-3">
            {getTasksByCategory("START_SOON").map((task: Task) => {
              const progressPercentage = getProgressPercentage(task);
              return (
                <Card
                  key={task.id}
                  className={cn(
                    "p-4 cursor-pointer hover:shadow-md transition-shadow relative",
                    task.completed && "bg-green-500/10 dark:bg-green-500/20"
                  )}
                  onClick={() => handleTaskClick(task.id)}
                >
                  {/* Static Checkmark Icon */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700 group">
                    <Check className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors" />
                  </div>

                  <div className="flex items-start justify-between pr-12">
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
                            {task.time_used_hours}h {task.time_used_minutes}m /{" "}
                            {task.planned_time_hours}h{" "}
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
  );
}
