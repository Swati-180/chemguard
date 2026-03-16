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
import { Search, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

const logs = [
  { name: "Ammonium Nitrate", batchId: "AN-784-K", quantity: "1500 kg", purpose: "Catalyst Prep", tech: "Sarah Chen", date: "2023-10-14", purposeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  { name: "Sulphuric Acid", batchId: "SA-099-H", quantity: "50 Tons", purpose: "Metal Etching", tech: "Kenjiro Tanaka", date: "2023-10-13", purposeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  { name: "Acetic Anhydride", batchId: "AA-121-G", quantity: "10 Gallons", purpose: "R&D Experiment", tech: "Lisa Gupta", date: "2023-10-12", purposeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  { name: "Sulphur", batchId: "SU-001-F", quantity: "20 Tons", purpose: "Process Synthesis", tech: "Kenjiro Tanaka", date: "2023-10-11", purposeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
]

export function UsageLogsTable() {
  return (
    <Card className="glass-card border-white/5 bg-[#111827]/40 relative overflow-hidden">
      <CardHeader className="p-6 border-b border-white/5">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Chemical Usage Logs Table</CardTitle>
              <div className="flex flex-col mt-1">
                <span className="text-[11px] font-bold text-white">Recent Activity</span>
                <span className="text-[9px] text-muted-foreground uppercase tracking-widest">Activity from: Oct 1, 2024 - Oct 14, 2024 | 14:40 GMT</span>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input 
                placeholder="Global table search" 
                className="h-9 w-64 pl-9 bg-white/5 border-white/10 text-xs focus-visible:ring-cyan-500/50"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-white/2">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase py-4">Chemical Name</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Batch ID</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Quantity Used</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Purpose</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Technician</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log, i) => (
              <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-colors">
                <TableCell className="py-4 text-[11px] text-white font-medium">{log.name}</TableCell>
                <TableCell className="py-4 text-[11px] font-mono text-muted-foreground">{log.batchId}</TableCell>
                <TableCell className="py-4 text-[11px] text-white">{log.quantity}</TableCell>
                <TableCell className="py-4">
                  <Badge variant="outline" className={cn("text-[9px] h-6 px-3 uppercase font-bold", log.purposeColor)}>
                    {log.purpose}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-[11px] text-white">{log.tech}</TableCell>
                <TableCell className="py-4 text-[11px] text-muted-foreground">{log.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-end p-4 border-t border-white/5 bg-white/2 gap-4">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Pagination</span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"><ChevronLeft className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"><ChevronLeft className="w-4 h-4 -mr-2" /><ChevronLeft className="w-4 h-4" /></Button>
            <span className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold border border-cyan-500/30">1</span>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"><ChevronRight className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"><ChevronRight className="w-4 h-4 -mr-2" /><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
