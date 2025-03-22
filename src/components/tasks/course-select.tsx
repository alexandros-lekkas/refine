"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Course {
  value: string;
  label: string;
}

const courses: Course[] = [
  { value: "cs101", label: "CS 101" },
  { value: "math201", label: "MATH 201" },
  { value: "phys202", label: "PHYS 202" },
  { value: "eng301", label: "ENG 301" },
  { value: "bio301", label: "BIO 301" },
  { value: "chem202", label: "CHEM 202" },
];

interface CourseSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function CourseSelect({ value, onChange }: CourseSelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between bg-gray-50 border-none"
        >
          {value
            ? courses.find((course) => course.value === value)?.label
            : "Select course..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search courses..." />
          <CommandEmpty>No course found.</CommandEmpty>
          <CommandGroup>
            {courses.map((course) => (
              <CommandItem
                key={course.value}
                value={course.value}
                onSelect={(currentValue: string) => {
                  onChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === course.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {course.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
