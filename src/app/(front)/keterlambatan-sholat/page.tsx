"use client"

import { useEffect, useState } from "react"
import { QuickFormSholat } from "./quick-form"
import { KeterlambatanSholat } from "./types"
import { Card } from "@/components/ui/card"
import api from "@/lib/axios"
import { WithSidebar } from "@/components/layouts/with-sidebar"

export default function KeterlambatanSholatPage() {
  const [recent, setRecent] = useState<KeterlambatanSholat[]>([])

  // ✅ Ambil data sholat hari ini
  useEffect(() => {
    api.get("/keterlambatan-sholat/today")
      .then(res => {
        setRecent(res.data)
      })
      .catch(() => {
        setRecent([])
      })
  }, [])

  // ✅ Tambah data baru ke list
  const handleSuccess = (data: KeterlambatanSholat) => {
    setRecent(prev => [data, ...prev].slice(0, 10))
  }

  return (
    <WithSidebar>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Catat Keterlambatan Sholat
        </h1>

        <QuickFormSholat onSuccess={handleSuccess} />

        <div>
          <h2 className="font-semibold mb-2">Sudah Dicatat Hari Ini:</h2>

          {recent.length === 0 && (
            <p className="text-muted-foreground">
              Belum ada pelanggaran sholat hari ini.
            </p>
          )}

          {recent.map((item, i) => (
            <Card key={i} className="p-3 mb-2">
              <div className="space-y-1">
                <div className="font-semibold">
                  {item.siswa
                    ? `${item.siswa.nama} (${item.siswa.kelas})`
                    : "-"}
                </div>

                <div className="text-sm text-muted-foreground">
                  {item.sholat.toUpperCase()} • {item.tanggal}
                  {item.waktu_datang && ` • jam ${item.waktu_datang}`}
                </div>

                <div className="text-sm font-medium">
                  Status: {item.status.replace("_", " ")}
                </div>

                {item.keterangan && (
                  <div className="text-sm">
                    {item.keterangan}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </WithSidebar>
  )
}
