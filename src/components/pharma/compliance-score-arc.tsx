"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function ComplianceScoreArc() {
  const score = 98;
  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * (circumference / 2); // Half circle

  return (
    <Card className="glass-card bg-[#111827]/40 border-white/5 h-full">
      <CardHeader className="py-4 border-b border-white/5 bg-white/2">
        <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest leading-none">Regulatory Compliance Score <span className="text-muted-foreground font-normal normal-case ml-1">(Score Panel)</span></CardTitle>
        <p className="text-[9px] text-muted-foreground uppercase mt-1">FDA, DEA, & DHS Adherence</p>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-8 pb-4">
        <div className="relative flex items-center justify-center">
          <svg
            height={radius * 2}
            width={radius * 2 * 1.5}
            className="transform rotate-0"
          >
            {/* Background Arc */}
            <path
              d={`M ${stroke} ${radius} A ${radius - stroke} ${radius - stroke} 0 0 1 ${radius * 2 * 1.5 - stroke} ${radius}`}
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={stroke}
              strokeLinecap="round"
            />
            {/* Gradient Arc */}
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <path
              d={`M ${stroke} ${radius} A ${radius - stroke} ${radius - stroke} 0 0 1 ${radius * 2 * 1.5 - stroke} ${radius}`}
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth={stroke}
              strokeDasharray={`${(score / 100) * (radius * Math.PI * 1.5)}, 1000`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
            <span className="text-4xl font-headline font-bold text-white leading-none">{score}%</span>
            <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest mt-1">Compliance Score</span>
          </div>
        </div>

        <div className="flex gap-6 mt-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500" />
            <span className="text-[8px] font-bold text-muted-foreground uppercase">Overall Regulatory Health</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[8px] font-bold text-muted-foreground uppercase">FDA, DEA, & DHS Adherence</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
