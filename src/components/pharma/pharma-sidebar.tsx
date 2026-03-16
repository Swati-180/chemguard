
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Beaker,
  Database,
  Truck,
  Cpu,
  History,
  ShieldCheck,
  Bell,
  FileText,
  Settings,
  LogOut
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/pharma/dashboard" },
  { title: "Chemical Inventory", icon: Beaker, href: "/chemicals" },
  { title: "Batch Management", icon: Database, href: "#" },
  { title: "Shipment Requests", icon: Truck, href: "#" },
  { title: "Hardware Monitoring", icon: Cpu, href: "#" },
  { title: "Usage Logs", icon: History, href: "#" },
  { title: "Compliance Logs", icon: ShieldCheck, href: "#" },
  { title: "Alerts", icon: Bell, href: "#" },
  { title: "Reports", icon: FileText, href: "#" },
  { title: "Settings", icon: Settings, href: "#" },
]

export function PharmaSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-sidebar/50 backdrop-blur-xl">
      <SidebarHeader className="h-16 flex items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-[0_0_15px_rgba(50,250,192,0.3)]">
            <Beaker className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight group-data-[collapsible=icon]:hidden text-white">
            Pharma<span className="text-accent">Lab</span>
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/50">
            Lab Operations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href} 
                    tooltip={item.title}
                    className="px-6 py-6 transition-all hover:bg-white/5 data-[active=true]:bg-accent/10 data-[active=true]:text-accent"
                  >
                    <Link href={item.href} className="flex items-center gap-4">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 group-data-[collapsible=icon]:hidden">
        <div className="bg-white/5 rounded-xl border border-white/5 p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-accent/20">
              <AvatarImage src="https://picsum.photos/seed/pharma/40/40" />
              <AvatarFallback>PL</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-xs font-bold text-white">Lab Supervisor</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">Level 4 Clearance</p>
            </div>
          </div>
          <Link href="/login">
            <button className="text-muted-foreground hover:text-destructive transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
