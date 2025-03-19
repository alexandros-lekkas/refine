"use client";

import { useState } from "react";
import { WeekViewCalendar } from "./week-view-calendar";
import { CreateEventDialog } from "./create-event-dialog";

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{
    date: Date;
    hour: number;
  } | null>(null);

  const handleCreateEvent = (event: {
    title: string;
    start: Date;
    end: Date;
    color: string;
  }) => {
    const newEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
    };
    setEvents([...events, newEvent]);
    setSelectedTimeSlot(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Calendar</h2>
      </div>
      <WeekViewCalendar 
        events={events} 
        onCreateTaskClick={(date, hour) => setSelectedTimeSlot({ date, hour })}
      />
      {selectedTimeSlot && (
        <CreateEventDialog
          isOpen={!!selectedTimeSlot}
          onClose={() => setSelectedTimeSlot(null)}
          onSubmit={handleCreateEvent}
          date={selectedTimeSlot.date}
          hour={selectedTimeSlot.hour}
        />
      )}
    </div>
  );
}
