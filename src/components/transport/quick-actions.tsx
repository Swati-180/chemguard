"use client"

import { Button } from "@/components/ui/button"
import { Truck, MapPin, AlertCircle, RefreshCw } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function TransportQuickActions() {
  const handleAction = (label: string) => {
    toast({
      title: "Tactical Response Initiated",
      description: `Action: ${label} has been queued for synchronization.`,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Button 
        onClick={() => handleAction("Update Shipment")}
        className="h-16 bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20 font-headline font-bold uppercase tracking-widest gap-4 group"
      >
        <div className="p-2 rounded-lg bg-orange-500/20 group-hover:scale-110 transition-transform">
          <Truck className="w-5 h-5" />
        </div>
        Update Shipment Matrix
      </Button>

      <Button 
        onClick={() => handleAction("Log Checkpoint")}
        variant="outline"
        className="h-16 border-white/5 bg-white/5 text-white hover:bg-white/10 font-headline font-bold uppercase tracking-widest gap-4 group"
      >
        <div className="p-2 rounded-lg bg-white/5 group-hover:scale-110 transition-transform">
          <MapPin className="w-5 h-5 text-cyan-400" />
        </div>
        Log Sector Checkpoint
      </Button>

      <Button 
        onClick={() => handleAction("Report Incident")}
        variant="outline"
        className="h-16 border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10 font-headline font-bold uppercase tracking-widest gap-4 group"
      >
        <div className="p-2 rounded-lg bg-destructive/20 group-hover:scale-110 transition-transform">
          <AlertCircle className="w-5 h-5" />
        </div>
        Report Critical Incident
      </Button>
    </div>
  )
}
