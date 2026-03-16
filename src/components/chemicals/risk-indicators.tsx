
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { AlertCircle, History, FileWarning, ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"

const risks = [
  {
    title: "Expiring Soon",
    description: "4 batches of Nitric Acid expire within 72 hours.",
    severity: "warning",
    icon: AlertCircle
  },
  {
    title: "Overuse Detection",
    description: "Abnormal surge in Sulfuric Acid consumption at Plant 3.",
    severity: "critical",
    icon: ShieldAlert
  },
  {
    title: "Missing Audit Logs",
    description: "Batch #PA-401-G missing secondary verification signature.",
    severity: "info",
    icon: FileWarning
  }
]

export function BatchRiskIndicators() {
  return (
    <Card className="glass-card border-white/5">
      <CardHeader className="py-4 border-b border-white/5">
        <CardTitle className="text-sm font-headline font-semibold text-destructive uppercase tracking-widest flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" />
          Batch Risk Indicators
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {risks.map((risk, i) => (
          <div key={i} className="flex gap-4 p-3 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
            <div className={cn(
              "p-2 rounded-lg h-fit",
              risk.severity === "critical" ? "bg-destructive/10 text-destructive" :
              risk.severity === "warning" ? "bg-orange-400/10 text-orange-400" : "bg-primary/10 text-primary"
            )}>
              <risk.icon className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-white uppercase">{risk.title}</p>
              <p className="text-[10px] leading-tight text-muted-foreground">{risk.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
