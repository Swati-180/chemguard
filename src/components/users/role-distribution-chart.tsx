"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MoreVertical } from "lucide-react"

const data = [
  { name: "Admin", value: 12, color: "hsl(var(--primary))" },
  { name: "Lab Manager", value: 84, color: "hsl(var(--accent))" },
  { name: "Driver", value: 384, color: "#fb923c" },
  { name: "Compliance", value: 45, color: "hsl(var(--destructive))" },
]

export function RoleDistributionChart() {
  return (
    <Card className="glass-card border-white/5 bg-white/5">
      <CardHeader className="py-4 border-b border-white/5 flex flex-row items-center justify-between">
        <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest leading-tight">Role Distribution</CardTitle>
        <MoreVertical className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="h-[250px] p-6 pt-2">
        <div className="flex h-full gap-4">
          <ResponsiveContainer width="60%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ fontSize: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="flex flex-col justify-center gap-3">
             {data.map(item => (
               <div key={item.name} className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                 <span className="text-[10px] font-bold text-muted-foreground uppercase whitespace-nowrap">{item.name}</span>
               </div>
             ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
