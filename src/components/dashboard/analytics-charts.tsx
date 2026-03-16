"use client"

import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const usageData = [
  { time: "00:00", value: 40 },
  { time: "04:00", value: 35 },
  { time: "08:00", value: 65 },
  { time: "12:00", value: 50 },
  { time: "16:00", value: 85 },
  { time: "20:00", value: 45 },
  { time: "23:59", value: 60 },
]

const shipmentData = [
  { day: "Mon", count: 24 },
  { day: "Tue", count: 32 },
  { day: "Wed", count: 28 },
  { day: "Thu", count: 45 },
  { day: "Fri", count: 38 },
  { day: "Sat", count: 15 },
  { day: "Sun", count: 12 },
]

const anomalyData = [
  { time: 0, activity: 10 },
  { time: 10, activity: 12 },
  { time: 20, activity: 15 },
  { time: 30, activity: 85 },
  { time: 40, activity: 18 },
  { time: 50, activity: 14 },
  { time: 60, activity: 65 },
  { time: 70, activity: 20 },
  { time: 80, activity: 15 },
]

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-sm font-headline font-semibold text-primary uppercase tracking-widest">Chemical Usage Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px]">
          <ChartContainer config={{ value: { label: "Usage", color: "hsl(var(--primary))" } }}>
            <AreaChart data={usageData}>
              <defs>
                <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
              <YAxis hide />
              <Tooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorUsage)" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-sm font-headline font-semibold text-accent uppercase tracking-widest">Shipment Movement</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px]">
          <ChartContainer config={{ count: { label: "Shipments", color: "hsl(var(--accent))" } }}>
            <BarChart data={shipmentData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
              <YAxis hide />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-sm font-headline font-semibold text-destructive uppercase tracking-widest">Suspicious Activity Detection</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px]">
          <ChartContainer config={{ activity: { label: "Activity Level", color: "hsl(var(--destructive))" } }}>
            <LineChart data={anomalyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis hide />
              <YAxis hide />
              <Tooltip content={<ChartTooltipContent />} />
              <Line type="step" dataKey="activity" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ r: 2, fill: "hsl(var(--destructive))" }} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
