"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Truck, 
  Beaker, 
  BrainCircuit, 
  FileDown, 
  Calendar as CalendarIcon, 
  Download,
  FileText,
  Table as TableIcon
} from "lucide-react"
import { cn } from "@/lib/utils"

const reportTypes = [
  { id: 'shipment', label: 'Shipment Reports', icon: Truck },
  { id: 'chemical', label: 'Chemical Usage Reports', icon: Beaker },
  { id: 'risk', label: 'AI Risk Reports', icon: BrainCircuit },
]

export function ReportGenerationCenter() {
  const [activeType, setActiveType] = React.useState('shipment')

  return (
    <Card className="glass-card border-white/5 bg-[#0f172a]/60">
      <CardHeader className="py-4 border-b border-white/5 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Reports Generation & Download Center</CardTitle>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">October 14, 2024 | 14:40 GMT</p>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Selection */}
          <div className="lg:col-span-3 space-y-3">
            {reportTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left group",
                  activeType === type.id 
                    ? "bg-primary/10 border-primary/50 text-primary shadow-[0_0_15px_rgba(46,222,255,0.1)]" 
                    : "bg-white/5 border-white/5 text-muted-foreground hover:bg-white/10"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  activeType === type.id ? "bg-primary/20" : "bg-white/5 group-hover:bg-white/10"
                )}>
                  <type.icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-headline font-bold uppercase tracking-wider leading-tight">
                  {type.label}
                </span>
              </button>
            ))}
          </div>

          {/* Middle Column: Filters */}
          <div className="lg:col-span-9 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <Input 
                    value="October 14, 2024 - November 14, 2024" 
                    readOnly
                    className="h-10 pl-10 bg-white/5 border-white/10 text-xs text-white"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-[10px] uppercase font-bold h-10">
                      <SelectValue placeholder="Selected Chemical" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="c1">Ammonium Nitrate</SelectItem>
                      <SelectItem value="c2">Sulphuric Acid</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-[10px] uppercase font-bold h-10">
                      <SelectValue placeholder="Bip Route" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="r1">North Atlantic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-[10px] uppercase font-bold h-10">
                      <SelectValue placeholder="Ship Route" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="s1">Maritime-04</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-[10px] uppercase font-bold h-10">
                      <SelectValue placeholder="Select a Selection" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Items</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-4 justify-center pl-4 border-l border-white/5">
                <div className="flex items-center space-x-2">
                  <Checkbox id="action" className="border-primary data-[state=checked]:bg-primary" defaultChecked />
                  <label htmlFor="action" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest cursor-pointer">Action Required</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="compliance" className="border-primary data-[state=checked]:bg-primary" />
                  <label htmlFor="compliance" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest cursor-pointer">Compliance Only</label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Download Options</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-destructive/10 rounded-lg">
                      <FileText className="w-5 h-5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-white uppercase">PDF Report</p>
                      <p className="text-[9px] text-muted-foreground">Download PDF (3.5 MB)</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                </div>
                
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileDown className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-white uppercase">CSV Data</p>
                      <p className="text-[9px] text-muted-foreground">Download CSV (3.2 MB)</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                </div>

                <div className="p-4 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between group hover:border-primary/30 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <TableIcon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-white uppercase">Excel Spreadsheet</p>
                      <p className="text-[9px] text-muted-foreground">Download ED (3.5 MB)</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                </div>
              </div>
            </div>

            <Button className="w-full h-12 bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30 font-headline font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(46,222,255,0.1)]">
              Generate & Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
