"use client"

import { useEffect, useState } from "react"
import { columns, KeterlambatanSholat } from "./columns"
import { DataTable } from "@/components/layouts/data-table"
import api from "@/lib/axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { WithSidebar } from "@/components/layouts/with-sidebar"

export default function LaporanKeterlambatanSholatPage() {
  const [data, setData] = useState<KeterlambatanSholat[]>([])
  const [tanggalAwal, setTanggalAwal] = useState("")
  const [tanggalAkhir, setTanggalAkhir] = useState("")

  const fetchData = () => {
    const params: Record<string, string> = {}
    if (tanggalAwal) params.tanggal_awal = tanggalAwal
    if (tanggalAkhir) params.tanggal_akhir = tanggalAkhir


      api
        .get("/laporan/keterlambatan-sholat", { params })
        .then(res => {
            setData(res.data.data ?? res.data)
        })

  }

const exportToExcel = async () => {
  const params: Record<string, string> = {}
  if (tanggalAwal) params.tanggal_awal = tanggalAwal
  if (tanggalAkhir) params.tanggal_akhir = tanggalAkhir

  const res = await api.get(
    "/laporan/keterlambatan-sholat/export",
    {
      params,
      responseType: "blob",
    }
  )

  const url = window.URL.createObjectURL(
    new Blob([res.data])
  )

  const link = document.createElement("a")
  link.href = url
  link.setAttribute(
    "download",
    "laporan_keterlambatan_sholat.xlsx"
  )

  document.body.appendChild(link)
  link.click()
  link.remove()
}


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <WithSidebar>
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-bold">
          Laporan Keterlambatan Sholat
        </h1>

        <div className="flex gap-4 items-end flex-wrap">
          <div>
            <label className="block text-sm font-medium">
              Tanggal Awal
            </label>
            <Input
              type="date"
              value={tanggalAwal}
              onChange={e => setTanggalAwal(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              Tanggal Akhir
            </label>
            <Input
              type="date"
              value={tanggalAkhir}
              onChange={e => setTanggalAkhir(e.target.value)}
            />
          </div>

          <Button onClick={fetchData}>Terapkan</Button>
          <Button variant="outline" onClick={exportToExcel}>
            Export ke Excel
          </Button>
        </div>

        <DataTable columns={columns} data={data} />
      </div>
    </WithSidebar>
  )
}
