"use client"

import { useEffect, useState } from "react"
import { generateAiRiskSummary, type GenerateAiRiskSummaryOutput } from "@/ai/flows/generate-ai-risk-summary"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BrainCircuit, ShieldAlert, CheckCircle2, AlertCircle, RefreshCw, Cpu, Thermometer, Video, Lock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function AiRiskSummary() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<GenerateAiRiskSummaryOutput | null>(null)

  useEffect(() => {
    async function fetchRisk() {
      try {
        const result = await generateAiRiskSummary({
          criticalAlertsCount: 3,
          warningAlertsCount: 8,
          complianceScore: 98,
          suspiciousActivityCount: 2,
          offlineDevicesCount: 1,
          tamperingAlertsCount: 0,
          activeShipmentsCount: 42,
          recentUnusualActivityDescription: "Minor signal fluctuation detected on GPS device SN-2928 near Rotterdam port. No location deviation observed."
        })
        setData(result)
      } catch (error) {
        // AI fetch failed silently
      } finally {
        setLoading(false)
      }
    }
    fetchRisk()
  }, [])

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Low": return "text-accent"
      case "Medium": return "text-orange-400"
      case "High": return "text-destructive"
      default: return "text-primary"
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "Low": return <CheckCircle2 className="w-8 h-8 text-accent" />
      case "Medium": return <AlertCircle className="w-8 h-8 text-orange-400" />
      case "High": return <ShieldAlert className="w-8 h-8 text-destructive" />
      default: return <BrainCircuit className="w-8 h-8 text-primary" />
    }
  }

  return (
    <div className="space-y-4">
      <Card className="glass-card overflow-hidden">
        <CardHeader className="border-b border-white/5 bg-white/5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" />
              <CardTitle className="text-sm font-headline font-semibold uppercase tracking-widest">AI Intelligence Risk Analysis</CardTitle>
            </div>
            {!loading && (
              <button onClick={() => setLoading(true)} className="text-muted-foreground hover:text-primary transition-colors">
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full bg-white/5" />
              <Skeleton className="h-24 w-full bg-white/5" />
            </div>
          ) : data ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="p-2 rounded-full bg-background border border-white/10 neon-glow-cyan">
                  {getRiskIcon(data.riskLevel)}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-tight">Current System Risk</p>
                  <p className={cn("text-2xl font-headline font-bold", getRiskColor(data.riskLevel))}>
                    {data.riskLevel} Level
                  </p>
                </div>
              </div>
              <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                <p className="text-xs font-bold text-primary uppercase mb-2">Analyst Explanation</p>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {data.explanation}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Unable to generate risk summary.</p>
          )}
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="py-4">
          <CardTitle className="text-xs font-headline font-semibold text-muted-foreground uppercase tracking-widest">Device Status Matrix</CardTitle>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-2 gap-4">
           {[
             { name: "GPS Tracks", icon: Cpu, status: "Active", value: 94 },
             { name: "Temp Sens.", icon: Thermometer, status: "Stable", value: 100 },
             { name: "Tamper Det.", icon: Lock, status: "Locked", value: 92 },
             { name: "Live Cams", icon: Video, status: "Syncing", value: 85 }
           ].map(device => (
             <div key={device.name} className="space-y-2 p-3 bg-white/5 rounded-lg border border-white/5">
               <div className="flex items-center justify-between">
                 <device.icon className="w-4 h-4 text-primary" />
                 <span className="text-[10px] font-bold text-accent uppercase">{device.status}</span>
               </div>
               <p className="text-xs font-medium">{device.name}</p>
               <Progress value={device.value} className="h-1 bg-white/10" />
             </div>
           ))}
        </CardContent>
      </Card>
    </div>
  )
}
