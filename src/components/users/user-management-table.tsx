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
import { Search, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, limit } from "firebase/firestore"

export function UserManagementTable() {
  const db = useFirestore()

  const usersQuery = useMemoFirebase(() => {
    return query(collection(db, "users"), limit(20))
  }, [db])

  const { data: users, isLoading, error } = useCollection(usersQuery)

  const getStatusBadge = (status: string = "Active") => {
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
              <SelectItem value="pharma">Pharma</SelectItem>
              <SelectItem value="transporter">Transporter</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative ml-auto w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input 
              placeholder="Search User Profiles" 
              className="h-9 pl-9 bg-white/5 border-white/10 text-xs focus-visible:ring-primary/50"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 min-h-[300px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-20 space-y-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">Retrieving Secure Directory</p>
          </div>
        ) : error ? (
          <div className="p-20 text-center text-destructive">
            <p className="text-xs font-bold uppercase tracking-widest">Unauthorized Access</p>
            <p className="text-[10px] text-muted-foreground">Insufficient security clearance to view directory.</p>
          </div>
        ) : users && users.length > 0 ? (
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5 hover:bg-transparent uppercase">
                <TableHead className="text-[10px] font-bold py-4">UID Reference</TableHead>
                <TableHead className="text-[10px] font-bold py-4">Username</TableHead>
                <TableHead className="text-[10px] font-bold py-4">System Role</TableHead>
                <TableHead className="text-[10px] font-bold py-4">Email Address</TableHead>
                <TableHead className="text-[10px] font-bold py-4">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-white/5 hover:bg-white/5 transition-colors group">
                  <TableCell className="py-3 text-[11px] font-mono text-muted-foreground truncate max-w-[100px]">{user.id}</TableCell>
                  <TableCell className="py-3 text-[11px] text-white font-medium">{user.username || user.firstName + ' ' + user.lastName}</TableCell>
                  <TableCell className="py-3 text-[11px] text-muted-foreground uppercase font-bold text-primary/80">{user.role}</TableCell>
                  <TableCell className="py-3 text-[11px] text-muted-foreground">{user.email}</TableCell>
                  <TableCell className="py-3">{getStatusBadge("Active")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-20 text-center text-muted-foreground">
            <p className="text-xs uppercase tracking-widest">No users found in secure directory.</p>
          </div>
        )}
        <div className="flex items-center justify-between p-4 border-t border-white/5 bg-white/2">
          <div className="flex items-center gap-1">
             <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-white" disabled>
               <ChevronLeft className="w-4 h-4" />
             </Button>
             <span className="text-[10px] text-muted-foreground ml-2">Page 1 of 1</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="flex items-center gap-1">
               <span className="w-6 h-6 rounded-md bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold border border-primary/30">1</span>
             </div>
             <ChevronRight className="w-3.5 h-3.5 text-primary opacity-50" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
