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
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/pharma/dashboard" },
  { title: "Chemical Inventory", icon: Beaker, href: "/chemicals" },
  { title: "Batch Management", icon: Database, href: "#" },
  { title: "Shipment Requests", icon: Truck, href: "/pharma/shipment-requests" },
  { title: "Hardware Monitoring", icon: Cpu, href: "/pharma/hardware-monitoring" },
  { title: "Usage Logs", icon: History, href: "/pharma/usage-logs" },
  { title: "Compliance Logs", icon: ShieldCheck, href: "/pharma/compliance", badge: "14" },
  { title: "Alerts", icon: Bell, href: "#", alert: true },
  { title: "Reports", icon: FileText, href: "#" },
  { title: "Settings", icon: Settings, href: "#" },
]

export function PharmaSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r border-white/5 bg-[#0a0f18]/50 backdrop-blur-xl">
      <SidebarHeader className="h-16 flex items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Beaker className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-headline font-bold text-sm tracking-tight text-white leading-none">
              ChemGuard <span className="text-cyan-400">AI</span>
            </span>
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Pharma Lab Portal</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 mt-4">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href} 
                    tooltip={item.title}
                    className="px-6 py-6 transition-all hover:bg-white/5 data-[active=true]:bg-cyan-500/10 data-[active=true]:text-cyan-400 text-muted-foreground border-l-2 border-transparent data-[active=true]:border-cyan-400 relative"
                  >
                    <Link href={item.href} className="flex items-center gap-4">
                      <div className="relative">
                        <item.icon className="w-5 h-5" />
                        {item.alert && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full border border-[#0a0f18]" />
                        )}
                      </div>
                      <span className="font-bold text-xs group-data-[collapsible=icon]:hidden">{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-data-[collapsible=icon]:hidden">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
