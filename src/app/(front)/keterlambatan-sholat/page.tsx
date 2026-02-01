"use client"

import { useEffect, useState } from "react"
import api from "@/lib/axios"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { WithSidebar } from "@/components/layouts/with-sidebar"
import { QuickFormSholat } from "./quick-form"
import { KeterlambatanSholat } from "./types"

export default function KeterlambatanSholatPage() {
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  

  // daftar siswa saja
  const [tempList, setTempList] = useState<{
    siswa_id: number
    siswa?: { nama: string; kelas: string }
  }[]>([])

  // form GLOBAL (boleh berubah kapan saja)
  const [globalForm, setGlobalForm] = useState({
    sholat: "dzuhur",
    status: "masbuk",
    keterangan: "",
  })

  const [recent, setRecent] = useState<KeterlambatanSholat[]>([])

  useEffect(() => {
    api.get("/keterlambatan-sholat/today")
      .then(res => setRecent(res.data))
      .catch(() => setRecent([]))
  }, [])

const handleSubmitAll = async () => {
  if (tempList.length === 0 || loadingSubmit) return

  try {
    setLoadingSubmit(true)

    await api.post("/keterlambatan-sholat/batch", {
      siswa_ids: tempList.map(t => t.siswa_id),
      sholat: globalForm.sholat,
      status: globalForm.status,
      keterangan: globalForm.keterangan,
    })

    // refresh data hari ini
    const res = await api.get("/keterlambatan-sholat/today")
    setRecent(res.data)

    // reset daftar sementara
    setTempList([])
  } finally {
    setLoadingSubmit(false)
  }
}



  return (
    <WithSidebar>
      <div className="p-4 space-y-6">

        <QuickFormSholat
          tempList={tempList}
          globalForm={globalForm}
          onFormChange={setGlobalForm}
          onAdd={(siswa) =>
            setTempList(prev => [...prev, siswa])
          }
        />

        {tempList.length > 0 && (
          <Card className="p-4 space-y-2">
            <h2 className="font-semibold">
              Daftar Sementara ({tempList.length})
            </h2>

            {tempList.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center border rounded px-3 py-2"
              >
                <div className="text-sm">
                  <div className="font-semibold">
                    {item.siswa?.nama} ({item.siswa?.kelas})
                  </div>
                  <div className="text-muted-foreground">
                    {globalForm.sholat.toUpperCase()} • {globalForm.status}
                  </div>
                </div>

                <button
                  onClick={() =>
                    setTempList(prev =>
                      prev.filter((_, idx) => idx !== i)
                    )
                  }
                  className="text-red-600 font-bold"
                >
                  ✕
                </button>
              </div>
            ))}
          </Card>
        )}

<Button
  disabled={tempList.length === 0 || loadingSubmit}
  onClick={handleSubmitAll}
  className="w-full"
>
  {loadingSubmit ? "Menyimpan..." : "🚀 Simpan Semua"}
</Button>


<div className="space-y-3">
  <h2 className="text-lg font-semibold tracking-tight">
    Sudah Dicatat Hari Ini
  </h2>

  <div className="grid gap-2">
    {recent.map((item, i) => (
      <Card key={i} className="shadow-sm">
        <CardContent className="p-3">
          {/* Baris Utama */}
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium leading-tight">
                {item.siswa?.nama}{" "}
                <span className="text-xs text-muted-foreground font-normal">
                  ({item.siswa?.kelas})
                </span>
              </div>
              <div className="text-[12px] text-muted-foreground mt-0.5">
                {item.sholat.toUpperCase()} • {item.tanggal}
              </div>
            </div>
            <Badge variant="outline" className="text-[10px] h-5 capitalize px-1.5">
              {item.status.replace("_", " ")}
            </Badge>
          </div>

          {/* Bagian Keterangan - Jarak diperpendek */}
          {item.keterangan && (
            <div className="mt-1.5 pt-1.5 border-t border-dashed text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Ket:</span> {item.keterangan}
            </div>
          )}
        </CardContent>
      </Card>
    ))}
  </div>
</div>

      </div>
    </WithSidebar>
  )
}
