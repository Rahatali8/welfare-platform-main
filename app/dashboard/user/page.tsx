"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import {
  User,
  CreditCard,
  Heart,
  DollarSign,
  Search,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface UserData {
  id: number
  cnic: string
  fullName: string
  address: string
}

interface Request {
  id: number
  type: string
  reason: string
  amount?: number
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  currentAddress: string
}

export default function UserDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [requests, setRequests] = useState<Request[]>([])
  const [searchCNIC, setSearchCNIC] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchUserData()
    fetchRequests()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/user/profile")
      if (response.ok) {
        const data = await response.json()
        setUserData(data.user)
      } else {
        router.push("/login")
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    }
  }

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/user/requests")
      if (response.ok) {
        const data = await response.json()
        setRequests(data.requests)
      }
    } catch (error) {
      console.error("Error fetching requests:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchCNIC) {
      toast({
        title: "CNIC Required",
        description: "Please enter a CNIC number to search",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`/api/user/search?cnic=${searchCNIC.replace(/\D/g, "")}`)
      if (response.ok) {
        const data = await response.json()
        setRequests(data.requests)
      } else {
        toast({
          title: "No Results",
          description: "No requests found for this CNIC",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Failed to search requests",
        variant: "destructive",
      })
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCNIC = (cnic: string) => {
    if (cnic.length === 13) {
      return `${cnic.slice(0, 5)}-${cnic.slice(5, 12)}-${cnic.slice(12)}`
    }
    return cnic
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Heart className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome, {userData?.fullName}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Full Name</Label>
                <p className="text-lg font-semibold">{userData?.fullName}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">CNIC Number</Label>
                <p className="text-lg font-semibold">{formatCNIC(userData?.cnic || "")}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Address</Label>
                <p className="text-lg font-semibold">{userData?.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requests">My Requests</TabsTrigger>
            <TabsTrigger value="apply">Apply for Help</TabsTrigger>
            <TabsTrigger value="search">Search Status</TabsTrigger>
          </TabsList>

          {/* My Requests Tab */}
          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>View all your submitted requests and their current status</CardDescription>
              </CardHeader>
              <CardContent>
                {requests.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No requests submitted yet</p>
                    <Button className="mt-4" onClick={() => document.querySelector('[value="apply"]')?.click()}>
                      Submit Your First Request
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {requests.map((request) => (
                      <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg capitalize">{request.type} Request</h3>
                            <p className="text-gray-600">{request.reason}</p>
                            {request.amount && (
                              <p className="text-sm text-gray-500">Amount: PKR {request.amount.toLocaleString()}</p>
                            )}
                          </div>
                          <Badge className={getStatusColor(request.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(request.status)}
                              <span className="capitalize">{request.status}</span>
                            </div>
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          <p>Submitted: {new Date(request.submittedAt).toLocaleDateString()}</p>
                          <p>Current Address: {request.currentAddress}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Apply for Help Tab */}
          <TabsContent value="apply">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-6 w-6 text-blue-600 mr-2" />
                    Loan Application
                  </CardTitle>
                  <CardDescription>Apply for business or personal loans up to PKR 500,000</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/dashboard/user/apply/loan">
                      <Plus className="h-4 w-4 mr-2" />
                      Apply for Loan
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-6 w-6 text-red-600 mr-2" />
                    Microfinance
                  </CardTitle>
                  <CardDescription>Get help for daily essentials and grocery needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/dashboard/user/apply/microfinance">
                      <Plus className="h-4 w-4 mr-2" />
                      Apply for Microfinance
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-6 w-6 text-green-600 mr-2" />
                    General Help
                  </CardTitle>
                  <CardDescription>Request emergency financial assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/dashboard/user/apply/general">
                      <Plus className="h-4 w-4 mr-2" />
                      Apply for General Help
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Search Status Tab */}
          <TabsContent value="search">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Search Request Status
                </CardTitle>
                <CardDescription>Search for request status using CNIC number</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-6">
                  <div className="flex-1">
                    <Label htmlFor="searchCNIC">CNIC Number</Label>
                    <Input
                      id="searchCNIC"
                      placeholder="12345-1234567-1"
                      value={searchCNIC}
                      onChange={(e) => setSearchCNIC(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleSearch}>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
