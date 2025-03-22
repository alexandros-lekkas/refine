import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client/client";
import { Tables } from "@/types/supabase";
import { useAuth } from "./use-auth";

type Task = Tables<"tasks">;

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const supabase = createClient();

  useEffect(() => {
    async function fetchTasks() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .eq("user_id", user.id)
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
  }, [user]);

  return { tasks, loading, error };
} 