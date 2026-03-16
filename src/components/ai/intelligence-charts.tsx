
"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Scatter, ScatterChart, ZAxis } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const anomalyData = [
  { time: "08:00", usage: 40 },
  { time: "10:00", usage: 38 },
  { time: "12:00", usage: 85 },
  { time: "14:00", usage: 45 },
  { time: "16:00", usage: 42 },
  { time: "18:00", usage: 92 },
  { time: "20:00", usage: 48 },
]

const riskTrendData = [
  { time: "Mon", risk: 20 },
  { time: "Tue", risk: 25 },
  { time: "Wed", risk: 60 },
  { time: "Thu", risk: 40 },
  { time: "Fri", risk: 35 },
  { time: "Sat", risk: 15 },
  { time: "Sun", risk: 10 },
]

const deviationData = [
  { x: 10, y: 15, id: 'SH-102' },
  { x: 45, y: 50, id: 'SH-205' },
  { x: 30, y: 35, id: 'SH-310' },
  { x: 70, y: 90, id: 'SH-412' }, // Outlier
  { x: 20, y: 22, id: 'SH-515' },
  { x: 85, y: 20, id: 'SH-620' }, // Outlier
]

export function AiIntelligenceCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="glass-card">
        <CardHeader className="py-4 border-b border-white/5">
          <CardTitle className="text-[10px] font-headline font-bold text-primary uppercase tracking-widest">Chemical Demand Anomaly Detection</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={anomalyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ fontSize: '10px' }}
              />
              <Line type="monotone" dataKey="usage" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: 'hsl(var(--primary))', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="py-4 border-b border-white/5">
          <CardTitle className="text-[10px] font-headline font-bold text-accent uppercase tracking-widest">Predicted Shipment Risk Trend</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ fontSize: '10px' }}
              />
              <Line type="step" dataKey="risk" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: 'hsl(var(--accent))', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="py-4 border-b border-white/5">
          <CardTitle className="text-[10px] font-headline font-bold text-destructive uppercase tracking-widest">Route Deviation Analysis (Scatter)</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px] pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" dataKey="x" hide />
              <YAxis type="number" dataKey="y" hide />
              <ZAxis type="number" range={[50, 400]} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Shipments" data={deviationData} fill="hsl(var(--destructive))">
                 {deviationData.map((entry, index) => (
                   <circle key={`cell-${index}`} cx={entry.x} cy={entry.y} r={entry.x > 60 || entry.y < 30 ? 6 : 3} fill={entry.x > 60 || entry.y < 30 ? 'hsl(var(--destructive))' : 'hsl(var(--accent))'} />
                 ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
