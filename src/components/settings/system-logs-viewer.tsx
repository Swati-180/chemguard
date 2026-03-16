
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Calendar as CalendarIcon } from "lucide-react"

const logs = [
  { timestamp: "Oct 14 14:41", user: "Dr. Reed", action: "LOGIN", ip: "192.168.1.10" },
  { timestamp: "Oct 14 14:41", user: "Amelia Reed", action: "LOGIN", ip: "192.168.1.10" },
  { timestamp: "Oct 14 14:41", user: "Dr. Reed", action: "LOGIN", ip: "192.168.1.10" },
  { timestamp: "Oct 14 14:41", user: "Amelia Reed", action: "LOGIN", ip: "192.168.1.10" },
]

export function SystemLogsViewer() {
  return (
    <Card className="glass-card bg-[#0f172a]/40 border-white/5">
      <CardHeader className="py-4 border-b border-white/5 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest leading-none">System Logs Viewer</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="login" className="w-full">
          <div className="px-6 py-2 border-b border-white/5 bg-white/2 flex items-center justify-between">
            <TabsList className="bg-transparent border-0 gap-4">
              <TabsTrigger value="login" className="bg-transparent border-0 data-[state=active]:bg-primary/10 data-[state=active]:text-primary border-primary/50 text-[10px] font-bold uppercase tracking-widest px-4 h-8">
                Login History
              </TabsTrigger>
              <TabsTrigger value="sensor" className="bg-transparent border-0 text-muted-foreground text-[10px] font-bold uppercase tracking-widest px-4 h-8">
                Sensor Logs
              </TabsTrigger>
              <TabsTrigger value="api" className="bg-transparent border-0 text-muted-foreground text-[10px] font-bold uppercase tracking-widest px-4 h-8">
                API Activity
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Filter</span>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded text-[10px] text-white/80 cursor-pointer">
                <CalendarIcon className="w-3 h-3" />
                <span>October 13, 2024 - October 14, 2024</span>
              </div>
            </div>
          </div>

          <TabsContent value="login" className="mt-0">
            <Table>
              <TableHeader className="bg-white/2">
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-[10px] font-bold uppercase py-3 px-6">Timestamp</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase py-3">User</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase py-3">Action</TableHead>
                  <TableHead className="text-[10px] font-bold uppercase py-3">IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log, i) => (
                  <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell className="py-3 px-6 text-[11px] text-muted-foreground">{log.timestamp}</TableCell>
                    <TableCell className="py-3 text-[11px] text-white font-medium">{log.user}</TableCell>
                    <TableCell className="py-3 text-[11px] text-muted-foreground uppercase">{log.action}</TableCell>
                    <TableCell className="py-3 text-[11px] font-mono text-muted-foreground">{log.ip}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="sensor" className="p-12 text-center text-muted-foreground text-xs uppercase tracking-widest">
            Sensor activity data loading...
          </TabsContent>
          <TabsContent value="api" className="p-12 text-center text-muted-foreground text-xs uppercase tracking-widest">
            External API calls loading...
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
