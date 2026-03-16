"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TransportSidebar } from "@/components/transport/transport-sidebar"
import { TransportTopBar } from "@/components/transport/transport-top-bar"
import { ReportFilters } from "@/components/transport/reports/report-filters"
import { AnalyticsPreview } from "@/components/transport/reports/analytics-preview"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection } from "firebase/firestore"

/**
 * Transport Reports Page - Strategic analytics and compliance reporting terminal.
 */
export default function TransportReportsPage() {
  const db = useFirestore()

  // Real-time data for derivation
  const vehiclesQuery = useMemoFirebase(() => collection(db, "vehicles"), [db])
  const shipmentsQuery = useMemoFirebase(() => collection(db, "shipments"), [db])
  const alertsQuery = useMemoFirebase(() => collection(db, "transport_alerts"), [db])

  const { data: vehicles } = useCollection(vehiclesQuery)
  const { data: shipments } = useCollection(shipmentsQuery)
  const { data: alerts } = useCollection(alertsQuery)

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#050b14] text-white">
        <TransportSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent relative">
          {/* Decorative Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <TransportTopBar />
          
          <main className="flex-1 p-6 space-y-6 relative z-10">
            <header className="space-y-1">
              <h1 className="text-3xl font-headline font-bold tracking-tight uppercase">Report Generation Center</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Generate comprehensive logistics insights for optimization and compliance.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
              {/* Left Column: Filter & Category Selection */}
              <div className="lg:col-span-7">
                <ReportFilters vehicles={vehicles || []} />
              </div>

              {/* Right Column: Analytics Preview */}
              <div className="lg:col-span-5">
                <AnalyticsPreview 
                  shipments={shipments || []} 
                  alerts={alerts || []} 
                />
              </div>
            </div>
          </main>

          <footer className="p-6 border-t border-white/5 text-center bg-black/20">
            <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-bold">
              ChemGuard AI Intelligence Unit | Neural Analytics Node v8.4.2 | DATA_AUTH: [VERIFIED]
            </p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
