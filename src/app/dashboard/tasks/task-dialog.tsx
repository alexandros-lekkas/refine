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

type Task = Tables<"tasks">;
type TaskCategory = Enums<"task_category">;
type TaskPriority = Enums<"task_priority">;
type TaskType = Enums<"task_type">;
type TaskStatus = Enums<"task_status">;

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (
    task: Omit<
      Task,
      | "id"
      | "created_at"
      | "updated_at"
      | "actual_time"
      | "time_used_hours"
      | "time_used_minutes"
      | "start_mark"
    >
  ) => Promise<void>;
}

export function TaskDialog({ open, onOpenChange, onSubmit }: TaskDialogProps) {
  const { user } = useAuth();

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState<TaskCategory>("ACADEMIC");
  const [priority, setPriority] = React.useState<TaskPriority>("MEDIUM");
  const [type, setType] = React.useState<TaskType>("ASSIGNMENT");
  const [dueDate, setDueDate] = React.useState<Date>();
  const [dueTime, setDueTime] = React.useState("12:00");
  const [isMultiPhase, setIsMultiPhase] = React.useState(false);
  const [plannedTimeHours, setPlannedTimeHours] = React.useState(0);
  const [plannedTimeMinutes, setPlannedTimeMinutes] = React.useState(0);
  const [calendarOpen, setCalendarOpen] = React.useState(false);

  const handleCreateTask = async () => {
    if (!user || !title || !dueDate || !onSubmit) return;

    const task: Omit<
      Task,
      | "id"
      | "created_at"
      | "updated_at"
      | "actual_time"
      | "time_used_hours"
      | "time_used_minutes"
      | "start_mark"
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
      status: "START_SOON", // This should be calculated based on due date
      user_id: user.id,
    };

    try {
      await onSubmit(task);
      onOpenChange(false);
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
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[580px] p-0 gap-0 rounded-2xl overflow-hidden max-h-[85vh] flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-3">
            <Select
              value={category}
              onValueChange={(value: TaskCategory) => setCategory(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACADEMIC">Academic</SelectItem>
                <SelectItem value="PERSONAL">Personal</SelectItem>
                <SelectItem value="WORK">Work</SelectItem>
              </SelectContent>
            </Select>

            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task name"
              className="text-sm border-none bg-muted px-3 py-2 rounded-lg focus-visible:ring-1 focus-visible:ring-primary"
            />

            <div className="flex gap-2">
              <Button
                variant={type === "ASSIGNMENT" ? "default" : "outline"}
                onClick={() => setType("ASSIGNMENT")}
                className={cn(
                  "flex-1 text-xs rounded-full py-1.5",
                  type === "ASSIGNMENT"
                    ? "bg-primary text-primary-foreground"
                    : ""
                )}
              >
                Assignment
              </Button>
              <Button
                variant={type === "PROJECT" ? "default" : "outline"}
                onClick={() => setType("PROJECT")}
                className={cn(
                  "flex-1 text-xs rounded-full py-1.5",
                  type === "PROJECT" ? "bg-primary text-primary-foreground" : ""
                )}
              >
                Project
              </Button>
              <Button
                variant={type === "QUIZ" ? "default" : "outline"}
                onClick={() => setType("QUIZ")}
                className={cn(
                  "flex-1 text-xs rounded-full py-1.5",
                  type === "QUIZ" ? "bg-primary text-primary-foreground" : ""
                )}
              >
                Quiz
              </Button>
              <Button
                variant={type === "ESSAY" ? "default" : "outline"}
                onClick={() => setType("ESSAY")}
                className={cn(
                  "flex-1 text-xs rounded-full py-1.5",
                  type === "ESSAY" ? "bg-primary text-primary-foreground" : ""
                )}
              >
                Essay
              </Button>
            </div>

            <div className="flex gap-2">
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs py-1.5"
                  >
                    <CalendarIcon className="w-3.5 h-3.5 mr-1.5" />
                    {dueDate ? format(dueDate, "MMM d, yyyy") : "Due date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-white rounded-lg shadow-md"
                  align="start"
                  sideOffset={4}
                >
                  <div className="flex items-center justify-between px-3 py-2 border-b">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const currentMonth = dueDate || new Date();
                        setDueDate(
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() - 1,
                            1
                          )
                        );
                      }}
                      className="h-7 w-7 p-0 opacity-50"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium flex-1 text-center">
                      {format(dueDate || new Date(), "MMMM yyyy")}
                    </span>
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const currentMonth = dueDate || new Date();
                          setDueDate(
                            new Date(
                              currentMonth.getFullYear(),
                              currentMonth.getMonth() + 1,
                              1
                            )
                          );
                        }}
                        className="h-7 w-7 p-0 opacity-50 mr-2"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          const today = new Date();
                          setDueDate(today);
                          setCalendarOpen(false);
                        }}
                        className="text-sm text-primary font-medium"
                      >
                        Today
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-0 px-3 pt-3 pb-2 text-[13px] font-normal text-gray-500">
                    <div className="text-center">S</div>
                    <div className="text-center">M</div>
                    <div className="text-center">T</div>
                    <div className="text-center">W</div>
                    <div className="text-center">T</div>
                    <div className="text-center">F</div>
                    <div className="text-center">S</div>
                  </div>
                  <div className="grid grid-cols-7 gap-0 px-3 pb-3 text-[13px] font-normal">
                    {Array.from({ length: 42 }, (_, i) => {
                      const currentDate = dueDate || new Date();
                      const firstDay = new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        1
                      );
                      const lastDay = new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth() + 1,
                        0
                      );
                      const startPadding = firstDay.getDay();
                      const day = i - startPadding + 1;
                      const isCurrentMonth =
                        day > 0 && day <= lastDay.getDate();
                      const isSelected =
                        dueDate &&
                        day === dueDate.getDate() &&
                        currentDate.getMonth() === dueDate.getMonth() &&
                        currentDate.getFullYear() === dueDate.getFullYear();
                      const isToday =
                        day === new Date().getDate() &&
                        currentDate.getMonth() === new Date().getMonth() &&
                        currentDate.getFullYear() === new Date().getFullYear();

                      return (
                        <button
                          key={i}
                          onClick={() => {
                            if (isCurrentMonth) {
                              const newDate = new Date(
                                currentDate.getFullYear(),
                                currentDate.getMonth(),
                                day
                              );
                              setDueDate(newDate);
                              setCalendarOpen(false);
                            }
                          }}
                          className={cn(
                            "h-8 w-8 p-0 flex items-center justify-center transition-colors duration-150",
                            isSelected &&
                              "relative before:absolute before:inset-0 before:rounded-full before:bg-primary before:opacity-5 text-black font-normal hover:text-primary",
                            isToday &&
                              !isSelected &&
                              "text-black font-normal hover:text-primary",
                            !isCurrentMonth && "text-gray-300/5",
                            isCurrentMonth &&
                              !isSelected &&
                              !isToday &&
                              "text-black font-light hover:text-primary"
                          )}
                          disabled={!isCurrentMonth}
                        >
                          {isCurrentMonth ? day : ""}
                        </button>
                      );
                    })}
                  </div>
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs py-1.5"
                  >
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                    {dueTime}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-2 bg-white rounded-lg"
                  align="start"
                >
                  <div className="flex items-center gap-2">
                    <Select
                      value={dueTime ? dueTime.split(":")[0] : ""}
                      onValueChange={(value) => {
                        const hour = value.padStart(2, "0");
                        const minute = dueTime ? dueTime.split(":")[1] : "00";
                        setDueTime(`${hour}:${minute}`);
                      }}
                    >
                      <SelectTrigger className="w-16">
                        <SelectValue placeholder="Hour" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => (
                          <SelectItem
                            key={i}
                            value={String(i).padStart(2, "0")}
                          >
                            {String(i).padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={dueTime ? dueTime.split(":")[1] : ""}
                      onValueChange={(value) => {
                        const hour = dueTime ? dueTime.split(":")[0] : "00";
                        setDueTime(`${hour}:${value}`);
                      }}
                    >
                      <SelectTrigger className="w-16">
                        <SelectValue placeholder="Min" />
                      </SelectTrigger>
                      <SelectContent>
                        {["00", "15", "30", "45"].map((minute) => (
                          <SelectItem key={minute} value={minute}>
                            {minute}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </PopoverContent>
              </Popover>
              <Select
                value={priority}
                onValueChange={(value: TaskPriority) => setPriority(value)}
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                id="multi-phase"
                checked={isMultiPhase}
                onCheckedChange={(checked) =>
                  setIsMultiPhase(checked as boolean)
                }
              />
              <label htmlFor="multi-phase" className="text-sm">
                Multi-phase task
              </label>
            </div>

            {isMultiPhase && (
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground">Hours</label>
                  <Input
                    type="number"
                    min="0"
                    value={plannedTimeHours}
                    onChange={(e) =>
                      setPlannedTimeHours(parseInt(e.target.value) || 0)
                    }
                    className="text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground">
                    Minutes
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="59"
                    value={plannedTimeMinutes}
                    onChange={(e) =>
                      setPlannedTimeMinutes(parseInt(e.target.value) || 0)
                    }
                    className="text-sm"
                  />
                </div>
              </div>
            )}

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              className="w-full h-20 text-sm p-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 p-3 border-t bg-muted rounded-b-2xl">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="px-3 py-1.5 text-xs rounded-xl"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleCreateTask}
            className="bg-primary text-primary-foreground px-3 py-1.5 text-xs rounded-xl"
            disabled={!title || !dueDate}
          >
            Create Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
