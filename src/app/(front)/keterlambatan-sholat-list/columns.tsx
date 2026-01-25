import { ColumnDef } from "@tanstack/react-table"
import { KeterlambatanSholat } from "./types"
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
  onEdit: (item: KeterlambatanSholat) => void
  onDelete: (id: number) => void
}): ColumnDef<KeterlambatanSholat>[] => [
  {
    header: "Nama Siswa",
    accessorFn: row =>
      row.siswa
        ? `${row.siswa.nama} (${row.siswa.kelas})`
        : "-"
  },
  { accessorKey: "sholat", header: "Sholat" },
  { accessorKey: "tanggal", header: "Tanggal" },
  { accessorKey: "waktu_datang", header: "Waktu Datang" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "keterangan", header: "Keterangan" },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(item)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(item.id)}>
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
