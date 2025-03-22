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

import { useTask } from "@/lib/providers/tasks";
import { useAuth } from "@/lib/hooks/use-auth";
import { Database } from "@/types/supabase";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type Task = Database["public"]["Tables"]["tasks"]["Row"] & {
  assignments?: Database["public"]["Tables"]["assignments"]["Row"][];
  phases?: Database["public"]["Tables"]["phases"]["Row"][];
  subtasks?: Database["public"]["Tables"]["subtasks"]["Row"][];
};

export default function DashboardPage() {
  const { tasks, loading, error } = useTask();
  const { user } = useAuth();
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [dailyProgress, setDailyProgress] = useState(0);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setTimeOfDay("afternoon");
    else if (hour >= 17) setTimeOfDay("evening");
  }, []);

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
    <div className="flex flex-col gap-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">👋 Good {timeOfDay}, {user?.first_name || 'there'}!</h1>
        <p className="text-xl text-muted-foreground">
          You have{" "}
          {tasks.filter((task) => isThisWeek(new Date(task.due_date))).length}{" "}
          tasks due this week.{" "}
          {workOnToday.length > 0 &&
            `Your focus today should be on ${
              workOnToday[0].title
            } and other tasks for a total of ${workOnToday.reduce(
              (acc, task) => acc + (task.planned_time_hours || 0),
              0
            )} hours.`}{" "}
          {dailyProgress >= 60 && "You are on track to meet your deadlines!"}
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="p-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Today's Progress</h3>
            <span className="text-sm text-muted-foreground">
              {Math.round(dailyProgress)}% Complete
            </span>
          </div>
          <Progress value={dailyProgress} className="h-2" />
        </div>
      </Card>

      {/* Next Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-red-50 dark:bg-red-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              Due Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dueTodayTasks.length > 0 ? (
              <>
                <h3 className="font-semibold">{dueTodayTasks[0].title}</h3>
                <p className="text-sm text-muted-foreground">
                  Complete by{" "}
                  {format(new Date(dueTodayTasks[0].due_time), "h:mm a")}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                No tasks due today
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-blue-50 dark:bg-blue-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-500" />
              Work on Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            {workOnToday.length > 0 ? (
              <>
                <h3 className="font-semibold">{workOnToday[0].title}</h3>
                <p className="text-sm text-muted-foreground">
                  AI suggests: {workOnToday[0].planned_time_hours}h{" "}
                  {workOnToday[0].planned_time_minutes}m
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                No tasks to work on today
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-purple-50 dark:bg-purple-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              Start Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            {startSoonTasks.length > 0 ? (
              <>
                <h3 className="font-semibold">{startSoonTasks[0].title}</h3>
                <p className="text-sm text-muted-foreground">
                  Due {format(new Date(startSoonTasks[0].due_date), "MMM d")}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No upcoming tasks</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Time Tracking & Productivity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Smart Time Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-green-500">
              <Clock className="w-5 h-5" />
              <span>
                {tasks.filter((task) => task.completed).length} of{" "}
                {tasks.length} tasks completed
              </span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5" />
              <span>
                Total Study Time This Week:{" "}
                {tasks.reduce(
                  (acc, task) => acc + (task.time_used_hours || 0),
                  0
                )}
                h{" "}
                {tasks.reduce(
                  (acc, task) => acc + (task.time_used_minutes || 0),
                  0
                )}
                m
              </span>
            </div>
            <div className="flex items-center gap-3 text-blue-500">
              <Rocket className="w-5 h-5" />
              <span>
                {Math.round(
                  (tasks.filter((task) => task.completed).length /
                    tasks.length) *
                    100
                )}
                % of tasks completed
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            {workOnToday.length > 0 && (
              <p>
                💡 Focus on {workOnToday[0].title} first to maintain your
                productivity streak.
              </p>
            )}
            <p>
              ⚡️ Your best focus hours are between 9 AM and 11 AM. Schedule
              important tasks then!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="flex items-center gap-2 h-auto py-4 flex-col"
            >
              <Calendar className="w-5 h-5" />
              <span>View Today's Plan</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 h-auto py-4 flex-col"
            >
              <Trophy className="w-5 h-5" />
              <span>Optimize Schedule</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 h-auto py-4 flex-col"
            >
              <BarChart2 className="w-5 h-5" />
              <span>Check Trends</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 h-auto py-4 flex-col"
              asChild
            >
              <Link href="/dashboard/tasks">
                <Plus className="w-5 h-5" />
                <span>Add New Task</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
