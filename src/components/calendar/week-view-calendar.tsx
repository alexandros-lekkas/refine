"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format, addDays, startOfWeek, isSameDay, isToday, differenceInMinutes } from "date-fns";

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
}

interface WeekViewCalendarProps {
  events: Event[];
  onEventCreate: (event: Omit<Event, "id">) => void;
  onEventUpdate: (event: Event) => void;
  onCreateTaskClick: (date: Date, hour: number) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES_PER_SLOT = 15;
const SLOTS_PER_HOUR = 60 / MINUTES_PER_SLOT;

const COLOR_CLASSES = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  red: "bg-red-100 text-red-800",
  purple: "bg-purple-100 text-purple-800",
  orange: "bg-orange-100 text-orange-800",
  yellow: "bg-yellow-100 text-yellow-800",
};

export function WeekViewCalendar({
  events,
  onEventCreate,
  onEventUpdate,
  onCreateTaskClick,
}: WeekViewCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [draggedEvent, setDraggedEvent] = useState<Event | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<{
    date: Date;
    hour: number;
    minute: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [resizeStart, setResizeStart] = useState<{
    event: Event;
    edge: "start" | "end";
  } | null>(null);
  const [dragPreview, setDragPreview] = useState<{
    top: number;
    height: number;
    day: Date;
  } | null>(null);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handlePreviousWeek = () => {
    setCurrentDate(addDays(currentDate, -7));
  };

  const handleNextWeek = () => {
    setCurrentDate(addDays(currentDate, 7));
  };

  const handleEventDragStart = (event: Event) => {
    setDraggedEvent(event);
    setIsDragging(true);
    const style = getEventStyle(event);
    setDragPreview({
      top: parseInt(style.top),
      height: parseInt(style.height),
      day: event.start,
    });
  };

  const handleEventDragEnd = (event: Event, newDate: Date, newHour: number, newMinute: number) => {
    const newStart = new Date(newDate);
    newStart.setHours(newHour, newMinute);
    const duration = differenceInMinutes(event.end, event.start);
    const newEnd = new Date(newStart);
    newEnd.setMinutes(newStart.getMinutes() + duration);

    onEventUpdate({
      ...event,
      start: newStart,
      end: newEnd,
    });
    setDraggedEvent(null);
    setDragOverSlot(null);
    setIsDragging(false);
    setDragPreview(null);
  };

  const handleDragOver = (e: React.DragEvent, day: Date, hour: number, minute: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedEvent) return;

    const newStart = new Date(day);
    newStart.setHours(hour, minute);
    const duration = differenceInMinutes(draggedEvent.end, draggedEvent.start);
    const newEnd = new Date(newStart);
    newEnd.setMinutes(newStart.getMinutes() + duration);

    const startMinutes = hour * 60 + minute;
    const top = (startMinutes / 60) * 48 + 40;
    const height = (duration / 60) * 48;

    setDragPreview({ top, height, day });
    setDragOverSlot({ date: day, hour, minute });
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverSlot(null);
  };

  const handleDrop = (e: React.DragEvent, day: Date, hour: number, minute: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedEvent) {
      handleEventDragEnd(draggedEvent, day, hour, minute);
    }
    if (resizeStart) {
      handleResizeEnd(resizeStart.event, day, hour, minute);
    }
  };

  const handleTimeSlotClick = (date: Date, hour: number, minute: number) => {
    if (!isDragging && !resizeStart) {
      onCreateTaskClick(date, hour);
    }
  };

  const handleAddTaskClick = () => {
    const now = new Date();
    onCreateTaskClick(now, now.getHours());
  };

  const handleResizeStart = (event: Event, edge: "start" | "end") => {
    setResizeStart({ event, edge });
    setIsDragging(true);
  };

  const handleResizeEnd = (event: Event, newDate: Date, newHour: number, newMinute: number) => {
    if (!resizeStart) return;

    const newStart = new Date(event.start);
    const newEnd = new Date(event.end);

    if (resizeStart.edge === "start") {
      newStart.setHours(newHour, newMinute);
    } else {
      newEnd.setHours(newHour, newMinute);
    }

    onEventUpdate({
      ...event,
      start: newStart,
      end: newEnd,
    });

    setResizeStart(null);
    setIsDragging(false);
  };

  const getEventStyle = (event: Event) => {
    const startMinutes = event.start.getHours() * 60 + event.start.getMinutes();
    const duration = differenceInMinutes(event.end, event.start);
    const top = (startMinutes / 60) * 48 + 40;
    const height = (duration / 60) * 48;

    return {
      top: `${top}px`,
      height: `${height}px`,
    };
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full transition-colors hover:bg-accent" 
            onClick={handlePreviousWeek}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground min-w-32 text-center">
            {format(weekStart, "MMMM d, yyyy")}
          </span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full transition-colors hover:bg-accent" 
            onClick={handleNextWeek}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button 
          size="sm" 
          className="rounded-full transition-colors hover:bg-primary/90" 
          onClick={handleAddTaskClick}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
        <div className="grid h-full" style={{ gridTemplateColumns: "60px repeat(7, minmax(140px, 1fr))" }}>
          {/* Empty corner cell */}
          <div className="h-12 border-b" />

          {/* Day headers */}
          {weekDays.map((day) => (
            <div
              key={`header-${day.toISOString()}`}
              className={cn(
                "h-12 border-b border-r p-1 text-center transition-colors",
                isToday(day) && "bg-accent"
              )}
            >
              <div className="text-sm font-medium mb-0.5">{format(day, "EEE")}</div>
              <div className="text-sm">{format(day, "MMM d")}</div>
            </div>
          ))}

          {/* Time column */}
          <div className="border-r">
            {HOURS.map((hour) => (
              <div key={hour} className="relative h-12">
                <div className="absolute top-0 left-0 p-2 text-sm text-muted-foreground">
                  {format(new Date().setHours(hour), "h a")}
                </div>
                <div className="absolute bottom-0 left-0 right-0 border-b border-gray-200 dark:border-gray-800 transition-colors" />
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDays.map((day) => (
            <div key={day.toISOString()} className="border-r relative">
              <div className="relative">
                {HOURS.map((hour) => (
                  <div key={hour} className="relative h-12">
                    <div className="absolute bottom-0 left-0 right-0 border-b border-gray-200 dark:border-gray-800 transition-colors" />
                    {Array.from({ length: SLOTS_PER_HOUR }).map((_, slotIndex) => {
                      const minute = slotIndex * MINUTES_PER_SLOT;
                      const isDragOver =
                        dragOverSlot?.date.getTime() === day.getTime() &&
                        dragOverSlot.hour === hour &&
                        dragOverSlot.minute === minute;

                      return (
                        <div
                          key={`${day.toISOString()}-${hour}-${minute}`}
                          className={cn(
                            "absolute left-0 right-0 h-3 cursor-pointer transition-all duration-200",
                            isDragOver && "bg-accent/50",
                            !isDragOver && "hover:bg-accent/30"
                          )}
                          style={{ top: `${slotIndex * 12}px` }}
                          onClick={() => handleTimeSlotClick(day, hour, minute)}
                          onDragOver={(e) => handleDragOver(e, day, hour, minute)}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, day, hour, minute)}
                        />
                      );
                    })}
                  </div>
                ))}
                {events
                  .filter((event) => isSameDay(event.start, day))
                  .map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "absolute left-1 right-1 rounded-lg p-1 text-xs cursor-move select-none shadow-sm transition-all duration-200",
                        COLOR_CLASSES[event.color as keyof typeof COLOR_CLASSES] || "bg-primary/10",
                        isDragging ? "shadow-md scale-[1.02]" : "hover:shadow-md hover:scale-[1.01]"
                      )}
                      style={getEventStyle(event)}
                      draggable
                      onDragStart={() => handleEventDragStart(event)}
                      onDragEnd={() => setIsDragging(false)}
                    >
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize rounded-l-lg transition-opacity opacity-0 hover:opacity-100 bg-accent/50"
                        onMouseDown={() => handleResizeStart(event, "start")}
                      />
                      <div
                        className="absolute right-0 top-0 bottom-0 w-1 cursor-ew-resize rounded-r-lg transition-opacity opacity-0 hover:opacity-100 bg-accent/50"
                        onMouseDown={() => handleResizeStart(event, "end")}
                      />
                      <div
                        className="absolute left-0 top-0 w-full h-1 cursor-ns-resize rounded-t-lg transition-opacity opacity-0 hover:opacity-100 bg-accent/50"
                        onMouseDown={() => handleResizeStart(event, "start")}
                      />
                      <div
                        className="absolute left-0 bottom-0 w-full h-1 cursor-ns-resize rounded-b-lg transition-opacity opacity-0 hover:opacity-100 bg-accent/50"
                        onMouseDown={() => handleResizeStart(event, "end")}
                      />
                      {event.title}
                    </div>
                  ))}
                {dragPreview && draggedEvent && isSameDay(dragPreview.day, day) && (
                  <div
                    className={cn(
                      "absolute left-1 right-1 rounded-lg p-1 text-xs select-none shadow-md opacity-50 pointer-events-none transition-all duration-200",
                      COLOR_CLASSES[draggedEvent.color as keyof typeof COLOR_CLASSES] || "bg-primary/10"
                    )}
                    style={{
                      top: `${dragPreview.top}px`,
                      height: `${dragPreview.height}px`,
                    }}
                  >
                    {draggedEvent.title}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 