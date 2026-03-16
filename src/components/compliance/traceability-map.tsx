"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Globe, MapPin, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function TraceabilityMap() {
  return (
    <Card className="glass-card overflow-hidden border-white/5 bg-[#0f172a]/40 h-full">
      <CardHeader className="py-3 bg-white/5 border-b border-white/5 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest leading-none">Global Supply Traceability | Verified Movements</CardTitle>
        </div>
        <Maximize2 className="w-3.5 h-3.5 text-muted-foreground cursor-pointer" />
      </CardHeader>
      <CardContent className="h-[380px] relative bg-[#0a0f18] p-0 overflow-hidden">
        {/* World Map Backdrop */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 1000 500" className="w-full h-full fill-white">
            <path d="M150,150 Q200,100 250,150 T350,150 T450,200 T550,180 T650,220 T750,150 T850,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="200" cy="150" r="40" />
            <circle cx="450" cy="200" r="60" />
            <circle cx="700" cy="150" r="50" />
            <circle cx="300" cy="300" r="30" />
          </svg>
        </div>

        {/* Connection Routes */}
        <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full pointer-events-none">
          <path d="M250,200 Q400,150 550,220" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeDasharray="5,5" className="opacity-60" />
          <path d="M550,220 Q650,250 780,180" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="5,5" className="opacity-60" />
          <path d="M550,220 L420,350" fill="none" stroke="hsl(var(--destructive))" strokeWidth="1.5" strokeDasharray="5,5" className="opacity-60" />
        </svg>

        {/* Verification Alert Tooltip */}
        <div className="absolute top-[35%] left-[45%] bg-[#1e293b]/95 border border-white/10 p-2 rounded shadow-2xl z-20 w-40 backdrop-blur-md">
           <div className="flex items-center justify-between mb-1">
             <span className="text-[9px] font-bold text-accent uppercase">Verified</span>
           </div>
           <p className="text-[8px] text-muted-foreground uppercase leading-tight">Log Entities: synth 789-Q4</p>
           <p className="text-[8px] text-muted-foreground uppercase leading-tight">Log Entities: 3fF S025</p>
           <p className="text-[8px] text-primary uppercase font-bold mt-1">Log Entities: Batch 789-Q4</p>
        </div>

        {/* Nodes */}
        <div className="absolute top-[38%] left-[24%]"><MapPin className="w-4 h-4 text-accent" /></div>
        <div className="absolute top-[42%] left-[54%]"><MapPin className="w-4 h-4 text-accent" /></div>
        <div className="absolute top-[34%] left-[77%]"><MapPin className="w-4 h-4 text-primary" /></div>
        <div className="absolute top-[68%] left-[41%]"><MapPin className="w-4 h-4 text-destructive" /></div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 p-2 bg-background/60 backdrop-blur-md border border-white/10 rounded-lg space-y-1.5">
          <p className="text-[8px] font-bold text-white uppercase tracking-wider mb-1">Compliance State</p>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-accent" /><span className="text-[7px] text-muted-foreground uppercase font-bold">Pass</span></div>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-400" /><span className="text-[7px] text-muted-foreground uppercase font-bold">Investigation</span></div>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /><span className="text-[7px] text-muted-foreground uppercase font-bold">In-Transit</span></div>
        </div>
      </CardContent>
    </Card>
  )
}
