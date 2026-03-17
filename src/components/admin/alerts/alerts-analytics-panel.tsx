"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, 
  LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from "recharts"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection } from "firebase/firestore"
import { cn } from "@/lib/utils"

const trendData = [
  { time: "00:00", val: 2 },
  { time: "04:00", val: 5 },
  { time: "08:00", val: 12 },
  { time: "12:00", val: 8 },
  { time: "16:00", val: 15 },
  { time: "20:00", val: 10 },
  { time: "23:59", val: 4 },
]

export function AlertsAnalyticsPanel() {
  const db = useFirestore()
  const q = useMemoFirebase(() => collection(db, "transport_alerts"), [db])
  const { data: alerts } = useCollection(q)

  const distribution = React.useMemo(() => {
    if (!alerts) return []
    const counts = { Critical: 0, Warning: 0, Info: 0 }
    alerts.forEach(a => { 
      if (counts[a.severity as keyof typeof counts] !== undefined) {
        counts[a.severity as keyof typeof counts]++ 
      }
    })
    return [
      { name: "Critical", value: counts.Critical, color: "#ef4444" },
      { name: "Warning", value: counts.Warning, color: "#f97316" },
      { name: "Info", value: counts.Info, color: "#2edeff" },
    ]
  }, [alerts])

  const locations = React.useMemo(() => {
    if (!alerts) return []
    const locCounts: Record<string, number> = {}
    alerts.forEach(a => { locCounts[a.location] = (locCounts[a.location] || 0) + 1 })
    return Object.entries(locCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
  }, [alerts])

  return (
    <div className="space-y-6">
      {/* Donut: Alert Distribution */}
      <Card className="glass-card border-white/5 bg-white/[0.02]">
        <CardHeader className="py-4 border-b border-white/5">
          <CardTitle className="text-[10px] font-bold text-white uppercase tracking-widest">Alert Severity Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[220px] flex items-center justify-center p-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distribution}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#050b14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 pr-6">
            {distribution.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[8px] font-bold text-muted-foreground uppercase">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bar: Alerts by Location */}
      <Card className="glass-card border-white/5 bg-white/[0.02]">
        <CardHeader className="py-4 border-b border-white/5">
          <CardTitle className="text-[10px] font-bold text-white uppercase tracking-widest">Hotspot Frequency (Location)</CardTitle>
        </CardHeader>
        <CardContent className="h-[220px] pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={locations}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" hide />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 8}} />
              <Tooltip contentStyle={{ backgroundColor: '#050b14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
              <Bar dataKey="value" fill="#2edeff" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Line: Alerts Trend */}
      <Card className="glass-card border-white/5 bg-white/[0.02]">
        <CardHeader className="py-4 border-b border-white/5">
          <CardTitle className="text-[10px] font-bold text-white uppercase tracking-widest">Incidence Volume (Last 24h)</CardTitle>
        </CardHeader>
        <CardContent className="h-[220px] pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 8}} />
              <YAxis hide />
              <Tooltip contentStyle={{ backgroundColor: '#050b14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
              <Line type="monotone" dataKey="val" stroke="#ef4444" strokeWidth={2} dot={{ r: 3, fill: '#ef4444' }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
