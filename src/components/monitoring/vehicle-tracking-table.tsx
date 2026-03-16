
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

const vehicles = [
  { id: "CGV-102", driver: "J. Smith", shipment: "#8902", location: "Near Paris, FR", status: "In Transit", speed: "88 km/h", severity: "success" },
  { id: "CGV-215", driver: "L. Chen", shipment: "#7731", location: "Berlin, DE", status: "Delayed", speed: "65 km/h", severity: "warning" },
  { id: "CGV-098", driver: "A. Kumar", shipment: "#9115", location: "Milan, IT", status: "Critical Risk", speed: "92 km/h", severity: "danger" },
  { id: "CGV-044", driver: "M. Rossi", shipment: "#2201", location: "Prague, CZ", status: "In Transit", speed: "74 km/h", severity: "success" },
]

export function VehicleTrackingTable() {
  const getStatusBadge = (status: string, severity: string) => {
    switch (severity) {
      case "success": return <Badge className="bg-accent/10 text-accent border-accent/20">In Transit (Green)</Badge>
      case "warning": return <Badge className="bg-orange-400/10 text-orange-400 border-orange-400/20">Delayed (Orange)</Badge>
      case "danger": return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Critical Risk (Red)</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="glass-card border-white/5">
      <CardHeader className="pb-4 bg-white/5 border-b border-white/5">
        <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Live Vehicle Tracking Matrix</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-white/2">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase py-4">Vehicle ID</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Driver</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Shipment</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Location</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Status</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Speed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((v) => (
              <TableRow key={v.id} className="border-white/5 hover:bg-white/5 transition-colors">
                <TableCell className="py-4 text-xs font-mono font-bold text-primary">{v.id}</TableCell>
                <TableCell className="py-4 text-xs font-medium">{v.driver}</TableCell>
                <TableCell className="py-4 text-xs text-muted-foreground">{v.shipment}</TableCell>
                <TableCell className="py-4 text-xs">{v.location}</TableCell>
                <TableCell className="py-4">{getStatusBadge(v.status, v.severity)}</TableCell>
                <TableCell className="py-4 text-xs font-mono">{v.speed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
