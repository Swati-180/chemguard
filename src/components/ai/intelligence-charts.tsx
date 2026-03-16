
"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const demandData = [
  { month: "Jan", historical: 100, forecast: 110 },
  { month: "Feb", historical: 120, forecast: 130 },
  { month: "Mar", historical: 140, forecast: 120 },
  { month: "Apr", historical: 110, forecast: 160 },
  { month: "May", historical: 160, forecast: 140 },
  { month: "June", historical: 240, forecast: 180 },
]

const riskTrendData = [
  { month: "Jan", r1: 0.1, r2: 0.05, r3: 0.02 },
  { month: "Feb", r1: 0.15, r2: 0.08, r3: 0.05 },
  { month: "Mar", r1: 0.12, r2: 0.1, r3: 0.08 },
  { month: "Apr", r1: 0.35, r2: 0.55, r3: 0.25 },
  { month: "May", r1: 0.18, r2: 0.2, r3: 0.45 },
  { month: "June", r1: 0.1, r2: 0.05, r3: 0.15 },
]

export function AiIntelligenceCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glass-card border-white/5 bg-white/5">
        <CardHeader className="py-4 border-b border-white/5">
          <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest leading-tight">
            Chemical Demand Anomaly Prediction <br />
            <span className="text-[10px] text-muted-foreground normal-case tracking-normal">(Forecast vs. Actual)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={demandData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ fontSize: '10px' }}
              />
              <Line type="monotone" dataKey="historical" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} />
              <Line type="monotone" dataKey="forecast" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--accent))' }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-4 mt-2 text-[8px] uppercase font-bold tracking-widest text-muted-foreground">
             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary" /> Historical Usage</div>
             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-accent" /> AI Forecast Baseline</div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-white/5 bg-white/5">
        <CardHeader className="py-4 border-b border-white/5">
          <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest leading-tight">
            Shipment Risk Trend by Route <br />
            <span className="text-[10px] text-muted-foreground normal-case tracking-normal">(6 Months)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={riskTrendData}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fb923c" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="grad3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ fontSize: '10px' }}
              />
              <Area type="monotone" dataKey="r1" stroke="#fb923c" fillOpacity={1} fill="url(#grad1)" />
              <Area type="monotone" dataKey="r2" stroke="#eab308" fillOpacity={1} fill="url(#grad2)" />
              <Area type="monotone" dataKey="r3" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#grad3)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-[8px] uppercase font-bold tracking-widest text-muted-foreground">
             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-orange-400" /> Route 1: BASF to Transporter Y</div>
             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-400" /> Route 2: Munich to PharmaLab X</div>
             <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary" /> Route 3: BASF to PharmaLab X</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
