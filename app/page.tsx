"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ImageCarousel from "@/components/image-currosal"
import { Users, Heart, TrendingUp, ArrowRight, Play, Shield, Award, Globe, DollarSign, BookOpen, Home, Stethoscope, GraduationCap, Utensils, Phone, MapPin, Clock, Target, } from "lucide-react"
import Link from "next/link"
import CallToAction from "@/components/CTA-section"
import CompleteHeroSection from "@/components/complete-herosection";

export default function HomePage() {
  const [dailyRequests, setDailyRequests] = useState<{ date: string, count: number }[]>([]);
  useEffect(() => {
    async function fetchDaily() {
      const res = await fetch('/api/stats/requests-daily');
      const data = await res.json();
      setDailyRequests(data.daily || []);
    }
    fetchDaily();
    const interval = setInterval(fetchDaily, 10000); // auto-refresh every 10s
    return () => clearInterval(interval);
  }, []);
  const [stats, setStats] = useState({
    totalHelped: 15420,
    totalDonated: 2850000,
    activeProjects: 156,
    successRate: 94,
    familiesSupported: 8500,
    scholarshipsGiven: 1200,
    medicalCases: 3400,
    emergencyRelief: 2800,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        totalHelped: prev.totalHelped + Math.floor(Math.random() * 3),
        totalDonated: prev.totalDonated + Math.floor(Math.random() * 1000),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])


  const services = [
    {
      icon: DollarSign,
      title: "Financial Assistance",
      description: "Emergency loans and microfinance for small businesses",
      color: "bg-green-100 text-green-600",
      cases: "2,400+ Cases",
    },
    {
      icon: Stethoscope,
      title: "Medical Support",
      description: "Healthcare assistance and medical emergency funds",
      color: "bg-red-100 text-red-600",
      cases: "3,400+ Patients",
    },
    {
      icon: GraduationCap,
      title: "Education Support",
      description: "Scholarships and educational assistance programs",
      color: "bg-blue-100 text-blue-600",
      cases: "1,200+ Students",
    },
    {
      icon: Home,
      title: "Housing Assistance",
      description: "Home construction and repair support",
      color: "bg-purple-100 text-purple-600",
      cases: "800+ Homes",
    },
    {
      icon: Utensils,
      title: "Food Security",
      description: "Monthly ration and emergency food supplies",
      color: "bg-orange-100 text-orange-600",
      cases: "5,600+ Families",
    },
    {
      icon: BookOpen,
      title: "Skill Development",
      description: "Vocational training and capacity building",
      color: "bg-cyan-100 text-cyan-600",
      cases: "900+ Trained",
    },
  ]

  const achievements = [
    { number: "15+", label: "Years of Service", icon: Clock },
    { number: "50+", label: "Cities Covered", icon: MapPin },
    { number: "94%", label: "Success Rate", icon: Target },
    { number: "24/7", label: "Support Available", icon: Phone },
  ]

  return (
    <div className="min-h-screen bg-white">

      <CompleteHeroSection />

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-blue-900 mb-4">Trusted Excellence in Welfare</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to transparency, efficiency, and impact has made us Pakistan's most trusted welfare
              platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="text-center p-6 border-0 shadow-lg bg-white hover:shadow-xl transition-shadow"
              >
                <achievement.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-blue-900 mb-2">{achievement.number}</div>
                <div className="text-gray-600">{achievement.label}</div>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-blue-900">100% Verified</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Every application undergoes rigorous verification by our field teams to ensure authenticity and
                  prevent fraud.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-blue-900">Fast Processing</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Emergency cases processed within 24 hours, regular applications within 48 hours for quick assistance.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Globe className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-blue-900">Nationwide Network</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Serving all provinces with 50+ offices and 200+ field coordinators ensuring local presence everywhere.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ImageCarousel />


      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-blue-900 mb-4">Comprehensive Welfare Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide holistic support across multiple sectors to ensure sustainable development and empowerment of
              communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <service.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl text-blue-900">{service.title}</CardTitle>
                  <Badge variant="secondary" className="w-fit">
                    {service.cases}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0">
                    Learn More <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-blue-900 mb-4">How We Help You</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process ensures quick and efficient assistance to those who need it most.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Apply Online",
                desc: "Submit your application with required documents through our secure portal.",
              },
              {
                step: "02",
                title: "Verification",
                desc: "Our field team verifies your case and conducts necessary background checks.",
              },
              {
                step: "03",
                title: "Review",
                desc: "Expert committee reviews your application and determines the assistance amount.",
              },
              {
                step: "04",
                title: "Disbursement",
                desc: "Approved assistance is disbursed directly to your account or through our centers.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-cyan-200"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </div>
  )
}