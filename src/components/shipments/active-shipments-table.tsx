
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
import { cn } from "@/lib/utils"

const shipments = [
  {
    id: "SH-8822",
    batch: "Sulfur Dioxide Precursor #B001",
    transporter: "EuroExpress",
    vehicle: "CGV-102",
    route: "Route 1",
    status: "Active",
    eta: "Oct 15 10:00 AM",
    severity: "success"
  },
  {
    id: "SH-8823",
    batch: "Sulfur Chemicals Precursor #B002",
    transporter: "EuroExpress",
    vehicle: "CGV-102",
    route: "Route 2",
    status: "Delayed",
    eta: "Oct 15 10:00 AM",
    severity: "warning"
  },
  {
    id: "SH-8824",
    batch: "Sulfur Dioxide Precursor #B003",
    transporter: "EuroExpress",
    vehicle: "CGV-102",
    route: "Route 3",
    status: "Critical",
    eta: "Oct 15 10:00 AM",
    severity: "danger"
  },
  {
    id: "SH-8836",
    batch: "Sulfur Chemicals Precursor #B004",
    transporter: "EuroExpress",
    vehicle: "CGV-102",
    route: "Route 4",
    status: "Active",
    eta: "Oct 15 10:00 AM",
    severity: "success"
  },
  {
    id: "SH-8821",
    batch: "Sulfur Dioxide Precursor #B001",
    transporter: "Ladtar",
    vehicle: "CGV-102",
    route: "Route 5",
    status: "Delayed",
    eta: "Oct 15 10:00 AM",
    severity: "warning"
  },
  {
    id: "SH-8822",
    batch: "Sulfur Dioxide Precursor #B001",
    transporter: "EuroExpress",
    vehicle: "CGV-102",
    route: "Route 1",
    status: "Critical",
    eta: "Oct 15 10:00 AM",
    severity: "danger"
  }
]

export function ActiveShipmentsTable() {
  const getStatusBadge = (status: string, severity: string) => {
    switch (severity) {
      case "success":
        return (
          <Badge className="bg-accent/10 text-accent border-accent/20 flex items-center gap-1.5 h-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Active
          </Badge>
        )
      case "warning":
        return (
          <Badge className="bg-orange-400/10 text-orange-400 border-orange-400/20 flex items-center gap-1.5 h-6">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            Delayed
          </Badge>
        )
      case "danger":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20 flex items-center gap-1.5 h-6">
            <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
            Critical
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="glass-card border-white/5">
      <CardHeader className="pb-4 border-b border-white/5 bg-white/5">
        <CardTitle className="text-base font-headline font-bold text-white uppercase tracking-wider">Active Shipments</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-white/2">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase py-4">Shipment ID</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Chemical Batch</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Transporter</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Vehicle</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Route</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Status</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">ETA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shipments.map((s, idx) => (
              <TableRow key={`${s.id}-${idx}`} className="border-white/5 hover:bg-white/5 transition-colors group">
                <TableCell className="py-4 text-xs font-mono font-bold text-white">{s.id}</TableCell>
                <TableCell className="py-4 text-xs text-muted-foreground max-w-[200px] truncate">{s.batch}</TableCell>
                <TableCell className="py-4 text-xs">{s.transporter}</TableCell>
                <TableCell className="py-4 text-xs font-mono text-primary">{s.vehicle}</TableCell>
                <TableCell className="py-4 text-xs">{s.route}</TableCell>
                <TableCell className="py-4">{getStatusBadge(s.status, s.severity)}</TableCell>
                <TableCell className="py-4 text-[10px] text-muted-foreground uppercase">{s.eta}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
