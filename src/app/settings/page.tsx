
import { DashboardSidebar } from "@/components/dashboard/sidebar-nav"
import { TopBar } from "@/components/dashboard/top-bar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { SystemOverviewCards } from "@/components/settings/system-overview-cards"
import { HardwareIntegration } from "@/components/settings/hardware-integration"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { ApiConfiguration } from "@/components/settings/api-configuration"
import { SystemLogsViewer } from "@/components/settings/system-logs-viewer"

export default function SettingsPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <DashboardSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto">
          <TopBar />
          <main className="flex-1 p-6 space-y-6">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl font-headline font-bold tracking-tight text-primary">System Settings</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-[0.2em]">
                   Advanced System Configuration and Logs Viewer | <span className="text-white/60">October 14, 2024 | 14:42 GMT</span>
                </p>
              </div>
            </header>

            {/* Row 1: Quick Stats */}
            <SystemOverviewCards />

            {/* Row 2: Main Configuration Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4">
                <HardwareIntegration />
              </div>
              <div className="lg:col-span-4">
                <NotificationSettings />
              </div>
              <div className="lg:col-span-4">
                <ApiConfiguration />
              </div>
            </div>

            {/* Row 3: Logs Viewer */}
            <SystemLogsViewer />

            <footer className="pt-8 pb-4 text-center border-t border-white/5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                &copy; 2024 ChemGuard AI Enterprise Security System | Core Engine v8.4.0
              </p>
            </footer>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
