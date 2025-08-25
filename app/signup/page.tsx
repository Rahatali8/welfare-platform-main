"use client"
import type React from "react"
import { useState } from "react"
import { useVoiceFormAgent, VoiceField } from "@/hooks/useVoiceFormAgent"
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

  // Voice agent fields config
  // Only include allowed fields for the voice agent, and only once each
  const voiceFields: VoiceField[] = [
    { name: "name", label: "Full Name", defaultValue: "Test User" },
    { name: "cnic", label: "CNIC Number", defaultValue: "12345-1234567-1" },
  { name: "email", label: "Email", defaultValue: "test@example.com" },
    { name: "phone", label: "Phone Number", defaultValue: "0300-1234567" },
    { name: "city", label: "City", defaultValue: "Karachi" },
    { name: "address", label: "Complete Address", defaultValue: "Test Address" },
  ];

  const voiceAgent = useVoiceFormAgent(voiceFields, (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  });
  const [voiceEnabled, setVoiceEnabled] = useState(false);
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
          <div className="w-16 h-16 bg-gradient-to-r from-[#1B0073] to-[#00A5E0] hover:opacity-90 text-white rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h2 className="mb-2 sm:mb-6 text-xl sm:text-2xl lg:text-4xl font-bold tracking-tight text-[#1B0073] drop-shadow-2xl">
        Join Al Khair  <span className="text-[#00A5E0]">  Welfare</span>
          </h2>
          <p className="text-gray-600">Create your account to access our services</p>
        </div>

        <div className="flex justify-end mb-4">
          <Button
            type="button"
            variant={voiceEnabled ? "destructive" : "secondary"}
            onClick={() => {
              const next = !voiceEnabled;
              setVoiceEnabled(next);
              if (!next) {
                // disable voice: stop any listening
                voiceAgent.stopFieldAgent();
              }
            }}
          >
            {voiceEnabled ? "Disable Voice Agent" : "Enable Voice Agent"}
          </Button>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-[#1B0073]">Create Account</CardTitle>
            <CardDescription className="text-center">Fill in your information to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">








              {/* Voice agent UI for the active field */}
              {voiceAgent.currentField && (
                <div className="mb-6 flex flex-col items-center">
                  <div className="mt-3 px-4 py-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 font-medium shadow animate-fadeIn flex flex-col items-start gap-2">
                    <div><span className="font-semibold">Speak:</span> {voiceAgent.currentField.label}</div>
                    {voiceAgent.transcript && (
                      <div className="text-xs text-gray-700 italic mt-1">You said: <span className="font-bold text-blue-700">"{voiceAgent.transcript}"</span></div>
                    )}
                    <Button type="button" size="sm" className="mt-2" variant="secondary" onClick={voiceAgent.handleResult} disabled={!voiceAgent.transcript}>
                      Set Field
                    </Button>
                    <div className="text-xs text-gray-500 mt-1">Say <span className="font-semibold">"set"</span> or click the button to confirm this field.</div>
                  </div>
                </div>
              )}
              
              
              
              
              



              
              

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      autoComplete="off"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  {voiceEnabled && (
                    <Button type="button" size="icon" variant="secondary" aria-label="Voice fill name" onClick={() => voiceAgent.startFieldAgent("name")}
                      disabled={(!!voiceAgent.currentField && voiceAgent.currentField.name !== "name")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-blue-600">
                        <path d="M12 18c1.66 0 3-1.34 3-3V7a3 3 0 10-6 0v8c0 1.66 1.34 3 3 3zm5-3a1 1 0 112 0c0 3.07-2.13 5.64-5 6.32V22a1 1 0 11-2 0v-0.68C7.13 20.64 5 18.07 5 15a1 1 0 112 0c0 2.21 1.79 4 4 4s4-1.79 4-4z" />
                      </svg>
                    </Button>
                  )}
                </div>

                <div className="space-y-2 flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor="cnic">CNIC Number *</Label>
                    <Input
                      id="cnic"
                      type="text"
                      autoComplete="off"
                      placeholder="12345-1234567-1"
                      value={formData.cnic}
                      onChange={(e) => handleInputChange("cnic", e.target.value)}
                      required
                      className="text-center tracking-wider"
                    />
                  </div>
                  {voiceEnabled && (
                    <Button type="button" size="icon" variant="secondary" aria-label="Voice fill cnic" onClick={() => voiceAgent.startFieldAgent("cnic")}
                      disabled={(!!voiceAgent.currentField && voiceAgent.currentField.name !== "cnic")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-blue-600">
                        <path d="M12 18c1.66 0 3-1.34 3-3V7a3 3 0 10-6 0v8c0 1.66 1.34 3 3 3zm5-3a1 1 0 112 0c0 3.07-2.13 5.64-5 6.32V22a1 1 0 11-2 0v-0.68C7.13 20.64 5 18.07 5 15a1 1 0 112 0c0 2.21 1.79 4 4 4s4-1.79 4-4z" />
                      </svg>
                    </Button>
                  )}
                </div>

                <div className="space-y-2 flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="off"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  {voiceEnabled && (
                    <Button type="button" size="icon" variant="secondary" aria-label="Voice fill email" onClick={() => voiceAgent.startFieldAgent("email")}
                      disabled={(!!voiceAgent.currentField && voiceAgent.currentField.name !== "email")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-blue-600">
                        <path d="M12 18c1.66 0 3-1.34 3-3V7a3 3 0 10-6 0v8c0 1.66 1.34 3 3 3zm5-3a1 1 0 112 0c0 3.07-2.13 5.64-5 6.32V22a1 1 0 11-2 0v-0.68C7.13 20.64 5 18.07 5 15a1 1 0 112 0c0 2.21 1.79 4 4 4s4-1.79 4-4z" />
                      </svg>
                    </Button>
                  )}
                </div>

                <div className="space-y-2 flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="text"
                      autoComplete="off"
                      placeholder="0300-1234567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                  {voiceEnabled && (
                    <Button type="button" size="icon" variant="secondary" aria-label="Voice fill phone" onClick={() => voiceAgent.startFieldAgent("phone")}
                      disabled={(!!voiceAgent.currentField && voiceAgent.currentField.name !== "phone")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-blue-600">
                        <path d="M12 18c1.66 0 3-1.34 3-3V7a3 3 0 10-6 0v8c0 1.66 1.34 3 3 3zm5-3a1 1 0 112 0c0 3.07-2.13 5.64-5 6.32V22a1 1 0 11-2 0v-0.68C7.13 20.64 5 18.07 5 15a1 1 0 112 0c0 2.21 1.79 4 4 4s4-1.79 4-4z" />
                      </svg>
                    </Button>
                  )}
                </div>

                <div className="space-y-2 flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      type="text"
                      autoComplete="off"
                      placeholder="Enter your city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                    />
                  </div>
                  {voiceEnabled && (
                    <Button type="button" size="icon" variant="secondary" aria-label="Voice fill city" onClick={() => voiceAgent.startFieldAgent("city")}
                      disabled={(!!voiceAgent.currentField && voiceAgent.currentField.name !== "city")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-blue-600">
                        <path d="M12 18c1.66 0 3-1.34 3-3V7a3 3 0 10-6 0v8c0 1.66 1.34 3 3 3zm5-3a1 1 0 112 0c0 3.07-2.13 5.64-5 6.32V22a1 1 0 11-2 0v-0.68C7.13 20.64 5 18.07 5 15a1 1 0 112 0c0 2.21 1.79 4 4 4s4-1.79 4-4z" />
                      </svg>
                    </Button>
                  )}
                </div>

                <div className="space-y-2 flex items-end gap-2">
                  <div className="flex-1">
                    <Label htmlFor="address">Complete Address *</Label>
                    <Input
                      id="address"
                      type="text"
                      autoComplete="off"
                      placeholder="Enter your complete address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                    />
                  </div>
                  {voiceEnabled && (
                    <Button type="button" size="icon" variant="secondary" aria-label="Voice fill address" onClick={() => voiceAgent.startFieldAgent("address")}
                      disabled={(!!voiceAgent.currentField && voiceAgent.currentField.name !== "address")}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-blue-600">
                        <path d="M12 18c1.66 0 3-1.34 3-3V7a3 3 0 10-6 0v8c0 1.66 1.34 3 3 3zm5-3a1 1 0 112 0c0 3.07-2.13 5.64-5 6.32V22a1 1 0 11-2 0v-0.68C7.13 20.64 5 18.07 5 15a1 1 0 112 0c0 2.21 1.79 4 4 4s4-1.79 4-4z" />
                      </svg>
                    </Button>
                  )}
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
                      className="absolute inset-y-0 right-0 pr-3 flex items-center "
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

              <Button type="submit" className="w-full bg-gradient-to-r from-[#1B0073] to-[#00A5E0] hover:opacity-90 text-white" disabled={isLoading}>
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
