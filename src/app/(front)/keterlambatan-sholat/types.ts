export type KeterlambatanSholat = {
  id: number
  siswa_id: number
  siswa?: Siswa
  sholat: string
  tanggal: string
  status: "masbuk" | "bubar_awal" | "bersembunyi"
  keterangan?: string
}

export interface Siswa {
  id: number
  nama: string
  kelas: string
}
