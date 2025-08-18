"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Heart } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/providers/auth-provider"

export default function LoginPage() {
  const [cnic, setCnic] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cnic: cnic.replace(/\D/g, ""), password }),
      })

      const data = await response.json()
      if (response.ok) {
        login(data.user)
        router.push("/")
      } else {
        setError(data.message || "Login failed. Please try again.")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const formatCNIC = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    const match = cleaned.match(/^(\d{0,5})(\d{0,7})(\d{0,1})$/)
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join("-")
    }
    return cleaned
  }

  const handleCnicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCNIC(e.target.value)
    if (formatted.replace(/\D/g, "").length <= 13) {
      setCnic(formatted)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-700 to-cyan-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-800">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to continue supporting <span className="font-semibold text-blue-700">Khair Welfare</span></p>
        </div>

        {/* Card */}
        <Card className="rounded-2xl shadow-xl border border-gray-100 backdrop-blur bg-white/90">
          <CardHeader>
            <CardTitle className="text-center text-xl text-blue-700">Sign In</CardTitle>
            <CardDescription className="text-center text-gray-500">Access your donor dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* CNIC */}
              <div className="space-y-2">
                <Label htmlFor="cnic">CNIC Number</Label>
                <Input
                  id="cnic"
                  type="text"
                  autoComplete="off"
                  placeholder="12345-1234567-1"
                  value={cnic}
                  onChange={handleCnicChange}
                  required
                  className="text-center text-lg tracking-wider border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-400"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex items-center justify-end">
                <Link href="/forgot-password" className="text-sm text-blue-700 hover:underline">
                  Forgot password?
                </Link>
              </div>

              {/* Error */}
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              {/* Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-700 to-cyan-500 hover:from-cyan-500 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isLoading || cnic.replace(/\D/g, "").length !== 13}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Signup link */}
            <div className="mt-6 text-center text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-700 hover:underline font-medium">
                Sign up here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
