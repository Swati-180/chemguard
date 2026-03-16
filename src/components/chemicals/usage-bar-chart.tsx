
"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "Cyanide", value: 55 },
  { name: "Ammonia", value: 34 },
  { name: "Acetic", value: 23 },
  { name: "Sulphur", value: 16 },
  { name: "Hydrochloric", value: 9 },
  { name: "Other", value: 5 },
]

export function UsageBarChart() {
  return (
    <Card className="glass-card border-white/5 h-full">
      <CardHeader className="py-4 border-b border-white/5">
        <CardTitle className="text-sm font-headline font-semibold text-primary uppercase tracking-widest">Most Used Chemicals (Tons)</CardTitle>
      </CardHeader>
      <CardContent className="h-[280px] pt-6">
        <ChartContainer config={{ value: { label: "Quantity", color: "hsl(var(--primary))" } }}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} 
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? 'hsl(var(--primary))' : 'hsl(var(--primary))'} fillOpacity={1 - index * 0.15} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
