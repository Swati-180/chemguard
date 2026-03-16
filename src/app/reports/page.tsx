import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { TopBar } from "@/components/dashboard/top-bar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ReportGenerationCenter } from "@/components/reports/report-generation-center"
import { ShipmentVolumeTrends } from "@/components/reports/shipment-volume-trends"
import { ChemicalFlowAnalytics } from "@/components/reports/chemical-flow-analytics"

export default function ReportsPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto">
          <TopBar />
          <main className="flex-1 p-6 space-y-6">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-headline font-bold tracking-tight text-primary">Reports Management</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">
                   Supply Chain Intelligence & Reporting | <span className="text-white/60">October 14, 2024 | 14:40 GMT</span>
                </p>
              </div>
            </header>

            {/* Main Report Selection & Generation Center */}
            <ReportGenerationCenter />

            {/* Visual Analytics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
              <div className="lg:col-span-5">
                <ShipmentVolumeTrends />
              </div>
              <div className="lg:col-span-7">
                <ChemicalFlowAnalytics />
              </div>
            </div>

            <footer className="pt-8 pb-4 text-center border-t border-white/5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                &copy; 2024 ChemGuard AI Enterprise Security System | Neural Reports Hub v6.1.0
              </p>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
