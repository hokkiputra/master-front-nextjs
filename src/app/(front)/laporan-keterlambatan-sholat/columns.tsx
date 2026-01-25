import { ColumnDef } from "@tanstack/react-table"

export type KeterlambatanSholat = {
  id: number
  tanggal: string
  waktu_datang?: string
  sholat: string
  status: "masbuk" | "bubar_awal" | "bersembunyi"
  keterangan?: string
  siswa: {
    id: number
    nama: string
    nis: string
    kelas: string
  }
}

export const columns: ColumnDef<KeterlambatanSholat>[] = [
  { accessorKey: "tanggal", header: "Tanggal" },
  { accessorKey: "sholat", header: "Sholat" },
  {
    header: "Nama Siswa",
    cell: info => info.row.original.siswa.nama,
  },
  {
    header: "NIS",
    cell: info => info.row.original.siswa.nis,
  },
  {
    header: "Kelas",
    cell: info => info.row.original.siswa.kelas,
  },
  { accessorKey: "waktu_datang", header: "Waktu Datang" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "keterangan", header: "Keterangan" },
]
