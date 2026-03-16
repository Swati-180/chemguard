
"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { time: "08:00", ammonia: 45, sulfuric: 30 },
  { time: "10:00", ammonia: 52, sulfuric: 45 },
  { time: "12:00", ammonia: 48, sulfuric: 60 },
  { time: "14:00", ammonia: 70, sulfuric: 55 },
  { time: "16:00", ammonia: 65, sulfuric: 40 },
  { time: "18:00", ammonia: 58, sulfuric: 35 },
  { time: "20:00", ammonia: 50, sulfuric: 30 },
]

export function PharmaAnalyticsCharts() {
  return (
    <Card className="glass-card">
      <CardHeader className="border-b border-white/5 bg-white/2 py-4">
        <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Chemical Usage Velocity (24h)</CardTitle>
      </CardHeader>
      <CardContent className="h-[350px] pt-6">
        <ChartContainer config={{ 
          ammonia: { label: "Ammonia", color: "hsl(var(--accent))" },
          sulfuric: { label: "Sulfuric Acid", color: "hsl(var(--primary))" }
        }}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorAmmonia" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorSulfuric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
            <YAxis hide />
            <Tooltip content={<ChartTooltipContent />} />
            <Area type="monotone" dataKey="ammonia" stroke="hsl(var(--accent))" fillOpacity={1} fill="url(#colorAmmonia)" strokeWidth={2} />
            <Area type="monotone" dataKey="sulfuric" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSulfuric)" strokeWidth={2} />
          </AreaChart>
        </ChartContainer>
        <div className="flex items-center justify-center gap-6 mt-4 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-accent" /> Ammonia Consumption</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary" /> Sulfuric Acid Log</div>
        </div>
      </CardContent>
    </Card>
  )
}
