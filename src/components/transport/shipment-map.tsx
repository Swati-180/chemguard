"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MapPin, Globe, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function LiveShipmentMap() {
  return (
    <Card className="glass-card bg-white/[0.02] border-white/5 overflow-hidden group h-full">
      <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-orange-400 animate-spin-slow" />
          <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Tactical Logistics Deployment Map</CardTitle>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Live Sat Link</span>
          </div>
          <Maximize2 className="w-4 h-4 text-muted-foreground/50 cursor-pointer hover:text-white" />
        </div>
      </CardHeader>
      <CardContent className="p-0 relative h-[500px] bg-[#0a0f18] overflow-hidden">
        {/* World Map Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 1000 500" className="w-full h-full fill-white">
            <path d="M150,150 Q200,100 250,150 T350,150 T450,200 T550,180 T650,220 T750,150 T850,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="200" cy="150" r="40" />
            <circle cx="450" cy="200" r="60" />
            <circle cx="700" cy="150" r="50" />
            <circle cx="300" cy="300" r="30" />
          </svg>
        </div>

        {/* Glowing Tactical Routes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="routeGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Main Corridor 1 */}
          <path d="M 100 300 Q 250 250 400 350 T 700 200" fill="none" stroke="rgba(249,115,22,0.4)" strokeWidth="2" filter="url(#routeGlow)" strokeDasharray="10,5" className="animate-pulse" />
          {/* Main Corridor 2 */}
          <path d="M 50 150 L 200 100 L 450 180 L 750 120" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="1.5" strokeDasharray="5,5" />
        </svg>

        {/* Live Asset Markers */}
        <div className="absolute top-[30%] left-[20%] group/pin cursor-pointer">
          <div className="relative">
            <div className="absolute -inset-2 bg-orange-500/20 rounded-full animate-ping" />
            <MapPin className="w-6 h-6 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-black/90 border border-white/10 p-2 rounded text-[9px] opacity-0 group-hover/pin:opacity-100 transition-opacity z-50">
              <p className="font-bold text-white uppercase">VEH-CGV-102</p>
              <p className="text-orange-400 font-mono">STATUS: IN TRANSIT</p>
            </div>
          </div>
        </div>

        <div className="absolute top-[60%] left-[45%] group/pin cursor-pointer">
          <div className="relative">
            <div className="absolute -inset-2 bg-cyan-500/20 rounded-full animate-ping" />
            <MapPin className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-black/90 border border-white/10 p-2 rounded text-[9px] opacity-0 group-hover/pin:opacity-100 transition-opacity z-50">
              <p className="font-bold text-white uppercase">VEH-CGV-215</p>
              <p className="text-cyan-400 font-mono">STATUS: LOADING</p>
            </div>
          </div>
        </div>

        {/* Tactical Legend */}
        <div className="absolute bottom-4 left-4 p-3 bg-black/60 border border-white/5 rounded-xl backdrop-blur-md space-y-2">
          <p className="text-[10px] font-bold text-white uppercase tracking-widest border-b border-white/5 pb-1">Asset Status</p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.8)]" /><span className="text-[8px] font-bold text-muted-foreground uppercase">High-Risk Transit</span></div>
            <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /><span className="text-[8px] font-bold text-muted-foreground uppercase">Standard Depot</span></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
