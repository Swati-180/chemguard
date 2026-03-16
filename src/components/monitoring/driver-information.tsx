
"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const drivers = [
  { name: "Dr. Amelia", avatar: "driver-amelia", rating: 5, vehicle: "CGV-102" },
  { name: "L. Chen", avatar: "driver-chen", rating: 4, vehicle: "CGV-215" },
  { name: "A. Kumar", avatar: "driver-kumar", rating: 4, vehicle: "CGV-098" },
  { name: "J. Smith", avatar: "driver-smith", rating: 3, vehicle: "CGV-044" },
]

export function DriverInformation() {
  return (
    <Card className="glass-card border-white/5">
      <CardHeader className="py-4">
        <CardTitle className="text-xs font-headline font-semibold text-muted-foreground uppercase tracking-widest">Driver Information</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-white/5">
          {drivers.map((driver) => (
            <div key={driver.name} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border border-white/10 p-0.5 group-hover:border-primary/50 transition-colors">
                  <AvatarImage src={`https://picsum.photos/seed/${driver.avatar}/40/40`} />
                  <AvatarFallback className="text-[10px] bg-secondary">{driver.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-bold text-white">{driver.name}</p>
                  <p className="text-[10px] text-muted-foreground">Current: {driver.vehicle}</p>
                </div>
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "w-3 h-3", 
                      i < driver.rating ? "fill-primary text-primary" : "text-white/10"
                    )} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

import { cn } from "@/lib/utils"
