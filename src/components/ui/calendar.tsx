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
      className={cn("p-0", className)}
      classNames={{
        root: "w-full flex justify-center",
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "w-[280px]",
        caption: "hidden",
        caption_label: "hidden",
        nav: "hidden",
        nav_button: "hidden",
        nav_button_previous: "hidden",
        nav_button_next: "hidden",
        table: "w-full border-collapse",
        head_row: "hidden",
        head_cell: "hidden",
        row: "grid grid-cols-7 mt-1",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-transparent",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal text-[13px] aria-selected:opacity-100",
          "hover:bg-gray-100 focus:bg-gray-100 rounded-md",
          "flex items-center justify-center mx-auto"
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
