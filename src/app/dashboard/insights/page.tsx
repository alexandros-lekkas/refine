"use client";

import Image from "next/image";

export default function InsightsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Insights</h1>
      
      <div className="grid gap-6">
        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Time Spent on Tasks</h2>
          <div className="relative h-[300px] w-full">
            <Image
              src="/insights/time-spent-courses.png"
              alt="Time spent on tasks by course"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Weekly Time Analysis</h2>
          <div className="relative h-[300px] w-full">
            <Image
              src="/insights/weekly-time.png"
              alt="Weekly time analysis"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="p-6 bg-card rounded-lg border shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Study Plan Progress</h2>
          <div className="relative h-[300px] w-full">
            <Image
              src="/insights/study-plan.png"
              alt="Study plan progress"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Study Time Overview</h2>
            <div className="relative h-[200px] w-full">
              <Image
                src="/insights/study-time-overview.png"
                alt="Study time overview"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Time Management Status</h2>
            <div className="relative h-[200px] w-full">
              <Image
                src="/insights/time-management.png"
                alt="Time management status"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
