"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { Siswa } from "./types"

interface FormDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: Partial<Siswa>, id?: number) => void
  initialData?: Siswa | null
}

export function FormDialog({ open, onClose, onSubmit, initialData }: FormDialogProps) {
  const [form, setForm] = useState<Partial<Siswa>>({
    nama: "",
    nis: "",
    kelas: "",
    is_active: true,
  })

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    } else {
      setForm({ nama: "", nis: "", kelas: "", is_active: true })
    }
  }, [initialData])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Siswa" : "Tambah Siswa"}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={e => {
            e.preventDefault()
            onSubmit(form, initialData?.id)
          }}
          className="space-y-4"
        >
          <Input placeholder="Nama" value={form.nama || ""} onChange={e => setForm({ ...form, nama: e.target.value })} required />
          <Input placeholder="NIS" value={form.nis || ""} onChange={e => setForm({ ...form, nis: e.target.value })} required />
          <Input placeholder="Kelas" value={form.kelas || ""} onChange={e => setForm({ ...form, kelas: e.target.value })} required />
          <label className="flex items-center space-x-2">
            <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} />
            <span>Aktif</span>
          </label>
          <Button type="submit">Simpan</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
