
"use client"

import { RoleGuard } from "@/components/auth/role-guard"

/**
 * Access protection for chemical management.
 * Admins and Pharma Lab users can access this page.
 */
export default function ChemicalsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleGuard allowedRoles={["admin", "pharma"]}>
      {children}
    </RoleGuard>
  )
}
