import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { PharmaSidebar } from "@/components/pharma/pharma-sidebar"
import { PharmaTopBar } from "@/components/pharma/pharma-top-bar"
import { ComplianceKpiCards } from "@/components/pharma/compliance-kpi-cards"
import { InspectionOutcomeChart } from "@/components/pharma/inspection-outcome-chart"
import { ComplianceScoreArc } from "@/components/pharma/compliance-score-arc"
import { AuditEventLogsTable } from "@/components/pharma/audit-event-logs-table"
import { Button } from "@/components/ui/button"
import { FileText, ShieldAlert } from "lucide-react"

export default function PharmaCompliancePage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#0a0f18]">
        <PharmaSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent relative">
          {/* Background technical grid or pattern can be added here if desired */}
          <PharmaTopBar />
          <main className="flex-1 p-6 space-y-6">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-headline font-bold text-white tracking-tight">Compliance Monitoring & Audit Logs</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Real-Time Lab Governance</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 font-headline font-bold uppercase tracking-wider text-[10px] h-9">
                  Generate New Audit
                </Button>
                <Button className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 font-headline font-bold uppercase tracking-wider text-[10px] h-9">
                  Compliance Reports
                </Button>
              </div>
            </header>

            {/* Row 1: KPI Cards */}
            <ComplianceKpiCards />

            {/* Row 2: Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <InspectionOutcomeChart />
              </div>
              <div className="lg:col-span-4">
                <ComplianceScoreArc />
              </div>
            </div>

            {/* Row 3: Audit Event Logs */}
            <AuditEventLogsTable />

            <footer className="pt-8 pb-4 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                &copy; 2024 ChemGuard AI Enterprise security System | Neural Compliance Hub v5.2.0
              </p>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
