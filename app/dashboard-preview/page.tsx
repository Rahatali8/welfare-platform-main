"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Clock, CheckCircle, FileText, Heart, ArrowRight, Target, Award } from "lucide-react"
import Link from "next/link"

export default function DashboardPreview() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Preview</h1>
              <p className="text-gray-600 mt-1">See what you'll get after creating your account</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button className="bg-green-600 hover:bg-green-700" asChild>
                <Link href="/signup">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Live Stats Banner */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-6 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Live Impact Today</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold">47</div>
                <p className="text-green-100">Applications Approved</p>
              </div>
              <div>
                <div className="text-3xl font-bold">PKR 2.3M</div>
                <p className="text-green-100">Funds Distributed</p>
              </div>
              <div>
                <div className="text-3xl font-bold">156</div>
                <p className="text-green-100">Families Helped</p>
              </div>
              <div>
                <div className="text-3xl font-bold">23</div>
                <p className="text-green-100">New Businesses Started</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-600" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Start your journey with these simple steps</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Button className="h-20 flex-col bg-blue-50 text-blue-700 hover:bg-blue-100" variant="outline">
                    <FileText className="h-6 w-6 mb-2" />
                    Apply for Loan
                  </Button>
                  <Button className="h-20 flex-col bg-green-50 text-green-700 hover:bg-green-100" variant="outline">
                    <Heart className="h-6 w-6 mb-2" />
                    Emergency Help
                  </Button>
                  <Button className="h-20 flex-col bg-purple-50 text-purple-700 hover:bg-purple-100" variant="outline">
                    <Users className="h-6 w-6 mb-2" />
                    Microfinance
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Sample Applications */}
            <Card>
              <CardHeader>
                <CardTitle>Your Applications</CardTitle>
                <CardDescription>Track your assistance requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Business Loan Application</h4>
                        <p className="text-sm text-gray-600">Submitted on Dec 15, 2024</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Approved</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Clock className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Emergency Medical Aid</h4>
                        <p className="text-sm text-gray-600">Submitted on Dec 20, 2024</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Education Support</h4>
                        <p className="text-sm text-gray-600">Draft - Not submitted</p>
                      </div>
                    </div>
                    <Badge variant="outline">Draft</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Tracking */}
            <Card>
              <CardHeader>
                <CardTitle>Application Progress</CardTitle>
                <CardDescription>See how your applications are progressing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Business Loan - PKR 500,000</span>
                      <span className="text-sm text-green-600">100% Complete</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <p className="text-xs text-gray-600 mt-1">Funds disbursed on Dec 18, 2024</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Medical Emergency - PKR 150,000</span>
                      <span className="text-sm text-yellow-600">75% Complete</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-gray-600 mt-1">Under final review by committee</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Education Support - PKR 80,000</span>
                      <span className="text-sm text-gray-600">25% Complete</span>
                    </div>
                    <Progress value={25} className="h-2" />
                    <p className="text-xs text-gray-600 mt-1">Complete your application to proceed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-green-600">JD</span>
                  </div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-gray-600">Member since Dec 2024</p>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-center">
                      <Award className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-green-800">Verified Member</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Loan approved</p>
                      <p className="text-xs text-gray-600">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Documents verified</p>
                      <p className="text-xs text-gray-600">5 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Application submitted</p>
                      <p className="text-xs text-gray-600">1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Your Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Assistance Received</span>
                    <span className="font-semibold">PKR 650,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Applications Approved</span>
                    <span className="font-semibold">2 of 3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Success Rate</span>
                    <span className="font-semibold text-green-600">67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Member Since</span>
                    <span className="font-semibold">Dec 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Ready to Get Started?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Create your account to access all these features and start your journey with us.
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                    <Link href="/signup">
                      Create Account <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center bg-white rounded-lg p-8 border">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience the Full Dashboard</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            This is just a preview! Create your account to access real applications, track your progress, receive
            notifications, and connect with our support team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/signup">Create Free Account</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Already have an account?</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
