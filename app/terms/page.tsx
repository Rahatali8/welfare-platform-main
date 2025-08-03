"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Scale, AlertTriangle, CheckCircle, XCircle, Calendar, Phone, Mail, Shield } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/layout/footer"

export default function TermsPage() {
  const lastUpdated = "January 15, 2024"

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content:
        "By accessing and using the Welfare Platform services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    },
    {
      id: "eligibility",
      title: "Eligibility Criteria",
      icon: Scale,
      content:
        "To be eligible for our services, you must be a Pakistani citizen or legal resident, be at least 18 years of age, provide accurate and complete information, and meet the specific criteria for the assistance program you are applying for.",
    },
    {
      id: "application-process",
      title: "Application Process",
      icon: FileText,
      content:
        "All applications must be submitted through our official channels. You agree to provide truthful, accurate, and complete information. False information may result in immediate disqualification and potential legal action.",
    },
    {
      id: "verification",
      title: "Verification Requirements",
      icon: Shield,
      content:
        "We reserve the right to verify all information provided in your application. This may include field visits, document verification, and background checks. You agree to cooperate fully with our verification process.",
    },
    {
      id: "prohibited-uses",
      title: "Prohibited Uses",
      icon: XCircle,
      content:
        "You may not use our services for any unlawful purpose, submit false or misleading information, attempt to defraud our system, interfere with our services, or violate any applicable laws or regulations.",
    },
  ]

  const obligations = [
    "Provide accurate and truthful information in all applications",
    "Notify us immediately of any changes in your circumstances",
    "Use assistance funds only for their intended purpose",
    "Cooperate with verification and monitoring processes",
    "Respect the rights and dignity of other users and staff",
    "Comply with all applicable laws and regulations",
  ]

  const rights = [
    "Receive fair and equal treatment regardless of background",
    "Have your personal information protected and kept confidential",
    "Appeal decisions through our formal appeals process",
    "Receive assistance in a timely manner once approved",
    "Access information about our programs and services",
    "File complaints about our services through proper channels",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">Terms of Service</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Terms of Service</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-4">
              Please read these terms carefully before using our welfare platform services. These terms govern your use
              of our services and establish the rights and responsibilities of all parties.
            </p>
            <p className="text-blue-200">
              <Calendar className="inline h-4 w-4 mr-2" />
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900">Introduction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Welcome to Welfare Platform. These Terms of Service ("Terms") govern your use of our welfare assistance
                platform and services. By using our services, you enter into a legally binding agreement with us. Please
                read these terms carefully and contact us if you have any questions.
              </p>
            </CardContent>
          </Card>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={section.id} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl text-blue-900">
                    <section.icon className="h-6 w-6 mr-3 text-blue-600" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{section.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* User Obligations and Rights */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">Your Obligations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">As a user of our platform, you agree to the following obligations:</p>
                <ul className="space-y-3">
                  {obligations.map((obligation, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{obligation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">As a user of our platform, you have the following rights:</p>
                <ul className="space-y-3">
                  {rights.map((right, index) => (
                    <li key={index} className="flex items-start">
                      <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{right}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Additional Terms */}
          <div className="space-y-8 mt-12">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  While we strive to provide the best possible service, Welfare Platform shall not be liable for any
                  indirect, incidental, special, consequential, or punitive damages, including without limitation, loss
                  of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.
                  Our total liability shall not exceed the amount of assistance provided to you, if any.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">Termination</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We may terminate or suspend your access to our services immediately, without prior notice or
                  liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Upon termination, your right to use the service will cease immediately. If you wish to terminate your
                  account, you may simply discontinue using the service and contact us to request account deletion.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">Governing Law</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  These Terms shall be interpreted and governed by the laws of Pakistan. Any disputes arising from these
                  terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of
                  Pakistan. We will attempt to resolve disputes through mediation before pursuing legal action.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                  revision is material, we will try to provide at least 30 days notice prior to any new terms taking
                  effect. What constitutes a material change will be determined at our sole discretion.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Important Notice */}
          <Card className="border-0 shadow-lg mt-8 bg-yellow-50 border-l-4 border-l-yellow-400">
            <CardContent className="pt-6">
              <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">Important Notice</h3>
                  <p className="text-yellow-700 text-sm">
                    By continuing to access or use our service after those revisions become effective, you agree to be
                    bound by the revised terms. If you do not agree to the new terms, please stop using the service.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-0 shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">Questions About These Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                If you have any questions about these Terms of Service, please contact us:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-600">legal@welfareplatform.org</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-600">+92 21 1234 5678</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    <Link href="/contact">Contact Legal Team</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
