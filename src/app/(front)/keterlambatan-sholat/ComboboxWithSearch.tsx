"use client"

import * as React from "react"
import Fuse from "fuse.js"
import { ChevronsUpDown, Check } from "lucide-react" // Tambah Check untuk indikator terpilih
import { cn } from "@/lib/utils" // Gunakan utility cn bawaan shadcn
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList, // Tambahkan CommandList untuk standar terbaru
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

  const fuse = React.useMemo(() => new Fuse(options, {
    keys: ["label"],
    threshold: 0.3, // Lebih rendah = lebih akurat, lebih tinggi = lebih fuzzy
    ignoreLocation: true, // Mencari di mana saja dalam string
  }), [options])

  const filteredOptions = React.useMemo(() => 
    query ? fuse.search(query).map(result => result.item) : options
  , [query, fuse, options])

  return (
<Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      role="combobox"
      className="w-full justify-between overflow-hidden" // Tambah overflow-hidden agar teks panjang tidak merusak tombol
      disabled={disabled}
    >
      <span className="truncate mr-2">
        {options.find((opt) => opt.value === value)?.label || placeholder}
      </span>
      <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
    </Button>
  </PopoverTrigger>
  
  {/* Lebar popover dibuat pas (min-w), tapi tidak memaksa full layar */}
  <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)] min-w-[200px]">
    <Command shouldFilter={false}>
      <CommandInput
        placeholder="Cari..."
        value={query}
        onValueChange={setQuery}
        className="h-9"
      />
      {/* Batasi tinggi pencarian agar tidak "full" ke bawah */}
      <CommandList className="max-h-[250px] overflow-y-auto">
        {filteredOptions.length === 0 && (
          <CommandEmpty>Tidak ditemukan.</CommandEmpty>
        )}
<CommandGroup>
  {filteredOptions.map((opt) => {
    const isSelected = value === opt.value;
    return (
      <CommandItem
        key={opt.value}
        value={String(opt.value)}
        onSelect={() => {
          onChange(opt.value)
          setOpen(false)
          setQuery("")
        }}
        className="text-sm py-1.5 cursor-pointer"
      >
        {/* Perubahan di sini: Hanya render ikon jika terpilih agar tidak ada spasi kosong di kiri */}
        {isSelected && (
          <Check className="mr-2 h-4 w-4 shrink-0" />
        )}
        
        <span className={cn(
          "truncate",
          !isSelected && "ml-0" // Memastikan tidak ada margin tambahan
        )}>
          {opt.label}
        </span>
      </CommandItem>
    );
  })}
</CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>
  )
}