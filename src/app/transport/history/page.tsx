
"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TransportSidebar } from "@/components/transport/transport-sidebar"
import { TransportTopBar } from "@/components/transport/transport-top-bar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Calendar as CalendarIcon, 
  History as HistoryIcon, 
  Download, 
  FileText, 
  ChevronLeft, 
  ChevronRight,
  Database,
  Loader2
} from "lucide-react"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, limit, doc, setDoc } from "firebase/firestore"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

/**
 * Shipment History Page - Archived mission logs and historical data.
 */
export default function ShipmentHistoryPage() {
  const db = useFirestore()
  const [searchQuery, setSearchQuery] = React.useState("")

  // Real-time listener for historical shipments
  const historyQuery = useMemoFirebase(() => {
    return query(collection(db, "shipment_history"), orderBy("completedAt", "desc"), limit(50))
  }, [db])

  const { data: history, isLoading } = useCollection(historyQuery)

  const handleSeedHistory = async () => {
    const demoHistory = [
      { id: "ARCH-9012", shipmentId: "CGS-8810", chemical: "Ammonia #401", driver: "Sarah Chen", origin: "Houston", dest: "Chicago", status: "Completed", completedAt: new Date(Date.now() - 86400000).toISOString() },
      { id: "ARCH-9013", shipmentId: "CGS-7721", chemical: "Sulfuric Acid #12", driver: "Amelia Reed", origin: "Berlin", dest: "Munich", status: "Completed", completedAt: new Date(Date.now() - 172800000).toISOString() },
      { id: "ARCH-9014", shipmentId: "CGS-5541", chemical: "Ethanol-B #09", driver: "Kenji Tanaka", origin: "Singapore", dest: "Johor", status: "Completed", completedAt: new Date(Date.now() - 259200000).toISOString() },
      { id: "ARCH-9015", shipmentId: "CGS-2233", chemical: "Sodium Cyanide #88", driver: "David Smith", origin: "Rotterdam", dest: "Amsterdam", status: "Completed", completedAt: new Date(Date.now() - 345600000).toISOString() },
    ]

    for (const item of demoHistory) {
      await setDoc(doc(db, "shipment_history", item.id), item, { merge: true })
    }

    toast({
      title: "Archives Synchronized",
      description: "Historical mission logs provisioned to secure database."
    })
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#050b14] text-white">
        <TransportSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent relative">
          <TransportTopBar />
          
          <main className="flex-1 p-6 space-y-6 relative z-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
              <div className="space-y-1">
                <h1 className="text-3xl font-headline font-bold tracking-tight uppercase flex items-center gap-3">
                  <HistoryIcon className="w-8 h-8 text-cyan-400" />
                  Shipment History <span className="text-muted-foreground font-normal text-lg">| Mission Archives</span>
                </h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">Logistics Command Center | Post-Mission Analysis</p>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={handleSeedHistory} variant="outline" className="h-10 border-white/10 bg-white/5 hover:bg-white/10 text-xs gap-2">
                  <Database className="w-3.5 h-3.5" />
                  Seed Archives
                </Button>
                <Button className="h-10 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 text-xs gap-2">
                  <Download className="w-3.5 h-3.5" />
                  Export Ledger
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <Card className="glass-card border-white/5 bg-white/[0.02] overflow-hidden flex flex-col min-h-[600px]">
              <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Historical Logistics Matrix</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search archives..." 
                    className="h-9 w-64 bg-black/20 border-white/10 pl-10 text-xs text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1 overflow-auto">
                {isLoading ? (
                  <div className="h-[400px] flex flex-col items-center justify-center gap-4">
                    <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                    <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Scanning Secure Archives...</p>
                  </div>
                ) : history && history.length > 0 ? (
                  <Table>
                    <TableHeader className="bg-white/[0.02]">
                      <TableRow className="border-white/5 hover:bg-transparent uppercase">
                        <TableHead className="text-[9px] font-bold py-5 pl-6">Archive ID</TableHead>
                        <TableHead className="text-[9px] font-bold py-5">Shipment ID</TableHead>
                        <TableHead className="text-[9px] font-bold py-5">Chemical Batch</TableHead>
                        <TableHead className="text-[9px] font-bold py-5">Driver</TableHead>
                        <TableHead className="text-[9px] font-bold py-5">Origin &rarr; Dest</TableHead>
                        <TableHead className="text-[9px] font-bold py-5 text-center">Status</TableHead>
                        <TableHead className="text-[9px] font-bold py-5 pr-6 text-right">Completion Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {history.map((item) => (
                        <TableRow key={item.id} className="border-white/5 hover:bg-cyan-500/5 transition-all group">
                          <TableCell className="py-4 pl-6 text-xs font-mono font-bold text-muted-foreground">{item.id}</TableCell>
                          <TableCell className="py-4 text-xs font-mono text-cyan-400">{item.shipmentId}</TableCell>
                          <TableCell className="py-4 text-xs text-white/80">{item.chemical}</TableCell>
                          <TableCell className="py-4 text-xs text-muted-foreground">{item.driver}</TableCell>
                          <TableCell className="py-4 text-xs">
                            <span className="text-white/60">{item.origin}</span>
                            <span className="mx-2 text-cyan-500/50">&rarr;</span>
                            <span className="text-white/90 font-medium">{item.dest}</span>
                          </TableCell>
                          <TableCell className="py-4 text-center">
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-[9px] font-bold uppercase">Mission Successful</Badge>
                          </TableCell>
                          <TableCell className="py-4 pr-6 text-right text-[10px] font-mono text-muted-foreground">
                            {new Date(item.completedAt).toLocaleDateString()} | {new Date(item.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="h-[400px] flex flex-col items-center justify-center text-muted-foreground">
                    <HistoryIcon className="w-12 h-12 opacity-10 mb-4" />
                    <p className="text-xs uppercase tracking-widest">Historical database is currently empty.</p>
                  </div>
                )}
              </CardContent>
              <div className="p-4 border-t border-white/5 flex items-center justify-between bg-black/20">
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Page 1 of 1</span>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" disabled><ChevronLeft className="w-4 h-4" /></Button>
                    <span className="w-6 h-6 rounded bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold border border-cyan-500/30">1</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground" disabled><ChevronRight className="w-4 h-4" /></Button>
                  </div>
                </div>
                <div className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  All Records Authenticated
                </div>
              </div>
            </Card>
          </main>

          <footer className="p-6 border-t border-white/5 text-center bg-black/40">
            <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-bold">
              ChemGuard AI Logistics Security Terminal | Archival Node v2.1.0-AL | DATA_AUTH: [VERIFIED]
            </p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
