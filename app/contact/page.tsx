"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Headphones, CheckCircle } from "lucide-react"
import { Footer } from "@/components/layout/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our support team",
      contact: "+92 21 1234 5678",
      availability: "24/7 Available",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your queries via email",
      contact: "support@welfareplatform.org",
      availability: "Response within 2 hours",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our representatives",
      contact: "Available on website",
      availability: "9 AM - 9 PM",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Headphones,
      title: "WhatsApp",
      description: "Quick support via WhatsApp",
      contact: "+92 300 1234567",
      availability: "24/7 Available",
      color: "bg-green-100 text-green-600",
    },
  ]

  const offices = [
    {
      city: "Karachi",
      address: "123 Welfare Street, Gulshan-e-Iqbal, Karachi",
      phone: "+92 21 1234 5678",
      email: "karachi@welfareplatform.org",
    },
    {
      city: "Lahore",
      address: "456 Care Avenue, Model Town, Lahore",
      phone: "+92 42 9876 5432",
      email: "lahore@welfareplatform.org",
    },
    {
      city: "Islamabad",
      address: "789 Support Plaza, F-8 Markaz, Islamabad",
      phone: "+92 51 2468 1357",
      email: "islamabad@welfareplatform.org",
    },
    {
      city: "Peshawar",
      address: "321 Help Center, University Town, Peshawar",
      phone: "+92 91 1357 2468",
      email: "peshawar@welfareplatform.org",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">Contact Us</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">We're Here to Help</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Have questions about our services? Need assistance with your application? Our dedicated support team is
              available 24/7 to help you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Multiple Ways to Reach Us</h2>
            <p className="text-xl text-gray-600">Choose the most convenient way to get in touch with our team</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <method.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-lg text-blue-900">{method.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-600 text-sm">{method.description}</p>
                  <p className="font-semibold text-blue-900">{method.contact}</p>
                  <Badge variant="secondary" className="text-xs">
                    {method.availability}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form and Info */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900">Send us a Message</CardTitle>
                <p className="text-gray-600">Fill out the form below and we'll get back to you within 2 hours</p>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-green-600 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600">Thank you for contacting us. We'll respond within 2 hours.</p>
                    <Button
                      onClick={() => {
                        setIsSubmitted(false)
                        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
                      }}
                      className="mt-4"
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+92 300 1234567"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What is this regarding?"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please describe your inquiry in detail..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Hours */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-900">
                    <Clock className="h-5 w-5 mr-2" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Emergency Support</span>
                      <span className="font-semibold text-green-600">24/7 Available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Regional Offices */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-900">
                    <MapPin className="h-5 w-5 mr-2" />
                    Regional Offices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {offices.map((office, index) => (
                    <div key={index} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                      <h4 className="font-semibold text-blue-900 mb-2">{office.city}</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>{office.address}</p>
                        <p>Phone: {office.phone}</p>
                        <p>Email: {office.email}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
