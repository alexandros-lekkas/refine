"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { format, isToday, isTomorrow, isThisWeek } from "date-fns";

import {
  Plus,
  Calendar,
  TrendingUp,
  Clock,
  AlertTriangle,
  Rocket,
  Trophy,
  BarChart2,
  Loader2,
} from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";
import { Database } from "@/types/supabase";
import { createClient } from "@/lib/supabase/client/client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type Task = Database["public"]["Tables"]["tasks"]["Row"] & {
  assignments?: Database["public"]["Tables"]["assignments"]["Row"][];
  phases?: Database["public"]["Tables"]["phases"]["Row"][];
  subtasks?: Database["public"]["Tables"]["subtasks"]["Row"][];
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [dailyProgress, setDailyProgress] = useState(0);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setTimeOfDay("afternoon");
    else if (hour >= 17) setTimeOfDay("evening");
  }, []);

  useEffect(() => {
    async function fetchTasks() {
      if (!user) return;

      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("tasks")
          .select(
            `
            *,
            assignments (*),
            phases (*),
            subtasks (*)
          `
          )
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

  useEffect(() => {
    if (tasks.length > 0) {
      const todayTasks = tasks.filter((task) =>
        isToday(new Date(task.due_date))
      );
      const completedToday = todayTasks.filter((task) => task.completed).length;
      const progress = (completedToday / todayTasks.length) * 100;
      setDailyProgress(isNaN(progress) ? 0 : progress);
    }
  }, [tasks]);

  const dueTodayTasks = tasks.filter((task) =>
    isToday(new Date(task.due_date))
  );
  const workOnToday = tasks.filter(
    (task) => isToday(new Date(task.due_date)) && !task.completed
  );
  const startSoonTasks = tasks.filter(
    (task) =>
      !isToday(new Date(task.due_date)) &&
      !isTomorrow(new Date(task.due_date)) &&
      isThisWeek(new Date(task.due_date))
  );

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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Good {timeOfDay}, {user?.first_name}
          </h1>
          <p className="text-muted-foreground">
            Here's what you need to focus on today
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/tasks/new">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Daily Progress
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(dailyProgress)}%
            </div>
            <Progress value={dailyProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Today</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dueTodayTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {dueTodayTasks.length === 0
                ? "No tasks due today"
                : `${dueTodayTasks.length} task${
                    dueTodayTasks.length === 1 ? "" : "s"
                  } to complete`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Work On Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workOnToday.length}</div>
            <p className="text-xs text-muted-foreground">
              {workOnToday.length === 0
                ? "No tasks to work on"
                : `${workOnToday.length} task${
                    workOnToday.length === 1 ? "" : "s"
                  } to start`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Starting Soon</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{startSoonTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              {startSoonTasks.length === 0
                ? "No upcoming tasks"
                : `${startSoonTasks.length} task${
                    startSoonTasks.length === 1 ? "" : "s"
                  } starting soon`}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Due Today</CardTitle>
          </CardHeader>
          <CardContent>
            {dueTodayTasks.length === 0 ? (
              <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                No tasks due today
              </div>
            ) : (
              <div className="space-y-4">
                {dueTodayTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {task.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {task.description || "No description"}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/tasks/${task.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Starting Soon</CardTitle>
          </CardHeader>
          <CardContent>
            {startSoonTasks.length === 0 ? (
              <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                No upcoming tasks
              </div>
            ) : (
              <div className="space-y-4">
                {startSoonTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {task.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Due {format(new Date(task.due_date), "MMM d")}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/tasks/${task.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
