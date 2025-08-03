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
  Users,
  DollarSign,
  Heart,
  CreditCard,
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  FileText,
  LogOut,
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

interface Analytics {
  totalRequests: number
  pendingRequests: number
  approvedRequests: number
  rejectedRequests: number
  totalAmount: number
  loanRequests: number
  microfinanceRequests: number
  generalRequests: number
}

export default function AdminDashboard() {
  const [requests, setRequests] = useState<Request[]>([])
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([])
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchRequests()
    fetchAnalytics()
  }, [])

  useEffect(() => {
    filterRequests()
  }, [requests, searchTerm, statusFilter, typeFilter])

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/admin/requests")
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
      const response = await fetch("/api/admin/analytics")
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data.analytics)
      }
    } catch (error) {
      console.error("Error fetching analytics:", error)
    }
  }

  const filterRequests = () => {
    let filtered = requests

    if (searchTerm) {
      filtered = filtered.filter(
        (request) =>
          request.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.user.cnic.includes(searchTerm) ||
          request.reason.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((request) => request.status === statusFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((request) => request.type === typeFilter)
    }

    setFilteredRequests(filtered)
  }

  const updateRequestStatus = async (requestId: number, status: "approved" | "rejected") => {
    try {
      const response = await fetch("/api/admin/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId, status }),
      })

      if (response.ok) {
        toast({
          title: "Status Updated",
          description: `Request has been ${status}`,
        })
        fetchRequests()
        fetchAnalytics()
      } else {
        toast({
          title: "Update Failed",
          description: "Failed to update request status",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
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
          <p className="text-gray-600">Loading admin dashboard...</p>
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
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage all welfare requests and applications</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalRequests}</div>
                <p className="text-xs text-muted-foreground">All time applications</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{analytics.pendingRequests}</div>
                <p className="text-xs text-muted-foreground">Awaiting review</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{analytics.approvedRequests}</div>
                <p className="text-xs text-muted-foreground">Successfully approved</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">PKR {analytics.totalAmount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Requested amount</p>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="all-requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all-requests">All Requests</TabsTrigger>
            <TabsTrigger value="loans">Loans</TabsTrigger>
            <TabsTrigger value="microfinance">Microfinance</TabsTrigger>
            <TabsTrigger value="general">General Help</TabsTrigger>
          </TabsList>

          <TabsContent value="all-requests">
            <Card>
              <CardHeader>
                <CardTitle>All Requests</CardTitle>
                <CardDescription>Manage all welfare applications</CardDescription>

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
                    <Label htmlFor="status-filter">Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No requests found</p>
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
                            <p className="text-gray-600 capitalize">{request.type} Request</p>
                            <p className="text-sm text-gray-500">{request.reason}</p>
                            {request.amount && (
                              <p className="text-sm font-medium text-green-600">
                                Amount: PKR {request.amount.toLocaleString()}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(request.status)}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(request.status)}
                                <span className="capitalize">{request.status}</span>
                              </div>
                            </Badge>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm text-gray-500">
                            <p>Submitted: {new Date(request.submittedAt).toLocaleDateString()}</p>
                            <p>Address: {request.currentAddress}</p>
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
                                    Complete information for {selectedRequest?.user.fullName}'s application
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
                                        <Badge className={getStatusColor(selectedRequest.status)}>
                                          {selectedRequest.status}
                                        </Badge>
                                      </div>
                                      {selectedRequest.amount && (
                                        <div>
                                          <Label className="font-medium">Amount</Label>
                                          <p>PKR {selectedRequest.amount.toLocaleString()}</p>
                                        </div>
                                      )}
                                      <div>
                                        <Label className="font-medium">Submitted</Label>
                                        <p>{new Date(selectedRequest.submittedAt).toLocaleDateString()}</p>
                                      </div>
                                    </div>

                                    <div>
                                      <Label className="font-medium">Registered Address</Label>
                                      <p>{selectedRequest.user.address}</p>
                                    </div>

                                    <div>
                                      <Label className="font-medium">Current Address</Label>
                                      <p>{selectedRequest.currentAddress}</p>
                                    </div>

                                    <div>
                                      <Label className="font-medium">Reason</Label>
                                      <p>{selectedRequest.reason}</p>
                                    </div>

                                    {selectedRequest.additionalData && (
                                      <div>
                                        <Label className="font-medium">Additional Information</Label>
                                        <div className="bg-gray-50 p-3 rounded-md">
                                          <pre className="text-sm whitespace-pre-wrap">
                                            {JSON.stringify(selectedRequest.additionalData, null, 2)}
                                          </pre>
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

                                    {selectedRequest.status === "pending" && (
                                      <div className="flex space-x-2 pt-4">
                                        <Button
                                          onClick={() => updateRequestStatus(selectedRequest.id, "approved")}
                                          className="bg-green-600 hover:bg-green-700"
                                        >
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          Approve
                                        </Button>
                                        <Button
                                          onClick={() => updateRequestStatus(selectedRequest.id, "rejected")}
                                          variant="destructive"
                                        >
                                          <XCircle className="h-4 w-4 mr-2" />
                                          Reject
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>

                            {request.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => updateRequestStatus(request.id, "approved")}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updateRequestStatus(request.id, "rejected")}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
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
                  Loan Requests
                </CardTitle>
                <CardDescription>Manage loan applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests
                    .filter((r) => r.type === "loan")
                    .map((request) => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{request.user.fullName}</h3>
                            <p className="text-sm text-gray-600">PKR {request.amount?.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">{request.reason}</p>
                          </div>
                          <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
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
                  Microfinance Requests
                </CardTitle>
                <CardDescription>Manage microfinance applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests
                    .filter((r) => r.type === "microfinance")
                    .map((request) => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{request.user.fullName}</h3>
                            <p className="text-sm text-gray-600">PKR {request.amount?.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">{request.reason}</p>
                          </div>
                          <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
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
                  General Help Requests
                </CardTitle>
                <CardDescription>Manage general assistance applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests
                    .filter((r) => r.type === "general")
                    .map((request) => (
                      <div key={request.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{request.user.fullName}</h3>
                            <p className="text-sm text-gray-600">PKR {request.amount?.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">{request.reason}</p>
                          </div>
                          <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
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
