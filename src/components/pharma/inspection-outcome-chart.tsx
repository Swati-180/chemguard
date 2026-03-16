"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"

const data = [
  { name: "1", passed: 40, required: 20, failed: 10 },
  { name: "2", passed: 45, required: 25, failed: 15 },
  { name: "3", passed: 60, required: 35, failed: 12 },
  { name: "4", passed: 55, required: 30, failed: 18 },
  { name: "5", passed: 70, required: 45, failed: 25 },
  { name: "6", passed: 65, required: 40, failed: 20 },
  { name: "7", passed: 80, required: 55, failed: 30 },
]

export function InspectionOutcomeChart() {
  return (
    <Card className="glass-card bg-[#111827]/40 border-white/5 h-full">
      <CardHeader className="py-4 border-b border-white/5 bg-white/2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest leading-none">Weekly Inspection Outcome</CardTitle>
            <p className="text-[9px] text-muted-foreground uppercase mt-1">Self-Audit & Self-Inspection Performance</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[8px] font-bold text-muted-foreground uppercase">Passed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
              <span className="text-[8px] font-bold text-muted-foreground uppercase">Action Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
              <span className="text-[8px] font-bold text-muted-foreground uppercase">Failed</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[250px] pt-6 relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ fontSize: '10px' }}
            />
            <Line 
              type="monotone" 
              dataKey="passed" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              type="monotone" 
              dataKey="required" 
              stroke="#06b6d4" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#06b6d4', strokeWidth: 0 }} 
            />
            <Line 
              type="monotone" 
              dataKey="failed" 
              stroke="#ef4444" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#ef4444', strokeWidth: 0 }} 
            />
          </LineChart>
        </ResponsiveContainer>
        
        {/* Mock labels as seen in image */}
        <div className="absolute top-[40%] left-[20%] px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/40 rounded text-[7px] font-bold text-emerald-400">CR +0.00</div>
        <div className="absolute top-[30%] left-[45%] px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/40 rounded text-[7px] font-bold text-cyan-400">00 +0.00</div>
      </CardContent>
    </Card>
  )
}
