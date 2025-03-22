"use client";

import { Card } from "@/components/ui/card";
import {
  Brain,
  Clock,
  Calendar,
  BarChart2,
  Zap,
  Timer,
  BookOpen,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Placeholder data - In real app, this would come from your backend
const insightsData = {
  dailySnapshot: {
    tasksCompletedToday: 5,
    tasksCompletedThisWeek: 23,
    averageTimePerDay: 4.5,
    timeSavedWithAI: 45,
  },
  focusScore: 85,
  subjectStrainScores: [
    { subject: "Mathematics", estimated: 10, actual: 12 },
    { subject: "Physics", estimated: 8, actual: 6 },
    { subject: "Computer Science", estimated: 15, actual: 14 },
    { subject: "English", estimated: 5, actual: 8 },
  ],
  procrastinationStats: {
    earlyStarter: 30,
    onTime: 45,
    lastMinute: 20,
    overdue: 5,
  },
};

export default function InsightsPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-6 py-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Insights</h1>
          <p className="text-muted-foreground">
            Track your productivity and learning patterns
          </p>
        </div>
      </div>

      {/* Daily Snapshot */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="space-y-0.5">
              <h3 className="text-sm font-medium">Tasks Today</h3>
              <div className="text-2xl font-bold">
                {insightsData.dailySnapshot.tasksCompletedToday}
              </div>
            </div>
            <Calendar className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="space-y-0.5">
              <h3 className="text-sm font-medium">Weekly Tasks</h3>
              <div className="text-2xl font-bold">
                {insightsData.dailySnapshot.tasksCompletedThisWeek}
              </div>
            </div>
            <BarChart2 className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="space-y-0.5">
              <h3 className="text-sm font-medium">Daily Average</h3>
              <div className="text-2xl font-bold">
                {insightsData.dailySnapshot.averageTimePerDay}h
              </div>
            </div>
            <Clock className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <div className="space-y-0.5">
              <h3 className="text-sm font-medium">Time Saved</h3>
              <div className="text-2xl font-bold">
                {insightsData.dailySnapshot.timeSavedWithAI}m
              </div>
            </div>
            <Timer className="h-8 w-8 text-muted-foreground" />
          </div>
        </Card>
      </div>

      {/* Learning Energy & Focus */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between pb-4">
            <div className="space-y-1">
              <h3 className="font-medium">Learning Energy Curve</h3>
              <p className="text-sm text-muted-foreground">
                Your most productive hours
              </p>
            </div>
            <Brain className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            Heatmap visualization coming soon
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between pb-4">
            <div className="space-y-1">
              <h3 className="font-medium">AI Focus Score</h3>
              <p className="text-sm text-muted-foreground">
                Based on completion rate and consistency
              </p>
            </div>
            <Zap className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-3xl font-bold">{insightsData.focusScore}</div>
                <div className="text-sm text-muted-foreground">Focus Score</div>
              </div>
              <div className="h-16 w-16 rounded-full border-8 border-primary/20" 
                   style={{ borderRightColor: 'hsl(var(--primary))' }} />
            </div>
            <Progress value={insightsData.focusScore} />
          </div>
        </Card>
      </div>

      {/* Subject Strain & Procrastination */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between pb-4">
            <div className="space-y-1">
              <h3 className="font-medium">Subject Strain Score</h3>
              <p className="text-sm text-muted-foreground">
                Time allocation by subject
              </p>
            </div>
            <BookOpen className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {insightsData.subjectStrainScores.map((subject) => (
              <div key={subject.subject} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>{subject.subject}</div>
                  <div className="text-muted-foreground">
                    {subject.actual}h / {subject.estimated}h
                  </div>
                </div>
                <Progress 
                  value={(subject.actual / subject.estimated) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between pb-4">
            <div className="space-y-1">
              <h3 className="font-medium">Procrastination Tracker</h3>
              <p className="text-sm text-muted-foreground">
                Task start time analysis
              </p>
            </div>
            <AlertTriangle className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {Object.entries(insightsData.procrastinationStats).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  <div className="text-muted-foreground">{value}%</div>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Time Allocation */}
      <Card className="p-6">
        <div className="flex items-center justify-between pb-4">
          <div className="space-y-1">
            <h3 className="font-medium">Revised Time Allocation</h3>
            <p className="text-sm text-muted-foreground">
              Weekly time prediction accuracy
            </p>
          </div>
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
          Time allocation chart coming soon
        </div>
      </Card>
    </div>
  );
}
