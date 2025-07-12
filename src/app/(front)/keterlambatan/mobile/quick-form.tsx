"use client"

import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import api from "@/lib/axios"
import axios from "axios"
import { Siswa, Keterlambatan } from "../types"
import { ComboboxWithSearch } from "./ComboboxWithSearch"

export function QuickForm({ onSuccess }: { onSuccess: (data: Keterlambatan) => void }) {
  const [form, setForm] = useState<Partial<Keterlambatan>>({})
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
    setForm({})
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post("/keterlambatans/quick", {
        siswa_id: form.siswa_id,
        keterangan: form.keterangan,
        status: "terlambat"
      })
      setErrors({})
      setForm({})
      onSuccess(res.data.data)

      setSiswaList(prev =>
        prev.map(s =>
          s.id === form.siswa_id ? { ...s, is_terlambat_hari_ini: true } : s
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
      {refreshing && <p className="text-sm text-muted-foreground">Memuat data siswa terbaru...</p>}

      <ComboboxWithSearch
        options={siswaList.map(siswa => ({
          value: siswa.id,
          label: `${siswa.nama} (${siswa.kelas})${siswa.is_terlambat_hari_ini ? " ✅" : ""}`,
          disabled: siswa.is_terlambat_hari_ini,
        }))}
        value={form.siswa_id || ""}
        onChange={(val) => setForm({ ...form, siswa_id: Number(val) })}
        placeholder="Cari nama siswa..."
      />
      {errors?.siswa_id && <p className="text-sm text-red-600">{errors.siswa_id[0]}</p>}

      <Input
        placeholder="Keterangan (opsional)"
        value={form.keterangan || ""}
        onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
      />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  )
}
