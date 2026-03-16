"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Search, ChevronLeft, ChevronRight, Filter, AlertTriangle, Bell, Zap, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, limit } from "firebase/firestore"

export function AlertsMatrixTable() {
  const db = useFirestore()

  // Use 'transport_alerts' which is defined in backend.json and firestore.rules
  const alertsQuery = useMemoFirebase(() => {
    return query(collection(db, "transport_alerts"), orderBy("timestamp", "desc"), limit(20))
  }, [db])

  const { data: alerts, isLoading, error } = useCollection(alertsQuery)

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Critical":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30 h-5 px-2 text-[9px] uppercase font-bold animate-pulse">Critical</Badge>
      case "Warning":
        return <Badge className="bg-orange-400/20 text-orange-400 border-orange-400/30 h-5 px-2 text-[9px] uppercase font-bold">Warning</Badge>
      case "Info":
        return <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 h-5 px-2 text-[9px] uppercase font-bold">Info</Badge>
      default:
        return <Badge variant="outline" className="h-5 px-2 text-[9px] uppercase font-bold">{severity}</Badge>
    }
  }

  const getStatusIndicator = (status: string) => {
    const statusMap: Record<string, string> = {
      "New": "bg-destructive shadow-[0_0_10px_rgba(239,68,68,0.5)]",
      "Active": "bg-destructive shadow-[0_0_10px_rgba(239,68,68,0.5)]",
      "Investigating": "bg-orange-400",
      "Acknowledged": "bg-cyan-400",
      "Resolved": "bg-emerald-400",
      "Closed": "bg-white/40"
    }
    return (
      <div className="flex items-center gap-2">
        <div className={cn("w-1.5 h-1.5 rounded-full", statusMap[status] || "bg-white/20")} />
        <span className="text-[10px] text-white/80 font-medium">{status}</span>
      </div>
    )
  }

  return (
    <Card className="glass-card border-white/5 bg-[#111827]/40 overflow-hidden">
      <CardHeader className="py-4 border-b border-white/5 flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            Neural Threat Intelligence Matrix
          </CardTitle>
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
            {isLoading ? "Streaming Intelligence Data..." : "Active Incident Queue"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input 
              placeholder="Search Intelligence..." 
              className="h-8 w-56 bg-white/5 border-white/10 pl-8 text-[10px] focus-visible:ring-cyan-500/50" 
            />
          </div>
          <button className="flex items-center gap-2 px-3 h-8 rounded border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-[9px] font-bold text-white uppercase tracking-widest">Filters</span>
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12 space-y-4">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.3em]">Decrypting Satellite Relay</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-destructive">
            <p className="text-xs font-bold uppercase tracking-widest">Secure Link Severed</p>
            <p className="text-[10px] text-muted-foreground">Unable to authenticate connection to alerts service.</p>
          </div>
        ) : alerts && alerts.length > 0 ? (
          <Table>
            <TableHeader className="bg-white/2">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-[10px] font-bold uppercase py-3 h-10 w-[120px]">Timestamp &darr;</TableHead>
                <TableHead className="text-[10px] font-bold uppercase py-3 h-10">Intelligence Type</TableHead>
                <TableHead className="text-[10px] font-bold uppercase py-3 h-10">Geographic Node</TableHead>
                <TableHead className="text-[10px] font-bold uppercase py-3 h-10">Linked Entity</TableHead>
                <TableHead className="text-[10px] font-bold uppercase py-3 h-10">Severity Index</TableHead>
                <TableHead className="text-[10px] font-bold uppercase py-3 h-10">Lifecycle Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => (
                <TableRow key={alert.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                  <TableCell className="py-3 text-[10px] font-mono text-muted-foreground">
                    {alert.timestamp ? new Date(alert.timestamp).toLocaleTimeString() : 'N/A'}
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      <Bell className={cn("w-3 h-3", alert.severity === 'Critical' ? 'text-destructive' : 'text-cyan-400')} />
                      <span className="text-[10px] text-white font-bold uppercase tracking-tight">{alert.type || alert.alertType}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-[10px] text-white/70">{alert.location}</TableCell>
                  <TableCell className="py-3 text-[10px] font-mono text-cyan-400">
                    [{alert.shipmentId || alert.id.substring(0, 8)}]
                  </TableCell>
                  <TableCell className="py-3">{getSeverityBadge(alert.severity)}</TableCell>
                  <TableCell className="py-3">{getStatusIndicator(alert.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-12 text-center text-muted-foreground">
            <p className="text-xs uppercase tracking-widest">No active threats detected.</p>
          </div>
        )}
        
        <div className="flex items-center justify-between p-4 border-t border-white/5 bg-white/2">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
              Live Stream Active
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 rounded border border-white/10 hover:bg-white/5 disabled:opacity-30" disabled>
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <div className="flex items-center gap-1">
              <span className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold">1</span>
            </div>
            <button className="p-1 rounded border border-white/10 hover:bg-white/5 disabled:opacity-30" disabled>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
