"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Beaker, Truck, Cpu, AlertTriangle, ShieldCheck, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Line, LineChart, ResponsiveContainer } from "recharts"
import { Badge } from "@/components/ui/badge"

const sparklineData = [
  { val: 10 }, { val: 15 }, { val: 8 }, { val: 22 }, { val: 18 }, { val: 25 }, { val: 20 }
]

const stats = [
  {
    title: "Total Chemical Batches",
    value: "34,561",
    trend: "+2.5% vs last week",
    icon: Beaker,
    status: "Compliance Verified",
    statusColor: "text-accent bg-accent/20 border-accent/30",
    chartColor: "hsl(var(--accent))"
  },
  {
    title: "Active Shipments",
    value: "1,298",
    trend: "+2.5%",
    icon: Truck,
    status: "Compliance Status: Secure",
    statusColor: "text-primary bg-primary/20 border-primary/30",
    chartColor: "hsl(var(--primary))"
  },
  {
    title: "Connected IoT Devices",
    value: "18,742",
    icon: Cpu,
    status: "Health Status: Green",
    statusColor: "text-accent bg-accent/20 border-accent/30",
    chartColor: "hsl(var(--accent))"
  },
  {
    title: "Critical Alerts",
    value: "73",
    trend: "+15%",
    icon: AlertTriangle,
    status: "Status: Investigating",
    statusColor: "text-destructive bg-destructive/20 border-destructive/30",
    chartColor: "hsl(var(--destructive))"
  },
  {
    title: "Compliance Score",
    value: "97%",
    icon: ShieldCheck,
    status: "Stsen",
    statusColor: "text-primary bg-primary/20 border-primary/30",
    chartColor: "hsl(var(--primary))"
  }
]

export function ComplianceSummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="glass-card bg-[#0f172a]/50 border-white/5 hover:border-white/10 transition-all group overflow-hidden">
          <CardContent className="p-4 flex flex-col h-full justify-between">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <stat.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{stat.title}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-headline font-bold text-white tracking-tight">{stat.value}</p>
                  {stat.trend && (
                    <span className="text-[9px] text-accent flex items-center gap-0.5">
                      <ArrowUpRight className="w-2.5 h-2.5" />
                      {stat.trend}
                    </span>
                  )}
                </div>
              </div>
              <div className="h-8 w-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineData}>
                    <Line type="monotone" dataKey="val" stroke={stat.chartColor} strokeWidth={1.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <Badge variant="outline" className={cn("text-[9px] font-bold uppercase tracking-tighter py-0 h-5 w-fit", stat.statusColor)}>
              {stat.status}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
