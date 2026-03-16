"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Beaker } from "lucide-react"

export function ChemicalFlowAnalytics() {
  return (
    <Card className="glass-card border-white/5 bg-[#0f172a]/40 h-full">
      <CardHeader className="py-4 border-b border-white/5">
        <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest leading-tight">
          Chemical Flow Analytics<br />
          <span className="text-[10px] text-muted-foreground font-normal tracking-normal normal-case">Dual-use chemicals from October 14, 2024</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 h-[280px] flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-between">
          
          {/* Source Node */}
          <div className="z-10 flex flex-col items-center gap-4">
            <div className="w-24 h-32 rounded-xl border border-primary/40 bg-primary/10 flex flex-col items-center justify-center gap-3 backdrop-blur-md">
              <Beaker className="w-8 h-8 text-primary" />
              <p className="text-[9px] font-bold text-center text-white px-2 leading-tight uppercase">Dual-use Chemical</p>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Source Facility</p>
          </div>

          {/* Transfer Hubs */}
          <div className="z-10 flex flex-col items-center gap-4">
            <div className="w-24 h-32 rounded-xl border border-accent/40 bg-accent/10 flex flex-col items-center justify-center gap-3 backdrop-blur-md">
              <Beaker className="w-8 h-8 text-accent" />
              <p className="text-[9px] font-bold text-center text-white px-2 leading-tight uppercase">Dual-use Chemical</p>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Transfer Hubs</p>
          </div>

          {/* Final Node */}
          <div className="z-10 flex flex-col items-center gap-4">
            <div className="w-24 h-32 rounded-xl border border-destructive/40 bg-destructive/10 flex flex-col items-center justify-center gap-3 backdrop-blur-md">
              <Beaker className="w-8 h-8 text-destructive" />
              <p className="text-[9px] font-bold text-center text-white px-2 leading-tight uppercase">Dual-use Chemical</p>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Final Lab/Facility</p>
          </div>

          {/* Flow Lines SVG Overlay */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
             <defs>
               <linearGradient id="flow1" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                 <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
               </linearGradient>
               <linearGradient id="flow2" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.4" />
                 <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity="0.4" />
               </linearGradient>
             </defs>
             
             {/* Flow from Source to Hub */}
             <path d="M 100 80 Q 200 60 350 80" stroke="url(#flow1)" strokeWidth="15" fill="none" strokeLinecap="round" className="opacity-40" />
             <path d="M 100 120 Q 200 140 350 120" stroke="url(#flow1)" strokeWidth="15" fill="none" strokeLinecap="round" className="opacity-40" />
             
             {/* Flow from Hub to Final */}
             <path d="M 450 80 Q 600 60 750 140" stroke="url(#flow2)" strokeWidth="15" fill="none" strokeLinecap="round" className="opacity-40" />
             <path d="M 450 120 Q 600 140 750 60" stroke="url(#flow2)" strokeWidth="15" fill="none" strokeLinecap="round" className="opacity-40" />

             {/* Text Overlays for Flow */}
             <text x="200" y="55" className="fill-white text-[8px] font-bold uppercase">24.25 to Substance Facility</text>
             <text x="200" y="155" className="fill-primary text-[8px] font-bold uppercase">2160 to Transfer Hubs</text>
             <text x="580" y="55" className="fill-white text-[8px] font-bold uppercase">36.81 to Substance Minting</text>
             <text x="580" y="155" className="fill-destructive text-[8px] font-bold uppercase">42.92 to Substance Cleats</text>
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}
