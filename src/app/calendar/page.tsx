"use client";

import { useState } from "react";
import { WeekViewCalendar } from "./week-view-calendar";
import { CreateEventDialog } from "@/app/calendar/create-event-dialog";

interface Event {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  day: Date;
  color?: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([
    // Sample events
    {
      id: "1",
      title: "Sample Task 1",
      startTime: new Date(2024, 2, 20, 10),
      endTime: new Date(2024, 2, 20, 12),
      day: new Date(2024, 2, 20),
      color: "blue",
    },
    {
      id: "2",
      title: "Sample Task 2",
      startTime: new Date(2024, 2, 21, 14),
      endTime: new Date(2024, 2, 21, 16),
      day: new Date(2024, 2, 21),
      color: "green",
    },
  ]);

  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    date: Date;
    hour: number;
  } | null>(null);

  const handleEventCreate = (event: {
    title: string;
    start: Date;
    end: Date;
    color: string;
  }) => {
    const newEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title: event.title,
      startTime: event.start,
      endTime: event.end,
      day: event.start,
      color: event.color,
    };
    setEvents([...events, newEvent]);
    setSelectedTimeSlot(null);
  };

  const handleEventUpdate = (updatedEvent: Event) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleCreateTaskClick = (date: Date, hour: number) => {
    setSelectedTimeSlot({
      date,
      hour,
    });
  };

  return (
    <div className="h-full">
      <WeekViewCalendar
        events={events}
        currentDate={currentDate}
        onEventUpdate={handleEventUpdate}
        onCreateTaskClick={handleCreateTaskClick}
        onDateChange={setCurrentDate}
      />

      {selectedTimeSlot && (
        <CreateEventDialog
          isOpen={!!selectedTimeSlot}
          onClose={() => setSelectedTimeSlot(null)}
          onSubmit={handleEventCreate}
          date={selectedTimeSlot.date}
          hour={selectedTimeSlot.hour}
        />
      )}
    </div>
  );
}
