
"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { PharmaSidebar } from "@/components/pharma/pharma-sidebar"
import { PharmaTopBar } from "@/components/pharma/pharma-top-bar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  FileText, 
  ChevronRight, 
  FileSpreadsheet, 
  FileJson, 
  Download,
  Beaker,
  Truck,
  ShieldCheck,
  TrendingUp,
  BrainCircuit,
  Zap
} from "lucide-react"
import { 
  Area, AreaChart, 
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Line, LineChart 
} from "recharts"
import { cn } from "@/lib/utils"

const volumeData = [
  { month: "Jan", val: 100 },
  { month: "Feb", val: 280 },
  { month: "Mar", val: 200 },
  { month: "Apr", val: 350 },
  { month: "May", val: 300 },
  { month: "Jun", val: 480 },
]

const forecastData = [
  { month: "Jun", val: 50 },
  { month: "Jul", val: 120 },
  { month: "Aug", val: 180 },
  { month: "Sep", val: 140 },
  { month: "Oct", val: 220 },
  { month: "Nov", val: 190 },
]

export default function PharmaReportsPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#0a0f18]">
        <PharmaSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent">
          <PharmaTopBar />
          <main className="flex-1 p-6 space-y-6">
            <header>
              <h1 className="text-3xl font-headline font-bold text-white tracking-tight">Reports & Analytics</h1>
            </header>

            {/* Row 1: Generation & Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Report Generation */}
              <Card className="lg:col-span-7 glass-card bg-[#111827]/40 border-white/5 overflow-hidden">
                <CardHeader className="py-4 border-b border-white/5 bg-white/2">
                  <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Report Generation</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Select Date Range</label>
                      <Select defaultValue="30">
                        <SelectTrigger className="h-12 bg-white/5 border-white/10 text-xs font-medium">
                          <SelectValue placeholder="Select Range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">Last 30 Days</SelectItem>
                          <SelectItem value="90">Last 90 Days</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Select Chemical</label>
                      <Select defaultValue="precursors">
                        <SelectTrigger className="h-12 bg-white/5 border-white/10 text-xs font-medium">
                          <SelectValue placeholder="Select Chemical" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="precursors">Pharmaceutical precursors...</SelectItem>
                          <SelectItem value="ammonia">Ammonia Liquid</SelectItem>
                          <SelectItem value="cyanide">Sodium Cyanide</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button className="w-full h-14 bg-cyan-500 text-background hover:bg-cyan-400 font-headline font-bold uppercase tracking-[0.2em] text-sm shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    Generate Report
                  </Button>

                  <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/5">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Export Options:</span>
                    <div className="flex gap-3">
                      {[
                        { icon: FileText, color: "text-red-400", label: "PDF" },
                        { icon: FileSpreadsheet, color: "text-emerald-400", label: "CSV" },
                        { icon: FileJson, color: "text-orange-400", label: "Excel" },
                      ].map((exp, i) => (
                        <button key={i} className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                          <exp.icon className={cn("w-5 h-5", exp.color)} />
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Report Categories */}
              <Card className="lg:col-span-5 glass-card bg-[#111827]/40 border-white/5">
                <CardHeader className="py-4 border-b border-white/5 bg-white/2">
                  <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Report Categories</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {[
                    { title: "Inventory Report", desc: "Chemical inventory and chemical inventory.", icon: Beaker, color: "text-cyan-400" },
                    { title: "Chemical Usage Report", desc: "Chemical usage report - pharmaceutical in usage.", icon: TrendingUp, color: "text-emerald-400" },
                    { title: "Shipment Report", desc: "Short shipment report of pharmaceutical shipments.", icon: Truck, color: "text-blue-400" },
                    { title: "Compliance Report", desc: "Compliance report under pharmaceutical precursor.", icon: ShieldCheck, color: "text-teal-400" },
                  ].map((cat, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className={cn("p-2 rounded-lg bg-white/5", cat.color)}>
                          <cat.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-white uppercase tracking-widest">{cat.title}</p>
                          <p className="text-[9px] text-muted-foreground">{cat.desc}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Row 2: Analytics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Chemical Flow Analysis */}
              <Card className="lg:col-span-4 glass-card bg-[#111827]/40 border-white/5">
                <CardHeader className="py-4 border-b border-white/5">
                  <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Chemical Flow Analysis</CardTitle>
                  <p className="text-[9px] text-muted-foreground uppercase leading-tight mt-1">Visualization for tracking key chemicals of key chemicals from inventory.</p>
                </CardHeader>
                <CardContent className="h-[250px] relative pt-6 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Simplified Custom Flow Visualization */}
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                      <div className="w-16 h-16 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                        <Beaker className="w-8 h-8 text-cyan-400" />
                      </div>
                      <div className="flex-1 flex flex-col gap-4 px-8">
                        {[30.3, 23.3, 10.5, 1.3, 5.8].map((val, i) => (
                          <div key={i} className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="absolute inset-0 bg-cyan-500/40" style={{ width: `${(val/40)*100}%` }} />
                            <span className="absolute right-0 -top-3 text-[7px] font-bold text-cyan-400">{val} KB</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="w-8 h-8 rounded bg-white/5 border border-white/10" />
                        <div className="w-8 h-8 rounded bg-white/5 border border-white/10" />
                        <div className="w-8 h-8 rounded bg-white/5 border border-white/10" />
                      </div>
                    </div>
                    {/* SVG Connections Overlay */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                      <path d="M 80 125 Q 150 125 200 80" stroke="#06b6d4" strokeWidth="1" fill="none" />
                      <path d="M 80 125 Q 150 125 200 125" stroke="#06b6d4" strokeWidth="1" fill="none" />
                      <path d="M 80 125 Q 150 125 200 170" stroke="#06b6d4" strokeWidth="1" fill="none" />
                    </svg>
                  </div>
                </CardContent>
              </Card>

              {/* Shipment Volume Trends */}
              <Card className="lg:col-span-4 glass-card bg-[#111827]/40 border-white/5">
                <CardHeader className="py-4 border-b border-white/5">
                  <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Shipment Volume Trends</CardTitle>
                  <p className="text-[9px] text-muted-foreground uppercase leading-tight mt-1">Total volume of pharmaceutical shipments over the last six months.</p>
                </CardHeader>
                <CardContent className="h-[250px] pt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={volumeData}>
                      <defs>
                        <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
                      <YAxis hide />
                      <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                      <Area 
                        type="monotone" 
                        dataKey="val" 
                        stroke="#10b981" 
                        strokeWidth={2} 
                        fill="url(#volGrad)" 
                        dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Usage Forecast */}
              <Card className="lg:col-span-4 glass-card bg-[#111827]/40 border-white/5">
                <CardHeader className="py-4 border-b border-white/5">
                  <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Usage Forecast</CardTitle>
                  <p className="text-[9px] text-muted-foreground uppercase leading-tight mt-1">Forecasting projected chemical usage for the next quarter, based on historical data.</p>
                </CardHeader>
                <CardContent className="h-[250px] pt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={forecastData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
                      <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                      <Line 
                        type="monotone" 
                        dataKey="val" 
                        stroke="#06b6d4" 
                        strokeWidth={2} 
                        dot={{ r: 4, fill: '#06b6d4', strokeWidth: 0 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
