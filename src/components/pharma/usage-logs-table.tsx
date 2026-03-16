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
import { Search, ChevronLeft, ChevronRight, MoreHorizontal, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, limit } from "firebase/firestore"

export function UsageLogsTable() {
  const db = useFirestore()

  const logsQuery = useMemoFirebase(() => {
    return query(collection(db, "usage_logs"), orderBy("timestamp", "desc"), limit(20))
  }, [db])

  const { data: logs, isLoading, error } = useCollection(logsQuery)

  const getPurposeColor = (actionType: string) => {
    switch (actionType) {
      case "Dispensed": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "Consumed": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
      case "Disposed": return "bg-destructive/20 text-destructive border-destructive/30"
      default: return "bg-amber-500/20 text-amber-400 border-amber-500/30"
    }
  }

  return (
    <Card className="glass-card border-white/5 bg-[#111827]/40 relative overflow-hidden">
      <CardHeader className="p-6 border-b border-white/5">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Chemical Usage Logs Table</CardTitle>
              <div className="flex flex-col mt-1">
                <span className="text-[11px] font-bold text-white">Recent Activity</span>
                <span className="text-[9px] text-muted-foreground uppercase tracking-widest">
                  {isLoading ? "Retrieving Secure Logs..." : "Authenticated Audit Stream"}
                </span>
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
      <CardContent className="p-0 min-h-[300px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Accessing Audit Database</p>
          </div>
        ) : error ? (
          <div className="p-20 text-center text-destructive">
            <p className="text-xs font-bold uppercase tracking-widest">Log Link Severed</p>
            <p className="text-[10px] text-muted-foreground">Unable to authenticate usage log stream.</p>
          </div>
        ) : logs && logs.length > 0 ? (
          <Table>
            <TableHeader className="bg-white/2">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-[10px] font-bold uppercase py-4">Action ID</TableHead>
                <TableHead className="text-[10px] font-bold uppercase py-4">Batch Reference</TableHead>
                <TableHead className="text-[10px] font-bold uppercase py-4">Quantity Change</TableHead>
                <TableHead className="text-[10px] font-bold uppercase py-4">Action Type</TableHead>
                <TableHead className="text-[10px] font-bold uppercase py-4">Location</TableHead>
                <TableHead className="text-[10px] font-bold uppercase py-4">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} className="border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell className="py-4 text-[11px] font-mono font-bold text-cyan-400">[{log.logIdentifier}]</TableCell>
                  <TableCell className="py-4 text-[11px] font-mono text-white">{log.chemicalBatchId}</TableCell>
                  <TableCell className="py-4 text-[11px] text-white">{log.quantityChanged} {log.unit}</TableCell>
                  <TableCell className="py-4">
                    <Badge variant="outline" className={cn("text-[9px] h-6 px-3 uppercase font-bold", getPurposeColor(log.actionType))}>
                      {log.actionType}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 text-[11px] text-white">{log.location}</TableCell>
                  <TableCell className="py-4 text-[11px] text-muted-foreground">
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-20 text-center text-muted-foreground">
            <p className="text-xs uppercase tracking-widest">No activity logs recorded.</p>
          </div>
        )}
        <div className="flex items-center justify-end p-4 border-t border-white/5 bg-white/2 gap-4">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Pagination Control</span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-white" disabled><ChevronLeft className="w-4 h-4" /></Button>
            <span className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold border border-cyan-500/30">1</span>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-white" disabled><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
