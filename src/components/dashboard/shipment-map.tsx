"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MapPin, Globe } from "lucide-react"

export function ShipmentMap() {
  return (
    <Card className="glass-card h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-headline font-semibold text-primary uppercase tracking-widest">Global Shipment Tracking</CardTitle>
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded-md">
          <Globe className="w-3 h-3 text-accent animate-spin-slow" />
          Live Monitoring Active
        </div>
      </CardHeader>
      <CardContent className="relative h-[400px] overflow-hidden">
        {/* Simple stylized map representation */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg viewBox="0 0 800 400" className="w-full h-full">
            <path d="M150,150 Q250,50 350,150 T550,150" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="5,5" />
            <path d="M200,200 Q400,100 600,200" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeDasharray="1000" strokeDashoffset="1000">
               <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="3s" repeatCount="indefinite" />
            </path>
            <circle cx="200" cy="200" r="4" fill="hsl(var(--accent))" className="animate-pulse" />
            <circle cx="600" cy="200" r="4" fill="hsl(var(--accent))" className="animate-pulse" />
            <circle cx="150" cy="150" r="3" fill="hsl(var(--primary))" />
            <circle cx="550" cy="150" r="3" fill="hsl(var(--primary))" />
          </svg>
        </div>

        {/* Floating status markers */}
        <div className="absolute top-1/4 left-1/3 group cursor-pointer">
          <div className="relative">
             <div className="absolute -inset-1 bg-primary/20 rounded-full animate-ping"></div>
             <MapPin className="w-6 h-6 text-primary neon-glow-cyan" />
             <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 bg-card border border-white/10 p-2 rounded-lg text-[10px] hidden group-hover:block z-10 backdrop-blur-xl">
               <p className="font-bold text-primary">BATCH #4920</p>
               <p className="text-muted-foreground">En route: Rotterdam</p>
               <p className="text-accent">ETA: 4.2h</p>
             </div>
          </div>
        </div>

        <div className="absolute bottom-1/3 right-1/4 group cursor-pointer">
          <div className="relative">
             <div className="absolute -inset-1 bg-accent/20 rounded-full animate-ping"></div>
             <MapPin className="w-6 h-6 text-accent" />
             <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 bg-card border border-white/10 p-2 rounded-lg text-[10px] hidden group-hover:block z-10 backdrop-blur-xl">
               <p className="font-bold text-accent">SHIPMENT #SK-92</p>
               <p className="text-muted-foreground">Stationary: Singapore</p>
               <p className="text-primary">Status: Scanning</p>
             </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 grid grid-cols-2 gap-2 text-[10px]">
           <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-1.5 rounded-md">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
             <span>SEA ROUTES</span>
           </div>
           <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-1.5 rounded-md">
             <div className="w-2 h-2 rounded-full bg-accent"></div>
             <span>AIR FREIGHT</span>
           </div>
        </div>
      </CardContent>
    </Card>
  )
}
