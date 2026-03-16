"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TransportSidebar } from "@/components/transport/transport-sidebar"
import { TransportTopBar } from "@/components/transport/transport-top-bar"
import { ShipmentRequestsTable } from "@/components/pharma/shipment-requests-table"
import { Button } from "@/components/ui/button"
import { 
  Truck, 
  Filter, 
  Download, 
  Search,
  Zap,
  ArrowRight
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function TransportShipmentsPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#05080d]">
        <TransportSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent relative">
          <TransportTopBar />
          <main className="flex-1 p-6 space-y-6">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-headline font-bold text-white tracking-tight">Fleet Shipment Manifest</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Validated Logistics Registry</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 font-headline font-bold uppercase tracking-wider text-[10px] h-10 px-6 gap-2">
                  <Download className="w-3.5 h-3.5" />
                  Export Manifest
                </Button>
                <Button className="bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30 font-headline font-bold uppercase tracking-wider text-[10px] h-10 px-6 gap-2">
                  <Zap className="w-3.5 h-3.5" />
                  Batch Update Status
                </Button>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-9">
                <ShipmentRequestsTable />
              </div>
              <div className="lg:col-span-3 space-y-6">
                <Card className="glass-card bg-white/[0.02] border-white/5">
                  <CardHeader className="py-4 border-b border-white/5">
                    <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Shipment Search</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                      <Input placeholder="Tracking ID..." className="pl-9 bg-white/5 border-white/10 h-10 text-xs" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase">Filter by Route</label>
                      <select className="w-full bg-white/5 border-white/10 rounded h-10 px-3 text-xs text-white appearance-none">
                        <option>All Routes</option>
                        <option>North-ATL-4</option>
                        <option>Pacific-SOC-1</option>
                      </select>
                    </div>
                    <Button className="w-full h-10 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-bold uppercase text-[10px] tracking-widest">
                      Apply Filters
                    </Button>
                  </CardContent>
                </Card>

                <div className="p-6 rounded-2xl border border-orange-500/20 bg-orange-500/5 backdrop-blur-xl relative overflow-hidden group cursor-pointer hover:border-orange-500/40 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-orange-500/20 transition-all" />
                  <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5" />
                    Pending Pickup
                  </p>
                  <p className="text-[24px] font-headline font-bold text-white leading-none">12</p>
                  <p className="text-[10px] text-white/60 mt-2 uppercase font-bold tracking-tight">Shipments awaiting transporter verification</p>
                  <div className="mt-4 flex items-center gap-2 text-orange-400 group-hover:gap-3 transition-all">
                    <span className="text-[9px] font-bold uppercase">View All</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>

            <footer className="pt-8 pb-4 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                &copy; 2024 ChemGuard AI | Fleet Logistics Control Terminal
              </p>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
