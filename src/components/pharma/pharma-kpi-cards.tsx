
"use client"

import { Beaker, Database, ClipboardCheck, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const kpis = [
  {
    title: "Inventory Status",
    value: "1,284 L",
    trend: "+4.2%",
    isUp: true,
    icon: Beaker,
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    title: "Active Batches",
    value: "18",
    trend: "+2",
    isUp: true,
    icon: Database,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Pending Shipments",
    value: "5",
    trend: "Stable",
    isUp: true,
    icon: ClipboardCheck,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10"
  },
  {
    title: "Compliance Alerts",
    value: "0",
    trend: "-100%",
    isUp: false,
    icon: AlertTriangle,
    color: "text-accent",
    bgColor: "bg-accent/10"
  }
]

export function PharmaKpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="glass-card hover:border-white/10 transition-all group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg transition-transform group-hover:scale-110", kpi.bgColor)}>
                <kpi.icon className={cn("w-5 h-5", kpi.color)} />
              </div>
              <div className={cn(
                "flex items-center text-xs font-medium px-2 py-1 rounded-full",
                kpi.isUp && kpi.color === 'text-accent' ? "text-accent bg-accent/10" : "text-primary bg-primary/10"
              )}>
                {kpi.trend !== "Stable" && (kpi.isUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />)}
                {kpi.trend}
              </div>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-1">{kpi.title}</p>
              <p className="text-2xl font-headline font-bold tracking-tight text-white">{kpi.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
