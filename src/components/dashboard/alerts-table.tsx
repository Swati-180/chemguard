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
import { MoreHorizontal, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const alerts = [
  {
    id: "AL-7291",
    timestamp: "2024-05-24 14:32:10",
    shipmentId: "SH-9283",
    type: "Temperature Breach",
    location: "Bay of Biscay",
    severity: "Critical",
    status: "Investigating"
  },
  {
    id: "AL-7290",
    timestamp: "2024-05-24 13:15:22",
    shipmentId: "SH-4012",
    type: "Route Deviation",
    location: "Berlin Outskirts",
    severity: "Warning",
    status: "Resolved"
  },
  {
    id: "AL-7289",
    timestamp: "2024-05-24 12:45:01",
    shipmentId: "SH-1102",
    type: "Batch Scan Incomplete",
    location: "Antwerp Terminal",
    severity: "Info",
    status: "Open"
  },
  {
    id: "AL-7288",
    timestamp: "2024-05-24 10:20:55",
    shipmentId: "SH-8821",
    type: "Tamper Seal Alert",
    location: "Rotterdam Port",
    severity: "Critical",
    status: "Action Required"
  },
  {
    id: "AL-7287",
    timestamp: "2024-05-24 09:12:33",
    shipmentId: "SH-3301",
    type: "System Check",
    location: "Global Hub",
    severity: "Info",
    status: "Closed"
  }
]

export function AlertsTable() {
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Critical": return <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20">Critical</Badge>
      case "Warning": return <Badge className="bg-orange-400/10 text-orange-400 border-orange-400/20 hover:bg-orange-400/20">Warning</Badge>
      case "Info": return <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">Info</Badge>
      default: return <Badge variant="outline">{severity}</Badge>
    }
  }

  return (
    <Card className="glass-card border-white/5">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-sm font-headline font-semibold text-muted-foreground uppercase tracking-widest">Recent Security Alerts</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs h-8 text-primary hover:text-primary/80 hover:bg-white/5">
          View All Alerts
          <ExternalLink className="w-3 h-3 ml-2" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase py-4">Timestamp</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Shipment ID</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Alert Type</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Location</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Severity</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Status</TableHead>
              <TableHead className="text-right py-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                <TableCell className="py-4 text-xs font-mono text-muted-foreground">{alert.timestamp}</TableCell>
                <TableCell className="py-4 text-xs font-semibold">{alert.shipmentId}</TableCell>
                <TableCell className="py-4 text-xs">{alert.type}</TableCell>
                <TableCell className="py-4 text-xs text-muted-foreground">{alert.location}</TableCell>
                <TableCell className="py-4">{getSeverityBadge(alert.severity)}</TableCell>
                <TableCell className="py-4 text-xs">
                  <span className="flex items-center gap-2">
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      alert.status === "Investigating" || alert.status === "Action Required" ? "bg-destructive animate-pulse" : "bg-accent"
                    )}></span>
                    {alert.status}
                  </span>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
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
