"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Heart,
  DollarSign,
  CreditCard,
  Search,
  Eye,
  HandHeart,
  TrendingUp,
  FileText,
  LogOut,
  Users,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface Request {
  id: number
  userId: number
  type: string
  reason: string
  amount?: number
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  currentAddress: string
  cnicImage?: string
  additionalData: any
  user: {
    fullName: string
    cnic: string
    address: string
  }
}

interface DonorAnalytics {
  totalRequests: number
  approvedRequests: number
  totalAmount: number
  myDonations: number
  myDonationAmount: number
}

export default function DonorDashboard() {
  const [requests, setRequests] = useState<Request[]>([])
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([])
  const [analytics, setAnalytics] = useState<DonorAnalytics | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [donationAmount, setDonationAmount] = useState("")
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchRequests()
    fetchAnalytics()
  }, [])

  useEffect(() => {
    filterRequests()
  }, [requests, searchTerm, typeFilter])

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/donor/requests")
      if (response.ok) {
        const data = await response.json()
        setRequests(data.requests)
      } else if (response.status === 401) {
        router.push("/login")
      }
    } catch (error) {
      console.error("Error fetching requests:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/donor/analytics")
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data.analytics)
      }
    } catch (error) {
      console.error("Error fetching analytics:", error)
    }
  }

  const filterRequests = () => {
    let filtered = requests.filter((request) => request.status === "approved") // Only show approved requests

    if (searchTerm) {
      filtered = filtered.filter(
        (request) =>
          request.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.user.cnic.includes(searchTerm) ||
          request.reason.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((request) => request.type === typeFilter)
    }

    setFilteredRequests(filtered)
  }

  const makeDonation = async (requestId: number, amount: number) => {
    try {
      const response = await fetch("/api/donor/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId, amount }),
      })

      if (response.ok) {
        toast({
          title: "Donation Successful!",
          description: `Thank you for donating PKR ${amount.toLocaleString()}`,
        })
        fetchAnalytics()
        setDonationAmount("")
      } else {
        toast({
          title: "Donation Failed",
          description: "Failed to process donation",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process donation",
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

  const formatCNIC = (cnic: string) => {
    if (cnic.length === 13) {
      return `${cnic.slice(0, 5)}-${cnic.slice(5, 12)}-${cnic.slice(12)}`
    }
    return cnic
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "loan":
        return <DollarSign className="h-4 w-4" />
      case "microfinance":
        return <Heart className="h-4 w-4" />
      case "general":
        return <CreditCard className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "loan":
        return "bg-blue-100 text-blue-800"
      case "microfinance":
        return "bg-red-100 text-red-800"
      case "general":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading donor dashboard...</p>
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
              <Heart className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Donor Dashboard</h1>
                <p className="text-sm text-gray-600">Help those in need through your generous donations</p>
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
        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available Requests</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalRequests}</div>
                <p className="text-xs text-muted-foreground">Approved applications</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Need</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">PKR {analytics.totalAmount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total requested amount</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Donations</CardTitle>
                <HandHeart className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{analytics.myDonations}</div>
                <p className="text-xs text-muted-foreground">People helped</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">My Contribution</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  PKR {analytics.myDonationAmount.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Total donated</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Impact</CardTitle>
                <Users className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {analytics.myDonations > 0
                    ? Math.round((analytics.myDonationAmount / analytics.totalAmount) * 100)
                    : 0}
                  %
                </div>
                <p className="text-xs text-muted-foreground">Of total need met</p>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="available-requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="available-requests">Available Requests</TabsTrigger>
            <TabsTrigger value="loans">Loans</TabsTrigger>
            <TabsTrigger value="microfinance">Microfinance</TabsTrigger>
            <TabsTrigger value="general">General Help</TabsTrigger>
          </TabsList>

          <TabsContent value="available-requests">
            <Card>
              <CardHeader>
                <CardTitle>Available Requests for Donation</CardTitle>
                <CardDescription>Help approved applicants by making donations</CardDescription>

                {/* Filters */}
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex-1 min-w-[200px]">
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search by name, CNIC, or reason..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="type-filter">Type</Label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="loan">Loan</SelectItem>
                        <SelectItem value="microfinance">Microfinance</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredRequests.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No approved requests available for donation</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredRequests.map((request) => (
                      <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-lg">{request.user.fullName}</h3>
                              <Badge variant="outline">{formatCNIC(request.user.cnic)}</Badge>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={getTypeColor(request.type)}>
                                <div className="flex items-center space-x-1">
                                  {getTypeIcon(request.type)}
                                  <span className="capitalize">{request.type}</span>
                                </div>
                              </Badge>
                              <Badge className="bg-green-100 text-green-800">Approved</Badge>
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{request.reason}</p>
                            {request.amount && (
                              <p className="text-lg font-semibold text-blue-600">
                                Need: PKR {request.amount.toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm text-gray-500">
                            <p>Approved: {new Date(request.submittedAt).toLocaleDateString()}</p>
                            <p>Location: {request.currentAddress}</p>
                          </div>

                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Request Details</DialogTitle>
                                  <DialogDescription>
                                    Help {selectedRequest?.user.fullName} with their approved request
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedRequest && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="font-medium">Applicant Name</Label>
                                        <p>{selectedRequest.user.fullName}</p>
                                      </div>
                                      <div>
                                        <Label className="font-medium">CNIC</Label>
                                        <p>{formatCNIC(selectedRequest.user.cnic)}</p>
                                      </div>
                                      <div>
                                        <Label className="font-medium">Request Type</Label>
                                        <p className="capitalize">{selectedRequest.type}</p>
                                      </div>
                                      <div>
                                        <Label className="font-medium">Status</Label>
                                        <Badge className="bg-green-100 text-green-800">Approved</Badge>
                                      </div>
                                      {selectedRequest.amount && (
                                        <div>
                                          <Label className="font-medium">Amount Needed</Label>
                                          <p className="text-lg font-semibold text-blue-600">
                                            PKR {selectedRequest.amount.toLocaleString()}
                                          </p>
                                        </div>
                                      )}
                                      <div>
                                        <Label className="font-medium">Approved Date</Label>
                                        <p>{new Date(selectedRequest.submittedAt).toLocaleDateString()}</p>
                                      </div>
                                    </div>

                                    <div>
                                      <Label className="font-medium">Current Address</Label>
                                      <p>{selectedRequest.currentAddress}</p>
                                    </div>

                                    <div>
                                      <Label className="font-medium">Reason for Help</Label>
                                      <p>{selectedRequest.reason}</p>
                                    </div>

                                    {selectedRequest.additionalData && (
                                      <div>
                                        <Label className="font-medium">Additional Information</Label>
                                        <div className="bg-gray-50 p-3 rounded-md">
                                          {selectedRequest.type === "loan" &&
                                            selectedRequest.additionalData.loanPurpose && (
                                              <div className="space-y-2">
                                                <p>
                                                  <strong>Loan Purpose:</strong>{" "}
                                                  {selectedRequest.additionalData.loanPurpose}
                                                </p>
                                                <p>
                                                  <strong>Monthly Income:</strong> PKR{" "}
                                                  {selectedRequest.additionalData.monthlyIncome}
                                                </p>
                                                <p>
                                                  <strong>Occupation:</strong>{" "}
                                                  {selectedRequest.additionalData.occupation}
                                                </p>
                                                <p>
                                                  <strong>Duration:</strong>{" "}
                                                  {selectedRequest.additionalData.loanDuration}
                                                </p>
                                              </div>
                                            )}
                                          {selectedRequest.type === "microfinance" &&
                                            selectedRequest.additionalData.helpType && (
                                              <div className="space-y-2">
                                                <p>
                                                  <strong>Help Type:</strong> {selectedRequest.additionalData.helpType}
                                                </p>
                                                <p>
                                                  <strong>Urgency:</strong>{" "}
                                                  {selectedRequest.additionalData.urgencyLevel}
                                                </p>
                                                <p>
                                                  <strong>Dependents:</strong>{" "}
                                                  {selectedRequest.additionalData.dependents}
                                                </p>
                                              </div>
                                            )}
                                          {selectedRequest.type === "general" &&
                                            selectedRequest.additionalData.helpCategory && (
                                              <div className="space-y-2">
                                                <p>
                                                  <strong>Category:</strong>{" "}
                                                  {selectedRequest.additionalData.helpCategory}
                                                </p>
                                                <p>
                                                  <strong>Urgency:</strong> {selectedRequest.additionalData.urgency}
                                                </p>
                                              </div>
                                            )}
                                        </div>
                                      </div>
                                    )}

                                    {selectedRequest.cnicImage && (
                                      <div>
                                        <Label className="font-medium">CNIC Image</Label>
                                        <img
                                          src={selectedRequest.cnicImage || "/placeholder.svg"}
                                          alt="CNIC"
                                          className="max-w-full h-auto border rounded-md"
                                        />
                                      </div>
                                    )}

                                    <div className="border-t pt-4">
                                      <Label className="font-medium">Make a Donation</Label>
                                      <div className="flex space-x-2 mt-2">
                                        <Input
                                          type="number"
                                          placeholder="Enter amount"
                                          value={donationAmount}
                                          onChange={(e) => setDonationAmount(e.target.value)}
                                          className="flex-1"
                                        />
                                        <Button
                                          onClick={() => {
                                            const amount = Number.parseFloat(donationAmount)
                                            if (amount > 0) {
                                              makeDonation(selectedRequest.id, amount)
                                            }
                                          }}
                                          disabled={!donationAmount || Number.parseFloat(donationAmount) <= 0}
                                        >
                                          <HandHeart className="h-4 w-4 mr-2" />
                                          Donate
                                        </Button>
                                      </div>
                                      {selectedRequest.amount && (
                                        <div className="flex space-x-2 mt-2">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                              setDonationAmount((selectedRequest.amount! * 0.25).toString())
                                            }
                                          >
                                            25%
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                              setDonationAmount((selectedRequest.amount! * 0.5).toString())
                                            }
                                          >
                                            50%
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setDonationAmount(selectedRequest.amount!.toString())}
                                          >
                                            Full Amount
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  <HandHeart className="h-4 w-4 mr-1" />
                                  Donate
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Make a Donation</DialogTitle>
                                  <DialogDescription>
                                    Help {request.user.fullName} with their {request.type} request
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="donation-amount">Donation Amount (PKR)</Label>
                                    <Input
                                      id="donation-amount"
                                      type="number"
                                      placeholder="Enter amount"
                                      value={donationAmount}
                                      onChange={(e) => setDonationAmount(e.target.value)}
                                    />
                                  </div>
                                  {request.amount && (
                                    <div className="flex space-x-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setDonationAmount((request.amount! * 0.25).toString())}
                                      >
                                        25% (PKR {(request.amount * 0.25).toLocaleString()})
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setDonationAmount((request.amount! * 0.5).toString())}
                                      >
                                        50% (PKR {(request.amount * 0.5).toLocaleString()})
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setDonationAmount(request.amount!.toString())}
                                      >
                                        Full Amount
                                      </Button>
                                    </div>
                                  )}
                                  <Button
                                    onClick={() => {
                                      const amount = Number.parseFloat(donationAmount)
                                      if (amount > 0) {
                                        makeDonation(request.id, amount)
                                      }
                                    }}
                                    disabled={!donationAmount || Number.parseFloat(donationAmount) <= 0}
                                    className="w-full"
                                  >
                                    <HandHeart className="h-4 w-4 mr-2" />
                                    Confirm Donation
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Similar content for other tabs with filtered data */}
          <TabsContent value="loans">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Loan Requests Available for Donation
                </CardTitle>
                <CardDescription>Help approved loan applicants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests
                    .filter((r) => r.type === "loan" && r.status === "approved")
                    .map((request) => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{request.user.fullName}</h3>
                            <p className="text-lg font-semibold text-blue-600">
                              PKR {request.amount?.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">{request.reason}</p>
                          </div>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <HandHeart className="h-4 w-4 mr-1" />
                            Donate
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="microfinance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Microfinance Requests Available for Donation
                </CardTitle>
                <CardDescription>Help with daily essentials and basic needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests
                    .filter((r) => r.type === "microfinance" && r.status === "approved")
                    .map((request) => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{request.user.fullName}</h3>
                            <p className="text-lg font-semibold text-blue-600">
                              PKR {request.amount?.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">{request.reason}</p>
                          </div>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <HandHeart className="h-4 w-4 mr-1" />
                            Donate
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  General Help Requests Available for Donation
                </CardTitle>
                <CardDescription>Help with emergency financial assistance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests
                    .filter((r) => r.type === "general" && r.status === "approved")
                    .map((request) => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{request.user.fullName}</h3>
                            <p className="text-lg font-semibold text-blue-600">
                              PKR {request.amount?.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">{request.reason}</p>
                          </div>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <HandHeart className="h-4 w-4 mr-1" />
                            Donate
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
