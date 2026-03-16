
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function NotificationSettings() {
  return (
    <Card className="glass-card bg-[#0f172a]/60 border-white/5 h-full">
      <CardHeader className="py-4 border-b border-white/5">
        <CardTitle className="text-sm font-headline font-bold text-white uppercase tracking-widest">Notification Settings</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center gap-6">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Alerts</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch className="data-[state=checked]:bg-destructive" defaultChecked />
              <Label className="text-[10px] font-bold text-destructive uppercase">Critical</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch className="data-[state=checked]:bg-orange-400" defaultChecked />
              <Label className="text-[10px] font-bold text-orange-400 uppercase">Warning</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch className="data-[state=checked]:bg-primary" defaultChecked />
              <Label className="text-[10px] font-bold text-primary uppercase">Info</Label>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Critical Alert Routing</p>
          
          <div className="space-y-3">
            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-5 flex items-center gap-2">
                <Switch className="data-[state=checked]:bg-destructive" />
                <Label className="text-[10px] font-bold text-muted-foreground uppercase truncate">Critical alert Group</Label>
              </div>
              <div className="col-span-7">
                <Select defaultValue="groups">
                  <SelectTrigger className="h-8 bg-white/5 border-white/10 text-[10px] uppercase font-bold">
                    <SelectValue placeholder="Select user groups" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="groups">Select user groups</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-5 flex items-center gap-2">
                <Switch className="data-[state=checked]:bg-accent" defaultChecked />
                <Label className="text-[10px] font-bold text-accent uppercase">System Popup <span className="text-white/40">(Active)</span></Label>
              </div>
              <div className="col-span-7">
                <Select disabled>
                  <SelectTrigger className="h-8 bg-white/2 border-white/5 text-[10px] uppercase font-bold opacity-50">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-5 flex items-center gap-2">
                <Switch className="data-[state=checked]:bg-accent" defaultChecked />
                <Label className="text-[10px] font-bold text-accent uppercase">Email <span className="text-white/40">(Active)</span></Label>
              </div>
              <div className="col-span-7">
                <Select defaultValue="admin">
                  <SelectTrigger className="h-8 bg-white/5 border-white/10 text-[10px] uppercase font-bold">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Select</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-5 flex items-center gap-2">
                <Switch className="data-[state=checked]:bg-accent" defaultChecked />
                <Label className="text-[10px] font-bold text-accent uppercase">SMS <span className="text-white/40">(Active)</span></Label>
              </div>
              <div className="col-span-7">
                <Select defaultValue="none">
                  <SelectTrigger className="h-8 bg-white/5 border-white/10 text-[10px] uppercase font-bold">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Select</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-4">
              <div className="col-span-5 flex items-center gap-2">
                <Switch className="data-[state=checked]:bg-accent" />
                <Label className="text-[10px] font-bold text-muted-foreground uppercase">Webhook</Label>
              </div>
              <div className="col-span-7">
                <Select defaultValue="none">
                  <SelectTrigger className="h-8 bg-white/5 border-white/10 text-[10px] uppercase font-bold">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Select</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
