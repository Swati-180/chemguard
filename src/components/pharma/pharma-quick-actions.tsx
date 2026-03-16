"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Plus, Truck, Beaker, MoreHorizontal } from "lucide-react"

const actions = [
  { title: "Add New Batch", icon: Plus, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { title: "Request Shipment", icon: Truck, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { title: "Log Chemical Usage", icon: Beaker, color: "text-white/80", bg: "bg-white/5" },
]

export function PharmaQuickActions() {
  return (
    <Card className="glass-card bg-[#111827]/40 border-white/5 h-full">
      <CardHeader className="py-4 flex flex-row items-center justify-between border-b border-white/5">
        <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Quick Actions</CardTitle>
        <MoreHorizontal className="w-4 h-4 text-muted-foreground/50 cursor-pointer" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actions.map((action) => (
            <button 
              key={action.title}
              className="flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/5 transition-all group"
            >
              <div className={cn("p-4 rounded-xl transition-transform group-hover:scale-110", action.bg)}>
                <action.icon className={cn("w-8 h-8", action.color)} />
              </div>
              <span className="text-[11px] font-bold text-white/90 uppercase tracking-widest">{action.title}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

import { cn } from "@/lib/utils"
