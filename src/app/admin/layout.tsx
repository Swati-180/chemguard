
"use client"

import { RoleGuard } from "@/components/auth/role-guard"

/**
 * Protection layout for the Admin Portal.
 * Supports both uppercase and lowercase role variations for robustness.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleGuard allowedRoles={["admin", "Admin"]}>
      {children}
    </RoleGuard>
  )
}
