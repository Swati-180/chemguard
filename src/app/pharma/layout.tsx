"use client"

import { RoleGuard } from "@/components/auth/role-guard"

/**
 * Protection layout for the Pharma Lab Portal.
 * Only users with the 'pharma' role can access sub-routes.
 */
export default function PharmaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleGuard allowedRoles={["pharma"]}>
      {children}
    </RoleGuard>
  )
}
