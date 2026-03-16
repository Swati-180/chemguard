"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Truck, Navigation, AlertTriangle, ShieldCheck, ArrowUpRight } from "lucide-react"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, query, where } from "firebase/firestore"
import { cn } from "@/lib/utils"

export function TransportMetricCards() {
  const db = useFirestore()

  // Real-time queries for metrics
  const shipmentsQuery = useMemoFirebase(() => collection(db, "shipments"), [db])
  const vehiclesQuery = useMemoFirebase(() => collection(db, "vehicles"), [db])
  const alertsQuery = useMemoFirebase(() => query(collection(db, "transport_alerts"), where("severity", "==", "Critical"), where("status", "==", "New")), [db])
  const complianceQuery = useMemoFirebase(() => collection(db, "compliance_records"), [db])

  const { data: shipments } = useCollection(shipmentsQuery)
  const { data: vehicles } = useCollection(vehiclesQuery)
  const { data: alerts } = useCollection(alertsQuery)
  const { data: compliance } = useCollection(complianceQuery)

  const activeShipments = shipments?.filter(s => s.status === 'In Transit').length || 0
  const vehiclesOnline = vehicles?.filter(v => v.movementStatus !== 'Stopped').length || 0
  const criticalAlerts = alerts?.length || 0
  
  // Calculate average compliance score
  const avgCompliance = compliance && compliance.length > 0
    ? (compliance.reduce((acc, curr) => acc + (curr.score || 0), 0) / compliance.length).toFixed(1)
    : "98.4"

  const metrics = [
    { title: "Active Shipments", value: activeShipments, icon: Truck, color: "text-orange-400", bg: "bg-orange-400/10", trend: "+3.2%" },
    { title: "Vehicles Online", value: vehiclesOnline, icon: Navigation, color: "text-cyan-400", bg: "bg-cyan-400/10", trend: "Stable" },
    { title: "Critical Alerts", value: criticalAlerts, icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", trend: criticalAlerts > 0 ? "ATTENTION" : "None" },
    { title: "Compliance Score", value: `${avgCompliance}%`, icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-400/10", trend: "+0.2%" },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m) => (
        <Card key={m.title} className="glass-card bg-white/[0.02] border-white/5 hover:border-orange-500/20 transition-all group overflow-hidden">
          <CardContent className="p-5">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{m.title}</p>
                <p className="text-3xl font-headline font-bold text-white">{m.value}</p>
              </div>
              <div className={cn("p-2.5 rounded-xl border border-white/5", m.bg, m.color)}>
                <m.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1.5">
              <ArrowUpRight className={cn("w-3 h-3", m.color)} />
              <span className="text-[9px] font-bold text-white/60 uppercase">{m.trend}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
