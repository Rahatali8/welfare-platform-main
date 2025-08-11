"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (res.ok) {
        router.push("/dashboard/admin")
      } else {
        const data = await res.json()
        setError(data.error || "Login failed")
      }
    } catch (e) {
      setError("Network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Admin Sign In</CardTitle>
          <CardDescription className="text-center">Use your admin credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <Input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button className="w-full" disabled={loading}>{loading? 'Signing in...' : 'Sign In'}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


