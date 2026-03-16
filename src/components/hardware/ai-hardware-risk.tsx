
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BrainCircuit, AlertTriangle, ShieldAlert, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export function AiHardwareRisk() {
  const riskScore = 42; // Example score

  return (
    <Card className="glass-card h-full">
      <CardHeader className="py-4 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-primary" />
          <CardTitle className="text-sm font-headline font-semibold text-white uppercase tracking-widest">AI Risk Prediction (Hardware)</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Risk Gauge Visual */}
        <div className="relative flex items-center justify-center pt-4">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              className="text-white/5"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={364}
              strokeDashoffset={364 - (364 * riskScore) / 100}
              strokeLinecap="round"
              className={cn(
                "transition-all duration-1000",
                riskScore < 30 ? "text-accent" : riskScore < 60 ? "text-orange-400" : "text-destructive"
              )}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-headline font-bold text-white">{riskScore}%</span>
            <span className="text-[9px] text-muted-foreground uppercase font-bold">Risk Factor</span>
          </div>
        </div>

        <div className="space-y-4">
           <div className="p-3 rounded-lg bg-white/5 border border-white/5">
             <p className="text-[10px] font-bold text-white uppercase mb-2 flex items-center gap-2">
               <Zap className="w-3 h-3 text-primary" />
               Critical Predictors
             </p>
             <ul className="space-y-2">
               <li className="flex items-center gap-3 text-[10px] text-muted-foreground">
                 <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                 Route X Tamper Alert High Probability
               </li>
               <li className="flex items-center gap-3 text-[10px] text-muted-foreground">
                 <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                 Storage Y Temp Malfunction (Sensor Decay)
               </li>
               <li className="flex items-center gap-3 text-[10px] text-muted-foreground">
                 <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                 Battery Optimization Required (Checkpoint 4)
               </li>
             </ul>
           </div>

           <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg flex items-start gap-3">
              <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-bold text-primary uppercase">Analyst Recommendation</p>
                <p className="text-[10px] leading-relaxed text-foreground/70 mt-1">
                  AI recommends preventive sensor recalibration for Checkpoint 3 based on signal drift trends.
                </p>
              </div>
           </div>
        </div>
      </CardContent>
    </Card>
  )
}
