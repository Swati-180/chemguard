
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Beaker, ShieldCheck, Timer } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function InventoryGlowCard() {
  const stock = [
    { name: "Ammonia Liquid", val: 82, color: "bg-accent" },
    { name: "Sodium Cyanide", val: 45, color: "bg-primary" },
    { name: "Sulfuric Acid", val: 91, color: "bg-accent" },
    { name: "Nitric Oxide", val: 28, color: "bg-destructive" },
  ]

  return (
    <div className="space-y-4">
      <Card className="glass-card overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-accent shadow-[0_0_15px_rgba(50,250,192,0.5)]" />
        <CardHeader className="py-4 bg-white/5 border-b border-white/5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Inventory Integrity Score</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <p className="text-4xl font-headline font-bold text-accent">99.8%</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Verification Status: Optimal</p>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="py-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-primary" />
            <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Critical Reorder Levels</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-5">
          {stock.map((item) => (
            <div key={item.name} className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                <span className="text-white/80">{item.name}</span>
                <span className="text-muted-foreground">{item.val}%</span>
              </div>
              <Progress value={item.val} className={cn("h-1.5 bg-white/5", item.color)} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

import { cn } from "@/lib/utils"
