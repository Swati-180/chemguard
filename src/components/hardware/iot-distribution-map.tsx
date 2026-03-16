
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Globe, MapPin, AlertCircle, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function IoTDistributionMap() {
  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="py-4 bg-white/5 border-b border-white/5 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-headline font-semibold text-primary uppercase tracking-widest">Global IoT Distribution (Live View)</CardTitle>
          <p className="text-[10px] text-muted-foreground uppercase mt-1">Satellite Relay: GALILEO-9 | Update Frequency: 5s</p>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-md transition-colors">
          <Maximize2 className="w-4 h-4 text-muted-foreground" />
        </button>
      </CardHeader>
      <CardContent className="h-[450px] relative bg-[#0a0f18] p-0 overflow-hidden">
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

        {/* Floating Node Markers */}
        {[
          { x: '25%', y: '30%', status: 'active', id: 'CO-TS-123' },
          { x: '48%', y: '25%', status: 'active', label: 'Online GPS-3' },
          { x: '58%', y: '45%', status: 'alert', label: 'Checkpoint 3.3' },
          { x: '75%', y: '35%', status: 'warning' },
          { x: '42%', y: '60%', status: 'active' },
        ].map((node, i) => (
          <div key={i} className="absolute group cursor-pointer" style={{ left: node.x, top: node.y }}>
            <div className="relative">
              <div className={cn(
                "absolute -inset-2 rounded-full animate-ping",
                node.status === 'alert' ? 'bg-destructive/30' : node.status === 'warning' ? 'bg-orange-400/30' : 'bg-accent/30'
              )} />
              <div className={cn(
                "w-2.5 h-2.5 rounded-full border-2 border-background shadow-lg relative z-10",
                node.status === 'alert' ? 'bg-destructive' : node.status === 'warning' ? 'bg-orange-400' : 'bg-accent'
              )} />
              
              {node.label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-background/90 border border-white/10 px-2 py-1 rounded text-[8px] font-bold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  {node.label}
                </div>
              )}

              {node.status === 'alert' && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-destructive animate-bounce">
                  <AlertCircle className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-6 left-6 p-4 bg-background/60 backdrop-blur-md border border-white/10 rounded-xl space-y-3 shadow-2xl">
          <p className="text-[10px] font-bold text-white uppercase tracking-wider mb-2">Network Status Legend</p>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-accent" />
             <span className="text-[9px] text-muted-foreground uppercase font-medium">Optimal Connection</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-orange-400" />
             <span className="text-[9px] text-muted-foreground uppercase font-medium">Signal Deviation</span>
          </div>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-destructive" />
             <span className="text-[9px] text-muted-foreground uppercase font-medium">Critical Fault / Tamper</span>
          </div>
        </div>

        {/* Data Stream */}
        <div className="absolute top-6 right-6 p-3 bg-black/40 border border-white/5 rounded-lg text-[8px] font-mono text-primary space-y-1">
           <p className="opacity-50 tracking-tighter">{">>>"} RELAY_STREAM_ID: SOC_EU_882</p>
           <p>PACKET_SYNC: [OK]</p>
           <p>LATENCY: 12ms</p>
           <p>BUFFER_HEALTH: 99.4%</p>
        </div>
      </CardContent>
    </Card>
  )
}
