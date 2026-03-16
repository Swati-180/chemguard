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
import { Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal, Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, limit } from "firebase/firestore"

export function ShipmentRequestsTable() {
  const db = useFirestore()

  const shipmentsQuery = useMemoFirebase(() => {
    return query(collection(db, "shipment_requests"), orderBy("createdAt", "desc"), limit(25))
  }, [db])

  const { data: shipments, isLoading, error } = useCollection(shipmentsQuery)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Transit":
        return <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 h-6 px-3">In Transit</Badge>
      case "Pending":
        return <Badge className="bg-orange-400/20 text-orange-400 border-orange-400/30 h-6 px-3">Pending</Badge>
      case "Loading":
        return <Badge className="bg-primary/20 text-primary border-primary/30 h-6 px-3">Loading</Badge>
      case "Delayed":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30 h-6 px-3">Delayed</Badge>
      case "Completed":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 h-6 px-3">Completed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="glass-card border-cyan-500/20 bg-[#0a0f18]/60 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 20H100L120 0H200" stroke="currentColor" strokeWidth="1" className="text-cyan-400" />
          <path d="M800 380H700L680 400H600" stroke="currentColor" strokeWidth="1" className="text-cyan-400" />
        </svg>
      </div>

      <CardHeader className="p-0 border-b border-white/5">
        <div className="flex flex-wrap items-center justify-between p-6 bg-white/2">
          <CardTitle className="text-lg font-headline font-bold text-white uppercase tracking-widest">Shipment Matrix</CardTitle>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input 
                placeholder="Search requests..." 
                className="h-9 w-64 pl-9 bg-white/5 border-white/10 text-xs focus-visible:ring-cyan-500/50"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9 gap-2 border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase">
              <Filter className="w-3.5 h-3.5" />
              Filters
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.3em]">Synchronizing Logistics Stream</p>
          </div>
        ) : error ? (
          <div className="p-20 text-center text-destructive">
            <p className="text-xs font-bold uppercase tracking-widest">Access Denied</p>
            <p className="text-[10px] text-muted-foreground">Insufficient clearance to view shipment data.</p>
          </div>
        ) : shipments && shipments.length > 0 ? (
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5 hover:bg-transparent uppercase">
                <TableHead className="w-12 text-center py-4"><Checkbox className="border-cyan-500/50" /></TableHead>
                <TableHead className="text-[10px] font-bold py-4">Shipment ID</TableHead>
                <TableHead className="text-[10px] font-bold py-4">Origin</TableHead>
                <TableHead className="text-[10px] font-bold py-4">Destination</TableHead>
                <TableHead className="text-[10px] font-bold py-4">Tracking #</TableHead>
                <TableHead className="text-[10px] font-bold py-4">Status</TableHead>
                <TableHead className="text-[10px] font-bold py-4">ETA</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((s) => (
                <TableRow key={s.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                  <TableCell className="text-center py-3"><Checkbox className="border-white/20" /></TableCell>
                  <TableCell className="py-3 text-[11px] font-mono font-bold text-cyan-400">{s.shipmentIdentifier}</TableCell>
                  <TableCell className="py-3 text-[11px] text-white font-medium">{s.originLocation}</TableCell>
                  <TableCell className="py-3 text-[11px] text-muted-foreground">{s.destinationLocation}</TableCell>
                  <TableCell className="py-3 text-[11px] font-mono text-primary">{s.trackingNumber || 'UNASSIGNED'}</TableCell>
                  <TableCell className="py-3">{getStatusBadge(s.status)}</TableCell>
                  <TableCell className="py-3 text-[11px] font-mono text-muted-foreground">
                    {s.expectedArrivalTime ? new Date(s.expectedArrivalTime).toLocaleTimeString() : 'TBD'}
                  </TableCell>
                  <TableCell className="py-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-20 text-center text-muted-foreground">
            <p className="text-xs uppercase tracking-widest">No active shipments found in database.</p>
          </div>
        )}
        <div className="flex items-center justify-between p-4 border-t border-white/5 bg-white/2">
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Page 1 of 1</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-white" disabled><ChevronLeft className="w-4 h-4" /></Button>
              <span className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold border border-cyan-500/30">1</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-white" disabled><ChevronRight className="w-4 h-4" /></Button>
            </div>
          </div>
          <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
            Live Stream: ACTIVE
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
