
"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { name: "In Stock", value: 65, color: "hsl(var(--accent))" },
  { name: "In Use", value: 20, color: "hsl(var(--primary))" },
  { name: "Quarantined", value: 10, color: "hsl(var(--chart-4))" },
  { name: "Expired", value: 5, color: "hsl(var(--destructive))" },
]

export function DistributionPieChart() {
  return (
    <Card className="glass-card border-white/5 h-full">
      <CardHeader className="py-4 border-b border-white/5">
        <CardTitle className="text-sm font-headline font-semibold text-muted-foreground uppercase tracking-widest">Inventory Distribution by Status</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center pt-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#1A2633', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: '#fff', fontSize: '10px' }}
            />
            <Legend 
              verticalAlign="middle" 
              align="right" 
              layout="vertical"
              iconType="circle"
              formatter={(value) => <span className="text-[10px] text-muted-foreground uppercase font-bold ml-2">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-x-0 top-[55%] flex flex-col items-center justify-center pointer-events-none">
          <p className="text-[10px] text-muted-foreground uppercase font-bold">Total Tons</p>
          <p className="text-2xl font-headline font-bold text-white">110</p>
        </div>
      </CardContent>
    </Card>
  )
}
