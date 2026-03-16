
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { TopBar } from "@/components/dashboard/top-bar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ActiveShipmentsTable } from "@/components/shipments/active-shipments-table"
import { ShipmentTimeline } from "@/components/shipments/shipment-timeline"
import { ShipmentAnalyticsCards } from "@/components/shipments/shipment-analytics-cards"
import { Button } from "@/components/ui/button"
import { Plus, Navigation, Target } from "lucide-react"

export default function ShipmentsPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto">
          <TopBar />
          <main className="flex-1 p-6 space-y-6">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-headline font-bold tracking-tight">Shipment Management | <span className="text-primary/80">Operations Overview</span></h1>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">October 14, 2024 | 14:40 GMT</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 font-headline font-semibold gap-2 h-11 px-6 shadow-[0_0_15px_rgba(46,222,255,0.1)]">
                  Create Shipment <Plus className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 font-headline font-semibold gap-2 h-11 px-6">
                  Assign Route <Navigation className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 font-headline font-semibold gap-2 h-11 px-6">
                  Track Shipment <Target className="h-4 w-4" />
                </Button>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
              {/* Left Column: Active Shipments Table */}
              <div className="lg:col-span-7">
                <ActiveShipmentsTable />
              </div>

              {/* Right Column: Timeline */}
              <div className="lg:col-span-3">
                <ShipmentTimeline />
              </div>
            </div>

            {/* Bottom Analytics */}
            <ShipmentAnalyticsCards />

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
