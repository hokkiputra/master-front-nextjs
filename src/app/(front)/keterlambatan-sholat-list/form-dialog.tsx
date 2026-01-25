"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { KeterlambatanSholat, Siswa } from "./types"
import api from "@/lib/axios"

interface FormDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: Partial<KeterlambatanSholat>, id?: number) => void
  initialData?: KeterlambatanSholat | null
  errors: { [key: string]: string[] }
  setErrors: React.Dispatch<
    React.SetStateAction<{ [key: string]: string[] }>
  >
}

const DEFAULT_FORM: Partial<KeterlambatanSholat> = {
  sholat: "dzuhur",
  status: "masbuk",
}

export function FormDialog({
  open,
  onClose,
  onSubmit,
  initialData,
  errors,
  setErrors,
}: FormDialogProps) {
  const [form, setForm] =
    useState<Partial<KeterlambatanSholat>>(DEFAULT_FORM)
  const [siswaList, setSiswaList] = useState<Siswa[]>([])

  useEffect(() => {
    api.get("/siswas").then(res => setSiswaList(res.data.data))

    if (initialData) {
      setForm(initialData)
    } else {
      setForm(DEFAULT_FORM)
    }

    setErrors({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit" : "Tambah"} Keterlambatan Sholat
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={e => {
            e.preventDefault()
            onSubmit(form, initialData?.id)
          }}
          className="space-y-4"
        >
          {/* siswa */}
          <select
            className="w-full border px-3 py-2 rounded"
            value={form.siswa_id || ""}
            onChange={e =>
              setForm({ ...form, siswa_id: Number(e.target.value) })
            }
            required
          >
            <option value="">-- Pilih Siswa --</option>
            {siswaList.map(siswa => (
              <option key={siswa.id} value={siswa.id}>
                {siswa.nama}
              </option>
            ))}
          </select>
          {errors?.siswa_id && (
            <p className="text-sm text-red-600">
              {errors.siswa_id[0]}
            </p>
          )}

          {/* sholat */}
          <select
            className="w-full border px-3 py-2 rounded"
            value={form.sholat || ""}
            onChange={e =>
              setForm({ ...form, sholat: e.target.value })
            }
            required
          >
            <option value="">-- Pilih Sholat --</option>
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

          {/* tanggal */}
          <Input
            type="date"
            value={form.tanggal || ""}
            onChange={e =>
              setForm({ ...form, tanggal: e.target.value })
            }
            required
          />
          {errors?.tanggal && (
            <p className="text-sm text-red-600">
              {errors.tanggal[0]}
            </p>
          )}

          {/* waktu datang */}
          <Input
            type="time"
            value={form.waktu_datang || ""}
            onChange={e =>
              setForm({ ...form, waktu_datang: e.target.value })
            }
          />

          {/* status */}
          <select
            className="w-full border px-3 py-2 rounded"
            value={form.status || "masbuk"}
            onChange={e =>
              setForm({ ...form, status: e.target.value as any })
            }
            required
          >
            <option value="masbuk">Masbuk</option>
            <option value="bubar_awal">
              Bubar sebelum selesai / ke kantin
            </option>
            <option value="bersembunyi">
              Bersembunyi (tidak ke masjid)
            </option>
          </select>
          {errors?.status && (
            <p className="text-sm text-red-600">
              {errors.status[0]}
            </p>
          )}

          {/* keterangan */}
          <Input
            placeholder="Keterangan"
            value={form.keterangan || ""}
            onChange={e =>
              setForm({ ...form, keterangan: e.target.value })
            }
          />

          <Button type="submit">Simpan</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
