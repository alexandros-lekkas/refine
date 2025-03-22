"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CreateEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateEvent: (event: any) => void;
  defaultDate?: Date;
  defaultHour?: number;
}

const EVENT_TYPES = [
  { id: 'academic', label: 'Academic', color: '#60A5FA' },
  { id: 'club', label: 'Club', color: '#34D399' },
  { id: 'workout', label: 'Workout', color: '#F87171' },
  { id: 'social', label: 'Social', color: '#A78BFA' },
  { id: 'downtime', label: 'Downtime', color: '#FBBF24' },
  { id: 'other', label: 'Other', color: '#9CA3AF' }
];

export function CreateEventDialog({ isOpen, onClose, onCreateEvent, defaultDate, defaultHour }: CreateEventDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('academic');
  const [type, setType] = useState('assignment');
  const [dueDate, setDueDate] = useState<Date | undefined>(defaultDate);
  const [dueTime, setDueTime] = useState(defaultHour ? `${defaultHour}:00` : '12:00');
  const [priority, setPriority] = useState('medium');
  const [dateType, setDateType] = useState<'due' | 'start'>('due');

  const handleSubmit = () => {
    const startDate = dueDate ? new Date(dueDate) : new Date();
    const [hours, minutes] = dueTime.split(':').map(Number);
    startDate.setHours(hours, minutes, 0);

    const event = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      category,
      type,
      start: startDate,
      end: startDate,
      color: EVENT_TYPES.find(t => t.id === category)?.color || '#60A5FA',
      priority
    };

    onCreateEvent(event);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] p-0">
        <div className="flex items-center justify-between p-4">
          <DialogTitle className="text-2xl">Create New Task</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4 space-y-4">
          {/* Title */}
          <div>
            <Label>Title</Label>
            <Input
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Input
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EVENT_TYPES.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div>
              <Label>Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Type */}
            <div>
              <Label>Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="assignment">Assignment</SelectItem>
                  <SelectItem value="meeting">Meeting</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Due Time */}
            <div>
              <Label>Due Time</Label>
              <Input
                type="time"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
              />
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Date Type</Label>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`px-2 py-1 text-sm ${dateType === 'due' ? 'bg-gray-100' : ''}`}
                  onClick={() => setDateType('due')}
                >
                  Due Date
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`px-2 py-1 text-sm ${dateType === 'start' ? 'bg-gray-100' : ''}`}
                  onClick={() => setDateType('start')}
                >
                  Date
                </Button>
              </div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  {dueDate ? format(dueDate, "MMMM d, yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                  className="rounded-md border"
                  classNames={{
                    months: "space-y-4",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-sm font-medium text-center",
                    nav: "flex items-center gap-1 absolute inset-0 justify-between px-2",
                    nav_button: "h-7 w-7 hover:bg-gray-100 rounded-lg flex items-center justify-center shadow-sm border",
                    nav_button_previous: "",
                    nav_button_next: "",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "text-center text-sm relative p-0 hover:bg-gray-50 rounded-lg w-9 h-9 flex items-center justify-center",
                    day: "h-9 w-9 p-0 font-normal hover:bg-gray-50 rounded-lg",
                    day_range_middle: "rounded-none",
                    day_selected: "bg-[#4f46e5] text-white hover:bg-[#4f46e5] hover:text-white focus:bg-[#4f46e5] focus:text-white rounded-lg",
                    day_today: "bg-gray-50 rounded-lg",
                    day_outside: "text-gray-400",
                    day_disabled: "text-gray-300",
                    day_hidden: "invisible",
                  }}
                  components={{
                    IconLeft: () => (
                      <div className="flex items-center justify-center">
                        <ChevronLeft className="h-4 w-4" />
                      </div>
                    ),
                    IconRight: () => (
                      <div className="flex items-center justify-center">
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    ),
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="p-4">
          <Button 
            onClick={handleSubmit}
            className="w-full bg-[#c026d3] text-white hover:bg-[#a21caf]"
            disabled={!title}
          >
            Create Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}