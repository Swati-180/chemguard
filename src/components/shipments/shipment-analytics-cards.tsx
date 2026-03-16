
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Truck, CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  { label: "Total Shipments Today", value: "156", icon: Truck, color: "text-primary", bg: "bg-primary/10" },
  { label: "Deliveries Completed", value: "142", icon: CheckCircle2, color: "text-accent", bg: "bg-accent/10" },
  { label: "Delayed Shipments", value: "12", icon: AlertTriangle, color: "text-orange-400", bg: "bg-orange-400/10" },
  { label: "Critical Risk Shipments", value: "2", icon: ShieldAlert, color: "text-destructive", bg: "bg-destructive/10" },
]

export function ShipmentAnalyticsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="glass-card hover:border-white/10 transition-all group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-110", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-headline font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
