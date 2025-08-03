"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Upload, DollarSign } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoanApplicationPage() {
  const [formData, setFormData] = useState({
    loanAmount: "",
    loanPurpose: "",
    monthlyIncome: "",
    occupation: "",
    loanDuration: "",
    currentAddress: "",
    reason: "",
    cnicImage: null as File | null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        })
        return
      }
      setFormData((prev) => ({
        ...prev,
        cnicImage: file,
      }))
    }
  }

  const validateForm = () => {
    if (!formData.loanAmount || Number.parseFloat(formData.loanAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid loan amount",
        variant: "destructive",
      })
      return false
    }

    if (Number.parseFloat(formData.loanAmount) > 500000) {
      toast({
        title: "Amount Too High",
        description: "Maximum loan amount is PKR 500,000",
        variant: "destructive",
      })
      return false
    }

    if (!formData.loanPurpose) {
      toast({
        title: "Purpose Required",
        description: "Please select the loan purpose",
        variant: "destructive",
      })
      return false
    }

    if (!formData.monthlyIncome || Number.parseFloat(formData.monthlyIncome) <= 0) {
      toast({
        title: "Invalid Income",
        description: "Please enter your monthly income",
        variant: "destructive",
      })
      return false
    }

    if (!formData.occupation.trim()) {
      toast({
        title: "Occupation Required",
        description: "Please enter your occupation",
        variant: "destructive",
      })
      return false
    }

    if (!formData.loanDuration) {
      toast({
        title: "Duration Required",
        description: "Please select loan duration",
        variant: "destructive",
      })
      return false
    }

    if (!formData.currentAddress.trim()) {
      toast({
        title: "Address Required",
        description: "Please enter your current address",
        variant: "destructive",
      })
      return false
    }

    if (!formData.reason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please explain why you need this loan",
        variant: "destructive",
      })
      return false
    }

    if (!formData.cnicImage) {
      toast({
        title: "CNIC Image Required",
        description: "Please upload your CNIC image",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("type", "loan")
      formDataToSend.append("loanAmount", formData.loanAmount)
      formDataToSend.append("loanPurpose", formData.loanPurpose)
      formDataToSend.append("monthlyIncome", formData.monthlyIncome)
      formDataToSend.append("occupation", formData.occupation)
      formDataToSend.append("loanDuration", formData.loanDuration)
      formDataToSend.append("currentAddress", formData.currentAddress)
      formDataToSend.append("reason", formData.reason)
      if (formData.cnicImage) {
        formDataToSend.append("cnicImage", formData.cnicImage)
      }

      const response = await fetch("/api/requests/submit", {
        method: "POST",
        body: formDataToSend,
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Application Submitted!",
          description: "Your loan application has been submitted successfully",
        })
        router.push("/dashboard/user")
      } else {
        toast({
          title: "Submission Failed",
          description: data.message || "Failed to submit application",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button variant="ghost" asChild className="mr-4">
              <Link href="/dashboard/user">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Loan Application</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Apply for Loan</CardTitle>
            <CardDescription>Fill out this form to apply for a loan. Maximum amount is PKR 500,000.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount (PKR) *</Label>
                  <Input
                    id="loanAmount"
                    name="loanAmount"
                    type="number"
                    placeholder="50000"
                    value={formData.loanAmount}
                    onChange={handleInputChange}
                    max="500000"
                    min="1000"
                    required
                  />
                  <p className="text-sm text-gray-500">Maximum: PKR 500,000</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanPurpose">Loan Purpose *</Label>
                  <Select onValueChange={(value) => handleSelectChange("loanPurpose", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select loan purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="home-improvement">Home Improvement</SelectItem>
                      <SelectItem value="agriculture">Agriculture</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Monthly Income (PKR) *</Label>
                  <Input
                    id="monthlyIncome"
                    name="monthlyIncome"
                    type="number"
                    placeholder="25000"
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation *</Label>
                  <Input
                    id="occupation"
                    name="occupation"
                    type="text"
                    placeholder="e.g., Shopkeeper, Farmer, Teacher"
                    value={formData.occupation}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanDuration">Loan Duration *</Label>
                  <Select onValueChange={(value) => handleSelectChange("loanDuration", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6-months">6 Months</SelectItem>
                      <SelectItem value="12-months">12 Months</SelectItem>
                      <SelectItem value="18-months">18 Months</SelectItem>
                      <SelectItem value="24-months">24 Months</SelectItem>
                      <SelectItem value="36-months">36 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cnicImage">CNIC Image *</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="cnicImage" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("cnicImage")?.click()}
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {formData.cnicImage ? formData.cnicImage.name : "Upload CNIC Image"}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">Maximum file size: 5MB</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentAddress">Current Address *</Label>
                <Textarea
                  id="currentAddress"
                  name="currentAddress"
                  placeholder="Enter your current residential address"
                  value={formData.currentAddress}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Loan *</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  placeholder="Please explain in detail why you need this loan and how you plan to use it"
                  value={formData.reason}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard/user">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
