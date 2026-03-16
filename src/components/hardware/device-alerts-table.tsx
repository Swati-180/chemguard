
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
import { MoreHorizontal, Radio, Signal, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, limit } from "firebase/firestore"

export function DeviceAlertsTable() {
  const db = useFirestore()

  const devicesQuery = useMemoFirebase(() => {
    return query(collection(db, "hardware_devices"), limit(25))
  }, [db])

  const { data: devices, isLoading, error } = useCollection(devicesQuery)

  const getStatusBadge = (status: string, alertStatus: string) => {
    if (alertStatus === "Critical") {
      return <Badge className="bg-destructive/10 text-destructive border-destructive/20 h-6 animate-pulse">Critical Alert</Badge>
    }
    
    switch (status) {
      case "Active":
      case "Online":
        return <Badge className="bg-accent/10 text-accent border-accent/20 h-6">Active</Badge>
      case "Warning":
      case "Signal Low":
        return <Badge className="bg-orange-400/10 text-orange-400 border-orange-400/20 h-6">{status}</Badge>
      case "Offline":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20 h-6">{status}</Badge>
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
    <Card className="glass-card border-white/5 h-full">
      <CardHeader className="py-4 border-b border-white/5 bg-white/5">
        <CardTitle className="text-sm font-headline font-semibold text-white uppercase tracking-widest">
          Hardware Device Registry & Status
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12 space-y-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Synchronizing Device Relay</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-destructive">
            <p className="text-xs font-bold uppercase tracking-widest">Relay Connection Failed</p>
            <p className="text-[10px] text-muted-foreground">Unauthorized access to secure hardware registry.</p>
          </div>
        ) : devices && devices.length > 0 ? (
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
              {devices.map((device) => (
                <TableRow key={device.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                  <TableCell className="py-4 text-xs font-mono font-bold text-white">{device.deviceId}</TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      {getDeviceIcon(device.deviceType)}
                      <span className="text-xs">{device.deviceType}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-xs text-muted-foreground">{device.location}</TableCell>
                  <TableCell className="py-4">{getStatusBadge(device.status, device.alertStatus)}</TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <div className={cn("w-1 h-1 rounded-full", device.status === 'Offline' ? 'bg-destructive' : 'bg-accent')} />
                      {new Date(device.lastSignal).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
        ) : (
          <div className="p-12 text-center text-muted-foreground">
            <p className="text-xs uppercase tracking-widest">No hardware devices registered in the secure hub.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
