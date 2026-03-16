
"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { PharmaSidebar } from "@/components/pharma/pharma-sidebar"
import { PharmaTopBar } from "@/components/pharma/pharma-top-bar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Database, Filter, Search, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, limit } from "firebase/firestore"

/**
 * Batch Management Page - Lab asset and chemical record tracking.
 */
export default function BatchManagementPage() {
  const db = useFirestore()

  const batchesQuery = useMemoFirebase(() => {
    return query(collection(db, "chemical_batches"), orderBy("createdAt", "desc"), limit(50))
  }, [db])

  const { data: batches, isLoading } = useCollection(batchesQuery)

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#0a0f18]">
        <PharmaSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent relative">
          <PharmaTopBar />
          
          <main className="flex-1 p-6 space-y-6">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-headline font-bold text-white tracking-tight">Batch Management</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Chemical Asset Lifecycle & Verification</p>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/30 font-headline font-bold uppercase tracking-widest gap-2 h-11 px-6 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                  <Plus className="w-4 h-4" /> Register New Batch
                </Button>
              </div>
            </header>

            <Card className="glass-card border-white/5 bg-[#111827]/40 overflow-hidden">
              <CardHeader className="py-4 border-b border-white/5 bg-white/2 flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-400" />
                  Active Chemical Registry
                </CardTitle>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <Input placeholder="Search Batch ID..." className="h-8 w-48 bg-white/5 border-white/10 pl-8 text-[10px]" />
                  </div>
                  <Button variant="outline" size="sm" className="h-8 border-white/10 bg-white/5 text-[10px] font-bold uppercase">
                    <Filter className="w-3 h-3 mr-2" /> Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {isLoading ? (
                  <div className="p-20 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                    <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Retrieving Batch Records...</p>
                  </div>
                ) : batches && batches.length > 0 ? (
                  <Table>
                    <TableHeader className="bg-white/5">
                      <TableRow className="border-white/5 hover:bg-transparent">
                        <TableHead className="text-[10px] font-bold uppercase py-4 pl-6">Batch ID</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase py-4">Chemical Compound</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase py-4">Quantity</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase py-4">Prod. Date</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase py-4">Storage Node</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase py-4 text-right pr-6">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {batches.map((batch) => (
                        <TableRow key={batch.id} className="border-white/5 hover:bg-white/5 transition-colors">
                          <TableCell className="py-4 pl-6 text-xs font-mono font-bold text-cyan-400">[{batch.batchId}]</TableCell>
                          <TableCell className="py-4 text-xs text-white font-medium">{batch.chemicalName}</TableCell>
                          <TableCell className="py-4 text-xs font-mono text-white/80">{batch.quantity} {batch.unit}</TableCell>
                          <TableCell className="py-4 text-xs text-muted-foreground">{batch.productionDate}</TableCell>
                          <TableCell className="py-4 text-xs text-muted-foreground">{batch.storageLocation}</TableCell>
                          <TableCell className="py-4 text-right pr-6">
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[9px] uppercase font-bold">{batch.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="p-20 text-center text-muted-foreground uppercase text-xs tracking-widest">
                    No batches currently registered in the system.
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
