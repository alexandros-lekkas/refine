"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  Plus,
  Calendar,
  TrendingUp,
  Clock,
  AlertTriangle,
  Rocket,
  Trophy,
  BarChart2,
} from "lucide-react";
import Link from "next/link";
import { useTask } from "@/contexts/TaskContext";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { tasks } = useTask();
  const [timeOfDay, setTimeOfDay] = useState("morning");
  const [dailyProgress, setDailyProgress] = useState(60);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setTimeOfDay("afternoon");
    else if (hour >= 17) setTimeOfDay("evening");
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">👋 Good {timeOfDay}, Alex!</h1>
        <p className="text-xl text-muted-foreground">
          You have 3 tasks due this week. Your focus today should be on Human Dynamics Assignment and Cultural Studies Project for a total of 4 hours. You are on track to meet your deadlines!
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="p-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Today's Progress</h3>
            <span className="text-sm text-muted-foreground">{dailyProgress}% Complete</span>
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
            <h3 className="font-semibold">Human Dynamics Quiz</h3>
            <p className="text-sm text-muted-foreground">Complete by 11:59 PM</p>
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
            <h3 className="font-semibold">Cultural Studies Project</h3>
            <p className="text-sm text-muted-foreground">AI suggests: 45 min</p>
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
            <h3 className="font-semibold">Math Assignment</h3>
            <p className="text-sm text-muted-foreground">Start in 2 days</p>
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
              <span>You have extra time to finish today's tasks</span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5" />
              <span>Total Study Time This Week: 12 hours</span>
            </div>
            <div className="flex items-center gap-3 text-blue-500">
              <Rocket className="w-5 h-5" />
              <span>You're 20% more productive than last week!</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>💡 Based on your study habits, start Math Assignment by Friday to maintain your productivity streak.</p>
            <p>⚡️ Your best focus hours are between 9 AM and 11 AM. Schedule important tasks then!</p>
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
            <Button variant="outline" className="flex items-center gap-2 h-auto py-4 flex-col">
              <Calendar className="w-5 h-5" />
              <span>View Today's Plan</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 h-auto py-4 flex-col">
              <Trophy className="w-5 h-5" />
              <span>Optimize Schedule</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 h-auto py-4 flex-col">
              <BarChart2 className="w-5 h-5" />
              <span>Check Trends</span>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 h-auto py-4 flex-col" asChild>
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