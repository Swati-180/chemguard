"use client"

import { useUser, useFirestore } from "@/firebase"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { Skeleton } from "@/components/ui/skeleton"

interface RoleGuardProps {
  children: React.ReactNode
  allowedRoles: string[]
}

/**
 * RoleGuard component protects client-side routes by checking the user's role in Firestore.
 * It handles loading states and redirects unauthorized users to their appropriate dashboard.
 */
export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
  const { user, isUserLoading } = useUser()
  const db = useFirestore()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [checkingRole, setCheckingRole] = useState(true)

  useEffect(() => {
    if (isUserLoading) return

    // Redirect to login if not authenticated
    if (!user) {
      router.push("/login")
      return
    }

    async function checkRole() {
      try {
        const userDocRef = doc(db, "users", user!.uid)
        const userDoc = await getDoc(userDocRef)

        if (userDoc.exists()) {
          const userData = userDoc.data()
          const userRole = userData.role

          if (allowedRoles.includes(userRole)) {
            setIsAuthorized(true)
          } else {
            // Unauthorized for this section, redirect to their specific portal
            if (userRole === 'admin') {
              router.push("/admin/dashboard")
            } else if (userRole === 'pharma') {
              router.push("/pharma/dashboard")
            } else if (userRole === 'transporter') {
              router.push("/transport/dashboard")
            } else {
              router.push("/login")
            }
          }
        } else {
          // No profile found in Firestore
          router.push("/login")
        }
      } catch (error) {
        console.error("Error checking role:", error)
        router.push("/login")
      } finally {
        setCheckingRole(false)
      }
    }

    checkRole()
  }, [user, isUserLoading, allowedRoles, db, router])

  // Show technical loading UI during verification
  if (isUserLoading || checkingRole) {
    return (
      <div className="min-h-screen bg-[#0a0f18] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons-load" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                <path d="M25 0.75 L46.65 13.25 L46.65 38.25 L25 50.75 L3.35 38.25 L3.35 13.25 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons-load)" />
          </svg>
        </div>
        <div className="space-y-6 w-full max-w-md text-center z-10">
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin shadow-[0_0_20px_rgba(46,222,255,0.3)]" />
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] animate-pulse">Authenticating Security Credentials</p>
            <Skeleton className="h-2 w-full bg-white/5" />
          </div>
        </div>
      </div>
    )
  }

  return isAuthorized ? <>{children}</> : null
}
