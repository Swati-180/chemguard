"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { 
  Area, AreaChart, 
  Pie, PieChart, Cell, 
  Bar, BarChart, 
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend 
} from "recharts"
import { MoreHorizontal } from "lucide-react"

const usageData = [
  { month: "Jan", val1: 30, val2: 45 },
  { month: "Feb", val1: 40, val2: 35 },
  { month: "Mar", val1: 65, val2: 55 },
  { month: "Apr", val1: 50, val2: 70 },
  { month: "May", val1: 85, val2: 60 },
  { month: "Jun", val1: 70, val2: 80 },
  { month: "Jul", val1: 90, val2: 75 },
  { month: "Aug", val1: 110, val2: 85 },
]

const distributionData = [
  { name: "Chemical A", value: 30, color: "#06b6d4" },
  { name: "Chemical B", value: 20, color: "#10b981" },
  { name: "Chemical C", value: 15, color: "#8b5cf6" },
  { name: "Chemical type", value: 25, color: "#f43f5e" },
  { name: "Others", value: 10, color: "#eab308" },
]

const timelineData = [
  { week: "1 week", val1: 120, val2: 60 },
  { week: "2 week", val1: 140, val2: 100 },
  { week: "3 week", val1: 110, val2: 80 },
  { week: "4 week", val1: 160, val2: 120 },
  { week: "5 week", val1: 130, val2: 90 },
  { week: "8 week", val1: 190, val2: 110 },
]

export function PharmaDashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Chemical Usage Trend */}
      <Card className="lg:col-span-4 glass-card bg-[#111827]/40 border-white/5">
        <CardHeader className="py-4 flex flex-row items-center justify-between border-b border-white/5">
          <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Chemical Usage Trend</CardTitle>
          <MoreHorizontal className="w-4 h-4 text-muted-foreground/50 cursor-pointer" />
        </CardHeader>
        <CardContent className="h-[280px] pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={usageData}>
              <defs>
                <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ fontSize: '10px' }}
              />
              <Area type="monotone" dataKey="val1" stroke="#10b981" fillOpacity={1} fill="url(#color1)" strokeWidth={2} />
              <Area type="monotone" dataKey="val2" stroke="#06b6d4" fillOpacity={1} fill="url(#color2)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Inventory Distribution */}
      <Card className="lg:col-span-4 glass-card bg-[#111827]/40 border-white/5">
        <CardHeader className="py-4 flex flex-row items-center justify-between border-b border-white/5">
          <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Inventory Distribution</CardTitle>
          <MoreHorizontal className="w-4 h-4 text-muted-foreground/50 cursor-pointer" />
        </CardHeader>
        <CardContent className="h-[280px] flex items-center justify-center p-0">
          <div className="relative w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="40%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '10px' }}
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
          </div>
        </CardContent>
      </Card>

      {/* Shipment Requests Timeline */}
      <Card className="lg:col-span-4 glass-card bg-[#111827]/40 border-white/5">
        <CardHeader className="py-4 flex flex-row items-center justify-between border-b border-white/5">
          <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Shipment Requests Timeline</CardTitle>
          <MoreHorizontal className="w-4 h-4 text-muted-foreground/50 cursor-pointer" />
        </CardHeader>
        <CardContent className="h-[280px] pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timelineData}>
              <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ fontSize: '10px' }}
              />
              <Bar dataKey="val1" fill="#06b6d4" radius={[4, 4, 0, 0]} barSize={12} />
              <Bar dataKey="val2" fill="#10b981" radius={[4, 4, 0, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
