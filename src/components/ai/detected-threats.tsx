
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BrainCircuit, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const activity = [
  {
    timestamp: "2024-10-14 19:23",
    entity: "Batch B001 - Sulfur Dioxide Precursor",
    action: "unexpected stop",
    user: "Driver K. Kumar",
    location: "Route Checkpoint 3",
    status: "Investigating"
  },
  {
    timestamp: "2024-10-14 19:29",
    entity: "Batch B001 - Sulfur Dioxide Precursor",
    action: "unexpected inventory change",
    user: "Driver K. Kumar",
    location: "Route Checkpoint 3",
    status: "Flagged (Critical)"
  },
  {
    timestamp: "2024-10-14 19:21",
    entity: "Batch B001 - Sulfur Dioxide Precursor",
    action: "unexpected stop",
    user: "Driver K. Kumar",
    location: "Route Checkpoint 2",
    status: "Resolved"
  },
  {
    timestamp: "2024-10-14 19:30",
    entity: "Batch B001 - Sulfur Dioxide Precursor",
    action: "unexpected stop",
    user: "Driver K. Kumar",
    location: "Route Checkpoint 3",
    status: "Resolved"
  }
]

export function AiDetectedThreats() {
  return (
    <Card className="glass-card h-full border-white/5 bg-white/5">
      <CardHeader className="py-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Suspicious Activity Detection</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase py-4">Timestamp</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Entity</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Action</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">User</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Location</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activity.map((item, i) => (
              <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-colors">
                <TableCell className="py-4 text-[10px] text-muted-foreground font-mono">{item.timestamp}</TableCell>
                <TableCell className="py-4 text-[10px] text-white font-medium">{item.entity}</TableCell>
                <TableCell className="py-4 text-[10px] text-muted-foreground">{item.action}</TableCell>
                <TableCell className="py-4 text-[10px] text-white">{item.user}</TableCell>
                <TableCell className="py-4 text-[10px] text-muted-foreground">{item.location}</TableCell>
                <TableCell className="py-4">
                  <Badge className={cn(
                    "text-[8px] h-5 px-1.5 uppercase font-bold",
                    item.status === 'Investigating' ? 'bg-orange-400/20 text-orange-400 border-orange-400/30' :
                    item.status === 'Flagged (Critical)' ? 'bg-destructive/20 text-destructive border-destructive/30' :
                    'bg-accent/20 text-accent border-accent/30'
                  )}>
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-center gap-4 py-4 border-t border-white/5">
          <ChevronLeft className="w-3 h-3 text-muted-foreground cursor-pointer" />
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">1</span>
          </div>
          <ChevronRight className="w-3 h-3 text-muted-foreground cursor-pointer" />
        </div>
      </CardContent>
    </Card>
  )
}
