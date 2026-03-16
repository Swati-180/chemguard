
"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { TopBar } from "@/components/dashboard/top-bar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ChemicalInventoryTable } from "@/components/chemicals/chemical-inventory-table"
import { UsageBarChart } from "@/components/chemicals/usage-bar-chart"
import { DistributionPieChart } from "@/components/chemicals/distribution-pie-chart"
import { BatchRiskIndicators } from "@/components/chemicals/risk-indicators"
import { Button } from "@/components/ui/button"
import { Plus, History, Download, Database } from "lucide-react"
import { useFirestore } from "@/firebase"
import { collection, doc, serverTimestamp } from "firebase/firestore"
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { toast } from "@/hooks/use-toast"

export default function ChemicalsPage() {
  const db = useFirestore()

  const handleSeedDemoData = () => {
    const inventoryRef = collection(db, "chemical_inventory")
    const demoItems = [
      { id: "chem_001", chemicalName: "Hydrocloric Acid", casNumber: "7647-01-0", formula: "HCl", unit: "L", maxStorageCapacity: 5000, hazardStatement: "Corrosive", safetyDataSheetUrl: "https://example.com/sds/hcl", description: "Industrial grade acid", createdAt: new Date().toISOString() },
      { id: "chem_002", chemicalName: "Ammonium Nitrate", casNumber: "6484-52-2", formula: "NH4NO3", unit: "kg", maxStorageCapacity: 25000, hazardStatement: "Oxidizing", safetyDataSheetUrl: "https://example.com/sds/an", description: "Fertilizer component / Dual-use", createdAt: new Date().toISOString() }
    ]

    demoItems.forEach(item => {
      const docRef = doc(inventoryRef, item.id)
      setDocumentNonBlocking(docRef, item, { merge: true })
    })

    toast({
      title: "Data Provisioning Initiated",
      description: "Provisioning secure chemical inventory data to Firestore.",
    })
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto">
          <TopBar />
          <main className="flex-1 p-6 space-y-6">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-headline font-bold tracking-tight">Chemical Management Overview</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">July 15, 2024 | 14:40 GMT</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button 
                  onClick={handleSeedDemoData}
                  className="bg-accent/20 text-accent border border-accent/30 hover:bg-accent/30 font-headline font-semibold gap-2 h-11 px-6"
                >
                  <Database className="h-4 w-4" />
                  Provision Demo Data
                </Button>
                <Button className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 font-headline font-semibold gap-2 h-11 px-6 shadow-[0_0_15px_rgba(46,222,255,0.1)]">
                  <Plus className="h-4 w-4" />
                  Add Chemical Batch
                </Button>
                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 font-headline font-semibold gap-2 h-11 px-6">
                  <History className="h-4 w-4" />
                  View Batch History
                </Button>
                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 font-headline font-semibold gap-2 h-11 px-6">
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
              {/* Left Column: Inventory Table */}
              <div className="lg:col-span-7">
                <ChemicalInventoryTable />
              </div>

              {/* Right Column: Charts & Risks */}
              <div className="lg:col-span-3 space-y-6">
                <UsageBarChart />
                <DistributionPieChart />
                <BatchRiskIndicators />
              </div>
            </div>

            <footer className="pt-8 pb-4 text-center border-t border-white/5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                &copy; 2024 ChemGuard AI Enterprise Security System | SOC Console v2.4.1
              </p>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
