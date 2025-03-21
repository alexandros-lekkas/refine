"use client";

import * as React from "react";
import { Calendar as CalendarIcon, Clock, Flag, MessageSquare, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

const COURSES = [
  { code: "CS101", name: "Introduction to Computer Science" },
  { code: "MATH201", name: "Linear Algebra" },
  { code: "PHYS202", name: "Quantum Mechanics" },
  { code: "ENG301", name: "Technical Writing" }
];

export function TaskDialog({ open, onOpenChange }: TaskDialogProps) {
  const [taskType, setTaskType] = React.useState<"Exam" | "Assignment" | "Project">("Exam");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [subtasks, setSubtasks] = React.useState<Subtask[]>([]);
  const [newSubtask, setNewSubtask] = React.useState("");
  const [course, setCourse] = React.useState("");
  const [date, setDate] = React.useState<Date>();
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [time, setTime] = React.useState("");

  const handleAddSubtask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSubtask.trim()) {
      setSubtasks([
        ...subtasks,
        { id: Math.random().toString(), title: newSubtask.trim(), completed: false }
      ]);
      setNewSubtask("");
    }
  };

  const handleRemoveSubtask = (id: string) => {
    setSubtasks(subtasks.filter(task => task.id !== id));
  };

  const handleToggleSubtask = (id: string) => {
    setSubtasks(subtasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] p-0 gap-0">
        <div className="p-4 space-y-4">
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full p-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c026d3]"
          >
            <option value="">Select course...</option>
            {COURSES.map(c => (
              <option key={c.code} value={c.code}>
                {c.code} - {c.name}
              </option>
            ))}
          </select>

          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task name"
            className="text-lg border-none bg-gray-50 px-3 py-2 rounded-lg focus-visible:ring-1 focus-visible:ring-[#c026d3]"
          />

          <div className="flex gap-2">
            <Button
              variant={taskType === "Exam" ? "default" : "outline"}
              onClick={() => setTaskType("Exam")}
              className={cn(
                "flex-1 text-sm rounded-full",
                taskType === "Exam" ? "bg-[#c026d3] hover:bg-[#c026d3]/90 text-white" : ""
              )}
            >
              Exam
            </Button>
            <Button
              variant={taskType === "Assignment" ? "default" : "outline"}
              onClick={() => setTaskType("Assignment")}
              className={cn(
                "flex-1 text-sm rounded-full",
                taskType === "Assignment" ? "bg-[#c026d3] hover:bg-[#c026d3]/90 text-white" : ""
              )}
            >
              Assignment
            </Button>
            <Button
              variant={taskType === "Project" ? "default" : "outline"}
              onClick={() => setTaskType("Project")}
              className={cn(
                "flex-1 text-sm rounded-full",
                taskType === "Project" ? "bg-[#c026d3] hover:bg-[#c026d3]/90 text-white" : ""
              )}
            >
              Project
            </Button>
          </div>

          <div className="flex gap-2">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="text-sm">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {date ? format(date, "MMM d, yyyy") : "Due date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date)
                    setCalendarOpen(false)
                  }}
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="text-sm">
                  <Clock className="w-4 h-4 mr-2" />
                  {time || "Time"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2" align="start">
                <Input
                  type="time"
                  className="w-32 text-sm"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </PopoverContent>
            </Popover>
            <Button variant="outline" size="sm" className="text-sm">
              <Flag className="w-4 h-4 mr-2" />
              Priority
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
              <MessageSquare className="w-4 h-4 text-[#c026d3]" />
              <p className="text-sm text-gray-600">
                Need help breaking down this task? I can help you create a study plan or suggest resources.
              </p>
            </div>

            <div className="space-y-2">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description..."
                className="w-full h-20 text-sm p-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c026d3] resize-none"
              />
            </div>

            <div className="space-y-2">
              {subtasks.map(subtask => (
                <div 
                  key={subtask.id} 
                  className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg group"
                >
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => handleToggleSubtask(subtask.id)}
                    className="rounded border-gray-300 text-[#c026d3] focus:ring-[#c026d3]"
                  />
                  <span className={cn(
                    "flex-1 text-sm",
                    subtask.completed && "line-through text-gray-400"
                  )}>
                    {subtask.title}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                    onClick={() => handleRemoveSubtask(subtask.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              <Input 
                placeholder="Add subtask and press enter"
                className="text-sm border-none bg-gray-50 px-3 py-2 rounded-lg focus-visible:ring-1 focus-visible:ring-[#c026d3]"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                onKeyDown={handleAddSubtask}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 p-4 border-t bg-gray-50">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            size="sm"
            onClick={() => onOpenChange(false)}
            className="bg-[#c026d3] hover:bg-[#c026d3]/90 text-white"
            disabled={!title || !course || !date}
          >
            Create Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
