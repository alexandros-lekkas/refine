"use client";

import { useState } from "react";
import { WeekViewCalendar } from "@/components/calendar/week-view-calendar";
import { CreateEventDialog } from "@/components/calendar/create-event-dialog";

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([
    // Sample events
    {
      id: "1",
      title: "Sample Task 1",
      start: new Date(2024, 2, 20, 10),
      end: new Date(2024, 2, 20, 12),
      color: "blue",
    },
    {
      id: "2",
      title: "Sample Task 2",
      start: new Date(2024, 2, 21, 14),
      end: new Date(2024, 2, 21, 16),
      color: "green",
    },
  ]);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    date: Date;
    hour: number;
  } | null>(null);

  const handleEventCreate = (event: Omit<Event, "id">) => {
    const newEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      ...event,
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
        onEventCreate={handleEventCreate}
        onEventUpdate={handleEventUpdate}
        onCreateTaskClick={handleCreateTaskClick}
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
