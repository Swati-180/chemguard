
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { TopBar } from "@/components/dashboard/top-bar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DeviceSummaryCards } from "@/components/hardware/device-summary-cards"
import { NetworkAnalytics } from "@/components/hardware/network-analytics"
import { IoTDistributionMap } from "@/components/hardware/iot-distribution-map"
import { AiHardwareRisk } from "@/components/hardware/ai-hardware-risk"
import { DeviceAlertsTable } from "@/components/hardware/device-alerts-table"

export default function HardwareMonitoringPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto">
          <TopBar />
          <main className="flex-1 p-6 space-y-6">
            <header className="space-y-1">
              <h1 className="text-3xl font-headline font-bold tracking-tight">Hardware Monitoring</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">IoT Device Health & Sensor Analytics | Global Control</p>
            </header>

            {/* Row 1: Summary Cards */}
            <DeviceSummaryCards />

            {/* Row 2: Charts */}
            <NetworkAnalytics />

            {/* Row 3: Map */}
            <IoTDistributionMap />

            {/* Row 4: Risk & Table Section */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
              <div className="lg:col-span-3">
                <AiHardwareRisk />
              </div>
              <div className="lg:col-span-7">
                <DeviceAlertsTable />
              </div>
            </div>

            <footer className="pt-8 pb-4 text-center border-t border-white/5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                &copy; 2024 ChemGuard AI Enterprise Security System | SOC Hardware Console v1.2.0
              </p>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
