"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, ShieldCheck, Truck, Beaker } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Total Users",
    value: "1,429",
    icon: Users,
    color: "text-white",
    bgColor: "bg-white/5"
  },
  {
    title: "Administrators",
    value: "12",
    icon: ShieldCheck,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Transporters",
    value: "384",
    icon: Truck,
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    title: "Pharma Labs",
    value: "84",
    icon: Beaker,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10"
  }
]

export function UserSummaryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="glass-card hover:border-white/10 transition-all group">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={cn("p-3 rounded-xl", stat.bgColor)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{stat.title}</p>
                <p className="text-2xl font-headline font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
