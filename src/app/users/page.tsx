import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { TopBar } from "@/components/dashboard/top-bar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { UserManagementTable } from "@/components/users/user-management-table"
import { UserStatusSummary } from "@/components/users/user-status-summary"
import { RoleDistributionChart } from "@/components/users/role-distribution-chart"
import { AccessPermissionsPanel } from "@/components/users/access-permissions-panel"
import { UserSummaryCards } from "@/components/users/user-summary-cards"
import { Button } from "@/components/ui/button"
import { PlusCircle, UserMinus, Key } from "lucide-react"

export default function UserManagementPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto">
          <TopBar />
          <main className="flex-1 p-6 space-y-6">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-headline font-bold tracking-tight">User Management</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">October 14, 2024 | 14:40 GMT</p>
              </div>
            </header>

            {/* Row 1: Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button className="h-12 px-6 bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30 font-headline font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(46,222,255,0.1)] gap-3">
                <PlusCircle className="w-5 h-5" />
                Create User
              </Button>
              <Button variant="outline" className="h-12 px-6 bg-destructive/10 text-destructive border-destructive/40 hover:bg-destructive/20 font-headline font-bold uppercase tracking-wider gap-3">
                <UserMinus className="w-5 h-5" />
                Deactivate User
              </Button>
              <Button variant="outline" className="h-12 px-6 bg-orange-400/10 text-orange-400 border-orange-400/40 hover:bg-orange-400/20 font-headline font-bold uppercase tracking-wider gap-3">
                <Key className="w-5 h-5" />
                Reset Password
              </Button>
            </div>

            {/* Summary Analytics Cards */}
            <UserSummaryCards />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: User Table */}
              <div className="lg:col-span-8">
                <UserManagementTable />
              </div>

              {/* Right Column: Charts */}
              <div className="lg:col-span-4 space-y-6">
                <UserStatusSummary />
                <RoleDistributionChart />
              </div>
            </div>

            {/* Bottom Row: Permissions */}
            <AccessPermissionsPanel />

            <footer className="pt-8 pb-4 text-center border-t border-white/5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                &copy; 2024 ChemGuard AI Enterprise Security System | IAM Portal v3.1.2
              </p>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
