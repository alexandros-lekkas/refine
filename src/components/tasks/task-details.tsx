import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { ChevronRight, Clock, CheckCircle2 } from "lucide-react";

interface TaskDetailsProps {
  task: {
    id: string;
    title: string;
    description: string;
    courseCode: string;
    courseTitle: string;
    completed: boolean;
    dueDate?: string;
    plannedTime?: string;
    actualTime?: string;
    type: "Exam" | "Assignment" | "Project";
    subtasks?: Array<{
      id: string;
      title: string;
      completed: boolean;
    }>;
  };
  onClose: () => void;
  onComplete: (taskId: string) => void;
}

export function TaskDetails({ task, onClose, onComplete }: TaskDetailsProps) {
  const [activePhase, setActivePhase] = React.useState<number>(0);
  const [elapsedTime, setElapsedTime] = React.useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = React.useState<boolean>(false);
  const [phaseProgress, setPhaseProgress] = React.useState<number[]>([]);
  const timerRef = React.useRef<NodeJS.Timeout>();

  const phases = React.useMemo(() => {
    switch (task.type) {
      case "Assignment":
        return [
          {
            title: "Understanding",
            description: "Review assignment requirements and understand objectives",
            tips: ["Read instructions carefully", "Note key requirements", "List any questions"],
            duration: "1-2 hours"
          },
          {
            title: "Research",
            description: "Gather necessary information and resources",
            tips: ["Find relevant materials", "Take organized notes", "Identify key concepts"],
            duration: "2-3 hours"
          },
          {
            title: "Initial Draft",
            description: "Create first version focusing on main concepts",
            tips: ["Follow outline", "Focus on content", "Keep track of sources"],
            duration: "2-3 hours"
          },
          {
            title: "Review & Revision",
            description: "Check for errors and improve quality",
            tips: ["Check against rubric", "Get peer feedback", "Improve clarity"],
            duration: "1-2 hours"
          },
          {
            title: "Final Check",
            description: "Polish and ensure all requirements are met",
            tips: ["Verify formatting", "Check citations", "Proofread thoroughly"],
            duration: "1 hour"
          }
        ];
      case "Project":
        return [
          {
            title: "Planning",
            description: "Define project scope and requirements",
            tips: ["Create timeline", "Set milestones", "Identify resources needed"],
            duration: "2-3 hours"
          },
          {
            title: "Research",
            description: "Collect necessary information and resources",
            tips: ["Study documentation", "Review similar projects", "Take detailed notes"],
            duration: "3-4 hours"
          },
          {
            title: "Development",
            description: "Build core components and features",
            tips: ["Follow best practices", "Document as you go", "Regular testing"],
            duration: "8-10 hours"
          },
          {
            title: "Testing",
            description: "Verify functionality and fix issues",
            tips: ["Create test cases", "Debug thoroughly", "Get user feedback"],
            duration: "2-3 hours"
          },
          {
            title: "Finalization",
            description: "Polish and prepare for submission",
            tips: ["Final testing", "Complete documentation", "Prepare presentation"],
            duration: "1-2 hours"
          }
        ];
      case "Exam":
        return [
          {
            title: "Topic Review",
            description: "Review key concepts and materials",
            tips: ["Create study guide", "Review past exams", "Identify weak areas"],
            duration: "2-3 hours"
          },
          {
            title: "Practice",
            description: "Work through sample problems and exercises",
            tips: ["Time yourself", "Simulate exam conditions", "Review mistakes"],
            duration: "2-3 hours"
          },
          {
            title: "Final Review",
            description: "Quick review of challenging topics",
            tips: ["Focus on weak areas", "Use active recall", "Stay calm and confident"],
            duration: "1-2 hours"
          }
        ];
      default:
        return [];
    }
  }, [task.type]);

  React.useEffect(() => {
    setPhaseProgress(new Array(phases.length).fill(0));
  }, [phases.length]);

  const progress = React.useMemo(() => {
    if (!task.subtasks?.length) return 0;
    const completed = task.subtasks.filter(st => st.completed).length;
    return Math.round((completed / task.subtasks.length) * 100);
  }, [task.subtasks]);

  React.useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
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

  const handlePhaseProgress = (index: number, value: number) => {
    setPhaseProgress(prev => {
      const newProgress = [...prev];
      newProgress[index] = Math.min(100, Math.max(0, value));
      return newProgress;
    });
  };

  return (
    <Card className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
            <p className="text-sm text-gray-500">{task.courseCode} - {task.courseTitle}</p>
          </div>
          <Button
            variant={task.completed ? "outline" : "default"}
            className={cn(
              "transition-colors",
              task.completed && "bg-green-50 text-green-600 hover:bg-green-100"
            )}
            onClick={() => onComplete(task.id)}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            {task.completed ? "Completed" : "Mark Complete"}
          </Button>
        </div>

        {/* Task Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-medium">Description</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Progress</h3>
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-gray-500 mt-1">{progress}% Complete</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">{formatTime(elapsedTime)}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsTimerRunning(!isTimerRunning)}
              >
                {isTimerRunning ? "Pause" : "Start"} Timer
              </Button>
            </div>
          </div>
        </div>

        {/* Phases */}
        <div className="space-y-4">
          <h3 className="font-medium">Study Plan</h3>
          <div className="space-y-2">
            {phases.map((phase, index) => (
              <div
                key={phase.title}
                className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setActivePhase(activePhase === index ? -1 : index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{phase.title}</h4>
                        <Progress 
                          value={phaseProgress[index]} 
                          className="w-24 h-1.5" 
                        />
                        <span className="text-xs text-gray-500">{phaseProgress[index]}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-gray-500">{phase.duration}</div>
                        <ChevronRight className={cn(
                          "w-4 h-4 transition-transform",
                          activePhase === index && "rotate-90"
                        )} />
                      </div>
                    </div>
                  </div>
                </div>
                {activePhase === index && (
                  <div className="mt-4 space-y-4">
                    <p className="text-sm text-gray-600">{phase.description}</p>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Tips:</h5>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {phase.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={phaseProgress[index]}
                        onChange={(e) => handlePhaseProgress(index, parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePhaseProgress(index, 100);
                        }}
                      >
                        Complete Phase
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Subtasks */}
        {task.subtasks && task.subtasks.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium">Subtasks</h3>
            <div className="space-y-2">
              {task.subtasks.map(subtask => (
                <div
                  key={subtask.id}
                  className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg"
                >
                  <input
                    type="checkbox"
                    checked={subtask.completed}
                    onChange={() => {}}
                    className="rounded border-gray-300"
                  />
                  <span className={cn(
                    "text-sm",
                    subtask.completed && "line-through text-gray-500"
                  )}>
                    {subtask.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
