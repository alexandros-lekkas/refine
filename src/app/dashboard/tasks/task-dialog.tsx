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
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskDialog({ open, onOpenChange }: TaskDialogProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] =
    React.useState<Enums<"task_category">>("ACADEMIC");
  const [priority, setPriority] =
    React.useState<Enums<"task_priority">>("MEDIUM");
  const [type, setType] = React.useState<Enums<"task_type">>("ASSIGNMENT");
  const [dueDate, setDueDate] = React.useState<Date>();
  const [dueTime, setDueTime] = React.useState("12:00");
  const [isMultiPhase, setIsMultiPhase] = React.useState(false);
  const [plannedTimeHours, setPlannedTimeHours] = React.useState(0);
  const [plannedTimeMinutes, setPlannedTimeMinutes] = React.useState(0);

  const handleCreateTask = async () => {
    if (!user) {
      console.error("Failed to create task: No user found");
      return;
    }
    if (!title) {
      console.error("Failed to create task: Title is required");
      return;
    }
    if (!dueDate) {
      console.error("Failed to create task: Due date is required");
      return;
    }

    console.log("Creating task with data:", {
      title,
      description,
      category,
      priority,
      type,
      due_date: format(dueDate, "yyyy-MM-dd"),
      due_time: dueTime,
      is_multi_phase: isMultiPhase,
      planned_time_hours: plannedTimeHours,
      planned_time_minutes: plannedTimeMinutes,
      user_id: user.id,
    });

    const task: Omit<
      Task,
      | "id"
      | "created_at"
      | "updated_at"
      | "actual_time"
      | "time_used_hours"
      | "time_used_minutes"
    > = {
      title,
      description,
      category,
      priority,
      type,
      due_date: format(dueDate, "yyyy-MM-dd"),
      due_time: dueTime,
      completed: false,
      is_multi_phase: isMultiPhase,
      planned_time_hours: plannedTimeHours,
      planned_time_minutes: plannedTimeMinutes,
      status: "START_SOON",
      user_id: user.id,
      start_mark: 0,
    };

    try {
      const supabase = createClient();
      console.log("Attempting to insert task into database...");
      
      const { data, error } = await supabase
        .from("tasks")
        .insert(task)
        .select()
        .single();

      if (error) {
        console.error("Database error while creating task:", {
          error_message: error.message,
          error_code: error.code,
          error_details: error.details,
          task_data: task
        });
        throw error;
      }

      console.log("Task created successfully:", data);

      // Reset form
      setTitle("");
      setDescription("");
      setCategory("ACADEMIC");
      setPriority("MEDIUM");
      setType("ASSIGNMENT");
      setDueDate(undefined);
      setDueTime("12:00");
      setIsMultiPhase(false);
      setPlannedTimeHours(0);
      setPlannedTimeMinutes(0);

      onOpenChange(false);
      router.refresh();
    } catch (error) {
      console.error("Detailed error while creating task:", {
        error,
        task_data: task,
        user_id: user.id
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <Select
                value={category}
                onValueChange={(value: Enums<"task_category">) =>
                  setCategory(value)
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
                value={priority}
                onValueChange={(value: Enums<"task_priority">) =>
                  setPriority(value)
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
                value={type}
                onValueChange={(value: Enums<"task_type">) => setType(value)}
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
              <DatePicker
                date={dueDate}
                onDateChange={setDueDate}
                placeholder="Select due date"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label htmlFor="due-time" className="text-sm font-medium">
              Due Time
            </label>
            <Input
              id="due-time"
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="multi-phase"
              checked={isMultiPhase}
              onCheckedChange={(checked) => setIsMultiPhase(checked as boolean)}
            />
            <label
              htmlFor="multi-phase"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Multi-phase task
            </label>
          </div>

          {isMultiPhase && (
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="planned-hours" className="text-sm font-medium">
                  Planned Hours
                </label>
                <Input
                  id="planned-hours"
                  type="number"
                  min="0"
                  value={plannedTimeHours}
                  onChange={(e) =>
                    setPlannedTimeHours(parseInt(e.target.value))
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
                  value={plannedTimeMinutes}
                  onChange={(e) =>
                    setPlannedTimeMinutes(parseInt(e.target.value))
                  }
                />
              </div>
            </div>
          )}

          <Button onClick={handleCreateTask}>Create Task</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
