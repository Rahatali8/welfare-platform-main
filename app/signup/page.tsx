"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Heart, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    cnic: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    password: "",
    confirmPassword: "",
    role: "user",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
      } else {
        setError(data.error || "Signup failed. Please try again.")
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.")
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

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    const match = cleaned.match(/^(\d{0,4})(\d{0,7})$/)
    if (match) {
      return [match[1], match[2]].filter(Boolean).join("-")
    }
    return cleaned
  }

  const handleInputChange = (field: string, value: string) => {
    if (field === "cnic") {
      const formatted = formatCNIC(value)
      if (formatted.replace(/\D/g, "").length <= 13) {
        setFormData((prev) => ({ ...prev, [field]: formatted }))
      }
    } else if (field === "phone") {
      const formatted = formatPhone(value)
      if (formatted.replace(/\D/g, "").length <= 11) {
        setFormData((prev) => ({ ...prev, [field]: formatted }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">Account Created Successfully!</h2>
              <p className="text-gray-600 mb-6">
                Welcome to Khair Welfare Program! Your account has been created and you can now access all our services
                and apply for assistance.
              </p>
              <Button className="w-full bg-[#1e3a8a] hover:bg-[#1e40af]" asChild>
                <Link href="/login">Sign In to Your Account</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[#1e3a8a]">Join Khair Welfare</h2>
          <p className="mt-2 text-gray-600">Create your account to access our services</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-[#1e3a8a]">Create Account</CardTitle>
            <CardDescription className="text-center">Fill in your information to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnic">CNIC Number *</Label>
                  <Input
                    id="cnic"
                    type="text"
                    placeholder="12345-1234567-1"
                    value={formData.cnic}
                    onChange={(e) => handleInputChange("cnic", e.target.value)}
                    required
                    className="text-center tracking-wider"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="0300-1234567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required // ✅ ADD THIS
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Account Type *</Label>
                  <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">Beneficiary (Apply for assistance)</SelectItem>
                      <SelectItem value="donor">Donor (Make donations)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Complete Address *</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Enter your complete address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-[#1e3a8a] hover:bg-[#1e40af]" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-[#1e3a8a] hover:text-[#1e40af] font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
