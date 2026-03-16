"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Shield, Truck, Beaker, CheckCircle2 } from "lucide-react"

const permissions = [
  {
    role: "Admin",
    icon: Shield,
    color: "text-primary",
    bgColor: "bg-primary/10",
    rights: ["Full System Control", "User Identity Mgmt", "Global Monitoring", "Hardware Calibration"]
  },
  {
    role: "Transporter",
    icon: Truck,
    color: "text-accent",
    bgColor: "bg-accent/10",
    rights: ["Shipment Tracking", "Delivery Confirmation", "Checkpoint Reporting", "Route Deviation Alerts"]
  },
  {
    role: "Pharma Lab",
    icon: Beaker,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    rights: ["Inventory Mgmt", "Shipment Requests", "Chemical Usage Logs", "Batch Verification"]
  }
]

export function AccessPermissionsPanel() {
  return (
    <Card className="glass-card border-white/5 bg-white/5">
      <CardHeader className="py-4 border-b border-white/5">
        <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Global Role Permissions Matrix</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {permissions.map((p) => (
            <div key={p.role} className="p-4 bg-white/2 border border-white/5 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("p-2 rounded-lg", p.bgColor)}>
                  <p.icon className={cn("w-4 h-4", p.color)} />
                </div>
                <h3 className="font-headline font-bold text-white">{p.role}</h3>
              </div>
              <ul className="space-y-2">
                {p.rights.map((right) => (
                  <li key={right} className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase font-bold tracking-tight">
                    <CheckCircle2 className="w-3 h-3 text-accent" />
                    {right}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

import { cn } from "@/lib/utils"
