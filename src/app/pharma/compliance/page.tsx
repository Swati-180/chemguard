
"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { PharmaSidebar } from "@/components/pharma/pharma-sidebar"
import { PharmaTopBar } from "@/components/pharma/pharma-top-bar"
import { ComplianceKpiCards } from "@/components/pharma/compliance-kpi-cards"
import { InspectionOutcomeChart } from "@/components/pharma/inspection-outcome-chart"
import { ComplianceScoreArc } from "@/components/pharma/compliance-score-arc"
import { AuditEventLogsTable } from "@/components/pharma/audit-event-logs-table"
import { Button } from "@/components/ui/button"
import { FileText, ShieldAlert, Database } from "lucide-react"
import { useFirestore, useUser } from "@/firebase"
import { collection, doc } from "firebase/firestore"
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { toast } from "@/hooks/use-toast"

export default function PharmaCompliancePage() {
  const db = useFirestore()
  const { user } = useUser()

  const handleSeedCompliance = () => {
    if (!user) return
    const logsRef = collection(db, "compliance_logs")
    const demoLogs = [
      { id: "c_log_001", timestamp: new Date().toISOString(), user: "Amelia Reed", action: "Batch Verification", batchId: "AN-784-K", location: "Lab B-04", status: "Verified" },
      { id: "c_log_002", timestamp: new Date(Date.now() - 3600000).toISOString(), user: "Sarah Chen", action: "Inventory Update", batchId: "SA-099-H", location: "Reagent Room", status: "Verified" },
      { id: "c_log_003", timestamp: new Date(Date.now() - 7200000).toISOString(), user: "Kenjiro Tanaka", action: "Shipment Dispatched", batchId: "SU-901-F", location: "Dispatch Bay 2", status: "Warning" },
      { id: "c_log_004", timestamp: new Date(Date.now() - 10800000).toISOString(), user: "System Bot AI", action: "Unauthorized Access Alert", batchId: "--", location: "Hazardous Storage", status: "Violation" },
    ]

    demoLogs.forEach(log => {
      setDocumentNonBlocking(doc(logsRef, log.id), log, { merge: true })
    })

    toast({
      title: "Audit Link Synced",
      description: "Provisioning historical compliance events to secure log.",
    })
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#0a0f18]">
        <PharmaSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent relative">
          <PharmaTopBar />
          <main className="flex-1 p-6 space-y-6">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-headline font-bold text-white tracking-tight">Compliance Monitoring & Audit Logs</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">Real-Time Lab Governance</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button 
                  onClick={handleSeedCompliance}
                  className="bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 font-headline font-bold uppercase tracking-wider text-[10px] h-9 gap-2"
                >
                  <Database className="w-3.5 h-3.5" />
                  Seed Compliance Logs
                </Button>
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
