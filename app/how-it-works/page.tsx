import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, Users, CheckCircle, Clock, Shield, Phone, Mail, AlertCircle, Info } from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Submit Application",
      description: "Fill out our comprehensive online application form",
      icon: FileText,
      details: [
        "Complete personal and family information",
        "Upload required documents (CNIC, income proof, etc.)",
        "Select the type of assistance needed",
        "Provide detailed explanation of your situation",
      ],
      timeframe: "5-10 minutes",
      color: "blue",
    },
    {
      number: "02",
      title: "Initial Review",
      description: "Our team conducts preliminary verification",
      icon: Search,
      details: [
        "Document verification and authenticity check",
        "Basic eligibility criteria assessment",
        "Contact information verification",
        "Initial background screening",
      ],
      timeframe: "24-48 hours",
      color: "green",
    },
    {
      number: "03",
      title: "Field Investigation",
      description: "On-ground verification by our field team",
      icon: Users,
      details: [
        "Home visit by certified field officer",
        "Neighbor and community verification",
        "Income and asset assessment",
        "Family situation evaluation",
      ],
      timeframe: "3-5 working days",
      color: "purple",
    },
    {
      number: "04",
      title: "Committee Decision",
      description: "Final approval by our welfare committee",
      icon: CheckCircle,
      details: [
        "Case presentation to welfare committee",
        "Thorough review of all documentation",
        "Decision based on need and eligibility",
        "Approval notification sent to applicant",
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
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800">How It Works</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Simple 4-Step Process</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Getting assistance has never been easier. Our streamlined process ensures quick, fair, and transparent
              evaluation of every application.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/apply">Start Application</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Application Process</h2>
            <p className="text-xl text-gray-600">Follow these simple steps to apply for assistance</p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-24 bg-gray-200 hidden md:block"></div>
                )}

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className={`${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-full flex items-center justify-center`}
                      >
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 font-medium">Step {step.number}</div>
                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                    <div className="space-y-3">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{detail}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center space-x-2 mt-6">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">Typical timeframe: {step.timeframe}</span>
                    </div>
                  </div>

                  <div className={`${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                    <div className="bg-gray-50 rounded-2xl p-8 text-center">
                      <div className="text-6xl font-bold text-gray-200 mb-4">{step.number}</div>
                      <img
                        src={`/placeholder.svg?height=200&width=300&text=Step ${step.number}`}
                        alt={step.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Required Documents</h2>
            <p className="text-xl text-gray-600">Prepare these documents before starting your application</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {requirements.map((req, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-gray-900">{req.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {req.items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Eligibility Criteria</h2>
            <p className="text-xl text-gray-600">Basic requirements to qualify for assistance</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eligibilityCriteria.map((criteria, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <criteria.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-gray-900">{criteria.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{criteria.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Common questions about our application process</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-gray-900">How long does the entire process take?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  The complete process typically takes 10-15 working days from application submission to final decision.
                  Emergency cases may be expedited and processed within 3-5 days.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-gray-900">Can I apply for multiple programs simultaneously?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, you can apply for multiple programs, but each application will be evaluated separately. However,
                  we recommend focusing on your most urgent need first.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-gray-900">What happens if my application is rejected?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  If your application is rejected, you'll receive a detailed explanation. You can reapply after
                  addressing the issues mentioned, or appeal the decision within 30 days.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-gray-900">Is there any fee for applying?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No, there is absolutely no fee for applying to any of our programs. Our services are completely free
                  of charge. Beware of anyone asking for money in our name.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help with Your Application?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our support team is here to help you through every step of the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5" />
                <span>+92 42 111 786 786</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5" />
                <span>support@idaraalkhair.com</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                <Link href="/apply">Start Your Application</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                asChild
              >
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
