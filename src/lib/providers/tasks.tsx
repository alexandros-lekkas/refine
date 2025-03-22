"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { createClient } from "@/lib/supabase/client/client";
import { Database } from "@/types/supabase";
import { addDays, isToday, isTomorrow, isThisWeek } from "date-fns";

type Task = Database["public"]["Tables"]["tasks"]["Row"] & {
  assignments?: Database["public"]["Tables"]["assignments"]["Row"][];
  phases?: Database["public"]["Tables"]["phases"]["Row"][];
  subtasks?: Database["public"]["Tables"]["subtasks"]["Row"][];
};

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (task: Omit<Task, "id" | "created_at" | "updated_at">) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  getTask: (id: string) => Task | undefined;
  refreshTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch tasks with related data
      const { data: tasksData, error: tasksError } = await supabase
        .from("tasks")
        .select(`
          *,
          assignments (*),
          phases (*),
          subtasks (*)
        `)
        .order("due_date", { ascending: true });

      if (tasksError) throw tasksError;

      setTasks(tasksData || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task: Omit<Task, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert([task])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setTasks(prev => [...prev, data]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add task");
      throw err;
    }
  };

  const updateTask = async (id: string, updatedTask: Partial<Task>) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .update(updatedTask)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setTasks(prev => prev.map(task => 
          task.id === id ? { ...task, ...data } : task
        ));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update task");
      throw err;
    }
  };

  const getTask = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  return (
    <TaskContext.Provider 
      value={{ 
        tasks, 
        loading, 
        error, 
        addTask, 
        updateTask, 
        getTask,
        refreshTasks: fetchTasks 
      }}
    >
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
