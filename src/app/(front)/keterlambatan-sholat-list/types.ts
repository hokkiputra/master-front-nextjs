export type KeterlambatanSholat = {
  id: number
  siswa_id: number
  siswa?: Siswa
//   nama_siswa?: string
  sholat: string
  status: "masbuk" | "bubar_awal" | "bersembunyi"
  tanggal: string
  waktu_datang?: string
  keterangan?: string
}

export interface Siswa {
  id: number
  nama: string
    kelas: string                    
  is_terlambat_hari_ini: boolean    
}