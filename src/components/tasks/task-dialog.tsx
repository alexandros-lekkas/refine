"use client";

import * as React from "react";
import { Calendar as CalendarIcon, Clock, Flag, MessageSquare, X, Sparkles } from "lucide-react";
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
  { code: "ENG301", name: "Technical Writing" }
];

const getStudyPlan = (taskType: string): StudyPhase[] => {
  switch (taskType) {
    case "Assignment":
      return [
        {
          title: "Understanding",
          description: "Break down the assignment requirements and identify key concepts",
          duration: "1-2 hours",
          resources: ["Course materials", "Lecture notes", "Assignment rubric"]
        },
        {
          title: "Research",
          description: "Gather relevant information and study materials",
          duration: "2-3 hours",
          resources: ["Textbook chapters", "Online resources", "Past examples"]
        },
        {
          title: "Initial Draft",
          description: "Create first version focusing on main concepts",
          duration: "2-3 hours",
          resources: ["Writing tools", "Reference materials"]
        },
        {
          title: "Review & Revision",
          description: "Check for errors and improve quality",
          duration: "1-2 hours",
          resources: ["Peer review", "Instructor feedback"]
        },
        {
          title: "Final Check",
          description: "Polish and ensure all requirements are met",
          duration: "1 hour",
          resources: ["Assignment checklist", "Submission guidelines"]
        }
      ];
    case "Project":
      return [
        {
          title: "Planning",
          description: "Define project scope and create timeline",
          duration: "2-3 hours",
          resources: ["Project requirements", "Planning templates"]
        },
        {
          title: "Research",
          description: "Collect necessary information and resources",
          duration: "3-4 hours",
          resources: ["Research papers", "Online tutorials", "Documentation"]
        },
        {
          title: "Development",
          description: "Build core components and features",
          duration: "8-10 hours",
          resources: ["Development tools", "Code libraries"]
        },
        {
          title: "Testing",
          description: "Verify functionality and fix issues",
          duration: "2-3 hours",
          resources: ["Testing frameworks", "Debug tools"]
        },
        {
          title: "Finalization",
          description: "Polish and prepare for submission",
          duration: "1-2 hours",
          resources: ["Project rubric", "Documentation template"]
        }
      ];
    default:
      return [
        {
          title: "Topic Review",
          description: "Review key concepts and materials",
          duration: "2-3 hours",
          resources: ["Course notes", "Textbook", "Practice problems"]
        },
        {
          title: "Practice",
          description: "Work through sample problems and exercises",
          duration: "2-3 hours",
          resources: ["Past exams", "Study guides", "Online quizzes"]
        },
        {
          title: "Final Review",
          description: "Quick review of challenging topics",
          duration: "1-2 hours",
          resources: ["Summary notes", "Flash cards"]
        }
      ];
  }
};

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
  const [showStudyPlan, setShowStudyPlan] = React.useState(false);

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

  const studyPlan = getStudyPlan(taskType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[580px] p-0 gap-0 rounded-2xl overflow-hidden max-h-[85vh] flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-3">
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full p-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#c026d3] bg-white"
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
              className="text-sm border-none bg-gray-50 px-3 py-2 rounded-lg focus-visible:ring-1 focus-visible:ring-[#c026d3]"
            />

            <div className="flex gap-2">
              <Button
                variant={taskType === "Exam" ? "default" : "outline"}
                onClick={() => setTaskType("Exam")}
                className={cn(
                  "flex-1 text-xs rounded-full py-1.5",
                  taskType === "Exam" ? "bg-[#c026d3] hover:bg-[#c026d3]/90 text-white" : ""
                )}
              >
                Exam
              </Button>
              <Button
                variant={taskType === "Assignment" ? "default" : "outline"}
                onClick={() => setTaskType("Assignment")}
                className={cn(
                  "flex-1 text-xs rounded-full py-1.5",
                  taskType === "Assignment" ? "bg-[#c026d3] hover:bg-[#c026d3]/90 text-white" : ""
                )}
              >
                Assignment
              </Button>
              <Button
                variant={taskType === "Project" ? "default" : "outline"}
                onClick={() => setTaskType("Project")}
                className={cn(
                  "flex-1 text-xs rounded-full py-1.5",
                  taskType === "Project" ? "bg-[#c026d3] hover:bg-[#c026d3]/90 text-white" : ""
                )}
              >
                Project
              </Button>
            </div>

            <div className="flex gap-2">
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs py-1.5">
                    <CalendarIcon className="w-3.5 h-3.5 mr-1.5" />
                    {date ? format(date, "MMM d, yyyy") : "Due date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto bg-white rounded-lg shadow-md" align="start">
                  <div className="flex items-center justify-between px-3 py-2 border-b">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">{format(date || new Date(), "MMM yyyy")}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setDate(new Date())
                        setCalendarOpen(false)
                      }}
                      className="text-sm text-[#c026d3] hover:text-[#c026d3]/90 font-medium"
                    >
                      Today
                    </button>
                  </div>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                      setDate(date)
                      setCalendarOpen(false)
                    }}
                    defaultMonth={date || new Date()}
                    initialFocus
                    className="border-0"
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs py-1.5">
                    <Clock className="w-3.5 h-3.5 mr-1.5" />
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
              <Button variant="outline" size="sm" className="text-xs py-1.5">
                <Flag className="w-3.5 h-3.5 mr-1.5" />
                Priority
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-xs font-normal hover:bg-gray-50 py-2"
              onClick={() => setShowStudyPlan(!showStudyPlan)}
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-[#c026d3]" />
              Need help breaking down this task? I can help you create a study plan or suggest resources.
            </Button>

            {showStudyPlan && (
              <div className="bg-gradient-to-br from-white to-purple-50/50 rounded-lg border border-purple-100 overflow-hidden">
                <div className="p-3 border-b border-purple-100/50">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#c026d3]/10">
                      <Sparkles className="w-4 h-4 text-[#c026d3]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-900">AI Study Plan</h3>
                      <p className="text-xs text-gray-500">Personalized steps to help you succeed</p>
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
                            <h4 className="font-medium text-xs text-gray-900">{phase.title}</h4>
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
                                className="group inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white hover:bg-[#c026d3]/5 text-[10px] text-gray-600 hover:text-[#c026d3] border border-gray-200 hover:border-[#c026d3]/20 transition-colors duration-150"
                              >
                                <div className="w-1 h-1 rounded-full bg-[#c026d3]/30 group-hover:bg-[#c026d3]" />
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
                      "flex-1 text-xs",
                      subtask.completed && "line-through text-gray-400"
                    )}>
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
            className="bg-[#c026d3] hover:bg-[#c026d3]/90 text-white px-3 py-1.5 text-xs rounded-xl"
            disabled={!title || !course || !date}
          >
            Create Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
