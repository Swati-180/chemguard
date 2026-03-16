"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
  { month: "Jan", na: 25000, eu: 15000, asia: 10000 },
  { month: "Feb", na: 28000, eu: 18000, asia: 12000 },
  { month: "Mar", na: 22000, eu: 20000, asia: 15000 },
  { month: "Apr", na: 30000, eu: 22000, asia: 18000 },
  { month: "May", na: 35000, eu: 28000, asia: 20000 },
  { month: "Jun", na: 32000, eu: 25000, asia: 22000 },
  { month: "Jul", na: 38000, eu: 30000, asia: 25000 },
  { month: "Aug", na: 42000, eu: 32000, asia: 28000 },
  { month: "Sep", na: 40000, eu: 35000, asia: 30000 },
  { month: "Oct", na: 45000, eu: 38000, asia: 35000 },
  { month: "Nov", na: 48000, eu: 40000, asia: 38000 },
  { month: "Dec", na: 52000, eu: 42000, asia: 40000 },
]

export function ShipmentVolumeTrends() {
  return (
    <Card className="glass-card border-white/5 bg-[#0f172a]/40 h-full">
      <CardHeader className="py-4 border-b border-white/5">
        <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest leading-tight">
          Shipment Volume Trends<br />
          <span className="text-[10px] text-muted-foreground font-normal tracking-normal normal-case">Total volume of dual-use chemical shipments over the last 12 months</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[280px] pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorNa" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorEu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorAsia" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} 
              tickFormatter={(val) => `${val/1000}k`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ fontSize: '10px' }}
            />
            <Area type="monotone" dataKey="na" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorNa)" strokeWidth={2} />
            <Area type="monotone" dataKey="eu" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorEu)" strokeWidth={2} />
            <Area type="monotone" dataKey="asia" stroke="hsl(var(--chart-3))" fillOpacity={1} fill="url(#colorAsia)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 mt-4">
           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary" /><span className="text-[8px] text-muted-foreground uppercase font-bold">North America</span></div>
           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-accent" /><span className="text-[8px] text-muted-foreground uppercase font-bold">Europe</span></div>
           <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-400" /><span className="text-[8px] text-muted-foreground uppercase font-bold">Asia</span></div>
        </div>
      </CardContent>
    </Card>
  )
}
