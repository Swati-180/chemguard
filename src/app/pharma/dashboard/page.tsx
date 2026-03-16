"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { PharmaSidebar } from "@/components/pharma/pharma-sidebar"
import { PharmaTopBar } from "@/components/pharma/pharma-top-bar"
import { PharmaKpiCards } from "@/components/pharma/pharma-kpi-cards"
import { PharmaDashboardCharts } from "@/components/pharma/pharma-dashboard-charts"
import { PharmaQuickActions } from "@/components/pharma/pharma-quick-actions"
import { PharmaHardwareStatus } from "@/components/pharma/pharma-hardware-status"

/**
 * Pharma Lab Dashboard - Overview for research and inventory managers.
 */
export default function PharmaDashboard() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#0a0f18]">
        <PharmaSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent">
          <PharmaTopBar />
          <main className="flex-1 p-6 space-y-6">
            <header>
              <h1 className="text-2xl font-headline font-bold text-white tracking-tight">Pharma Lab Dashboard</h1>
            </header>

            {/* Row 1: KPI Cards */}
            <PharmaKpiCards />

            {/* Row 2: Analytical Charts */}
            <PharmaDashboardCharts />

            {/* Row 3: Actions and Hardware */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 pb-8">
              <div className="lg:col-span-6">
                <PharmaQuickActions />
              </div>
              <div className="lg:col-span-4">
                <PharmaHardwareStatus />
              </div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
