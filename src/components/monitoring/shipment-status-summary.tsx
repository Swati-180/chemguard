
"use client"

import { Card, CardContent } from "@/components/ui/card"

export function ShipmentStatusSummary() {
  const statuses = [
    { label: "In Transit", value: 23, color: "text-accent", borderColor: "border-accent/20" },
    { label: "Delayed", value: 12, color: "text-orange-400", borderColor: "border-orange-400/20" },
    { label: "Critical", value: 0, color: "text-destructive", borderColor: "border-destructive/20" },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {statuses.map((s) => (
        <Card key={s.label} className={cn("glass-card border bg-white/5", s.borderColor)}>
          <CardContent className="p-3 text-center">
            <p className={cn("text-xl font-headline font-bold", s.color)}>{s.value}</p>
            <p className="text-[9px] font-bold text-muted-foreground uppercase mt-1 leading-tight">{s.label}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

import { cn } from "@/lib/utils"
