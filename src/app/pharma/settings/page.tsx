
"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { PharmaSidebar } from "@/components/pharma/pharma-sidebar"
import { PharmaTopBar } from "@/components/pharma/pharma-top-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  User, 
  Lock, 
  Building2, 
  Bell, 
  Thermometer, 
  Shield, 
  Video, 
  Settings as SettingsIcon,
  ChevronDown,
  Search,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export default function PharmaSettingsPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#0a0f18]">
        <PharmaSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent relative">
          {/* Subtle circuit background lines could be added here as an SVG overlay */}
          <PharmaTopBar />
          
          <main className="flex-1 p-8 space-y-8 max-w-[1600px] mx-auto w-full">
            <header className="space-y-1">
              <h1 className="text-3xl font-headline font-bold text-[#2eeeff] tracking-tight">Pharma Portal Settings</h1>
              <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-medium">Configuration and System Management</p>
            </header>

            {/* Row 1: Profile, Lab, and Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* User Profile Card */}
              <Card className="lg:col-span-4 glass-card bg-white/5 border-white/10 overflow-hidden relative group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-cyan-500/20 rounded-full blur-sm" />
                      <Avatar className="h-20 w-20 border-2 border-cyan-500/30">
                        <AvatarImage src="https://picsum.photos/seed/amelia/80/80" />
                        <AvatarFallback>AR</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-headline font-bold text-white">Amelia Reed, Ph.D.</h3>
                      <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Lab Manager</p>
                      <div className="pt-2 space-y-0.5">
                        <p className="text-[10px] text-muted-foreground"><span className="text-white/40">email:</span> amelia.reed@chemguard.ai</p>
                        <p className="text-[10px] text-muted-foreground"><span className="text-white/40">phone:</span> +1 (555) 123-4567</p>
                        <p className="text-[10px] text-muted-foreground"><span className="text-white/40">Department:</span> Analytical Chemistry</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button variant="outline" className="flex-1 bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-[10px] font-bold uppercase tracking-widest h-9">
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="flex-1 bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 text-[10px] font-bold uppercase tracking-widest h-9">
                      Change Password
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Lab Details Card */}
              <Card className="lg:col-span-4 glass-card bg-white/5 border-white/10 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <span className="text-muted-foreground font-headline font-bold text-lg uppercase">Lab</span>
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-headline font-bold text-white uppercase tracking-wider leading-tight">ChemGuard AI Pharma Lab - Alpha</h3>
                      <p className="text-[10px] text-muted-foreground mt-1">Address: 1 Innovation Way, Seattle, WA 98109</p>
                      <div className="pt-3 space-y-0.5">
                        <p className="text-[10px] text-muted-foreground"><span className="text-white/40 uppercase font-bold tracking-tighter mr-1">Principal Investigator:</span> Elias Vance</p>
                        <p className="text-[10px] text-muted-foreground"><span className="text-white/40 uppercase font-bold tracking-tighter mr-1">State License:</span> #CL40105B</p>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-6 bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-[10px] font-bold uppercase tracking-[0.2em] h-10">
                    Update Lab Details
                  </Button>
                </CardContent>
              </Card>

              {/* Notification Settings Card */}
              <Card className="lg:col-span-4 glass-card bg-white/5 border-white/10 overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-headline font-bold text-white uppercase tracking-[0.2em]">Notification Settings</h3>
                    <div className="flex gap-3 text-[9px] font-bold uppercase tracking-widest">
                      <span className="text-cyan-400 border-b border-cyan-400 pb-0.5 cursor-pointer">Email</span>
                      <span className="text-muted-foreground hover:text-white cursor-pointer transition-colors">System</span>
                      <span className="text-muted-foreground hover:text-white cursor-pointer transition-colors">SMS</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { label: "Compliance alerts", active: true },
                      { label: "Inventory thresholds", active: true },
                      { label: "Hardware failure", active: false },
                      { label: "Hardware failure", active: true, label2: "Hardware failure" }, // Duplicate label as per reference
                      { label: "Intrusion alerts", active: false },
                      { label: "Security updates", active: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-white/70 uppercase tracking-tight">{item.label}</span>
                        <Switch 
                          checked={item.active} 
                          className="h-4 w-8 data-[state=checked]:bg-emerald-500" 
                        />
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-4 bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-[10px] font-bold uppercase tracking-[0.2em] h-10">
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Row 2: Hardware Integration Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                <div className="flex items-baseline gap-2">
                  <h2 className="text-lg font-headline font-bold text-white uppercase tracking-widest">Hardware Integration</h2>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Configure and connect your monitored devices</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Integration Sub-Grid */}
                <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Configure Temperature Sensors", count: "124 connected", icon: Thermometer, status: "All Green", alert: 3 },
                    { title: "Configure Tamper Sensors", count: "87 connected", icon: Shield, status: "All Green", alert: 0 },
                    { title: "Configure Camera Devices", count: "12 connected", icon: Video, status: null, alert: 0 },
                  ].map((config, i) => (
                    <Card key={i} className="glass-card bg-white/5 border-white/10 hover:border-cyan-500/30 transition-all cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <config.icon className="w-5 h-5 text-cyan-400" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-xs font-headline font-bold text-white uppercase tracking-wider">{config.title}</h4>
                            <p className="text-[9px] text-muted-foreground uppercase font-medium">{config.count}</p>
                          </div>
                        </div>
                        
                        <div className="mt-8 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {config.alert > 0 && (
                              <div className="px-2 py-0.5 bg-destructive/10 border border-destructive/30 rounded text-[7px] font-bold text-destructive uppercase tracking-tighter">
                                Icon Notification: {config.alert} Alerted
                              </div>
                            )}
                            {config.status && (
                              <div className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded text-[7px] font-bold text-emerald-400 uppercase tracking-tighter flex items-center gap-1">
                                Status Check: {config.status}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <SettingsIcon className="w-3.5 h-3.5 text-cyan-400/50 hover:text-cyan-400 transition-colors" />
                            <SettingsIcon className="w-3.5 h-3.5 text-cyan-400/50 hover:text-cyan-400 transition-colors" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Security Settings Sidebar Card */}
                <Card className="lg:col-span-3 glass-card bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <h3 className="text-xs font-headline font-bold text-white uppercase tracking-[0.2em] mb-4">Security Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight">Multi-Factor Authentication (MFA)</span>
                        <span className="text-[9px] text-emerald-400 font-bold uppercase">Enabled</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight">Password Policy</span>
                        <span className="text-[9px] text-emerald-400 font-bold uppercase">Complexity: High</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight">Session Timeout</span>
                        <span className="text-[9px] text-white font-bold uppercase">Duration: 15 minutes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight">Access Logs</span>
                        <button className="text-[9px] text-cyan-400 font-bold uppercase hover:underline">Link to View</button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-tight">Login History</span>
                        <button className="text-[9px] text-cyan-400 font-bold uppercase hover:underline">Link to View</button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-6 bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 text-[10px] font-bold uppercase tracking-[0.2em] h-10">
                      Security Configuration
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Row 3: System Logs Section */}
            <div className="space-y-6 pb-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-[#2eeeff] rounded-full" />
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-lg font-headline font-bold text-white uppercase tracking-widest">System Logs</h2>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Active audit trails for all system actions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground pointer-events-none" />
                    <select className="h-8 bg-white/5 border border-white/10 rounded px-3 pr-8 text-[10px] font-bold uppercase tracking-widest text-white/70 appearance-none focus:outline-none">
                      <option>Filter Option</option>
                    </select>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                    <Input 
                      placeholder="Search Logs" 
                      className="h-8 w-48 bg-white/5 border-white/10 pl-8 text-[10px] uppercase font-bold tracking-widest"
                    />
                  </div>
                </div>
              </div>

              <Card className="glass-card bg-white/5 border-white/10 overflow-hidden">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-emerald-500/10 border-b border-emerald-500/20">
                      <TableRow className="hover:bg-transparent border-none">
                        <TableHead className="text-[10px] font-bold uppercase tracking-widest py-4 text-emerald-400">Timestamp</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-widest py-4 text-emerald-400">User</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-widest py-4 text-emerald-400">Action</TableHead>
                        <TableHead className="text-[10px] font-bold uppercase tracking-widest py-4 text-emerald-400">IP Address</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { time: "2024-06-23 17:33:38", user: "Amelia Reed", action: "System Bot AI Critical Error", ip: "192.156.103", color: "white" },
                        { time: "2024-06-23 17:31:36", user: "Elias Vance", action: "Activor Resolution", ip: "192.155.133", color: "white" },
                        { time: "2024-06-23 17:36:34", user: "Kenjiro Tanaka", action: "Configure Management & Sensors", ip: "192.155.131", color: "white" },
                        { time: "2024-06-23 17:34:39", user: "Sarah Chen", action: "Intrusion alerts", ip: "192.155.133", color: "white" },
                        { time: "2024-06-23 07:04:36", user: "Lisa Gupta", action: "Update Resolution", ip: "192.155.283", color: "white" },
                        { time: "2024-06-23 19:34:36", user: <div className="px-2 py-0.5 bg-destructive/20 border border-destructive/40 rounded text-[7px] font-bold text-destructive uppercase tracking-widest inline-block">System Bod Alert</div>, action: "System Bot AI Critical Error", ip: "192.155.130", color: "white" },
                      ].map((log, i) => (
                        <TableRow key={i} className="border-white/5 hover:bg-white/5 transition-colors">
                          <TableCell className="py-3 text-[10px] font-mono text-muted-foreground">{log.time}</TableCell>
                          <TableCell className="py-3 text-[10px] font-bold text-white">{log.user}</TableCell>
                          <TableCell className="py-3 text-[10px] font-medium text-white/80 uppercase tracking-tight">{log.action}</TableCell>
                          <TableCell className="py-3 text-[10px] font-mono text-muted-foreground">{log.ip}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="flex items-center justify-between p-4 border-t border-white/5 bg-white/2">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Pagination at bottom</span>
                    <div className="flex items-center gap-1">
                      <button className="w-5 h-5 flex items-center justify-center text-[10px] font-bold text-muted-foreground hover:text-white">&lt;</button>
                      <span className="w-5 h-5 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-[10px] font-bold rounded">1</span>
                      <span className="w-5 h-5 flex items-center justify-center text-[10px] font-bold text-muted-foreground">2</span>
                      <span className="px-1 text-muted-foreground">...</span>
                      <span className="w-5 h-5 flex items-center justify-center text-[10px] font-bold text-muted-foreground">15</span>
                      <button className="w-5 h-5 flex items-center justify-center text-[10px] font-bold text-muted-foreground hover:text-white">&gt;</button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
