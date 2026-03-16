
"use client"

import { Search, Bell, LogOut } from "lucide-react"
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

export function TopBar() {
  const router = useRouter()
  const auth = useAuth()
  const { user } = useUser()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
      router.push("/login")
    }
  }

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
            <p className="text-sm font-medium">{user?.displayName || "System User"}</p>
            <p className="text-xs text-muted-foreground">SOC Operator</p>
          </div>
          <Avatar className="h-9 w-9 border border-primary/20 p-0.5">
            <AvatarImage src={`https://picsum.photos/seed/${user?.uid || 'user'}/40/40`} />
            <AvatarFallback className="bg-secondary text-primary">US</AvatarFallback>
          </Avatar>
        </div>

        <div className="h-8 w-px bg-white/10 mx-2" />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="h-9 gap-2 border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10 hover:text-destructive transition-all font-headline font-bold uppercase tracking-wider px-4"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="glass-card bg-background/95 border-white/10">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white font-headline font-bold uppercase tracking-widest">Security Logout Request</AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                Are you sure you want to logout? This will terminate your current session in the ChemGuard AI Control System.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleLogout}
                className="bg-destructive text-white hover:bg-destructive/90 font-bold uppercase tracking-widest"
              >
                Terminate Session
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  )
}
