"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, ClipboardCheck, AlertOctagon, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Audit Events Today",
    value: "742",
    subValue: "Active Logs",
    trend: "+3.1% versus yesterday",
    alert: "Critical Audit Alert: 1",
    accent: "border-cyan-500/30",
    glow: "shadow-[0_0_15px_rgba(6,182,212,0.1)]",
    valueColor: "text-cyan-400"
  },
  {
    title: "Pending Compliance Checks",
    value: "21",
    subValue: "For Verification",
    trend: "Requires Immediate Action",
    buttonLabel: "Review Checks",
    accent: "border-emerald-500/30",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.1)]",
    valueColor: "text-emerald-400"
  },
  {
    title: "Regulatory Flags",
    value: "2",
    subValue: "Total Active Flags",
    trend: "CFR Part 11: 1 (Warning); CSAT: 1 (Compliance)",
    buttonLabel: "View Flags",
    accent: "border-cyan-500/30",
    glow: "shadow-[0_0_15px_rgba(6,182,212,0.1)]",
    valueColor: "text-cyan-400"
  }
]

export function ComplianceKpiCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <Card key={i} className={cn("glass-card bg-[#111827]/40 border", stat.accent, stat.glow)}>
          <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
            <div className="flex flex-col">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.title}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <p className={cn("text-4xl font-headline font-bold", stat.valueColor)}>{stat.value}</p>
                <span className="text-xs text-white/80 font-bold">{stat.subValue}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-[10px] font-bold text-emerald-400 uppercase">{stat.trend}</p>
                  {stat.alert && (
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                      <p className="text-[10px] font-bold text-destructive uppercase">{stat.alert}</p>
                    </div>
                  )}
                </div>
                {stat.buttonLabel && (
                  <button className={cn(
                    "px-3 py-1.5 rounded border text-[9px] font-bold uppercase tracking-wider transition-all",
                    stat.accent === 'border-emerald-500/30' 
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20"
                      : "bg-orange-500/10 border-orange-500/40 text-orange-400 hover:bg-orange-500/20"
                  )}>
                    {stat.buttonLabel}
                  </button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
