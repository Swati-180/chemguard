
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
  CheckCircle2,
  Navigation
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = React.useState<Record<string, boolean>>({
    admin: false,
    pharma: false,
    transporter: false
  })

  const [credentials, setCredentials] = React.useState({
    admin: { username: "", password: "" },
    pharma: { username: "", password: "" },
    transporter: { username: "", password: "" }
  })

  const togglePassword = (portal: string) => {
    setShowPassword(prev => ({ ...prev, [portal]: !prev[portal] }))
  }

  const handleInputChange = (portal: string, field: string, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [portal]: { ...prev[portal], [field]: value }
    }))
  }

  const handleLogin = (portal: string) => {
    const { username, password } = credentials[portal as keyof typeof credentials]

    if (portal === 'admin' && username === 'admin' && password === 'admin123') {
      toast({ title: "Access Granted", description: "Entering Admin Neural Operations Hub..." })
      router.push("/")
    } else if (portal === 'pharma' && username === 'pharma' && password === 'pharma123') {
      toast({ title: "Access Granted", description: "Entering Pharmaceutical Control Hub..." })
      router.push("/pharma/dashboard")
    } else if (portal === 'transporter' && username === 'transporter' && password === 'trans123') {
      toast({ title: "Access Granted", description: "Entering Logistics Monitoring Hub..." })
      router.push("/shipments")
    } else {
      toast({ 
        variant: "destructive", 
        title: "Access Denied", 
        description: "Invalid credentials for this security clearance level." 
      })
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0f18] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Molecular Background Pattern */}
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
      
      {/* Animated Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse delay-1000" />

      {/* Header */}
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

      {/* Login Portals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-7xl relative z-10">
        
        {/* Portal 1: Admin */}
        <PortalCard 
          title="Admin Portal"
          description="System monitoring and management dashboard."
          icon={Settings}
          color="primary"
          badges={["ISO 27001 Certified", "Multi-Factor Auth"]}
          demoCreds="admin / admin123"
          onLogin={() => handleLogin('admin')}
          username={credentials.admin.username}
          password={credentials.admin.password}
          onUserChange={(v) => handleInputChange('admin', 'username', v)}
          onPassChange={(v) => handleInputChange('admin', 'password', v)}
          showPass={showPassword.admin}
          togglePass={() => togglePassword('admin')}
          buttonText="Login to Admin"
        />

        {/* Portal 2: Pharma */}
        <PortalCard 
          title="Pharma Lab Portal"
          description="Chemical inventory and usage tracking."
          icon={Beaker}
          color="accent"
          badges={["FDA Compliant Logging", "Encrypted Storage"]}
          demoCreds="pharma / pharma123"
          onLogin={() => handleLogin('pharma')}
          username={credentials.pharma.username}
          password={credentials.pharma.password}
          onUserChange={(v) => handleInputChange('pharma', 'username', v)}
          onPassChange={(v) => handleInputChange('pharma', 'password', v)}
          showPass={showPassword.pharma}
          togglePass={() => togglePassword('pharma')}
          buttonText="Login to Lab"
        />

        {/* Portal 3: Transport */}
        <PortalCard 
          title="Transport Portal"
          description="Shipment tracking and checkpoint updates."
          icon={Truck}
          color="orange"
          badges={["Real-Time GPS Validated", "Checkpoint Verification"]}
          demoCreds="transporter / trans123"
          onLogin={() => handleLogin('transporter')}
          username={credentials.transporter.username}
          password={credentials.transporter.password}
          onUserChange={(v) => handleInputChange('transporter', 'username', v)}
          onPassChange={(v) => handleInputChange('transporter', 'password', v)}
          showPass={showPassword.transporter}
          togglePass={() => togglePassword('transporter')}
          buttonText="Login to Vehicle"
        />

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
  onLogin: () => void
  username: string
  password: string
  onUserChange: (v: string) => void
  onPassChange: (v: string) => void
  showPass: boolean
  togglePass: () => void
  buttonText: string
}

function PortalCard({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  badges, 
  demoCreds, 
  onLogin,
  username,
  password,
  onUserChange,
  onPassChange,
  showPass,
  togglePass,
  buttonText
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

        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Username</Label>
              {color === 'accent' && <span className="text-[8px] font-bold text-accent uppercase">FDA Compliant Logging</span>}
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <Input 
                placeholder="Enter username" 
                value={username}
                onChange={(e) => onUserChange(e.target.value)}
                className="pl-10 h-11 bg-white/5 border-white/10 focus-visible:ring-primary/50 text-sm" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Password</Label>
              <button 
                onClick={togglePass}
                className="text-[10px] font-bold text-muted-foreground hover:text-white uppercase tracking-tighter flex items-center gap-1"
              >
                {showPass ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                {showPass ? 'Hide' : 'Show'} Password
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <Input 
                type={showPass ? "text" : "password"} 
                placeholder="Enter password" 
                value={password}
                onChange={(e) => onPassChange(e.target.value)}
                className="pl-10 h-11 bg-white/5 border-white/10 focus-visible:ring-primary/50 text-sm" 
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={onLogin}
          className={cn(
            "w-full h-12 font-headline font-bold uppercase tracking-widest transition-all",
            btnMap[color]
          )}
        >
          {buttonText}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        <div className="text-center space-y-1">
          <p className="text-[9px] text-muted-foreground/40 uppercase tracking-widest">Demo Credentials</p>
          <p className="text-[10px] font-mono text-primary/60">{demoCreds}</p>
        </div>
      </CardContent>
    </Card>
  )
}
