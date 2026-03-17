
"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const data = [
  { month: "Jan", batches: 12 },
  { month: "Feb", batches: 18 },
  { month: "Mar", batches: 15 },
  { month: "Apr", batches: 22 },
  { month: "May", batches: 30 },
  { month: "Jun", batches: 25 },
]

export function ExpiryTimelineChart() {
  return (
    <Card className="glass-card border-white/5 bg-white/[0.02]">
      <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02]">
        <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest leading-none">
          Batch Expiry Timeline <br />
          <span className="text-[8px] text-muted-foreground normal-case font-normal tracking-normal">(Projected 6 months)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[200px] pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#050b14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ fontSize: '10px', color: '#fff' }}
            />
            <Line 
              type="monotone" 
              dataKey="batches" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2} 
              dot={{ r: 3, fill: 'hsl(var(--primary))', strokeWidth: 0 }}
              activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
