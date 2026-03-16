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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const users = [
  { id: "10000001", name: "Amelia Reed", role: "Admin", org: "ChemGuard HQ", status: "Active" },
  { id: "10000012", name: "Amelia Reed", role: "Lab Manager", org: "ChemGuard HQ", status: "Deactivated" },
  { id: "10000023", name: "Admin Bagher", role: "Driver", org: "PharmaLabs", status: "Pending" },
  { id: "10000034", name: "Jasnny Crites", role: "Driver", org: "EuroExpress", status: "Pending" },
  { id: "10000055", name: "Amelia Shadson", role: "Compliance Officer", org: "ChemGuard HQ", status: "Pending" },
  { id: "10000066", name: "Jarna Davis", role: "Admin", org: "ChemGuard HQ", status: "Active" },
  { id: "10000077", name: "Datan Haimer", role: "Driver", org: "PharmaLabs", status: "Deactivated" },
  { id: "10000088", name: "Andrew Dojves", role: "Driver", org: "EuroExpress", status: "Pending" },
  { id: "10001089", name: "Amelia Seiter", role: "Compliance Officer", org: "EuroExpress", status: "Pending" },
  { id: "10001010", name: "Asta Stibana", role: "Compliance Officer", org: "ChemGuard HQ", status: "Pending" },
]

export function UserManagementTable() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-accent/20 text-accent border-accent/30 h-6 px-3">Active</Badge>
      case "Deactivated":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30 h-6 px-3">Deactivated</Badge>
      case "Pending":
        return <Badge className="bg-orange-400/20 text-orange-400 border-orange-400/30 h-6 px-3">Pending</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="glass-card border-white/5 bg-white/5">
      <CardHeader className="p-0 border-b border-white/5">
        <div className="flex flex-wrap items-center gap-3 p-4 bg-white/2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] h-9 bg-white/5 border-white/10 text-xs">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Role</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="driver">Driver</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[160px] h-9 bg-white/5 border-white/10 text-xs">
              <SelectValue placeholder="Organization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Organization</SelectItem>
              <SelectItem value="hq">ChemGuard HQ</SelectItem>
              <SelectItem value="pharma">PharmaLabs</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-[140px] h-9 bg-white/5 border-white/10 text-xs">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative ml-auto w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input 
              placeholder="Table Search" 
              className="h-9 pl-9 bg-white/5 border-white/10 text-xs focus-visible:ring-primary/50"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent uppercase">
              <TableHead className="text-[10px] font-bold py-4">User ID</TableHead>
              <TableHead className="text-[10px] font-bold py-4">Name</TableHead>
              <TableHead className="text-[10px] font-bold py-4">Role</TableHead>
              <TableHead className="text-[10px] font-bold py-4">Organization</TableHead>
              <TableHead className="text-[10px] font-bold py-4">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                <TableCell className="py-3 text-[11px] font-mono text-muted-foreground">{user.id}</TableCell>
                <TableCell className="py-3 text-[11px] text-white font-medium">{user.name}</TableCell>
                <TableCell className="py-3 text-[11px] text-muted-foreground">{user.role}</TableCell>
                <TableCell className="py-3 text-[11px] text-muted-foreground">{user.org}</TableCell>
                <TableCell className="py-3">{getStatusBadge(user.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between p-4 border-t border-white/5 bg-white/2">
          <div className="flex items-center gap-1">
             <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-white">
               <ChevronLeft className="w-4 h-4" />
             </Button>
             <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-white">
               <ChevronLeft className="w-4 h-4 -mr-2" />
               <ChevronLeft className="w-4 h-4" />
             </Button>
             <span className="text-[10px] text-muted-foreground ml-2">Page 1 of 1</span>
          </div>
          <div className="flex items-center gap-2">
             <ChevronLeft className="w-3.5 h-3.5 text-primary opacity-50" />
             <div className="flex items-center gap-1">
               <span className="w-6 h-6 rounded-md bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold border border-primary/30">1</span>
               <span className="w-6 h-6 rounded-md hover:bg-white/5 text-muted-foreground flex items-center justify-center text-[10px] cursor-pointer">2</span>
               <span className="w-6 h-6 rounded-md hover:bg-white/5 text-muted-foreground flex items-center justify-center text-[10px] cursor-pointer">3</span>
               <span className="w-6 h-6 rounded-md hover:bg-white/5 text-muted-foreground flex items-center justify-center text-[10px] cursor-pointer">4</span>
               <span className="text-muted-foreground px-1">...</span>
             </div>
             <ChevronRight className="w-3.5 h-3.5 text-primary" />
             <div className="flex items-center gap-0">
               <ChevronRight className="w-3.5 h-3.5 text-primary" />
               <ChevronRight className="w-3.5 h-3.5 text-primary -ml-2" />
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
