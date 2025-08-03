import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, TrendingUp, Users, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"

const successStories = [
  {
    id: 1,
    name: "Fatima Bibi",
    location: "Lahore, Punjab",
    program: "Business Loan",
    amount: "PKR 300,000",
    outcome: "Monthly income increased from PKR 15,000 to PKR 45,000",
    story: "Started a tailoring business and now employs 3 women",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 2,
    name: "Muhammad Akram",
    location: "Karachi, Sindh",
    program: "Emergency Medical Aid",
    amount: "PKR 150,000",
    outcome: "Successful heart surgery completed",
    story: "Father of 4 received life-saving cardiac treatment",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 3,
    name: "Aisha Khan",
    location: "Islamabad, ICT",
    program: "Education Support",
    amount: "PKR 80,000",
    outcome: "Completed MBA degree with distinction",
    story: "First in family to complete higher education",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 4,
    name: "Ali Hassan",
    location: "Faisalabad, Punjab",
    program: "Microfinance",
    amount: "PKR 50,000",
    outcome: "Vegetable business expanded to 3 locations",
    story: "From street vendor to shop owner in 8 months",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 5,
    name: "Khadija Begum",
    location: "Peshawar, KPK",
    program: "Women Empowerment",
    amount: "PKR 120,000",
    outcome: "Beauty salon serving 200+ customers monthly",
    story: "Trained 15 other women in beauty skills",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 6,
    name: "Rashid Ahmed",
    location: "Multan, Punjab",
    program: "Agricultural Support",
    amount: "PKR 200,000",
    outcome: "Crop yield increased by 150%",
    story: "Modern farming techniques transformed his 5-acre farm",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 7,
    name: "Saima Malik",
    location: "Quetta, Balochistan",
    program: "Skills Development",
    amount: "PKR 60,000",
    outcome: "Computer training led to office job",
    story: "From housewife to IT professional earning PKR 35,000/month",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 8,
    name: "Tariq Mahmood",
    location: "Sialkot, Punjab",
    program: "Business Expansion",
    amount: "PKR 400,000",
    outcome: "Sports goods export business to 5 countries",
    story: "Employs 25 people and exports globally",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 9,
    name: "Nazia Sultana",
    location: "Hyderabad, Sindh",
    program: "Healthcare Support",
    amount: "PKR 180,000",
    outcome: "Daughter's cancer treatment successful",
    story: "5-year-old daughter is now cancer-free and healthy",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 10,
    name: "Imran Shah",
    location: "Rawalpindi, Punjab",
    program: "Technology Training",
    amount: "PKR 90,000",
    outcome: "Mobile repair shop earning PKR 60,000/month",
    story: "6-month course led to successful tech business",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 11,
    name: "Rubina Khatoon",
    location: "Gujranwala, Punjab",
    program: "Widow Support",
    amount: "PKR 100,000",
    outcome: "Home-based catering business serves 50+ families",
    story: "Supporting 3 children through food business",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
  {
    id: 12,
    name: "Shahid Iqbal",
    location: "Sargodha, Punjab",
    program: "Livestock Support",
    amount: "PKR 250,000",
    outcome: "Dairy farm produces 200 liters milk daily",
    story: "From 2 buffaloes to 15-animal dairy operation",
    image: "/placeholder.svg?height=200&width=300",
    verified: true,
  },
]

export default function SuccessStoriesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <CheckCircle className="h-4 w-4" />
            <span>Real Stories, Real Impact</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Success Stories from Our <span className="text-green-600">Community</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover how the Khair Welfare Program by Idara Al-Khair has transformed lives across Pakistan. These are
            real stories of hope, determination, and success.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/apply">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard-preview">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">10,000+</div>
              <p className="text-gray-600">Success Stories</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">PKR 50M+</div>
              <p className="text-gray-600">Lives Transformed</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
              <p className="text-gray-600">Success Rate</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">150+</div>
              <p className="text-gray-600">Cities Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Success Stories</h2>
            <p className="text-xl text-gray-600">
              Meet the inspiring individuals who have transformed their lives through our programs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <Card key={story.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={`Success story of ${story.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-green-100 text-green-800">{story.program}</Badge>
                    {story.verified && (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        <span className="text-xs">Verified</span>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg">{story.name}</CardTitle>
                  <CardDescription className="flex items-center">
                    <span>{story.location}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">Assistance Provided:</p>
                      <p className="text-sm text-blue-700">{story.amount}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-900">Outcome:</p>
                      <p className="text-sm text-green-700">{story.outcome}</p>
                    </div>
                    <p className="text-sm text-gray-600 italic">"{story.story}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Program Impact */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Impact by Program</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Business Development</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-600">3,500+</div>
                  <p className="text-sm text-gray-600">Businesses Started</p>
                  <div className="text-lg font-semibold">Average Growth: 200%</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle>Healthcare Support</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-red-600">2,800+</div>
                  <p className="text-sm text-gray-600">Lives Saved</p>
                  <div className="text-lg font-semibold">98% Recovery Rate</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Education Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-green-600">1,200+</div>
                  <p className="text-sm text-gray-600">Degrees Completed</p>
                  <div className="text-lg font-semibold">85% Job Placement</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Skills Development</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-purple-600">4,100+</div>
                  <p className="text-sm text-gray-600">People Trained</p>
                  <div className="text-lg font-semibold">92% Employment Rate</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Your Success Story Starts Here</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of individuals who have transformed their lives through our comprehensive welfare programs.
            Your journey to success begins with a single step.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" asChild>
              <Link href="/apply">Apply Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
              asChild
            >
              <Link href="/contact">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
