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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const logs = [
  { timestamp: "Oct 14 14:41:03", user: "Amelia Reed", avatar: "amelia", action: "Batch Verification", batch: "Batch: AN-784-K", location: "Lab B-04", status: "Verified" },
  { timestamp: "Oct 14 14:30:15", user: "Sarah Chen", avatar: "sarah", action: "Inventory Update", batch: "Batch: SA-099-H", location: "Reagent Room", status: "Verified" },
  { timestamp: "Oct 14 14:15:22", user: "Kenjiro Tanaka", avatar: "kumar", action: "Shipment Dispatched", batch: "Batch: SU-901-F", location: "Dispatch Bay 2", status: "Warning" },
  { timestamp: "Oct 14 14:02:44", user: "Sarah Chen", avatar: "sarah", action: "Usage Log Entry", batch: "Batch: SU-801-F", location: "Synthesis R-101", status: "Verified" },
  { timestamp: "Oct 14 13:58:11", user: "Kenjiro Tanaka", avatar: "kumar", action: "Safety Check", batch: "Batch: SU-901-F", location: "Dispatch Bay 2", status: "Warning" },
  { timestamp: "Oct 14 13:45:30", user: "System Bot AI", avatar: "bot", action: "Unauthorized Access Alert", batch: "Batch: --", location: "Hazardous Storage", status: "Violation" },
  { timestamp: "Oct 14 13:30:11", user: "Lisa Gupta", avatar: "smith", action: "Compliance Log Entry", batch: "Batch: AA-121-G", location: "Compliance Lab", status: "Warning" },
]

export function AuditEventLogsTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 h-5 px-2 text-[9px] uppercase font-bold">Verified</Badge>
      case "Warning":
        return <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 h-5 px-2 text-[9px] uppercase font-bold">Warning</Badge>
      case "Violation":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30 h-5 px-2 text-[9px] uppercase font-bold animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.3)]">Violation</Badge>
      default:
        return <Badge variant="outline" className="h-5 px-2 text-[9px] uppercase font-bold">{status}</Badge>
    }
  }

  return (
    <Card className="glass-card border-white/5 bg-[#111827]/40">
      <CardHeader className="py-4 border-b border-white/5 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Active Audit Event Logs</CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-cyan-400 uppercase tracking-widest cursor-pointer">
            <Filter className="w-3 h-3" />
            [ Filter Option ]
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <Input 
              placeholder="Search Logs..." 
              className="h-7 w-48 bg-white/5 border-white/10 pl-7 text-[10px] focus-visible:ring-cyan-500/50" 
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-white/2">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase py-3 h-10">Timestamp &uarr;</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-3 h-10">User</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-3 h-10">Action</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-3 h-10">Chemical Batch</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-3 h-10">Location</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-3 h-10">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log, i) => (
              <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-colors group">
                <TableCell className="py-3 text-[10px] font-mono text-muted-foreground">{log.timestamp}</TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-5 w-5 border border-white/10">
                      <AvatarImage src={`https://picsum.photos/seed/${log.avatar}/20/20`} />
                      <AvatarFallback className="text-[8px]">{log.user[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-[10px] text-white font-medium">{log.user}</span>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-[10px] text-white/80">{log.action}</TableCell>
                <TableCell className="py-3 text-[10px] font-mono text-cyan-400">[{log.batch}]</TableCell>
                <TableCell className="py-3 text-[10px] text-muted-foreground">{log.location}</TableCell>
                <TableCell className="py-3">{getStatusBadge(log.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="flex items-center justify-center p-4 border-t border-white/5 bg-white/2 gap-4">
          <ChevronLeft className="w-3 h-3 text-muted-foreground cursor-pointer" />
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map(p => (
              <span key={p} className={cn(
                "w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold cursor-pointer transition-colors",
                p === 1 ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-muted-foreground hover:text-white"
              )}>
                {p}
              </span>
            ))}
          </div>
          <ChevronRight className="w-3 h-3 text-cyan-400 cursor-pointer" />
        </div>
      </CardContent>
    </Card>
  )
}
