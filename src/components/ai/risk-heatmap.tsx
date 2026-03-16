
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Globe, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function AiRiskHeatmap() {
  return (
    <Card className="glass-card h-full overflow-hidden">
      <CardHeader className="py-4 border-b border-white/5 bg-white/5 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-accent" />
          <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Global Risk Prediction Heatmap</CardTitle>
        </div>
        <button className="p-1.5 hover:bg-white/5 rounded-md text-muted-foreground">
          <Maximize2 className="w-4 h-4" />
        </button>
      </CardHeader>
      <CardContent className="h-[480px] relative bg-[#0a0f18] p-0 flex items-center justify-center">
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

        {/* Heatmap Zones */}
        <div className="absolute top-[30%] left-[45%] w-32 h-32 bg-destructive/20 rounded-full blur-[40px] animate-pulse" />
        <div className="absolute top-[40%] left-[55%] w-24 h-24 bg-orange-400/20 rounded-full blur-[30px]" />
        <div className="absolute bottom-[30%] left-[25%] w-40 h-40 bg-primary/10 rounded-full blur-[50px]" />

        {/* Markers */}
        <div className="absolute top-[35%] left-[48%] group cursor-pointer">
          <div className="w-3 h-3 bg-destructive rounded-full border-2 border-background shadow-[0_0_10px_rgba(248,113,113,0.8)]" />
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-background/90 border border-white/10 p-2 rounded text-[8px] font-bold text-white hidden group-hover:block whitespace-nowrap z-50">
            HIGH RISK: CENTRAL EUROPE HUB
          </div>
        </div>

        <div className="absolute top-[42%] left-[58%] group cursor-pointer">
          <div className="w-2.5 h-2.5 bg-orange-400 rounded-full border-2 border-background shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 right-6 p-4 bg-background/60 backdrop-blur-md border border-white/10 rounded-xl space-y-3">
          <p className="text-[9px] font-bold text-white uppercase tracking-widest mb-2">Risk Zone Scale</p>
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-destructive" />
             <span className="text-[9px] text-muted-foreground uppercase font-bold">High Threat Anomaly</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-orange-400" />
             <span className="text-[9px] text-muted-foreground uppercase font-bold">Medium Deviation</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-primary" />
             <span className="text-[9px] text-muted-foreground uppercase font-bold">Standard Monitoring</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
