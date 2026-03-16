
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const timelineSteps = [
  { time: "10:00 AM", event: "Order Confirmed", status: "completed", color: "bg-accent" },
  { time: "14:35 AM", event: "Batch 789 Assigned", status: "completed", color: "bg-accent" },
  { time: "19:00 AM", event: "Departure (Lab A-04)", status: "completed", color: "bg-primary" },
  { time: "12:40 AM", event: "Route Checkpoint 1 (Paris)", status: "active", color: "bg-primary" },
  { time: "14:45 AM", event: "Checkpoint 2 (Anomaly Detected Near Berlin, investigating -", status: "warning", color: "bg-orange-400" },
  { time: "14:30 AM", event: "Checkpoint 3 (Investigating - Red)", status: "critical", color: "bg-destructive" },
  { time: "10:00 AM", event: "Scheduled ETA", status: "pending", color: "bg-white/20" },
]

export function ShipmentTimeline() {
  return (
    <Card className="glass-card border-white/5 h-full">
      <CardHeader className="py-4 border-b border-white/5">
        <CardTitle className="text-sm font-headline font-semibold text-white uppercase tracking-widest">
          Shipment Progress Timeline <br />
          <span className="text-[10px] text-muted-foreground tracking-normal">(#SH-8822)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 relative">
        <div className="absolute left-[88px] top-6 bottom-6 w-0.5 bg-white/10" />
        <div className="space-y-8">
          {timelineSteps.map((step, idx) => (
            <div key={idx} className="flex gap-6 relative z-10">
              <div className="w-16 text-right pt-0.5">
                <p className="text-[10px] font-mono text-muted-foreground">{step.time}</p>
              </div>
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-3 h-3 rounded-full border-2 border-background shadow-[0_0_8px_rgba(255,255,255,0.1)]",
                  step.color,
                  step.status === "critical" && "animate-pulse"
                )} />
              </div>
              <div className="flex-1">
                <p className={cn(
                  "text-[11px] font-bold uppercase tracking-tight",
                  step.status === "critical" ? "text-destructive" : 
                  step.status === "warning" ? "text-orange-400" : "text-white"
                )}>
                  {step.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
