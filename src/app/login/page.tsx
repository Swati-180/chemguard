
"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Shield, 
  Settings, 
  Beaker, 
  Truck, 
  Eye, 
  EyeOff, 
  Lock, 
  User,
  ArrowRight,
  ShieldCheck,
  Database,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useAuth, useFirestore, useUser } from "@/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"

/**
 * ChemGuard AI Login Page.
 * Authenticates users via Firebase Auth and redirects based on their Firestore role.
 */
export default function LoginPage() {
  const router = useRouter()
  const auth = useAuth()
  const db = useFirestore()
  const { user, isUserLoading } = useUser()
  const [isProvisioning, setIsProvisioning] = React.useState(false)
  const [isVerifying, setIsVerifying] = React.useState(false)
  
  const [showPassword, setShowPassword] = React.useState<Record<string, boolean>>({
    admin: false,
    pharma: false,
    transporter: false
  })

  const [credentials, setCredentials] = React.useState({
    admin: { email: "", password: "" },
    pharma: { email: "", password: "" },
    transporter: { email: "", password: "" }
  })

  // Automatic redirect if already logged in or after successful login
  React.useEffect(() => {
    if (!isUserLoading && user) {
      const fetchRoleAndRedirect = async () => {
        setIsVerifying(true)
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            const role = userData.role
            
            if (role === 'admin') {
              router.push("/admin/dashboard")
            } else if (role === 'pharma') {
              router.push("/pharma/dashboard")
            } else if (role === 'transporter') {
              router.push("/transport/dashboard")
            } else {
              router.push("/")
            }
          } else {
            // User exists in Auth but has no profile in Firestore
            toast({
              variant: "destructive",
              title: "Profile Not Found",
              description: "Your account is authenticated but no system profile was found. Please contact an administrator or initialize demo accounts."
            })
            // Sign out to prevent redirect loop
            await signOut(auth)
          }
        } catch (error) {
          console.error("Session check failed:", error)
          await signOut(auth)
        } finally {
          setIsVerifying(false)
        }
      }
      fetchRoleAndRedirect()
    }
  }, [user, isUserLoading, db, router, auth])

  const handleProvisionDemoData = async () => {
    setIsProvisioning(true)
    const demoUsers = [
      { email: "admin@chemguard.ai", password: "admin123", role: "admin", name: "Dr. Elena Vance" },
      { email: "pharma@chemguard.ai", password: "pharma123", role: "pharma", name: "Pharma Lab User" },
      { email: "transport@chemguard.ai", password: "transport123", role: "transporter", name: "K. Kumar" }
    ]

    toast({ title: "Initialization Started", description: "Provisioning secure demo environment..." })

    try {
      for (const u of demoUsers) {
        try {
          // Attempt to create auth user
          const userCredential = await createUserWithEmailAndPassword(auth, u.email, u.password)
          const uid = userCredential.user.uid

          // Store profile in 'users' collection
          await setDoc(doc(db, "users", uid), {
            id: uid,
            name: u.name,
            email: u.email,
            role: u.role,
            createdAt: new Date().toISOString()
          })

          // Store in role check collections for legacy support
          if (u.role === 'admin') await setDoc(doc(db, "roles_admin", uid), { active: true })
          if (u.role === 'pharma') await setDoc(doc(db, "roles_pharma", uid), { active: true })
          if (u.role === 'transporter') await setDoc(doc(db, "roles_transporter", uid), { active: true })

        } catch (e: any) {
          if (e.code !== 'auth/email-already-in-use') {
            throw e
          }
        }
      }
      
      await signOut(auth)
      toast({ title: "Setup Complete", description: "Demo accounts are ready. You can now login." })
    } catch (error: any) {
      toast({ variant: "destructive", title: "Setup Failed", description: error.message })
    } finally {
      setIsProvisioning(false)
    }
  }

  const togglePassword = (portal: string) => {
    setShowPassword(prev => ({ ...prev, [portal]: !prev[portal] }))
  }

  const handleInputChange = (portal: string, field: string, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [portal]: { ...prev[portal], [field]: value }
    }))
  }

  const handleLogin = (portal: string, e?: React.FormEvent) => {
    if (e) e.preventDefault()
    
    const { email, password } = credentials[portal as keyof typeof credentials]

    if (!email || !password) {
      toast({ 
        variant: "destructive", 
        title: "Missing Credentials", 
        description: "Please enter both email and password." 
      })
      return
    }

    const trimmedEmail = email.trim()
    toast({ title: "Authenticating", description: "Verifying security credentials..." })

    signInWithEmailAndPassword(auth, trimmedEmail, password)
      .catch((error: any) => {
        toast({ 
          variant: "destructive", 
          title: "Access Denied", 
          description: "Access Denied: The email or password entered is incorrect."
        })
      })
  }

  if (isUserLoading || isVerifying) {
    return (
      <div className="min-h-screen w-full bg-[#0a0f18] flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] animate-pulse">
            Establishing Secure Satellite Link
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
          description="System monitoring and management dashboard."
          icon={Settings}
          color="primary"
          badges={["ISO 27001 Certified", "Multi-Factor Auth"]}
          demoCreds="admin@chemguard.ai / admin123"
          onLogin={(e) => handleLogin('admin', e)}
          email={credentials.admin.email}
          password={credentials.admin.password}
          onEmailChange={(v) => handleInputChange('admin', 'email', v)}
          onPassChange={(v) => handleInputChange('admin', 'password', v)}
          showPass={showPassword.admin}
          togglePass={() => togglePassword('admin')}
          buttonText="Login to Admin"
          emailId="admin-email"
          passwordId="admin-password"
        />

        <PortalCard 
          title="Pharma Lab Portal"
          description="Chemical inventory and usage tracking."
          icon={Beaker}
          color="accent"
          badges={["FDA Compliant Logging", "Encrypted Storage"]}
          demoCreds="pharma@chemguard.ai / pharma123"
          onLogin={(e) => handleLogin('pharma', e)}
          email={credentials.pharma.email}
          password={credentials.pharma.password}
          onEmailChange={(v) => handleInputChange('pharma', 'email', v)}
          onPassChange={(v) => handleInputChange('pharma', 'password', v)}
          showPass={showPassword.pharma}
          togglePass={() => togglePassword('pharma')}
          buttonText="Login to Lab"
          emailId="email"
          passwordId="password"
        />

        <PortalCard 
          title="Transport Portal"
          description="Shipment tracking and checkpoint updates."
          icon={Truck}
          color="orange"
          badges={["Real-Time GPS Validated", "Checkpoint Verification"]}
          demoCreds="transport@chemguard.ai / transport123"
          onLogin={(e) => handleLogin('transporter', e)}
          email={credentials.transporter.email}
          password={credentials.transporter.password}
          onEmailChange={(v) => handleInputChange('transporter', 'email', v)}
          onPassChange={(v) => handleInputChange('transporter', 'password', v)}
          showPass={showPassword.transporter}
          togglePass={() => togglePassword('transporter')}
          buttonText="Login to Vehicle"
          emailId="transport-email"
          passwordId="transport-password"
        />
      </div>

      <div className="mt-12 relative z-10">
        <Button 
          variant="outline" 
          disabled={isProvisioning}
          onClick={handleProvisionDemoData}
          className="border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 font-headline font-bold uppercase tracking-widest text-[10px] h-10 px-6 gap-2"
        >
          <Database className={cn("w-3.5 h-3.5", isProvisioning && "animate-spin")} />
          {isProvisioning ? "Provisioning..." : "Initialize Demo Accounts"}
        </Button>
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
  demoCreds: string
  onLogin: (e: React.FormEvent) => void
  email: string
  password: string
  onEmailChange: (v: string) => void
  onPassChange: (v: string) => void
  showPass: boolean
  togglePass: () => void
  buttonText: string
  emailId: string
  passwordId: string
}

function PortalCard({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  badges, 
  demoCreds, 
  onLogin,
  email,
  password,
  onEmailChange,
  onPassChange,
  showPass,
  togglePass,
  buttonText,
  emailId,
  passwordId
}: PortalCardProps) {
  const colorMap = {
    primary: "text-primary border-primary/20 bg-primary/5 hover:border-primary/40 shadow-primary/10",
    accent: "text-accent border-accent/20 bg-accent/5 hover:border-accent/40 shadow-accent/10",
    orange: "text-orange-400 border-orange-400/20 bg-orange-400/5 hover:border-orange-400/40 shadow-orange-400/10"
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

        <form onSubmit={onLogin} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor={emailId} className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Email</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <Input 
                id={emailId}
                type="email"
                placeholder="Enter email" 
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                className="pl-10 h-11 bg-white/5 border-white/10 focus-visible:ring-primary/50 text-sm" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor={passwordId} className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Password</Label>
              <button 
                type="button"
                onClick={togglePass}
                className="text-[10px] font-bold text-muted-foreground hover:text-white uppercase tracking-tighter flex items-center gap-1"
              >
                {showPass ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                {showPass ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <Input 
                id={passwordId}
                type={showPass ? "text" : "password"} 
                placeholder="Enter password" 
                value={password}
                onChange={(e) => onPassChange(e.target.value)}
                className="pl-10 h-11 bg-white/5 border-white/10 focus-visible:ring-primary/50 text-sm" 
              />
            </div>
          </div>

          <Button 
            type="submit"
            className={cn(
              "w-full h-12 font-headline font-bold uppercase tracking-widest transition-all mt-4",
              btnMap[color]
            )}
          >
            {buttonText}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <div className="text-center space-y-1">
          <p className="text-[9px] text-muted-foreground/40 uppercase tracking-widest">Demo Credentials</p>
          <p className="text-[10px] font-mono text-primary/60">{demoCreds}</p>
        </div>
      </CardContent>
    </Card>
  )
}
