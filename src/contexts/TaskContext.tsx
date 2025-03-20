"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Task {
  id: string;
  courseCode: string;
  courseTitle: string;
  title: string;
  dueDate: Date;
  dueTime: string;
  startMar: number;
  status: "due-today" | "due-soon" | "start-soon";
  description?: string;
  subtasks?: { id: string; title: string; completed: boolean }[];
  assignments?: { title: string; url: string }[];
  timeUsed?: { hours: number; minutes: number };
  plannedTime?: { hours: number; minutes: number };
  actualTime?: string;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  getTask: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      courseCode: "MATH-21",
      courseTitle: "Mathematical Foundations for D...",
      title: "Solving LP & Sensitivity with Duality",
      dueDate: new Date(),
      dueTime: "11:59pm",
      startMar: 4,
      status: "due-today",
      subtasks: [],
      timeUsed: { hours: 0, minutes: 0 },
      plannedTime: { hours: 1, minutes: 0 },
      actualTime: "00:00:00"
    },
    {
      id: "2",
      courseCode: "ENGS-11",
      courseTitle: "Cultural Studies and the Body",
      title: "Perusal #4",
      dueDate: new Date(),
      dueTime: "11:59pm",
      startMar: 5,
      status: "due-soon",
      subtasks: [],
      timeUsed: { hours: 0, minutes: 0 },
      plannedTime: { hours: 1, minutes: 0 },
      actualTime: "00:00:00"
    },
    {
      id: "3",
      courseCode: "ENGS-11",
      courseTitle: "Cultural Studies and the Body",
      title: "Perusal #4",
      dueDate: new Date(),
      dueTime: "11:59pm",
      startMar: 3,
      status: "due-soon",
      subtasks: [],
      timeUsed: { hours: 0, minutes: 0 },
      plannedTime: { hours: 1, minutes: 0 },
      actualTime: "00:00:00"
    },
    {
      id: "4",
      courseCode: "ENGS-11",
      courseTitle: "Cultural Studies and the Body",
      title: "Perusal #4",
      dueDate: new Date(),
      dueTime: "11:59pm",
      startMar: 5,
      status: "due-soon",
      subtasks: [],
      timeUsed: { hours: 0, minutes: 0 },
      plannedTime: { hours: 1, minutes: 0 },
      actualTime: "00:00:00"
    },
    {
      id: "5",
      courseCode: "HGHR-11",
      courseTitle: "Human Dynamics in Organizations",
      title: "Milestone 3: Mid Semester Peer Evaluation",
      dueDate: new Date(),
      dueTime: "10:00pm",
      startMar: 5,
      status: "start-soon",
      subtasks: [],
      timeUsed: { hours: 0, minutes: 0 },
      plannedTime: { hours: 1, minutes: 0 },
      actualTime: "00:00:00"
    }
  ]);

  const addTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (id: string, updatedFields: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  const getTask = (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, getTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}
