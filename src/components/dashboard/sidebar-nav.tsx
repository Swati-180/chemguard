"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Activity,
  Beaker,
  Truck,
  Cpu,
  BrainCircuit,
  Bell,
  Users,
  ShieldCheck,
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
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
  { title: "Live Monitoring", icon: Activity, href: "/live-monitoring" },
  { title: "Chemicals", icon: Beaker, href: "/chemicals" },
  { title: "Shipments", icon: Truck, href: "/shipments" },
  { title: "Hardware Monitoring", icon: Cpu, href: "/hardware-monitoring" },
  { title: "AI Intelligence", icon: BrainCircuit, href: "/ai-intelligence" },
  { title: "Alerts", icon: Bell, href: "#" },
  { title: "Users", icon: Users, href: "/users" },
  { title: "Compliance", icon: ShieldCheck, href: "/compliance" },
  { title: "Reports", icon: FileText, href: "/reports" },
  { title: "Settings", icon: Settings, href: "#" },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-sidebar/50 backdrop-blur-xl">
      <SidebarHeader className="h-16 flex items-center px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center neon-glow-cyan">
            <ShieldCheck className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight group-data-[collapsible=icon]:hidden">
            ChemGuard <span className="text-primary">AI</span>
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground/50">
            Operations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href} 
                    tooltip={item.title}
                    className="px-6 py-6 transition-all hover:bg-white/5 data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
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
            <Avatar className="h-9 w-9 border border-primary/20">
              <AvatarImage src="https://picsum.photos/seed/admin/40/40" />
              <AvatarFallback>EV</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-xs font-bold text-white">Dr. Elena Vance</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">Admin Operations</p>
            </div>
          </div>
          <button className="text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
