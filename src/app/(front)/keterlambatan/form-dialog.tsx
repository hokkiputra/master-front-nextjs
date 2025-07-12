"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Keterlambatan, Siswa } from "./types"
import api from "@/lib/axios"

interface FormDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: Partial<Keterlambatan>, id?: number) => void
  initialData?: Keterlambatan | null
  errors: { [key: string]: string[] }
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>
}

export function FormDialog({ open, onClose, onSubmit, initialData, errors, setErrors }: FormDialogProps) {
  const [form, setForm] = useState<Partial<Keterlambatan>>({})
  const [siswaList, setSiswaList] = useState<Siswa[]>([])

  useEffect(() => {
    api.get("/siswas").then(res => setSiswaList(res.data.data))
    if (initialData) {
      setForm(initialData)
    } else {
      setForm({ status: "terlambat" })
    }
    setErrors({})
  }, [initialData])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit" : "Tambah"} Keterlambatan</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(form, initialData?.id)
          }}
          className="space-y-4"
        >
          <select
            className="w-full border px-3 py-2 rounded"
            value={form.siswa_id || ""}
            onChange={(e) => setForm({ ...form, siswa_id: Number(e.target.value) })}
            required
          >
            <option value="">-- Pilih Siswa --</option>
            {siswaList.map((siswa) => (
              <option key={siswa.id} value={siswa.id}>{siswa.nama}</option>
            ))}
          </select>
          {errors?.siswa_id && <p className="text-sm text-red-600">{errors.siswa_id[0]}</p>}

          <Input
            type="date"
            value={form.tanggal || ""}
            onChange={e => setForm({ ...form, tanggal: e.target.value })}
            required
          />
          {errors?.tanggal && <p className="text-sm text-red-600">{errors.tanggal[0]}</p>}

          <Input
            type="time"
            value={form.waktu_datang || ""}
            onChange={e => setForm({ ...form, waktu_datang: e.target.value })}
            required
          />
          {errors?.waktu_datang && <p className="text-sm text-red-600">{errors.waktu_datang[0]}</p>}

          <Input
            placeholder="Keterangan"
            value={form.keterangan || ""}
            onChange={e => setForm({ ...form, keterangan: e.target.value })}
          />
          {errors?.keterangan && <p className="text-sm text-red-600">{errors.keterangan[0]}</p>}

          <Button type="submit">Simpan</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
