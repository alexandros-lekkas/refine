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
  courseCode: string;
}

export default function CalendarPage() {
  const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  const handleCreateEvent = (event: Event) => {
    setEvents(prev => [...prev, event]);
    setIsCreateEventOpen(false);
  };

  // Sample events for demonstration
  const sampleEvents = [
    {
      id: "1",
      title: "Human Dynamic",
      courseCode: "MG116-11",
      start: new Date(2025, 2, 3, 13, 55),
      end: new Date(2025, 2, 3, 16, 0),
      color: "#34D399"
    },
    {
      id: "2",
      title: "Cultural Studies",
      courseCode: "EMS370-1",
      start: new Date(2025, 2, 5, 15, 45),
      end: new Date(2025, 2, 5, 17, 30),
      color: "#60A5FA"
    },
    {
      id: "3",
      title: "Quiz 2",
      courseCode: "9:50 - 10am",
      start: new Date(2025, 2, 5, 9, 50),
      end: new Date(2025, 2, 5, 10, 0),
      color: "#F87171"
    },
    {
      id: "4",
      title: "Midterm",
      courseCode: "11:25am - 12:25pm",
      start: new Date(2025, 2, 7, 11, 25),
      end: new Date(2025, 2, 7, 12, 25),
      color: "#F87171"
    },
    {
      id: "5",
      title: "Time has passed",
      courseCode: "",
      start: new Date(2025, 2, 3, 10, 0),
      end: new Date(2025, 2, 3, 11, 0),
      color: "#60A5FA"
    },
    {
      id: "6",
      title: "Time has passed",
      courseCode: "",
      start: new Date(2025, 2, 4, 14, 0),
      end: new Date(2025, 2, 4, 15, 0),
      color: "#60A5FA"
    },
    {
      id: "7",
      title: "Time has passed",
      courseCode: "",
      start: new Date(2025, 2, 5, 11, 25),
      end: new Date(2025, 2, 5, 12, 25),
      color: "#60A5FA"
    }
  ];

  return (
    <div className="h-screen overflow-hidden bg-background">
      <div className="mx-auto h-full max-w-[1600px] px-6">
        <WeekViewCalendar
          events={[...events, ...sampleEvents]}
          onCreateTaskClick={(date, hour) => {
            setSelectedDate(date);
            setSelectedHour(hour);
            setIsCreateEventOpen(true);
          }}
          onEventUpdate={(updatedEvent) => {
            setEvents(prev => prev.map(event => 
              event.id === updatedEvent.id ? updatedEvent : event
            ));
          }}
        />
        <CreateEventDialog
          isOpen={isCreateEventOpen}
          onClose={() => setIsCreateEventOpen(false)}
          onCreateEvent={handleCreateEvent}
          defaultDate={selectedDate ?? undefined}
          defaultHour={selectedHour ?? undefined}
        />
      </div>
    </div>
  );
}
