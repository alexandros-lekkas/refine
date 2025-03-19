export interface Event {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  day: Date;
  color?: string;
}

export interface WeekViewCalendarProps {
  events: Event[];
  currentDate: Date;
  onEventUpdate: (event: Event) => void;
  onEventEdit?: (event: Event) => void;
  onEventDelete?: (event: Event) => void;
  onDateChange?: (date: Date) => void;
  onCreateTaskClick: (date: Date, hour: number) => void;
}

export interface DragState {
  event: Event;
  initialX: number;
  initialY: number;
  offsetX: number;
  offsetY: number;
}

export interface ResizeState {
  event: Event;
  edge: "start" | "end";
  initialY: number;
  currentY: number;
}

export interface CalendarEventProps {
  event: Event;
  isBeingDragged: boolean;
  isBeingResized: boolean;
  style: { top: string; height: string };
  onMouseDown: (e: React.MouseEvent) => void;
  onResizeMouseDown: (e: React.MouseEvent, edge: "start" | "end") => void;
  onEditClick: () => void;
  onContextMenu: (e: React.MouseEvent) => void;
}

export type ColorKey = "blue" | "green" | "red" | "purple" | "orange" | "yellow" | "pink"; 