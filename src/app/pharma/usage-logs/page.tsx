"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { PharmaSidebar } from "@/components/pharma/pharma-sidebar"
import { PharmaTopBar } from "@/components/pharma/pharma-top-bar"
import { UsageLogsTable } from "@/components/pharma/usage-logs-table"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Area, AreaChart, 
  Bar, BarChart, 
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend 
} from "recharts"
import { Beaker, Settings, Share2 } from "lucide-react"

const consumptionData = [
  { time: "08:00", val1: 20, val2: 15 },
  { time: "10:00", val1: 25, val2: 28 },
  { time: "12:00", val1: 22, val2: 20 },
  { time: "14:00", val1: 30, val2: 32 },
  { time: "16:00", val1: 28, val2: 25 },
  { time: "18:00", val1: 35, val2: 38 },
  { time: "20:00", val1: 32, val2: 30 },
]

const deptData = [
  { name: "R&D", value: 45, color: "#06b6d4" },
  { name: "Quality Control", value: 25, color: "#10b981" },
  { name: "Synthesis", value: 20, color: "#8b5cf6" },
  { name: "Others", value: 10, color: "#eab308" },
]

const topChemicals = [
  { name: "Ammonium Nitrate", value: 25, icon: "25T" },
  { name: "Sulphuric Acid", value: 15, icon: "15T" },
  { name: "Acetic Anhydride", value: 10, icon: "10T" },
  { name: "Sulphe Acid", value: 10, icon: "10T" },
  { name: "Other", value: 5, icon: "5T" },
]

export default function UsageLogsPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#0a0f18]">
        <PharmaSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent">
          <PharmaTopBar />
          <main className="flex-1 p-6 space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-headline font-bold text-white tracking-tight uppercase">Chemical Usage Logs</h1>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Activity from: Oct 1, 2024 - Oct 14, 2024 | 14:40 GMT</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select defaultValue="type">
                  <SelectTrigger className="w-[140px] h-9 bg-[#111827]/60 border-white/10 text-[10px] uppercase font-bold">
                    <SelectValue placeholder="Chemical Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="type">Chemical Type</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="range">
                  <SelectTrigger className="w-[140px] h-9 bg-[#111827]/60 border-white/10 text-[10px] uppercase font-bold">
                    <SelectValue placeholder="Date Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="range">Date Range</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="tech">
                  <SelectTrigger className="w-[140px] h-9 bg-[#111827]/60 border-white/10 text-[10px] uppercase font-bold">
                    <SelectValue placeholder="Technician" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technician</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/30 font-headline font-bold uppercase tracking-widest h-9 px-4 text-[10px]">
                  Apply Filters
                </Button>
              </div>
            </header>

            {/* Row 1: Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Chemical Consumption Trend */}
              <Card className="lg:col-span-4 glass-card bg-[#111827]/40 border-white/5">
                <CardHeader className="py-4 border-b border-white/5">
                  <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Chemical Consumption Trend</CardTitle>
                  <p className="text-[9px] text-muted-foreground uppercase mt-1">Total Tons: <span className="text-white font-bold">14.2 (Tons/Day)</span></p>
                </CardHeader>
                <CardContent className="h-[220px] pt-6 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={consumptionData}>
                      <defs>
                        <linearGradient id="usageGrad1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="usageGrad2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="time" hide />
                      <YAxis hide />
                      <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                      <Area type="monotone" dataKey="val1" stroke="#06b6d4" fill="url(#usageGrad1)" strokeWidth={2} />
                      <Area type="monotone" dataKey="val2" stroke="#10b981" fill="url(#usageGrad2)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                  {/* Tooltip Badges Mock */}
                  <div className="absolute top-[40%] left-[25%] bg-white/10 backdrop-blur-md px-2 py-1 rounded text-[8px] font-bold text-white border border-white/10">5 Tons</div>
                  <div className="absolute top-[30%] left-[45%] bg-cyan-500/20 backdrop-blur-md px-2 py-1 rounded text-[8px] font-bold text-cyan-400 border border-cyan-500/30">14.20 Tons</div>
                </CardContent>
              </Card>

              {/* Usage By Department */}
              <Card className="lg:col-span-4 glass-card bg-[#111827]/40 border-white/5">
                <CardHeader className="py-4 border-b border-white/5">
                  <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Usage By Department</CardTitle>
                  <p className="text-[9px] text-muted-foreground uppercase mt-1">Total Entries: <span className="text-white font-bold">1,298</span></p>
                </CardHeader>
                <CardContent className="h-[220px] flex items-center justify-center p-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deptData}
                        cx="40%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={75}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {deptData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend 
                        verticalAlign="middle" 
                        align="right" 
                        layout="vertical"
                        iconType="square"
                        formatter={(value) => <span className="text-[10px] text-muted-foreground font-bold ml-2">{value}</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Consumed Chemicals */}
              <Card className="lg:col-span-4 glass-card bg-[#111827]/40 border-white/5">
                <CardHeader className="py-4 border-b border-white/5 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Top Consumed Chemicals</CardTitle>
                    <p className="text-[9px] text-muted-foreground uppercase mt-1">Last 30 Days</p>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:bg-white/5"><Share2 className="w-3 h-3" /></Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:bg-white/5"><Settings className="w-3 h-3" /></Button>
                  </div>
                </CardHeader>
                <CardContent className="h-[220px] pt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topChemicals}>
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={false}
                      />
                      <YAxis hide />
                      <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={20}>
                        {topChemicals.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? "#10b981" : "#06b6d4"} fillOpacity={1 - index * 0.15} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  {/* Labels and Icons Mockup */}
                  <div className="flex justify-between mt-2 px-2">
                    {topChemicals.map((item, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <span className="text-[8px] font-bold text-white uppercase">{item.icon}</span>
                        <Beaker className="w-3 h-3 text-muted-foreground/50" />
                        <span className="text-[7px] text-muted-foreground uppercase font-bold text-center leading-tight w-12 truncate">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Row 2: Usage Logs Table */}
            <UsageLogsTable />

            <footer className="pt-8 pb-4 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                &copy; 2024 ChemGuard AI Pharma Lab System | Usage Analytics Hub v3.4.0
              </p>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
