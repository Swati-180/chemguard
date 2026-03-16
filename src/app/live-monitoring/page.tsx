"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { TopBar } from "@/components/dashboard/top-bar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { MonitoringMap } from "@/components/monitoring/monitoring-map"
import { ActiveVehiclesOverview } from "@/components/monitoring/active-vehicles-overview"
import { ShipmentStatusSummary } from "@/components/monitoring/shipment-status-summary"
import { DriverInformation } from "@/components/monitoring/driver-information"
import { VehicleTrackingTable } from "@/components/monitoring/vehicle-tracking-table"

/**
 * Live Monitoring Page - Real-time GIS visualization of all active chemical transport units.
 */
export default function LiveMonitoringPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto">
          <TopBar />
          <main className="flex-1 p-6 space-y-6">
            <header className="space-y-1">
              <h1 className="text-2xl font-headline font-bold tracking-tight">
                Live Monitoring – <span className="text-primary">Real-Time Chemical Shipment Tracking</span>
              </h1>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Global Logistics Security Operation Center (SOC)</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
              {/* Left Side: Map */}
              <div className="lg:col-span-7">
                <MonitoringMap />
              </div>

              {/* Right Side: Control Panels */}
              <div className="lg:col-span-3 space-y-6">
                <ActiveVehiclesOverview />
                <ShipmentStatusSummary />
                <DriverInformation />
              </div>
            </div>

            {/* Bottom: Tracking Table */}
            <VehicleTrackingTable />

            <footer className="pt-8 pb-4 text-center border-t border-white/5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                &copy; 2024 ChemGuard AI Enterprise Security System | SOC Console v2.4.1
              </p>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
