'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Users, Target, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"
import ArcGalleryHero from "@/components/arc-gallery-hero";

export default function AboutPage() {
  const milestones = [
    { year: "2010", title: "Foundation", description: "Idara Al-Khair established with a vision to serve humanity" },
    { year: "2015", title: "Digital Platform", description: "Launched online welfare management system" },
    { year: "2018", title: "50,000 Families", description: "Reached milestone of helping 50,000+ families" },
    { year: "2020", title: "COVID Response", description: "Emergency relief program during pandemic" },
    { year: "2022", title: "Microfinance Launch", description: "Started comprehensive microfinance program" },
    { year: "2024", title: "AI Integration", description: "Implemented AI-powered application processing" },
  ]

  const images = [
    '/hero1.jpg',
    '/hero2.jpg',
    '/user-male.png',
    '/user-female.jpg',
    '/welfare-work.png',
    '/head-logo.png',
    '/footer-logo.png',
    '/freepik__abstract-digital-art-featuring-a-series-of-horizon__489.png',
    '/image 15.png',
    '/VkvvhXlWo3hEBzcqwTpjd_aa4bf9ee998f4ec0b17a8bf16fe3e9e2.jpg',
    '/hyperrealistic_commercial_product_photography_of_luxury_chrome_sunglasses_on_male_model_extreme_chi_fanguv2w9zx489lcivwa_2.png',
  ];

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
      description: "Focused on creating measurable, long-term positive impact in people's lives. positive impact in people's lives.",
    },
  ]

  const team = [
    {
      name: "Muhammad Muzahir Sheikh",
      role: "Chairman & Founder",
      image: "/chairmain.jpg",
      description: "Leading social welfare initiatives for over 20 years",
    },
    {
      name: "Muhammad saad Sheikh",
      role: "Head of Technology Department",
      image: "/Saad Bhai.jpg",
      description: "Expert in welfare program management and community development",
    },
    {
      name: "Miss Tasneem sheikh",
      role: "Director of Operations",
      image: "/placeholder.svg?height=200&width=200&text=AH",
      description: "Driving digital transformation in welfare services",
    },
  ]



  return (
    <div className="min-h-screen bg-white">


      <main className="relative min-h-[60vh] bg-background">
        <ArcGalleryHero
          images={images}
          startAngle={20}
          endAngle={160}
          radiusLg={480}
          radiusMd={360}
          radiusSm={260}
          cardSizeLg={120}
          cardSizeMd={100}
          cardSizeSm={80}
        />
      </main>


      {/* Mission & Vision */}
      <section className="py-16 px-4 m-5">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1B0073] drop-shadow-2xl">Our Core <span className="text-[#00A5E0]">Mission</span></h2>
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
                className="rounded-2xl shadow-lg w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">500+</div>
                  <div className="text-sm text-gray-600">GOT HELPED</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50 m-5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1B0073] drop-shadow-2xl">Our Core <span className="text-[#00A5E0]">Values</span></h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {values.map((value, index) => (
              <Card key={index} className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-indigo-600/60 shadow-[0_10px_30px_rgba(17,24,39,0.08)] hover:shadow-[0_20px_40px_rgba(17,24,39,0.12)] transition-shadow">
                <CardHeader className=" relative rounded-2xl bg-white/80 backdrop-blur-xl p-6 text-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.01] ring-1 ring-transparent group-hover:ring-blue-200/60">
                  <div className="absolute -top-3 -right-3 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center shadow-sm">
                    <value.icon className="h-8 w-8 text-[#00A5E0]" />
                  </div>
                  <CardTitle className="text-2xl font-extrabold tracking-tight text-blue-900 mb-1">{value.title}</CardTitle>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </CardHeader>

              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1B0073] drop-shadow-2xl">Our <span className="text-[#00A5E0]">Journey</span></h2>
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
      <section className="py-16 px-4 bg-gray-50 m-5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1B0073] drop-shadow-2xl">Meet  <span className="text-[#00A5E0]">Our Team</span></h2>
            <p className="text-xl text-gray-600">Dedicated professionals working to make a difference</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-indigo-600/60 shadow-[0_10px_30px_rgba(17,24,39,0.08)] hover:shadow-[0_20px_40px_rgba(17,24,39,0.12)] transition-shadow">
                <CardHeader className="h-auto relative rounded-2xl bg-white/80 backdrop-blur-xl p-6 text-center transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.01] ring-1 ring-transparent group-hover:ring-blue-200/60">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-2xl font-extrabold tracking-tight text-blue-900 mb-1">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{member.role}</CardDescription>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </CardContent>
                </CardHeader>

              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 m-5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1B0073] drop-shadow-2xl">Our Impact in <span className="text-[#00A5E0]">Numbers</span></h2>
            <p className="text-xl text-gray-600">Measurable results of our commitment to social welfare</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-cyan-400/60 via-blue-500/40 to-indigo-600/60 shadow-[0_10px_30px_rgba(17,24,39,0.08)] hover:shadow-[0_20px_40px_rgba(17,24,39,0.12)] transition-shadow">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600 font-medium">Families Helped By Us</p>
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
          <h2 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1B0073] drop-shadow-2xl">Join Our  <span className="text-[#00A5E0]">Mission</span></h2>
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
