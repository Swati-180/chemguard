"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Shield, 
  Settings, 
  Beaker, 
  Truck, 
  Lock, 
  ArrowRight,
  ShieldCheck,
  Database,
  Loader2,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useAuth, useFirestore, useUser } from "@/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

/**
 * ChemGuard AI Login Page.
 * Supports one-click demo login with automatic account initialization.
 */
export default function LoginPage() {
  const router = useRouter()
  const auth = useAuth()
  const db = useFirestore()
  const { user, isUserLoading } = useUser()
  
  const [isInitializing, setIsInitializing] = React.useState(false)
  const [isVerifying, setIsVerifying] = React.useState(false)

  const demoCreds = {
    admin: { 
      email: "admin@chemguard.ai", 
      password: "admin123",
      role: "admin",
      name: "System Admin"
    },
    pharma: { 
      email: "pharma@chemguard.ai", 
      password: "pharma123",
      role: "pharma",
      name: "Pharma Lab User"
    },
    transporter: { 
      email: "transport@chemguard.ai", 
      password: "transport123",
      role: "transporter",
      name: "Transport Logistics"
    }
  }

  /**
   * Automatically initializes demo accounts if they don't exist.
   * Runs on app startup and on failed login attempts.
   */
  const initializeDemoAccounts = async () => {
    setIsInitializing(true)
    const accounts = [demoCreds.admin, demoCreds.pharma, demoCreds.transporter]

    try {
      for (const account of accounts) {
        let uid = ""
        try {
          // Attempt sign in to see if account exists
          const userCred = await signInWithEmailAndPassword(auth, account.email, account.password)
          uid = userCred.user.uid
        } catch (error: any) {
          if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-email') {
            try {
              // Create new authentication user
              const userCred = await createUserWithEmailAndPassword(auth, account.email, account.password)
              uid = userCred.user.uid
            } catch (createError: any) {
              continue
            }
          } else {
            continue
          }
        }

        if (uid) {
          // Sync profile to Firestore collection "users"
          await setDoc(doc(db, "users", uid), {
            id: uid,
            email: account.email,
            role: account.role,
            name: account.name,
            createdAt: new Date().toISOString()
          }, { merge: true })

          // Also set legacy role check collections for security rules compatibility
          const roleMap: Record<string, string> = {
            admin: "roles_admin",
            pharma: "roles_pharma",
            transporter: "roles_transporter"
          }
          await setDoc(doc(db, roleMap[account.role], uid), { active: true }, { merge: true })
        }
      }
      
      // Ensure we are signed out after initialization to allow clean one-click login
      await signOut(auth)
    } catch (error) {
      // Initialization error handled silently
    } finally {
      setIsInitializing(false)
    }
  }

  // Auto-initialize demo accounts on mount
  React.useEffect(() => {
    const hasInit = localStorage.getItem('chemguard_demo_init')
    if (!hasInit) {
      initializeDemoAccounts().then(() => {
        localStorage.setItem('chemguard_demo_init', 'true')
      })
    }
  }, [])

  // Automatic redirect if already logged in
  React.useEffect(() => {
    if (!isUserLoading && user && !isInitializing && !isVerifying) {
      const fetchRoleAndRedirect = async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid))
          if (userDoc.exists()) {
            const role = userDoc.data().role
            if (role === 'admin') router.push("/admin/dashboard")
            else if (role === 'pharma') router.push("/pharma/dashboard")
            else if (role === 'transporter') router.push("/transport/dashboard")
            else await signOut(auth)
          } else {
            // Profile missing, might need re-init
            await signOut(auth)
          }
        } catch (error) {
          await signOut(auth)
        }
      }
      fetchRoleAndRedirect()
    }
  }, [user, isUserLoading, isInitializing, isVerifying, db, router, auth])

  const handleLogin = async (portal: 'admin' | 'pharma' | 'transporter') => {
    const creds = demoCreds[portal]
    setIsVerifying(true)

    try {
      await signInWithEmailAndPassword(auth, creds.email, creds.password)
    } catch (error: any) {
      // If auth fails, try initializing demo accounts and retry once
      try {
        await initializeDemoAccounts()
        await signInWithEmailAndPassword(auth, creds.email, creds.password)
      } catch (retryError: any) {
        setIsVerifying(false)
        toast({ 
          variant: "destructive", 
          title: "Demo login failed", 
          description: "Please click the initialize button at the bottom." 
        })
      }
    }
  }

  if (isUserLoading || isVerifying || isInitializing) {
    return (
      <div className="min-h-screen w-full bg-[#0a0f18] flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] animate-pulse text-center">
            {isInitializing ? "Initializing Secure Demo Environment" : "Establishing Secure Satellite Link"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0f18] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background patterns and glows */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
              <path d="M25 0.75 L46.65 13.25 L46.65 38.25 L25 50.75 L3.35 38.25 L3.35 13.25 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>
      
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse delay-1000" />

      <header className="text-center space-y-2 mb-12 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_20px_rgba(46,222,255,0.3)]">
            <Shield className="w-7 h-7 text-background" fill="currentColor" />
          </div>
          <h1 className="text-4xl font-headline font-bold tracking-tight text-white">
            ChemGuard <span className="text-primary">AI</span> Control System
          </h1>
        </div>
        <p className="text-muted-foreground uppercase tracking-[0.3em] text-xs">Secure Chemical Supply Chain Monitoring</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl relative z-10">
        <PortalCard 
          title="Admin Portal"
          description="System monitoring and global management console."
          icon={Settings}
          color="primary"
          badges={["ISO 27001 Certified", "Global Admin"]}
          onLogin={() => handleLogin('admin')}
          buttonText="Login to Admin"
        />

        <PortalCard 
          title="Pharma Lab Portal"
          description="Chemical inventory and laboratory tracking."
          icon={Beaker}
          color="accent"
          badges={["FDA Compliant", "Lab Manager"]}
          onLogin={() => handleLogin('pharma')}
          buttonText="Login to Lab"
        />

        <PortalCard 
          title="Transport Portal"
          description="Shipment tracking and logistics monitoring."
          icon={Truck}
          color="orange"
          badges={["GPS Validated", "Transporter"]}
          onLogin={() => handleLogin('transporter')}
          buttonText="Login to Transport"
        />
      </div>

      <div className="mt-12 flex flex-col items-center gap-4 relative z-10">
        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl max-w-md text-center">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest flex items-center justify-center gap-2 mb-2">
            <AlertCircle className="w-3 h-3 text-orange-400" />
            One-Click Demo Mode
          </p>
          <p className="text-[11px] text-white/60 leading-relaxed mb-4">
            If login fails, click the button below to re-initialize the demo accounts in the cloud.
          </p>
          <Button 
            variant="outline" 
            disabled={isInitializing}
            onClick={initializeDemoAccounts}
            className="w-full border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 font-headline font-bold uppercase tracking-widest text-[10px] h-12 px-6 gap-2"
          >
            <Database className={cn("w-4 h-4", isInitializing && "animate-spin")} />
            {isInitializing ? "Initializing..." : "Initialize Demo Accounts"}
          </Button>
        </div>
      </div>

      <footer className="mt-16 text-[10px] text-muted-foreground uppercase tracking-[0.2em] relative z-10 opacity-50">
        &copy; 2024 ChemGuard AI Enterprise Security System | Neural Operations Hub v4.2.1
      </footer>
    </div>
  )
}

interface PortalCardProps {
  title: string
  description: string
  icon: any
  color: 'primary' | 'accent' | 'orange'
  badges: string[]
  onLogin: () => void
  buttonText: string
}

function PortalCard({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  badges, 
  onLogin,
  buttonText
}: PortalCardProps) {
  const colorMap = {
    primary: "text-primary border-primary/20 bg-primary/5 shadow-primary/10",
    accent: "text-accent border-accent/20 bg-accent/5 shadow-accent/10",
    orange: "text-orange-400 border-orange-400/20 bg-orange-400/5 shadow-orange-400/10"
  }

  const btnMap = {
    primary: "bg-primary/20 text-primary border-primary/30 hover:bg-primary/30 shadow-[0_0_15px_rgba(46,222,255,0.1)]",
    accent: "bg-accent/20 text-accent border-accent/30 hover:bg-accent/30 shadow-[0_0_15px_rgba(163,244,190,0.1)]",
    orange: "bg-orange-400/20 text-orange-400 border-orange-400/30 hover:bg-orange-400/30 shadow-[0_0_15px_rgba(251,146,60,0.1)]"
  }

  return (
    <Card className={cn(
      "glass-card border-white/5 bg-white/5 backdrop-blur-xl transition-all duration-500 group overflow-hidden",
      "hover:bg-white/[0.08]"
    )}>
      <CardContent className="p-8 space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={cn(
            "p-4 rounded-2xl border transition-all duration-500 bg-background",
            colorMap[color]
          )}>
            <Icon className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-headline font-bold text-white uppercase tracking-wider">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {badges.map((badge, i) => (
            <Badge key={i} variant="outline" className="text-[8px] uppercase tracking-tighter border-white/10 bg-white/5 text-muted-foreground py-0 h-5">
              {i === 0 ? <ShieldCheck className="w-2.5 h-2.5 mr-1" /> : <Lock className="w-2.5 h-2.5 mr-1" />}
              {badge}
            </Badge>
          ))}
        </div>

        <Button 
          onClick={onLogin}
          className={cn(
            "w-full h-14 font-headline font-bold uppercase tracking-widest transition-all mt-4",
            btnMap[color]
          )}
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}
