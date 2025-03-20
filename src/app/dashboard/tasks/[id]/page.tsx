"use client";

import { useTask } from "@/lib/providers/tasks";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Clock, Check, Timer, ChevronLeft, ChevronRight, MessageSquare, Send, Loader2 } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useChat, Message as UIMessage } from 'ai/react';

interface ChatMessage extends UIMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { tasks, updateTask } = useTask();
  const task = tasks.find((t) => t.id === id);
  const [showChatbot, setShowChatbot] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [
      {
        role: 'assistant',
        content: `Hi! I'm your Refine Assistant. I can help you with your ${task?.type || 'task'} by:
- Brainstorming ideas and concepts
- Providing constructive feedback
- Suggesting improvements and refinements
- Answering questions about your work

What aspect of ${task?.title || 'your task'} would you like help with?`,
        id: 'welcome',
      } as ChatMessage
    ]
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!task) {
    return <div>Task not found</div>;
  }

  const taskIndex = tasks.findIndex((t) => t.id === id);
  const prevTask = taskIndex > 0 ? tasks[taskIndex - 1] : null;
  const nextTask = taskIndex < tasks.length - 1 ? tasks[taskIndex + 1] : null;

  const handlePrevTask = () => {
    if (prevTask) {
      router.push(`/dashboard/tasks/${prevTask.id}`);
    }
  };

  const handleNextTask = () => {
    if (nextTask) {
      router.push(`/dashboard/tasks/${nextTask.id}`);
    }
  };

  const handleMarkComplete = () => {
    updateTask(task.id, { completed: !task.completed });
  };

  const handlePhaseComplete = (phaseId: string) => {
    if (!task.phases) return;
    const updatedPhases = task.phases.map(phase => 
      phase.id === phaseId ? { ...phase, completed: !phase.completed } : phase
    );
    updateTask(task.id, { phases: updatedPhases });
  };

  const handleDescriptionChange = (content: string) => {
    updateTask(task.id, { description: content });
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateDailyWorkload = () => {
    if (!task.phases) return null;
    
    const totalMinutes = task.phases.reduce((acc, phase) => 
      acc + (phase.plannedTime.hours * 60 + phase.plannedTime.minutes), 0
    );
    
    const daysUntilDue = differenceInDays(task.dueDate, new Date());
    return daysUntilDue > 0 ? Math.ceil(totalMinutes / daysUntilDue) : totalMinutes;
  };

  const dailyWorkload = calculateDailyWorkload();

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/dashboard/tasks")} className="text-gray-500 hover:text-gray-700">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div>
              <h4 className="text-sm font-medium text-gray-500">{task.courseCode} - {task.courseTitle}</h4>
              <h1 className="text-2xl font-bold">{task.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => setShowChatbot(true)} className="bg-pink-500 hover:bg-pink-600 text-white border-none">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat Assistant
            </Button>
            <Button variant="outline" onClick={handleMarkComplete}>
              <Check className="h-4 w-4 mr-2" />
              Mark {task.completed ? 'Incomplete' : 'Complete'}
            </Button>
            <Button 
              onClick={toggleTimer} 
              className={`text-white border-none ${
                isTimerRunning 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              <Timer className="h-4 w-4 mr-2" />
              {isTimerRunning ? 'Stop' : 'Start'} Timer
            </Button>
          </div>
        </div>

        {/* Timer Display */}
        {isTimerRunning && (
          <Card className="p-4 bg-red-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-red-600" />
                <span className="font-mono text-lg">{formatTime(elapsedTime)}</span>
              </div>
              <div className="text-sm text-red-600">
                Recording time for this task...
              </div>
            </div>
          </Card>
        )}

        {/* Description */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Assignment Description</h2>
          <RichTextEditor
            content={task.description || ''}
            onChange={handleDescriptionChange}
          />
        </Card>

        {/* Daily Workload */}
        {dailyWorkload && (
          <Card className="p-4 bg-purple-50">
            <div className="flex items-center justify-between">
              <div className="text-purple-800">
                <h3 className="font-medium">Recommended Daily Work</h3>
                <p className="text-sm">
                  To complete this task on time, plan to work approximately{' '}
                  <span className="font-semibold">
                    {Math.floor(dailyWorkload / 60)} hours {dailyWorkload % 60} minutes
                  </span>{' '}
                  per day.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Task Roadmap */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Task Roadmap</h2>
          {task.phases?.map((phase, index) => (
            <Card 
              key={phase.id}
              className={`p-6 border-l-4 ${
                phase.completed ? 'border-l-green-500 bg-green-50' : 'border-l-blue-500'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-medium">
                      Phase {index + 1} - {phase.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      Due {format(phase.dueDate, "MMM d")}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{phase.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {phase.plannedTime.hours}h {phase.plannedTime.minutes}m planned
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  variant={phase.completed ? "outline" : "default"}
                  onClick={() => handlePhaseComplete(phase.id)}
                >
                  <Check className="h-4 w-4 mr-2" />
                  {phase.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevTask}
            disabled={!prevTask}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous Task
          </Button>
          <Button
            variant="outline"
            onClick={handleNextTask}
            disabled={!nextTask}
            className="flex items-center gap-2"
          >
            Next Task
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chatbot Dialog */}
      <Dialog open={showChatbot} onOpenChange={setShowChatbot}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Refine Assistant</DialogTitle>
            <DialogDescription>
              I'm here to help you refine your ideas and improve your work. Feel free to ask me anything!
            </DialogDescription>
          </DialogHeader>
          <div className="h-[400px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "assistant" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === "assistant"
                        ? "bg-gray-100"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form 
              onSubmit={handleSubmit}
              className="border-t p-4 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
