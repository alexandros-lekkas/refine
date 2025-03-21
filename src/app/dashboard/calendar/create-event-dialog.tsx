"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { format } from "date-fns";

interface CreateEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (event: {
    title: string;
    start: Date;
    end: Date;
    color: string;
    courseCode: string;
  }) => void;
  date: Date;
  hour: number;
}

const DURATIONS = [
  { value: "0.5", label: "30 minutes" },
  { value: "1", label: "1 hour" },
  { value: "1.5", label: "1.5 hours" },
  { value: "2", label: "2 hours" },
  { value: "3", label: "3 hours" },
  { value: "4", label: "4 hours" },
];

const COLORS = [
  { value: "#34D399", label: "Green" },
  { value: "#F87171", label: "Red" },
  { value: "#60A5FA", label: "Blue" },
];

export function CreateEventDialog({
  isOpen,
  onClose,
  onSubmit,
  date,
  hour,
}: CreateEventDialogProps) {
  const [title, setTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [duration, setDuration] = useState("1");
  const [color, setColor] = useState("#60A5FA");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const start = new Date(date);
    start.setHours(hour);
    const end = new Date(start);
    end.setHours(start.getHours() + parseFloat(duration));

    onSubmit({
      title,
      courseCode,
      start,
      end,
      color,
    });
    setTitle("");
    setCourseCode("");
    setDuration("1");
    setColor("#60A5FA");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <h2 className="text-lg font-medium mb-4">Create New Event</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="block text-sm font-medium mb-1">Course Code</Label>
              <Input
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                placeholder="e.g. CS101"
                required
              />
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">Event Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Event title"
                required
              />
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">Date & Time</Label>
              <Input
                value={`${format(date, "MMMM d, yyyy")} at ${format(
                  new Date().setHours(hour),
                  "h:mm a"
                )}`}
                disabled
              />
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">Duration</Label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border-gray-200 focus:ring-blue-500 focus:border-blue-500"
              >
                {DURATIONS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">Color</Label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`w-8 h-8 rounded-full ${color === "#34D399" ? "ring-2 ring-offset-2" : ""}`}
                  style={{ backgroundColor: "#34D399" }}
                  onClick={() => setColor("#34D399")}
                />
                <button
                  type="button"
                  className={`w-8 h-8 rounded-full ${color === "#F87171" ? "ring-2 ring-offset-2" : ""}`}
                  style={{ backgroundColor: "#F87171" }}
                  onClick={() => setColor("#F87171")}
                />
                <button
                  type="button"
                  className={`w-8 h-8 rounded-full ${color === "#60A5FA" ? "ring-2 ring-offset-2" : ""}`}
                  style={{ backgroundColor: "#60A5FA" }}
                  onClick={() => setColor("#60A5FA")}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit">Create Event</Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}