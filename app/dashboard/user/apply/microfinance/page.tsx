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
import { ArrowLeft, Upload, Heart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function MicrofinanceApplicationPage() {
  const [formData, setFormData] = useState({
    helpType: "",
    amount: "",
    urgencyLevel: "",
    dependents: "",
    monthlyIncome: "",
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
    if (!formData.helpType) {
      toast({
        title: "Help Type Required",
        description: "Please select the type of help needed",
        variant: "destructive",
      })
      return false
    }

    if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return false
    }

    if (Number.parseFloat(formData.amount) > 50000) {
      toast({
        title: "Amount Too High",
        description: "Maximum microfinance amount is PKR 50,000",
        variant: "destructive",
      })
      return false
    }

    if (!formData.urgencyLevel) {
      toast({
        title: "Urgency Level Required",
        description: "Please select urgency level",
        variant: "destructive",
      })
      return false
    }

    if (!formData.dependents) {
      toast({
        title: "Dependents Required",
        description: "Please enter number of dependents",
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
        description: "Please explain why you need this assistance",
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
      formDataToSend.append("type", "microfinance")
      formDataToSend.append("helpType", formData.helpType)
      formDataToSend.append("amount", formData.amount)
      formDataToSend.append("urgencyLevel", formData.urgencyLevel)
      formDataToSend.append("dependents", formData.dependents)
      formDataToSend.append("monthlyIncome", formData.monthlyIncome)
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
          description: "Your microfinance application has been submitted successfully",
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
              <Heart className="h-6 w-6 text-red-600" />
              <h1 className="text-2xl font-bold text-gray-900">Microfinance Application</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Apply for Microfinance</CardTitle>
            <CardDescription>
              Get help for daily essentials and basic needs. Maximum amount is PKR 50,000.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="helpType">Type of Help Needed *</Label>
                  <Select onValueChange={(value) => handleSelectChange("helpType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select help type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="groceries">Groceries & Food</SelectItem>
                      <SelectItem value="utilities">Utility Bills</SelectItem>
                      <SelectItem value="medicine">Medicine & Healthcare</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="household">Household Items</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount Needed (PKR) *</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="5000"
                    value={formData.amount}
                    onChange={handleInputChange}
                    max="50000"
                    min="500"
                    required
                  />
                  <p className="text-sm text-gray-500">Maximum: PKR 50,000</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgencyLevel">Urgency Level *</Label>
                  <Select onValueChange={(value) => handleSelectChange("urgencyLevel", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (Within 24 hours)</SelectItem>
                      <SelectItem value="urgent">Urgent (Within 3 days)</SelectItem>
                      <SelectItem value="moderate">Moderate (Within a week)</SelectItem>
                      <SelectItem value="low">Low (Within a month)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dependents">Number of Dependents *</Label>
                  <Input
                    id="dependents"
                    name="dependents"
                    type="number"
                    placeholder="3"
                    value={formData.dependents}
                    onChange={handleInputChange}
                    min="0"
                    max="20"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Monthly Household Income (PKR)</Label>
                  <Input
                    id="monthlyIncome"
                    name="monthlyIncome"
                    type="number"
                    placeholder="15000"
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                    min="0"
                  />
                  <p className="text-sm text-gray-500">Optional but helps in assessment</p>
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
                <Label htmlFor="reason">Detailed Reason *</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  placeholder="Please explain your current situation and why you need this assistance"
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
