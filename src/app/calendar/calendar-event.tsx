"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ContextMenuTrigger } from "@/components/ui/context-menu";
import { CalendarEventProps } from "../../types/calendar";
import { COLORS, ColorKey } from "@/components/color-selector";

export function CalendarEvent({
  event,
  isBeingDragged,
  isBeingResized,
  style,
  onMouseDown,
  onResizeMouseDown,
  onEditClick,
  onContextMenu,
}: CalendarEventProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isInteracting = isBeingDragged || isBeingResized;
  const dragTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isDragStarted, setIsDragStarted] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only handle left clicks
    if ((e.target as HTMLElement).classList.contains("resize-handle")) return;

    const startDrag = () => {
      setIsDragStarted(true);
      onMouseDown(e);
    };

    // Set a timeout to start dragging only if the mouse is held down
    dragTimeout.current = setTimeout(startDrag, 150);
  };

  const handleMouseUp = () => {
    if (dragTimeout.current) {
      clearTimeout(dragTimeout.current);
      dragTimeout.current = null;
    }
    if (!isDragStarted) {
      onEditClick();
    }
    setIsDragStarted(false);
  };

  const handleMouseLeave = () => {
    if (dragTimeout.current) {
      clearTimeout(dragTimeout.current);
      dragTimeout.current = null;
    }
    setIsHovered(false);
  };

  useEffect(() => {
    return () => {
      if (dragTimeout.current) {
        clearTimeout(dragTimeout.current);
        dragTimeout.current = null;
      }
    };
  }, []);

  const colorClasses = COLORS[(event.color as ColorKey) || "blue"];

  return (
    <ContextMenuTrigger>
      <div
        className={cn(
          "absolute left-0 right-0 mx-2 rounded-lg p-2 text-xs select-none transition-all duration-75",
          colorClasses.bg,
          colorClasses.text,
          colorClasses.border,
          isInteracting
            ? "shadow-lg opacity-90 cursor-move z-50"
            : "hover:shadow-md cursor-pointer",
          isInteracting && "ring-2 ring-primary ring-offset-2"
        )}
        style={{
          ...style,
          transform: isBeingDragged ? "scale(1.02)" : undefined,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        onContextMenu={onContextMenu}
      >
        {(isHovered || isInteracting) && (
          <>
            <div
              className="resize-handle absolute left-0 top-0 bottom-0 w-2 cursor-ns-resize rounded-l-lg opacity-0 hover:opacity-100 transition-opacity bg-primary/10"
              onMouseDown={(e) => onResizeMouseDown(e, "start")}
            />
            <div
              className="resize-handle absolute right-0 top-0 bottom-0 w-2 cursor-ns-resize rounded-r-lg opacity-0 hover:opacity-100 transition-opacity bg-primary/10"
              onMouseDown={(e) => onResizeMouseDown(e, "end")}
            />
            <div
              className="resize-handle absolute left-0 top-0 w-full h-2 cursor-ns-resize rounded-t-lg opacity-0 hover:opacity-100 transition-opacity bg-primary/10"
              onMouseDown={(e) => onResizeMouseDown(e, "start")}
            />
            <div
              className="resize-handle absolute left-0 bottom-0 w-full h-2 cursor-ns-resize rounded-b-lg opacity-0 hover:opacity-100 transition-opacity bg-primary/10"
              onMouseDown={(e) => onResizeMouseDown(e, "end")}
            />
          </>
        )}
        <div className="font-medium truncate">{event.title}</div>
      </div>
    </ContextMenuTrigger>
  );
}
