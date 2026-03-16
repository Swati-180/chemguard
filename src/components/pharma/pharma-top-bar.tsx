"use client"

import { Search, Bell, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function PharmaTopBar() {
  return (
    <header className="h-16 border-b border-white/5 bg-[#0a0f18]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger className="md:hidden" />
        <div className="relative max-w-md w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 transition-colors group-focus-within:text-primary" />
          <Input 
            placeholder="Search usage logs, chemicals, technicians..." 
            className="pl-10 h-9 bg-white/5 border-white/5 focus-visible:ring-primary/20 placeholder:text-muted-foreground/30 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative hover:bg-white/5 text-muted-foreground">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-4 h-4 bg-destructive text-[8px] font-bold text-white rounded-full flex items-center justify-center border-2 border-[#0a0f18]">2</span>
        </Button>
        
        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <Avatar className="h-8 w-8 border border-white/10 p-0.5">
            <AvatarImage src="https://picsum.photos/seed/amelia/40/40" />
            <AvatarFallback className="bg-secondary text-primary">AR</AvatarFallback>
          </Avatar>
          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-white/90">Dr. Amelia Reed</p>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </div>
            <p className="text-[10px] text-muted-foreground font-medium -mt-0.5">Chief Chemist</p>
          </div>
        </div>
      </div>
    </header>
  )
}
