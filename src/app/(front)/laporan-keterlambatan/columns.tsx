import { ColumnDef } from "@tanstack/react-table"

export type Keterlambatan = {
  id: number
  tanggal: string
  waktu_datang: string
  status: string
  keterangan?: string
  siswa: {
    id: number
    nama: string
    nis: string
    kelas: string
  }
}

export const columns: ColumnDef<Keterlambatan>[] = [
  { accessorKey: "tanggal", header: "Tanggal" },
  { accessorKey: "waktu_datang", header: "Waktu Datang" },
  { accessorKey: "siswa.nama", header: "Nama Siswa", cell: info => info.row.original.siswa.nama },
  { accessorKey: "siswa.nis", header: "NIS", cell: info => info.row.original.siswa.nis },
  { accessorKey: "siswa.kelas", header: "Kelas", cell: info => info.row.original.siswa.kelas },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "keterangan", header: "Keterangan" },
]
