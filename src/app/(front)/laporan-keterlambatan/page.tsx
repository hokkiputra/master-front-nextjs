"use client"

import { useEffect, useState } from "react"
import { columns, Keterlambatan } from "./columns"
import { DataTable } from "@/components/layouts/data-table"
import api from "@/lib/axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { WithSidebar } from "@/components/layouts/with-sidebar"

export default function LaporanKeterlambatanPage() {
  const [data, setData] = useState<Keterlambatan[]>([])
  const [tanggalAwal, setTanggalAwal] = useState("")
  const [tanggalAkhir, setTanggalAkhir] = useState("")

  const fetchData = () => {
    const params: Record<string, string> = {}
    if (tanggalAwal) params.tanggal_awal = tanggalAwal
    if (tanggalAkhir) params.tanggal_akhir = tanggalAkhir
    api.get("/laporan/keterlambatan", { params }).then(res => {
      setData(res.data.data)
    })
  }

  const exportToExcel = () => {
    const params = new URLSearchParams()
    if (tanggalAwal) params.append("tanggal_awal", tanggalAwal)
    if (tanggalAkhir) params.append("tanggal_akhir", tanggalAkhir)

    window.open(`https://sahil-api.perintisilmu.sch.id/api/laporan/keterlambatan/export?${params.toString()}`, "_blank")
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <WithSidebar>

    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Laporan Keterlambatan</h1>

      <div className="flex gap-4 items-end">
        <div>
          <label className="block text-sm font-medium">Tanggal Awal</label>
          <Input type="date" value={tanggalAwal} onChange={e => setTanggalAwal(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium">Tanggal Akhir</label>
          <Input type="date" value={tanggalAkhir} onChange={e => setTanggalAkhir(e.target.value)} />
        </div>
        <Button onClick={fetchData}>Terapkan</Button>
        <Button variant="outline" onClick={exportToExcel}>Export ke Excel</Button>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
    </WithSidebar>
  )
}

