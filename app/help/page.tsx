"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  BookOpen,
  Phone,
  MessageCircle,
  FileText,
  DollarSign,
  GraduationCap,
  Stethoscope,
  Home,
  ArrowRight,
  HelpCircle,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/layout/footer"

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const helpCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn the basics of using our platform",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
      articles: 12,
    },
    {
      id: "applications",
      title: "Applications",
      description: "How to apply for different assistance programs",
      icon: FileText,
      color: "bg-green-100 text-green-600",
      articles: 15,
    },
    {
      id: "financial-assistance",
      title: "Financial Assistance",
      description: "Information about loans and financial support",
      icon: DollarSign,
      color: "bg-yellow-100 text-yellow-600",
      articles: 10,
    },
    {
      id: "education-support",
      title: "Education Support",
      description: "Scholarships and educational assistance",
      icon: GraduationCap,
      color: "bg-purple-100 text-purple-600",
      articles: 8,
    },
    {
      id: "medical-assistance",
      title: "Medical Assistance",
      description: "Healthcare support and medical aid",
      icon: Stethoscope,
      color: "bg-red-100 text-red-600",
      articles: 9,
    },
    {
      id: "housing-support",
      title: "Housing Support",
      description: "Home construction and repair assistance",
      icon: Home,
      color: "bg-indigo-100 text-indigo-600",
      articles: 6,
    },
  ]

  const quickHelp = [
    {
      title: "How to Apply",
      description: "Step-by-step guide to submitting your application",
      link: "/how-it-works",
      time: "5 min read",
    },
    {
      title: "Required Documents",
      description: "Complete list of documents needed for applications",
      link: "/faq",
      time: "3 min read",
    },
    {
      title: "Eligibility Criteria",
      description: "Check if you qualify for our assistance programs",
      link: "/services",
      time: "4 min read",
    },
    {
      title: "Application Status",
      description: "How to track your application progress",
      link: "/faq",
      time: "2 min read",
    },
  ]

  const supportOptions = [
    {
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: MessageCircle,
      availability: "9 AM - 9 PM",
      action: "Start Chat",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Phone Support",
      description: "Speak directly with our representatives",
      icon: Phone,
      availability: "24/7 Available",
      action: "Call Now",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Submit Ticket",
      description: "Send us a detailed support request",
      icon: FileText,
      availability: "Response in 2 hours",
      action: "Create Ticket",
      color: "bg-purple-600 hover:bg-purple-700",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative py-20 px-4 bg-cover bg-center bg-fixed h-[60vh] flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://png.pngtree.com/background/20210711/original/pngtree-caring-for-the-elderly-public-welfare-design-psd-layering-picture-image_1125477.jpg')",
        }}
      >
        {/* Overlay for opacity */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="container mx-auto text-center relative z-10">
          {/* Heading */}
          <motion.h1
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-[#1B0073]">How Can We</span>{" "}
            <span className="text-[#00A5E0]"> Help You?</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-base xs:text-lg sm:text-xl mb-8 max-w-3xl mx-auto text-gray-100 opacity-90"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Find answers to your questions, learn how to use our platform, and get the support you need.
          </motion.p>
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-lg bg-white border-white/20 text-white placeholder:text-blue-900"
            />
          </div>

        </div>
      </section>
      {/* Quick Help */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1B0073] drop-shadow-2xl">
              Quick <span className="text-[#00A5E0]">Help</span>
            </h2>
            <p className="text-xl text-gray-600">Get started with these popular help articles</p>
          </div>

          {/* Quick Help Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {quickHelp.map((item, index) => (
              <div
                key={index}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-indigo-600/60
            shadow-[0_10px_30px_rgba(17,24,39,0.08)] hover:shadow-[0_20px_40px_rgba(17,24,39,0.12)] transition-shadow"
              >
                <div className="relative rounded-2xl bg-white/80 backdrop-blur-xl p-6 h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.01] ring-1 ring-transparent group-hover:ring-blue-200/60">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">{item.time}</Badge>
                    <Button variant="ghost" size="sm" asChild className="text-blue-600 hover:text-blue-800">
                      <Link href={item.link}>
                        Read More <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Help Categories */}
          <div className="text-center mb-12">
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1B0073] drop-shadow-2xl">
              Browse by<span className="text-[#00A5E0]"> Category</span>
            </h2>
            <p className="text-xl text-gray-600">Find detailed information organized by topic</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {helpCategories.map((category) => (
              <div
                key={category.id}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-indigo-600/60
            shadow-[0_10px_30px_rgba(17,24,39,0.08)] hover:shadow-[0_20px_40px_rgba(17,24,39,0.12)] transition-shadow"
              >
                <div className="relative rounded-2xl bg-white/80 backdrop-blur-xl p-6 h-full text-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.01] ring-1 ring-transparent group-hover:ring-blue-200/60">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 group-hover:text-blue-600">{category.title}</CardTitle>
                  <Badge variant="secondary" className="w-fit my-2">{category.articles} articles</Badge>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                    Browse Articles <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Support Options */}
          <div className="text-center mb-12">
            <h2 className="mb-4 sm:mb-6 text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1B0073] drop-shadow-2xl">
              Need Personal <span className="text-[#00A5E0]">Assistance?</span>
            </h2>
            <p className="text-xl text-gray-600">Our support team is here to help you directly</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <div
                key={index}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-indigo-600/60
            shadow-[0_10px_30px_rgba(17,24,39,0.08)] hover:shadow-[0_20px_40px_rgba(17,24,39,0.12)] transition-shadow"
              >
                <div className="relative rounded-2xl bg-white/80 backdrop-blur-xl p-6 h-full text-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.01] ring-1 ring-transparent group-hover:ring-blue-200/60">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <option.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900 group-hover:text-blue-600">{option.title}</CardTitle>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <div className="flex items-center justify-center mb-3">
                    <Clock className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm text-green-600">{option.availability}</span>
                  </div>
                  <Button className="w-full rounded-full bg-gradient-to-r from-[#1B0073] to-[#00A5E0] hover:opacity-90 text-white">{option.action}</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ Preview */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="mb-4 sm:mb-6 text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1B0073] drop-shadow-2xl">
              Frequently Asked <span className="text-[#00A5E0]">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-blue-900">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  How long does the application process take?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Emergency cases are processed within 24 hours, while regular applications take 48-72 hours for review
                  and 5-7 working days for complete processing.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-blue-900">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  What documents do I need to apply?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  You'll need your CNIC, income certificate, bank statements, utility bills, and any relevant medical or
                  educational documents depending on your application type.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-blue-900">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Is there any fee for applying?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No, all our services are completely free. We never charge any fees for applications, processing, or
                  assistance. Be cautious of anyone asking for fees.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-blue-900">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  Can I track my application status?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, you'll receive a tracking number after submission. You can check your status online or contact
                  our support team for updates.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-[#1B0073] to-[#00A5E0] hover:opacity-90 text-white">
              <Link href="/faq">
                View All FAQs
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Still Need Help?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Our dedicated support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4">
              <Link href="/contact">
                <MessageCircle className="h-5 w-5 mr-2" />
                Contact Support
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 bg-transparent"
            >
              <Link href="tel:+922112345678">
                <Phone className="h-5 w-5 mr-2" />
                Call Us Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
