"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ShieldAlert, AlertTriangle, Info, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const alertStats = [
  {
    title: "Critical Alerts",
    value: "04",
    description: "Immediate Response Required",
    icon: ShieldAlert,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/30",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",
    pulse: true
  },
  {
    title: "Warning Alerts",
    value: "12",
    description: "Secondary Verification Pending",
    icon: AlertTriangle,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    border: "border-orange-400/30",
    glow: "shadow-[0_0_20px_rgba(251,146,60,0.1)]"
  },
  {
    title: "Info Alerts",
    value: "28",
    description: "System Events & Notifications",
    icon: Info,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/30",
    glow: "shadow-[0_0_20px_rgba(34,211,238,0.1)]"
  },
  {
    title: "Resolved Incidents",
    value: "142",
    description: "Successfully Handled (24h)",
    icon: CheckCircle2,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/30",
    glow: "shadow-[0_0_20px_rgba(52,211,153,0.1)]"
  }
]

export function AlertsKpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {alertStats.map((stat, i) => (
        <Card key={i} className={cn("glass-card bg-[#111827]/40 border overflow-hidden", stat.border, stat.glow)}>
          <CardContent className="p-6 relative">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">{stat.title}</p>
                <p className={cn("text-4xl font-headline font-bold", stat.color)}>{stat.value}</p>
              </div>
              <div className={cn("p-2.5 rounded-xl border", stat.bg, stat.border)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {stat.pulse && (
                <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-ping" />
              )}
              <p className="text-[10px] font-bold text-white/60 uppercase tracking-tighter">{stat.description}</p>
            </div>
            
            {/* Background Decorative Element */}
            <div className={cn("absolute -bottom-4 -right-4 w-20 h-20 opacity-5 blur-2xl rounded-full", stat.bg)} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
