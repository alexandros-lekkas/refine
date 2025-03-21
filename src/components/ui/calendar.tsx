"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        root: "w-full flex justify-center",
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 w-[280px]",
        caption: "flex justify-center pt-1 relative items-center h-10",
        caption_label: "text-sm font-medium hidden",
        nav: "absolute inset-x-1 top-1 flex justify-between items-center",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          "hover:bg-transparent focus:bg-transparent",
          "focus-visible:ring-1 focus-visible:ring-[#c026d3] focus-visible:ring-offset-0"
        ),
        nav_button_previous: "left-1",
        nav_button_next: "right-1",
        table: "w-full border-collapse",
        head_row: "flex justify-center",
        head_cell: "text-gray-500 rounded-md w-9 font-normal text-[13px] py-2 text-center",
        row: "flex w-full mt-0.5 justify-center",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
          "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
        ),
        day: cn(
          "h-9 w-9 p-0 font-normal text-[13px] aria-selected:opacity-100",
          "hover:bg-gray-100 focus:bg-gray-100 rounded-md"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-[#c026d3] text-white hover:bg-[#c026d3] hover:text-white focus:bg-[#c026d3] focus:text-white",
        day_today: "bg-gray-100/50 text-[#c026d3]",
        day_outside: "text-gray-300 opacity-50 hover:bg-transparent focus:bg-transparent",
        day_disabled: "text-gray-300 opacity-50",
        day_range_middle: "aria-selected:bg-gray-100 aria-selected:text-gray-900",
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
