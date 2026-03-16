"use client"

import { RoleGuard } from "@/components/auth/role-guard"

/**
 * Protection layout for the Admin Portal.
 * Only users with the 'admin' role can access sub-routes.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      {children}
    </RoleGuard>
  )
}
