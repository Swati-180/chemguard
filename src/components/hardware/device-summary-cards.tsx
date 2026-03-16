
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Navigation, Thermometer, Lock, Video, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const devices = [
  {
    title: "GPS Tracking Devices",
    icon: Navigation,
    total: "12,450",
    stats: [
      { label: "Online", value: "12,380", color: "text-accent" },
      { label: "Offline", value: "50", color: "text-destructive" },
      { label: "Tamper Event", value: "20", color: "text-orange-400" },
    ],
    status: "Green / Optimal",
    statusColor: "text-accent",
    accentColor: "border-accent/20 bg-accent/5",
    iconColor: "text-accent"
  },
  {
    title: "Temperature Sensors",
    icon: Thermometer,
    total: "35,000",
    stats: [
      { label: "Online", value: "34,950", color: "text-accent" },
      { label: "High Temp", value: "35", color: "text-orange-400" },
      { label: "Malfunction", value: "15", color: "text-destructive" },
    ],
    status: "Green / Stable",
    statusColor: "text-accent",
    accentColor: "border-primary/20 bg-primary/5",
    iconColor: "text-primary"
  },
  {
    title: "Tamper Sensors",
    icon: Lock,
    total: "8,700",
    stats: [
      { label: "Online", value: "8,620", color: "text-accent" },
      { label: "Active Alert", value: "50", color: "text-destructive" },
      { label: "Tamper Event", value: "30", color: "text-orange-400" },
    ],
    status: "Red / Investigating",
    statusColor: "text-destructive",
    accentColor: "border-destructive/20 bg-destructive/5",
    iconColor: "text-destructive"
  },
  {
    title: "Checkpoint Cameras",
    icon: Video,
    total: "1,200",
    stats: [
      { label: "Online", value: "1,185", color: "text-accent" },
      { label: "Motion Alert", value: "12", color: "text-orange-400" },
      { label: "Offline", value: "3", color: "text-destructive" },
    ],
    status: "Green / Operational",
    statusColor: "text-accent",
    accentColor: "border-accent/20 bg-accent/5",
    iconColor: "text-accent"
  }
]

export function DeviceSummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {devices.map((device) => (
        <Card key={device.title} className={cn("glass-card border", device.accentColor)}>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg bg-background border border-white/5 shadow-sm", device.iconColor)}>
                  <device.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-headline font-bold uppercase tracking-tight text-white/90">{device.title}</h3>
              </div>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase font-medium">Total</p>
                <p className="text-2xl font-headline font-bold text-white tracking-tight">{device.total}</p>
              </div>
              <div className="space-y-1">
                 {device.stats.map(stat => (
                   <div key={stat.label} className="flex items-center justify-between text-[10px]">
                     <span className="text-muted-foreground">{stat.label}</span>
                     <span className={cn("font-bold ml-2", stat.color)}>{stat.value}</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
              <span className={cn("text-[9px] font-bold uppercase tracking-wider", device.statusColor)}>
                Overall: {device.status}
              </span>
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
