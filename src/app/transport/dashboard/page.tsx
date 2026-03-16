"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TransportSidebar } from "@/components/transport/transport-sidebar"
import { TransportTopBar } from "@/components/transport/transport-top-bar"
import { TransportMetricCards } from "@/components/transport/metric-cards"
import { LiveShipmentMap } from "@/components/transport/shipment-map"
import { ShipmentActivityChart } from "@/components/transport/activity-chart"
import { VehicleStatusPanel } from "@/components/transport/vehicle-status-panel"
import { TransportQuickActions } from "@/components/transport/quick-actions"

/**
 * Transport Dashboard - High-level operational overview for Logistics Command.
 */
export default function TransportDashboard() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#05080d]">
        <TransportSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent relative">
          <TransportTopBar />
          
          <main className="flex-1 p-6 space-y-6">
            <header className="space-y-1">
              <h1 className="text-3xl font-headline font-bold text-white tracking-tight uppercase">Logistics Command Center</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.3em] font-medium">Global Chemical Shipment Real-Time Monitoring</p>
            </header>

            {/* Top Metric Cards */}
            <TransportMetricCards />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Live Map */}
              <div className="lg:col-span-8">
                <LiveShipmentMap />
              </div>

              {/* Right Column: Activity & Status */}
              <div className="lg:col-span-4 space-y-6">
                <ShipmentActivityChart />
                <VehicleStatusPanel />
              </div>
            </div>

            {/* Bottom Section: Quick Actions */}
            <TransportQuickActions />

            <footer className="pt-8 pb-4 text-center border-t border-white/5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] font-bold">
                &copy; 2024 ChemGuard AI Enterprise Logistics Monitoring | Terminal v4.2.1-TR
              </p>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
