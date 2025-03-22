"use client";

import { useState } from "react";
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
  width: number;
}

const HOURS = [
  "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM",
  "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM",
  "8 PM", "9 PM", "10 PM", "11 PM", "12 AM", "1 AM", "2 AM", "3 AM"
];

const HOUR_TO_INDEX = Object.fromEntries(
  HOURS.map((hour, index) => [hour, index])
);

export function WeekViewCalendar({ events, onCreateTaskClick, width }: WeekViewCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredSlot, setHoveredSlot] = useState<{ date: Date; hour: string } | null>(null);
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 }); // Start from Sunday
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)); // Sun-Sat

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => isSameDay(new Date(event.start), date));
  };

  const getEventHeight = (event: Event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return `${hours * 48}px`; // Each hour is 48px tall
  };

  const getEventTop = (event: Event) => {
    const start = new Date(event.start);
    const hour = start.getHours();
    const minutes = start.getMinutes();
    const hourString = format(start, 'h a').toUpperCase();
    const hourIndex = HOUR_TO_INDEX[hourString];
    return `${(hourIndex * 48) + (minutes / 60) * 48}px`;
  };

  return (
    <div className="h-full bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300" style={{ width: `${width}px` }}>
      {/* Header */}
      <div className="grid grid-cols-[80px_1fr] border-b">
        <div className="p-2 flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 rounded-md transition-colors",
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
              "h-8 w-8 rounded-md transition-colors",
              "text-[#c026d3] hover:text-[#c026d3]",
              "border border-[#f5d0fe] hover:border-[#c026d3]",
              "bg-[#fdf4ff] hover:bg-[#fdf4ff]"
            )}
            onClick={() => setCurrentDate(prev => addWeeks(prev, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-7">
          {weekDays.map((day) => {
            const dayEvents = getEventsForDay(day);
            const isToday = isSameDay(day, new Date());
            return (
              <div 
                key={day.toISOString()} 
                className={cn(
                  "p-2 text-center border-l",
                  isToday && "bg-[#fdf4ff] border-[#f5d0fe]"
                )}
              >
                <div className={cn(
                  "text-sm font-medium",
                  isToday && "text-[#c026d3]"
                )}>{format(day, "dd")}</div>
                <div className={cn(
                  "text-xs text-gray-500",
                  isToday && "text-[#c026d3]"
                )}>{format(day, "EEE")}</div>
                {dayEvents.length > 0 && (
                  <div className={cn(
                    "mt-1 px-2 py-0.5 text-xs rounded-md text-center transition-colors",
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

      {/* Calendar Grid */}
      <div className="grid grid-cols-[80px_1fr] h-[calc(100vh-8rem)] overflow-y-auto">
        <div className="bg-white">
          {HOURS.map((hour) => (
            <div key={hour} className="h-12 relative">
              <div className={cn(
                "absolute top-0 -translate-y-1/2 right-3 text-xs font-medium tracking-wide transition-colors",
                hoveredSlot?.hour === hour ? "text-[#c026d3]" : "text-gray-500"
              )}>
                {hour}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {weekDays.map((day) => (
            <div key={day.toISOString()} className="relative border-l">
              {HOURS.map((hour, index) => (
                <div
                  key={`${day.toISOString()}-${hour}`}
                  className={cn(
                    "h-12 border-t first:border-t-0 relative group transition-all duration-150 cursor-pointer",
                    hoveredSlot?.date.toISOString() === day.toISOString() && hoveredSlot?.hour === hour
                      ? "bg-[#fdf4ff] border-[#f5d0fe] border-2 -m-[1px] z-10"
                      : "hover:bg-[#fdf4ff]"
                  )}
                  onMouseEnter={() => setHoveredSlot({ date: day, hour })}
                  onMouseLeave={() => setHoveredSlot(null)}
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
                    className={cn(
                      "absolute left-1 right-1 rounded-md px-2 py-1 text-xs overflow-hidden border transition-all duration-150",
                      event.color === "#34D399" && "bg-green-50 text-green-800 border-green-200 hover:bg-green-100 hover:border-green-300",
                      event.color === "#F87171" && "bg-red-50 text-red-800 border-red-200 hover:bg-red-100 hover:border-red-300",
                      event.color === "#60A5FA" && "bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100 hover:border-blue-300"
                    )}
                    style={{
                      top: getEventTop(event),
                      height: getEventHeight(event),
                      opacity: event.title.includes("Time has passed") ? 0.5 : 1
                    }}
                  >
                    <div className="font-medium truncate">{event.courseCode}</div>
                    <div className="truncate">{event.title}</div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
