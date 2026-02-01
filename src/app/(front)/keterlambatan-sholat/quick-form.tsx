"use client"

import { useEffect, useState } from "react"
import api from "@/lib/axios"
import { Input } from "@/components/ui/input"
import { ComboboxWithSearch } from "./ComboboxWithSearch"
import { Siswa } from "./types"

export function QuickFormSholat({
  tempList,
  globalForm,
  onFormChange,
  onAdd,
}: {
  tempList: { siswa_id: number }[]
  globalForm: {
    sholat: string
    status: string
    keterangan: string
  }
  onFormChange: (val: {
    sholat: string
    status: string
    keterangan: string
  }) => void
  onAdd: (data: {
    siswa_id: number
    siswa?: { nama: string; kelas: string }
  }) => void
}) {
  const [siswaList, setSiswaList] = useState<Siswa[]>([])

  useEffect(() => {
    api.get("/siswas/for-pencatatan")
      .then(res => setSiswaList(res.data.data))
  }, [])

  return (
    <div className="space-y-4">
      {/* PILIH SISWA */}
      
      <ComboboxWithSearch
        options={siswaList.map(s => ({
          value: s.id,
          label: `${s.nama} (${s.kelas})`,
          disabled: tempList.some(t => t.siswa_id === s.id),
        }))}
        value=""
        onChange={(val) => {
          const siswa = siswaList.find(s => s.id === Number(val))
          if (!siswa) return

          onAdd({
            siswa_id: siswa.id,
            siswa: { nama: siswa.nama, kelas: siswa.kelas },
          })
        }}
        placeholder="Cari dan pilih siswa..."
      />

      {/* FORM GLOBAL */}
      <select
        className="w-full border rounded p-2"
        value={globalForm.sholat}
        onChange={e =>
          onFormChange({ ...globalForm, sholat: e.target.value })
        }
      >
        <option value="subuh">Subuh</option>
        <option value="dzuhur">Dzuhur</option>
        <option value="ashar">Ashar</option>
        <option value="maghrib">Maghrib</option>
        <option value="isya">Isya</option>
      </select>

      <select
        className="w-full border rounded p-2"
        value={globalForm.status}
        onChange={e =>
          onFormChange({ ...globalForm, status: e.target.value })
        }
      >
        <option value="masbuk">Masbuk</option>
        <option value="bubar_awal">Bubar Awal</option>
        <option value="bersembunyi">Bersembunyi</option>
      </select>

      <Input
        placeholder="Keterangan (berlaku untuk semua siswa)"
        value={globalForm.keterangan}
        onChange={e =>
          onFormChange({ ...globalForm, keterangan: e.target.value })
        }
      />

      <p className="text-xs text-muted-foreground">
        Nilai sholat, status, dan keterangan yang tersimpan adalah
        kondisi TERAKHIR saat tombol <b>Simpan Semua</b> ditekan.
      </p>
    </div>
  )
}
