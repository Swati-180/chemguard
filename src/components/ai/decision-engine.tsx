"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Bell, Shield, Search, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

const recommendations = [
  {
    title: "Flag shipment for physical inspection",
    description: "Detected divergence in shipment SH-9283 near Berlin hub. Recommend immediate stop and scan.",
    icon: Search,
    color: "text-destructive",
    bgColor: "bg-destructive/10"
  },
  {
    title: "Notify regulatory authority (REACH)",
    description: "Unusual ammonia consumption detected at Plant 4 exceeds 3-sigma variance threshold.",
    icon: Bell,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10"
  },
  {
    title: "Dispatch field verification team",
    description: "Hardware signal drift on GPS-001 suggests possible tampering at Checkpoint 3.",
    icon: Shield,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Trigger enhanced sensor monitoring",
    description: "High probability of temperature breach for Batch #789 based on external ambient trends.",
    icon: Eye,
    color: "text-accent",
    bgColor: "bg-accent/10"
  }
]

export function AiDecisionEngine() {
  return (
    <Card className="glass-card border-white/5">
      <CardHeader className="py-4 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">AI Decision & Response Engine</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex flex-col h-full p-4 bg-white/5 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("p-2 rounded-lg", rec.bgColor)}>
                  <rec.icon className={cn("w-4 h-4", rec.color)} />
                </div>
                <h4 className="text-[11px] font-bold text-white leading-tight">{rec.title}</h4>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed mb-6 flex-1">
                {rec.description}
              </p>
              <Button size="sm" className="w-full bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-wider hover:bg-white/10 h-8">
                Authorize Action
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
