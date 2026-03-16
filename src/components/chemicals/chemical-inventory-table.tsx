
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
import { Search, Filter, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const inventory = [
  {
    name: "Hydrochloric Acid",
    batchId: "HA-1132-J",
    manufacturer: "Dupont Chemicals",
    quantity: "1,500 L",
    expiry: "2026-05-15",
    status: "In Stock",
    location: "Lab B-04"
  },
  {
    name: "Ammonium Nitrate",
    batchId: "AN-784-K",
    manufacturer: "BASF SE",
    quantity: "25 Tons",
    expiry: "2025-08-30",
    status: "In Stock",
    location: "Storage Unit C"
  },
  {
    name: "Phosphoric Acid",
    batchId: "PA-401-G",
    manufacturer: "Cargill",
    quantity: "8,000 Gallons",
    expiry: "2024-11-20",
    status: "Quarantined",
    location: "Inspection Bay"
  },
  {
    name: "Sulphuric Acid",
    batchId: "SA-099-H",
    manufacturer: "Ineos",
    quantity: "50 Tons",
    expiry: "2023-12-01",
    status: "Expired",
    location: "Quarantine Zone"
  },
  {
    name: "Sodium Hydroxide",
    batchId: "SH-221-M",
    manufacturer: "Dow Chemical",
    quantity: "5,000 Kg",
    expiry: "2027-02-10",
    status: "In Stock",
    location: "Lab A-01"
  }
]

export function ChemicalInventoryTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">In Stock</Badge>
      case "Quarantined":
        return <Badge className="bg-orange-400/10 text-orange-400 border-orange-400/20 hover:bg-orange-400/20">Quarantined</Badge>
      case "Expired":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20">Expired</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="glass-card border-white/5">
      <CardHeader className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 pb-6 border-b border-white/5">
        <div>
          <CardTitle className="text-xl font-headline font-bold text-white">Chemical Inventory</CardTitle>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Real-Time Stock Traceability</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input 
              placeholder="Search chemicals..." 
              className="h-9 w-[200px] bg-white/5 border-white/10 pl-8 text-xs focus-visible:ring-primary/50" 
            />
          </div>
          <Button variant="outline" size="sm" className="h-9 border-white/10 bg-white/5 hover:bg-white/10 text-xs gap-2">
            <Filter className="h-3.5 w-3.5" />
            Manufacturer
          </Button>
          <Button variant="outline" size="sm" className="h-9 border-white/10 bg-white/5 hover:bg-white/10 text-xs gap-2">
            Status
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-white/2">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-[10px] font-bold uppercase py-4">Chemical Name</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Batch ID</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Manufacturer</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Quantity</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Expiry Date</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Status</TableHead>
              <TableHead className="text-[10px] font-bold uppercase py-4">Location</TableHead>
              <TableHead className="text-right py-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.batchId} className="border-white/5 hover:bg-white/5 transition-colors group">
                <TableCell className="py-4 text-xs font-semibold text-white">{item.name}</TableCell>
                <TableCell className="py-4 text-xs font-mono text-muted-foreground">{item.batchId}</TableCell>
                <TableCell className="py-4 text-xs">{item.manufacturer}</TableCell>
                <TableCell className="py-4 text-xs font-medium text-primary">{item.quantity}</TableCell>
                <TableCell className="py-4 text-xs text-muted-foreground">{item.expiry}</TableCell>
                <TableCell className="py-4">{getStatusBadge(item.status)}</TableCell>
                <TableCell className="py-4 text-xs">{item.location}</TableCell>
                <TableCell className="py-4 text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 border-t border-white/5 flex items-center justify-center gap-2">
           <Button variant="outline" size="sm" className="h-7 w-7 p-0 border-white/10 bg-white/5" disabled>&laquo;</Button>
           <Button variant="outline" size="sm" className="h-7 w-7 p-0 border-white/10 bg-primary/20 text-primary border-primary/30">1</Button>
           <Button variant="outline" size="sm" className="h-7 w-7 p-0 border-white/10 bg-white/5">2</Button>
           <Button variant="outline" size="sm" className="h-7 w-7 p-0 border-white/10 bg-white/5">&raquo;</Button>
        </div>
      </CardContent>
    </Card>
  )
}
