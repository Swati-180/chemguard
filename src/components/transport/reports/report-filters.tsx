"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Calendar as CalendarIcon, 
  Truck, 
  Activity, 
  ShieldAlert, 
  FileCheck, 
  Download,
  FileText,
  FileSpreadsheet,
  Table as TableIcon,
  ChevronRight
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

interface ReportFiltersProps {
  vehicles: any[]
}

const categories = [
  {
    id: "activity",
    title: "Transport Activity Report",
    description: "Overview of shipment volume, origins, destinations, and delivery status.",
    icon: Truck,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10"
  },
  {
    id: "performance",
    title: "Vehicle Performance Report",
    description: "Fuel efficiency, mileage, engine health, and diagnostic data.",
    icon: Activity,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10"
  },
  {
    id: "incident",
    title: "Incident Report",
    description: "Summary of accidents, breakdowns, delays, and safety events.",
    icon: ShieldAlert,
    color: "text-destructive",
    bg: "bg-destructive/10"
  },
  {
    id: "compliance",
    title: "Shipment Compliance Report",
    description: "HAZMAT regulations, documentation accuracy, and delivery times.",
    icon: FileCheck,
    color: "text-primary",
    bg: "bg-primary/10"
  }
]

export function ReportFilters({ vehicles }: ReportFiltersProps) {
  const [selectedCategory, setSelectedCategory] = React.useState("activity")

  const handleGenerate = () => {
    toast({
      title: "Generating Comprehensive Insights",
      description: "Compiling logistical telemetry into verified data structures.",
    })
  }

  return (
    <Card className="glass-card border-white/5 bg-white/[0.02] h-full flex flex-col">
      <CardHeader className="py-4 border-b border-white/5 bg-white/[0.02]">
        <CardTitle className="text-[10px] font-bold text-white uppercase tracking-widest">Report Configuration Matrix</CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-8 flex-1">
        {/* Row 1: Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Temporal Range</label>
            <div className="relative group">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-cyan-400" />
              <Input 
                value="Oct 1 – Oct 31, 2024" 
                readOnly 
                className="h-11 bg-black/20 border-white/10 pl-10 text-xs font-mono" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Fleet Unit Selection</label>
            <Select defaultValue="all">
              <SelectTrigger className="h-11 bg-black/20 border-white/10 text-xs uppercase font-bold tracking-tighter">
                <SelectValue placeholder="All Vehicles" />
              </SelectTrigger>
              <SelectContent className="bg-[#0a0f18] border-white/10">
                <SelectItem value="all">ALL VEHICLES</SelectItem>
                {vehicles.map((v) => (
                  <SelectItem key={v.id} value={v.id}>{v.licensePlate || v.id}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 2: Categories */}
        <div className="space-y-4">
          <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Report Intelligence Categories</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "flex flex-col text-left p-4 rounded-xl border transition-all duration-300 group",
                  selectedCategory === cat.id 
                    ? "bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.1)]" 
                    : "bg-white/5 border-white/5 hover:border-white/10"
                )}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn("p-2 rounded-lg", cat.bg)}>
                    <cat.icon className={cn("w-4 h-4", cat.color)} />
                  </div>
                  <h3 className="text-[11px] font-bold text-white uppercase tracking-wider">{cat.title}</h3>
                </div>
                <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">{cat.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Export Options */}
        <div className="space-y-4">
          <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Verified Export Formats</label>
          <div className="flex gap-3">
            {[
              { label: "PDF", icon: FileText, color: "text-red-400" },
              { label: "CSV", icon: FileSpreadsheet, color: "text-cyan-400" },
              { label: "Excel", icon: TableIcon, color: "text-emerald-400" },
            ].map((exp) => (
              <Button 
                key={exp.label} 
                variant="outline" 
                className="flex-1 h-12 bg-white/2 border-white/5 hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest gap-2"
              >
                <exp.icon className={cn("w-4 h-4", exp.color)} />
                {exp.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-4">
          <Button 
            onClick={handleGenerate}
            className="w-full h-14 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 text-white hover:border-cyan-500/50 hover:brightness-125 font-headline font-bold uppercase tracking-[0.3em] text-sm relative overflow-hidden group shadow-[0_0_30px_rgba(6,182,212,0.15)]"
          >
            <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
