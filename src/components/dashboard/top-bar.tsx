"use client"

import { Search, Bell, User, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function TopBar() {
  return (
    <header className="h-16 border-b border-border/50 bg-background/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger className="md:hidden" />
        <div className="relative max-w-md w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input 
            placeholder="Search chemicals, shipments, alerts..." 
            className="pl-10 bg-white/5 border-white/10 focus-visible:ring-primary/50 placeholder:text-muted-foreground/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative hover:bg-white/5">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full neon-glow-red animate-pulse"></span>
        </Button>
        <div className="h-8 w-px bg-white/10 mx-2" />
        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">Dr. Elena Vance</p>
            <p className="text-xs text-muted-foreground">Admin Operations</p>
          </div>
          <Avatar className="h-9 w-9 border border-primary/20 p-0.5">
            <AvatarImage src="https://picsum.photos/seed/admin/40/40" />
            <AvatarFallback className="bg-secondary text-primary">EV</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
