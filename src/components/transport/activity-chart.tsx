"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
  { time: "08:00", active: 12, volume: 45 },
  { time: "10:00", active: 18, volume: 55 },
  { time: "12:00", active: 15, volume: 48 },
  { time: "14:00", active: 24, volume: 72 },
  { time: "16:00", active: 22, volume: 68 },
  { time: "18:00", active: 30, volume: 85 },
  { time: "20:00", active: 25, volume: 78 },
]

export function ShipmentActivityChart() {
  return (
    <Card className="glass-card bg-white/[0.02] border-white/5">
      <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02]">
        <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Shipment Activity Profile (24h)</CardTitle>
      </CardHeader>
      <CardContent className="h-[220px] pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
            <YAxis hide />
            <Tooltip contentStyle={{ backgroundColor: '#0a0f18', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
            <Area type="monotone" dataKey="active" stroke="#f97316" fillOpacity={1} fill="url(#activeGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
