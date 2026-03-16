"use client"

import { Beaker, Truck, Cpu, AlertTriangle, ShieldCheck, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const kpis = [
  {
    title: "Total Chemical Batches",
    value: "1,284",
    trend: "+12%",
    isUp: true,
    icon: Beaker,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Active Shipments",
    value: "42",
    trend: "+5%",
    isUp: true,
    icon: Truck,
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    title: "Connected IoT Devices",
    value: "856",
    trend: "-2%",
    isUp: false,
    icon: Cpu,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10"
  },
  {
    title: "Critical Alerts",
    value: "3",
    trend: "+1",
    isUp: true,
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10"
  },
  {
    title: "Compliance Score",
    value: "98.4%",
    trend: "+0.2%",
    isUp: true,
    icon: ShieldCheck,
    color: "text-accent",
    bgColor: "bg-accent/10"
  }
]

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="glass-card hover:border-white/10 transition-all group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg transition-transform group-hover:scale-110", kpi.bgColor)}>
                <kpi.icon className={cn("w-5 h-5", kpi.color)} />
              </div>
              <div className={cn(
                "flex items-center text-xs font-medium px-2 py-1 rounded-full",
                kpi.isUp ? "text-accent bg-accent/10" : "text-destructive bg-destructive/10"
              )}>
                {kpi.isUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {kpi.trend}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">{kpi.title}</p>
              <p className="text-2xl font-headline font-bold tracking-tight">{kpi.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
