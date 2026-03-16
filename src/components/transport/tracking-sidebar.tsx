"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Thermometer, Lock, Truck, Navigation, AlertCircle, ChevronRight, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

interface TrackingSidebarProps {
  vehicles: any[]
  alerts: any[]
}

export function TrackingSidebar({ vehicles, alerts }: TrackingSidebarProps) {
  const selectedVehicle = vehicles[0] // Default to first for overview
  const criticalAlerts = alerts.filter(a => a.severity === 'Critical')

  return (
    <div className="flex flex-col h-full">
      {/* Section 1: Vehicle Details */}
      <div className="p-6 border-b border-white/5 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-headline font-bold text-white uppercase tracking-[0.2em]">Vehicle Details - {selectedVehicle?.licensePlate || "CG-104"}</h2>
          <Activity className="w-4 h-4 text-cyan-400" />
        </div>

        <div className="space-y-4">
          <DataField label="Vehicle ID" value={selectedVehicle?.id || "CG-104"} color="text-cyan-400" />
          <DataField label="Driver" value="Sarah J. Chen" />
          <DataField label="Status" value={selectedVehicle?.movementStatus || "IN TRANSIT"} color="text-emerald-400" />
          <DataField label="Current Speed" value="88 km/h" />
          
          <div className="pt-2 space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Thermometer className="w-3 h-3" />
                  Temp Sensor
                </div>
                <div className="flex items-center gap-2 text-white">
                  24°C / 4°C <span className="text-emerald-400">(STABLE | <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block mb-0.5" />)</span>
                </div>
              </div>
              <Progress value={85} className="h-1 bg-white/5" />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="w-3 h-3" />
                  Tamper Sensor
                </div>
                <div className="flex items-center gap-2 text-emerald-400">
                  SECURE (<span className="w-1 h-1 rounded-full bg-emerald-400 inline-block mb-0.5" /> No Alert)
                </div>
              </div>
            </div>
          </div>

          <DataField label="Destination" value="CHICAGO (ETA 16:30)" />
          <DataField label="Next Checkpoint" value="Memphis (H 4h)" />
        </div>
      </div>

      {/* Section 2: Fleet Status */}
      <div className="p-6 border-b border-white/5 bg-white/2">
        <h2 className="text-xs font-headline font-bold text-white uppercase tracking-[0.2em] mb-6">Fleet Status</h2>
        <div className="grid grid-cols-1 gap-4">
          <StatRow label="Active Vehicles" value={vehicles.length || "112"} />
          <StatRow label="Alerts" value={alerts.length || "3"} color="text-destructive" />
          <StatRow label="Critical Deviations" value={criticalAlerts.length || "2"} color="text-destructive" />
        </div>
      </div>

      {/* Section 3: Active Vehicles List */}
      <div className="flex-1 p-0 overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-white/5 bg-[#050b14]/50">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase text-muted-foreground">
            <span>Active Vehicle</span>
            <span>ETA</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-white/5">
          {vehicles.map((v, i) => (
            <button key={v.id || i} className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-all text-left group">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-150 transition-transform" />
                <span className="text-[10px] font-bold text-white uppercase tracking-tighter">[{v.id?.substring(0, 6) || "CG-104"} | {v.locationDescription || "HOUSTON"}]</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400/80">{i === 1 ? "26h 4h" : "12h 45n"}</span>
            </button>
          ))}
          {(!vehicles || vehicles.length === 0) && (
            <div className="p-12 text-center text-muted-foreground text-[10px] uppercase font-bold tracking-widest">
              Grid Empty
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function DataField({ label, value, color }: { label: string, value: string, color?: string }) {
  return (
    <div className="flex items-center justify-between text-[10px] font-bold uppercase">
      <span className="text-muted-foreground tracking-widest">{label}:</span>
      <span className={cn("text-white", color)}>{value}</span>
    </div>
  )
}

function StatRow({ label, value, color }: { label: string, value: string | number, color?: string }) {
  return (
    <div className="flex items-center justify-between text-[10px] font-bold uppercase">
      <span className="text-muted-foreground">{label}:</span>
      <span className={cn("text-white text-base font-headline", color)}>{value}</span>
    </div>
  )
}
