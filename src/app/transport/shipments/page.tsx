"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TransportSidebar } from "@/components/transport/transport-sidebar"
import { TransportTopBar } from "@/components/transport/transport-top-bar"
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
  Filter, 
  ChevronDown, 
  Database,
  Satellite,
  Beaker,
  Truck,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Loader2
} from "lucide-react"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, orderBy, doc, setDoc } from "firebase/firestore"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

/**
 * Active Shipments Page - High-fidelity logistical monitoring hub.
 */
export default function ActiveShipmentsPage() {
  const db = useFirestore()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedShipmentId, setSelectedShipmentId] = React.useState<string | null>(null)

  // Real-time listener for shipments
  const shipmentsQuery = useMemoFirebase(() => {
    return query(collection(db, "shipments"), orderBy("lastUpdateAt", "desc"))
  }, [db])

  const { data: shipments, isLoading } = useCollection(shipmentsQuery)

  const selectedShipment = shipments?.find(s => s.id === selectedShipmentId) || shipments?.[0]

  const handleSeedData = async () => {
    const demoShipments = [
      {
        id: "CGS-00123",
        chemicalBatch: "PolyChem-A (Batch #004)",
        origin: "Houston Facility",
        destination: "Atlanta Dist. Center",
        vehicle: "CGV-102",
        driver: "Alex Carter",
        status: "In Transit",
        eta: "Oct 15, 14:00",
        lastUpdateAt: new Date().toISOString(),
        progress: 40
      },
      {
        id: "AX-789-Q",
        chemicalBatch: "NitroSol-X (#12)",
        origin: "Berlin Hub",
        destination: "Munich Plant",
        vehicle: "CGV-215",
        driver: "Maria Garcia",
        status: "Delayed",
        eta: "2 Days",
        lastUpdateAt: new Date(Date.now() - 100000).toISOString(),
        progress: 60
      },
      {
        id: "T11456B",
        chemicalBatch: "Sulphur Acid (#33)",
        origin: "Port of Singapore",
        destination: "Tokyo Terminal",
        vehicle: "CGV-098",
        driver: "David Smith",
        status: "Critical Risk",
        eta: "Oct 16, 08:30",
        lastUpdateAt: new Date(Date.now() - 200000).toISOString(),
        progress: 25
      },
      {
        id: "CGS-901-Z",
        chemicalBatch: "Ethanol-B (Batch #90)",
        origin: "Rotterdam Port",
        destination: "Amsterdam Lab",
        vehicle: "CGV-044",
        driver: "Jan de Boer",
        status: "Delivered",
        eta: "Completed",
        lastUpdateAt: new Date(Date.now() - 300000).toISOString(),
        progress: 100
      }
    ]

    for (const ship of demoShipments) {
      await setDoc(doc(db, "shipments", ship.id), ship, { merge: true })
    }

    toast({
      title: "Logistics Provisioned",
      description: "Active shipment matrix synchronized with secure satellite relay."
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Transit": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
      case "Delayed": return "bg-orange-500/20 text-orange-400 border-orange-500/40 shadow-[0_0_10px_rgba(249,115,22,0.3)]"
      case "Critical Risk": return "bg-destructive/20 text-destructive border-destructive/40 shadow-[0_0_10px_rgba(239,68,68,0.3)] animate-pulse"
      case "Delivered": return "bg-blue-500/20 text-blue-400 border-blue-500/40"
      default: return "bg-white/5 text-muted-foreground border-white/10"
    }
  }

  const TruckIcon = () => (
    <svg width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-cyan-400/60">
      <path d="M2 10H34L38 6V2H34M2 10V14H6M2 10H0V4H2M6 14C6 15.1046 5.10457 16 4 16C2.89543 16 2 15.1046 2 14M6 14H10M34 10V14H30M34 10H36V14M30 14C30 15.1046 30.8954 16 32 16C33.1046 16 34 15.1046 34 14M30 14H10M10 14C10 15.1046 9.10457 16 8 16C6.89543 16 6 15.1046 6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="4" y="4" width="24" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M28 4H34V10H28V4Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#050b14] font-body">
        <TransportSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent relative">
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <TransportTopBar />
          
          <main className="flex-1 p-6 space-y-6 relative z-10">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Satellite className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h1 className="text-3xl font-headline font-bold text-white tracking-tight uppercase">Active Shipments</h1>
                </div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">Logistics Command Center | Global SOC</p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-cyan-400 transition-colors" />
                  <Input 
                    placeholder="Search manifest..." 
                    className="w-64 h-11 bg-white/5 border-white/10 pl-10 text-xs text-white focus-visible:ring-cyan-500/50"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  {["Vehicle", "Status", "Destination"].map((filter) => (
                    <Button key={filter} variant="outline" className="h-11 bg-white/5 border-white/10 text-[10px] font-bold uppercase tracking-widest gap-2 hover:bg-white/10">
                      {filter} <ChevronDown className="w-3 h-3" />
                    </Button>
                  ))}
                </div>
                <Button 
                  onClick={handleSeedData}
                  className="h-11 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 font-bold uppercase tracking-widest gap-2"
                >
                  <Database className="w-4 h-4" />
                  Provision Mock Logistics
                </Button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-[600px]">
              {/* Shipments Table Panel */}
              <div className="lg:col-span-9 h-full">
                <div className="glass-card border-white/5 bg-white/[0.02] rounded-2xl overflow-hidden flex flex-col h-full">
                  <div className="bg-white/5 border-b border-white/5 px-6 py-4">
                    <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em]">Real-Time Fleet Matrix</p>
                  </div>
                  
                  <div className="flex-1 overflow-auto">
                    {isLoading ? (
                      <div className="h-full flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
                        <p className="text-xs font-bold text-cyan-400/60 uppercase tracking-widest">Establishing Satellite Link...</p>
                      </div>
                    ) : shipments && shipments.length > 0 ? (
                      <Table>
                        <TableHeader className="bg-white/[0.02]">
                          <TableRow className="border-white/5 hover:bg-transparent uppercase">
                            <TableHead className="text-[9px] font-bold py-5 pl-6">Shipment ID</TableHead>
                            <TableHead className="text-[9px] font-bold py-5">Chemical Batch</TableHead>
                            <TableHead className="text-[9px] font-bold py-5">Origin</TableHead>
                            <TableHead className="text-[9px] font-bold py-5">Destination</TableHead>
                            <TableHead className="text-[9px] font-bold py-5">Vehicle</TableHead>
                            <TableHead className="text-[9px] font-bold py-5">Driver</TableHead>
                            <TableHead className="text-[9px] font-bold py-5">Status</TableHead>
                            <TableHead className="text-[9px] font-bold py-5 pr-6 text-right">ETA</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {shipments.map((ship) => (
                            <TableRow 
                              key={ship.id} 
                              className={cn(
                                "border-white/5 hover:bg-cyan-500/5 transition-all cursor-pointer group",
                                selectedShipmentId === ship.id && "bg-cyan-500/10 border-cyan-500/20"
                              )}
                              onClick={() => setSelectedShipmentId(ship.id)}
                            >
                              <TableCell className="py-5 pl-6">
                                <span className="text-xs font-mono font-bold text-cyan-400">{ship.id}</span>
                              </TableCell>
                              <TableCell className="py-5">
                                <div className="flex flex-col">
                                  <span className="text-[11px] font-bold text-white">{ship.chemicalBatch}</span>
                                  <span className="text-[9px] text-muted-foreground uppercase">{ship.chemicalType || "Hazardous"}</span>
                                </div>
                              </TableCell>
                              <TableCell className="py-5 text-xs text-muted-foreground">{ship.origin}</TableCell>
                              <TableCell className="py-5 text-xs text-white/80 font-medium">{ship.destination}</TableCell>
                              <TableCell className="py-5">
                                <div className="flex flex-col gap-1">
                                  <TruckIcon />
                                  <span className="text-[9px] font-mono text-cyan-400/60 uppercase">{ship.vehicle}</span>
                                </div>
                              </TableCell>
                              <TableCell className="py-5 text-xs text-white/90">{ship.driver}</TableCell>
                              <TableCell className="py-5">
                                <Badge className={cn("text-[8px] font-bold uppercase py-0.5 h-5 border px-2", getStatusColor(ship.status))}>
                                  {ship.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="py-5 pr-6 text-right">
                                <span className="text-[10px] font-bold text-white uppercase">{ship.eta}</span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center gap-4 text-muted-foreground">
                        <Truck className="w-12 h-12 opacity-20" />
                        <p className="text-xs uppercase tracking-widest">No active deployments detected.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipment Timeline Panel */}
              <div className="lg:col-span-3 h-full">
                <div className="glass-card border-white/5 bg-[#0a121d] rounded-2xl p-6 h-full flex flex-col border-l border-cyan-500/10">
                  {selectedShipment ? (
                    <>
                      <div className="mb-8 border-b border-white/5 pb-6">
                        <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2">Selected Asset</p>
                        <h3 className="text-2xl font-headline font-bold text-white">{selectedShipment.id}</h3>
                        <p className="text-[10px] text-muted-foreground uppercase font-medium mt-1">Telemetry Sync: STABLE</p>
                      </div>

                      <div className="flex-1 relative">
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/5" />
                        
                        <div className="space-y-10 relative">
                          <TimelineNode 
                            label="DISPATCHED" 
                            time="Oct 14, 08:00" 
                            status="completed" 
                            icon={CheckCircle2} 
                          />
                          <TimelineNode 
                            label="IN TRANSIT" 
                            time="Oct 14, 12:45" 
                            status="active" 
                            icon={Satellite} 
                            subText="GALILEO-9 Relay Active"
                          />
                          <TimelineNode 
                            label="CHECKPOINT 1" 
                            time="Oct 15, 02:30" 
                            status="pending" 
                            icon={MapPin} 
                          />
                          <TimelineNode 
                            label="ETA" 
                            time={selectedShipment.eta} 
                            status="pending" 
                            icon={Clock} 
                          />
                          <TimelineNode 
                            label="DELIVERED" 
                            time="Pending" 
                            status="pending" 
                            icon={CheckCircle2} 
                          />
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/5">
                        <Button className="w-full h-12 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-bold uppercase text-[10px] tracking-widest gap-2">
                          View Detailed Telemetry
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                      <Satellite className="w-12 h-12 mb-4 opacity-20" />
                      <p className="text-xs uppercase tracking-widest leading-relaxed">Select a shipment to view real-time lifecycle tracking.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>

          <footer className="p-6 border-t border-white/5 text-center">
            <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-bold">
              ChemGuard AI Logistics Security Terminal | Node v4.2.1-TR | Satellite: GALILEO-9
            </p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

function TimelineNode({ label, time, status, icon: Icon, subText }: { 
  label: string, 
  time: string, 
  status: 'completed' | 'active' | 'pending', 
  icon: any,
  subText?: string
}) {
  return (
    <div className="flex gap-6 group">
      <div className="relative z-10">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500",
          status === 'completed' ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
          status === 'active' ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] animate-pulse" :
          "bg-white/5 border-white/10 text-muted-foreground"
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <p className={cn(
          "text-[11px] font-bold tracking-widest uppercase",
          status === 'active' ? "text-cyan-400" : "text-white/80"
        )}>{label}</p>
        <p className="text-[9px] text-muted-foreground mt-0.5">{time}</p>
        {subText && <p className="text-[8px] text-cyan-400/60 font-mono mt-1">{subText}</p>}
      </div>
    </div>
  )
}
