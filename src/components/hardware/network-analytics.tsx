
"use client"

import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const uptimeData = [
  { time: "D-6", gps: 98, temp: 99, tamper: 92, camera: 95 },
  { time: "D-5", gps: 99, temp: 100, tamper: 94, camera: 94 },
  { time: "D-4", gps: 97, temp: 99, tamper: 88, camera: 96 },
  { time: "D-3", gps: 100, temp: 98, tamper: 91, camera: 97 },
  { time: "D-2", gps: 99, temp: 99, tamper: 95, camera: 98 },
  { time: "D-1", gps: 98, temp: 100, tamper: 94, camera: 99 },
  { time: "Now", gps: 99.2, temp: 99.8, tamper: 93.5, camera: 99 },
]

const alertHistoryData = [
  { day: "Mon", temp: 24, tamper: 45, offline: 10, malfunction: 5 },
  { day: "Tue", temp: 32, tamper: 38, offline: 15, malfunction: 8 },
  { day: "Wed", temp: 18, tamper: 52, offline: 12, malfunction: 4 },
  { day: "Thu", temp: 28, tamper: 41, offline: 8, malfunction: 12 },
  { day: "Fri", temp: 45, tamper: 35, offline: 22, malfunction: 10 },
  { day: "Sat", temp: 15, tamper: 22, offline: 5, malfunction: 3 },
  { day: "Sun", temp: 12, tamper: 18, offline: 3, malfunction: 2 },
]

const chartConfig = {
  gps: { label: "GPS", color: "hsl(var(--primary))" },
  temp: { label: "Temp", color: "hsl(var(--accent))" },
  tamper: { label: "Tamper", color: "hsl(var(--destructive))" },
  camera: { label: "Camera", color: "hsl(var(--chart-3))" },
  offline: { label: "Offline", color: "hsl(var(--chart-4))" },
  malfunction: { label: "Malfunction", color: "hsl(var(--destructive))" },
}

export function NetworkAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="glass-card">
        <CardHeader className="py-4 border-b border-white/5 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-headline font-semibold text-white uppercase tracking-widest">Device Network Uptime Trend (Last 7 Days)</CardTitle>
          <div className="flex gap-2 text-[8px] uppercase font-bold">
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> GPS</span>
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> Temp</span>
            <span className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-destructive" /> Tamper</span>
          </div>
        </CardHeader>
        <CardContent className="h-[280px] pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={uptimeData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} />
              <YAxis domain={[80, 100]} axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ fontSize: '10px' }}
              />
              <Line type="monotone" dataKey="gps" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="temp" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="tamper" stroke="hsl(var(--destructive))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="camera" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="py-4 border-b border-white/5">
          <CardTitle className="text-sm font-headline font-semibold text-white uppercase tracking-widest">Alert History by Type (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent className="h-[280px] pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={alertHistoryData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ fontSize: '10px' }}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '9px', paddingTop: '20px' }} />
              <Bar dataKey="temp" stackId="a" fill="hsl(var(--accent))" radius={[0, 0, 0, 0]} barSize={24} />
              <Bar dataKey="tamper" stackId="a" fill="hsl(var(--destructive))" radius={[0, 0, 0, 0]} />
              <Bar dataKey="offline" stackId="a" fill="hsl(var(--chart-4))" radius={[0, 0, 0, 0]} />
              <Bar dataKey="malfunction" stackId="a" fill="hsl(var(--chart-5))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
