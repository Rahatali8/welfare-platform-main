"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface AdminProfile {
  id: number
  name: string
  email: string
  cnic: string
  created_at: string
}

export default function AdminProfilePage() {
  const [admin, setAdmin] = useState<AdminProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/profile", { credentials: "include" })
        if (res.status === 401) {
          router.push("/admin/login")
          return
        }
        if (res.ok) {
          const data = await res.json()
          setAdmin(data.admin)
        }
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Profile not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Admin Profile</CardTitle>
            <Badge>Admin</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Name</div>
                <div className="font-semibold">{admin.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-semibold">{admin.email}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">CNIC</div>
                <div className="font-mono">{admin.cnic}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Joined</div>
                <div className="font-semibold">{new Date(admin.created_at).toLocaleString()}</div>
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={() => router.push("/dashboard/admin")}>Back to Dashboard</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


