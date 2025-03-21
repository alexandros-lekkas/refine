"use client";

import * as React from "react";
import { Calendar as CalendarIcon, Clock, Flag, MessageSquareMore, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { RichTextEditor } from "./rich-text-editor";
import { CourseSelect } from "./course-select";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export function TaskDialog({ open, onOpenChange }: TaskDialogProps) {
  const [taskType, setTaskType] = React.useState<"Exam" | "Assignment" | "Project">("Exam");
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
      <DialogContent className="sm:max-w-[800px] p-0 gap-0">
        <DialogHeader className="p-6 border-b space-y-4">
          <CourseSelect value={course} onChange={setCourse} />
          <Input 
            placeholder="Task name" 
            className="text-xl font-medium border-none bg-gray-50 px-4 py-3 rounded-lg focus-visible:ring-0"
          />
        </DialogHeader>
        <div className="p-6 space-y-6">
          <div className="flex gap-4">
            <Button
              variant={taskType === "Exam" ? "default" : "outline"}
              onClick={() => setTaskType("Exam")}
              className={cn(
                "rounded-full",
                taskType === "Exam" ? "bg-[#c026d3] hover:bg-[#c026d3]/90 text-white" : ""
              )}
            >
              Exam
            </Button>
            <Button
              variant={taskType === "Assignment" ? "default" : "outline"}
              onClick={() => setTaskType("Assignment")}
              className={cn(
                "rounded-full",
                taskType === "Assignment" ? "bg-[#c026d3] hover:bg-[#c026d3]/90 text-white" : ""
              )}
            >
              Assignment
            </Button>
            <Button
              variant={taskType === "Project" ? "default" : "outline"}
              onClick={() => setTaskType("Project")}
              className={cn(
                "rounded-full",
                taskType === "Project" ? "bg-[#c026d3] hover:bg-[#c026d3]/90 text-white" : ""
              )}
            >
              Project
            </Button>
          </div>

          <div className="flex gap-4">
            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
                  <CalendarIcon className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => {
                    setDate(date);
                    setCalendarOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
                  <Clock className="w-5 h-5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4" align="start">
                <div className="flex gap-2">
                  <Input
                    type="time"
                    className="w-32"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </PopoverContent>
            </Popover>
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
              <Flag className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
              <MessageSquareMore className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <div className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquareMore className="w-5 h-5 text-[#c026d3]" />
                    <span className="font-medium">AI Assistant</span>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-600">
                      Need help breaking down this task? I can help you create a study plan, suggest resources, or answer any questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <RichTextEditor
                value={description}
                onChange={setDescription}
                placeholder="Add a description..."
              />
            </div>

            <div>
              <h3 className="font-medium mb-2">Subtasks</h3>
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
                      "flex-1",
                      subtask.completed && "line-through text-gray-400"
                    )}>
                      {subtask.title}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0"
                      onClick={() => handleRemoveSubtask(subtask.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Input 
                  placeholder="Type in subtask and press enter" 
                  className="border-none bg-gray-50 px-4 py-3 rounded-lg focus-visible:ring-0"
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  onKeyDown={handleAddSubtask}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={() => onOpenChange(false)}
            className="bg-[#c026d3] hover:bg-[#c026d3]/90 text-white"
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
