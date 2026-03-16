"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { PharmaSidebar } from "@/components/pharma/pharma-sidebar"
import { PharmaTopBar } from "@/components/pharma/pharma-top-bar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Thermometer, Droplets, Lock, Video, MoreHorizontal, Circle } from "lucide-react"
import { 
  Area, AreaChart, 
  Bar, BarChart, 
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell 
} from "recharts"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const deviceCards = [
  { title: "Temperature Sensors", icon: Thermometer, total: 2500, online: 2410, offline: 90, alerts: 3, color: "text-cyan-400", border: "border-cyan-500/20" },
  { title: "Humidity Sensors", icon: Droplets, total: 1800, online: 1760, offline: 40, alerts: 1, color: "text-blue-400", border: "border-blue-500/20" },
  { title: "Tamper Detection Sensors", icon: Lock, total: 950, online: 945, offline: 5, alerts: 0, color: "text-cyan-400", border: "border-cyan-500/20" },
  { title: "Warehouse Cameras", icon: Video, total: 300, online: 295, offline: 5, alerts: 0, color: "text-teal-400", border: "border-teal-500/20" },
]

const trendData = [
  { time: "10:00", t1: 20, t2: 25, t3: 30 },
  { time: "12:00", t1: 22, t2: 28, t3: 32 },
  { time: "14:00", t1: 25, t2: 30, t3: 35 },
  { time: "16:00", t1: 24, t2: 29, t3: 33 },
  { time: "18:00", t1: 26, t2: 31, t3: 36 },
  { time: "20:00", t1: 23, t2: 27, t3: 34 },
  { time: "23:00", t1: 21, t2: 26, t3: 31 },
]

const alertData = [
  { day: "May", type1: 5, type2: 10, type3: 2 },
  { day: "Sun", type1: 8, type2: 12, type3: 4 },
  { day: "Mon", type1: 12, type2: 15, type3: 6 },
  { day: "Tue", type1: 15, type2: 18, type3: 8 },
  { day: "Wed", type1: 10, type2: 14, type3: 5 },
  { day: "Thu", type1: 7, type2: 11, type3: 3 },
  { day: "Fri", type1: 9, type2: 13, type3: 4 },
  { day: "San", type1: 14, type2: 17, type3: 7 },
]

const healthData = [
  { name: "Optimal", value: 70, color: "#10b981" },
  { name: "Warning", value: 20, color: "#f59e0b" },
  { name: "Critical", value: 10, color: "#ef4444" },
]

const inventory = [
  { id: "TS-0034", type: "Temperature", location: "R&D Lab", status: "Online", signal: "13:33:23 18:39:56", icon: Thermometer },
  { id: "CAM-012", type: "Camera", location: "Cold Storage 2", status: "Offline", signal: "13:32:23 19:29:37", icon: Video },
  { id: "CAM-013", type: "Camera", location: "R&D Lab", status: "Online", signal: "13:33:23 18:39:30", icon: Video },
  { id: "TS-0035", type: "Temperature", location: "R&D Lab", status: "Online", signal: "13:33:23 18:39:56", icon: Thermometer },
]

export default function HardwareMonitoringPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#0a0f18]">
        <PharmaSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent">
          <PharmaTopBar />
          <main className="flex-1 p-6 space-y-6">
            <header className="flex items-center justify-between">
              <h1 className="text-2xl font-headline font-bold text-white tracking-tight">Hardware Monitoring</h1>
              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Current 14, 2024, 12:58 PM</p>
            </header>

            {/* Row 1: Device Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {deviceCards.map((card) => (
                <Card key={card.title} className={cn("glass-card bg-[#111827]/40 border-white/5", card.border)}>
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className={cn("p-3 rounded-xl bg-white/5", card.color)}>
                      <card.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] font-bold text-white uppercase tracking-widest leading-none mb-2">{card.title}</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-muted-foreground">
                        <div className="flex justify-between"><span>Total:</span> <span className="text-white font-bold">{card.total}</span></div>
                        <div className="flex justify-between"><span>Oniine:</span> <span className="text-emerald-400 font-bold">{card.online}</span></div>
                        <div className="flex justify-between"><span>Offiine:</span> <span className="text-red-400 font-bold">{card.offline}</span></div>
                        <div className="flex justify-between"><span>Active Alerts:</span> <span className="text-red-400 font-bold">{card.alerts}</span></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Row 2: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <Card className="lg:col-span-5 glass-card bg-[#111827]/40 border-white/5">
                <CardHeader className="py-4 flex flex-row items-center justify-between border-b border-white/5">
                  <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Temperature Monitoring Trend</CardTitle>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground/50 cursor-pointer" />
                </CardHeader>
                <CardContent className="h-[250px] pt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} tickFormatter={(val) => `${val}°`} />
                      <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                      <Area type="monotone" dataKey="t1" stroke="#06b6d4" fill="transparent" strokeWidth={2} />
                      <Area type="monotone" dataKey="t2" stroke="#10b981" fill="transparent" strokeWidth={2} />
                      <Area type="monotone" dataKey="t3" stroke="#f59e0b" fill="transparent" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="lg:col-span-4 glass-card bg-[#111827]/40 border-white/5">
                <CardHeader className="py-4 flex flex-row items-center justify-between border-b border-white/5">
                  <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Sensor Alert History</CardTitle>
                </CardHeader>
                <CardContent className="h-[250px] pt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={alertData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
                      <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                      <Bar dataKey="type1" stackId="a" fill="#06b6d4" barSize={15} />
                      <Bar dataKey="type2" stackId="a" fill="#f59e0b" />
                      <Bar dataKey="type3" stackId="a" fill="#ef4444" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-4 mt-2">
                    {["Alert Type", "Alert Types", "Active Alert"].map((label, i) => (
                      <div key={label} className="flex items-center gap-1.5">
                        <div className={cn("w-2 h-2 rounded-full", i === 0 ? "bg-cyan-500" : i === 1 ? "bg-amber-500" : "bg-red-500")} />
                        <span className="text-[8px] text-muted-foreground uppercase font-bold">{label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-3 glass-card bg-[#111827]/40 border-white/5">
                <CardHeader className="py-4 border-b border-white/5">
                  <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Device Health Status</CardTitle>
                </CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center pt-6 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={healthData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={85}
                        paddingAngle={10}
                        dataKey="value"
                        stroke="none"
                      >
                        {healthData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-10">
                    <p className="text-2xl font-headline font-bold text-white">92%</p>
                    <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-widest">Operational</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Row 3: Table and Map */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <Card className="lg:col-span-8 glass-card bg-[#111827]/40 border-white/5">
                <CardHeader className="py-4 flex flex-row items-center justify-between border-b border-white/5">
                  <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Device Inventory & Status</CardTitle>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground/50 cursor-pointer" />
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-white/5">
                      <TableRow className="border-white/5 hover:bg-transparent">
                        <TableHead className="text-[10px] font-bold uppercase py-4">Device ID &darr;</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase py-4">Device Type</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase py-4">Location</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase py-4">Status</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase py-4">Last Signal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inventory.map((item) => (
                        <TableRow key={item.id} className="border-white/5 hover:bg-white/5 transition-colors">
                          <TableCell className="py-4 text-[11px] font-mono font-bold text-white">{item.id}</TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center gap-2">
                              <item.icon className="w-3.5 h-3.5 text-cyan-400" />
                              <span className="text-[11px] text-muted-foreground">Icon+text</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-4 text-[11px] text-muted-foreground">{item.location}</TableCell>
                          <TableCell className="py-4">
                            <Badge className={cn(
                              "text-[9px] h-6 px-3 uppercase font-bold",
                              item.status === 'Online' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'
                            )}>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-4 text-[11px] font-mono text-muted-foreground">{item.signal}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="lg:col-span-4 glass-card bg-[#111827]/40 border-white/5">
                <CardHeader className="py-4 flex flex-row items-center justify-between border-b border-white/5">
                  <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Warehouse Map</CardTitle>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground/50 cursor-pointer" />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="relative aspect-[4/3] bg-[#0a0f18] rounded-xl border border-white/10 overflow-hidden p-4">
                    {/* Warehouse Floor Plan Grid */}
                    <div className="absolute inset-4 border border-white/20 rounded-md">
                      <div className="absolute top-0 left-0 right-0 h-1/3 border-b border-white/10 flex">
                        <div className="flex-1 border-r border-white/10 p-2 text-[8px] font-bold text-white/40 uppercase">Cold Storage</div>
                        <div className="flex-1 border-r border-white/10 p-2 text-[8px] font-bold text-white/40 uppercase">Shipping</div>
                        <div className="flex-1 p-2 text-[8px] font-bold text-white/40 uppercase">Lab 1</div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-2/3 flex">
                        <div className="w-1/4 border-r border-white/10 flex flex-col p-2">
                          <div className="flex-1 border-b border-white/10" />
                          <div className="flex-1 border-b border-white/10" />
                          <div className="flex-1" />
                        </div>
                        <div className="w-3/4 flex flex-wrap p-4 gap-4 items-center justify-center">
                          {/* Stylized Shelves */}
                          <div className="w-12 h-20 border border-white/10 bg-white/2" />
                          <div className="w-12 h-20 border border-white/10 bg-white/2" />
                          <div className="w-12 h-20 border border-white/10 bg-white/2" />
                        </div>
                      </div>
                    </div>

                    {/* Sensor Nodes */}
                    {[
                      { top: '15%', left: '15%', color: 'bg-emerald-500', pulse: true },
                      { top: '25%', left: '20%', color: 'bg-emerald-500', pulse: false },
                      { top: '40%', left: '15%', color: 'bg-red-500', pulse: true },
                      { top: '15%', left: '45%', color: 'bg-red-500', pulse: false },
                      { top: '20%', left: '55%', color: 'bg-emerald-500', pulse: true },
                      { top: '15%', left: '85%', color: 'bg-amber-500', pulse: false },
                      { top: '25%', left: '75%', color: 'bg-emerald-500', pulse: true },
                      { top: '60%', left: '40%', color: 'bg-emerald-500', pulse: false },
                      { top: '75%', left: '55%', color: 'bg-emerald-500', pulse: true },
                      { top: '80%', left: '80%', color: 'bg-emerald-500', pulse: false },
                    ].map((node, i) => (
                      <div 
                        key={i} 
                        className="absolute"
                        style={{ top: node.top, left: node.left }}
                      >
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          node.color,
                          node.pulse && "animate-pulse shadow-[0_0_10px_currentColor]"
                        )} />
                      </div>
                    ))}

                    <div className="absolute bottom-2 left-2 right-2 flex justify-center gap-4">
                      {["Cold Storage", "Shipping", "Lab 1"].map((zone, i) => (
                        <div key={zone} className="flex items-center gap-1.5">
                          <div className={cn("w-1.5 h-1.5 rounded-full", i === 0 ? "bg-cyan-500" : i === 1 ? "bg-amber-500" : "bg-red-500")} />
                          <span className="text-[7px] text-muted-foreground uppercase font-bold">{zone}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {[
                      { label: "Pulsed", color: "bg-cyan-400" },
                      { label: "Pulsed", color: "bg-emerald-400" },
                      { label: "Colleced", color: "bg-amber-400" },
                      { label: "Offiine", color: "bg-red-400" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-end gap-2 pr-2">
                        <span className="text-[8px] text-muted-foreground uppercase font-bold">{item.label}</span>
                        <Circle className={cn("w-2 h-2 fill-current", item.color)} />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
