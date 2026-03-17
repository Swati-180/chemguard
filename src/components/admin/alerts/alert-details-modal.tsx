
"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { 
  ShieldAlert, 
  Clock, 
  MapPin, 
  Cpu, 
  CheckCircle2, 
  Zap,
  Activity,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AlertDetailsModalProps {
  alert: any | null
  onClose: () => void
}

export function AlertDetailsModal({ alert, onClose }: AlertDetailsModalProps) {
  if (!alert) return null

  return (
    <Dialog open={!!alert} onOpenChange={onClose}>
      <DialogContent className="bg-[#050b14] border-white/10 text-white max-w-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-destructive animate-pulse" />
        
        <DialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <div className={cn(
              "p-3 rounded-xl border",
              alert.severity === 'Critical' ? "bg-destructive/10 border-destructive/30 text-destructive" : "bg-orange-500/10 border-orange-500/30 text-orange-400"
            )}>
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <DialogTitle className="text-xl font-headline font-bold uppercase tracking-widest leading-none">
                Incident Detected: {alert.id}
              </DialogTitle>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Status: {alert.status} | {new Date(alert.timestamp).toLocaleString()}</p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
          {/* Left Column: Details */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Incident Description</label>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm leading-relaxed text-white/80">
                {alert.description || "No detailed log available for this trigger."}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InfoBlock icon={MapPin} label="Location" value={alert.location} />
              <InfoBlock icon={Cpu} label="Device ID" value={alert.vehicleId || "SEN-9021"} />
              <InfoBlock icon={Zap} label="Intel Type" value={alert.type} />
              <InfoBlock icon={Activity} label="Risk Score" value="88/100" />
            </div>
          </div>

          {/* Right Column: Timeline & AI Action */}
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Tactical Timeline</label>
              <div className="relative pl-6 space-y-6">
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-white/5" />
                <TimelineStep label="Trigger Detected" time="14:32:01" status="completed" />
                <TimelineStep label="Satellite Lock Established" time="14:32:05" status="completed" />
                <TimelineStep label="Command Center Notified" time="14:32:10" status="active" />
                <TimelineStep label="Investigation Pending" time="--" status="pending" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-bold text-primary uppercase">AI Recommended Action</span>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed italic">
                "Divergence detected in Route Delta. Immediate driver communication required via secondary encrypted channel."
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t border-white/5 pt-6">
          <Button variant="ghost" onClick={onClose} className="text-[10px] font-bold uppercase tracking-widest">Close Overlay</Button>
          <div className="flex gap-3">
            <Button variant="outline" className="border-orange-500/30 bg-orange-500/5 text-orange-400 hover:bg-orange-500/10 text-[10px] font-bold uppercase tracking-widest px-6 h-11">
              Start Investigation
            </Button>
            <Button className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 font-headline font-bold uppercase tracking-widest px-8 h-11 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              Mark as Resolved
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function InfoBlock({ icon: Icon, label, value }: any) {
  return (
    <div className="space-y-1.5 p-3 rounded-lg bg-white/2 border border-white/5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="w-3 h-3" />
        <span className="text-[8px] font-bold uppercase tracking-tighter">{label}</span>
      </div>
      <p className="text-xs font-bold text-white truncate">{value}</p>
    </div>
  )
}

function TimelineStep({ label, time, status }: { label: string, time: string, status: 'completed' | 'active' | 'pending' }) {
  return (
    <div className="relative">
      <div className={cn(
        "absolute -left-[23px] top-1 w-2.5 h-2.5 rounded-full border-2 border-[#050b14] z-10",
        status === 'completed' ? "bg-emerald-400" : status === 'active' ? "bg-primary animate-pulse" : "bg-white/10"
      )} />
      <div className="flex justify-between items-center gap-4">
        <p className={cn("text-[10px] font-bold uppercase", status === 'pending' ? 'text-muted-foreground' : 'text-white')}>{label}</p>
        <span className="text-[9px] font-mono text-muted-foreground">{time}</span>
      </div>
    </div>
  )
}
