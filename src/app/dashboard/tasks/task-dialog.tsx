"use client";

import * as React from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Flag,
  MessageSquare,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePicker } from "@/components/date-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Tables, Enums } from "@/types/supabase";
import { useAuth } from "@/lib/hooks/use-auth";
import { createClient } from "@/lib/supabase/client/client";
import { useRouter } from "next/navigation";

type Task = Tables<"tasks">;

interface TaskDialogProps {
  className?: string;
}

export function TaskDialog({ className }: TaskDialogProps) {
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const [formState, setFormState] = React.useState({
    title: "",
    description: "",
    category: "ACADEMIC" as Enums<"task_category">,
    priority: "MEDIUM" as Enums<"task_priority">,
    type: "ASSIGNMENT" as Enums<"task_type">,
    dueTime: "12:00",
    isMultiPhase: false,
    plannedTimeHours: 0,
    plannedTimeMinutes: 0
  });
  const [dueDate, setDueDate] = React.useState<Date | undefined>(undefined);

  const [isMounted, setIsMounted] = React.useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCreateTask = async () => {
    if (!user) {
      console.error("Failed to create task: No user found");
      return;
    }
    if (!formState.title) {
      console.error("Failed to create task: Title is required");
      return;
    }
    if (!dueDate) {
      console.error("Failed to create task: Due date is required");
      return;
    }

    const task: Omit<
      Task,
      | "id"
      | "created_at"
      | "updated_at"
      | "actual_time"
      | "time_used_hours"
      | "time_used_minutes"
    > = {
      title: formState.title,
      description: formState.description,
      category: formState.category,
      priority: formState.priority,
      type: formState.type,
      due_date: format(dueDate, "yyyy-MM-dd"),
      due_time: formState.dueTime,
      completed: false,
      is_multi_phase: formState.isMultiPhase,
      planned_time_hours: formState.plannedTimeHours,
      planned_time_minutes: formState.plannedTimeMinutes,
      user_id: user.id,
      start_mark: 0,
    };

    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("tasks")
        .insert(task)
        .select()
        .single();

      if (error) {
        console.error("Database error while creating task:", error);
        throw error;
      }

      // Reset form
      setFormState({
        title: "",
        description: "",
        category: "ACADEMIC",
        priority: "MEDIUM",
        type: "ASSIGNMENT",
        dueTime: "12:00",
        isMultiPhase: false,
        plannedTimeHours: 0,
        plannedTimeMinutes: 0
      });
      setDueDate(undefined);
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className={cn(
          "bg-[#c026d3] hover:bg-[#c026d3]/90 text-white rounded-md px-4 py-2 text-base font-medium shadow-md hover:shadow-lg transition-all duration-300",
          className
        )}
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Task
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogTitle>Create New Task</DialogTitle>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={formState.title}
                onChange={(e) => setFormState(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter task title"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Input
                id="description"
                value={formState.description}
                onChange={(e) => setFormState(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter task description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Category
                </label>
                <Select
                  value={formState.category}
                  onValueChange={(value: Enums<"task_category">) =>
                    setFormState(prev => ({ ...prev, category: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACADEMIC">Academic</SelectItem>
                    <SelectItem value="PERSONAL">Personal</SelectItem>
                    <SelectItem value="WORK">Work</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <label htmlFor="priority" className="text-sm font-medium">
                  Priority
                </label>
                <Select
                  value={formState.priority}
                  onValueChange={(value: Enums<"task_priority">) =>
                    setFormState(prev => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="type" className="text-sm font-medium">
                  Type
                </label>
                <Select
                  value={formState.type}
                  onValueChange={(value: Enums<"task_type">) => 
                    setFormState(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ESSAY">Essay</SelectItem>
                    <SelectItem value="PROJECT">Project</SelectItem>
                    <SelectItem value="ASSIGNMENT">Assignment</SelectItem>
                    <SelectItem value="QUIZ">Quiz</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <label htmlFor="due-date" className="text-sm font-medium">
                  Due Date
                </label>
                {isMounted && (
                  <DatePicker
                    date={dueDate}
                    onDateChange={setDueDate}
                    placeholder="Select due date"
                  />
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="due-time" className="text-sm font-medium">
                Due Time
              </label>
              <Input
                id="due-time"
                type="time"
                value={formState.dueTime}
                onChange={(e) => setFormState(prev => ({ ...prev, dueTime: e.target.value }))}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="multi-phase"
                checked={formState.isMultiPhase}
                onCheckedChange={(checked) =>
                  setFormState(prev => ({ ...prev, isMultiPhase: checked as boolean }))
                }
              />
              <label
                htmlFor="multi-phase"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Multi-phase task
              </label>
            </div>

            {formState.isMultiPhase && (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label
                    htmlFor="planned-hours"
                    className="text-sm font-medium"
                  >
                    Planned Hours
                  </label>
                  <Input
                    id="planned-hours"
                    type="number"
                    min="0"
                    value={formState.plannedTimeHours}
                    onChange={(e) =>
                      setFormState(prev => ({ ...prev, plannedTimeHours: parseInt(e.target.value) }))
                    }
                  />
                </div>

                <div className="grid gap-2">
                  <label
                    htmlFor="planned-minutes"
                    className="text-sm font-medium"
                  >
                    Planned Minutes
                  </label>
                  <Input
                    id="planned-minutes"
                    type="number"
                    min="0"
                    max="59"
                    value={formState.plannedTimeMinutes}
                    onChange={(e) =>
                      setFormState(prev => ({ ...prev, plannedTimeMinutes: parseInt(e.target.value) }))
                    }
                  />
                </div>
              </div>
            )}

            <Button onClick={handleCreateTask}>Create Task</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
