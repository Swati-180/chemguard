
"use client"

import * as React from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { TopBar } from "@/components/dashboard/top-bar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ChemicalInventoryTable } from "@/components/chemicals/chemical-inventory-table"
import { ChemicalKpiCards } from "@/components/chemicals/chemical-kpi-cards"
import { UsageBarChart } from "@/components/chemicals/usage-bar-chart"
import { DistributionPieChart } from "@/components/chemicals/distribution-pie-chart"
import { ExpiryTimelineChart } from "@/components/chemicals/expiry-timeline-chart"
import { BatchRiskIndicators } from "@/components/chemicals/risk-indicators"
import { AddChemicalModal } from "@/components/chemicals/add-chemical-modal"
import { EmptyInventoryState } from "@/components/chemicals/empty-inventory-state"
import { Button } from "@/components/ui/button"
import { Plus, Database, Download, History, Filter } from "lucide-react"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, doc, writeBatch } from "firebase/firestore"
import { toast } from "@/hooks/use-toast"

/**
 * Redesigned Chemical Management Page
 * Features high-fidelity layout, real-time data integration, and advanced analytics.
 */
export default function ChemicalsPage() {
  const db = useFirestore()
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)
  
  // Real-time inventory listener
  const inventoryQuery = useMemoFirebase(() => collection(db, "chemical_inventory"), [db])
  const { data: inventory, isLoading } = useCollection(inventoryQuery)

  const handleSeedDemoData = async () => {
    const batch = writeBatch(db)
    const demoItems = [
      { id: "INV-1001", name: "Hydrochloric Acid", batchId: "B-7721", manufacturer: "GlobalChem", quantity: 500, unit: "L", status: "In Stock", expiryDate: "2025-12-31", location: "Section A-12" },
      { id: "INV-1002", name: "Ammonium Nitrate", batchId: "B-8832", manufacturer: "NitroTech", quantity: 1200, unit: "kg", status: "Quarantined", expiryDate: "2024-11-15", location: "Vault 4" },
      { id: "INV-1003", name: "Sodium Cyanide", batchId: "B-9910", manufacturer: "Precision Reagents", quantity: 50, unit: "kg", status: "Low Stock", expiryDate: "2026-06-20", location: "Haz Room 1" },
      { id: "INV-1004", name: "Sulfuric Acid", batchId: "B-4401", manufacturer: "GlobalChem", quantity: 0, unit: "L", status: "Expired", expiryDate: "2023-10-01", location: "Section B-04" },
    ]

    demoItems.forEach(item => {
      const docRef = doc(db, "chemical_inventory", item.id)
      batch.set(docRef, { ...item, createdAt: new Date().toISOString() })
    })

    try {
      await batch.commit()
      toast({ title: "Database Synchronized", description: "Demo chemical inventory has been provisioned." })
    } catch (e) {
      toast({ variant: "destructive", title: "Sync Failed", description: "Could not seed demo data." })
    }
  }

  const hasData = inventory && inventory.length > 0

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#0a0f18] text-white">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto custom-scrollbar relative">
          {/* Futuristic background overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
            <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <TopBar />
          
          <main className="flex-1 p-6 space-y-8 relative z-10">
            {/* Header Controls */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-6">
              <div className="space-y-1">
                <h1 className="text-3xl font-headline font-bold tracking-tight uppercase">
                  Chemical Management <span className="text-primary/60 font-normal">| Overview</span>
                </h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Neural Inventory Control v4.2.0
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30 font-headline font-bold uppercase tracking-widest gap-2 h-11 px-6 shadow-[0_0_20px_rgba(46,222,255,0.1)]"
                >
                  <Plus className="w-4 h-4" /> Add Chemical Batch
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleSeedDemoData}
                  className="border-white/10 bg-white/5 hover:bg-white/10 font-bold uppercase tracking-widest text-[10px] h-11 px-4 gap-2"
                >
                  <Database className="w-3.5 h-3.5" /> Sync Data
                </Button>
                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 h-11 px-4 text-muted-foreground">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </header>

            {/* KPI Section */}
            <ChemicalKpiCards inventory={inventory || []} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Inventory Table */}
              <div className="lg:col-span-8 space-y-8">
                {hasData ? (
                  <ChemicalInventoryTable inventory={inventory} />
                ) : (
                  <EmptyInventoryState onAdd={() => setIsAddModalOpen(true)} isLoading={isLoading} />
                )}
              </div>

              {/* Right Column: Analytics & Risks */}
              <div className="lg:col-span-4 space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-primary rounded-full" />
                    <h2 className="text-sm font-headline font-bold uppercase tracking-widest text-white">Visual Intelligence</h2>
                  </div>
                  <UsageBarChart />
                  <DistributionPieChart />
                  <ExpiryTimelineChart />
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-destructive rounded-full" />
                    <h2 className="text-sm font-headline font-bold uppercase tracking-widest text-white">Tactical Risk Matrix</h2>
                  </div>
                  <BatchRiskIndicators />
                </div>
              </div>
            </div>

            <footer className="pt-12 pb-6 text-center border-t border-white/5 opacity-50">
              <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-bold">
                ChemGuard AI Enterprise Security System | Lab Control Hub v8.1.2-STABLE
              </p>
            </footer>
          </main>
        </SidebarInset>
      </div>

      <AddChemicalModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </SidebarProvider>
  )
}
