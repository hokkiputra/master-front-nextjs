"use client"

import * as React from "react"
import {
  IconUser,
  IconClock,
  IconInnerShadowTop,
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
    title: "Keterlambatan Sholat",
    url: "/keterlambatan-sholat",
    icon: IconUser,
  },
  {
    title: "Data Siswa",
    url: "/siswa",
    icon: IconUser,
  },
  {
    title: "Keterlambatan",
    url: "/keterlambatan",
    icon: IconClock,
  },
  {
    title: "Keterlambatan Sholat List",
    url: "/keterlambatan-sholat-list",
    icon: IconClock,
  },
  {
    title: "Laporan Keterlambatan",
    url: "/laporan-keterlambatan",
    icon: IconClock,
  },
    {
    title: "Laporan Keterlambatan Sholat",
    url: "/laporan-keterlambatan-sholat",
    icon: IconClock,
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
