"use client"

import { useEffect, useState } from "react"
import { QuickForm } from "./quick-form"
import { Keterlambatan } from "../types"
import { Card } from "@/components/ui/card"
import api from "@/lib/axios"
import { WithSidebar } from "@/components/layouts/with-sidebar"

export default function MobileKeterlambatanPage() {
  const [recent, setRecent] = useState<Keterlambatan[]>([])

  // ✅ Ambil data hari ini saat pertama load
  useEffect(() => {
    api.get("/keterlambatans/today")
      .then(res => {
        setRecent(res.data.data) // data dari resource API
      })
      .catch(() => {
        setRecent([])
      })
  }, [])

  // ✅ Tambahkan ke recent setelah simpan baru
  const handleSuccess = (data: Keterlambatan) => {
    setRecent(prev => [data, ...prev].slice(0, 10)) // tampil 10 terbaru
  }

  return (
    <WithSidebar>
    <div className="p-4 space-y-6">
     

      <QuickForm onSuccess={handleSuccess} />

      <div>
        <h2 className="font-semibold mb-2">Sudah Dicatat Hari Ini:</h2>
        {recent.length === 0 && (
          <p className="text-muted-foreground">Belum ada siswa yang dicatat hari ini.</p>
        )}
        {recent.map((item, i) => (
          <Card key={i} className="p-3 mb-2">
            <div className="space-y-1">

            <div className="font-semibold">{item.nama_siswa}</div>
            <div className="text-sm text-muted-foreground">
              {item.tanggal} jam {item.waktu_datang}
            </div>
            {item.keterangan && <div className="text-sm">{item.keterangan}</div>}
            </div>
          </Card>
        ))}
      </div>
    </div>
    </WithSidebar>
  )
}
