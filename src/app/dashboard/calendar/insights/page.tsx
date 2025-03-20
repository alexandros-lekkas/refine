"use client";

import { Card } from "@/components/ui/card";

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Time Insights</h1>
      </div>

      <div className="grid gap-6">
        {/* Course Time Distribution */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Time Spent by Course</h2>
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-muted-foreground">
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>MG116-11 - Human Dynamics</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span>EMS370-1 - Cultural Studies</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span>FI118-14 - Introduction to Finance</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span>MA105L-2 - Mathematical Foundations</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Weekly Time Analysis */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Weekly Time Analysis</h2>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p>Mar 2 - 8</p>
              <p className="text-sm mt-2">Average study time: 0.5h per day</p>
            </div>
          </div>
        </Card>

        {/* Study Plan Progress */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Study Plan Progress</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Planned study time</span>
              <div className="w-3 h-3 rounded-full bg-purple-500" />
            </div>
            <div className="flex items-center justify-between">
              <span>Used study time</span>
              <div className="w-3 h-3 rounded-full bg-blue-500" />
            </div>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              <p>Mar 16 - Mar 17</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Time Overview */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Study Time Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Available Study Time</span>
                <span className="font-semibold">0h 0m</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tasks due</span>
                <span className="font-semibold">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Task workload due</span>
                <span className="font-semibold">0h 0m</span>
              </div>
              <div className="flex justify-between items-center text-green-500">
                <span>Time planned</span>
                <span className="font-semibold">0h 0m</span>
              </div>
              <div className="flex justify-between items-center text-red-500">
                <span>Time left to plan</span>
                <span className="font-semibold">0h 0m</span>
              </div>
            </div>
          </Card>

          {/* Time Management Status */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Time Management Status</h2>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Time Available - Time Needed = The Cushion time for each task.
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm">You have more time than you need.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="text-sm">You are starting to run out of extra study time.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-sm">You don&apos;t have enough time to get the task done. Adjust your schedule.</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-500 font-semibold">40%</span>
                  <span className="text-sm text-muted-foreground">Turn my Cushion yellow when the Cushion of a task = 40% of the time needed to complete the task.</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
