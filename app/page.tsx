"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import ImageCarousel from "@/components/image-currosal"
import Link from "next/link"
import { DollarSign, BookOpen, Home, Stethoscope, GraduationCap, Utensils, Phone, MapPin, Clock, Target } from "lucide-react"
import CallToAction from "@/components/CTA-section"
import CompleteHeroSection from "@/components/complete-herosection";
import FloatingBot from "@/components/FloatingBot"

export default function HomePage() {
  const [, setDailyRequests] = useState<{ date: string, count: number }[]>([]);
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
  const [, setStats] = useState({
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
      description:
        "We provide emergency loans and microfinance support to uplift small businesses, assist low-income families, and help individuals overcome sudden financial crises with dignity and confidence.",
      color: "bg-green-100 text-green-600",
      cases: "2,400+ Cases",
      image: "/help1.jpg",
      href: "/services",
    },
    {
      icon: Stethoscope,
      title: "Medical Support",
      description:
        "From covering hospital expenses to providing essential medicines, we ensure patients receive timely healthcare services and struggling families get much-needed relief during medical emergencies.",
      color: "bg-red-100 text-red-600",
      cases: "3,400+ Patients",
      image: "/help2.jpg",
      href: "/services",
    },
    {
      icon: GraduationCap,
      title: "Education Support",
      description:
        "Scholarships, school supplies, and financial aid programs help deserving students continue their studies, achieve academic excellence, and build brighter futures without interruptions or obstacles.",
      color: "bg-blue-100 text-blue-600",
      cases: "1,200+ Students",
      image: "/help3.jpg",
      href: "/services",
    },
    {
      icon: Home,
      title: "Marriage Support",
      description:
        "We ease marriage expenses through financial aid, dowry assistance, and household setup support, helping underprivileged families start new journeys with hope, dignity, and lasting stability.",
      color: "bg-purple-100 text-purple-600",
      cases: "800+ Homes",
      image: "/help4.jpg",
      href: "/services",
    },
    {
      icon: Utensils,
      title: "Business Development",
      description:
        "We provide seed capital, expert guidance, and essential resources to help aspiring entrepreneurs start or expand small businesses, promoting self-reliance, growth, and sustainable livelihoods.",
      color: "bg-orange-100 text-orange-600",
      cases: "5,600+ Families",
      image: "/help5.jpg",
      href: "/services",
    },
    {
      icon: BookOpen,
      title: "Livelihood Support",
      description:
        "Providing tools, sewing machines, carts, and small resources to deserving families so they can start earning with dignity, support their children’s education, and build a stable future.",
      color: "bg-cyan-100 text-cyan-600",
      cases: "1200+ Families Supported",
      image: "/help6.jpg",
      href: "/services",
    },

  ];




  const achievements = [
    { number: "15+", label: "Years of Service", icon: Clock },
    { number: "50+", label: "Cities Covered", icon: MapPin },
    { number: "94%", label: "Success Rate", icon: Target },
    { number: "24/7", label: "Support Available", icon: Phone },
  ]

  return (
    <div className="min-h-screen bg-white">

      <div className="px-0 xs:px-2 sm:px-4 pt-2 sm:pt-6">
        <CompleteHeroSection />
      </div>

      {/* Why Choose Us */}
      <section className="relative py-10 px-2 sm:py-16 sm:px-4 bg-gradient-to-b from-[#F8FAFF] via-white to-[#F5F7FF] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-3xl"></div>
          <div className="absolute -bottom-28 -right-20 w-72 h-72 sm:w-[28rem] sm:h-[28rem] rounded-full bg-gradient-to-tr from-indigo-600/10 to-blue-500/10 blur-3xl"></div>
        </div>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative">
          <div className="relative mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row items-center justify-center">
              <div className="hidden lg:block flex-1 mr-8">
                <div className="h-0.5 bg-gradient-to-l from-blue-600 via-cyan-500 to-transparent"></div>
              </div>
              <div className="text-center px-2 sm:px-8">
                <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 text-[#1B0073]">Trusted Excellence <span className="text-[#00A5E0]">in Welfare</span></h2>
                <p className="text-base sm:text-lg text-[#5F5F5F] max-w-2xl sm:max-w-3xl mx-auto">
                  Together, we can create lasting change in the lives of those who need it most. Your support makes a real
                  difference in our community.
                </p>
              </div>
              <div className="hidden lg:block flex-1 ml-8">
                <div className="h-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-transparent"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-16">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-indigo-600/60 shadow-[0_10px_30px_rgba(17,24,39,0.08)] hover:shadow-[0_20px_40px_rgba(17,24,39,0.12)] transition-shadow"
              >
                <div className="relative rounded-2xl bg-white/80 backdrop-blur-xl p-4 sm:p-6 text-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.01] ring-1 ring-transparent group-hover:ring-blue-200/60">
                  <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center shadow-sm">
                    <achievement.icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-blue-900 mb-1">{achievement.number}</div>
                  <div className="text-xs sm:text-md font-medium text-gray-600">{achievement.label}</div>
                  <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-tr from-transparent via-white/40 to-transparent animate-pulse [mask-image:linear-gradient(90deg,transparent,black,transparent)]"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>



          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="group relative h-64 overflow-hidden border-0 shadow-lg rounded-2xl bg-white">
              {/* Image slides right */}
              <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full">
                <img
                  src="/verify.png"
                  alt="Verified Applications"
                  className="w-full h-full object-cover"
                />
              </div>


              {/* Text slides left */}
              <div className="absolute inset-0 p-6 flex flex-col justify-center items-start translate-x-[-100%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">100% Verified</h3>
                <p className="text-md text-gray-600 leading-relaxed">
                  Every application undergoes rigorous verification by our dedicated team.
                  We review documents, conduct field validations, and cross-check references
                  to ensure authenticity.
                </p>
              </div>

              {/* Label */}
               <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-3 py-1 rounded-md drop-shadow-[0_0_8px_rgba(0,102,255,0.8)] animate-pulse">
                100% Verified
              </div>
            </Card>

            {/* Card 2 */}
            <Card className="group relative h-64 overflow-hidden border-0 shadow-lg rounded-2xl bg-white">
              {/* Image slides right */}
              <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full">
                <img
                  src="/fast-p.png"
                  alt="Fast Processing"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text slides left */}
              <div className="absolute inset-0 p-6 flex flex-col justify-center items-start translate-x-[-100%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Fast Processing</h3>
                <p className="text-md text-gray-500 leading-relaxed">
                  Priority triage ensures urgent cases are processed first. Emergency requests
                  are handled within 24 hours, and standard applications within 48 hours.
                  Automation plus expert review makes it quick and reliable.
                </p>
              </div>

              {/* Label */}
               <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-3 py-1 rounded-md drop-shadow-[0_0_8px_rgba(0,102,255,0.8)] animate-pulse">
                Fast Process
              </div>
            </Card>

            {/* Card 3 */}
            <Card className="group relative h-64 overflow-hidden border-0 shadow-lg rounded-2xl bg-white">
              {/* Image slides right */}
              <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-full">
                <img
                  src="/nation-w.png"
                  alt="Nationwide Network"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text slides left */}
              <div className="absolute inset-0 p-6 flex flex-col justify-center items-start translate-x-[-100%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Nationwide Network</h3>
                <p className="text-md text-gray-500 leading-relaxed">
                  With 50+ offices and 200+ field coordinators, we maintain a strong presence
                  across all provinces. Local teams understand local needs—enabling faster
                  verification and smoother assistance delivery.
                </p>
              </div>

              {/* Label */}
              <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-3 py-1 rounded-md drop-shadow-[0_0_8px_rgba(0,102,255,0.8)] animate-pulse">
                Nationwide Network
              </div>
            </Card>
          </div>
        </div>
      </section>


      <ImageCarousel />


      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative mb-8">
            <div className="flex items-center justify-center">
              <div className="hidden lg:block flex-1 mr-8">
                <div className="h-0.5 bg-gradient-to-l from-blue-600 via-cyan-500 to-transparent"></div>
              </div>
              <div className="text-center px-8">
                <h2 className="text-5xl md:text-5xl font-bold mb-3 text-[#1B0073]">Valueable Welfare<span className="text-[#00A5E0]"> Programs</span></h2>
                <p className="text-lg text-[#5F5F5F] max-w-3xl mx-auto">
                  Together, we can create lasting change in the lives of those who need it most. Your support makes a real
                  difference in our community.
                </p>
              </div>
              <div className="hidden lg:block flex-1 ml-8">
                <div className="h-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-transparent"></div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link key={index} href={service.href} aria-label={service.title} className="group block relative h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                <div className="absolute inset-0">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-[filter] duration-700 ease-out group-hover:blur-sm bg-white" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-blue-900/10 to-transparent" />
                </div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="p-5 flex items-center gap-3">
                    <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center shadow-sm`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-white text-lg font-semibold drop-shadow">{service.title}</h3>
                      <span className="text-white/80 text-xs">{service.cases}</span>
                    </div>
                  </div>
                  <div className="flex-1" />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 translate-y-full group-hover:translate-y-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] opacity-0 group-hover:opacity-100">
                  <div className="bg-blue-50/95 backdrop-blur-sm p-5 h-full rounded-t-2xl border-t border-blue-100/80">
                    <p className="text-md text-light text-gray-500">{service.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>



      {/* How It Works */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#1B0073] mb-3">How We <span className="text-[#00A5E0]">Help You</span></h2>
            <p className="text-lg text-[#5F5F5F] max-w-3xl mx-auto">
              A clear, four-step journey from application to disbursement—fast, transparent, and secure.
            </p>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute hidden md:block left-0 right-0 top-10 h-px bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200" />

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Apply Online", desc: "Submit your application securely with required details.", icon: BookOpen },
                { step: "02", title: "Verification", desc: "Our team validates your documents and information.", icon: Clock },
                { step: "03", title: "Review", desc: "Experts assess your case and finalize the assistance.", icon: Target },
                { step: "04", title: "Disbursement", desc: "Funds or support are delivered quickly and safely.", icon: DollarSign },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div
                    className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-indigo-600/60 shadow-[0_10px_30px_rgba(17,24,39,0.08)] hover:shadow-[0_20px_40px_rgba(17,24,39,0.12)] transition-shadow"
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-6 h-full transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.01]">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white flex items-center justify-center text-md font-semibold shadow-sm">
                            {item.step}
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shadow-sm">
                            <item.icon className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="hidden md:block w-10 h-10 rounded-full bg-gradient-to-tr from-white to-white/40 shadow-inner" />
                      </div>
                      <h3 className="text-lg font-semibold text-blue-900 mb-2">{item.title}</h3>
                      <p className="text-md text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    <CallToAction />

    <FloatingBot />
    </div>
  )
}