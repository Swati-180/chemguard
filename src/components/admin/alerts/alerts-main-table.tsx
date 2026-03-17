
"use client"

import * as React from "react"
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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  CheckCircle2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Loader2,
  AlertTriangle,
  ShieldAlert
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, limit, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
import { AlertDetailsModal } from "./alert-details-modal"

export function AlertsMainTable() {
  const db = useFirestore()
  const [search, setSearch] = React.useState("")
  const [selectedAlert, setSelectedAlert] = React.useState<any | null>(null)

  const alertsQuery = useMemoFirebase(() => {
    return query(collection(db, "transport_alerts"), orderBy("timestamp", "desc"), limit(50))
  }, [db])

  const { data: alerts, isLoading } = useCollection(alertsQuery)

  const filteredData = React.useMemo(() => {
    if (!alerts) return []
    return alerts.filter(item => 
      item.id?.toLowerCase().includes(search.toLowerCase()) ||
      item.shipmentId?.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase()) ||
      item.type?.toLowerCase().includes(search.toLowerCase())
    )
  }, [alerts, search])

  const handleResolve = async (id: string) => {
    try {
      await updateDoc(doc(db, "transport_alerts", id), { status: "Resolved" })
      toast({ title: "Incident Mitigated", description: `Alert ${id} has been marked as resolved.` })
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Unable to update status." })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "transport_alerts", id))
      toast({ title: "Alert Archived", description: "Record removed from active grid." })
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Archive operation failed." })
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Critical":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30 h-6 px-3 uppercase font-bold animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.3)]">Critical</Badge>
      case "Warning":
        return <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/30 h-6 px-3 uppercase font-bold">Warning</Badge>
      case "Info":
        return <Badge className="bg-primary/10 text-primary border-primary/30 h-6 px-3 uppercase font-bold">Info</Badge>
      default:
        return <Badge variant="outline" className="h-6 px-3 uppercase font-bold">{severity}</Badge>
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "text-destructive"
      case "Investigating": return "text-orange-400"
      case "Resolved": return "text-emerald-400"
      default: return "text-white/60"
    }
  }

  return (
    <Card className="glass-card border-white/5 bg-white/[0.02] overflow-hidden flex flex-col min-h-[600px]">
      <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between flex-wrap gap-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search incident manifest..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-64 bg-black/20 border-white/10 pl-10 text-xs text-white focus-visible:ring-primary/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-10 border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest gap-2">
            <Filter className="w-3.5 h-3.5" /> Severity Filter
          </Button>
          <Button 
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8," + 
                ["Alert ID,Shipment,Location,Type,Severity,Status,Time"].join(",") + "\n" +
                filteredData.map(a => `${a.id},${a.shipmentId},${a.location},${a.type},${a.severity},${a.status},${a.timestamp}`).join("\n");
              window.open(encodeURI(csvContent));
            }}
            variant="outline" size="sm" className="h-10 border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest"
          >
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-auto">
        {isLoading ? (
          <div className="h-[400px] flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-xs font-bold text-primary/60 uppercase tracking-[0.4em] animate-pulse">Syncing Tactical Grid</p>
          </div>
        ) : filteredData.length > 0 ? (
          <Table>
            <TableHeader className="bg-white/[0.02]">
              <TableRow className="border-white/5 hover:bg-transparent uppercase">
                <TableHead className="text-[9px] font-bold py-5 pl-6">Alert ID</TableHead>
                <TableHead className="text-[9px] font-bold py-5">Shipment ID</TableHead>
                <TableHead className="text-[9px] font-bold py-5">Location</TableHead>
                <TableHead className="text-[9px] font-bold py-5">Intel Type</TableHead>
                <TableHead className="text-[9px] font-bold py-5 text-center">Severity</TableHead>
                <TableHead className="text-[9px] font-bold py-5">Status</TableHead>
                <TableHead className="text-[9px] font-bold py-5 pr-6 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((alert) => (
                <TableRow key={alert.id} className="border-white/5 hover:bg-white/5 transition-all group">
                  <TableCell className="py-4 pl-6">
                    <span className="text-[10px] font-mono font-bold text-white uppercase">[{alert.id}]</span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-[10px] font-mono font-bold text-primary/80">{alert.shipmentId}</span>
                  </TableCell>
                  <TableCell className="py-4 text-xs text-muted-foreground uppercase">{alert.location}</TableCell>
                  <TableCell className="py-4 text-xs font-medium text-white">{alert.type}</TableCell>
                  <TableCell className="py-4 text-center">
                    {getSeverityBadge(alert.severity)}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-1.5 h-1.5 rounded-full", alert.status === 'Open' ? 'bg-destructive animate-pulse' : 'bg-emerald-400')} />
                      <span className={cn("text-[10px] font-bold uppercase", getStatusColor(alert.status))}>{alert.status}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        onClick={() => setSelectedAlert(alert)}
                        variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#050b14] border-white/10 text-white">
                          <DropdownMenuItem onClick={() => handleResolve(alert.id)} className="text-[10px] uppercase font-bold gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Mark Resolved</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleResolve(alert.id)} className="text-[10px] uppercase font-bold gap-2"><AlertTriangle className="w-3.5 h-3.5 text-orange-400" /> Investigating</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(alert.id)} className="text-[10px] uppercase font-bold gap-2 text-destructive"><Trash2 className="w-3.5 h-3.5" /> Archive Alert</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="h-[400px] flex flex-col items-center justify-center text-muted-foreground">
            <ShieldAlert className="w-12 h-12 opacity-10 mb-4" />
            <p className="text-xs uppercase tracking-widest">No active threats detected in current perimeter.</p>
          </div>
        )}
      </CardContent>
      <div className="p-4 border-t border-white/5 flex items-center justify-between bg-black/20">
        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Total: {filteredData.length} Incidents</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" disabled><ChevronLeft className="w-4 h-4" /></Button>
          <span className="w-8 h-8 rounded bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold border border-primary/30 shadow-[0_0_10px_rgba(46,222,255,0.1)]">1</span>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" disabled><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>

      <AlertDetailsModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} />
    </Card>
  )
}
