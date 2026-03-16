"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TransportSidebar } from "@/components/transport/transport-sidebar"
import { TransportTopBar } from "@/components/transport/transport-top-bar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Truck, 
  Navigation, 
  AlertTriangle, 
  Activity, 
  MapPin, 
  Clock, 
  ArrowUpRight,
  ChevronRight,
  Zap,
  MoreVertical,
  Radio
} from "lucide-react"
import { 
  Area, AreaChart, 
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Bar, BarChart, Cell 
} from "recharts"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, limit } from "firebase/firestore"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const transitData = [
  { time: "08:00", value: 12 },
  { time: "10:00", value: 18 },
  { time: "12:00", value: 15 },
  { time: "14:00", value: 24 },
  { time: "16:00", value: 22 },
  { time: "18:00", value: 30 },
  { time: "20:00", value: 25 },
]

export default function TransportDashboard() {
  const db = useFirestore()

  const shipmentsQuery = useMemoFirebase(() => {
    return query(collection(db, "shipment_requests"), orderBy("createdAt", "desc"), limit(10))
  }, [db])

  const { data: shipments, isLoading: shipmentsLoading } = useCollection(shipmentsQuery)

  const stats = [
    { title: "Active Shipments", value: "24", sub: "+3.2% vs avg", icon: Truck, color: "text-orange-400", bg: "bg-orange-400/10" },
    { title: "Fleet Utilization", value: "92%", sub: "18/20 Vehicles", icon: Navigation, color: "text-cyan-400", bg: "bg-cyan-400/10" },
    { title: "Avg. Transit Time", value: "4.2h", sub: "-12m optimized", icon: Clock, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { title: "Security Alerts", value: "02", sub: "1 High Severity", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
  ]

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#05080d]">
        <TransportSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent relative">
          <TransportTopBar />
          
          <main className="flex-1 p-6 space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-headline font-bold text-white tracking-tight">Logistics Command Center</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] font-medium flex items-center gap-2">
                  <Activity className="w-3 h-3 text-orange-400 animate-pulse" />
                  Real-Time Fleet Intelligence Terminal
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2 mr-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#05080d] bg-white/5 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white/40">V{i}</span>
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-[#05080d] bg-orange-500/20 flex items-center justify-center text-orange-400 text-[10px] font-bold">+12</div>
                </div>
                <Button className="bg-orange-500 text-white hover:bg-orange-600 font-headline font-bold uppercase tracking-widest text-[10px] h-10 px-6 gap-2 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
                  <Zap className="w-3.5 h-3.5" />
                  Optimize Routes
                </Button>
              </div>
            </header>

            {/* Row 1: KPI Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <Card key={stat.title} className="glass-card bg-white/[0.02] border-white/5 hover:border-orange-500/20 transition-all group cursor-pointer overflow-hidden">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.title}</p>
                        <p className="text-2xl font-headline font-bold text-white">{stat.value}</p>
                      </div>
                      <div className={cn("p-2.5 rounded-xl border border-white/5 shadow-inner", stat.bg, stat.color)}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5">
                      <ArrowUpRight className={cn("w-3 h-3", stat.color)} />
                      <span className="text-[10px] font-bold text-white/60 uppercase">{stat.sub}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Row 2: Map & Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Fleet Movement Map */}
              <Card className="lg:col-span-8 glass-card bg-white/[0.02] border-white/5 overflow-hidden group">
                <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-orange-400" />
                    <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Active Fleet Deployment</CardTitle>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /><span className="text-[8px] font-bold text-muted-foreground uppercase">Stable</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /><span className="text-[8px] font-bold text-muted-foreground uppercase">In Transit</span></div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 relative h-[450px] bg-[#0a0f18]">
                  {/* Stylized Abstract Map Grid */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                  
                  {/* Fake Route Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <path d="M 100 100 Q 250 150 400 100 T 700 200" fill="none" stroke="rgba(249,115,22,0.2)" strokeWidth="2" strokeDasharray="10,5" />
                    <path d="M 50 350 L 200 300 L 450 380 L 750 320" fill="none" stroke="rgba(34,211,238,0.2)" strokeWidth="2" strokeDasharray="10,5" />
                  </svg>

                  {/* Pulsing Markers */}
                  {[
                    { t: '20%', l: '25%', c: 'text-orange-400', label: 'VEH-CGV-102', id: 'SH-8822' },
                    { t: '45%', l: '55%', c: 'text-orange-400', label: 'VEH-CGV-215', id: 'SH-7731' },
                    { t: '70%', l: '40%', c: 'text-emerald-400', label: 'VEH-CGV-098', id: 'SH-9115' },
                    { t: '30%', l: '75%', c: 'text-destructive', label: 'VEH-CGV-441', id: 'CRITICAL', pulse: true }
                  ].map((marker, i) => (
                    <div key={i} className="absolute" style={{ top: marker.t, left: marker.l }}>
                      <div className="relative group/pin cursor-pointer">
                        <div className={cn(
                          "absolute -inset-3 rounded-full opacity-30",
                          marker.pulse ? "bg-destructive animate-ping" : "bg-orange-500/20"
                        )} />
                        <MapPin className={cn("w-6 h-6 relative z-10 drop-shadow-[0_0_10px_currentColor]", marker.c)} />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 bg-black/90 border border-white/10 p-2 rounded backdrop-blur-md opacity-0 group-hover/pin:opacity-100 transition-opacity z-50">
                          <p className="text-[9px] font-bold text-white">{marker.label}</p>
                          <p className="text-[8px] text-muted-foreground uppercase mt-0.5">{marker.id}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Telemetry Overlay */}
                  <div className="absolute bottom-4 left-4 p-3 bg-black/60 border border-white/5 rounded-xl backdrop-blur-md space-y-2 w-48">
                    <p className="text-[9px] font-bold text-white uppercase tracking-widest border-b border-white/5 pb-1.5">Live Telemetry</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] uppercase font-bold text-muted-foreground"><span>Latency:</span> <span className="text-emerald-400">12ms</span></div>
                      <div className="flex justify-between text-[8px] uppercase font-bold text-muted-foreground"><span>Packets:</span> <span className="text-white">Authenticated</span></div>
                      <div className="flex justify-between text-[8px] uppercase font-bold text-muted-foreground"><span>Enc:</span> <span className="text-white">AES-256</span></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transit Volume Chart */}
              <Card className="lg:col-span-4 glass-card bg-white/[0.02] border-white/5">
                <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02]">
                  <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">In-Transit Volume (24h)</CardTitle>
                </CardHeader>
                <CardContent className="h-[380px] pt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={transitData}>
                      <defs>
                        <linearGradient id="transitGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
                      <YAxis hide />
                      <Tooltip contentStyle={{ backgroundColor: '#0a0f18', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                      <Area type="monotone" dataKey="value" stroke="#f97316" fillOpacity={1} fill="url(#transitGrad)" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="mt-4 p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-white uppercase leading-none">Efficiency Index</p>
                        <p className="text-[18px] font-headline font-bold text-orange-400 mt-1">94.8%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Row 3: Active Shipments Real-time Table */}
            <Card className="glass-card bg-white/[0.02] border-white/5 overflow-hidden">
              <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-orange-400" />
                  <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Real-Time Transit Matrix</CardTitle>
                </div>
                <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase text-muted-foreground hover:text-white hover:bg-white/5 h-8">
                  View Full Manifest
                  <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                {shipmentsLoading ? (
                  <div className="p-12 flex items-center justify-center text-orange-400 animate-pulse text-xs font-bold uppercase tracking-widest">
                    Syncing manifests...
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-white/[0.03] border-b border-white/5">
                          <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Shipment ID</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Destination</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Batch Ref</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Transporter</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Status</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {shipments?.map((s) => (
                          <tr key={s.id} className="hover:bg-white/[0.02] transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                                <span className="text-xs font-mono font-bold text-white">{s.shipmentId}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-xs text-white/80">{s.destination}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-[10px] font-mono text-cyan-400">[{s.batchId}]</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-[10px] font-bold text-muted-foreground uppercase">{s.transporter}</span>
                            </td>
                            <td className="px-6 py-4">
                              <Badge className={cn(
                                "text-[9px] font-bold uppercase tracking-tighter",
                                s.status === 'Pending' ? "bg-orange-500/20 text-orange-400 border-orange-500/30" :
                                s.status === 'In Transit' ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" :
                                "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                              )}>
                                {s.status}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            <footer className="pt-8 pb-4 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] font-bold">
                &copy; 2024 ChemGuard AI Enterprise Logistics Monitoring | SOC v4.2.1-TR
              </p>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
