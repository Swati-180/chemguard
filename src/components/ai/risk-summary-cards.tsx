
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"
import { Line, LineChart, ResponsiveContainer } from "recharts"

const sparklineData = [
  { val: 10 }, { val: 15 }, { val: 8 }, { val: 22 }, { val: 18 }, { val: 25 }, { val: 20 }
]

const stats = [
  {
    title: "LOW RISK",
    label: "78% Safe Ops Score",
    description: "No significant dual-use chemical anomalies detected.",
    icon: ShieldCheck,
    color: "text-accent",
    bgColor: "bg-accent/10",
    border: "border-accent/20",
    chartColor: "hsl(var(--accent))"
  },
  {
    title: "MEDIUM RISK",
    label: "18 Caution Alerts Active",
    description: "Minor route deviations & forecasting anomalies.",
    icon: AlertTriangle,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    border: "border-orange-400/20",
    chartColor: "#fb923c"
  },
  {
    title: "HIGH RISK",
    label: "4 Critical Anomalies Detected",
    description: "Critical Route Deviation (Munich to PharmaLab X), Inventory Discrepancy (Batch A12-04).",
    icon: ShieldAlert,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    border: "border-destructive/20",
    chartColor: "hsl(var(--destructive))"
  }
]

export function AiRiskSummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className={cn("glass-card border bg-white/5", stat.border)}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <stat.icon className={cn("w-4 h-4", stat.color)} />
                  <span className={cn("text-[10px] font-bold tracking-[0.2em]", stat.color)}>{stat.title}</span>
                </div>
                <p className="text-xl font-headline font-bold text-white">{stat.label}</p>
              </div>
              <div className="h-10 w-24">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineData}>
                    <Line type="monotone" dataKey="val" stroke={stat.chartColor} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
