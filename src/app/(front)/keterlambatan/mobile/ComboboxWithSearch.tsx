"use client"

import * as React from "react"
import Fuse from "fuse.js"
import { ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export type Option = {
  label: string
  value: string | number
  disabled?: boolean
}

interface ComboboxWithSearchProps {
  options: Option[]
  value?: string | number
  onChange: (value: string | number) => void
  placeholder?: string
  disabled?: boolean
}

export function ComboboxWithSearch({
  options,
  value,
  onChange,
  placeholder = "Pilih...",
  disabled = false,
}: ComboboxWithSearchProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")

  const selected = options.find((opt) => opt.value === value)

  const fuse = new Fuse(options, {
    keys: ["label"],
    threshold: 0.4,
  })

  const filteredOptions = query
    ? fuse.search(query).map(result => result.item)
    : options

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {selected ? selected.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command className="w-full">
          <CommandInput
            placeholder="Cari..."
            className="h-9 w-full"
            onValueChange={(val) => setQuery(val)}
          />
          <CommandEmpty>Data tidak ditemukan</CommandEmpty>
          <div className="max-h-60 overflow-y-auto">
            <CommandGroup>
              {filteredOptions.map((opt) => (
                <CommandItem
                  key={opt.value}
                  onSelect={() => {
                    if (!opt.disabled) {
                      onChange(opt.value)
                      setOpen(false)
                    }
                  }}
                  disabled={opt.disabled}
                >
                  {opt.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
