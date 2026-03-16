"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const chartData = [
  { month: "Monthly", passes: 40, findings: 25 },
  { month: "Q1 2024", passes: 65, findings: 30 },
  { month: "Monthly", passes: 45, findings: 20 },
  { month: "Q2 2024", passes: 75, findings: 35 },
  { month: "Monthly", passes: 50, findings: 25 },
  { month: "Q3 2024", passes: 85, findings: 40 },
]

const findings = [
  { facility: "Facility Y", type: "EPA (RCRA)", issue: "Missing Log (Batch X)", status: "Investigating" },
  { facility: "Facility Y", type: "EPA (RCRA)", issue: "Missing Log (Batch X)", status: "Investigating" },
  { facility: "Facility Y", type: "EPA (RCRA)", issue: "Missing Log (Batch X)", status: "Investigating" },
  { facility: "Facility Y", type: "EPA (RCRA)", issue: "Missing Log (Batch X)", status: "Investigating" },
]

export function InspectionResultsChart() {
  return (
    <Card className="glass-card border-white/5 bg-[#0f172a]/40 h-full">
      <CardHeader className="py-3 border-b border-white/5">
        <CardTitle className="text-xs font-headline font-bold text-white uppercase tracking-widest">Inspection Results & Finding Summary | Q3 2024</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex flex-col h-full">
        <div className="h-[200px] p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.3)', fontSize: 7}} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' }}
                itemStyle={{ fontSize: '8px' }}
              />
              <Bar dataKey="passes" stackId="a" fill="hsl(var(--accent))" radius={[0, 0, 0, 0]} barSize={15} />
              <Bar dataKey="findings" stackId="a" fill="hsl(var(--destructive))" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-4 mt-1 text-[7px] uppercase font-bold text-muted-foreground">
             <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-accent" /> Passes</div>
             <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-destructive" /> Findings</div>
          </div>
        </div>

        <div className="flex-1 border-t border-white/5 overflow-hidden">
          <Table>
            <TableHeader className="bg-white/2">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-[8px] font-bold uppercase h-8 px-3">Finding</TableHead>
                <TableHead className="text-[8px] font-bold uppercase h-8 px-3">Finding</TableHead>
                <TableHead className="text-[8px] font-bold uppercase h-8 px-3">Finding</TableHead>
                <TableHead className="text-[8px] font-bold uppercase h-8 px-3">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {findings.map((f, i) => (
                <TableRow key={i} className="border-white/5 hover:bg-white/5 h-8">
                  <TableCell className="py-1 text-[8px] text-muted-foreground px-3">{f.facility}</TableCell>
                  <TableCell className="py-1 text-[8px] text-muted-foreground px-3">{f.type}</TableCell>
                  <TableCell className="py-1 text-[8px] text-muted-foreground px-3 truncate max-w-[80px]">{f.issue}</TableCell>
                  <TableCell className="py-1 text-[8px] text-orange-400 font-bold px-3">{f.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
