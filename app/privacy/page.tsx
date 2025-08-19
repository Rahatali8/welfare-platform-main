"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Shield, Eye, Lock, Users, FileText, Phone, Mail, Calendar } from "lucide-react"
import Link from "next/link"

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section (unchanged as you said ✅) */}
      <section
        className="relative py-20 px-4 bg-cover bg-center bg-fixed h-[60vh] flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://png.pngtree.com/background/20210711/original/pngtree-caring-for-the-elderly-public-welfare-design-psd-layering-picture-image_1125477.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="container mx-auto text-center relative z-10">
          <motion.h1
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[#1B0073]">Your Privacy</span>{" "}
            <span className="text-[#00A5E0]"> Matters</span>
          </motion.h1>

          <motion.p
            className="text-base xs:text-lg sm:text-xl mb-8 max-w-3xl mx-auto text-gray-100 opacity-90"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            We are committed to protecting your personal information and being transparent about how we collect, use,
            and safeguard your data.
          </motion.p>
          <p className="text-blue-200 font-medium">
            <Calendar className="inline h-4 w-4 mr-2" />
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden mb-10 bg-white">
            <CardHeader className="bg-gradient-to-r from-[#1B0073]/10 to-[#00A5E0]/10">
              <CardTitle className="text-2xl text-blue-900 font-bold">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 leading-relaxed">
                At <span className="font-semibold text-blue-800">Welfare Platform</span>, we understand that your
                privacy is fundamental to your trust in our services. This Privacy Policy explains how we collect, use,
                protect, and share your personal information when you use our welfare assistance platform. By using our
                services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </CardContent>
          </Card>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card
                key={section.id}
                className="border-0 shadow-lg rounded-2xl hover:shadow-2xl transition-shadow duration-300 bg-white"
              >
                <CardHeader className="flex items-center space-x-3">
                  <section.icon className="h-7 w-7 text-blue-600" />
                  <CardTitle className="text-xl text-blue-900 font-semibold">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start bg-gray-50 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Extra Info */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Card className="border-0 shadow-lg rounded-2xl bg-white hover:shadow-2xl transition">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900 font-semibold">Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 space-y-2">
                <p>
                  We retain your personal information only as long as necessary to provide our services and comply with
                  legal obligations.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Application data: 7 years after case closure</li>
                  <li>Financial records: 10 years as per regulations</li>
                  <li>Communication logs: 3 years</li>
                  <li>Marketing preferences: Until you opt out</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-2xl bg-white hover:shadow-2xl transition">
              <CardHeader>
                <CardTitle className="text-xl text-blue-900 font-semibold">Cookies & Tracking</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-700 space-y-2">
                <p>
                  We use cookies and similar technologies to improve your experience on our platform. You remain in
                  control of your preferences.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Essential cookies for platform functionality</li>
                  <li>Analytics cookies to understand usage patterns</li>
                  <li>Preference cookies to remember your settings</li>
                  <li>You can control cookies through browser settings</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact */}
          <Card className="border-0 shadow-lg rounded-2xl mt-12 bg-gradient-to-r from-white to-blue-50">
            <CardHeader>
              <CardTitle className="text-xl text-blue-900 font-semibold">Contact Us About Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">
                If you have any questions about this Privacy Policy or how we handle your personal information, please
                reach out:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">privacy@welfareplatform.org</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="text-gray-700">+92 21 1234 5678</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button asChild className="w-full bg-gradient-to-r from-[#1B0073] to-[#00A5E0] hover:opacity-90 text-white shadow-md rounded-xl">
                    <Link href="/contact">Contact Privacy Team</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Updates */}
          <Card className="border-0 shadow-lg rounded-2xl mt-10 bg-blue-50">
            <CardContent className="flex items-start space-x-4 p-6">
              <Shield className="h-7 w-7 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 text-lg">Policy Updates</h3>
                <p className="text-gray-700 mt-1 text-sm leading-relaxed">
                  We may update this Privacy Policy from time to time. Any changes will be posted here with the updated
                  date. We recommend checking back periodically to stay informed.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
