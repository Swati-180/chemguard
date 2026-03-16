"use client"

import * as React from "react"
import { MapPin, Navigation, AlertTriangle, Satellite } from "lucide-react"
import { cn } from "@/lib/utils"

interface LiveTrackingMapProps {
  vehicles: any[]
  shipments: any[]
  alerts: any[]
}

export function LiveTrackingMap({ vehicles, shipments, alerts }: LiveTrackingMapProps) {
  // Filter for active route deviations
  const deviations = alerts.filter(a => a.type === "Route Deviation" || a.type === "Geo-fence Breach")

  return (
    <div className="w-full h-full relative p-8">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* World Map SVG */}
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 1000 500" className="w-full max-h-full fill-white/10 opacity-20 pointer-events-none transition-opacity duration-1000">
          <path d="M150,150 Q200,100 250,150 T350,150 T450,200 T550,180 T650,220 T750,150 T850,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="200" cy="150" r="40" />
          <circle cx="450" cy="200" r="60" />
          <circle cx="700" cy="150" r="50" />
          <circle cx="300" cy="300" r="30" />
          <circle cx="800" cy="350" r="45" />
        </svg>

        {/* Global Asset Routes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
          <defs>
            <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Planned Routes (Neon Cyan) */}
          <path d="M 150 350 Q 250 250 400 300 T 650 200" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" filter="url(#mapGlow)" strokeDasharray="15,5" className="opacity-40" />
          <path d="M 450 200 Q 550 150 700 300 T 850 350" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="15,5" className="opacity-40" />
          
          {/* Active Deviation Warning (Neon Red) */}
          <path d="M 400 300 Q 420 280 480 320" fill="none" stroke="hsl(var(--destructive))" strokeWidth="3" filter="url(#mapGlow)" className="animate-pulse" />
        </svg>

        {/* Dynamic Asset Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Mock Label: Houston to Chicago */}
          <AssetLabel 
            top="65%" 
            left="12%" 
            id="CG-104" 
            origin="HOUSTON" 
            dest="CHICAGO" 
            eta="12h 45m" 
            status="active"
          />

          {/* Mock Label: Rotterdam Anomaly */}
          <AssetLabel 
            top="35%" 
            left="42%" 
            id="CG-208" 
            origin="BERLIN" 
            dest="ROTTERDAM" 
            eta="18:30" 
            status="warning"
            alert="DEVIATION DETECTED (5.2km Off Route)"
          />

          {/* Mock Label: Singapore */}
          <AssetLabel 
            top="68%" 
            left="72%" 
            id="CG-315" 
            origin="SINGAPORE" 
            dest="JOHOR" 
            eta="4h 15m" 
            status="active"
          />

          {/* Vehicle Node Houston */}
          <VehicleMarker top="68%" left="15%" status="active" />
          
          {/* Vehicle Node Berlin (Deviation) */}
          <VehicleMarker top="38%" left="48%" status="alert" />

          {/* Vehicle Node Singapore */}
          <VehicleMarker top="75%" left="78%" status="active" />
        </div>
      </div>

      {/* Floating Tactical Overlay */}
      <div className="absolute top-6 left-6 flex flex-col gap-4 pointer-events-none">
        <div className="p-4 rounded-xl bg-black/40 border border-white/5 backdrop-blur-md">
          <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-3 border-b border-white/5 pb-2">Active SAT Relays</p>
          <div className="space-y-2">
            {[
              { name: "GALILEO-9", status: "Active", strength: "98%" },
              { name: "GPS-BLOCK-III", status: "Active", strength: "94%" },
              { name: "COSMOS-Z", status: "Syncing", strength: "42%" },
            ].map(sat => (
              <div key={sat.name} className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-2">
                  <Satellite className={cn("w-3 h-3", sat.status === 'Active' ? 'text-emerald-400' : 'text-amber-400')} />
                  <span className="text-[9px] font-bold text-white uppercase">{sat.name}</span>
                </div>
                <span className="text-[9px] font-mono text-muted-foreground">{sat.strength}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function VehicleMarker({ top, left, status }: { top: string, left: string, status: 'active' | 'alert' }) {
  return (
    <div className="absolute transition-all duration-1000" style={{ top, left }}>
      <div className="relative">
        <div className={cn(
          "absolute -inset-3 rounded-full animate-ping opacity-40",
          status === 'alert' ? 'bg-destructive' : 'bg-cyan-400'
        )} />
        <div className={cn(
          "relative z-10 w-4 h-4 rounded-md border-2 border-background flex items-center justify-center shadow-lg",
          status === 'alert' ? 'bg-destructive text-white' : 'bg-cyan-400 text-background'
        )}>
          {status === 'alert' ? <AlertTriangle className="w-2.5 h-2.5" /> : <Navigation className="w-2.5 h-2.5 rotate-45 fill-current" />}
        </div>
      </div>
    </div>
  )
}

function AssetLabel({ top, left, id, origin, dest, eta, status, alert }: any) {
  return (
    <div className="absolute pointer-events-auto" style={{ top, left }}>
      <div className={cn(
        "px-3 py-2 rounded-lg border backdrop-blur-md transition-all hover:scale-105 cursor-default min-w-[140px]",
        status === 'warning' ? 'bg-destructive/10 border-destructive/30' : 'bg-black/60 border-white/10'
      )}>
        {alert && (
          <div className="flex items-center gap-1.5 text-[8px] font-bold text-destructive uppercase mb-1.5 animate-pulse">
            <AlertTriangle className="w-2.5 h-2.5" />
            [ALERT] {id}: {alert}
          </div>
        )}
        <div className="flex items-center justify-between gap-4 mb-1">
          <span className={cn("text-[9px] font-bold uppercase", status === 'warning' ? 'text-destructive' : 'text-cyan-400')}>[{id} | {origin}]</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-[8px] font-bold text-white uppercase tracking-tighter">[{dest} | ETA: {eta}]</span>
        </div>
      </div>
    </div>
  )
}
