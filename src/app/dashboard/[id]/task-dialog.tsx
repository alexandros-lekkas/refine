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

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface StudyPhase {
  title: string;
  description: string;
  duration: string;
  resources: string[];
}

const COURSES = [
  { code: "CS101", name: "Introduction to Computer Science" },
  { code: "MATH201", name: "Linear Algebra" },
  { code: "PHYS202", name: "Quantum Mechanics" },
  { code: "ENG301", name: "Technical Writing" },
];

const getStudyPlan = (taskType: string): StudyPhase[] => {
  switch (taskType) {
    case "Assignment":
      return [
        {
          title: "Understanding",
          description:
            "Break down the assignment requirements and identify key concepts",
          duration: "1-2 hours",
          resources: ["Course materials", "Lecture notes", "Assignment rubric"],
        },
        {
          title: "Research",
          description: "Gather relevant information and study materials",
          duration: "2-3 hours",
          resources: ["Textbook chapters", "Online resources", "Past examples"],
        },
        {
          title: "Initial Draft",
          description: "Create first version focusing on main concepts",
          duration: "2-3 hours",
          resources: ["Writing tools", "Reference materials"],
        },
        {
          title: "Review & Revision",
          description: "Check for errors and improve quality",
          duration: "1-2 hours",
          resources: ["Peer review", "Instructor feedback"],
        },
        {
          title: "Final Check",
          description: "Polish and ensure all requirements are met",
          duration: "1 hour",
          resources: ["Assignment checklist", "Submission guidelines"],
        },
      ];
    case "Project":
      return [
        {
          title: "Planning",
          description: "Define project scope and create timeline",
          duration: "2-3 hours",
          resources: ["Project requirements", "Planning templates"],
        },
        {
          title: "Research",
          description: "Collect necessary information and resources",
          duration: "3-4 hours",
          resources: ["Research papers", "Online tutorials", "Documentation"],
        },
        {
          title: "Development",
          description: "Build core components and features",
          duration: "8-10 hours",
          resources: ["Development tools", "Code libraries"],
        },
        {
          title: "Testing",
          description: "Verify functionality and fix issues",
          duration: "2-3 hours",
          resources: ["Testing frameworks", "Debug tools"],
        },
        {
          title: "Finalization",
          description: "Polish and prepare for submission",
          duration: "1-2 hours",
          resources: ["Project rubric", "Documentation template"],
        },
      ];
    default:
      return [
        {
          title: "Topic Review",
          description: "Review key concepts and materials",
          duration: "2-3 hours",
          resources: ["Course notes", "Textbook", "Practice problems"],
        },
        {
          title: "Practice",
          description: "Work through sample problems and exercises",
          duration: "2-3 hours",
          resources: ["Past exams", "Study guides", "Online quizzes"],
        },
        {
          title: "Final Review",
          description: "Quick review of challenging topics",
          duration: "1-2 hours",
          resources: ["Summary notes", "Flash cards"],
        },
      ];
  }
};

export function TaskDialog({ open, onOpenChange }: TaskDialogProps) {
  const [taskType, setTaskType] = React.useState<
    "Exam" | "Assignment" | "Project"
  >("Exam");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [subtasks, setSubtasks] = React.useState<Subtask[]>([]);
  const [newSubtask, setNewSubtask] = React.useState("");
  const [course, setCourse] = React.useState("");
  const [date, setDate] = React.useState<Date>();
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const [time, setTime] = React.useState("");
  const [showStudyPlan, setShowStudyPlan] = React.useState(false);

  const handleAddSubtask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSubtask.trim()) {
      setSubtasks([
        ...subtasks,
        {
          id: Math.random().toString(),
          title: newSubtask.trim(),
          completed: false,
        },
      ]);
      setNewSubtask("");
    }
  };

  const handleRemoveSubtask = (id: string) => {
    setSubtasks(subtasks.filter((task) => task.id !== id));
  };

  const handleToggleSubtask = (id: string) => {
    setSubtasks(
      subtasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const studyPlan = getStudyPlan(taskType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[580px] p-0 gap-0 rounded-2xl overflow-hidden max-h-[85vh] flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-3">
            <Select value={course} onValueChange={setCourse}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select course..." />
              </SelectTrigger>
              <SelectContent>
                {COURSES.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task name"
              className="text-sm border-none bg-gray-50 px-3 py-2 rounded-lg focus-visible:ring-1 focus-visible:ring-[#c026d3]"
            />

            <div className="flex gap-2">
              <Button
                variant={taskType === "Exam" ? "default" : "outline"}
                onClick={() => setTaskType("Exam")}
                className={cn(
                  "flex-1 text-xs rounded-full py-1.5",
                  taskType === "Exam" ? "bg-[#c026d3] text-white" : ""
                )}
              >
                Exam
              </Button>
              <Button
                variant={taskType === "Assignment" ? "default" : "outline"}
                onClick={() => setTaskType("Assignment")}
                className={cn(
                  "flex-1 text-xs rounded-full py-1.5",
                  taskType === "Assignment" ? "bg-[#c026d3] text-white" : ""
                )}
              >
                Assignment
              </Button>
              <Button
                variant={taskType === "Project" ? "default" : "outline"}
                onClick={() => setTaskType("Project")}
                className={cn(
                  "flex-1 text-xs rounded-full py-1.5",
                  taskType === "Project" ? "bg-[#c026d3] text-white" : ""
                )}
              >
                Project
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
                    {date ? format(date, "MMM d, yyyy") : "Due date"}
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
                        const currentMonth = date || new Date();
                        setDate(
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
                      {format(date || new Date(), "MMMM yyyy")}
                    </span>
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const currentMonth = date || new Date();
                          setDate(
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
                          setDate(today);
                          setCalendarOpen(false);
                        }}
                        className="text-sm text-[#c026d3] font-medium"
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
                      const currentDate = date || new Date();
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
                        date &&
                        day === date.getDate() &&
                        currentDate.getMonth() === date.getMonth() &&
                        currentDate.getFullYear() === date.getFullYear();
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
                              setDate(newDate);
                              setCalendarOpen(false);
                            }
                          }}
                          className={cn(
                            "h-8 w-8 p-0 flex items-center justify-center transition-colors duration-150",
                            isSelected &&
                              "relative before:absolute before:inset-0 before:rounded-full before:bg-[#c026d3] before:opacity-5 text-black font-normal hover:text-[#c026d3]",
                            isToday &&
                              !isSelected &&
                              "text-black font-normal hover:text-[#c026d3]",
                            !isCurrentMonth && "text-gray-300/5",
                            isCurrentMonth &&
                              !isSelected &&
                              !isToday &&
                              "text-black font-light hover:text-[#c026d3]"
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
                    {time || "Time"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-2 bg-white rounded-lg"
                  align="start"
                >
                  <div className="flex items-center gap-2">
                    <Select
                      value={time ? time.split(":")[0] : ""}
                      onValueChange={(value) => {
                        const hour = value.padStart(2, "0");
                        const minute = time ? time.split(":")[1] : "00";
                        setTime(`${hour}:${minute}`);
                      }}
                    >
                      <SelectTrigger className="w-16">
                        <SelectValue placeholder="Hour" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem
                            key={i}
                            value={String(i + 1).padStart(2, "0")}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      value={time ? time.split(":")[1] : ""}
                      onValueChange={(value) => {
                        const hour = time ? time.split(":")[0] : "12";
                        setTime(`${hour}:${value}`);
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
                    <Select
                      value={
                        time && parseInt(time.split(":")[0]) >= 12 ? "PM" : "AM"
                      }
                      onValueChange={(value) => {
                        if (!time) return;
                        const [hour, minute] = time.split(":");
                        const hourNum = parseInt(hour);
                        if (value === "AM") {
                          if (hourNum >= 12) {
                            setTime(
                              `${String(hourNum - 12).padStart(
                                2,
                                "0"
                              )}:${minute}`
                            );
                          }
                        } else {
                          if (hourNum < 12) {
                            setTime(
                              `${String(hourNum + 12).padStart(
                                2,
                                "0"
                              )}:${minute}`
                            );
                          }
                        }
                      }}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="AM/PM" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </PopoverContent>
              </Popover>
              <Button variant="outline" size="sm" className="text-xs py-1.5">
                <Flag className="w-3.5 h-3.5 mr-1.5" />
                Priority
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs font-normal py-2"
              onClick={() => setShowStudyPlan(!showStudyPlan)}
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-[#c026d3]" />
              Need help breaking down this task? I can help you create a study
              plan or suggest resources.
            </Button>

            {showStudyPlan && (
              <div className="bg-gradient-to-br from-white to-purple-50/50 rounded-lg border border-purple-100 overflow-hidden">
                <div className="p-3 border-b border-purple-100/50">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#c026d3]/10">
                      <Sparkles className="w-4 h-4 text-[#c026d3]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-900">
                        AI Study Plan
                      </h3>
                      <p className="text-xs text-gray-500">
                        Personalized steps to help you succeed
                      </p>
                    </div>
                  </div>
                </div>
                <div className="divide-y divide-purple-100/30">
                  {studyPlan.map((phase, index) => (
                    <div key={index} className="p-3">
                      <div className="flex gap-2.5">
                        <div className="flex-none">
                          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#c026d3]/10 text-xs font-medium text-[#c026d3]">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-xs text-gray-900">
                              {phase.title}
                            </h4>
                            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#c026d3]/10">
                              <Clock className="w-3 h-3 text-[#c026d3]" />
                              <span className="text-[10px] font-medium text-[#c026d3] whitespace-nowrap">
                                {phase.duration}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {phase.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {phase.resources.map((resource, i) => (
                              <span
                                key={i}
                                className="group inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white text-[10px] text-gray-600 border border-gray-200"
                              >
                                <div className="w-1 h-1 rounded-full bg-[#c026d3]/30" />
                                {resource}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description..."
                className="w-full h-20 text-sm p-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c026d3] resize-none"
              />

              <div className="space-y-1.5">
                {subtasks.map((subtask) => (
                  <div
                    key={subtask.id}
                    className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg group"
                  >
                    <Checkbox
                      checked={subtask.completed}
                      onCheckedChange={() => handleToggleSubtask(subtask.id)}
                      className="rounded border-gray-300 text-[#c026d3] focus:ring-[#c026d3]"
                    />
                    <span
                      className={cn(
                        "flex-1 text-xs",
                        subtask.completed && "line-through text-gray-400"
                      )}
                    >
                      {subtask.title}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 h-5 w-5 p-0"
                      onClick={() => handleRemoveSubtask(subtask.id)}
                    >
                      <X className="h-2.5 w-2.5" />
                    </Button>
                  </div>
                ))}
                <Input
                  placeholder="Add subtask and press enter"
                  className="text-xs border-none bg-gray-50 px-2.5 py-1.5 rounded-lg focus-visible:ring-1 focus-visible:ring-[#c026d3]"
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  onKeyDown={handleAddSubtask}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 p-3 border-t bg-gray-50 rounded-b-2xl">
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
            onClick={() => onOpenChange(false)}
            className="bg-[#c026d3] text-white px-3 py-1.5 text-xs rounded-xl"
            disabled={!title || !course || !date}
          >
            Create Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
