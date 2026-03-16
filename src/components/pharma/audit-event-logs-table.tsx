
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
import { Search, ChevronLeft, ChevronRight, Filter, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, limit } from "firebase/firestore"

export function AuditEventLogsTable() {
  const db = useFirestore()

  const logsQuery = useMemoFirebase(() => {
    return query(collection(db, "compliance_logs"), orderBy("timestamp", "desc"), limit(20))
  }, [db])

  const { data: logs, isLoading, error } = useCollection(logsQuery)

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
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12 space-y-4">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.3em]">Decrypting Audit Trail</p>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-destructive">
            <p className="text-xs font-bold uppercase tracking-widest">Unauthorized Access</p>
            <p className="text-[10px] text-muted-foreground">Insufficient security clearance to view compliance logs.</p>
          </div>
        ) : logs && logs.length > 0 ? (
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
              {logs.map((log) => (
                <TableRow key={log.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                  <TableCell className="py-3 text-[10px] font-mono text-muted-foreground">
                    {new Date(log.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-5 w-5 border border-white/10">
                        <AvatarImage src={`https://picsum.photos/seed/${log.user}/20/20`} />
                        <AvatarFallback className="text-[8px]">{log.user[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-[10px] text-white font-medium">{log.user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-[10px] text-white/80">{log.action}</TableCell>
                  <TableCell className="py-3 text-[10px] font-mono text-cyan-400">[{log.batchId || "--"}]</TableCell>
                  <TableCell className="py-3 text-[10px] text-muted-foreground">{log.location}</TableCell>
                  <TableCell className="py-3">{getStatusBadge(log.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-12 text-center text-muted-foreground">
            <p className="text-xs uppercase tracking-widest">No compliance events recorded.</p>
          </div>
        )}
        
        <div className="flex items-center justify-center p-4 border-t border-white/5 bg-white/2 gap-4">
          <ChevronLeft className="w-3 h-3 text-muted-foreground cursor-pointer" />
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold cursor-pointer">1</span>
          </div>
          <ChevronRight className="w-3 h-3 text-cyan-400 cursor-pointer" />
        </div>
      </CardContent>
    </Card>
  )
}
