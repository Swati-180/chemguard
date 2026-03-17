
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ShieldAlert, AlertTriangle, CheckCircle2, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection } from "firebase/firestore"
import { cn } from "@/lib/utils"
import { Line, LineChart, ResponsiveContainer } from "recharts"

const sparkData = [
  { val: 10 }, { val: 15 }, { val: 8 }, { val: 22 }, { val: 18 }, { val: 25 }, { val: 20 }
]

export function AlertsKpiCards() {
  const db = useFirestore()
  const q = useMemoFirebase(() => collection(db, "transport_alerts"), [db])
  const { data: alerts } = useCollection(q)

  const critical = alerts?.filter(a => a.severity === 'Critical' && a.status !== 'Resolved').length || 0
  const warnings = alerts?.filter(a => a.severity === 'Warning' && a.status !== 'Resolved').length || 0
  const resolved = alerts?.filter(a => a.status === 'Resolved').length || 0
  const totalLast24 = alerts?.filter(a => {
    const timestamp = new Date(a.timestamp).getTime()
    return Date.now() - timestamp < 86400000
  }).length || 0

  const stats = [
    {
      title: "Critical Alerts",
      value: critical,
      color: "text-destructive",
      bg: "bg-destructive/10",
      border: "border-destructive/30",
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",
      icon: ShieldAlert,
      chartColor: "#ef4444"
    },
    {
      title: "Active Warnings",
      value: warnings,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      border: "border-orange-400/30",
      glow: "shadow-[0_0_20px_rgba(249,115,22,0.1)]",
      icon: AlertTriangle,
      chartColor: "#f97316"
    },
    {
      title: "Resolved Incidents",
      value: resolved,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/30",
      glow: "shadow-[0_0_20px_rgba(16,185,129,0.1)]",
      icon: CheckCircle2,
      chartColor: "#10b981"
    },
    {
      title: "Total (Last 24h)",
      value: totalLast24,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/30",
      glow: "shadow-[0_0_20px_rgba(46,222,255,0.1)]",
      icon: Activity,
      chartColor: "#2edeff"
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className={cn("glass-card bg-white/[0.02] border transition-all hover:scale-[1.02]", stat.border, stat.glow)}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2.5 rounded-xl border", stat.bg, stat.border, stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="h-10 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparkData}>
                    <Line type="monotone" dataKey="val" stroke={stat.chartColor} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">{stat.title}</p>
              <p className="text-4xl font-headline font-bold text-white tabular-nums">{stat.value.toString().padStart(2, '0')}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
