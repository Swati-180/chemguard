
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function ApiConfiguration() {
  return (
    <Card className="glass-card bg-[#0f172a]/60 border-white/5 h-full">
      <CardHeader className="py-4 border-b border-white/5">
        <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">API Configuration</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Create API Key</Label>
          <Input 
            placeholder="Create API Key" 
            className="h-10 bg-white/5 border-white/10 text-xs placeholder:text-white/20" 
          />
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Scopes</p>
          <RadioGroup defaultValue="rw" className="flex gap-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rw" id="rw" className="border-primary text-primary" />
              <Label htmlFor="rw" className="text-[10px] font-bold text-white uppercase cursor-pointer">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  read/write
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="w" id="w" className="border-white/20" />
              <Label htmlFor="w" className="text-[10px] font-bold text-muted-foreground uppercase cursor-pointer">write</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Webhook Endpoint Settings</p>
          <div className="space-y-2">
            <div className="p-3 bg-white/2 border border-white/5 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-white/90">Core API Key</span>
                <span className="text-[10px] font-bold text-accent uppercase">(Active, read/write)</span>
              </div>
            </div>
            <div className="p-3 bg-white/2 border border-white/5 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-white/90">Sensor Read Key</span>
                <span className="text-[10px] font-bold text-accent uppercase">(Active, read-only)</span>
              </div>
            </div>
            <div className="p-3 bg-white/2 border border-white/5 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-white/90">Sensor Read Key</span>
                <span className="text-[10px] font-bold text-accent uppercase">(Active, read-only)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
