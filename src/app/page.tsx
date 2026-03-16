import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { TopBar } from "@/components/dashboard/top-bar"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { AnalyticsCharts } from "@/components/dashboard/analytics-charts"
import { ShipmentMap } from "@/components/dashboard/shipment-map"
import { AiRiskSummary } from "@/components/dashboard/ai-risk-summary"
import { AlertsTable } from "@/components/dashboard/alerts-table"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto">
          <TopBar />
          <main className="flex-1 p-6 space-y-6">
            <section className="space-y-2">
              <h1 className="text-3xl font-headline font-bold tracking-tight">Operation Overview</h1>
              <p className="text-muted-foreground">Live monitoring of chemical assets and global shipments.</p>
            </section>

            <KpiCards />

            <AnalyticsCharts />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ShipmentMap />
              </div>
              <div className="lg:col-span-1">
                <AiRiskSummary />
              </div>
            </div>

            <AlertsTable />
            
            <footer className="pt-8 pb-4 text-center">
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
