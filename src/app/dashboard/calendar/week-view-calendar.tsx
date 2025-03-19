"use client";

import { useState } from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
}

interface WeekViewCalendarProps {
  events: Event[];
  onCreateTaskClick: (date: Date, hour: number) => void;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function WeekViewCalendar({ events, onCreateTaskClick }: WeekViewCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => isSameDay(new Date(event.start), date));
  };

  return (
    <div className="border rounded-lg">
      <div className="grid grid-cols-8 border-b">
        <div className="p-2" />
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="p-2 text-center">
            <div className="font-medium">{format(day, "EEE")}</div>
            <div className="text-sm text-muted-foreground">
              {format(day, "MMM d")}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-8">
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
            {HOURS.map((hour) => {
              const dayEvents = getEventsForDay(day).filter(
                (event) =>
                  new Date(event.start).getHours() <= hour &&
                  new Date(event.end).getHours() > hour
              );

              return (
                <div
                  key={`${day.toISOString()}-${hour}`}
                  className="h-12 border-b p-1 cursor-pointer hover:bg-muted/50"
                  onClick={() => onCreateTaskClick(day, hour)}
                >
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-xs p-1 rounded mb-1 truncate"
                      style={{ backgroundColor: event.color }}
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
  );
}
