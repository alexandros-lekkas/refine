"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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
      courseCode: "MATH-21",
      courseTitle: "Mathematical Foundations for D...",
      title: "Solving LP & Sensitivity with Duality",
      dueDate: new Date(),
      dueTime: "11:59pm",
      startMar: 4,
      status: "due-today",
      completed: false,
      description: "",
      subtasks: [],
      timeUsed: { hours: 0, minutes: 0 },
      plannedTime: { hours: 1, minutes: 0 },
      actualTime: "00:00:00",
      type: "assignment"
    },
    {
      id: "2",
      courseCode: "ENGS-11",
      courseTitle: "Cultural Studies and the Body",
      title: "Cultural Analysis Essay",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      dueTime: "11:59pm",
      startMar: 5,
      status: "due-soon",
      completed: false,
      description: "Write a 2500-word essay analyzing the cultural significance of body representation in modern media.",
      subtasks: [],
      timeUsed: { hours: 0, minutes: 0 },
      plannedTime: { hours: 12, minutes: 0 },
      actualTime: "00:00:00",
      type: "essay",
      isMultiPhase: true,
      phases: [
        {
          id: "p1",
          title: "Research & Planning",
          description: "Research key concepts, gather sources, and create outline",
          plannedTime: { hours: 3, minutes: 0 },
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
          completed: false
        },
        {
          id: "p2",
          title: "First Draft",
          description: "Write first draft focusing on main arguments",
          plannedTime: { hours: 4, minutes: 0 },
          dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
          completed: false
        },
        {
          id: "p3",
          title: "Review & Revision",
          description: "Review feedback, revise content and structure",
          plannedTime: { hours: 3, minutes: 0 },
          dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
          completed: false
        },
        {
          id: "p4",
          title: "Final Polish",
          description: "Final proofreading and formatting",
          plannedTime: { hours: 2, minutes: 0 },
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          completed: false
        }
      ]
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
      completed: false,
      description: "",
      subtasks: [],
      timeUsed: { hours: 0, minutes: 0 },
      plannedTime: { hours: 1, minutes: 0 },
      actualTime: "00:00:00",
      type: "assignment"
    },
    {
      id: "4",
      courseCode: "FI118-14",
      courseTitle: "Introduction to Finance",
      title: "Financial Markets Quiz",
      dueDate: new Date(),
      dueTime: "11:59pm",
      startMar: 5,
      status: "due-soon",
      completed: false,
      description: "",
      subtasks: [],
      timeUsed: { hours: 0, minutes: 0 },
      plannedTime: { hours: 1, minutes: 0 },
      actualTime: "00:00:00",
      type: "quiz"
    },
    {
      id: "5",
      courseCode: "HGHR-11",
      courseTitle: "Human Dynamics in Organizations",
      title: "Group Project: Organizational Culture Analysis",
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      dueTime: "10:00pm",
      startMar: 5,
      status: "start-soon",
      completed: false,
      description: "Analyze the organizational culture of a chosen company and present findings.",
      subtasks: [],
      timeUsed: { hours: 0, minutes: 0 },
      plannedTime: { hours: 20, minutes: 0 },
      actualTime: "00:00:00",
      type: "project",
      isMultiPhase: true,
      phases: [
        {
          id: "p1",
          title: "Company Selection & Initial Research",
          description: "Select target company and gather preliminary data",
          plannedTime: { hours: 4, minutes: 0 },
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          completed: false
        },
        {
          id: "p2",
          title: "Data Collection",
          description: "Conduct interviews and surveys",
          plannedTime: { hours: 6, minutes: 0 },
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          completed: false
        },
        {
          id: "p3",
          title: "Analysis & Findings",
          description: "Analyze data and document findings",
          plannedTime: { hours: 6, minutes: 0 },
          dueDate: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000),
          completed: false
        },
        {
          id: "p4",
          title: "Presentation Preparation",
          description: "Create and rehearse presentation",
          plannedTime: { hours: 4, minutes: 0 },
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
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
