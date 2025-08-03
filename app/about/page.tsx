import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Target, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const milestones = [
    { year: "2010", title: "Foundation", description: "Idara Al-Khair established with a vision to serve humanity" },
    { year: "2015", title: "Digital Platform", description: "Launched online welfare management system" },
    { year: "2018", title: "50,000 Families", description: "Reached milestone of helping 50,000+ families" },
    { year: "2020", title: "COVID Response", description: "Emergency relief program during pandemic" },
    { year: "2022", title: "Microfinance Launch", description: "Started comprehensive microfinance program" },
    { year: "2024", title: "AI Integration", description: "Implemented AI-powered application processing" },
  ]

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We approach every case with empathy and understanding, treating each person with dignity and respect.",
    },
    {
      icon: Shield,
      title: "Transparency",
      description: "Complete transparency in our operations, funding, and decision-making processes.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building stronger communities through collaborative efforts and sustainable development.",
    },
    {
      icon: Target,
      title: "Impact",
      description: "Focused on creating measurable, long-term positive impact in people's lives.",
    },
  ]

  const team = [
    {
      name: "Dr. Muhammad Ashraf",
      role: "Chairman & Founder",
      image: "/placeholder.svg?height=200&width=200&text=MA",
      description: "Leading social welfare initiatives for over 20 years",
    },
    {
      name: "Fatima Ahmed",
      role: "Director of Operations",
      image: "/placeholder.svg?height=200&width=200&text=FA",
      description: "Expert in welfare program management and community development",
    },
    {
      name: "Ali Hassan",
      role: "Head of Technology",
      image: "/placeholder.svg?height=200&width=200&text=AH",
      description: "Driving digital transformation in welfare services",
    },
    {
      name: "Aisha Khan",
      role: "Community Relations Manager",
      image: "/placeholder.svg?height=200&width=200&text=AK",
      description: "Building bridges between communities and support services",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-800">About Idara Al-Khair</Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Empowering Communities Since 2010</h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              For over a decade, Idara Al-Khair has been at the forefront of social welfare in Pakistan, transforming
              lives through comprehensive support programs, innovative technology, and unwavering commitment to human
              dignity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/apply">Join Our Mission</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To provide comprehensive welfare services that empower individuals and families to achieve
                self-sufficiency, dignity, and prosperity. We believe in creating sustainable solutions that address
                root causes of poverty and social challenges.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Target className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">Holistic approach to welfare</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Community-centered solutions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700">Sustainable development focus</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=500&text=Mission"
                alt="Our Mission"
                className="rounded-2xl shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">50,000+</div>
                  <div className="text-sm text-gray-600">Lives Transformed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-gray-900">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">Key milestones in our mission to serve humanity</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">{milestone.year}</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">Dedicated professionals working to make a difference</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardHeader>
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-gray-900">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-600">Measurable results of our commitment to social welfare</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">50,000+</div>
              <p className="text-gray-600 font-medium">Families Helped</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">PKR 500M+</div>
              <p className="text-gray-600 font-medium">Total Assistance</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">12</div>
              <p className="text-gray-600 font-medium">Welfare Programs</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-4xl font-bold text-orange-600 mb-2">94%</div>
              <p className="text-gray-600 font-medium">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you need assistance or want to help others, there's a place for you in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/apply">Apply for Assistance</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/contact">Become a Volunteer</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
