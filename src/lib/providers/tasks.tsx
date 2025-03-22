"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { addDays } from "date-fns";

export interface Task {
  id: string;
  courseCode: string;
  title: string;
  dueDate: Date;
  status: "due-today" | "due-soon" | "start-soon";
  completed: boolean;
  progress?: {
    completed: number;
    total: number;
  };
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
      courseCode: "CS 101",
      title: "Algorithm Analysis Assignment",
      dueDate: new Date(),
      status: "due-today",
      completed: false,
      progress: {
        completed: 4,
        total: 5
      }
    },
    {
      id: "2",
      courseCode: "MATH 201",
      title: "Linear Algebra Quiz",
      dueDate: new Date(),
      status: "due-today",
      completed: false,
      progress: {
        completed: 3,
        total: 5
      }
    },
    {
      id: "3",
      courseCode: "PHYS 202",
      title: "Lab Report: Wave Motion",
      dueDate: addDays(new Date(), 1),
      status: "due-soon",
      completed: false,
      progress: {
        completed: 2,
        total: 6
      }
    },
    {
      id: "4",
      courseCode: "ENG 301",
      title: "Research Paper Draft",
      dueDate: addDays(new Date(), 2),
      status: "due-soon",
      completed: false,
      progress: {
        completed: 1,
        total: 4
      }
    },
    {
      id: "5",
      courseCode: "BIO 301",
      title: "Genetics Project",
      dueDate: addDays(new Date(), 7),
      status: "start-soon",
      completed: false,
      progress: {
        completed: 0,
        total: 5
      }
    },
    {
      id: "6",
      courseCode: "CHEM 202",
      title: "Lab Experiment Report",
      dueDate: addDays(new Date(), 10),
      status: "start-soon",
      completed: false,
      progress: {
        completed: 0,
        total: 4
      }
    }
  ]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    ));
  };

  const getTask = (id: string) => {
    return tasks.find(task => task.id === id);
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
