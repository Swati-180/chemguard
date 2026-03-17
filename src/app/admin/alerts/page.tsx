
"use client"

import * as React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { TopBar } from "@/components/dashboard/top-bar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AlertsKpiCards } from "@/components/admin/alerts/alerts-kpi-cards"
import { AlertsMainTable } from "@/components/admin/alerts/alerts-main-table"
import { AlertsAnalyticsPanel } from "@/components/admin/alerts/alerts-analytics-panel"
import { Button } from "@/components/ui/button"
import { 
  ShieldAlert, 
  Download, 
  CheckCircle2, 
  Database,
  History,
  LayoutGrid
} from "lucide-react"
import { useFirestore } from "@/firebase"
import { collection, doc, writeBatch, query, getDocs } from "firebase/firestore"
import { toast } from "@/hooks/use-toast"

/**
 * Admin Alerts & Incidents Page
 * High-end SOC Command Center UI.
 */
export default function AdminAlertsPage() {
  const db = useFirestore()
  const [isSyncing, setIsSyncing] = React.useState(false)

  const handleSeedAlerts = async () => {
    setIsSyncing(true)
    const batch = writeBatch(db)
    const demoAlerts = [
      { id: "AL-7721", shipmentId: "SHP-1001", location: "Sector 4-B", type: "Temperature Breach", severity: "Critical", status: "Open", timestamp: new Date().toISOString(), description: "Internal chamber temp: +12°C. Critical threshold exceeded." },
      { id: "AL-8832", shipmentId: "SHP-1002", location: "Rotterdam Hub", type: "Tamper Alert", severity: "Critical", status: "Investigating", timestamp: new Date(Date.now() - 3600000).toISOString(), description: "Lock mechanism seal compromised on container CT-92." },
      { id: "AL-9910", shipmentId: "SHP-1003", location: "Highway A12", type: "Route Deviation", severity: "Warning", status: "Open", timestamp: new Date(Date.now() - 7200000).toISOString(), description: "Vehicle diverted 5.2km from primary trajectory." },
      { id: "AL-4401", shipmentId: "SHP-1004", location: "Loading Dock 2", type: "Hazmat Leak", severity: "Critical", status: "Open", timestamp: new Date(Date.now() - 10800000).toISOString(), description: "Sensor LS-04 detecting precursor vapor leakage." },
      { id: "AL-3302", shipmentId: "SHP-1005", location: "Global Terminal", type: "System Check", severity: "Info", status: "Resolved", timestamp: new Date(Date.now() - 86400000).toISOString(), description: "Scheduled hardware relay diagnostic completed." },
    ]

    demoAlerts.forEach(alert => {
      const docRef = doc(db, "transport_alerts", alert.id)
      batch.set(docRef, alert, { merge: true })
    })

    try {
      await batch.commit()
      toast({ title: "Intelligence Synced", description: "Tactical alerts provisioned to Command Center." })
    } catch (e) {
      toast({ variant: "destructive", title: "Sync Failed", description: "Unable to reach security nodes." })
    } finally {
      setIsSyncing(false)
    }
  }

  const handleResolveAll = async () => {
    const q = query(collection(db, "transport_alerts"))
    const snapshot = await getDocs(q)
    const batch = writeBatch(db)
    
    snapshot.docs.forEach(doc => {
      batch.update(doc.ref, { status: 'Resolved' })
    })

    try {
      await batch.commit()
      toast({ title: "Perimeter Clear", description: "All active incidents marked as Resolved." })
    } catch (e) {
      toast({ variant: "destructive", title: "Command Failed", description: "Unable to update threat matrix." })
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#050b14] text-white">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto custom-scrollbar relative">
          {/* Cyber-Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
            <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <TopBar />
          
          <main className="flex-1 p-6 space-y-8 relative z-10">
            {/* Header Control Console */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center justify-center neon-glow-red">
                    <ShieldAlert className="w-6 h-6 text-destructive" />
                  </div>
                  <h1 className="text-3xl font-headline font-bold tracking-tight uppercase">
                    Alerts & Incidents <span className="text-muted-foreground font-normal text-lg">| SOC Command</span>
                  </h1>
                </div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  Satellite Threat Matrix v8.4.2-AL
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button 
                  onClick={handleResolveAll}
                  variant="outline"
                  className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 font-headline font-bold uppercase tracking-widest gap-2 h-11 px-6"
                >
                  <CheckCircle2 className="w-4 h-4" /> Mark All Resolved
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleSeedAlerts}
                  disabled={isSyncing}
                  className="border-white/10 bg-white/5 hover:bg-white/10 font-bold uppercase tracking-widest text-[10px] h-11 px-4 gap-2"
                >
                  <Database className="w-3.5 h-3.5" /> Sync Data
                </Button>
                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 h-11 px-4 text-muted-foreground">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </header>

            {/* Row 1: Tactical KPI Matrix */}
            <AlertsKpiCards />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12">
              {/* Left Column: Command Log Table */}
              <div className="lg:col-span-8 space-y-8">
                <AlertsMainTable />
              </div>

              {/* Right Column: Analytics & Historical Intelligence */}
              <div className="lg:col-span-4 space-y-8">
                <AlertsAnalyticsPanel />
                
                {/* Live Data Stream Tag */}
                <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                    <LayoutGrid className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">Network Health</p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-white/60 uppercase font-bold">Satellite Link</span>
                      <span className="text-[10px] text-emerald-400 font-mono">ENCRYPTED</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-white/60 uppercase font-bold">Latency</span>
                      <span className="text-[10px] text-white font-mono">12ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-white/60 uppercase font-bold">Uptime</span>
                      <span className="text-[10px] text-white font-mono">99.99%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <footer className="pt-12 pb-6 text-center border-t border-white/5 opacity-50">
              <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-bold">
                ChemGuard AI Enterprise Security System | Command Center Node v2.1.0-STABLE
              </p>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
