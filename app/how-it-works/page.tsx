'use client'
import { Button } from "@/components/ui/button"
import { FileText, Search, Users, CheckCircle, Clock, Shield, Phone, Mail, AlertCircle, Info, BookOpen, MapPin, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Submit Application",
      description: "Fill out our comprehensive online application form",
      icon: FileText,
      image: "/how-work-1.png",
      details: [
        "Complete personal, family, and contact information",
        "Upload required documents (CNIC, income proof, utility bills, etc.)",
        "Select the exact type of assistance you are applying for",
        "Provide a clear explanation of your financial condition",
        "Attach any medical, educational, or other relevant certificates",
        "Review and confirm your application before submitting",
      ],
      timeframe: "5-10 minutes",
      color: "blue",
    },
    {
      number: "02",
      title: "Initial Review",
      description: "Our team conducts preliminary verification",
      icon: Search,
      image: "/how-work-2.png",
      details: [
        "Verify authenticity of uploaded CNIC and documents",
        "Assess eligibility against program requirements",
        "Cross-check provided income and employment details",
        "Contact applicant for clarification if needed",
        "Prepare case file for field investigation",
      ],
      timeframe: "24-48 hours",
      color: "green",
    },
    {
      number: "03",
      title: "Field Investigation",
      description: "On-ground verification by our field team",
      icon: Users,
      image: "/how-work-3.png",
      details: [
        "Home visit by certified field officer",
        "Interview with applicant and family members",
        "Neighbor and community verification for credibility",
        "Assessment of living conditions and assets",
        "Collection of photographic evidence and reports",
        "Submission of field report to committee",
      ],
      timeframe: "3-5 working days",
      color: "purple",
    },
    {
      number: "04",
      title: "Committee Decision",
      description: "Final approval by our welfare committee",
      icon: CheckCircle,
      image: "/hero2.jpg",
      details: [
        "Case presentation to welfare committee members",
        "Review of application, documents, and field report",
        "Evaluation based on urgency, need, and transparency",
        "Approval, rejection, or conditional recommendation",
        "Applicant notified via SMS, email, or phone call",
        "Approved cases forwarded for disbursement",
      ],
      timeframe: "7-10 working days",
      color: "orange",
    },
  ]

  const requirements = [
    {
      category: "Personal Documents",
      items: [
        "Original CNIC (Computerized National Identity Card)",
        "Family registration certificate",
        "Passport-size photographs",
        "Contact information and references",
      ],
    },
    {
      category: "Financial Documents",
      items: [
        "Income certificate or salary slips",
        "Bank statements (if applicable)",
        "Property documents (if any)",
        "Utility bills as address proof",
      ],
    },
    {
      category: "Supporting Documents",
      items: [
        "Medical reports (for health-related assistance)",
        "Educational certificates (for education support)",
        "Business plan (for business loans)",
        "Character certificate from local authority",
      ],
    },
  ]

  const eligibilityCriteria = [
    {
      title: "Pakistani Citizenship",
      description: "Must be a Pakistani citizen with valid CNIC",
      icon: Shield,
    },
    {
      title: "Income Threshold",
      description: "Monthly household income below PKR 50,000",
      icon: AlertCircle,
    },
    {
      title: "Genuine Need",
      description: "Demonstrable financial hardship or emergency",
      icon: Info,
    },
    {
      title: "No Previous Default",
      description: "No history of loan default with any organization",
      icon: CheckCircle,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative py-20 px-4 bg-cover bg-center bg-fixed h-[70vh] flex flex-col items-center justify-center text-center"
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
            <span className="text-[#1B0073]">Simple </span>{" "}
            <span className="text-[#00A5E0]">4-Step Process</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-base xs:text-lg sm:text-xl mb-8 max-w-3xl mx-auto text-gray-100 opacity-90"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Getting assistance has never been easier. Our streamlined process ensures quick, fair, and transparent
            evaluation of every application.
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#1B0073] to-[#00A5E0] hover:opacity-90 text-white"
              asChild
            >
              <Link href="/signup">Start Application</Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2  text-[#1B0073] hover:bg-[#00A5E0] hover:text-white"
              asChild
            >
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>


      {/* Process Steps */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="relative mb-10">
            <div className="flex items-center justify-center">
              <div className="hidden lg:block flex-1 mr-8">
                <div className="h-0.5 bg-gradient-to-l from-blue-600 via-cyan-500 to-transparent"></div>
              </div>
              <div className="text-center px-8">
                <h2 className="text-5xl font-bold mb-2 text-[#1B0073]">Application <span className="text-[#00A5E0]">Process</span></h2>
                <p className="text-lg text-[#5F5F5F] max-w-3xl mx-auto">Follow these simple steps to apply for assistance</p>
              </div>
              <div className="hidden lg:block flex-1 ml-8">
                <div className="h-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-transparent"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-indigo-600/60 shadow-[0_10px_30px_rgba(17,24,39,0.08)] hover:shadow-[0_20px_40px_rgba(17,24,39,0.12)] transition-shadow"
              >
                <Link
                  href="/signup"
                  aria-label={step.title}
                  className="block relative h-96 rounded-2xl overflow-hidden bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.01]"
                >
                  <div className="absolute inset-0">
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover transition-[transform,filter] duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.06] group-hover:translate-y-[-2px] group-hover:blur-[2px] [will-change:transform,filter]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    <div className="p-4 flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white flex items-center justify-center text-xs font-semibold shadow-sm">
                        {step.number}
                      </div>
                      <div className="w-9 h-9 rounded-lg bg-white/90 backdrop-blur text-blue-700 flex items-center justify-center shadow">
                        <step.icon className="h-4 w-4" />
                      </div>
                      <h3 className="ml-2 text-white text-base font-semibold drop-shadow line-clamp-1">{step.title}</h3>
                    </div>
                    <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_0_6px_rgba(34,211,238,0.25)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex-1" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-1/2 translate-y-full group-hover:translate-y-0 transition-[transform,opacity] duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] opacity-0 group-hover:opacity-100 [will-change:transform,opacity]">
                    <div className="bg-white/90 backdrop-blur-md p-4 h-full rounded-t-2xl border-t border-blue-100/70">
                      <p className="text-sm text-gray-700 mb-3 line-clamp-3">{step.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.details.slice(0, 2).map((detail, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1 text-[11px] text-blue-800 bg-blue-50 border border-blue-100 rounded-full px-2 py-1">
                            <CheckCircle className="h-3 w-3 text-blue-600" />
                            {detail}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-medium text-blue-600">Typical timeframe: {step.timeframe}</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-tr from-transparent via-white/40 to-transparent [mask-image:linear-gradient(90deg,transparent,black,transparent)]"></div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-700"></div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <div className="relative mb-10">
            <div className="flex items-center justify-center">
              <div className="hidden lg:block flex-1 mr-8">
                <div className="h-0.5 bg-gradient-to-l from-blue-600 via-cyan-500 to-transparent"></div>
              </div>
              <div className="text-center px-8">
                <h2 className="text-5xl font-bold mb-2 text-[#1B0073]">Required <span className="text-[#00A5E0]">Documents</span></h2>
                <p className="text-lg text-[#5F5F5F] max-w-3xl mx-auto">Prepare these documents before starting your application</p>
              </div>
              <div className="hidden lg:block flex-1 ml-8">
                <div className="h-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-transparent"></div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {requirements.map((req, index) => (
              <div key={index} className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-indigo-600/60 shadow-[0_10px_30px_rgba(17,24,39,0.08)] hover:shadow-[0_20px_40px_rgba(17,24,39,0.12)] transition-shadow">
                <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-6 h-full">
                  <h3 className="text-blue-900 font-semibold text-lg mb-4">{req.category}</h3>
                  <ul className="space-y-3">
                    {req.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="relative mb-10">
            <div className="flex items-center justify-center">
              <div className="hidden lg:block flex-1 mr-8">
                <div className="h-0.5 bg-gradient-to-l from-blue-600 via-cyan-500 to-transparent"></div>
              </div>
              <div className="text-center px-8">
                <h2 className="text-5xl font-bold mb-2 text-[#1B0073]">Eligibility <span className="text-[#00A5E0]">Criteria</span></h2>
                <p className="text-lg text-[#5F5F5F]">Basic requirements to qualify for assistance</p>
              </div>
              <div className="hidden lg:block flex-1 ml-8">
                <div className="h-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-transparent"></div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eligibilityCriteria.map((criteria, index) => (
              <div key={index} className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-indigo-600/60 shadow-[0_10px_30px_rgba(17,24,39,0.08)] hover:shadow-[0_20px_40px_rgba(17,24,39,0.12)] transition-shadow">
                <div className="rounded-2xl bg-white/80 backdrop-blur-xl p-6 text-center h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <criteria.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-blue-900 font-semibold mb-2">{criteria.title}</h3>
                  <p className="text-gray-600 text-sm">{criteria.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Contact Support */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-[#1B0073] to-[#00A5E0] shadow-2xl">
              <div className="rounded-3xl bg-gradient-to-r from-[#1B0073]/90 to-[#00A5E0]/90 p-12 sm:p-16 text-white h-full flex flex-col justify-between">

                {/* Heading & Description */}
                <div className="max-w-3xl">
                  <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
                    Need Help with Your Application?
                  </h2>
                  <p className="text-lg sm:text-xl mb-8 text-gray-100/90">
                    Our dedicated support team is here to guide you through every step of the process. Reach out anytime for assistance.
                  </p>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3 rounded-xl p-4">
                    <Phone className="h-6 w-6 text-white" />
                    <span className="text-base sm:text-md font-light">+92 42 111 786 786</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl p-4">
                    <Mail className="h-6 w-6 text-white" />
                    <span className="text-base sm:text-md font-light">support@idaraalkhair.com</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-[#1B0073] font-semibold hover:bg-gray-100 shadow-lg transition"
                    asChild
                  >
                    <Link href="/signup">Start Your Application</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-[#1B0073] bg-transparent font-semibold shadow transition"
                    asChild
                  >
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </div>
              </div>

              {/* Optional Decorative Glow */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-gradient-to-tr from-[#00A5E0]/50 to-[#1B0073]/50 blur-3xl pointer-events-none"></div>
              <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-gradient-to-tr from-[#1B0073]/50 to-[#00A5E0]/50 blur-3xl pointer-events-none"></div>
            </div>


            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Office Hours",
                  text: "Mon–Sat, 9:00 AM – 6:00 PM",
                  image: "/how-work-1.png",
                  extra: "Always available to assist you during working hours",
                  color: "from-blue-400 to-blue-600",
                  icon: Clock,
                },
                {
                  title: "Response Time",
                  text: "We usually respond within 24 hours",
                  extra: "Fast, reliable responses for urgent inquiries",
                  image: "/how-work-2.png",
                  color: "from-green-400 to-green-600",
                  icon: RefreshCw,
                },
                {
                  title: "Visit Center",
                  text: "Find your nearest welfare center",
                  extra: "Locate centers easily with real-time directions",
                  image: "/how-work-3.png",
                  color: "from-purple-400 to-purple-600",
                  icon: MapPin,
                },
                {
                  title: "Guidelines",
                  text: "Read the do’s and don’ts before applying",
                  extra: "Ensure smooth application process by following instructions",
                  image: "/how-work-4.png",
                  color: "from-orange-400 to-orange-600",
                  icon: BookOpen,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="relative group h-56 overflow-hidden rounded-2xl shadow-xl cursor-pointer"
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-xl flex items-center transition-transform duration-500 group-hover:-translate-x-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-1/3 h-full object-cover"
                    />
                    <div className="flex-1 p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.text}</p>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white flex items-center transition-transform duration-500 group-hover:translate-x-0 translate-x-full p-6">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-sm">{item.extra}</p>
                    </div>
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
