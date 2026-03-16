
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navigation, Thermometer, Lock as LockIcon } from "lucide-react"

const devices = [
  { name: "GPS Tracking Module (A1-G)", status: "Green/Active", icon: Navigation },
  { name: "Temperature Array (A1-T)", status: "Green/Active", icon: Thermometer },
  { name: "Tamper Sensor (A1-TA)", status: "Green/Active", icon: LockIcon },
]

export function HardwareIntegration() {
  return (
    <Card className="glass-card bg-[#0f172a]/60 border-white/5 h-full">
      <CardHeader className="py-4 border-b border-white/5">
        <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Hardware Integration</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Connected IoT Devices</p>
          <div className="space-y-2">
            {devices.map((device) => (
              <div key={device.name} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 bg-background border border-white/10 rounded">
                    <device.icon className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <span className="text-[11px] font-medium text-white/90">{device.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-[10px] font-bold text-accent uppercase">{device.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Field Update</Label>
            <Select defaultValue="action">
              <SelectTrigger className="h-9 bg-white/5 border-white/10 text-[10px] uppercase font-bold">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="action">Action</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Field Update</Label>
            <Select defaultValue="update">
              <SelectTrigger className="h-9 bg-white/5 border-white/10 text-[10px] uppercase font-bold">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="update">Select</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Protocol</p>
          <RadioGroup defaultValue="mqtt" className="flex gap-6">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mqtt" id="mqtt" className="border-primary text-primary" />
              <Label htmlFor="mqtt" className="text-[10px] font-bold text-white uppercase cursor-pointer">
                MQTT <span className="text-accent">(Active)</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="coap" id="coap" className="border-white/20" />
              <Label htmlFor="coap" className="text-[10px] font-bold text-muted-foreground uppercase cursor-pointer">CoAP</Label>
            </div>
          </RadioGroup>
        </div>
      </CardContent>
    </Card>
  )
}
