
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ActiveVehiclesOverview() {
  const stats = [
    { label: "In Transit", count: 18, color: "bg-accent", total: 23 },
    { label: "Delayed", count: 4, color: "bg-orange-400", total: 23 },
    { label: "Critical", count: 1, color: "bg-destructive", total: 23 },
  ]

  return (
    <Card className="glass-card border-white/5">
      <CardHeader className="py-4">
        <CardTitle className="text-xs font-headline font-semibold text-muted-foreground uppercase tracking-widest">Active Vehicles Overview</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <p className="text-4xl font-headline font-bold text-white mb-4">23</p>
          <div className="h-2 w-full flex rounded-full overflow-hidden bg-white/5">
             <div className="bg-accent h-full" style={{ width: '78%' }} />
             <div className="bg-orange-400 h-full" style={{ width: '17%' }} />
             <div className="bg-destructive h-full" style={{ width: '5%' }} />
          </div>
        </div>
        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1.5">
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
                <span className="flex items-center gap-2">
                  <div className={cn("w-1.5 h-1.5 rounded-full", stat.color)} />
                  {stat.label}
                </span>
                <span className="text-muted-foreground">{Math.round((stat.count / stat.total) * 100)}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

import { cn } from "@/lib/utils"
