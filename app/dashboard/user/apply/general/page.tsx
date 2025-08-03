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
import { ArrowLeft, Upload, CreditCard } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function GeneralHelpApplicationPage() {
  const [formData, setFormData] = useState({
    helpCategory: "",
    amount: "",
    urgency: "",
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
    if (!formData.helpCategory) {
      toast({
        title: "Category Required",
        description: "Please select help category",
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

    if (Number.parseFloat(formData.amount) > 100000) {
      toast({
        title: "Amount Too High",
        description: "Maximum general help amount is PKR 100,000",
        variant: "destructive",
      })
      return false
    }

    if (!formData.urgency) {
      toast({
        title: "Urgency Required",
        description: "Please select urgency level",
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
      formDataToSend.append("type", "general")
      formDataToSend.append("helpCategory", formData.helpCategory)
      formDataToSend.append("amount", formData.amount)
      formDataToSend.append("urgency", formData.urgency)
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
          description: "Your general help application has been submitted successfully",
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
              <CreditCard className="h-6 w-6 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">General Help Application</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Apply for General Financial Assistance</CardTitle>
            <CardDescription>
              Request emergency financial help for various needs. Maximum amount is PKR 100,000.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="helpCategory">Help Category *</Label>
                  <Select onValueChange={(value) => handleSelectChange("helpCategory", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical Emergency</SelectItem>
                      <SelectItem value="education">Educational Expenses</SelectItem>
                      <SelectItem value="housing">Housing/Rent</SelectItem>
                      <SelectItem value="funeral">Funeral Expenses</SelectItem>
                      <SelectItem value="disaster">Natural Disaster Relief</SelectItem>
                      <SelectItem value="debt">Debt Relief</SelectItem>
                      <SelectItem value="other">Other Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount Needed (PKR) *</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    placeholder="25000"
                    value={formData.amount}
                    onChange={handleInputChange}
                    max="100000"
                    min="1000"
                    required
                  />
                  <p className="text-sm text-gray-500">Maximum: PKR 100,000</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level *</Label>
                  <Select onValueChange={(value) => handleSelectChange("urgency", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical (Life threatening)</SelectItem>
                      <SelectItem value="urgent">Urgent (Within 24 hours)</SelectItem>
                      <SelectItem value="high">High (Within 3 days)</SelectItem>
                      <SelectItem value="moderate">Moderate (Within a week)</SelectItem>
                      <SelectItem value="low">Low (Within a month)</SelectItem>
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
                <Label htmlFor="reason">Detailed Explanation *</Label>
                <Textarea
                  id="reason"
                  name="reason"
                  placeholder="Please provide detailed information about your situation, why you need this assistance, and how it will help you"
                  value={formData.reason}
                  onChange={handleInputChange}
                  rows={5}
                  required
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Important Information:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• All applications are reviewed by our team within 48 hours</li>
                  <li>• Supporting documents may be requested for verification</li>
                  <li>• Priority is given to critical and urgent cases</li>
                  <li>• False information may result in application rejection</li>
                </ul>
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
