"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  IconCalendarMonth
} from "@tabler/icons-react";
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, type ButtonProps } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DateRangePickerProps = {
  dateRange?: {
    from: Date,
    to: Date
  },
  dayCount?: number,
  placeholder?: string,
  triggerVariant?: Exclude<ButtonProps["variant"], "destructive" | "link">,
  triggerSize?: Exclude<ButtonProps["size"], "icon">,
  triggerClassName?: string
  className?: string
  data: object,
  setData: Function
}

export function DateRangePicker({
  dateRange,
  data,
  setData,
  dayCount,
  placeholder = "Select Date Range",
  triggerVariant = "outline",
  triggerSize = "default",
  triggerClassName,
  className,
  ...props
}: DateRangePickerProps) {

  const [date, setDate] = React.useState<DateRange | undefined>(dateRange)
  
  React.useEffect(() => {
    if (date?.from && date?.to) {
      setData({
        ...data,
        startDate: format(date.from, "yyyy-MM-dd"),
        endDate: format(date.to, "yyyy-MM-dd"),
      })
    }
  }, [date])

  return (
    <div className="gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={triggerVariant}
            size={triggerSize}
            className={cn(
              "w-full justify-start truncate text-left font-normal",
              !date && "text-muted-foreground",
              triggerClassName
            )}
          >
            <IconCalendarMonth className="mr-2 size-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-auto p-0", className)} {...props}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
