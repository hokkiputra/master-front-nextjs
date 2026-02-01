"use client"

import * as React from "react"
import {
  IconUser,
  IconClock,
  IconInnerShadowTop,
  IconUsers,           // Untuk Data Siswa
  IconFileText,        // Untuk Laporan
  IconClipboardList,   // Untuk List/Daftar
  IconPray,            // Untuk Sholat (Alternatif)
  IconMoodSad,         // Untuk Keterlambatan
} from "@tabler/icons-react"

import { NavMain } from "@/components/layouts/nav-main"
import { NavUser } from "@/components/layouts/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navMain = [
  {
    title: "Keterlambatan",
    url: "/keterlambatan/mobile",
    icon: IconPray, // Lebih relevan untuk ibadah/sholat
  },
  {
    title: "Keterlambatan Sholat",
    url: "/keterlambatan-sholat",
    icon: IconPray, // Lebih relevan untuk ibadah/sholat
  },
  {
    title: "Data Siswa",
    url: "/siswa",
    icon: IconUsers, // Icon grup user lebih cocok untuk data siswa
  },
  {
    title: "List Keterlambatan",
    url: "/keterlambatan",
    icon: IconClock, 
  },
  {
    title: "List Keterlambatan Sholat",
    url: "/keterlambatan-sholat-list",
    icon: IconClipboardList, // Icon daftar/list
  },
  {
    title: "Laporan Keterlambatan",
    url: "/laporan-keterlambatan",
    icon: IconFileText, // Icon dokumen/laporan
  },
  {
    title: "Laporan Keterlambatan Sholat",
    url: "/laporan-keterlambatan-sholat",
    icon: IconFileText, 
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Sahil APP</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}