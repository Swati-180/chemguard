"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { PharmaSidebar } from "@/components/pharma/pharma-sidebar"
import { PharmaTopBar } from "@/components/pharma/pharma-top-bar"
import { ShipmentRequestsTable } from "@/components/pharma/shipment-requests-table"
import { Button } from "@/components/ui/button"
import { Plus, History, Download, TrendingUp, PieChart as PieChartIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Pie, PieChart, Cell } from "recharts"

const trendData = [
  { month: "Jan", shipments: 12 },
  { month: "Feb", shipments: 18 },
  { month: "Mar", shipments: 15 },
  { month: "Apr", shipments: 22 },
  { month: "May", shipments: 30 },
  { month: "Jun", shipments: 25 },
]

const distributionData = [
  { name: "Standard", value: 65, color: "#06b6d4" },
  { name: "Priority", value: 25, color: "#10b981" },
  { name: "Critical", value: 10, color: "#f43f5e" },
]

export default function ShipmentRequestsPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#0a0f18]">
        <PharmaSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent">
          <PharmaTopBar />
          <main className="flex-1 p-6 space-y-6">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-headline font-bold text-white tracking-tight">Shipment Requests</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Logistics Planning & Coordination Hub</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/30 font-headline font-bold uppercase tracking-wider gap-3 h-11 px-6 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                  <Plus className="w-5 h-5" />
                  Create Shipment Request
                </Button>
                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 font-headline font-bold uppercase tracking-wider gap-2 h-11 px-6">
                  <History className="w-4 h-4" />
                  View History
                </Button>
                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 font-headline font-bold uppercase tracking-wider gap-2 h-11 px-6">
                  <Download className="w-4 h-4" />
                  Export Data
                </Button>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Side: Table */}
              <div className="lg:col-span-8">
                <ShipmentRequestsTable />
              </div>

              {/* Right Side: Charts */}
              <div className="lg:col-span-4 space-y-6">
                <Card className="glass-card border-white/5 bg-[#111827]/40">
                  <CardHeader className="py-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest leading-none">Shipment Velocity</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="h-[200px] pt-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={trendData}>
                        <defs>
                          <linearGradient id="colorShip" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" hide />
                        <YAxis hide />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                          itemStyle={{ fontSize: '10px' }}
                        />
                        <Area type="monotone" dataKey="shipments" stroke="#06b6d4" fillOpacity={1} fill="url(#colorShip)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="glass-card border-white/5 bg-[#111827]/40">
                  <CardHeader className="py-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <PieChartIcon className="w-4 h-4 text-emerald-400" />
                      <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest leading-none">Status Distribution</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="h-[200px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={distributionData}
                          innerRadius={50}
                          outerRadius={70}
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
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-col gap-2 pl-4">
                      {distributionData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="p-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md">
                  <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2">Logistics Alert</p>
                  <p className="text-xs text-white/80 leading-relaxed">
                    3 shipments flagged for high-risk chemical precursors. Secondary verification required for route R-North-02.
                  </p>
                </div>
              </div>
            </div>

            <footer className="pt-8 pb-4 text-center border-t border-white/5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                &copy; 2024 ChemGuard AI Pharma Lab System | Neural Logistics v2.1.0
              </p>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
