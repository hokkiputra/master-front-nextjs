"use client"

import { useEffect, useState, useCallback } from "react"
import { columns as getColumns } from "./columns"
import { Keterlambatan } from "./types"
import { DataTable } from "@/components/layouts/data-table"
import { FormDialog } from "./form-dialog"
import api from "@/lib/axios"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import { WithSidebar } from "@/components/layouts/with-sidebar"

export default function KeterlambatanPage() {
  const [data, setData] = useState<Keterlambatan[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<Keterlambatan | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({})

  const token = Cookies.get("token")

  const fetchData = useCallback(() => {
    api.get("/keterlambatans", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setData(res.data.data))
      .finally(() => setLoading(false))
  }, [token])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmit = (form: Partial<Keterlambatan>, id?: number) => {
    const request = id
      ? api.put(`/keterlambatans/${id}`, form, { headers: { Authorization: `Bearer ${token}` } })
      : api.post(`/keterlambatans`, form, { headers: { Authorization: `Bearer ${token}` } })

    request
      .then(() => {
        fetchData()
        setOpen(false)
        setErrors({})
      })
      .catch((err) => {
        if (err.response && err.response.status === 422) {
          setErrors(err.response.data.errors)
        }
      })
  }

  const handleDelete = (id: number) => {
    if (!confirm("Yakin hapus data ini?")) return
    api.delete(`/keterlambatans/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(fetchData)
  }

  if (loading) return <p className="p-4">Loading...</p>

  return (
    <WithSidebar>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Keterlambatan Siswa</h1>
          <Button onClick={() => { setEditData(null); setOpen(true); setErrors({}) }}>+ Tambah</Button>
        </div>
        <DataTable
          columns={getColumns({
            onEdit: (item) => { setEditData(item); setOpen(true); setErrors({}) },
            onDelete: handleDelete
          })}
          data={data}
          filterKey="nama_siswa"
        />
        <FormDialog
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
          initialData={editData}
          setErrors={setErrors}
          errors={errors}
        />
      </div>
    </WithSidebar>
  )
}
