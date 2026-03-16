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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const logs = [
  { timestamp: "14:32:05", type: "Lab Usage Log", action: "synth record", user: "J. Smith (Lab Mgr)", entity: "Batch 789-Q4", org: "PharmaLabs", description: "SOL used for synth. Verified.", status: "Verified" },
  { timestamp: "14:15:20", type: "Chemical Movement", action: "temp devi.", user: "K. Kumar (Driver)", entity: "truck-12 (SH-8821)", org: "EuroExpress", description: "Reached checkpoint. Deviation noted, checked.", status: "Checked" },
  { timestamp: "13:58:10", type: "Shipment Record", action: "manifest creation", user: "R. Davis (Logistics)", entity: "SH-8836", org: "ChemGuard HQ", description: "Manifest created for Batch 789-Q4 departure.", status: "Created" },
  { timestamp: "13:45:30", type: "Chemical Movement", action: "seal check", user: "A. Lee (Compliance)", entity: "Batch 789-Q4", org: "ChemGuard HQ", description: "Batch integrity seal checked and verified.", status: "Verified" },
]

export function AuditLogTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return <Badge className="bg-accent/10 text-accent border-accent/20 h-5 px-2 text-[9px] uppercase font-bold">Verified</Badge>
      case "Checked":
        return <Badge className="bg-primary/10 text-primary border-primary/20 h-5 px-2 text-[9px] uppercase font-bold">Checked</Badge>
      case "Created":
        return <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 h-5 px-2 text-[9px] uppercase font-bold">Created</Badge>
      default:
        return <Badge variant="outline" className="h-5 px-2 text-[9px] uppercase font-bold">{status}</Badge>
    }
  }

  return (
    <Card className="glass-card border-white/5 bg-[#0f172a]/40">
      <CardHeader className="py-4 border-b border-white/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Compliance Audit Trail | Verified Logs</CardTitle>
            <p className="text-[10px] text-muted-foreground mt-0.5">Professional audit trail cybersecurity and science monitoring.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[110px] h-8 bg-white/5 border-white/10 text-[10px] uppercase font-bold">
                <SelectValue placeholder="Log Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Log Type</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[120px] h-8 bg-white/5 border-white/10 text-[10px] uppercase font-bold">
                <SelectValue placeholder="Organization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Organization</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[100px] h-8 bg-white/5 border-white/10 text-[10px] uppercase font-bold">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
              <Input placeholder="Table Search..." className="h-8 pl-8 w-[160px] bg-white/5 border-white/10 text-[10px]" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-white/2">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase py-3">Timestamp</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-3">Log Type</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-3">Action</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-3">User</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-3">Entity ID</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-3">Organization</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-3">Description</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-3">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log, i) => (
              <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-colors group">
                <TableCell className="py-3 text-[10px] font-mono text-muted-foreground">{log.timestamp}</TableCell>
                <TableCell className="py-3 text-[10px] text-white font-medium">{log.type}</TableCell>
                <TableCell className="py-3 text-[10px] text-muted-foreground">{log.action}</TableCell>
                <TableCell className="py-3 text-[10px] text-white">{log.user}</TableCell>
                <TableCell className="py-3 text-[10px] text-muted-foreground">{log.entity}</TableCell>
                <TableCell className="py-3 text-[10px] text-muted-foreground">{log.org}</TableCell>
                <TableCell className="py-3 text-[10px] text-muted-foreground">{log.description}</TableCell>
                <TableCell className="py-3">{getStatusBadge(log.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between p-3 border-t border-white/5 bg-white/2">
          <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest">Totale 1 nms</span>
          <div className="flex items-center gap-1">
             <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"><ChevronLeft className="w-3 h-3" /></Button>
             <span className="w-5 h-5 rounded bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold border border-primary/30">1</span>
             <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"><ChevronRight className="w-3 h-3" /></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
