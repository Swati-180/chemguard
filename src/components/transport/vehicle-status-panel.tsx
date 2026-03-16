"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, limit, query } from "firebase/firestore"
import { Activity, Shield, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"

export function VehicleStatusPanel() {
  const db = useFirestore()
  
  const vehiclesQuery = useMemoFirebase(() => query(collection(db, "vehicles"), limit(10)), [db])
  const { data: vehicles, isLoading } = useCollection(vehiclesQuery)

  return (
    <Card className="glass-card bg-white/[0.02] border-white/5 h-full">
      <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
        <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Asset Lifecycle Monitor</CardTitle>
        <Activity className="w-4 h-4 text-orange-400" />
      </CardHeader>
      <CardContent className="p-0 overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex items-center justify-center text-[10px] font-bold text-orange-400 animate-pulse uppercase tracking-[0.2em]">
            Syncing Asset Stream...
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {vehicles?.map((v) => (
              <div key={v.id} className="p-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center border border-white/5",
                    v.healthStatus === 'Critical' ? "bg-destructive/10 text-destructive" : "bg-cyan-500/10 text-cyan-400"
                  )}>
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-white uppercase">{v.licensePlate || v.id}</p>
                    <p className="text-[9px] text-muted-foreground uppercase font-medium">{v.locationDescription || "Sector Zulu"}</p>
                  </div>
                </div>
                
                <div className="text-right flex flex-col items-end gap-1.5">
                  <Badge className={cn(
                    "text-[8px] font-bold uppercase py-0 h-4 border-0",
                    v.movementStatus === 'Moving' ? "bg-emerald-500/20 text-emerald-400" : "bg-orange-500/20 text-orange-400"
                  )}>
                    {v.movementStatus || "Stationary"}
                  </Badge>
                  <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Health: {v.healthStatus || "Optimal"}</p>
                </div>
              </div>
            ))}
            {(!vehicles || vehicles.length === 0) && (
              <div className="p-12 text-center text-muted-foreground text-[10px] uppercase font-bold tracking-widest">
                No active units detected in grid.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
