"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MoreVertical } from "lucide-react"

export function UserStatusSummary() {
  const score = 78; // Example value for the gauge

  return (
    <Card className="glass-card border-white/5 bg-white/5 overflow-hidden">
      <CardHeader className="py-4 border-b border-white/5 flex flex-row items-center justify-between">
        <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest leading-tight">User Status Summary</CardTitle>
        <MoreVertical className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative flex flex-col items-center justify-center">
          {/* Stylized Gauge SVG */}
          <svg className="w-48 h-32" viewBox="0 0 200 120">
            {/* Background Arc */}
            <path 
              d="M 20 100 A 80 80 0 0 1 180 100" 
              fill="none" 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="20" 
              strokeLinecap="round" 
            />
            {/* Color Segments */}
            <path 
              d="M 20 100 A 80 80 0 0 1 60 40" 
              fill="none" 
              stroke="hsl(var(--destructive))" 
              strokeWidth="20" 
            />
            <path 
              d="M 60 40 A 80 80 0 0 1 140 40" 
              fill="none" 
              stroke="#eab308" 
              strokeWidth="20" 
            />
            <path 
              d="M 140 40 A 80 80 0 0 1 180 100" 
              fill="none" 
              stroke="hsl(var(--accent))" 
              strokeWidth="20" 
            />
            
            {/* Indicator Needle */}
            <line 
              x1="100" y1="100" 
              x2="150" y2="60" 
              stroke="rgba(255,255,255,0.8)" 
              strokeWidth="3" 
              strokeLinecap="round" 
            />
            <circle cx="100" cy="100" r="8" fill="rgba(255,255,255,0.8)" />

            <text x="20" y="115" className="fill-muted-foreground text-[10px] font-bold">0</text>
            <text x="175" y="115" className="fill-muted-foreground text-[10px] font-bold">10%</text>
          </svg>
          
          <div className="flex gap-4 mt-4">
             <div className="flex items-center gap-1.5">
               <div className="w-2 h-2 rounded-full bg-destructive" />
               <span className="text-[10px] font-bold text-muted-foreground uppercase">Admin</span>
             </div>
             <div className="flex items-center gap-1.5">
               <div className="w-2 h-2 rounded-full bg-accent" />
               <span className="text-[10px] font-bold text-muted-foreground uppercase">Status</span>
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
