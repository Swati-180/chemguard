import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { TopBar } from "@/components/dashboard/top-bar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ComplianceSummaryCards } from "@/components/compliance/compliance-summary-cards"
import { AuditLogTable } from "@/components/compliance/audit-log-table"
import { TraceabilityMap } from "@/components/compliance/traceability-map"
import { ComplianceScoreGauge } from "@/components/compliance/compliance-score-gauge"
import { InspectionResultsChart } from "@/components/compliance/inspection-results-chart"

export default function CompliancePage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto">
          <TopBar />
          <main className="flex-1 p-6 space-y-6">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-headline font-bold tracking-tight text-primary">Compliance Management</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">
                   Compliance Management Overview | <span className="text-white/60">October 14, 2024 | 14:40 GMT</span>
                </p>
              </div>
            </header>

            {/* Row 1: Summary Cards */}
            <ComplianceSummaryCards />

            {/* Row 2: Audit Trail Table */}
            <AuditLogTable />

            {/* Row 3: Visual Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6">
              <div className="lg:col-span-5">
                <TraceabilityMap />
              </div>
              <div className="lg:col-span-3">
                <ComplianceScoreGauge />
              </div>
              <div className="lg:col-span-4">
                <InspectionResultsChart />
              </div>
            </div>

            <footer className="pt-8 pb-4 text-center border-t border-white/5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                &copy; 2024 ChemGuard AI Enterprise Security System | Compliance Portal v5.0.1
              </p>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
