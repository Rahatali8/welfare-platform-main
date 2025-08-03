"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [cnic, setCnic] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cnic }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setMessage("Password reset instructions have been sent to your registered contact information.")
      } else {
        setMessage(data.error || "An error occurred. Please try again.")
      }
    } catch (error) {
      setMessage("Network error. Please check your connection and try again.")
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

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">Check Your Messages</h2>
              <p className="text-gray-600 mb-6">
                We've sent password reset instructions to your registered contact information. Please check your
                messages and follow the instructions to reset your password.
              </p>
              <div className="space-y-4">
                <Button className="w-full bg-[#1e3a8a] hover:bg-[#1e40af]" asChild>
                  <Link href="/login">Back to Login</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setIsSuccess(false)
                    setCnic("")
                    setMessage("")
                  }}
                >
                  Send Another Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/login" className="inline-flex items-center text-[#1e3a8a] hover:text-[#1e40af] mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Link>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-[#1e3a8a] rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#1e3a8a]">Forgot Password?</CardTitle>
            <CardDescription>
              Enter your CNIC number and we'll send you instructions to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cnic">CNIC Number</Label>
                <Input
                  id="cnic"
                  type="text"
                  placeholder="12345-1234567-1"
                  value={cnic}
                  onChange={handleCnicChange}
                  required
                  className="text-center text-lg tracking-wider"
                />
                <p className="text-xs text-gray-500">Enter your 13-digit CNIC number (format: 12345-1234567-1)</p>
              </div>

              {message && (
                <Alert className={isSuccess ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                  <AlertDescription className={isSuccess ? "text-green-800" : "text-red-800"}>
                    {message}
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-[#1e3a8a] hover:bg-[#1e40af]"
                disabled={isLoading || cnic.replace(/\D/g, "").length !== 13}
              >
                {isLoading ? "Sending..." : "Send Reset Instructions"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
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
