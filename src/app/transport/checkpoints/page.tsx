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
  Calendar as CalendarIcon, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Database,
  Globe,
  Loader2,
  Filter
} from "lucide-react"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, limit, doc, setDoc } from "firebase/firestore"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

/**
 * Checkpoint Logs Page - Real-time chemical traceability matrix.
 */
export default function CheckpointLogsPage() {
  const db = useFirestore()
  const [searchQuery, setSearchQuery] = React.useState("")

  // Real-time listener for checkpoint logs
  const logsQuery = useMemoFirebase(() => {
    return query(collection(db, "checkpoint_logs"), orderBy("arrivalTime", "desc"), limit(50))
  }, [db])

  const { data: logs, isLoading } = useCollection(logsQuery)

  const handleSeedData = async () => {
    const demoLogs = [
      { id: "cp_09223", checkpointId: "CP-09223", shipmentId: "CT-11445", location: "Houston Chemical Terminal", driver: "Maria Sanchez", arrivalTime: new Date().toISOString(), status: "Verified" },
      { id: "cp_10115", checkpointId: "CP-10115", shipmentId: "CT-12001", location: "Port of Rotterdam", driver: "Alex Petrov", arrivalTime: new Date(Date.now() - 1000 * 60 * 25).toISOString(), status: "Verified" },
      { id: "cp_11330", checkpointId: "CP-11330", shipmentId: "CT-11445", location: "Shanghai Logistics Hub", driver: "Chloe Lee", arrivalTime: new Date(Date.now() - 1000 * 60 * 55).toISOString(), status: "Delay Reported" },
      { id: "cp_12150", checkpointId: "CP-12150", shipmentId: "CT-13200", location: "Singapore Chemical Park", driver: "Zhang Wei", arrivalTime: new Date(Date.now() - 1000 * 60 * 80).toISOString(), status: "Inspection Pending" },
      { id: "cp_13002", checkpointId: "CP-13002", shipmentId: "CT-11445", location: "New York Gateway", driver: "David Smith", arrivalTime: new Date(Date.now() - 1000 * 60 * 110).toISOString(), status: "Verified" },
    ]

    for (const log of demoLogs) {
      await setDoc(doc(db, "checkpoint_logs", log.id), log, { merge: true })
    }

    toast({
      title: "Traceability Synced",
      description: "Tactical checkpoint logs provisioned to global ledger."
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 gap-1.5 h-6 px-3 uppercase font-bold text-[9px]"><CheckCircle2 className="w-3 h-3" /> Verified</Badge>
      case "Delay Reported":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 gap-1.5 h-6 px-3 uppercase font-bold text-[9px]"><Clock className="w-3 h-3" /> Delay Reported</Badge>
      case "Inspection Pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 gap-1.5 h-6 px-3 uppercase font-bold text-[9px]"><AlertTriangle className="w-3 h-3" /> Inspection Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Derive stats
  const verifiedCount = logs?.filter(l => l.status === 'Verified').length || 154
  const delayedCount = logs?.filter(l => l.status === 'Delay Reported').length || 12
  const issueCount = logs?.filter(l => l.status === 'Inspection Pending').length || 3

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#050b14] text-white">
        <TransportSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent relative">
          {/* Cyber Background Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <TransportTopBar />
          
          <main className="flex-1 p-6 space-y-6 relative z-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
              <div className="space-y-1">
                <h1 className="text-2xl font-headline font-bold tracking-tight uppercase flex items-center gap-3">
                  Checkpoint Logs <span className="text-muted-foreground font-normal text-lg">| Real-Time Chemical Traceability</span>
                </h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">Logistics Command Center | Traceability SOC</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground bg-white/5 px-4 py-2 rounded-lg border border-white/10">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span className="font-bold uppercase tracking-widest">{new Date().toUTCString().slice(5, 16)} | 14:15 GMT</span>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Filters and Table */}
              <div className="lg:col-span-8 space-y-6">
                {/* Filter Panel */}
                <Card className="glass-card border-white/5 bg-white/[0.02]">
                  <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02]">
                    <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Filter Tactical Logs</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Shipment ID (e.g., CT-11445)</label>
                        <div className="relative group">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-cyan-400" />
                          <Input 
                            placeholder="Search active manifests..." 
                            className="h-11 bg-black/20 border-white/10 pl-10 text-xs text-white focus-visible:ring-cyan-500/50"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Date Range (e.g., Last 7 Days)</label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                            <Input placeholder="From date, 2024" className="h-11 bg-black/20 border-white/10 pl-10 text-xs" />
                          </div>
                          <div className="relative flex-1">
                            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                            <Input placeholder="To Last 7 Days" className="h-11 bg-black/20 border-white/10 pl-10 text-xs" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Table */}
                <Card className="glass-card border-white/5 bg-white/[0.02] overflow-hidden flex flex-col min-h-[500px]">
                  <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                    <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Recent Checkpoint Activity</CardTitle>
                    <Button onClick={handleSeedData} size="sm" variant="ghost" className="h-8 text-[9px] font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 gap-2">
                      <Database className="w-3 h-3" /> Seed Demo Logs
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0 flex-1 overflow-auto">
                    {isLoading ? (
                      <div className="h-[400px] flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                        <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Establishing Satellite Traceability Link...</p>
                      </div>
                    ) : logs && logs.length > 0 ? (
                      <Table>
                        <TableHeader className="bg-white/[0.02]">
                          <TableRow className="border-white/5 hover:bg-transparent uppercase">
                            <TableHead className="text-[9px] font-bold py-5 pl-6">Checkpoint ID</TableHead>
                            <TableHead className="text-[9px] font-bold py-5">Shipment ID</TableHead>
                            <TableHead className="text-[9px] font-bold py-5">Location</TableHead>
                            <TableHead className="text-[9px] font-bold py-5">Driver</TableHead>
                            <TableHead className="text-[9px] font-bold py-5 text-center">Arrival Time</TableHead>
                            <TableHead className="text-[9px] font-bold py-5 pr-6 text-right">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {logs.map((log, i) => (
                            <TableRow key={log.id} className="border-white/5 hover:bg-cyan-500/5 transition-all group">
                              <TableCell className="py-4 pl-6 text-xs font-mono font-bold text-cyan-400/80">{i + 1}) {log.checkpointId}</TableCell>
                              <TableCell className="py-4 text-xs font-mono text-white/90">{log.shipmentId}</TableCell>
                              <TableCell className="py-4 text-xs text-muted-foreground">{log.location}</TableCell>
                              <TableCell className="py-4 text-xs text-white/80">{log.driver}</TableCell>
                              <TableCell className="py-4 text-[10px] font-mono text-center text-muted-foreground">
                                {new Date(log.arrivalTime).toISOString().slice(0, 16).replace('T', ' ')}
                              </TableCell>
                              <TableCell className="py-4 pr-6 text-right">
                                {getStatusBadge(log.status)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="h-[400px] flex flex-col items-center justify-center text-muted-foreground">
                        <MapPin className="w-12 h-12 opacity-10 mb-4" />
                        <p className="text-xs uppercase tracking-widest">No trace logs detected in current grid.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: Map and Summary */}
              <div className="lg:col-span-4 space-y-6">
                {/* Live Checkpoint Map */}
                <Card className="glass-card border-cyan-500/20 bg-black/40 overflow-hidden h-[450px]">
                  <CardHeader className="py-4 border-b border-white/5 bg-white/2 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Live Checkpoint Map</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 relative h-full bg-[#0a0f18] flex items-center justify-center">
                    {/* World Map SVG Background */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none p-4">
                      <svg viewBox="0 0 1000 500" className="w-full h-full fill-white/40">
                        <path d="M150,150 Q200,100 250,150 T350,150 T450,200 T550,180 T650,220 T750,150 T850,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <circle cx="200" cy="150" r="40" />
                        <circle cx="450" cy="200" r="60" />
                        <circle cx="700" cy="150" r="50" />
                        <circle cx="300" cy="300" r="30" />
                      </svg>
                    </div>

                    {/* Checkpoint Routes */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <path d="M 200 300 Q 400 200 600 300" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="5,5" className="opacity-40" />
                      <path d="M 600 300 Q 750 250 850 350" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="5,5" className="opacity-40" />
                    </svg>

                    {/* Checkpoint Markers */}
                    <CheckpointMarker top="60%" left="20%" label="New York" status="active" />
                    <CheckpointMarker top="45%" left="45%" label="Rotterdam" status="active" />
                    <CheckpointMarker top="65%" left="75%" label="Singapore" status="warning" />
                    <CheckpointMarker top="40%" left="85%" label="Shanghai" status="alert" />

                    {/* Bottom Map Text Elements */}
                    <div className="absolute bottom-20 left-6 space-y-1">
                      <div className="h-0.5 w-12 bg-cyan-500/50 rounded-full" />
                      <div className="h-0.5 w-8 bg-cyan-500/30 rounded-full" />
                      <div className="h-0.5 w-10 bg-cyan-500/20 rounded-full" />
                    </div>
                  </CardContent>
                </Card>

                {/* Summary Matrix */}
                <Card className="glass-card border-white/5 bg-white/[0.02]">
                  <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02]">
                    <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest text-muted-foreground">Total Recent Checkpoints</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <SummaryStat label="Verified:" value={verifiedCount} color="text-emerald-400" />
                      <SummaryStat label="Delayed:" value={delayedCount} color="text-orange-400" />
                      <SummaryStat label="Issue:" value={issueCount} color="text-destructive" />
                      <SummaryStat label="Critical:" value={1} color="text-destructive" animate />
                    </div>
                  </CardContent>
                </Card>

                {/* Decorative Bottom Tag */}
                <div className="p-4 rounded-xl border border-white/5 bg-black/40 flex items-center justify-between">
                  <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.3em]">Data Authenticated</span>
                  <Button variant="link" className="h-auto p-0 text-[8px] font-bold uppercase tracking-widest text-cyan-400 underline underline-offset-4">Chain Log History</Button>
                </div>
              </div>
            </div>
          </main>

          <footer className="p-6 border-t border-white/5 text-center bg-black/20">
            <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-bold">
              ChemGuard AI Logistics Security Terminal | Node v4.2.1-TR | SAT LINK: [LOCKED]
            </p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

function CheckpointMarker({ top, left, label, status }: { top: string, left: string, label: string, status: 'active' | 'warning' | 'alert' }) {
  const colors = {
    active: 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]',
    warning: 'bg-orange-400 shadow-[0_0_10px_#fb923c]',
    alert: 'bg-destructive shadow-[0_0_10px_#ef4444]',
  }

  return (
    <div className="absolute group" style={{ top, left }}>
      <div className="relative">
        <div className={cn("w-2.5 h-2.5 rounded-full border-2 border-background z-10 relative", colors[status])} />
        {status === 'alert' && <div className="absolute -inset-2 rounded-full bg-destructive animate-ping opacity-40" />}
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/80 border border-white/10 px-2 py-0.5 rounded backdrop-blur-sm whitespace-nowrap z-20">
          <span className="text-[8px] font-bold text-white uppercase tracking-tighter">{label}</span>
        </div>
      </div>
    </div>
  )
}

function SummaryStat({ label, value, color, animate }: { label: string, value: number, color: string, animate?: boolean }) {
  return (
    <div className="space-y-1">
      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">{label}</p>
      <p className={cn("text-2xl font-headline font-bold", color, animate && "animate-pulse")}>{value}</p>
    </div>
  )
}
