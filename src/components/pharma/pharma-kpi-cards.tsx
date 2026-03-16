"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Truck, AlertTriangle } from "lucide-react"
import { ResponsiveContainer, LineChart, Line } from "recharts"
import { cn } from "@/lib/utils"

const sparkData = [
  { val: 10 }, { val: 15 }, { val: 8 }, { val: 22 }, { val: 18 }, { val: 25 }, { val: 20 }
]

export function PharmaKpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Total Batches */}
      <Card className="glass-card bg-[#111827]/40 border-white/5 overflow-hidden">
        <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Total Chemical Batches</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-headline font-bold text-white">1,250</p>
            <div className="h-8 w-16">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sparkData}>
                  <Line type="monotone" dataKey="val" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Stock */}
      <Card className="glass-card bg-[#111827]/40 border-white/5 overflow-hidden">
        <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Inventory Stock</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-headline font-bold text-white">9,800</p>
            <div className="relative w-12 h-8">
              <svg viewBox="0 0 40 24" className="w-full h-full transform -rotate-0">
                <path d="M 5 20 A 15 15 0 0 1 35 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" strokeLinecap="round" />
                <path d="M 5 20 A 15 15 0 0 1 30 10" fill="none" stroke="url(#gaugeGradient)" strokeWidth="4" strokeLinecap="round" />
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Requests */}
      <Card className="glass-card bg-[#111827]/40 border-white/5 overflow-hidden">
        <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Pending Shipment Requests</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-headline font-bold text-white">45</p>
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Truck className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card className="glass-card bg-[#111827]/40 border-white/5 overflow-hidden">
        <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Active Alerts</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-headline font-bold text-white">7</p>
            <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Score */}
      <Card className="glass-card bg-[#111827]/40 border-white/5 overflow-hidden">
        <CardContent className="p-5 flex flex-col justify-between h-full space-y-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Compliance Score</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-headline font-bold text-white">98%</p>
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <ShieldCheck className="w-5 h-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
