"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { 
  Bar, BarChart, 
  Line, LineChart, 
  Pie, PieChart, 
  Cell, 
  ResponsiveContainer, 
  XAxis, YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from "recharts"
import { BrainCircuit, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnalyticsPreviewProps {
  shipments: any[]
  alerts: any[]
}

const volumeData = [
  { region: "NA", na: 450, emea: 0, apac: 0 },
  { region: "EMEA", na: 0, emea: 720, apac: 0 },
  { region: "APAC", na: 0, emea: 0, apac: 890 },
]

const deliveryRateData = [
  { month: "Oct", rate: 92 },
  { month: "Nov", rate: 94 },
  { month: "Dec", rate: 91 },
  { month: "Jan", rate: 95 },
  { month: "Feb", rate: 98.2 },
]

export function AnalyticsPreview({ shipments, alerts }: AnalyticsPreviewProps) {
  // Derived shipment status data
  const statusData = React.useMemo(() => {
    const counts: Record<string, number> = {
      "Delivered": 0,
      "In Transit": 0,
      "Delayed": 0,
      "Exception": 0
    }
    
    shipments.forEach(s => {
      const status = s.status || "In Transit"
      if (status === "Delivered") counts["Delivered"]++
      else if (status === "Delayed") counts["Delayed"]++
      else if (status === "Critical Risk") counts["Exception"]++
      else counts["In Transit"]++
    })

    // If no data, use mock for preview
    if (shipments.length === 0) {
      return [
        { name: "Delivered", value: 75, color: "#10b981" },
        { name: "In Transit", value: 15, color: "#06b6d4" },
        { name: "Delayed", value: 8, color: "#f97316" },
        { name: "Exception", value: 2, color: "#ef4444" },
      ]
    }

    return Object.entries(counts).map(([name, value], i) => ({
      name,
      value,
      color: name === "Delivered" ? "#10b981" : name === "Delayed" ? "#f97316" : name === "Exception" ? "#ef4444" : "#06b6d4"
    }))
  }, [shipments])

  return (
    <Card className="glass-card border-cyan-500/20 bg-black/40 h-full flex flex-col overflow-hidden">
      <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-cyan-400" />
          <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest leading-none">
            Analytics Preview <br />
            <span className="text-[8px] text-muted-foreground font-normal normal-case">Transport Activity Report (Oct 2024)</span>
          </CardTitle>
        </div>
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 opacity-50" />
      </CardHeader>
      
      <CardContent className="p-6 flex-1 space-y-8">
        {/* Chart 1: Volume by Region */}
        <div className="space-y-3">
          <p className="text-[9px] font-bold text-white uppercase tracking-widest">Transport Volume by Region</p>
          <div className="h-[160px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="region" hide />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#050b14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '10px' }}
                />
                <Bar dataKey="na" fill="#06b6d4" radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="emea" fill="#10b981" radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="apac" fill="#8b5cf6" radius={[4, 4, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-[8px] uppercase font-bold text-muted-foreground">
            {["NA", "EMEA", "APAC"].map((r, i) => (
              <div key={r} className="flex items-center gap-1.5">
                <div className={cn("w-1.5 h-1.5 rounded-full", i === 0 ? "bg-cyan-400" : i === 1 ? "bg-emerald-400" : "bg-purple-400")} />
                {r}
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: On-Time Delivery */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <p className="text-[9px] font-bold text-white uppercase tracking-widest">On-Time Delivery Rate (Oct 2024)</p>
            <span className="text-[10px] font-bold text-emerald-400">98.2%</span>
          </div>
          <div className="h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={deliveryRateData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" hide />
                <YAxis hide domain={[80, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#050b14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '10px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#06b6d4" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: '#06b6d4', strokeWidth: 0 }}
                  activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Status Breakdown */}
        <div className="space-y-3">
          <p className="text-[9px] font-bold text-white uppercase tracking-widest">Shipment Status Breakdown</p>
          <div className="flex items-center h-[180px]">
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={65}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2 pl-4">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between group">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-[9px] font-bold text-muted-foreground uppercase group-hover:text-white transition-colors">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/80">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <div className="p-4 bg-cyan-500/5 border-t border-white/5 flex items-center justify-between">
        <span className="text-[8px] font-bold text-cyan-400 uppercase tracking-widest">Real-Time Telemetry Link</span>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
      </div>
    </Card>
  )
}
