
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { TopBar } from "@/components/dashboard/top-bar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AiRiskSummaryCards } from "@/components/ai/risk-summary-cards"
import { AiIntelligenceCharts } from "@/components/ai/intelligence-charts"
import { AiDetectedThreats } from "@/components/ai/detected-threats"
import { AiRiskHeatmap } from "@/components/ai/risk-heatmap"
import { AiDecisionEngine } from "@/components/ai/decision-engine"

export default function AiIntelligencePage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto">
          <TopBar />
          <main className="flex-1 p-6 space-y-6">
            <header className="space-y-1">
              <h1 className="text-3xl font-headline font-bold tracking-tight">AI Intelligence Center</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Risk Detection & Predictive Analytics | Neural Oversight v4.0</p>
            </header>

            {/* Row 1: Summary Cards */}
            <AiRiskSummaryCards />

            {/* Row 2: Charts */}
            <AiIntelligenceCharts />

            {/* Row 3 & 4: Threats & Heatmap */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
              <div className="lg:col-span-4">
                <AiDetectedThreats />
              </div>
              <div className="lg:col-span-6">
                <AiRiskHeatmap />
              </div>
            </div>

            {/* Row 5: Decision Engine */}
            <AiDecisionEngine />

            <footer className="pt-8 pb-4 text-center border-t border-white/5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                &copy; 2024 ChemGuard AI Enterprise Security System | Neural Operations Hub v4.2.1
              </p>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
