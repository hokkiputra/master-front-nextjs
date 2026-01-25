"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import api from "@/lib/axios"
import axios from "axios"
import { Siswa, KeterlambatanSholat } from "./types"
import { ComboboxWithSearch } from "./ComboboxWithSearch"

export function QuickFormSholat({
  onSuccess,
}: {
  onSuccess: (data: KeterlambatanSholat) => void
}) {
  const DEFAULT_FORM: Partial<KeterlambatanSholat> = {
    sholat: "dzuhur",
    status: "masbuk",
  }
  const [form, setForm] = useState<Partial<KeterlambatanSholat>>(DEFAULT_FORM)

  // const [form, setForm] = useState<Partial<KeterlambatanSholat>>({
  //   sholat: "dzuhur",
  //   status: "masbuk",
  // })
  const [siswaList, setSiswaList] = useState<Siswa[]>([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({})




  const fetchSiswa = async () => {
    setRefreshing(true)
    const res = await api.get("/siswas/for-pencatatan")
    setSiswaList(res.data.data)
    setRefreshing(false)
  }

  useEffect(() => {
    fetchSiswa()
    // setForm({})
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await api.post("/keterlambatan-sholat/quick", {
        siswa_id: form.siswa_id,
        sholat: form.sholat,
        status: form.status,
        keterangan: form.keterangan,
      })

      setErrors({})
      // setForm({})
      setForm(DEFAULT_FORM)
      onSuccess(res.data)

      // tandai siswa sudah dicatat (opsional, UI feedback)
      setSiswaList(prev =>
        prev.map(s =>
          s.id === form.siswa_id
            ? { ...s, sudah_dicatat_sholat: true }
            : s
        )
      )

      setTimeout(() => {
        fetchSiswa()
      }, 5000)
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 422) {
        setErrors(err.response.data.errors)
      }
    } finally {
      setLoading(false)
    }
  }

  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {refreshing && (
        <p className="text-sm text-muted-foreground">
          Memuat data siswa terbaru...
        </p>
      )}

      {/* pilih siswa */}
      <ComboboxWithSearch
        options={siswaList.map(siswa => ({
          value: siswa.id,
          label: `${siswa.nama} (${siswa.kelas})`,
        }))}
        value={form.siswa_id || ""}
        onChange={val =>
          setForm({ ...form, siswa_id: Number(val) })
        }
        placeholder="Cari nama siswa..."
      />
      {errors?.siswa_id && (
        <p className="text-sm text-red-600">
          {errors.siswa_id[0]}
        </p>
      )}

      {/* pilih sholat */}
      <select
        className="w-full border rounded p-2"
        value={form.sholat || ""}
        onChange={e =>
          setForm({ ...form, sholat: e.target.value })
        }
      >
        <option value="">Pilih sholat</option>
        <option value="subuh">Subuh</option>
        <option value="dzuhur">Dzuhur</option>
        <option value="ashar">Ashar</option>
        <option value="maghrib">Maghrib</option>
        <option value="isya">Isya</option>
      </select>
      {errors?.sholat && (
        <p className="text-sm text-red-600">
          {errors.sholat[0]}
        </p>
      )}

      {/* pilih status */}
      <select
        className="w-full border rounded p-2"
        value={form.status || "masbuk"}
        onChange={e =>
          setForm({ ...form, status: e.target.value as any })
        }
      >
        <option value="masbuk">Masbuk</option>
        <option value="bubar_awal">Bubar sebelum selesai / ke kantin</option>
        <option value="bersembunyi">Bersembunyi (tidak ke masjid)</option>
      </select>

      {errors?.status && (
        <p className="text-sm text-red-600">
          {errors.status[0]}
        </p>
      )}


      {/* keterangan */}
      <Input
        placeholder="Keterangan (opsional)"
        value={form.keterangan || ""}
        onChange={e =>
          setForm({ ...form, keterangan: e.target.value })
        }
      />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  )
}
