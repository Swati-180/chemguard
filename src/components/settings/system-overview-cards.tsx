
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Zap, Cpu, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    title: "Platform Status",
    value: "Optimal",
    sub: "All Systems Operational",
    icon: Zap,
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    title: "Active Integrations",
    value: "12",
    sub: "3 External Gateways",
    icon: Cpu,
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    title: "Connected IoT Devices",
    value: "18,742",
    sub: "+142 Since Last Sync",
    icon: ShieldCheck,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10"
  },
  {
    title: "Security Level",
    value: "High",
    sub: "Encryption AES-256",
    icon: Lock,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10"
  }
]

export function SystemOverviewCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="glass-card bg-[#0f172a]/40 border-white/5 hover:border-white/10 transition-all group overflow-hidden">
          <CardContent className="p-4 flex items-center gap-4">
            <div className={cn("p-3 rounded-xl", stat.bgColor)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1.5">{stat.title}</p>
              <p className="text-xl font-headline font-bold text-white tracking-tight">{stat.value}</p>
              <p className="text-[9px] text-muted-foreground uppercase mt-0.5">{stat.sub}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
