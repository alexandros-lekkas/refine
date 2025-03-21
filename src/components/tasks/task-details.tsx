import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { ChevronRight, Clock, CheckCircle2, Timer } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Task {
  id: string;
  title: string;
  description: string;
  courseCode: string;
  courseTitle: string;
  completed: boolean;
  dueDate: string;
  plannedTime: string;
  type: "Assignment" | "Project" | "Exam";
  currentPhase: number;
  phaseProgress: number[];
  subtasks: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

interface TaskDetailsProps {
  task: Task;
  onClose: () => void;
  onComplete: (taskId: string) => void;
  onPhaseUpdate: (phaseIndex: number, progress: number) => void;
  onSubtaskToggle: (subtaskId: string) => void;
}

interface Phase {
  title: string;
  description: string;
  tips: string[];
  estimatedTime: string;
}

const phases: Record<Task['type'], Phase[]> = {
  Assignment: [
    {
      title: "Understanding",
      description: "Review assignment requirements and understand the objectives",
      tips: ["Read through the entire assignment", "Note down key requirements", "Identify deliverables"],
      estimatedTime: "1-2 hours"
    },
    {
      title: "Research",
      description: "Gather necessary information and resources",
      tips: ["Find relevant sources", "Take detailed notes", "Organize research materials"],
      estimatedTime: "2-3 hours"
    },
    {
      title: "Initial Draft",
      description: "Create the first version of your work",
      tips: ["Follow assignment structure", "Include all main points", "Add supporting evidence"],
      estimatedTime: "2-3 hours"
    },
    {
      title: "Review & Revision",
      description: "Refine and improve your work",
      tips: ["Check against requirements", "Improve clarity and flow", "Add missing elements"],
      estimatedTime: "1-2 hours"
    },
    {
      title: "Final Check",
      description: "Polish and finalize your work",
      tips: ["Proofread thoroughly", "Format correctly", "Verify citations"],
      estimatedTime: "1 hour"
    }
  ],
  Project: [
    {
      title: "Planning",
      description: "Define project scope and requirements",
      tips: ["Create timeline", "Set milestones", "Identify resources needed"],
      estimatedTime: "2-3 hours"
    },
    {
      title: "Research",
      description: "Collect necessary information and resources",
      tips: ["Study documentation", "Review similar projects", "Take detailed notes"],
      estimatedTime: "3-4 hours"
    },
    {
      title: "Development",
      description: "Build core components and features",
      tips: ["Follow best practices", "Document as you go", "Regular testing"],
      estimatedTime: "8-10 hours"
    },
    {
      title: "Testing",
      description: "Verify functionality and fix issues",
      tips: ["Create test cases", "Debug thoroughly", "Get user feedback"],
      estimatedTime: "2-3 hours"
    },
    {
      title: "Finalization",
      description: "Polish and prepare for submission",
      tips: ["Final testing", "Complete documentation", "Prepare presentation"],
      estimatedTime: "1-2 hours"
    }
  ],
  Exam: [
    {
      title: "Topic Review",
      description: "Review key concepts and materials",
      tips: ["Create study guide", "Review past exams", "Identify weak areas"],
      estimatedTime: "2-3 hours"
    },
    {
      title: "Practice",
      description: "Work through sample problems and exercises",
      tips: ["Time yourself", "Simulate exam conditions", "Review mistakes"],
      estimatedTime: "2-3 hours"
    },
    {
      title: "Final Review",
      description: "Quick review of challenging topics",
      tips: ["Focus on weak areas", "Use active recall", "Stay calm and confident"],
      estimatedTime: "1-2 hours"
    }
  ]
};

export function TaskDetails({
  task,
  onClose,
  onComplete,
  onPhaseUpdate,
  onSubtaskToggle
}: TaskDetailsProps) {
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);
  const [elapsedTime, setElapsedTime] = React.useState(0);
  const timerRef = React.useRef<NodeJS.Timeout>();

  const taskPhases = phases[task.type] || [];
  const overallProgress = task.phaseProgress.reduce((sum, p) => sum + p, 0) / (task.phaseProgress.length || 1);

  React.useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Description */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Assignment Description</h2>
        <p className="text-gray-600">{task.description}</p>
      </Card>

      {/* Progress and Timer */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Overall Progress</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Planned: {task.plannedTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4" />
                <span>Elapsed: {formatTime(elapsedTime)}</span>
              </div>
            </div>
          </div>
          <Button
            variant={isTimerRunning ? "destructive" : "default"}
            size="sm"
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className={isTimerRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
          >
            {isTimerRunning ? "Stop Timer" : "Start Timer"}
          </Button>
        </div>
        <Progress value={overallProgress} className="h-2 mb-8" />

        {/* Phases */}
        <div className="space-y-8">
          {taskPhases.map((phase, index) => (
            <div key={phase.title} className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{phase.title}</h3>
                    <span className="text-sm text-gray-500">({phase.estimatedTime})</span>
                    {task.phaseProgress[index] === 100 && (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{phase.description}</p>
                </div>
                <span className="text-sm font-medium">{task.phaseProgress[index]}%</span>
              </div>
              <div className="space-y-2">
                <Progress 
                  value={task.phaseProgress[index]} 
                  className="h-2.5 cursor-pointer hover:h-3 transition-all"
                  onClick={(e: React.MouseEvent) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const percentage = Math.round((x / rect.width) * 100);
                    onPhaseUpdate(index, Math.min(100, Math.max(0, percentage)));
                  }}
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#c026d3]" />
                    <span className="text-sm text-gray-600">Click progress bar to update</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs hover:text-[#c026d3] hover:border-[#c026d3]"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      onPhaseUpdate(index, 100);
                    }}
                  >
                    Mark Phase Complete
                  </Button>
                </div>
              </div>
              <div className="pl-4 border-l-2 border-gray-200">
                <h4 className="text-sm font-medium mb-2">Tips:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {phase.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Subtasks */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Subtasks</h2>
        <div className="space-y-3">
          {task.subtasks.map((subtask) => (
            <div key={subtask.id} className="flex items-center gap-3">
              <Checkbox
                id={subtask.id}
                checked={subtask.completed}
                onCheckedChange={() => onSubtaskToggle(subtask.id)}
              />
              <label
                htmlFor={subtask.id}
                className={`text-sm ${subtask.completed ? "text-gray-500 line-through" : ""}`}
              >
                {subtask.title}
              </label>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
