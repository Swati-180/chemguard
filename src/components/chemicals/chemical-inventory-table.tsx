
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
import { Search, Filter, MoreHorizontal, Edit2, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface ChemicalInventoryTableProps {
  inventory: any[]
}

export function ChemicalInventoryTable({ inventory }: ChemicalInventoryTableProps) {
  const [search, setSearch] = React.useState("")

  const filteredData = React.useMemo(() => {
    return inventory.filter(item => 
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.batchId?.toLowerCase().includes(search.toLowerCase())
    )
  }, [inventory, search])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 h-6 px-3">In Stock</Badge>
      case "Low Stock":
        return <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/30 h-6 px-3">Low Stock</Badge>
      case "Expired":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/30 h-6 px-3 animate-pulse">Expired</Badge>
      case "Quarantined":
        return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/30 h-6 px-3">Quarantined</Badge>
      default:
        return <Badge variant="outline" className="h-6 px-3">{status}</Badge>
    }
  }

  return (
    <Card className="glass-card border-white/5 bg-white/[0.02] overflow-hidden flex flex-col min-h-[600px]">
      <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between flex-wrap gap-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search manifest index..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-64 bg-black/20 border-white/10 pl-10 text-xs text-white focus-visible:ring-primary/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-10 border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest gap-2">
            <Filter className="w-3.5 h-3.5" /> Filter Status
          </Button>
          <Button variant="outline" size="sm" className="h-10 border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest">
            Manufacturer
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-auto">
        <Table>
          <TableHeader className="bg-white/[0.02]">
            <TableRow className="border-white/5 hover:bg-transparent uppercase">
              <TableHead className="text-[9px] font-bold py-5 pl-6">Chemical Name</TableHead>
              <TableHead className="text-[9px] font-bold py-5">Batch ID</TableHead>
              <TableHead className="text-[9px] font-bold py-5 text-center">Quantity</TableHead>
              <TableHead className="text-[9px] font-bold py-5">Location</TableHead>
              <TableHead className="text-[9px] font-bold py-5">Expiry Date</TableHead>
              <TableHead className="text-[9px] font-bold py-5">Status</TableHead>
              <TableHead className="text-[9px] font-bold py-5 pr-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id} className="border-white/5 hover:bg-white/5 transition-all group">
                <TableCell className="py-4 pl-6">
                  <span className="text-xs font-bold text-white">{item.name}</span>
                </TableCell>
                <TableCell className="py-4">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">[{item.batchId}]</span>
                </TableCell>
                <TableCell className="py-4 text-center">
                  <span className="text-xs font-mono text-white/80">{item.quantity} {item.unit}</span>
                </TableCell>
                <TableCell className="py-4 text-xs text-muted-foreground uppercase">{item.location}</TableCell>
                <TableCell className="py-4 text-xs font-mono text-muted-foreground">
                  {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}
                </TableCell>
                <TableCell className="py-4">
                  {getStatusBadge(item.status)}
                </TableCell>
                <TableCell className="py-4 pr-6 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#0a0f18] border-white/10 text-white">
                      <DropdownMenuItem className="text-[10px] uppercase font-bold gap-2"><Eye className="w-3.5 h-3.5" /> View Details</DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px] uppercase font-bold gap-2"><Edit2 className="w-3.5 h-3.5" /> Edit Record</DropdownMenuItem>
                      <DropdownMenuItem className="text-[10px] uppercase font-bold gap-2 text-destructive"><Trash2 className="w-3.5 h-3.5" /> Delete Batch</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <div className="p-4 border-t border-white/5 flex items-center justify-between bg-black/20">
        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Total: {filteredData.length} Records</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" disabled><ChevronLeft className="w-4 h-4" /></Button>
          <span className="w-8 h-8 rounded bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold border border-primary/30 shadow-[0_0_10px_rgba(46,222,255,0.1)]">1</span>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" disabled><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>
    </Card>
  )
}
