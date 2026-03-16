"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TransportSidebar } from "@/components/transport/transport-sidebar"
import { TransportTopBar } from "@/components/transport/transport-top-bar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Cpu, 
  Battery, 
  Wifi, 
  AlertTriangle, 
  Activity, 
  Database,
  Thermometer,
  Navigation,
  Lock,
  Video,
  MoreVertical,
  Search,
  CheckCircle2
} from "lucide-react"
import { 
  Area, AreaChart, 
  Bar, BarChart, 
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Line, LineChart, Legend, ReferenceLine 
} from "recharts"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, limit, doc, setDoc } from "firebase/firestore"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

const tempTrendData = [
  { time: "08:00", active: 12, cgt104: 15, cgt103: 10 },
  { time: "10:00", active: 18, cgt104: 22, cgt103: 14 },
  { time: "12:00", active: 15, cgt104: 18, cgt103: 16 },
  { time: "14:00", active: 24, cgt104: 26, cgt103: 20 },
  { time: "16:00", active: 22, cgt104: 20, cgt103: 18 },
  { time: "18:00", active: 30, cgt104: 28, cgt103: 22 },
]

const alertHistoryData = [
  { time: "08:00", Temperature: 10, Tamper: 5, Camera: 4 },
  { time: "09:00", Temperature: 12, Tamper: 8, Camera: 3 },
  { time: "10:00", Temperature: 8, Tamper: 12, Camera: 2 },
  { time: "11:00", Temperature: 15, Tamper: 10, Camera: 5 },
  { time: "12:00", Temperature: 18, Tamper: 4, Camera: 1 },
  { time: "13:00", Temperature: 10, Tamper: 7, Camera: 3 },
  { time: "14:00", Temperature: 25, Tamper: 15, Camera: 8 },
  { time: "15:00", Temperature: 12, Tamper: 10, Camera: 4 },
  { time: "16:00", Temperature: 20, Tamper: 18, Camera: 10 },
  { time: "17:00", Temperature: 15, Tamper: 12, Camera: 6 },
  { time: "18:00", Temperature: 5, Tamper: 2, Camera: 1 },
]

export default function HardwareMonitoringPage() {
  const db = useFirestore()

  // Real-time data listeners
  const devicesQuery = useMemoFirebase(() => query(collection(db, "hardware_devices"), orderBy("deviceId"), limit(50)), [db])
  const alertsQuery = useMemoFirebase(() => query(collection(db, "sensor_alerts"), orderBy("timestamp", "desc"), limit(20)), [db])

  const { data: devices, isLoading: loadingDevices } = useCollection(devicesQuery)
  const { data: alerts, isLoading: loadingAlerts } = useCollection(alertsQuery)

  const handleSeedData = async () => {
    const demoDevices = [
      { id: "dev_104", deviceId: "CGT-104", deviceType: "GPS", location: "Fleet 4", battery: 85, lastSignal: "08:00-18:00", status: "Healthy", healthScore: 94 },
      { id: "dev_112", deviceId: "CGT-112", deviceType: "Temp Sensor", location: "Fleet 2", battery: 92, lastSignal: "08:00-18:00", status: "Healthy", healthScore: 98 },
      { id: "dev_203", deviceId: "CGT-203", deviceType: "Tamper", location: "Sector 1", battery: 78, lastSignal: "08:00-18:00", status: "Warning", healthScore: 99 },
      { id: "dev_204", deviceId: "CGT-204", deviceType: "Camera", location: "Unit 12", battery: 65, lastSignal: "08:00-18:00", status: "Healthy", healthScore: 97 },
    ]

    const demoAlerts = [
      { id: "al_1", timestamp: new Date().toISOString(), vehicle: "CGT-112", device: "TS-405", type: "Temp Sensor", severity: "HIGH", action: "Investigating" },
      { id: "al_2", timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), vehicle: "CGT-113", device: "TS-405", type: "Temp Sensor", severity: "HIGH", action: "Investigating" },
      { id: "al_3", timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(), vehicle: "CGT-114", device: "TS-405", type: "Temp Sensor", severity: "HIGH", action: "Investigating" },
    ]

    for (const d of demoDevices) await setDoc(doc(db, "hardware_devices", d.id), d, { merge: true })
    for (const a of demoAlerts) await setDoc(doc(db, "sensor_alerts", a.id), a, { merge: true })

    toast({ title: "Tactical Grid Synced", description: "Hardware telemetry successfully provisioned to Satellite Relay." })
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#050b14] text-white">
        <TransportSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent relative">
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <TransportTopBar />
          
          <main className="flex-1 p-6 space-y-6 relative z-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <h1 className="text-2xl font-headline font-bold tracking-tight uppercase">
                  Hardware Monitoring | <span className="text-cyan-400">Houston Fleet</span> | OCT 26, 2024
                </h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">Logistics Command Center | Hardware SOC</p>
              </div>
              <Button 
                onClick={handleSeedData}
                className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 font-bold uppercase tracking-widest gap-2"
              >
                <Database className="w-4 h-4" />
                Sync Satellite Grid
              </Button>
            </div>

            {/* Top Grid: Health Cards & Main Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Device Health Status Cards */}
              <div className="lg:col-span-4 space-y-6">
                <Card className="glass-card border-cyan-500/20 bg-black/40 h-full">
                  <CardHeader className="py-4 border-b border-white/5 bg-white/2 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Device Health Status</CardTitle>
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <HealthCard 
                        title="GPS Devices" 
                        value="94%" 
                        alerts={6} 
                        icon={Navigation} 
                        color="text-orange-400" 
                        borderColor="border-orange-500/30"
                      />
                      <HealthCard 
                        title="Temperature Sensors" 
                        value="98%" 
                        alerts={15} 
                        icon={Thermometer} 
                        color="text-emerald-400" 
                        borderColor="border-emerald-500/30"
                      />
                      <HealthCard 
                        title="Tamper Sensors" 
                        value="99%" 
                        status="HEALTHY" 
                        icon={Lock} 
                        color="text-cyan-400" 
                        borderColor="border-cyan-500/30"
                      />
                      <HealthCard 
                        title="Vehicle Cameras" 
                        value="97%" 
                        status="OPERATIONAL" 
                        icon={Video} 
                        color="text-emerald-400" 
                        borderColor="border-emerald-500/30"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Temperature Trend Chart */}
              <div className="lg:col-span-8">
                <Card className="glass-card border-white/5 bg-black/40 h-full">
                  <CardHeader className="py-4 border-b border-white/5 bg-white/2">
                    <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Temperature Trend Chart (Houston Fleet)</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[350px] pt-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={tempTrendData}>
                        <defs>
                          <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 10}} tickFormatter={(v) => `${v}°C`} />
                        <Tooltip contentStyle={{ backgroundColor: '#050b14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                        <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', paddingBottom: '20px' }} />
                        <ReferenceLine y={25} label={{ value: 'Threshold', position: 'insideTopLeft', fill: '#ef4444', fontSize: 10 }} stroke="#ef4444" strokeDasharray="3 3" />
                        <ReferenceLine y={-5} label={{ value: 'Threshold', position: 'insideBottomLeft', fill: '#ef4444', fontSize: 10 }} stroke="#ef4444" strokeDasharray="3 3" />
                        <Area type="monotone" dataKey="active" stroke="#06b6d4" fillOpacity={1} fill="url(#tempGrad)" strokeWidth={2} name="Active Vehicle" />
                        <Area type="monotone" dataKey="cgt104" stroke="#10b981" fillOpacity={0} strokeWidth={2} name="CGT-104 1" />
                        <Area type="monotone" dataKey="cgt103" stroke="#8b5cf6" fillOpacity={0} strokeWidth={2} name="CGT-103 2" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom Grid: Inventory & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Device Inventory Status Table */}
              <div className="lg:col-span-4">
                <Card className="glass-card border-white/5 bg-black/40">
                  <CardHeader className="py-4 border-b border-white/5 bg-white/2">
                    <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Device Inventory Status</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 max-h-[400px] overflow-auto">
                    <Table>
                      <TableHeader className="bg-white/5 sticky top-0 z-10">
                        <TableRow className="border-white/5 hover:bg-transparent">
                          <TableHead className="text-[9px] font-bold uppercase py-3">Vehicle ID</TableHead>
                          <TableHead className="text-[9px] font-bold uppercase py-3">Device Type</TableHead>
                          <TableHead className="text-[9px] font-bold uppercase py-3">Battery</TableHead>
                          <TableHead className="text-[9px] font-bold uppercase py-3">Health</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {devices?.map((dev) => (
                          <TableRow key={dev.id} className="border-white/5 hover:bg-white/5 transition-colors">
                            <TableCell className="py-3 text-[10px] font-mono text-cyan-400">{dev.deviceId}</TableCell>
                            <TableCell className="py-3 text-[10px] text-white/80">{dev.deviceType}</TableCell>
                            <TableCell className="py-3">
                              <div className="flex items-center gap-2">
                                <Battery className={cn("w-3 h-3", dev.battery < 20 ? "text-destructive" : "text-emerald-400")} />
                                <span className="text-[9px] font-mono">{dev.battery}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="py-3">
                              <div className={cn("w-2 h-2 rounded-full", dev.status === 'Healthy' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-orange-400')} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {/* Sensor Alert History Chart */}
              <div className="lg:col-span-4">
                <Card className="glass-card border-white/5 bg-black/40">
                  <CardHeader className="py-4 border-b border-white/5 bg-white/2">
                    <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Sensor Alert History (Last 24 Hours)</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px] pt-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={alertHistoryData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 9}} />
                        <Tooltip contentStyle={{ backgroundColor: '#050b14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                        <Legend verticalAlign="top" align="center" iconType="circle" wrapperStyle={{ fontSize: '10px', textTransform: 'uppercase', paddingBottom: '10px' }} />
                        <Bar dataKey="Temperature" stackId="a" fill="#f97316" barSize={12} radius={[0, 0, 0, 0]} />
                        <Bar dataKey="Tamper" stackId="a" fill="#ef4444" />
                        <Bar dataKey="Camera" stackId="a" fill="#eab308" radius={[2, 2, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Active Device Alerts Table */}
              <div className="lg:col-span-4">
                <Card className="glass-card border-white/5 bg-black/40">
                  <CardHeader className="py-4 border-b border-white/5 bg-white/2">
                    <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Active Device Alerts & Status Table</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-white/5">
                        <TableRow className="border-white/5 hover:bg-transparent">
                          <TableHead className="text-[9px] font-bold uppercase py-3">Time</TableHead>
                          <TableHead className="text-[9px] font-bold uppercase py-3">Vehicle</TableHead>
                          <TableHead className="text-[9px] font-bold uppercase py-3">Severity</TableHead>
                          <TableHead className="text-[9px] font-bold uppercase py-3">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {alerts?.map((alert) => (
                          <TableRow key={alert.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                            <TableCell className="py-3 text-[10px] font-mono text-muted-foreground">
                              {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
                            </TableCell>
                            <TableCell className="py-3 text-[10px] font-bold text-white">{alert.vehicle}</TableCell>
                            <TableCell className="py-3">
                              <span className="text-[9px] font-bold text-destructive animate-pulse">HIGH</span>
                            </TableCell>
                            <TableCell className="py-3 text-[10px] text-muted-foreground uppercase">{alert.action}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>

          <footer className="p-6 border-t border-white/5 text-center bg-black/20">
            <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-bold">
              ChemGuard AI Logistics Security Terminal | Node v4.2.1-HW | SAT LINK: [ACTIVE]
            </p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

function HealthCard({ title, value, alerts, status, icon: Icon, color, borderColor }: any) {
  return (
    <div className={cn(
      "p-4 rounded-xl border bg-white/2 relative overflow-hidden group transition-all hover:bg-white/5",
      borderColor
    )}>
      <div className="flex items-center gap-3 mb-3">
        <div className={cn("p-2 rounded-lg bg-white/5", color)}>
          <Icon className="w-4 h-4" />
        </div>
        <p className="text-[10px] font-bold text-white/80 uppercase tracking-tighter">{title}</p>
      </div>
      <div className="flex items-baseline gap-2 mb-3">
        <p className={cn("text-2xl font-headline font-bold", color)}>{value}</p>
        <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Healthy</span>
      </div>
      <div className="flex items-center gap-3 border-t border-white/5 pt-3">
        {alerts !== undefined ? (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[8px] font-bold text-white/60 uppercase">{alerts} Active Alerts</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#10b981]" />
            <span className="text-[8px] font-bold text-white/60 uppercase">{status}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
          <span className="text-[8px] font-bold text-white/60 uppercase">Offline</span>
        </div>
      </div>
      {/* Glow Effect */}
      <div className={cn("absolute -bottom-4 -right-4 w-12 h-12 rounded-full opacity-5 blur-xl bg-current", color)} />
    </div>
  )
}
