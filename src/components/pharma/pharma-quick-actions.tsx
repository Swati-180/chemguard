
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Plus, Truck, Beaker, MoreHorizontal } from "lucide-react"
import { useFirestore, useUser } from "@/firebase"
import { collection, doc, serverTimestamp } from "firebase/firestore"
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const actions = [
  { id: "batch", title: "Add New Batch", icon: Plus, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { id: "shipment", title: "Request Shipment", icon: Truck, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { id: "usage", title: "Log Chemical Usage", icon: Beaker, color: "text-white/80", bg: "bg-white/5" },
]

export function PharmaQuickActions() {
  const db = useFirestore()
  const { user } = useUser()

  const handleAction = (id: string) => {
    if (!user) return

    switch (id) {
      case "batch":
        const batchDocId = `B-${Math.floor(Math.random() * 10000)}`
        const batchRef = doc(collection(db, "chemical_batches"), batchDocId)
        setDocumentNonBlocking(batchRef, {
          id: batchDocId,
          batchId: batchDocId,
          chemicalName: "Ammonium Nitrate (Precursor)",
          quantity: 250,
          unit: "kg",
          productionDate: new Date().toISOString().split('T')[0],
          storageLocation: "R&D Lab Alpha - Section 4",
          status: "Available",
          createdBy: user.uid,
          createdAt: new Date().toISOString()
        }, { merge: true })
        toast({ title: "Operation Initiated", description: `Provisioning new chemical batch: ${batchDocId}` })
        break

      case "usage":
        const usageId = `LOG-${Date.now()}`
        const usageRef = doc(collection(db, "usage_logs"), usageId)
        setDocumentNonBlocking(usageRef, {
          id: usageId,
          chemicalName: "Hydrochloric Acid",
          batchId: "B-9921",
          quantityUsed: "5.0 L",
          purpose: "R&D Synthesis",
          technician: user.displayName || "Dr. Amelia Reed",
          date: new Date().toISOString()
        }, { merge: true })
        toast({ title: "Audit Recorded", description: "Usage event synchronized with secure database." })
        break

      case "shipment":
        const shipId = `SH-${Math.floor(Math.random() * 10000)}`
        const shipRef = doc(collection(db, "shipment_requests"), shipId)
        setDocumentNonBlocking(shipRef, {
          id: shipId,
          shipmentId: shipId,
          batchId: `B-${Math.floor(Math.random() * 9000) + 1000}`,
          destination: "Rotterdam Distribution Hub",
          transporter: "EuroExpress Logistics",
          status: "Pending",
          createdAt: new Date().toISOString()
        }, { merge: true })
        toast({ title: "Logistics Request Sent", description: `Shipment ${shipId} queued for transporter review.` })
        break
    }
  }

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
              key={action.id}
              onClick={() => handleAction(action.id)}
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
