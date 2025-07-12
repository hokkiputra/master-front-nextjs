export interface Keterlambatan {
  id: number
  siswa_id: number
  tanggal: string
  waktu_datang: string
  status: string
  keterangan?: string
  nama_siswa?: string
  kelas?: string
  siswa?: {
    nama: string
    kelas?: string
  }
}

export interface Siswa {
  id: number
  nama: string
    kelas: string                    
  is_terlambat_hari_ini: boolean    
}
