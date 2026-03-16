"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { 
  Area, AreaChart, 
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Pie, PieChart, Cell, Legend 
} from "recharts"
import { Activity, ShieldAlert } from "lucide-react"

const volumeData = [
  { time: "00:00", critical: 1, warning: 5, info: 10 },
  { time: "04:00", critical: 0, warning: 3, info: 15 },
  { time: "08:00", critical: 2, warning: 8, info: 25 },
  { time: "12:00", critical: 4, warning: 12, info: 20 },
  { time: "16:00", critical: 3, warning: 10, info: 18 },
  { time: "20:00", critical: 1, warning: 6, info: 12 },
  { time: "23:59", critical: 2, warning: 4, info: 8 },
]

const severityDistribution = [
  { name: "Critical", value: 15, color: "#ef4444" },
  { name: "Warning", value: 35, color: "#fb923c" },
  { name: "Info", value: 50, color: "#22d3ee" },
]

export function AlertsTrendsChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Alert Volume Trend */}
      <Card className="lg:col-span-8 glass-card bg-[#111827]/40 border-white/5">
        <CardHeader className="py-4 border-b border-white/5 bg-white/2 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Neural Alert Volume (24h Window)
            </CardTitle>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-destructive" /><span className="text-[8px] font-bold text-muted-foreground uppercase">Critical</span></div>
            <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-orange-400" /><span className="text-[8px] font-bold text-muted-foreground uppercase">Warning</span></div>
            <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /><span className="text-[8px] font-bold text-muted-foreground uppercase">Info</span></div>
          </div>
        </CardHeader>
        <CardContent className="h-[300px] pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={volumeData}>
              <defs>
                <linearGradient id="colorCrit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorWarn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fb923c" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#fb923c" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorInfo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ fontSize: '10px' }}
              />
              <Area type="monotone" dataKey="critical" stroke="#ef4444" fillOpacity={1} fill="url(#colorCrit)" strokeWidth={2} />
              <Area type="monotone" dataKey="warning" stroke="#fb923c" fillOpacity={1} fill="url(#colorWarn)" strokeWidth={2} />
              <Area type="monotone" dataKey="info" stroke="#22d3ee" fillOpacity={1} fill="url(#colorInfo)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Alert Severity Distribution */}
      <Card className="lg:col-span-4 glass-card bg-[#111827]/40 border-white/5">
        <CardHeader className="py-4 border-b border-white/5 bg-white/2">
          <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-destructive" />
            Severity Matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex flex-col items-center justify-center p-0">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={severityDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {severityDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 px-6">
            {severityDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.name}</span>
                <span className="text-[10px] font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
