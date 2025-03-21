"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns"

interface CalendarProps {
  mode?: "single"
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  className?: string
  classNames?: Record<string, string>
}

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  className,
  classNames,
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(selected || new Date())

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  })

  const handleDateSelect = (date: Date) => {
    onSelect?.(date)
  }

  return (
    <div className={cn("p-2", className)}>
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={handlePrevMonth}
          title="Previous month"
          aria-label="Previous month"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-6 w-6 p-0 opacity-50 hover:opacity-100"
          )}
        >
          <ChevronLeft className="h-3 w-3" />
        </button>
        <h2 className="text-xs font-medium">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          onClick={handleNextMonth}
          title="Next month"
          aria-label="Next month"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-6 w-6 p-0 opacity-50 hover:opacity-100"
          )}
        >
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
              <th
                key={day}
                scope="col"
                className="text-center text-xs text-muted-foreground font-medium p-0"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Array.from({ length: startOfMonth(currentMonth).getDay() }).map((_, i) => (
              <td key={`empty-${i}`} className="p-0">
                <div className="h-6" />
              </td>
            ))}
            {days.map((day: Date) => {
              const isSelected = selected ? isSameDay(day, selected) : false
              const dateLabel = format(day, "MMMM d, yyyy")

              return (
                <td key={day.toString()} className="p-0">
                  <button
                    type="button"
                    onClick={() => handleDateSelect(day)}
                    title={dateLabel}
                    aria-label={dateLabel}
                    className={cn(
                      "h-6 w-6 rounded-md flex items-center justify-center text-xs transition-colors",
                      isSelected && "bg-[#c026d3] text-white hover:bg-[#c026d3]/90",
                      !isSelected && isToday(day) && "bg-accent text-accent-foreground",
                      !isSelected && !isToday(day) && "hover:bg-accent",
                      !isSameMonth(day, currentMonth) && "text-muted-foreground opacity-50"
                    )}
                  >
                    {format(day, "d")}
                  </button>
                </td>
              )
            })}
          </tr>
        </tbody>
      </table>
    </div>
  )
}
