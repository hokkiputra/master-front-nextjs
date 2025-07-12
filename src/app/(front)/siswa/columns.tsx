import { ColumnDef } from "@tanstack/react-table"
import { Siswa } from "./types"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export const columns = ({
  onEdit,
  onDelete,
}: {
  onEdit: (siswa: Siswa) => void
  onDelete: (id: number) => void
}): ColumnDef<Siswa>[] => [
  { accessorKey: "nama", header: "Nama" },
  { accessorKey: "nis", header: "NIS" },
  { accessorKey: "kelas", header: "Kelas" },
  {
    accessorKey: "is_active",
    header: "Aktif",
    cell: ({ row }) => (row.original.is_active ? "✓" : "✗"),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const siswa = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(siswa)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(siswa.id)}>Hapus</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
