
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
import { MoreVertical, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const activities = [
  { id: "B-9921", chemical: "Hydrochloric Acid", action: "Quality Check", user: "Dr. Elena", timestamp: "14:32:10", status: "Passed" },
  { id: "B-9920", chemical: "Sodium Cyanide", action: "Batch Creation", user: "Lab System", timestamp: "13:15:22", status: "Verified" },
  { id: "B-9919", chemical: "Ammonium Nitrate", action: "Inventory Audit", user: "Admin", timestamp: "12:45:01", status: "Completed" },
  { id: "B-9918", chemical: "Phosphoric Acid", action: "Sealing Process", user: "Dr. Elena", timestamp: "10:20:55", status: "In-Progress" },
  { id: "B-9917", chemical: "Sulphuric Acid", action: "Shipment Prep", user: "Lab System", timestamp: "09:12:33", status: "Queued" },
]

export function BatchActivityTable() {
  return (
    <Card className="glass-card border-white/5">
      <CardHeader className="flex flex-row items-center justify-between pb-4 bg-white/2 border-b border-white/5">
        <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest leading-none">Recent Batch Activity & Lab Logs</CardTitle>
        <Button variant="ghost" size="sm" className="text-[10px] h-8 text-accent hover:text-accent/80 uppercase font-bold tracking-widest">
          Audit Full Logs
          <ExternalLink className="w-3 h-3 ml-2" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-white/2">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase py-4">Batch ID</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Chemical Compound</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Lab Action</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Authorized By</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Timestamp</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Status</TableHead>
              <TableHead className="text-right py-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((act) => (
              <TableRow key={act.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                <TableCell className="py-4 text-xs font-mono font-bold text-white">{act.id}</TableCell>
                <TableCell className="py-4 text-xs font-medium text-accent">{act.chemical}</TableCell>
                <TableCell className="py-4 text-xs text-muted-foreground">{act.action}</TableCell>
                <TableCell className="py-4 text-xs">{act.user}</TableCell>
                <TableCell className="py-4 text-xs font-mono text-muted-foreground">{act.timestamp}</TableCell>
                <TableCell className="py-4">
                  <Badge variant="outline" className="text-[9px] font-bold uppercase border-accent/20 bg-accent/10 text-accent">
                    {act.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-4 h-4" />
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
