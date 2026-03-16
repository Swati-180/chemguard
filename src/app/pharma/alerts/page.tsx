"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { PharmaSidebar } from "@/components/pharma/pharma-sidebar"
import { PharmaTopBar } from "@/components/pharma/pharma-top-bar"
import { AlertsKpiCards } from "@/components/pharma/alerts-kpi-cards"
import { AlertsTrendsChart } from "@/components/pharma/alerts-trends-chart"
import { AlertsMatrixTable } from "@/components/pharma/alerts-matrix-table"
import { Button } from "@/components/ui/button"
import { ShieldAlert, History, Download } from "lucide-react"

/**
 * Pharma Alerts Page - Real-time security and anomaly monitoring for the lab.
 */
export default function PharmaAlertsPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#0a0f18]">
        <PharmaSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent relative">
          <PharmaTopBar />
          <main className="flex-1 p-6 space-y-6">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-headline font-bold text-white tracking-tight flex items-center gap-3">
                  <ShieldAlert className="w-6 h-6 text-destructive" />
                  Real-Time Security Alerts Monitoring
                </h1>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Neural Operations Hub | Threat Intelligence</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 font-headline font-bold uppercase tracking-wider text-[10px] h-9 gap-2">
                  <History className="w-3.5 h-3.5" />
                  Alert History
                </Button>
                <Button className="bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive/20 font-headline font-bold uppercase tracking-wider text-[10px] h-9">
                  Clear All Resolved
                </Button>
                <Button className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 font-headline font-bold uppercase tracking-wider text-[10px] h-9 gap-2">
                  <Download className="w-3.5 h-3.5" />
                  Export Log
                </Button>
              </div>
            </header>

            {/* Row 1: Alert KPI Summary */}
            <AlertsKpiCards />

            {/* Row 2: Analytics Row */}
            <AlertsTrendsChart />

            {/* Row 3: Alerts Matrix Table */}
            <AlertsMatrixTable />

            <footer className="pt-8 pb-4 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                &copy; 2024 ChemGuard AI Enterprise Security System | Security Operations Center v4.8.2
              </p>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
