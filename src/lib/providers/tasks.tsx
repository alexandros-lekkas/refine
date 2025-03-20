"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { addDays } from "date-fns";

interface Phase {
  id: string;
  title: string;
  description: string;
  plannedTime: { hours: number; minutes: number };
  dueDate: Date;
  completed: boolean;
}

export interface Task {
  id: string;
  courseCode: string;
  courseTitle: string;
  title: string;
  dueDate: Date;
  dueTime: string;
  startMar: number;
  status: "due-today" | "due-soon" | "start-soon";
  completed: boolean;
  description?: string;
  subtasks?: { id: string; title: string; completed: boolean }[];
  assignments?: { title: string; url: string }[];
  timeUsed?: { hours: number; minutes: number };
  plannedTime?: { hours: number; minutes: number };
  actualTime?: string;
  isMultiPhase?: boolean;
  phases?: Phase[];
  type?: "essay" | "project" | "assignment" | "quiz";
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
      courseCode: "CS-301",
      courseTitle: "Machine Learning",
      title: "Neural Networks Project",
      dueDate: new Date(),
      dueTime: "23:59",
      startMar: 7,
      status: "due-today",
      completed: false,
      description: "Implement a neural network from scratch",
      plannedTime: { hours: 4, minutes: 30 },
      phases: [
        {
          id: "1-1",
          title: "Data Preprocessing",
          description: "Clean and prepare the dataset",
          plannedTime: { hours: 1, minutes: 30 },
          dueDate: new Date(),
          completed: false
        },
        {
          id: "1-2",
          title: "Model Implementation",
          description: "Code the neural network",
          plannedTime: { hours: 2, minutes: 0 },
          dueDate: new Date(),
          completed: false
        }
      ]
    },
    {
      id: "2",
      courseCode: "MATH-401",
      courseTitle: "Advanced Statistics",
      title: "Hypothesis Testing Assignment",
      dueDate: addDays(new Date(), 3),
      dueTime: "23:59",
      startMar: 5,
      status: "due-soon",
      completed: false,
      description: "Complete problems 1-5 from Chapter 7",
      plannedTime: { hours: 2, minutes: 45 },
      phases: [
        {
          id: "2-1",
          title: "Review Material",
          description: "Study chapter content",
          plannedTime: { hours: 1, minutes: 0 },
          dueDate: addDays(new Date(), 3),
          completed: false
        },
        {
          id: "2-2",
          title: "Solve Problems",
          description: "Work on assigned problems",
          plannedTime: { hours: 1, minutes: 45 },
          dueDate: addDays(new Date(), 3),
          completed: false
        }
      ]
    },
    {
      id: "3",
      courseCode: "PHYS-201",
      courseTitle: "Quantum Mechanics",
      title: "Wave Functions Essay",
      dueDate: addDays(new Date(), 7),
      dueTime: "23:59",
      startMar: 3,
      status: "start-soon",
      completed: false,
      description: "Write a 2000-word essay on wave functions",
      plannedTime: { hours: 5, minutes: 0 },
      phases: [
        {
          id: "3-1",
          title: "Research",
          description: "Gather sources and take notes",
          plannedTime: { hours: 2, minutes: 0 },
          dueDate: addDays(new Date(), 7),
          completed: false
        },
        {
          id: "3-2",
          title: "Writing",
          description: "Draft the essay",
          plannedTime: { hours: 2, minutes: 0 },
          dueDate: addDays(new Date(), 7),
          completed: false
        },
        {
          id: "3-3",
          title: "Review",
          description: "Edit and proofread",
          plannedTime: { hours: 1, minutes: 0 },
          dueDate: addDays(new Date(), 7),
          completed: false
        }
      ]
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
