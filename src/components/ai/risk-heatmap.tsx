
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import { cn } from "@/lib/utils"

export function AiRiskHeatmap() {
  return (
    <Card className="glass-card h-full overflow-hidden border-white/5 bg-white/5">
      <CardHeader className="py-4 border-b border-white/5 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Route Deviation Analysis Map</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="h-[350px] relative bg-[#0a0f18] p-0 flex items-center justify-center">
         {/* Simplified Stylized World Map SVG */}
         <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 1000 500" className="w-full h-full fill-white">
            <path d="M150,150 Q200,100 250,150 T350,150 T450,200 T550,180 T650,220 T750,150 T850,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="200" cy="150" r="40" />
            <circle cx="450" cy="200" r="60" />
            <circle cx="700" cy="150" r="50" />
            <circle cx="300" cy="300" r="30" />
          </svg>
        </div>

        {/* Deviation Route Line */}
        <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full pointer-events-none">
          <path d="M400,250 Q450,220 500,250 T600,230" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M400,250 Q430,280 500,290 T600,230" fill="none" stroke="hsl(var(--destructive))" strokeWidth="3" />
          <circle cx="500" cy="290" r="4" fill="hsl(var(--destructive))" />
        </svg>

        {/* Alert Popup Tooltip */}
        <div className="absolute top-[50%] left-[55%] bg-background/90 border border-white/10 p-3 rounded-lg backdrop-blur-md shadow-2xl z-10 w-48">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-white uppercase">Active Deviation: 120km</span>
            </div>
            <p className="text-[9px] text-muted-foreground uppercase">Affected Shipments: 3</p>
            <p className="text-[9px] text-destructive uppercase font-bold">Risk Contributor: Route divergence near Berlin.</p>
          </div>
        </div>

        {/* Markers */}
        <div className="absolute top-[48%] left-[40%]">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <div className="absolute top-[44%] left-[60%]">
          <MapPin className="w-5 h-5 text-primary" />
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 p-2 bg-background/60 backdrop-blur-md border border-white/10 rounded flex items-center gap-4">
          <div className="flex items-center gap-2">
             <div className="w-2 h-0.5 bg-primary border-t border-dashed border-primary" />
             <span className="text-[8px] text-muted-foreground uppercase font-bold">Planned Route</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2 h-0.5 bg-destructive" />
             <span className="text-[8px] text-muted-foreground uppercase font-bold">Actual Route</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
