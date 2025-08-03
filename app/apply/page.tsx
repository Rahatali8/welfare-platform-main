"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ArrowRight, User, Lock } from "lucide-react"
import Link from "next/link"

export default function ApplyPage() {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const handleApplyClick = () => {
    setShowLoginPrompt(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Apply for Assistance</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take the first step towards transforming your life. Choose from our comprehensive welfare programs
              designed to meet your specific needs.
            </p>
          </div>

          {!showLoginPrompt ? (
            <>
              {/* Program Selection */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleApplyClick}>
                  <CardHeader>
                    <CardTitle className="text-green-600">Business Development</CardTitle>
                    <CardDescription>Start or expand your business with loans up to PKR 500,000</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• Flexible repayment terms</li>
                      <li>• Business mentorship included</li>
                      <li>• Quick approval process</li>
                    </ul>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleApplyClick}>
                  <CardHeader>
                    <CardTitle className="text-red-600">Microfinance Support</CardTitle>
                    <CardDescription>Quick assistance for daily essentials up to PKR 50,000</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• Same-day approval available</li>
                      <li>• No collateral required</li>
                      <li>• Flexible repayment options</li>
                    </ul>
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleApplyClick}>
                  <CardHeader>
                    <CardTitle className="text-purple-600">Emergency Assistance</CardTitle>
                    <CardDescription>Immediate help for medical and emergency needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• 24/7 emergency support</li>
                      <li>• Priority processing</li>
                      <li>• Up to PKR 200,000</li>
                    </ul>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleApplyClick}>
                  <CardHeader>
                    <CardTitle className="text-blue-600">Education Support</CardTitle>
                    <CardDescription>Scholarships and educational assistance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• School & university fees</li>
                      <li>• Books and supplies</li>
                      <li>• Vocational training</li>
                    </ul>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleApplyClick}>
                  <CardHeader>
                    <CardTitle className="text-orange-600">Healthcare Aid</CardTitle>
                    <CardDescription>Medical treatment and healthcare support</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• Surgery funding</li>
                      <li>• Medicine assistance</li>
                      <li>• Medical equipment</li>
                    </ul>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={handleApplyClick}>
                  <CardHeader>
                    <CardTitle className="text-indigo-600">Skills Development</CardTitle>
                    <CardDescription>Professional training and skill enhancement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• Technical training</li>
                      <li>• Computer courses</li>
                      <li>• Trade certifications</li>
                    </ul>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                      Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Information Section */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Before You Apply</CardTitle>
                  <CardDescription>Please ensure you have the following documents ready</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Required Documents:</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Valid CNIC (original and copy)</li>
                        <li>• Proof of address (utility bill)</li>
                        <li>• Income certificate or proof of income</li>
                        <li>• Bank account details</li>
                        <li>• Recent passport-size photographs</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Application Process:</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Create account or login</li>
                        <li>• Fill application form</li>
                        <li>• Upload required documents</li>
                        <li>• Submit for review</li>
                        <li>• Track status in dashboard</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            /* Login Prompt */
            <Card className="max-w-md mx-auto">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Account Required</CardTitle>
                <CardDescription>
                  To apply for assistance, you need to create an account or login to your existing account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                  <Link href="/signup">
                    <User className="mr-2 h-4 w-4" />
                    Create New Account
                  </Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/login">
                    <Lock className="mr-2 h-4 w-4" />
                    Login to Existing Account
                  </Link>
                </Button>
                <div className="text-center">
                  <Button variant="ghost" onClick={() => setShowLoginPrompt(false)}>
                    ← Back to Program Selection
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
