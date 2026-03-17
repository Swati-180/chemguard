
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ShieldAlert, Clock, AlertTriangle, FileWarning, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const risks = [
  {
    title: "Expiring Soon",
    description: "4 batches of Nitric Acid expire within 72 hours. Immediate re-evaluation required.",
    severity: "warning",
    icon: Clock
  },
  {
    title: "Overuse Detection",
    description: "Abnormal 120% surge in Sulfuric Acid consumption detected at Section B-04.",
    severity: "critical",
    icon: ShieldAlert
  },
  {
    title: "Missing Audit Logs",
    description: "Batch #PA-401-G missing secondary verification signature for recent movement.",
    severity: "info",
    icon: FileWarning
  }
]

export function BatchRiskIndicators() {
  return (
    <Card className="glass-card border-white/5 bg-white/[0.02] overflow-hidden">
      <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02]">
        <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest flex items-center gap-3">
          <AlertTriangle className="h-4 w-4 text-orange-400" />
          Active Risk Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {risks.map((risk, i) => (
          <div key={i} className="flex gap-4 p-4 bg-white/2 border border-white/5 rounded-xl hover:border-white/10 transition-all cursor-default group">
            <div className={cn(
              "p-2.5 rounded-lg h-fit group-hover:scale-110 transition-transform",
              risk.severity === "critical" ? "bg-destructive/10 text-destructive border border-destructive/20" :
              risk.severity === "warning" ? "bg-orange-400/10 text-orange-400 border border-orange-400/20" : 
              "bg-primary/10 text-primary border border-primary/20"
            )}>
              <risk.icon className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-white uppercase tracking-wider">{risk.title}</p>
              <p className="text-[10px] leading-relaxed text-muted-foreground uppercase font-medium">{risk.description}</p>
            </div>
          </div>
        ))}
        
        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Compliance Health: 98%</span>
          </div>
          <span className="text-[8px] font-bold text-muted-foreground uppercase">Stable</span>
        </div>
      </CardContent>
    </Card>
  )
}
