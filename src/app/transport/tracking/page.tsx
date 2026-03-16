"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TransportSidebar } from "@/components/transport/transport-sidebar"
import { TrackingHeader } from "@/components/transport/tracking-header"
import { LiveTrackingMap } from "@/components/transport/live-tracking-map"
import { TrackingSidebar } from "@/components/transport/tracking-sidebar"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, limit } from "firebase/firestore"
import { Loader2 } from "lucide-react"

/**
 * Live Route Tracking Page - Strategic terminal for fleet movement oversight.
 */
export default function LiveRouteTrackingPage() {
  const db = useFirestore()

  // Real-time collections for global state
  const vehiclesQuery = useMemoFirebase(() => query(collection(db, "vehicles"), limit(20)), [db])
  const shipmentsQuery = useMemoFirebase(() => query(collection(db, "shipments"), limit(20)), [db])
  const alertsQuery = useMemoFirebase(() => query(collection(db, "transport_alerts"), limit(50)), [db])

  const { data: vehicles, isLoading: loadingVehicles } = useCollection(vehiclesQuery)
  const { data: shipments } = useCollection(shipmentsQuery)
  const { data: alerts } = useCollection(alertsQuery)

  if (loadingVehicles) {
    return (
      <div className="h-screen w-full bg-[#050b14] flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
        </div>
        <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.4em] animate-pulse">Syncing Tactical Grid</p>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#050b14] text-white selection:bg-cyan-500/30">
        <TransportSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden bg-transparent">
          <TrackingHeader alertsCount={alerts?.length || 0} />
          
          <main className="flex-1 flex overflow-hidden border-t border-white/5">
            {/* Left Section: Large Tactical Map */}
            <div className="flex-1 relative overflow-hidden bg-[#0a0f18]">
              <LiveTrackingMap 
                vehicles={vehicles || []} 
                shipments={shipments || []} 
                alerts={alerts || []} 
              />
            </div>

            {/* Right Section: Intelligence Panel */}
            <aside className="w-[380px] border-l border-white/5 bg-[#050b14]/80 backdrop-blur-xl overflow-y-auto hidden lg:block custom-scrollbar">
              <TrackingSidebar 
                vehicles={vehicles || []} 
                alerts={alerts || []} 
              />
            </aside>
          </main>

          <footer className="h-8 border-t border-white/5 bg-[#050b14] flex items-center px-6 justify-between shrink-0">
            <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-[0.2em]">
              Node Relay: [EU-ALPHA-SOC] | Latency: 12ms | Encryption: AES-256-GCM
            </p>
            <div className="flex gap-4">
              <span className="text-[8px] text-emerald-400 uppercase font-bold tracking-widest">GPS Sync: Locked</span>
              <span className="text-[8px] text-cyan-400 uppercase font-bold tracking-widest">SAT Link: Stable</span>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
