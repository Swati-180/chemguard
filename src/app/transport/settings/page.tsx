
"use client"

import * as React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { TransportSidebar } from "@/components/transport/transport-sidebar"
import { TransportTopBar } from "@/components/transport/transport-top-bar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { 
  Settings as SettingsIcon, 
  Truck, 
  Users, 
  Cpu, 
  Bell, 
  Zap, 
  Link as LinkIcon,
  Search,
  Plus,
  RefreshCw,
  Database,
  ShieldCheck,
  AlertTriangle,
  Loader2
} from "lucide-react"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, limit, doc, setDoc } from "firebase/firestore"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

/**
 * Transport Settings Page - Strategic configuration and core parameter terminal.
 */
export default function TransportSettingsPage() {
  const db = useFirestore()

  // Real-time data listeners
  const vehiclesQuery = useMemoFirebase(() => query(collection(db, "vehicles"), limit(5)), [db])
  const driversQuery = useMemoFirebase(() => query(collection(db, "drivers"), limit(5)), [db])
  const sensorsQuery = useMemoFirebase(() => query(collection(db, "iot_devices"), limit(5)), [db])

  const { data: vehicles, isLoading: loadingVehicles } = useCollection(vehiclesQuery)
  const { data: drivers, isLoading: loadingDrivers } = useCollection(driversQuery)
  const { data: sensors, isLoading: loadingSensors } = useCollection(sensorsQuery)

  const handleSeedSettings = async () => {
    // Seed drivers if empty
    const demoDrivers = [
      { id: "dr_001", firstName: "Sarah", lastName: "Chen", licenseNumber: "CDL-A #4410", status: "Active", route: "Houston" },
      { id: "dr_002", firstName: "Amelia", lastName: "Reed", licenseNumber: "CDL-A #2928", status: "Active", route: "Rotterdam" },
      { id: "dr_003", firstName: "Kenji", lastName: "Tanaka", licenseNumber: "CDL-A #8812", status: "On Duty", route: "Singapore" },
    ]

    for (const dr of demoDrivers) {
      await setDoc(doc(db, "drivers", dr.id), dr, { merge: true })
    }

    toast({
      title: "System Config Synced",
      description: "Personnel and vehicle registries updated via secure link.",
    })
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-[#050b14] text-white">
        <TransportSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-y-auto bg-transparent relative custom-scrollbar">
          {/* Futuristic Background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <TransportTopBar />
          
          <main className="flex-1 p-6 space-y-6 relative z-10">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
              <div className="space-y-1">
                <h1 className="text-3xl font-headline font-bold tracking-tight uppercase flex items-center gap-3">
                  Configuration & Settings <span className="text-muted-foreground font-normal text-lg">| ChemGuard AI Portal</span>
                </h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold">System Setup and Core Parameters</p>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={handleSeedSettings} variant="outline" className="h-10 border-white/10 bg-white/5 hover:bg-white/10 text-xs gap-2">
                  <Database className="w-3.5 h-3.5" />
                  Sync Registries
                </Button>
                <div className="bg-white/5 px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400">Online | Secure</span>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* 1. Vehicle Management */}
              <Card className="glass-card border-white/5 bg-white/[0.02] overflow-hidden flex flex-col">
                <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      <Truck className="w-4 h-4 text-cyan-400" />
                    </div>
                    <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Vehicle Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">Active Fleet</span>
                    <span className="text-xs font-bold text-white uppercase tracking-tighter">Vehicles: 104 | Active: 98 | Maint: 6</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">Vehicle List</span>
                      <button className="text-[9px] font-bold text-cyan-400 uppercase underline decoration-cyan-500/30">Search ID</button>
                    </div>
                    <div className="rounded-lg border border-white/5 bg-black/20 overflow-hidden">
                      <Table>
                        <TableBody>
                          {vehicles?.map(v => (
                            <TableRow key={v.id} className="border-white/5 hover:bg-white/5">
                              <TableCell className="py-2 text-[10px] font-mono font-bold text-cyan-400 uppercase">{v.licensePlate || v.id.substring(0, 7)}</TableCell>
                              <TableCell className="py-2 text-[10px] text-muted-foreground">Hazmat A</TableCell>
                              <TableCell className="py-2 text-[10px] text-white">S. Chen</TableCell>
                              <TableCell className="py-2 text-right">
                                <span className="text-[9px] font-bold text-emerald-400 uppercase">Active</span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button variant="outline" className="h-9 border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[9px] font-bold uppercase tracking-widest gap-2">
                      <Plus className="w-3 h-3" /> Add Vehicle
                    </Button>
                    <Button variant="outline" className="h-9 border-white/10 bg-white/5 text-white text-[9px] font-bold uppercase tracking-widest">
                      Manage Maintenance
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 2. Driver Management */}
              <Card className="glass-card border-white/5 bg-white/[0.02] overflow-hidden flex flex-col">
                <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      <Users className="w-4 h-4 text-orange-400" />
                    </div>
                    <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Driver Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">Active Drivers</span>
                    <span className="text-xs font-bold text-white uppercase tracking-tighter">Drivers: 72 | Available: 18</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">Driver Records</span>
                      <button className="text-[9px] font-bold text-cyan-400 uppercase underline decoration-cyan-500/30">List Drivers</button>
                    </div>
                    <div className="rounded-lg border border-white/5 bg-black/20 overflow-hidden">
                      <Table>
                        <TableBody>
                          {drivers?.map(d => (
                            <TableRow key={d.id} className="border-white/5 hover:bg-white/5">
                              <TableCell className="py-2 text-[10px] font-bold text-white">{d.firstName} {d.lastName}</TableCell>
                              <TableCell className="py-2 text-[9px] font-mono text-muted-foreground uppercase">{d.licenseNumber}</TableCell>
                              <TableCell className="py-2 text-[10px] text-cyan-400 uppercase">{d.route}</TableCell>
                              <TableCell className="py-2 text-right">
                                <span className="text-[9px] font-bold text-emerald-400 uppercase">{d.status}</span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button variant="outline" className="h-9 border-orange-500/30 bg-orange-500/5 text-orange-400 text-[9px] font-bold uppercase tracking-widest gap-2">
                      Assign Driver
                    </Button>
                    <Button variant="outline" className="h-9 border-white/10 bg-white/5 text-white text-[9px] font-bold uppercase tracking-widest">
                      Training Logs
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 3. Sensor Configuration */}
              <Card className="glass-card border-white/5 bg-white/[0.02] overflow-hidden flex flex-col">
                <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <Cpu className="w-4 h-4 text-emerald-400" />
                    </div>
                    <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Sensor Configuration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/5">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase">IoT Sensor Status</span>
                    <span className="text-xs font-bold text-white uppercase tracking-tighter">Fleet CGT-104</span>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-black/20 overflow-hidden">
                    <Table>
                      <TableHeader className="bg-white/5">
                        <TableRow className="border-none hover:bg-transparent">
                          <TableHead className="h-8 text-[8px] font-bold uppercase py-0">Sensor ID</TableHead>
                          <TableHead className="h-8 text-[8px] font-bold uppercase py-0">Type</TableHead>
                          <TableHead className="h-8 text-[8px] font-bold uppercase py-0">Location</TableHead>
                          <TableHead className="h-8 text-[8px] font-bold uppercase py-0 text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sensors?.map(s => (
                          <TableRow key={s.id} className="border-white/5 hover:bg-white/5 group">
                            <TableCell className="py-2 text-[9px] font-mono font-bold text-white uppercase">{s.serialNumber || s.id.substring(0, 8)}</TableCell>
                            <TableCell className="py-2 text-[9px] text-muted-foreground">{s.type}</TableCell>
                            <TableCell className="py-2 text-[9px] text-white">Tank A</TableCell>
                            <TableCell className="py-2 text-right">
                              <button className="text-[8px] font-bold text-cyan-400 uppercase hover:underline">Recalibrate</button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button variant="outline" className="h-9 border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-[9px] font-bold uppercase tracking-widest">
                      Configure Sensors
                    </Button>
                    <Button variant="outline" className="h-9 border-white/10 bg-white/5 text-white text-[9px] font-bold uppercase tracking-widest">
                      Fleet Overview
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 4. Alert Thresholds */}
              <Card className="glass-card border-white/5 bg-white/[0.02] overflow-hidden flex flex-col">
                <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-destructive/10 border border-destructive/20">
                      <Zap className="w-4 h-4 text-destructive" />
                    </div>
                    <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Alert Thresholds</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Hazmat Type</label>
                        <Select defaultValue="corrosives">
                          <SelectTrigger className="h-9 bg-black/20 border-white/10 text-[10px] font-bold uppercase">
                            <SelectValue placeholder="Select Type" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#050b14] border-white/10">
                            <SelectItem value="corrosives">Corrosives</SelectItem>
                            <SelectItem value="flammables">Flammables</SelectItem>
                            <SelectItem value="toxics">Toxics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Primary Chemical</label>
                        <Select defaultValue="sulfuric">
                          <SelectTrigger className="h-9 bg-black/20 border-white/10 text-[10px] font-bold uppercase">
                            <SelectValue placeholder="Select Chemical" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#050b14] border-white/10">
                            <SelectItem value="sulfuric">Sulphuric Acid</SelectItem>
                            <SelectItem value="ammonia">Ammonia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Temp Threshold (°C)</label>
                        <span className="text-[10px] font-mono text-cyan-400">Current: -5 | <span className="text-destructive">Range: -20 to 5</span></span>
                      </div>
                      <Slider defaultValue={[20]} max={100} step={1} className="py-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Hazmat Temp Max (°C)</label>
                        <div className="h-9 bg-black/20 border border-white/10 rounded-md flex items-center px-3 text-xs font-mono">5.0</div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Pressure (bar)</label>
                        <div className="h-9 bg-black/20 border border-white/10 rounded-md flex items-center px-3 justify-between">
                          <span className="text-xs font-mono text-white">Current: 2.1</span>
                          <span className="text-[9px] text-muted-foreground uppercase">Max: 2.5</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button className="h-10 bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/30 text-[10px] font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                      Set Thresholds
                    </Button>
                    <Button variant="outline" className="h-10 border-white/10 bg-white/5 text-white text-[10px] font-bold uppercase tracking-widest">
                      Alert History
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 5. Notification Settings */}
              <Card className="glass-card border-white/5 bg-white/[0.02] overflow-hidden flex flex-col">
                <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                      <Bell className="w-4 h-4 text-primary" />
                    </div>
                    <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Notification Settings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <p className="text-[10px] font-bold text-white uppercase tracking-widest">Notification Hub</p>
                      <button className="text-[9px] font-bold text-cyan-400 uppercase">Configure Alerts</button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8 p-4 bg-white/2 rounded-xl border border-white/5">
                      <div className="space-y-3">
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest border-b border-white/5 pb-1">Alert</p>
                        <div className="flex items-center gap-2">
                          <Checkbox id="temp" className="border-cyan-500/50" defaultChecked />
                          <label htmlFor="temp" className="text-[10px] font-bold text-white uppercase cursor-pointer">Critical Temp</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="route" className="border-cyan-500/50" defaultChecked />
                          <label htmlFor="route" className="text-[10px] font-bold text-white uppercase cursor-pointer">Route Deviation</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="leak" className="border-cyan-500/50" defaultChecked />
                          <label htmlFor="leak" className="text-[10px] font-bold text-white uppercase cursor-pointer">Hazmat Leak</label>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest border-b border-white/5 pb-1">Destination</p>
                        <div className="flex items-center gap-2">
                          <Checkbox id="email" className="border-emerald-500/50" defaultChecked />
                          <label htmlFor="email" className="text-[10px] font-bold text-white uppercase cursor-pointer">Email</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="push" className="border-emerald-500/50" defaultChecked />
                          <label htmlFor="push" className="text-[10px] font-bold text-white uppercase cursor-pointer">Push</label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox id="console" className="border-emerald-500/50" defaultChecked />
                          <label htmlFor="console" className="text-[10px] font-bold text-white uppercase cursor-pointer">Console</label>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-muted-foreground px-1">
                        <span>Recipients:</span>
                        <button className="text-cyan-400 hover:underline">Manage User List</button>
                      </div>
                      <div className="p-3 bg-black/20 border border-white/5 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="text-[10px] font-bold text-white/80">Admin SOC, Fleet Mgr + 4 others</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button className="h-10 bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30 text-[10px] font-bold uppercase tracking-widest">
                      Update Settings
                    </Button>
                    <Button variant="outline" className="h-10 border-white/10 bg-white/5 text-white text-[10px] font-bold uppercase tracking-widest">
                      Email Config
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 6. API Integration */}
              <Card className="glass-card border-white/5 bg-white/[0.02] overflow-hidden flex flex-col">
                <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20">
                      <LinkIcon className="w-4 h-4 text-teal-400" />
                    </div>
                    <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">API Integration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <p className="text-[10px] font-bold text-white uppercase tracking-widest">Third-Party Integrations</p>
                      <button className="text-[9px] font-bold text-cyan-400 uppercase">Connected Platforms</button>
                    </div>
                    
                    <div className="space-y-2">
                      {[
                        { name: "ChemLogistics Platform", status: "Connected" },
                        { name: "FleetCare GPS Tracking", status: "Active" },
                        { name: "Global Environmental API", status: "Active" },
                        { name: "Satellite Relay (GALILEO)", status: "Connected" },
                      ].map(int => (
                        <div key={int.name} className="flex items-center justify-between p-3 bg-white/2 border border-white/5 rounded-lg group hover:border-cyan-500/30 transition-all">
                          <span className="text-[10px] font-bold text-white/80">{int.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-widest">{int.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-muted-foreground px-1">
                        <span>API Keys:</span>
                        <button className="text-cyan-400 hover:underline">Manage Keys</button>
                      </div>
                      <div className="p-3 bg-black/20 border border-white/10 border-dashed rounded-lg text-center cursor-pointer hover:bg-white/5 transition-all">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">+ Generate New Access Token</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button className="h-10 bg-teal-500/20 text-teal-400 border border-teal-500/40 hover:bg-teal-500/30 text-[10px] font-bold uppercase tracking-widest">
                      New Integration
                    </Button>
                    <Button variant="outline" className="h-10 border-white/10 bg-white/5 text-white text-[10px] font-bold uppercase tracking-widest">
                      API Docs
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>
          </main>

          <footer className="p-6 border-t border-white/5 text-center bg-black/20">
            <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-bold">
              ChemGuard AI Logistics Security Terminal | Settings Node v4.2.1-ST | SAT LINK: [LOCKED]
            </p>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
