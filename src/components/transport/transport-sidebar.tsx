
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Truck,
  Map as MapIcon,
  Cpu,
  ClipboardList,
  Bell,
  History,
  FileText,
  Settings,
  ChevronDown,
  Navigation
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
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@/firebase"

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/transport/dashboard" },
  { title: "Active Shipments", icon: Truck, href: "/transport/shipments" },
  { title: "Live Route Tracking", icon: MapIcon, href: "/transport/routes" },
  { title: "Hardware Monitoring", icon: Cpu, href: "/transport/hardware" },
  { title: "Checkpoint Logs", icon: ClipboardList, href: "/transport/checkpoints" },
  { title: "Alerts & Incidents", icon: Bell, href: "/transport/alerts", badge: "2" },
  { title: "Shipment History", icon: History, href: "/transport/history" },
  { title: "Reports", icon: FileText, href: "/transport/reports" },
  { title: "Settings", icon: Settings, href: "/transport/settings" },
]

export function TransportSidebar() {
  const pathname = usePathname()
  const { user } = useUser()

  return (
    <Sidebar collapsible="icon" className="border-r border-white/5 bg-[#0a0f18]/80 backdrop-blur-2xl">
      <SidebarHeader className="h-16 flex items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.2)]">
            <Navigation className="w-4 h-4 text-orange-400" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-headline font-bold text-sm tracking-tight text-white leading-none">
              ChemGuard <span className="text-orange-400">Logistics</span>
            </span>
            <span className="text-[8px] text-muted-foreground uppercase font-bold tracking-[0.2em] mt-1">Global SOC Transporter</span>
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
                    className="px-6 py-6 transition-all hover:bg-white/5 data-[active=true]:bg-orange-500/10 data-[active=true]:text-orange-400 text-muted-foreground border-l-2 border-transparent data-[active=true]:border-orange-400 relative group"
                  >
                    <Link href={item.href} className="flex items-center gap-4">
                      <item.icon className="w-5 h-5" />
                      <span className="font-bold text-xs group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-destructive/20 text-destructive border border-destructive/30 group-data-[collapsible=icon]:hidden animate-pulse">
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
      
      <SidebarFooter className="p-4 group-data-[collapsible=icon]:hidden">
        <div className="bg-white/5 rounded-xl border border-white/10 p-3 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer group">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-orange-500/20 p-0.5">
              <AvatarImage src={`https://picsum.photos/seed/${user?.uid}/40/40`} />
              <AvatarFallback className="bg-orange-500/10 text-orange-400">TR</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-xs font-bold text-white">{user?.displayName || "Logistics Operator"}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-tighter font-bold">Fleet Manager</p>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
