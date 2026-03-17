
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Beaker, Database, Clock, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChemicalKpiCardsProps {
  inventory: any[]
}

export function ChemicalKpiCards({ inventory }: ChemicalKpiCardsProps) {
  const totalChemicals = inventory.length
  const activeBatches = inventory.filter(i => i.status === "In Stock").length
  const expiringSoon = inventory.filter(i => {
    if (!i.expiryDate) return false
    const expiry = new Date(i.expiryDate)
    const today = new Date()
    const diff = (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    return diff > 0 && diff < 30
  }).length
  const criticalAlerts = inventory.filter(i => i.status === "Expired" || i.status === "Quarantined").length

  const stats = [
    {
      title: "Total Chemicals",
      value: totalChemicals,
      trend: "+2.4%",
      isUp: true,
      icon: Beaker,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20"
    },
    {
      title: "Active Batches",
      value: activeBatches,
      trend: "+12",
      isUp: true,
      icon: Database,
      color: "text-accent",
      bg: "bg-accent/10",
      border: "border-accent/20"
    },
    {
      title: "Expiring Soon",
      value: expiringSoon,
      trend: "-5%",
      isUp: false,
      icon: Clock,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      border: "border-orange-500/20"
    },
    {
      title: "Critical Alerts",
      value: criticalAlerts,
      trend: "+3",
      isUp: true,
      icon: AlertTriangle,
      color: "text-destructive",
      bg: "bg-destructive/10",
      border: "border-destructive/20"
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className={cn("glass-card bg-white/[0.02] border transition-all hover:scale-[1.02]", stat.border)}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2.5 rounded-xl border border-white/5", stat.bg, stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={cn(
                "flex items-center text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter",
                stat.isUp ? "text-accent bg-accent/10" : "text-destructive bg-destructive/10"
              )}>
                {stat.isUp ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {stat.trend}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">{stat.title}</p>
              <p className="text-3xl font-headline font-bold text-white tabular-nums">{stat.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
