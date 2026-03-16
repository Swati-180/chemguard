
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, MapPin, Brain, Activity } from "lucide-react"

const threats = [
  {
    id: "SH-9283",
    location: "Berlin (DE)",
    type: "Unexpected Route Change",
    confidence: 98.4,
    severity: "High"
  },
  {
    id: "SH-4012",
    location: "Rotterdam (NL)",
    type: "Chemical Usage Spike",
    confidence: 85.2,
    severity: "Medium"
  },
  {
    id: "SH-1102",
    location: "Paris (FR)",
    type: "Temperature Anomaly",
    confidence: 92.1,
    severity: "High"
  },
  {
    id: "SH-8821",
    location: "Antwerp (BE)",
    type: "Tamper Sensor Trigger",
    confidence: 76.8,
    severity: "Medium"
  }
]

export function AiDetectedThreats() {
  return (
    <Card className="glass-card h-full">
      <CardHeader className="py-4 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-destructive" />
          <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">AI Detected Threat Intel</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {threats.map((threat) => (
          <div key={threat.id} className="p-4 bg-white/5 border border-white/5 rounded-xl hover:border-white/20 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <Brain className="w-12 h-12 text-primary" />
            </div>
            <div className="flex items-start justify-between mb-3">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-primary uppercase">Shipment {threat.id}</p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Activity className="w-3 h-3 text-accent" />
                  {threat.type}
                </div>
              </div>
              <Badge className={cn(
                "h-6 text-[10px] uppercase font-bold",
                threat.severity === 'High' ? 'bg-destructive/10 text-destructive border-destructive/20' : 'bg-orange-400/10 text-orange-400 border-orange-400/20'
              )}>
                {threat.severity}
              </Badge>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase">
                <MapPin className="w-3 h-3" />
                {threat.location}
              </div>
              <div className="text-[10px] font-bold text-accent">
                AI Confidence: {threat.confidence}%
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
