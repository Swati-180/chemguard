
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MapPin, Globe, AlertTriangle, Navigation } from "lucide-react"
import { cn } from "@/lib/utils"

export function MonitoringMap() {
  return (
    <Card className="glass-card h-full border-white/5 relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-white/5 border-b border-white/5">
        <div className="flex flex-col">
          <CardTitle className="text-sm font-headline font-semibold text-primary uppercase tracking-widest">Global Real-Time Shipment Tracking</CardTitle>
          <p className="text-[10px] text-muted-foreground mt-1">Satellite coverage: 100% | Active Sat: GALILEO-9</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground bg-background px-2 py-1 rounded-md border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Live Sync
          </div>
          <div className="flex gap-1">
            <button className="w-6 h-6 rounded border border-white/10 flex items-center justify-center text-xs hover:bg-white/5">+</button>
            <button className="w-6 h-6 rounded border border-white/10 flex items-center justify-center text-xs hover:bg-white/5">-</button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative h-[600px] bg-[#0a0f18]">
        {/* Stylized World Map SVG */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 1000 500" className="w-full h-full fill-white">
            <path d="M150,150 Q200,100 250,150 T350,150 T450,200 T550,180 T650,220 T750,150 T850,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
            {/* Minimalist landmass shapes */}
            <circle cx="200" cy="150" r="40" />
            <circle cx="450" cy="200" r="60" />
            <circle cx="700" cy="150" r="50" />
            <circle cx="300" cy="300" r="30" />
          </svg>
        </div>

        {/* Glowing Routes */}
        <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Main European Hubs */}
          <path d="M400,180 L480,160 L550,200 L580,250 L520,300" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="5,5" className="opacity-40" />
          <path d="M400,180 Q450,220 550,200" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeDasharray="10" className="opacity-60" />
          
          {/* Animated Vehicle Pulse */}
          <circle cx="480" cy="160" r="4" fill="hsl(var(--accent))">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="550" cy="200" r="4" fill="hsl(var(--accent))" />
        </svg>

        {/* Active Vehicle Markers */}
        <div className="absolute top-[32%] left-[48%] group cursor-pointer">
          <div className="relative">
             <div className="absolute -inset-2 bg-accent/20 rounded-full animate-ping" />
             <Navigation className="w-5 h-5 text-accent rotate-45" />
             <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-card border border-white/10 p-3 rounded-lg text-[10px] hidden group-hover:block z-50 shadow-2xl backdrop-blur-xl">
               <div className="flex items-center justify-between mb-2">
                 <span className="font-bold text-accent">CGV-102</span>
                 <span className="text-muted-foreground">IN TRANSIT</span>
               </div>
               <div className="space-y-1">
                 <p className="text-white">Shipment: #8902</p>
                 <p className="text-muted-foreground">Loc: 48.8566, 2.3522 (Paris)</p>
                 <p className="text-white font-mono">Speed: 88 km/h</p>
               </div>
             </div>
          </div>
        </div>

        <div className="absolute top-[40%] left-[55%] group cursor-pointer">
          <div className="relative">
             <div className="absolute -inset-2 bg-orange-400/20 rounded-full animate-ping" />
             <Navigation className="w-5 h-5 text-orange-400 rotate-90" />
             <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-card border border-white/10 p-3 rounded-lg text-[10px] hidden group-hover:block z-50 shadow-2xl backdrop-blur-xl">
               <div className="flex items-center justify-between mb-2">
                 <span className="font-bold text-orange-400">CGV-215</span>
                 <span className="text-muted-foreground">DELAYED</span>
               </div>
               <p className="text-white">Shipment: #7731</p>
               <p className="text-muted-foreground">Loc: 52.5200, 13.4050 (Berlin)</p>
             </div>
          </div>
        </div>

        <div className="absolute top-[50%] left-[58%] group cursor-pointer">
          <div className="relative">
             <div className="absolute -inset-3 bg-destructive/30 rounded-full animate-pulse" />
             <AlertTriangle className="w-6 h-6 text-destructive neon-glow-red" />
             <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-destructive/90 text-white p-3 rounded-lg text-[10px] hidden group-hover:block z-50 shadow-2xl backdrop-blur-xl">
               <p className="font-bold uppercase mb-1">Critical Anomaly</p>
               <p>Vehicle: CGV-098</p>
               <p>Issue: Sudden deceleration & Signal loss</p>
             </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 flex flex-col gap-2 p-3 bg-black/40 border border-white/5 rounded-lg backdrop-blur-md">
          <div className="flex items-center gap-2 text-[10px]">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-muted-foreground uppercase tracking-wider">Normal Operation</span>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <div className="w-2 h-2 rounded-full bg-orange-400" />
            <span className="text-muted-foreground uppercase tracking-wider">Delayed / Warning</span>
          </div>
          <div className="flex items-center gap-2 text-[10px]">
            <div className="w-2 h-2 rounded-full bg-destructive" />
            <span className="text-muted-foreground uppercase tracking-wider">Critical Risk</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
