"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const breakdown = [
  { label: "FDA CFR Part 21", score: 97, color: "hsl(var(--primary))" },
  { label: "DHS CSAT", score: 37, color: "#eab308" },
  { label: "EPA RCRA", score: 97, color: "hsl(var(--accent))" },
]

export function ComplianceScoreGauge() {
  const score = 97;

  return (
    <Card className="glass-card border-white/5 bg-[#0f172a]/40 h-full">
      <CardHeader className="py-3 border-b border-white/5">
        <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Overall Regulatory Compliance Score (97%)</CardTitle>
        <p className="text-[9px] text-muted-foreground uppercase">Trending Stable</p>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        <div className="relative h-32 flex items-center justify-center">
           <svg viewBox="0 0 200 120" className="w-48 h-32">
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="15" strokeLinecap="round" />
            <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="hsl(var(--accent))" strokeWidth="15" strokeLinecap="round" strokeDasharray="251" strokeDashoffset={251 * (1 - score/100)} />
            <text x="100" y="85" textAnchor="middle" className="fill-white text-2xl font-headline font-bold">{score}%</text>
            <text x="100" y="105" textAnchor="middle" className="fill-muted-foreground text-[8px] uppercase font-bold tracking-widest">Gauge</text>
           </svg>
           
           {/* Arc Labels */}
           <span className="absolute left-[10%] bottom-[15%] text-[7px] font-bold text-muted-foreground uppercase">FDA CFR Part 21 97%</span>
           <span className="absolute right-[10%] bottom-[15%] text-[7px] font-bold text-muted-foreground uppercase">FDA CFR Part 21 97%</span>
           <span className="absolute top-[10%] left-[25%] text-[7px] font-bold text-muted-foreground uppercase">FDA CFR Part 21 97%</span>
           <span className="absolute top-[10%] right-[25%] text-[7px] font-bold text-muted-foreground uppercase">DHS CSAT 97%</span>
           <span className="absolute top-[30%] right-[10%] text-[7px] font-bold text-muted-foreground uppercase">EPA RCRA 97%</span>
        </div>

        <div className="space-y-4 pt-4 border-t border-white/5">
           <div className="flex items-center justify-between text-[8px] font-bold uppercase tracking-widest text-muted-foreground">
             <span>Breakdown</span>
             <span>Score</span>
           </div>
           {breakdown.map((item) => (
             <div key={item.label} className="space-y-1.5">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                   <span className="text-[8px] font-bold text-white/80 uppercase">{item.label}</span>
                 </div>
                 <span className="text-[8px] font-bold text-white">{item.score}%</span>
               </div>
               <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full rounded-full transition-all" style={{ width: `${item.score}%`, backgroundColor: item.color }} />
               </div>
             </div>
           ))}
        </div>
      </CardContent>
    </Card>
  )
}
