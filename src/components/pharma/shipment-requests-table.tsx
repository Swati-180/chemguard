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
import { Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

const shipments = [
  { id: "SH-1001", batchId: "BAC1001", transporter: "EuroExpress", vehicleId: "CGV-102", route: "R-North-01", status: "In Transit", eta: "14:30 GMT" },
  { id: "SH-1002", batchId: "BAC1002", transporter: "Ladtar Logistics", vehicleId: "CGV-215", route: "R-West-04", status: "Pending", eta: "18:00 GMT" },
  { id: "SH-1003", batchId: "BAC1003", transporter: "Global Freight", vehicleId: "CGV-098", route: "R-East-02", status: "Loading", eta: "16:15 GMT" },
  { id: "SH-1004", batchId: "BAC1004", transporter: "EuroExpress", vehicleId: "CGV-044", route: "R-South-09", status: "In Transit", eta: "12:00 GMT" },
  { id: "SH-1005", batchId: "BAC1005", transporter: "Ladtar Logistics", vehicleId: "CGV-112", route: "R-North-02", status: "Delayed", eta: "20:45 GMT" },
  { id: "SH-1006", batchId: "BAC1006", transporter: "Global Freight", vehicleId: "CGV-301", route: "R-Central-05", status: "In Transit", eta: "15:30 GMT" },
  { id: "SH-1007", batchId: "BAC1007", transporter: "EuroExpress", vehicleId: "CGV-221", route: "R-West-01", status: "Pending", eta: "09:00 GMT" },
  { id: "SH-1008", batchId: "BAC1008", transporter: "Ladtar Logistics", vehicleId: "CGV-088", route: "R-East-05", status: "Loading", eta: "11:20 GMT" },
  { id: "SH-1009", batchId: "BAC1009", transporter: "Global Freight", vehicleId: "CGV-404", route: "R-North-08", status: "Completed", eta: "08:45 GMT" },
]

export function ShipmentRequestsTable() {
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
      {/* Decorative Circuit Board Elements */}
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
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent uppercase">
              <TableHead className="w-12 text-center py-4"><Checkbox className="border-cyan-500/50" /></TableHead>
              <TableHead className="text-[10px] font-bold py-4">Shipment ID</TableHead>
              <TableHead className="text-[10px] font-bold py-4">Batch ID</TableHead>
              <TableHead className="text-[10px] font-bold py-4">Transporter</TableHead>
              <TableHead className="text-[10px] font-bold py-4">Vehicle ID</TableHead>
              <TableHead className="text-[10px] font-bold py-4">Route</TableHead>
              <TableHead className="text-[10px] font-bold py-4">Status</TableHead>
              <TableHead className="text-[10px] font-bold py-4">ETA</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.map((s) => (
              <TableRow key={s.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                <TableCell className="text-center py-3"><Checkbox className="border-white/20" /></TableCell>
                <TableCell className="py-3 text-[11px] font-mono font-bold text-cyan-400">{s.id}</TableCell>
                <TableCell className="py-3 text-[11px] text-white font-medium">{s.batchId}</TableCell>
                <TableCell className="py-3 text-[11px] text-muted-foreground">{s.transporter}</TableCell>
                <TableCell className="py-3 text-[11px] font-mono text-primary">{s.vehicleId}</TableCell>
                <TableCell className="py-3 text-[11px] text-muted-foreground">{s.route}</TableCell>
                <TableCell className="py-3">{getStatusBadge(s.status)}</TableCell>
                <TableCell className="py-3 text-[11px] font-mono text-muted-foreground">{s.eta}</TableCell>
                <TableCell className="py-3">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between p-4 border-t border-white/5 bg-white/2">
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Page 1 of 5</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-white"><ChevronLeft className="w-4 h-4" /></Button>
              <span className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold border border-cyan-500/30">1</span>
              <span className="w-6 h-6 rounded hover:bg-white/5 text-muted-foreground flex items-center justify-center text-[10px] font-bold cursor-pointer">2</span>
              <span className="w-6 h-6 rounded hover:bg-white/5 text-muted-foreground flex items-center justify-center text-[10px] font-bold cursor-pointer">3</span>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-white"><ChevronRight className="w-4 h-4" /></Button>
            </div>
          </div>
          <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
            Total Requests: 42
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
