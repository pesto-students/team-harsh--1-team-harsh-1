"use client"

import { Check, ChevronDown } from "lucide-react"
import { UseFormReturn } from "react-hook-form"

import { INDIA_STATE, cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React from "react"
import { ScrollArea } from "./ui/scroll-area"

interface PropsType {
  form : UseFormReturn<{
    name: string;
    full_address: string;
    phone: string;
    city: string;
    state: string;
    pin: string;
  }, any, undefined>
}

export function ComboboxForm({ form }:PropsType) {
  const [open, setOpen] = React.useState(false)

  return (
    <FormField
      control={form.control}
      name="state"
      render={({ field }) => (
        <FormItem>
          <Popover >
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? INDIA_STATE?.[field.value]
                    : "Select state"}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search state..." />
                <CommandEmpty>No state found.</CommandEmpty>
                <CommandGroup>
                <ScrollArea className="h-60">
                  {Object.entries(INDIA_STATE)?.map(([value, label]) => (
                    <CommandItem
                      value={label}
                      key={value}
                      onSelect={() => { form?.setValue("state", value); setOpen(false) }}
                    >
                      <Check className={cn( "mr-2 h-4 w-4", value === field.value ? "opacity-100" : "opacity-0" )} />
                      {label}
                    </CommandItem>
                  ))}
                </ScrollArea>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
