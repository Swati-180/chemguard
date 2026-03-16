
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, AlertTriangle, ShieldAlert, BrainCircuit, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Low Risk Shipments",
    value: "38",
    trend: "+4",
    isUp: true,
    icon: ShieldCheck,
    color: "text-accent",
    bgColor: "bg-accent/10",
    glow: "shadow-[0_0_15px_rgba(46,255,190,0.1)]"
  },
  {
    title: "Medium Risk Shipments",
    value: "3",
    trend: "-1",
    isUp: false,
    icon: AlertTriangle,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    glow: "shadow-[0_0_15px_rgba(251,146,60,0.1)]"
  },
  {
    title: "High Risk Shipments",
    value: "1",
    trend: "+1",
    isUp: true,
    icon: ShieldAlert,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    glow: "shadow-[0_0_15px_rgba(248,113,113,0.1)]"
  },
  {
    title: "AI Predictions Today",
    value: "142",
    trend: "+12%",
    isUp: true,
    icon: BrainCircuit,
    color: "text-primary",
    bgColor: "bg-primary/10",
    glow: "shadow-[0_0_15px_rgba(46,222,255,0.1)]"
  }
]

export function AiRiskSummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className={cn("glass-card hover:border-white/10 transition-all group", stat.glow)}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2.5 rounded-xl transition-transform group-hover:scale-110", stat.bgColor)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div className={cn(
                "flex items-center text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-tighter",
                stat.isUp ? "text-accent bg-accent/10" : "text-destructive bg-destructive/10"
              )}>
                {stat.isUp ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">{stat.title}</p>
              <p className="text-3xl font-headline font-bold tracking-tight text-white">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
