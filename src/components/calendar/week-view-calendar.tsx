"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format, addDays, startOfWeek, isSameDay, isToday } from "date-fns";

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

interface WeekViewCalendarProps {
  events: Event[];
  onEventCreate: (event: Omit<Event, "id">) => void;
  onEventUpdate: (event: Event) => void;
  onCreateTaskClick: (date: Date, hour: number) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

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
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

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
  };

  const handleEventDragEnd = (event: Event, newDate: Date, newHour: number) => {
    const newStart = new Date(newDate);
    newStart.setHours(newHour);
    const newEnd = new Date(newStart);
    newEnd.setHours(newStart.getHours() + 1);

    onEventUpdate({
      ...event,
      start: newStart,
      end: newEnd,
    });
    setDraggedEvent(null);
    setDragOverSlot(null);
    setIsDragging(false);
  };

  const handleTimeSlotClick = (date: Date, hour: number) => {
    if (!isDragging) {
      onCreateTaskClick(date, hour);
    }
  };

  const handleAddTaskClick = () => {
    const now = new Date();
    onCreateTaskClick(now, now.getHours());
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {format(weekStart, "MMMM d, yyyy")}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button size="sm" onClick={handleAddTaskClick}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-8 h-full">
          <div className="border-r">
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="h-12 border-b p-2 text-sm text-muted-foreground"
              >
                {format(new Date().setHours(hour), "h a")}
              </div>
            ))}
          </div>

          {weekDays.map((day) => (
            <div key={day.toISOString()} className="border-r">
              <div
                className={cn(
                  "border-b p-2 text-center",
                  isToday(day) && "bg-accent"
                )}
              >
                <div className="text-sm font-medium">{format(day, "EEE")}</div>
                <div className="text-sm">{format(day, "d")}</div>
              </div>
              {HOURS.map((hour) => {
                const eventsInSlot = events.filter(
                  (event) =>
                    isSameDay(event.start, day) && event.start.getHours() === hour
                );

                const isDragOver = dragOverSlot?.date.getTime() === day.getTime() && 
                                 dragOverSlot.hour === hour;

                return (
                  <div
                    key={`${day.toISOString()}-${hour}`}
                    className={cn(
                      "h-12 border-b p-1 cursor-pointer transition-colors",
                      isDragOver && "bg-accent/50",
                      !isDragOver && "hover:bg-accent/30"
                    )}
                    onClick={() => handleTimeSlotClick(day, hour)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOverSlot({ date: day, hour });
                    }}
                    onDragLeave={() => {
                      setDragOverSlot(null);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedEvent) {
                        handleEventDragEnd(draggedEvent, day, hour);
                      }
                    }}
                  >
                    {eventsInSlot.map((event) => (
                      <div
                        key={event.id}
                        className="rounded bg-primary/10 p-1 text-xs cursor-move select-none"
                        draggable
                        onDragStart={() => handleEventDragStart(event)}
                        onDragEnd={() => setIsDragging(false)}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 