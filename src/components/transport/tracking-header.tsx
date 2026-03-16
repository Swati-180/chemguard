"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Shield, Bell, User, LayoutGrid, Clock } from "lucide-react"
import { useUser } from "@/firebase"
import { cn } from "@/lib/utils"

interface TrackingHeaderProps {
  alertsCount: number
}

export function TrackingHeader({ alertsCount }: TrackingHeaderProps) {
  const { user } = useUser()
  const [time, setTime] = React.useState("")

  React.useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setTime(now.toUTCString().replace("GMT", "GMT").split(" ").slice(1, 5).join(" ") + " GMT")
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-[#050b14]/90 backdrop-blur-md shrink-0 z-50 border-b border-white/5">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
            <Shield className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-headline font-bold text-white uppercase tracking-tighter leading-tight">
              ChemGuard <span className="text-cyan-400">AI</span>
            </h1>
            <p className="text-[8px] text-muted-foreground uppercase font-bold tracking-[0.2em]">Real-Time Logistics Monitoring</p>
          </div>
        </div>

        <div className="h-8 w-px bg-white/5" />

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/5 bg-white/2">
          <LayoutGrid className="w-3.5 h-3.5 text-muted-foreground" />
          <p className="text-[10px] text-white/80 font-bold uppercase tracking-widest truncate max-w-[200px]">
            HOUSTON HQ [{time || "SYNCING..."}]
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Status Badge */}
        <Badge variant="outline" className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase h-8 px-3 gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          Online
        </Badge>

        {/* Alerts Badge */}
        <button className={cn(
          "flex items-center gap-2 px-3 h-8 rounded-md border transition-all hover:brightness-125",
          alertsCount > 0 
            ? "bg-destructive/10 border-destructive/30 text-destructive shadow-[0_0_15px_rgba(239,68,68,0.1)]" 
            : "bg-white/5 border-white/10 text-muted-foreground"
        )}>
          <Bell className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">{alertsCount} Alerts</span>
        </button>

        <div className="h-8 w-px bg-white/5 mx-2" />

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-bold text-white uppercase tracking-wider">{user?.displayName || "A. REED"}</p>
            <p className="text-[8px] text-muted-foreground uppercase font-bold">Chief Ops</p>
          </div>
          <div className="w-9 h-9 rounded-full border border-cyan-500/20 p-0.5 relative">
            <div className="absolute inset-0 rounded-full border border-white/5" />
            <img 
              src={`https://picsum.photos/seed/${user?.uid || 'user'}/40/40`} 
              className="w-full h-full rounded-full object-cover grayscale opacity-80"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
