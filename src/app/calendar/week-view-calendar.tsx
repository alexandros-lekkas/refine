"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  format,
  addDays,
  startOfWeek,
  isSameDay,
  isToday,
  addMinutes,
  differenceInMinutes,
} from "date-fns";
import { ColorSelector, ColorKey } from "@/components/color-selector";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { CalendarEvent } from "./calendar-event";
import {
  WeekViewCalendarProps,
  DragState,
  ResizeState,
  Event,
} from "../../types/calendar";
import { HOURS, MINUTES_PER_SLOT, CELL_HEIGHT } from "@/lib/constants/calendar";
import { cn } from "@/lib/utils";

export function WeekViewCalendar({
  events,
  currentDate,
  onEventUpdate,
  onEventEdit,
  onEventDelete,
  onDateChange,
  onCreateTaskClick,
}: WeekViewCalendarProps) {
  const [dragState, setDragState] = useState<DragState | null>(null);
  const [resizeState, setResizeState] = useState<ResizeState | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragTimeout, setDragTimeout] = useState<NodeJS.Timeout | null>(null);
  const [contextMenuEvent, setContextMenuEvent] = useState<{
    event: Event;
    x: number;
    y: number;
  } | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  const handlePrevWeek = () => {
    onDateChange?.(addDays(currentDate, -7));
  };

  const handleNextWeek = () => {
    onDateChange?.(addDays(currentDate, 7));
  };

  const handleEventDelete = (event: Event) => {
    if (onEventDelete) {
      onEventDelete(event);
    }
  };

  const handleContextMenu = (e: React.MouseEvent, event: Event) => {
    e.preventDefault();
    setContextMenuEvent({ event, x: e.clientX, y: e.clientY });
  };

  const handleEventEdit = (event: Event) => {
    if (onEventEdit) {
      onEventEdit(event);
    }
  };

  const handleColorChange = (color: ColorKey) => {
    if (contextMenuEvent) {
      const updatedEvent = {
        ...contextMenuEvent.event,
        color,
      };
      onEventUpdate(updatedEvent);
      setContextMenuEvent(null);
    }
  };

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getTimeFromY = (y: number): { hour: number; minute: number } => {
    const headerHeight = 64;
    const adjustedY = Math.max(0, y - headerHeight);
    const totalMinutes = (adjustedY / CELL_HEIGHT) * MINUTES_PER_SLOT;
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    return {
      hour: Math.max(0, Math.min(23, hour)),
      minute: Math.floor(minute / MINUTES_PER_SLOT) * MINUTES_PER_SLOT,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragState || !isDragging) return;

    const dayWidth =
      document.querySelector(".day-column")?.getBoundingClientRect().width || 0;
    const timeHeight =
      document.querySelector(".time-slot")?.getBoundingClientRect().height || 0;

    const deltaX = Math.round((e.clientX - dragState.initialX) / dayWidth);
    const deltaY = Math.round((e.clientY - dragState.initialY) / timeHeight);

    // Update event position
    const updatedEvent = {
      ...dragState.event,
      startTime: addMinutes(dragState.event.startTime, deltaY * 30),
      endTime: addMinutes(dragState.event.endTime, deltaY * 30),
      day: addDays(dragState.event.day, deltaX),
    };

    setDragState({
      ...dragState,
      offsetX: deltaX,
      offsetY: deltaY,
    });
  };

  const handleMouseUp = (e: MouseEvent) => {
    if (dragState && isDragging) {
      const updatedEvent = {
        ...dragState.event,
        startTime: addMinutes(
          dragState.event.startTime,
          dragState.offsetY * 30
        ),
        endTime: addMinutes(dragState.event.endTime, dragState.offsetY * 30),
        day: addDays(dragState.event.day, dragState.offsetX),
      };
      onEventUpdate(updatedEvent);
      setDragState(null);
      setIsDragging(false);
    }
  };

  const handleEventMouseDown = (e: React.MouseEvent, event: Event) => {
    if (e.button !== 0) return; // Only handle left clicks
    setDragState({
      event,
      initialX: e.clientX,
      initialY: e.clientY,
      offsetX: 0,
      offsetY: 0,
    });
    setIsDragging(true);
  };

  const handleResizeMouseDown = (
    e: React.MouseEvent,
    event: Event,
    edge: "start" | "end"
  ) => {
    if (e.button !== 0) return; // Only handle left clicks
    setResizeState({
      event,
      edge,
      initialY: e.clientY,
      currentY: e.clientY,
    });
  };

  const handleTimeSlotClick = (date: Date, hour: number, minute: number) => {
    onCreateTaskClick(date, hour);
  };

  const handleAddTaskClick = () => {
    onCreateTaskClick(currentDate, new Date().getHours());
  };

  const getEventStyle = (event: Event) => {
    const dayIndex = weekDays.findIndex((day) => isSameDay(day, event.day));
    const startMinutes =
      event.startTime.getHours() * 60 + event.startTime.getMinutes();
    const durationMinutes = differenceInMinutes(event.endTime, event.startTime);
    const headerHeight = 48; // Height of the day header

    return {
      top: `${headerHeight + (startMinutes / 60) * CELL_HEIGHT * 4}px`,
      height: `${(durationMinutes / 60) * CELL_HEIGHT * 4}px`,
      position: "absolute",
      left: 0,
      right: 0,
      zIndex: 10,
    };
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragState]);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-2 border-b">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handlePrevWeek}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="text-lg font-semibold">
                {format(weekStart, "MMMM d, yyyy")}
              </div>
              <Button variant="outline" size="icon" onClick={handleNextWeek}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleAddTaskClick}>
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>

          <div className="flex-1 overflow-auto">
            <div className="grid grid-cols-[5rem_repeat(7,1fr)] h-full">
              {/* Time labels */}
              <div className="border-r">
                {HOURS.map((hour) => (
                  <div
                    key={hour}
                    className="h-[64px] text-sm text-muted-foreground flex items-center justify-end pr-3"
                  >
                    {format(new Date().setHours(hour), "h a")}
                  </div>
                ))}
              </div>

              {/* Day columns */}
              {weekDays.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className="relative border-r last:border-r-0 day-column"
                >
                  <div className="bg-background border-b p-1 text-center">
                    <div className="text-sm font-medium">
                      {format(day, "EEE")}
                    </div>
                    <div
                      className={cn(
                        "text-base font-semibold",
                        isToday(day) && "text-primary"
                      )}
                    >
                      {format(day, "d")}
                    </div>
                  </div>

                  {/* Time slots */}
                  <div className="relative">
                    {HOURS.map((hour) => (
                      <div
                        key={hour}
                        className="h-[64px] border-b time-slot"
                        onClick={() => handleTimeSlotClick(day, hour, 0)}
                      />
                    ))}

                    {/* Events */}
                    {events
                      .filter((event) => isSameDay(event.day, day))
                      .map((event) => (
                        <CalendarEvent
                          key={event.id}
                          event={event}
                          isBeingDragged={dragState?.event.id === event.id}
                          isBeingResized={resizeState?.event.id === event.id}
                          style={getEventStyle(event)}
                          onMouseDown={(e) => handleEventMouseDown(e, event)}
                          onResizeMouseDown={(e, edge) =>
                            handleResizeMouseDown(e, event, edge)
                          }
                          onEditClick={() => handleEventEdit(event)}
                          onContextMenu={(e) => handleContextMenu(e, event)}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() =>
            contextMenuEvent && handleEventEdit(contextMenuEvent.event)
          }
        >
          Edit
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <div className="flex flex-col gap-2 w-full">
            <span className="text-sm">Color</span>
            <ColorSelector
              value={(contextMenuEvent?.event.color as ColorKey) || "blue"}
              onChange={handleColorChange}
              className="w-full"
            />
          </div>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          className="text-destructive"
          onClick={() =>
            contextMenuEvent && handleEventDelete(contextMenuEvent.event)
          }
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
