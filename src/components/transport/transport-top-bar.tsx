"use client"

import { Search, Bell, ChevronDown, LogOut, ShieldCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useAuth, useUser } from "@/firebase"
import { signOut } from "firebase/auth"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function TransportTopBar() {
  const router = useRouter()
  const auth = useAuth()
  const { user } = useUser()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/login")
    } catch (error) {
      router.push("/login")
    }
  }

  return (
    <header className="h-16 border-b border-white/5 bg-[#0a0f18]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <SidebarTrigger className="md:hidden" />
        <div className="relative max-w-md w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 transition-colors group-focus-within:text-orange-400" />
          <Input 
            placeholder="Search shipments, vehicles, routes..." 
            className="pl-10 h-9 bg-white/5 border-white/5 focus-visible:ring-orange-500/20 placeholder:text-muted-foreground/30 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mr-4">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Secure Link Active</span>
        </div>

        <Button variant="ghost" size="icon" className="relative hover:bg-white/5 text-muted-foreground">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-4 h-4 bg-orange-500 text-[8px] font-bold text-white rounded-full flex items-center justify-center border-2 border-[#0a0f18]">3</span>
        </Button>
        
        <div className="h-8 w-px bg-white/10 mx-2" />

        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <Avatar className="h-8 w-8 border border-orange-500/20 p-0.5">
            <AvatarImage src={`https://picsum.photos/seed/${user?.uid}/40/40`} />
            <AvatarFallback className="bg-orange-500/10 text-orange-400">TR</AvatarFallback>
          </Avatar>
          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-white/90">{user?.displayName || "Logistics Operator"}</p>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </div>
            <p className="text-[10px] text-muted-foreground font-medium -mt-0.5">Fleet Logistics</p>
          </div>
        </div>

        <div className="h-8 w-px bg-white/10 mx-2" />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="glass-card bg-[#0a0f18]/95 border-white/10">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white font-headline font-bold uppercase tracking-widest">Terminate Logistics Session</AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                Confirm session termination. Active tracking relays will remain connected to the SOC but your management interface will close.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">Abort</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleLogout}
                className="bg-destructive text-white hover:bg-destructive/90 font-bold uppercase tracking-widest"
              >
                Disconnect
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  )
}
