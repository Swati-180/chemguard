
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
import { MoreHorizontal, Radio, Signal, Wifi, WifiOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const alerts = [
  {
    id: "CG-GPS-001",
    type: "GPS",
    location: "Route 1 (Main)",
    status: "Active",
    lastSignal: "1 min ago",
    severity: "success"
  },
  {
    id: "CG-TS-123",
    type: "Tamper Sensor",
    location: "Truck-12 Container",
    status: "Tamper Alert",
    lastSignal: "5 min ago",
    severity: "danger"
  },
  {
    id: "CG-CAM-098",
    type: "Camera",
    location: "Checkpoint 3",
    status: "Offline",
    lastSignal: "2 hours ago",
    severity: "warning"
  },
  {
    id: "CG-TEMP-442",
    type: "Temperature",
    location: "Cold Storage B",
    status: "Normal",
    lastSignal: "12 sec ago",
    severity: "success"
  },
  {
    id: "CG-GPS-882",
    type: "GPS",
    location: "Maritime Unit 4",
    status: "Signal Low",
    lastSignal: "14 min ago",
    severity: "warning"
  },
]

export function DeviceAlertsTable() {
  const getStatusBadge = (status: string, severity: string) => {
    switch (severity) {
      case "success":
        return <Badge className="bg-accent/10 text-accent border-accent/20 h-6">Active</Badge>
      case "warning":
        return <Badge className="bg-orange-400/10 text-orange-400 border-orange-400/20 h-6">{status}</Badge>
      case "danger":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20 h-6 animate-pulse">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "GPS": return <Radio className="w-3.5 h-3.5 text-primary" />
      case "Camera": return <Radio className="w-3.5 h-3.5 text-purple-400" />
      case "Temperature": return <Radio className="w-3.5 h-3.5 text-accent" />
      default: return <Signal className="w-3.5 h-3.5 text-muted-foreground" />
    }
  }

  return (
    <Card className="glass-card border-white/5">
      <CardHeader className="py-4 border-b border-white/5 bg-white/5">
        <CardTitle className="text-sm font-headline font-semibold text-white uppercase tracking-widest">Recent Device Alerts & Signals</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-white/2">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase py-4">Device ID</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Type</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Location</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Status</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Last Signal</TableHead>
              <TableHead className="text-right py-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                <TableCell className="py-4 text-xs font-mono font-bold text-white">{alert.id}</TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    {getDeviceIcon(alert.type)}
                    <span className="text-xs">{alert.type}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-xs text-muted-foreground">{alert.location}</TableCell>
                <TableCell className="py-4">{getStatusBadge(alert.status, alert.severity)}</TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    <div className={cn("w-1 h-1 rounded-full", alert.severity === 'danger' ? 'bg-destructive' : 'bg-accent')} />
                    {alert.lastSignal}
                  </div>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
