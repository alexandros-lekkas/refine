"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

export default function TasksPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [tasks, setTasks] = useState<{ id: number; title: string; date: Date; completed: boolean }[]>([
    {
      id: 1,
      title: "Complete Math Assignment",
      date: new Date(),
      completed: false,
    },
    {
      id: 2,
      title: "Read Chapter 5",
      date: new Date(),
      completed: true,
    },
  ]);

  return (
    <main className="container mx-auto p-4">
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Tasks</h2>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tasks for {date ? format(date, "PPP") : "Today"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {
                          setTasks(tasks.map((t) =>
                            t.id === task.id ? { ...t, completed: !t.completed } : t
                          ));
                        }}
                        className="h-5 w-5 rounded border-gray-300"
                        aria-label={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
                      />
                      <span className={task.completed ? "line-through text-gray-500" : ""}>
                        {task.title}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
} 