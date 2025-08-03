import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  TrendingUp,
  GraduationCap,
  Stethoscope,
  Home,
  Utensils,
  Shirt,
  Baby,
  Briefcase,
  Users,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      id: "business-loans",
      icon: TrendingUp,
      title: "Business Development Loans",
      description: "Start or expand your business with flexible financing options",
      details: [
        "Loan amounts: PKR 50,000 - PKR 2,000,000",
        "Low interest rates: 5-8% annually",
        "No collateral required for amounts under PKR 500,000",
        "Business mentoring and training included",
        "Flexible repayment terms: 12-60 months",
      ],
      beneficiaries: "5,200+",
      successRate: "94%",
      color: "blue",
    },
    {
      id: "microfinance",
      icon: Briefcase,
      title: "Microfinance Support",
      description: "Small loans for micro-entrepreneurs and home-based businesses",
      details: [
        "Micro loans: PKR 10,000 - PKR 100,000",
        "Quick approval within 48 hours",
        "Group lending model available",
        "Financial literacy training provided",
        "Zero processing fees",
      ],
      beneficiaries: "3,800+",
      successRate: "96%",
      color: "green",
    },
    {
      id: "education-support",
      icon: GraduationCap,
      title: "Educational Assistance",
      description: "Scholarships and educational support for all academic levels",
      details: [
        "Primary to university level support",
        "Books, uniforms, and supplies included",
        "Merit and need-based scholarships",
        "Vocational training programs",
        "Online learning resources",
      ],
      beneficiaries: "4,500+",
      successRate: "92%",
      color: "purple",
    },
    {
      id: "emergency-medical",
      icon: Stethoscope,
      title: "Emergency Medical Aid",
      description: "Immediate healthcare assistance for medical emergencies",
      details: [
        "Emergency medical expenses up to PKR 500,000",
        "Direct hospital payment system",
        "24/7 emergency response team",
        "Specialist consultation coverage",
        "Medicine and treatment support",
      ],
      beneficiaries: "2,900+",
      successRate: "98%",
      color: "red",
    },
    {
      id: "housing-assistance",
      icon: Home,
      title: "Housing & Shelter Support",
      description: "Housing assistance and home improvement programs",
      details: [
        "Home repair and renovation grants",
        "Rental assistance for families in need",
        "Construction material support",
        "Temporary shelter arrangements",
        "Housing counseling services",
      ],
      beneficiaries: "1,800+",
      successRate: "89%",
      color: "orange",
    },
    {
      id: "food-security",
      icon: Utensils,
      title: "Food Security Program",
      description: "Ensuring no family goes hungry through food assistance",
      details: [
        "Monthly food packages for families",
        "Nutritional support for children",
        "Emergency food relief",
        "Community kitchen programs",
        "Agricultural support for farmers",
      ],
      beneficiaries: "6,200+",
      successRate: "100%",
      color: "yellow",
    },
    {
      id: "clothing-assistance",
      icon: Shirt,
      title: "Clothing & Essential Items",
      description: "Providing clothing and essential household items",
      details: [
        "Seasonal clothing distribution",
        "School uniforms for children",
        "Essential household items",
        "Winter clothing drives",
        "Special occasion clothing support",
      ],
      beneficiaries: "3,400+",
      successRate: "95%",
      color: "indigo",
    },
    {
      id: "child-welfare",
      icon: Baby,
      title: "Child Welfare Services",
      description: "Comprehensive support for children's development and welfare",
      details: [
        "Child nutrition programs",
        "Educational support and tutoring",
        "Healthcare and vaccination drives",
        "Child protection services",
        "Recreational and sports activities",
      ],
      beneficiaries: "5,600+",
      successRate: "93%",
      color: "pink",
    },
    {
      id: "women-empowerment",
      icon: Users,
      title: "Women Empowerment",
      description: "Empowering women through skills development and support",
      details: [
        "Skills training and vocational courses",
        "Women's business development support",
        "Financial literacy programs",
        "Legal aid and counseling",
        "Leadership development workshops",
      ],
      beneficiaries: "2,700+",
      successRate: "91%",
      color: "teal",
    },
    {
      id: "elderly-care",
      icon: Heart,
      title: "Elderly Care Services",
      description: "Comprehensive care and support for senior citizens",
      details: [
        "Healthcare support for elderly",
        "Monthly stipend for senior citizens",
        "Home care services",
        "Social activities and companionship",
        "Medical equipment provision",
      ],
      beneficiaries: "1,200+",
      successRate: "97%",
      color: "gray",
    },
    {
      id: "disability-support",
      icon: Shield,
      title: "Disability Support Services",
      description: "Specialized support for persons with disabilities",
      details: [
        "Assistive devices and equipment",
        "Rehabilitation services",
        "Skills training for employment",
        "Accessibility improvements",
        "Family support and counseling",
      ],
      beneficiaries: "800+",
      successRate: "88%",
      color: "cyan",
    },
    {
      id: "emergency-relief",
      icon: Zap,
      title: "Emergency Relief Operations",
      description: "Rapid response during natural disasters and emergencies",
      details: [
        "Disaster relief and rescue operations",
        "Emergency shelter arrangements",
        "Food and water distribution",
        "Medical emergency response",
        "Rehabilitation and reconstruction",
      ],
      beneficiaries: "12,000+",
      successRate: "96%",
      color: "red",
    },
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "from-blue-500 to-blue-600 bg-blue-100 text-blue-800",
      green: "from-green-500 to-green-600 bg-green-100 text-green-800",
      purple: "from-purple-500 to-purple-600 bg-purple-100 text-purple-800",
      red: "from-red-500 to-red-600 bg-red-100 text-red-800",
      orange: "from-orange-500 to-orange-600 bg-orange-100 text-orange-800",
      yellow: "from-yellow-500 to-yellow-600 bg-yellow-100 text-yellow-800",
      indigo: "from-indigo-500 to-indigo-600 bg-indigo-100 text-indigo-800",
      pink: "from-pink-500 to-pink-600 bg-pink-100 text-pink-800",
      teal: "from-teal-500 to-teal-600 bg-teal-100 text-teal-800",
      gray: "from-gray-500 to-gray-600 bg-gray-100 text-gray-800",
      cyan: "from-cyan-500 to-cyan-600 bg-cyan-100 text-cyan-800",
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800">Our Services</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Comprehensive Welfare Programs</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              From emergency assistance to long-term empowerment, our 12 specialized programs address every aspect of
              community welfare and individual development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/apply">Apply for Assistance</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/how-it-works">How It Works</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">All Welfare Programs</h2>
            <p className="text-xl text-gray-600">Choose the program that best fits your needs</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const colorClasses = getColorClasses(service.color)
              const [gradientClasses, badgeClasses] = colorClasses.split(" bg-")

              return (
                <Card key={service.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${gradientClasses} rounded-2xl flex items-center justify-center`}
                      >
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-right">
                        <Badge className={`bg-${badgeClasses} mb-2`}>{service.beneficiaries} helped</Badge>
                        <div className="text-sm text-gray-600">{service.successRate} success rate</div>
                      </div>
                    </div>
                    <CardTitle className="text-gray-900 text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {service.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{detail}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full" asChild>
                      <Link href={`/apply?service=${service.id}`}>
                        Apply for {service.title}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How to Apply</h2>
            <p className="text-xl text-gray-600">Simple steps to access our services</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Choose Service</h3>
              <p className="text-sm text-gray-600">Select the program that matches your needs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Submit Application</h3>
              <p className="text-sm text-gray-600">Fill out the online application form</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Review Process</h3>
              <p className="text-sm text-gray-600">Our team reviews your application</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Receive Support</h3>
              <p className="text-sm text-gray-600">Get approved and receive assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't let financial challenges hold you back. Our comprehensive programs are designed to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/contact">Need Help Choosing?</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
