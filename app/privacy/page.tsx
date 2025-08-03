"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Eye, Lock, Users, FileText, Phone, Mail, Calendar } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/layout/footer"

export default function PrivacyPage() {
  const lastUpdated = "January 15, 2024"

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: FileText,
      content: [
        "Personal identification information (Name, email address, phone number, CNIC)",
        "Financial information (Income details, bank account information for disbursements)",
        "Demographic information (Age, gender, family size, location)",
        "Documentation (Supporting documents for verification purposes)",
        "Usage data (How you interact with our platform and services)",
      ],
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      icon: Users,
      content: [
        "Process and evaluate your assistance applications",
        "Verify your identity and eligibility for programs",
        "Communicate with you about your applications and our services",
        "Improve our services and develop new programs",
        "Comply with legal requirements and prevent fraud",
        "Send you important updates and notifications",
      ],
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: Shield,
      content: [
        "We do not sell, trade, or rent your personal information to third parties",
        "Information may be shared with authorized verification agencies",
        "Data may be shared with government agencies as required by law",
        "Anonymous statistical data may be used for research and reporting",
        "Service providers who assist us may access limited information under strict agreements",
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: [
        "We use industry-standard encryption to protect your data",
        "All data is stored on secure servers with restricted access",
        "Regular security audits and updates are performed",
        "Staff access to personal information is limited and monitored",
        "We maintain backup systems to prevent data loss",
      ],
    },
    {
      id: "your-rights",
      title: "Your Rights",
      icon: Eye,
      content: [
        "Access: You can request a copy of your personal information",
        "Correction: You can request corrections to inaccurate information",
        "Deletion: You can request deletion of your data (subject to legal requirements)",
        "Portability: You can request your data in a portable format",
        "Objection: You can object to certain uses of your information",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">Privacy Policy</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Your Privacy Matters</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-4">
              We are committed to protecting your personal information and being transparent about how we collect, use,
              and safeguard your data.
            </p>
            <p className="text-blue-200">
              <Calendar className="inline h-4 w-4 mr-2" />
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                At Welfare Platform, we understand that your privacy is fundamental to your trust in our services. This
                Privacy Policy explains how we collect, use, protect, and share your personal information when you use
                our welfare assistance platform. By using our services, you agree to the collection and use of
                information in accordance with this policy.
              </p>
            </CardContent>
          </Card>

          {/* Privacy Sections */}
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
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Important Information */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">Data Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We retain your personal information only as long as necessary to provide our services and comply with
                  legal obligations.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Application data: 7 years after case closure</li>
                  <li>• Financial records: 10 years as per regulations</li>
                  <li>• Communication logs: 3 years</li>
                  <li>• Marketing preferences: Until you opt out</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900">Cookies & Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We use cookies and similar technologies to improve your experience on our platform.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Essential cookies for platform functionality</li>
                  <li>• Analytics cookies to understand usage patterns</li>
                  <li>• Preference cookies to remember your settings</li>
                  <li>• You can control cookies through browser settings</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <Card className="border-0 shadow-lg mt-8">
            <CardHeader>
              <CardTitle className="text-xl text-blue-900">Contact Us About Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                If you have any questions about this Privacy Policy or how we handle your personal information, please
                don't hesitate to contact us:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-600">privacy@welfareplatform.org</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-600">+92 21 1234 5678</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    <Link href="/contact">Contact Privacy Team</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Policy Updates */}
          <Card className="border-0 shadow-lg mt-8 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Policy Updates</h3>
                  <p className="text-gray-600 text-sm">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                    the new Privacy Policy on this page and updating the "last updated" date. We encourage you to review
                    this Privacy Policy periodically for any changes.
                  </p>
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
