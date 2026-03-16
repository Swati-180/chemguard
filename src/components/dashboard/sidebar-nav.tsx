"use client"

import * as React from "react"
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
  Settings
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
} from "@/components/ui/sidebar"

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, isActive: true },
  { title: "Live Monitoring", icon: Activity },
  { title: "Chemicals", icon: Beaker },
  { title: "Shipments", icon: Truck },
  { title: "Hardware Monitoring", icon: Cpu },
  { title: "AI Intelligence", icon: BrainCircuit },
  { title: "Alerts", icon: Bell },
  { title: "Users", icon: Users },
  { title: "Compliance", icon: ShieldCheck },
  { title: "Reports", icon: FileText },
  { title: "Settings", icon: Settings },
]

export function DashboardSidebar() {
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
                    isActive={item.isActive} 
                    tooltip={item.title}
                    className="px-6 py-6 transition-all hover:bg-white/5 data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
                  >
                    <a href="#" className="flex items-center gap-4">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </a>
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
