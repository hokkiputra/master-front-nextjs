"use client"

import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

// Mapping URL ke Judul yang diinginkan
const routeTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/keterlambatan/mobile": "Catat Keterlambatan",
  "/keterlambatan-sholat": "Catat Keterlambatan Sholat",
  "/siswa": "Data Siswa",
  "/keterlambatan": "Data Keterlambatan",
  "/keterlambatan-sholat-list": "List Sholat",
  "/laporan-keterlambatan": "Laporan Umum",
  "/laporan-keterlambatan-sholat": "Laporan Sholat",
}

export function SiteHeader() {
  const pathname = usePathname()

  // Ambil judul berdasarkan pathname, jika tidak ada pakai default "Documents"
  // .replace(/\/$/, "") digunakan untuk menghapus slash di akhir jika ada
  const currentTitle = routeTitles[pathname] || "Documents"

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        
        {/* Judul Dinamis */}
        <h1 className="text-base font-medium transition-all duration-300">
          {currentTitle}
        </h1>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/your-repo"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}