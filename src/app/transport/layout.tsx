"use client"

import { RoleGuard } from "@/components/auth/role-guard"

/**
 * Protection layout for the Transport Portal.
 * Only users with the 'transporter' role can access sub-routes.
 */
export default function TransportLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleGuard allowedRoles={["transporter"]}>
      {children}
    </RoleGuard>
  )
}
