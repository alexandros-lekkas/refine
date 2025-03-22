"use client"

import * as React from "react"
import { format, startOfWeek, addDays, isSameDay, parseISO } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Flame } from "lucide-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Task {
  id: string;
  title: string;
  courseCode: string;
  dueDate: Date;
  startTime?: string;
  endTime?: string;
  type: "Assignment" | "Project" | "Exam";
  priority?: "high" | "medium" | "low";
}

interface CalendarProps {
  className?: string;
  tasks?: Task[];
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  view?: "week" | "month";
}

function Calendar({
  className,
  tasks = [],
  selectedDate = new Date(),
  onDateSelect,
  view = "week"
}: CalendarProps) {
  const hours = Array.from({ length: 20 }, (_, i) => i + 4); // 4 AM to 11 PM
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 });

  const getTasksForDateAndHour = (date: Date, hour: number) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      const taskHour = task.startTime ? parseInt(task.startTime.split(":")[0]) : null;
      return isSameDay(taskDate, date) && (taskHour === null || taskHour === hour);
    });
  };

  const getDueTasks = (date: Date) => {
    return tasks.filter(task => isSameDay(new Date(task.dueDate), date));
  };

  return (
    <div className={cn("w-full h-full bg-white rounded-lg", className)}>
      {/* Header */}
      <div className="grid grid-cols-[60px_1fr] border-b">
        <div className="p-2" /> {/* Empty cell for time column */}
        <div className="grid grid-cols-6">
          {weekDays.map((day, i) => {
            const date = addDays(startDate, i);
            const dueTasks = getDueTasks(date);
            const isToday = isSameDay(date, new Date());
            return (
              <div 
                key={day} 
                className={cn(
                  "p-2 text-center border-l",
                  isToday && "bg-purple-50"
                )}
              >
                <div className="text-sm font-medium">{format(date, "dd")}</div>
                <div className="text-xs text-gray-500">{day}</div>
                {dueTasks.length > 0 && (
                  <div className={cn(
                    "mt-1 px-2 py-0.5 text-xs rounded text-center",
                    dueTasks.length > 2 ? "bg-purple-600 text-white" : "bg-purple-100 text-purple-900"
                  )}>
                    {dueTasks.length} {dueTasks.length === 1 ? "task" : "tasks"} due
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-[60px_1fr] divide-y">
        {hours.map(hour => (
          <div key={hour} className="grid grid-cols-[60px_1fr] group">
            {/* Time Column */}
            <div className="py-2 px-2 text-xs text-gray-500">
              {hour === 12 ? "12 PM" : hour > 12 ? `${hour-12} PM` : `${hour} AM`}
            </div>
            {/* Task Slots */}
            <div className="grid grid-cols-6">
              {weekDays.map((day, i) => {
                const date = addDays(startDate, i);
                const tasksForSlot = getTasksForDateAndHour(date, hour);
                return (
                  <div
                    key={`${day}-${hour}`}
                    className="h-12 border-l relative group hover:bg-gray-50"
                  >
                    {tasksForSlot.map(task => (
                      <div
                        key={task.id}
                        className={cn(
                          "absolute inset-x-0 mx-1 rounded px-2 py-1 text-xs overflow-hidden",
                          task.type === "Assignment" && "bg-green-100 text-green-800",
                          task.type === "Exam" && "bg-red-100 text-red-800",
                          task.type === "Project" && "bg-blue-100 text-blue-800"
                        )}
                        style={{
                          top: "4px",
                          minHeight: "calc(100% - 8px)"
                        }}
                      >
                        <div className="font-medium truncate">{task.courseCode}</div>
                        <div className="truncate">{task.title}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Calendar.displayName = "Calendar"

export { Calendar }
