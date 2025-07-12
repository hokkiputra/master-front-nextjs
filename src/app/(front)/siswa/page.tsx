"use client"

import { useCallback, useEffect, useState } from "react"
import { columns as getColumns } from "./columns"
import { Siswa } from "./types"
import { DataTable } from "@/components/layouts/data-table"
import { FormDialog } from "./form-dialog"
import api from "@/lib/axios"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import { WithSidebar } from "@/components/layouts/with-sidebar"

export default function SiswaPage() {
  const [data, setData] = useState<Siswa[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState<Siswa | null>(null)

  const token = Cookies.get("token")

  const fetchData = useCallback(() => {
    api
      .get("/siswas", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setData(res.data.data))
      .finally(() => setLoading(false))
  }, [token])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSubmit = (form: Partial<Siswa>, id?: number) => {
    const request = id
      ? api.put(`/siswas/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        })
      : api.post(`/siswas`, form, {
          headers: { Authorization: `Bearer ${token}` },
        })

    request.then(() => {
      fetchData()
      setOpen(false)
    })
  }

  const handleDelete = (id: number) => {
    if (!confirm("Yakin hapus data ini?")) return
    api
      .delete(`/siswas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(fetchData)
  }

  if (loading) return <p className="p-4">Loading...</p>

  return (
    <WithSidebar>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Data Siswa</h1>
          <Button onClick={() => { setEditData(null); setOpen(true) }}>+ Tambah</Button>
        </div>
        <DataTable
          columns={getColumns({ onEdit: setEditData, onDelete: handleDelete })}
          data={data}
          filterKey="nama"
        />
        <FormDialog
          open={open}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
          initialData={editData}
        />
      </div>
    </WithSidebar>
  )
}
