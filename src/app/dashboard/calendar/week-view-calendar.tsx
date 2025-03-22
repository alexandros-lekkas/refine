"use client";

import { useState, useRef, useEffect } from "react";
import { format, addDays, addWeeks, startOfWeek, isSameDay, parseISO } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
  courseCode: string;
}

interface WeekViewCalendarProps {
  events: Event[];
  onCreateTaskClick: (date: Date, hour: number) => void;
  onEventUpdate?: (event: Event) => void;
}

const HOURS = [
  "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
  "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM",
  "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM",
  "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM"
];

const HOUR_HEIGHT = 28; // Reduced to match the more compact design
const MINUTES_IN_HOUR = 60;
const HOUR_TO_INDEX = Object.fromEntries(
  HOURS.map((hour, index) => [hour, index])
);

export function WeekViewCalendar({ events, onCreateTaskClick, onEventUpdate }: WeekViewCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredSlot, setHoveredSlot] = useState<{ date: Date; hour: string } | null>(null);
  const [draggedEvent, setDraggedEvent] = useState<Event | null>(null);
  const [resizingEvent, setResizingEvent] = useState<{ event: Event; edge: "top" | "bottom" } | null>(null);
  const [dragTime, setDragTime] = useState<{ start: Date; end: Date } | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => isSameDay(new Date(event.start), date));
  };

  const getEventHeight = (event: Event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const durationInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return `${durationInHours * HOUR_HEIGHT}px`;
  };

  const getEventTop = (event: Event) => {
    const start = new Date(event.start);
    const totalHours = start.getHours() + (start.getMinutes() / MINUTES_IN_HOUR);
    // Convert from 24-hour format to our 6 AM start format
    const adjustedHours = ((totalHours - 6 + 24) % 24);
    return `${adjustedHours * HOUR_HEIGHT}px`;
  };

  const formatEventTime = (start: Date, end: Date) => {
    return `${format(start, 'h:mm')} - ${format(end, 'h:mmaaa')}`;
  };

  const handleDragStart = (event: Event, e: React.DragEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setDraggedEvent(event);
    // Set drag image offset to make it look more natural
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      const dragImage = e.currentTarget as HTMLElement;
      e.dataTransfer.setDragImage(dragImage, 10, 10);
    }
  };

  const handleDragOver = (e: React.DragEvent, date: Date, hour: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedEvent || !gridRef.current) return;
    
    const gridRect = gridRef.current.getBoundingClientRect();
    const relativeY = e.clientY - gridRect.top;
    
    // Calculate time based on exact mouse position
    const totalMinutes = (relativeY / HOUR_HEIGHT) * MINUTES_IN_HOUR;
    const hours = Math.floor(totalMinutes / MINUTES_IN_HOUR);
    const minutes = Math.round((totalMinutes % MINUTES_IN_HOUR) / 5) * 5; // Still snap to 5min for precision
    
    const newStart = new Date(date);
    const startHourNum = (hours + 6) % 24; // Adjust for 6 AM start
    newStart.setHours(startHourNum);
    newStart.setMinutes(minutes);
    
    // Calculate new end time preserving duration
    const duration = new Date(draggedEvent.end).getTime() - new Date(draggedEvent.start).getTime();
    const newEnd = new Date(newStart.getTime() + duration);
    
    setHoveredSlot({ date, hour });
    setDragTime({ start: newStart, end: newEnd });
  };

  const handleDrop = (e: React.DragEvent, date: Date, hour: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (draggedEvent && onEventUpdate && dragTime) {
      // Ensure the event stays within the same day when dropped
      const newEvent = {
        ...draggedEvent,
        start: dragTime.start,
        end: dragTime.end,
      };
      
      onEventUpdate(newEvent);
    }
    
    setDraggedEvent(null);
    setHoveredSlot(null);
    setDragTime(null);
  };

  const handleDragEnd = () => {
    setDraggedEvent(null);
    setHoveredSlot(null);
    setDragTime(null);
  };

  const handleResizeStart = (event: Event, edge: "top" | "bottom") => {
    setResizingEvent({ event, edge });
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!resizingEvent || !gridRef.current || !onEventUpdate) return;

    const gridRect = gridRef.current.getBoundingClientRect();
    const relativeY = e.clientY - gridRect.top;
    
    // Calculate time based on exact mouse position
    const totalMinutes = (relativeY / HOUR_HEIGHT) * MINUTES_IN_HOUR;
    const hours = Math.floor(totalMinutes / MINUTES_IN_HOUR);
    const minutes = Math.round((totalMinutes % MINUTES_IN_HOUR) / 5) * 5;

    const newEvent = { ...resizingEvent.event };
    const date = new Date(resizingEvent.edge === "top" ? newEvent.start : newEvent.end);
    const hourNum = (hours + 6) % 24; // Adjust for 6 AM start
    date.setHours(hourNum);
    date.setMinutes(minutes);

    if (resizingEvent.edge === "top") {
      if (date < new Date(newEvent.end)) {
        newEvent.start = date;
        setDragTime({ start: date, end: newEvent.end });
      }
    } else {
      if (date > new Date(newEvent.start)) {
        newEvent.end = date;
        setDragTime({ start: newEvent.start, end: date });
      }
    }

    onEventUpdate(newEvent);
  };

  const handleResizeEnd = () => {
    setResizingEvent(null);
    setDragTime(null);
  };

  // Add event listeners for resize
  useEffect(() => {
    if (resizingEvent) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleResizeMove);
      window.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [resizingEvent]);

  return (
    <div className="flex h-full flex-col rounded-lg border bg-white shadow-sm">
      {/* Fixed Header */}
      <div className="flex-none border-b bg-white z-50">
        <div className="grid grid-cols-[100px_1fr]">
          <div className="border-r bg-white p-1.5 flex items-center justify-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-7 w-7 rounded-md transition-colors",
                "text-[#c026d3] hover:text-[#c026d3]",
                "border border-[#f5d0fe] hover:border-[#c026d3]",
                "bg-[#fdf4ff] hover:bg-[#fdf4ff]"
              )}
              onClick={() => setCurrentDate(prev => addWeeks(prev, -1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-7 w-7 rounded-md transition-colors",
                "text-[#c026d3] hover:text-[#c026d3]",
                "border border-[#f5d0fe] hover:border-[#c026d3]",
                "bg-[#fdf4ff] hover:bg-[#fdf4ff]"
              )}
              onClick={() => setCurrentDate(prev => addWeeks(prev, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <div className="grid grid-cols-7">
              {weekDays.map((day, dayIndex) => {
                const dayEvents = getEventsForDay(day);
                const isToday = isSameDay(day, new Date());
                return (
                  <div 
                    key={day.toISOString()} 
                    className={cn(
                      "py-1.5 px-2 text-center border-r border-b flex flex-col items-center justify-center",
                      isToday && "bg-[#fdf4ff]",
                      dayIndex === 6 && "border-r-0"
                    )}
                  >
                    <div className={cn(
                      "text-sm font-medium mb-0.5 flex items-center justify-center",
                      isToday && "text-[#c026d3]"
                    )}>{format(day, "dd")}</div>
                    <div className={cn(
                      "text-xs text-gray-500 flex items-center justify-center",
                      isToday && "text-[#c026d3]"
                    )}>{format(day, "EEE")}</div>
                    {dayEvents.length > 0 && (
                      <div className={cn(
                        "mt-0.5 px-1.5 py-0.5 text-xs rounded-md text-center transition-colors w-full",
                        dayEvents.length > 2 
                          ? "bg-[#c026d3] text-white" 
                          : "bg-[#fdf4ff] text-[#c026d3] border border-[#f5d0fe] hover:border-[#c026d3]"
                      )}>
                        {dayEvents.length} {dayEvents.length === 1 ? "task" : "tasks"} due
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200">
        <div className="grid grid-cols-[100px_1fr]">
          <div className="bg-white border-r">
            {HOURS.map((hour) => (
              <div 
                key={hour} 
                className="relative border-b last:border-b-0" 
                style={{ height: `${HOUR_HEIGHT}px` }}
              >
                <div className={cn(
                  "absolute top-[50%] -translate-y-1/2 right-4 text-xs font-medium tracking-wide transition-colors whitespace-nowrap text-gray-600",
                  "flex items-center justify-end h-full",
                  hoveredSlot?.hour === hour ? "text-[#c026d3]" : ""
                )}>
                  {hour}
                </div>
              </div>
            ))}
          </div>
          <div className="relative" ref={gridRef}>
            <div className="grid grid-cols-7 h-full">
              {weekDays.map((day, dayIndex) => (
                <div key={day.toISOString()} className={cn(
                  "relative min-h-full border-r",
                  dayIndex === 6 && "border-r-0"
                )}>
                  {HOURS.map((hour, index) => (
                    <div
                      key={`${day.toISOString()}-${hour}`}
                      className={cn(
                        "relative group transition-all duration-150 border-b",
                        hoveredSlot?.date.toISOString() === day.toISOString() && hoveredSlot?.hour === hour
                          ? "bg-[#fdf4ff] outline outline-2 outline-[#f5d0fe] z-10"
                          : "hover:bg-[#fdf4ff]",
                        index === HOURS.length - 1 && "border-b-0"
                      )}
                      style={{ height: `${HOUR_HEIGHT}px` }}
                      onDragOver={(e) => handleDragOver(e, day, hour)}
                      onDrop={(e) => handleDrop(e, day, hour)}
                      onClick={() => {
                        const [h, ampm] = hour.split(' ');
                        let hourNum = parseInt(h);
                        if (ampm === 'PM' && hourNum !== 12) hourNum += 12;
                        if (ampm === 'AM' && hourNum === 12) hourNum = 0;
                        onCreateTaskClick(day, hourNum);
                      }}
                    />
                  ))}
                  {events
                    .filter(event => isSameDay(new Date(event.start), day))
                    .map((event) => (
                      <div
                        key={event.id}
                        draggable
                        onDragStart={(e) => handleDragStart(event, e)}
                        onDragEnd={handleDragEnd}
                        className={cn(
                          "absolute left-1 right-1 rounded-md px-1 py-0.5 text-xs overflow-hidden border shadow-sm transition-all duration-150 group z-20",
                          draggedEvent?.id === event.id ? "opacity-50 cursor-grabbing" : "cursor-grab",
                          event.color === "#34D399" && "bg-green-50 text-green-800 border-green-200 hover:bg-green-100 hover:border-green-300",
                          event.color === "#F87171" && "bg-red-50 text-red-800 border-red-200 hover:bg-red-100 hover:border-red-300",
                          event.color === "#60A5FA" && "bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100 hover:border-blue-300"
                        )}
                        style={{
                          top: getEventTop(event),
                          height: getEventHeight(event),
                          opacity: event.title.includes("Time has passed") ? 0.5 : 1,
                          cursor: resizingEvent?.event.id === event.id ? 'ns-resize' : 'move'
                        }}
                      >
                        {/* Resize handles */}
                        <div
                          className="absolute top-0 left-0 right-0 h-1 cursor-ns-resize opacity-0 group-hover:opacity-100 bg-[#c026d3]/10 rounded-t-md"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleResizeStart(event, "top");
                          }}
                        />
                        <div
                          className="absolute bottom-0 left-0 right-0 h-1 cursor-ns-resize opacity-0 group-hover:opacity-100 bg-[#c026d3]/10 rounded-b-md"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleResizeStart(event, "bottom");
                          }}
                        />
                        <div className="font-medium truncate text-[11px]">
                          {(draggedEvent?.id === event.id || resizingEvent?.event.id === event.id) && dragTime ? (
                            formatEventTime(dragTime.start, dragTime.end)
                          ) : (
                            event.courseCode
                          )}
                        </div>
                        <div className="truncate text-[11px]">{event.title}</div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
