"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TransportSidebar } from "@/components/transport/transport-sidebar"
import { TransportTopBar } from "@/components/transport/transport-top-bar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Info, 
  MoreHorizontal, 
  Loader2, 
  Database,
  Filter,
  BarChart3,
  PieChart as PieChartIcon
} from "lucide-react"
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from "recharts"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, limit, doc, setDoc } from "firebase/firestore"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

/**
 * Alerts & Incidents Page - Strategic incident management and threat intelligence terminal.
 */
export default function AlertsAndIncidentsPage() {
  const db = useFirestore()
  const [searchQuery, setSearchQuery] = React.useState("")

  // Real-time listener for transport alerts
  const alertsQuery = useMemoFirebase(() => {
    return query(collection(db, "transport_alerts"), orderBy("timestamp", "desc"), limit(100))
  }, [db])

  const { data: alerts, isLoading } = useCollection(alertsQuery)

  // Filtered alerts for search
  const filteredAlerts = React.useMemo(() => {
    if (!alerts) return []
    return alerts.filter(a => 
      a.alertId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.shipmentId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.type?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [alerts, searchQuery])

  // Summary Logic
  const criticalCount = alerts?.filter(a => a.severity === 'Critical' && a.status !== 'Resolved').length || 0
  const warningCount = alerts?.filter(a => a.status === 'Investigating').length || 0
  const resolvedCount = alerts?.filter(a => a.status === 'Resolved').length || 0

  // Chart Data
  const breakdownData = React.useMemo(() => [
    { name: "Critical", value: alerts?.filter(a => a.severity === 'Critical').length || 0, color: "#ef4444" },
    { name: "Warning", value: alerts?.filter(a => a.severity === 'Warning').length || 0, color: "#f97316" },
    { name: "Info", value: alerts?.filter(a => a.severity === 'Info').length || 0, color: "#06b6d4" },
  ], [alerts])

  const locationData = React.useMemo(() => {
    const counts: Record<string, number> = {}
    alerts?.forEach(a => {
      counts[a.location] = (counts[a.location] || 0) + 1
    })
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
  }, [alerts])

  const handleSeedAlerts = async () => {
    const demoAlerts = [
      { id: "AL-CR-1123", alertId: "AL-CR-1123", shipmentId: "SHP-9988-NL", location: "Port of Rotterdam", type: "Tamper Alert", severity: "Critical", status: "Open", timestamp: new Date().toISOString(), description: "Tank Valve A Tampered | 14:10:05" },
      { id: "AL-WA-4015", alertId: "AL-WA-4015", shipmentId: "SHP-7721-BE", location: "Antwerp Terminal", type: "Unauthorized Access", severity: "Warning", status: "Investigating", timestamp: new Date(Date.now() - 3600000).toISOString(), description: "Restricted zone proximity breach." },
      { id: "AL-CR-9121", alertId: "AL-CR-9121", shipmentId: "SHP-6610-US", location: "Houston Canal", type: "Temp. Threshold (H2SO4)", severity: "Critical", status: "Open", timestamp: new Date(Date.now() - 7200000).toISOString(), description: "Batch thermal variance exceeds safety limits." },
      { id: "AL-WA-3021", alertId: "AL-WA-3021", shipmentId: "SHP-5541-SG", location: "Singapore Hub", type: "Route Deviation", severity: "Warning", status: "Acknowledged", timestamp: new Date(Date.now() - 10800000).toISOString(), description: "Asset off planned path (5.2km)." },
      { id: "AL-RI-1120", alertId: "AL-RI-1120", shipmentId: "SHP-4409-AE", location: "Dubai Logistics", type: "Seal Breach", severity: "Warning", status: "Resolved", timestamp: new Date(Date.now() - 14400000).toISOString(), description: "Container seal integrity compromised." },
      { id: "AL-CR-0012", alertId: "AL-CR-0012", shipmentId: "SHP-2233-KR", location: "Busan Port", type: "Communication Loss", severity: "Critical", status: "Open", timestamp: new Date(Date.now() - 18000000).toISOString(), description: "Satellite telemetry sync lost." },
    ]

    for (const alert of demoAlerts) {
      await setDoc(doc(db, "transport_alerts", alert.id), alert, { merge: true })
    }

    toast({
      title: "Tactical Alert Grid Synced",
      description: "Provisioning security incidents to neural operations center."
    })
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Critical":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30 h-5 px-2 text-[9px] uppercase font-bold animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.3)]">Critical</Badge>
      case "Warning":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 h-5 px-2 text-[9px] uppercase font-bold">Warning</Badge>
      case "Info":
        return <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 h-5 px-2 text-[9px] uppercase font-bold">Info</Badge>
      default:
        return <Badge variant="outline" className="h-5 px-2 text-[9px] uppercase font-bold">{severity}</Badge>
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "text-destructive"
      case "Investigating": return "text-orange-400"
      case "Acknowledged": return "text-cyan-400"
      case "Resolved": return "text-emerald-400"
      default: return "text-white/60"
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#050b14] text-white selection:bg-cyan-500/30">
        <TransportSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent relative">
          <TransportTopBar />
          
          <main className="flex-1 p-6 space-y-6 relative z-10">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
              <div className="space-y-1">
                <h1 className="text-3xl font-headline font-bold tracking-tight uppercase flex items-center gap-3">
                  Alerts & Incidents <span className="text-muted-foreground font-normal text-lg">| Security Intelligence</span>
                </h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">Logistics Command Center | Unified Threat Matrix</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">OCT 27, 2024 | 14:12 GMT</span>
                </div>
                <Button onClick={handleSeedAlerts} variant="outline" className="h-10 border-white/10 bg-white/5 hover:bg-white/10 text-xs gap-2">
                  <Database className="w-3.5 h-3.5" />
                  Seed Grid
                </Button>
              </div>
            </header>

            {/* Summary Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SummaryCard 
                title="Critical Alerts" 
                value={criticalCount} 
                subText="Active | High Severity" 
                trend="+3% Today" 
                icon={ShieldAlert} 
                color="text-destructive" 
                bg="bg-destructive/10" 
                border="border-destructive/30"
                glow="shadow-[0_0_20px_rgba(239,68,68,0.15)]"
              />
              <SummaryCard 
                title="Warnings" 
                value={warningCount} 
                subText="Pending | Investigating" 
                trend="+8% Today" 
                icon={AlertTriangle} 
                color="text-orange-400" 
                bg="bg-orange-400/10" 
                border="border-orange-400/30"
              />
              <SummaryCard 
                title="Resolved Incidents" 
                value={resolvedCount} 
                subText="Last 24h" 
                trend="+15% Today" 
                icon={CheckCircle2} 
                color="text-emerald-400" 
                bg="bg-emerald-400/10" 
                border="border-emerald-400/30"
              />
            </div>

            {/* Main Operational Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
              {/* Left Column: Alerts Log Table */}
              <div className="lg:col-span-8 space-y-6">
                <Card className="glass-card border-white/5 bg-white/[0.02] flex flex-col h-full overflow-hidden">
                  <CardHeader className="py-4 border-b border-white/5 flex flex-row items-center justify-between bg-white/[0.02]">
                    <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest leading-none">Active Alerts Log</CardTitle>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                        <Input 
                          placeholder="Search Alerts..." 
                          className="h-8 pl-8 w-48 bg-black/20 border-white/10 text-[10px] uppercase font-bold"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Filter className="w-3.5 h-3.5" /></Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 overflow-auto">
                    {isLoading ? (
                      <div className="h-[400px] flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                        <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Scanning Secure Frequencies...</p>
                      </div>
                    ) : filteredAlerts.length > 0 ? (
                      <Table>
                        <TableHeader className="bg-white/[0.02]">
                          <TableRow className="border-white/5 hover:bg-transparent uppercase">
                            <TableHead className="text-[9px] font-bold py-4 pl-6">Alert ID</TableHead>
                            <TableHead className="text-[9px] font-bold py-4">Shipment ID</TableHead>
                            <TableHead className="text-[9px] font-bold py-4">Location</TableHead>
                            <TableHead className="text-[9px] font-bold py-4">Type</TableHead>
                            <TableHead className="text-[9px] font-bold py-4 text-center">Severity</TableHead>
                            <TableHead className="text-[9px] font-bold py-4 pr-6 text-right">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredAlerts.map((alert) => (
                            <TableRow key={alert.id} className="border-white/5 hover:bg-cyan-500/5 transition-all group">
                              <TableCell className="py-4 pl-6">
                                <div className="flex flex-col">
                                  <span className="text-[10px] font-mono font-bold text-white">{alert.alertId}</span>
                                  <span className="text-[8px] text-muted-foreground uppercase">{alert.description}</span>
                                </div>
                              </TableCell>
                              <TableCell className="py-4 text-[10px] font-mono text-cyan-400/80">{alert.shipmentId}</TableCell>
                              <TableCell className="py-4 text-[10px] text-muted-foreground">{alert.location}</TableCell>
                              <TableCell className="py-4 text-[10px] text-white/80 font-medium">{alert.type}</TableCell>
                              <TableCell className="py-4 text-center">
                                {getSeverityBadge(alert.severity)}
                              </TableCell>
                              <TableCell className={cn("py-4 pr-6 text-right text-[10px] font-bold uppercase", getStatusColor(alert.status))}>
                                {alert.status}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="h-[400px] flex flex-col items-center justify-center text-muted-foreground">
                        <ShieldAlert className="w-12 h-12 opacity-10 mb-4" />
                        <p className="text-xs uppercase tracking-widest">Zero active threats detected in current perimeter.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Analytics Panels */}
              <div className="lg:col-span-4 space-y-6">
                {/* Panel 1: Alerts Breakdown Donut */}
                <Card className="glass-card border-white/5 bg-white/[0.02]">
                  <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                    <CardTitle className="text-[10px] font-bold text-white uppercase tracking-widest">Active Alerts Breakdown</CardTitle>
                    <PieChartIcon className="w-3.5 h-3.5 text-cyan-400" />
                  </CardHeader>
                  <CardContent className="p-6 h-[300px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={breakdownData}
                          innerRadius={60}
                          outerRadius={85}
                          paddingAngle={8}
                          dataKey="value"
                          stroke="none"
                        >
                          {breakdownData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#0a0f18', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-10">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Total</p>
                      <p className="text-3xl font-headline font-bold text-white">{alerts?.length || 0}</p>
                    </div>
                    
                    <div className="flex justify-center gap-4 mt-4">
                      {breakdownData.map(item => (
                        <div key={item.name} className="flex flex-col items-center">
                          <div className="flex items-center gap-1.5 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-[8px] font-bold text-muted-foreground uppercase">{item.name}</span>
                          </div>
                          <span className="text-[10px] font-bold text-white">{Math.round((item.value / (alerts?.length || 1)) * 100)}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Panel 2: Alerts by Location Bar */}
                <Card className="glass-card border-white/5 bg-white/[0.02]">
                  <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                    <CardTitle className="text-[10px] font-bold text-white uppercase tracking-widest">Alerts by Location (Active)</CardTitle>
                    <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                  </CardHeader>
                  <CardContent className="p-6 h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={locationData} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                        <XAxis type="number" hide />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 9 }}
                          width={80}
                        />
                        <Tooltip contentStyle={{ backgroundColor: '#0a0f18', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                        <Bar dataKey="count" fill="#06b6d4" radius={[0, 4, 4, 0]} barSize={12} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>

          <footer className="p-6 border-t border-white/5 text-center bg-black/20">
            <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-bold">
              ChemGuard AI Logistics Security Terminal | Node v4.2.1-AL | SAT LINK: [LOCKED]
            </p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

function SummaryCard({ title, value, subText, trend, icon: Icon, color, bg, border, glow }: any) {
  return (
    <Card className={cn("glass-card bg-white/[0.02] border transition-all hover:scale-[1.02]", border, glow)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">{title}</p>
            <div className="flex items-baseline gap-2">
              <span className={cn("text-4xl font-headline font-bold", color)}>[{value}]</span>
            </div>
          </div>
          <div className={cn("p-2.5 rounded-xl border border-white/5", bg)}>
            <Icon className={cn("w-6 h-6", color)} />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-white/60 uppercase tracking-tighter">{subText}</p>
          <div className="flex items-center gap-2">
            <div className={cn("px-2 py-0.5 rounded text-[8px] font-bold uppercase", bg, color)}>
              {trend}
            </div>
            {/* Tiny sparkline representation */}
            <div className="flex-1 h-4 flex items-end gap-0.5">
              {[40, 70, 45, 90, 65, 80, 60].map((h, i) => (
                <div key={i} className={cn("flex-1 rounded-t-[1px]", color === 'text-destructive' ? 'bg-destructive/20' : 'bg-cyan-500/20')} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
