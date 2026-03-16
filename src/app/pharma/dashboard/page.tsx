
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { PharmaSidebar } from "@/components/pharma/pharma-sidebar"
import { TopBar } from "@/components/dashboard/top-bar"
import { PharmaKpiCards } from "@/components/pharma/pharma-kpi-cards"
import { PharmaAnalyticsCharts } from "@/components/pharma/pharma-analytics-charts"
import { BatchActivityTable } from "@/components/pharma/batch-activity-table"
import { InventoryGlowCard } from "@/components/pharma/inventory-glow-card"

export default function PharmaDashboard() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <PharmaSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto">
          <TopBar />
          <main className="flex-1 p-6 space-y-6">
            <section className="space-y-2">
              <h1 className="text-3xl font-headline font-bold tracking-tight">Pharma Lab Control <span className="text-accent">| Dashboard</span></h1>
              <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-bold">Secure Laboratory & Inventory Management System</p>
            </section>

            <PharmaKpiCards />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PharmaAnalyticsCharts />
              </div>
              <div className="lg:col-span-1">
                <InventoryGlowCard />
              </div>
            </div>

            <BatchActivityTable />
            
            <footer className="pt-8 pb-4 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                &copy; 2024 ChemGuard AI | Pharmaceutical Operations Hub v5.1.0
              </p>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
