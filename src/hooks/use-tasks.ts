import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client/client";
import { Tables } from "@/types/supabase";

type Task = Tables<"tasks">;

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .order("due_date", { ascending: true });

        if (error) throw error;
        setTasks(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  return { tasks, loading, error };
} 