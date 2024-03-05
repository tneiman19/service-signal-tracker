"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import React from "react";

interface CalandarProps {
  formLabel: string;
  field: {
    onChange: (value: any) => void;
    onBlur: () => void;
    value: any;
    name: string;
    ref: React.Ref<any>;
  };
}

export const CustomCalendar: React.FC<CalandarProps> = ({
  formLabel,
  field,
}) => {
  return (
    <FormItem className="flex flex-col">
      <FormLabel>{formLabel}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? (
                format(field.value, "MM/dd/yyyy")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            // disabled={(date) =>
            //   date > new Date() || date < new Date("1900-01-01")
            // }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {/* <FormDescription>
        Your date of birth is used to calculate your age.
      </FormDescription> */}
      <FormMessage />
    </FormItem>
  );
};

export default CustomCalendar;
