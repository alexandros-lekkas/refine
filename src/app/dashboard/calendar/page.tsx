"use client";

import { useState, useEffect } from "react";
import { WeekViewCalendar } from "./week-view-calendar";
import { CreateEventDialog } from "./create-event-dialog";
import { usePathname } from "next/navigation";

interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
  courseCode: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ date: Date; hour: number } | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      if (pathname === '/dashboard/calendar') {
        setIsSidebarCollapsed(event.detail.collapsed);
      }
    };

    window.addEventListener('sidebarStateChange' as any, handleSidebarChange);
    return () => {
      window.removeEventListener('sidebarStateChange' as any, handleSidebarChange);
    };
  }, [pathname]);

  const handleCreateEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
    };
    setEvents(prev => [...prev, newEvent]);
    setSelectedTimeSlot(null);
  };

  const handleEventUpdate = (updatedEvent: Event) => {
    setEvents(prev => prev.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
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

  const calendarWidth = isSidebarCollapsed ? 1350 : 1150;

  return (
    <div className="-m-8 h-[calc(100vh-4rem)] overflow-x-auto">
      <div style={{ 
        minWidth: `${calendarWidth}px`,
        height: '100%',
        transition: 'min-width 300ms'
      }}>
        <WeekViewCalendar 
          events={[...events, ...sampleEvents]} 
          onCreateTaskClick={(date, hour) => setSelectedTimeSlot({ date, hour })}
          width={calendarWidth}
          onEventUpdate={handleEventUpdate}
        />
      </div>
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
