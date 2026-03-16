"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Thermometer, Lock, Video, MoreHorizontal } from "lucide-react"
import Image from "next/image"

export function PharmaHardwareStatus() {
  return (
    <Card className="glass-card bg-[#111827]/40 border-white/5 h-full">
      <CardHeader className="py-4 flex flex-row items-center justify-between border-b border-white/5">
        <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Hardware Status</CardTitle>
        <MoreHorizontal className="w-4 h-4 text-muted-foreground/50 cursor-pointer" />
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Temperature Sensors */}
        <div className="space-y-2">
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Temperature Sensors</p>
          <div className="flex items-center gap-4 p-3 bg-white/2 rounded-xl border border-white/5">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <Thermometer className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              </div>
              <p className="text-[10px] text-white/60 mt-1 font-bold">Status °C</p>
            </div>
          </div>
        </div>

        {/* Tamper Sensors */}
        <div className="space-y-2">
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Tamper Sensors</p>
          <div className="flex items-center gap-4 p-3 bg-white/2 rounded-xl border border-white/5">
            <div className="p-2 rounded-lg bg-red-500/10">
              <Lock className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-[10px] text-white/60 mt-1 font-bold">Activity: 2</p>
            </div>
          </div>
        </div>

        {/* Warehouse Cameras */}
        <div className="space-y-2">
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Warehouse Cameras</p>
          <div className="flex items-center gap-4 p-3 bg-white/2 rounded-xl border border-white/5">
            <div className="p-2 rounded-lg bg-cyan-500/10">
              <Video className="w-5 h-5 text-cyan-500" />
            </div>
            <div className="flex-1 rounded-lg overflow-hidden relative h-10 border border-white/10">
              <Image 
                src="https://picsum.photos/seed/warehouse/200/80" 
                fill 
                className="object-cover opacity-60" 
                alt="Warehouse"
                data-ai-hint="warehouse interior"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
