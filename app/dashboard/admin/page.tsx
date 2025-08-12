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
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

  interface Request {
    id: number
    user_id: number
    type: string
    description: string | null
    status: "pending" | "approved" | "rejected"
    created_at: string
    updated_at: string
    adult_member: number | null
    cnic_back: string | null
    cnic_front: string | null
    cnic_number: string | null
    document: string | null
    family_count: number | null
    father_name: string | null
    fridge: string | null
    full_name: string | null
    home_rent: string | null
    marital_status: string | null
    matric_member: number | null
    monthly_income: number | null
    reason: string | null
    repayment_time: string | null
    rejection_reason: string | null
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
  const [groupedRequests, setGroupedRequests] = useState<Record<string, any[]>>({})
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [donors, setDonors] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("pending")
  const [typeFilter, setTypeFilter] = useState("all")
  const [showRejectionDialog, setShowRejectionDialog] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [requestToReject, setRequestToReject] = useState<Request | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchRequests()
    fetchAnalytics()
    fetchDonors()
    fetchGrouped()
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

  const fetchGrouped = async () => {
    try {
      const res = await fetch("/api/admin/requests-sections")
      if (res.ok) {
        const data = await res.json()
        setGroupedRequests(data.requests || {})
      }
    } catch (e) {
      // noop
    }
  }

  const fetchDonors = async () => {
    try {
      const response = await fetch("/api/admin/donors")
      if (response.ok) {
        const data = await response.json()
        setDonors(data.donors)
      }
    } catch (error) {
      console.error("Error fetching donors:", error)
    }
  }

  const filterRequests = () => {
    let filtered = requests

    if (searchTerm) {
      filtered = filtered.filter((request) => {
        const name = (request.full_name ?? '').toLowerCase()
        const cnic = (request.cnic_number ?? '')
        const reason = (request.reason ?? '').toLowerCase()
        const q = searchTerm.toLowerCase()
        return name.includes(q) || cnic.includes(q) || reason.includes(q)
      })
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((request) => (request.status || '').toLowerCase() === statusFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((request) => (request.type || '').toLowerCase() === typeFilter)
    }

    setFilteredRequests(filtered)
  }

  const updateRequestStatus = async (requestId: number, status: "approved" | "rejected", rejectionReason?: string) => {
    try {
      const response = await fetch("/api/admin/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId, status, rejectionReason }),
      })

      if (response.ok) {
        toast({
          title: "Status Updated",
          description: `Request has been ${status}`,
        })
        fetchRequests()
        fetchAnalytics()
        setShowRejectionDialog(false)
        setRejectionReason("")
        setRequestToReject(null)
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

  const handleRejectRequest = (request: Request) => {
    setRequestToReject(request)
    setShowRejectionDialog(true)
  }

  const confirmRejection = () => {
    if (requestToReject && rejectionReason.trim()) {
      updateRequestStatus(requestToReject.id, "rejected", rejectionReason.trim())
    } else {
      toast({
        title: "Error",
        description: "Please provide a reason for rejection",
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

  const updateDonorStatus = async (donorId: number, status: "ACTIVE" | "REJECTED" | "PENDING") => {
    try {
      const response = await fetch("/api/admin/donors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donorId, status }),
      })
      if (response.ok) {
        toast({ title: `Donor ${status.toLowerCase()} successfully` })
        fetchDonors()
      } else {
        toast({ title: "Failed to update donor", variant: "destructive" })
      }
    } catch (error) {
      toast({ title: "Error updating donor", variant: "destructive" })
    }
  }

  const getStatusIcon = (status: string) => {
    switch ((status || '').toLowerCase()) {
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
    switch ((status || '').toLowerCase()) {
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
          <TabsList className="w-full flex flex-wrap gap-2">
            <TabsTrigger value="all-requests">All Requests</TabsTrigger>
            <TabsTrigger value="accepted-requests">Accepted Requests</TabsTrigger>
            <TabsTrigger value="rejected-requests">Rejected Requests</TabsTrigger>
            <TabsTrigger value="donor-requests">Donor Requests</TabsTrigger>
            {Object.keys(groupedRequests).sort().map((type) => (
              <TabsTrigger key={type} value={`type-${type}`}>{type}</TabsTrigger>
            ))}
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
                              <h3 className="font-semibold text-lg">{request.full_name ?? '-'}</h3>
                              {request.cnic_number && (<Badge variant="outline">{formatCNIC(request.cnic_number)}</Badge>)}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span><b>ID:</b> {request.id}</span>
                              <span><b>User ID:</b> {request.user_id}</span>
                              <span><b>Type:</b> {request.type}</span>
                              <span><b>Status:</b> {request.status}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{request.reason ?? request.description ?? ''}</p>
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

                        <div className="text-sm text-gray-500 mt-2">
                          <p><b>Submitted:</b> {new Date(request.created_at).toLocaleString()}</p>
                        </div>

                        {/* Summary view only; full details available in dialog */}

                        <div className="flex justify-between items-center mt-4">

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
                              <DialogDescription>Complete information</DialogDescription>
                                </DialogHeader>
                                {selectedRequest && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="font-medium">Applicant Name</Label>
                                        <p>{selectedRequest.full_name ?? '-'}</p>
                                      </div>
                                      <div>
                                        <Label className="font-medium">CNIC</Label>
                                        <p>{selectedRequest.cnic_number ? formatCNIC(selectedRequest.cnic_number) : '-'}</p>
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
                                      {/* amount removed from Request type */}
                                      <div>
                                        <Label className="font-medium">Submitted</Label>
                                        <p>{new Date(selectedRequest.created_at).toLocaleDateString()}</p>
                                      </div>
                                    </div>

                                    <div>
                                      <Label className="font-medium">Reason</Label>
                                      <p>{selectedRequest.reason ?? selectedRequest.description ?? ''}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                      {selectedRequest.father_name && (
                                        <div>
                                          <Label className="font-medium">Father Name</Label>
                                          <p>{selectedRequest.father_name}</p>
                                        </div>
                                      )}
                                      {selectedRequest.marital_status && (
                                        <div>
                                          <Label className="font-medium">Marital Status</Label>
                                          <p>{selectedRequest.marital_status}</p>
                                        </div>
                                      )}
                                      {selectedRequest.family_count !== null && (
                                        <div>
                                          <Label className="font-medium">Family Count</Label>
                                          <p>{selectedRequest.family_count}</p>
                                        </div>
                                      )}
                                      {selectedRequest.adult_member !== null && (
                                        <div>
                                          <Label className="font-medium">Adult Members</Label>
                                          <p>{selectedRequest.adult_member}</p>
                                        </div>
                                      )}
                                      {selectedRequest.matric_member !== null && (
                                        <div>
                                          <Label className="font-medium">Matric Members</Label>
                                          <p>{selectedRequest.matric_member}</p>
                                        </div>
                                      )}
                                      {selectedRequest.home_rent && (
                                        <div>
                                          <Label className="font-medium">Home Rent</Label>
                                          <p>{selectedRequest.home_rent}</p>
                                        </div>
                                      )}
                                      {selectedRequest.fridge && (
                                        <div>
                                          <Label className="font-medium">Fridge</Label>
                                          <p>{selectedRequest.fridge}</p>
                                        </div>
                                      )}
                                      {selectedRequest.monthly_income !== null && (
                                        <div>
                                          <Label className="font-medium">Monthly Income</Label>
                                          <p>PKR {selectedRequest.monthly_income.toLocaleString()}</p>
                                        </div>
                                      )}
                                      {selectedRequest.repayment_time && (
                                        <div>
                                          <Label className="font-medium">Repayment Time</Label>
                                          <p>{selectedRequest.repayment_time}</p>
                                        </div>
                                      )}
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                      {selectedRequest.cnic_front && (
                                        <a href={selectedRequest.cnic_front.startsWith('/uploads/') ? selectedRequest.cnic_front : `/uploads/${selectedRequest.cnic_front.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View CNIC Front</a>
                                      )}
                                      {selectedRequest.cnic_back && (
                                        <a href={selectedRequest.cnic_back.startsWith('/uploads/') ? selectedRequest.cnic_back : `/uploads/${selectedRequest.cnic_back.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View CNIC Back</a>
                                      )}
                                      {selectedRequest.document && (
                                        <a href={selectedRequest.document.startsWith('/uploads/') ? selectedRequest.document : `/uploads/${selectedRequest.document.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View Supporting Document</a>
                                      )}
                                    </div>

                                    {(selectedRequest.status || '').toLowerCase() === "pending" && (
                                      <div className="flex space-x-2 pt-4">
                                        <Button
                                          onClick={() => updateRequestStatus(selectedRequest.id, "approved")}
                                          className="bg-green-600 hover:bg-green-700"
                                        >
                                          <CheckCircle className="h-4 w-4 mr-2" />
                                          Approve
                                        </Button>
                                        <Button
                                          onClick={() => handleRejectRequest(selectedRequest)}
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

                            {(request.status || '').toLowerCase() === "pending" && (
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
                                  onClick={() => handleRejectRequest(request)}
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

          {Object.entries(groupedRequests).map(([type, reqs]) => (
            <TabsContent key={type} value={`type-${type}`}>
              <Card>
                <CardHeader>
                  <CardTitle className="capitalize">{type} Requests</CardTitle>
                  <CardDescription>Filtered by type with images and details</CardDescription>
                </CardHeader>
                <CardContent>
                  {(reqs as any[]).length === 0 ? (
                    <div className="text-gray-500">No requests for this type.</div>
                  ) : (
                    <div className="space-y-4">
                      {(reqs as any[]).map((request) => (
                        <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-lg">{request.full_name ?? '-'}</h3>
                                {request.cnic_number && (<Badge variant="outline">{formatCNIC(request.cnic_number)}</Badge>)}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span><b>ID:</b> {request.id}</span>
                                <span><b>User ID:</b> {request.user_id}</span>
                                <span><b>Type:</b> {request.type}</span>
                                <span><b>Status:</b> {request.status}</span>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{request.reason ?? request.description ?? ''}</p>
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

                          <div className="text-sm text-gray-500 mt-2">
                            <p><b>Submitted:</b> {new Date(request.created_at).toLocaleString()}</p>
                          </div>

                          {/* Summary view only; full details available in dialog */}

                          <div className="flex justify-between items-center mt-4">
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                                    <Eye className="h-4 w-4 mr-1" />
                                    View Full
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Request Details</DialogTitle>
                                    <DialogDescription>Complete information</DialogDescription>
                                  </DialogHeader>
                                  {selectedRequest && (
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label className="font-medium">Applicant Name</Label>
                                          <p>{selectedRequest.full_name ?? '-'}</p>
                                        </div>
                                        <div>
                                          <Label className="font-medium">CNIC</Label>
                                          <p>{selectedRequest.cnic_number ? formatCNIC(selectedRequest.cnic_number) : '-'}</p>
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
                                        <div>
                                          <Label className="font-medium">Submitted</Label>
                                          <p>{new Date(selectedRequest.created_at).toLocaleDateString()}</p>
                                        </div>
                                      </div>

                                      <div>
                                        <Label className="font-medium">Reason</Label>
                                        <p>{selectedRequest.reason ?? selectedRequest.description ?? ''}</p>
                                      </div>

                                      <div className="grid grid-cols-2 gap-4">
                                        {selectedRequest.father_name && (
                                          <div>
                                            <Label className="font-medium">Father Name</Label>
                                            <p>{selectedRequest.father_name}</p>
                                          </div>
                                        )}
                                        {selectedRequest.marital_status && (
                                          <div>
                                            <Label className="font-medium">Marital Status</Label>
                                            <p>{selectedRequest.marital_status}</p>
                                          </div>
                                        )}
                                        {selectedRequest.family_count !== null && (
                                          <div>
                                            <Label className="font-medium">Family Count</Label>
                                            <p>{selectedRequest.family_count}</p>
                                          </div>
                                        )}
                                        {selectedRequest.adult_member !== null && (
                                          <div>
                                            <Label className="font-medium">Adult Members</Label>
                                            <p>{selectedRequest.adult_member}</p>
                                          </div>
                                        )}
                                        {selectedRequest.matric_member !== null && (
                                          <div>
                                            <Label className="font-medium">Matric Members</Label>
                                            <p>{selectedRequest.matric_member}</p>
                                          </div>
                                        )}
                                        {selectedRequest.home_rent && (
                                          <div>
                                            <Label className="font-medium">Home Rent</Label>
                                            <p>{selectedRequest.home_rent}</p>
                                          </div>
                                        )}
                                        {selectedRequest.fridge && (
                                          <div>
                                            <Label className="font-medium">Fridge</Label>
                                            <p>{selectedRequest.fridge}</p>
                                          </div>
                                        )}
                                        {selectedRequest.monthly_income !== null && (
                                          <div>
                                            <Label className="font-medium">Monthly Income</Label>
                                            <p>PKR {selectedRequest.monthly_income.toLocaleString()}</p>
                                          </div>
                                        )}
                                        {selectedRequest.repayment_time && (
                                          <div>
                                            <Label className="font-medium">Repayment Time</Label>
                                            <p>{selectedRequest.repayment_time}</p>
                                          </div>
                                        )}
                                      </div>

                                      <div className="space-y-2">
                                        {selectedRequest.cnic_front && (
                                          <div>
                                            <Label className="font-medium">CNIC Front</Label>
                                            <a href={selectedRequest.cnic_front.startsWith('/uploads/') ? selectedRequest.cnic_front : `/uploads/${selectedRequest.cnic_front.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View CNIC Front</a>
                                          </div>
                                        )}
                                        {selectedRequest.cnic_back && (
                                          <div>
                                            <Label className="font-medium">CNIC Back</Label>
                                            <a href={selectedRequest.cnic_back.startsWith('/uploads/') ? selectedRequest.cnic_back : `/uploads/${selectedRequest.cnic_back.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View CNIC Back</a>
                                          </div>
                                        )}
                                        {selectedRequest.document && (
                                          <div>
                                            <Label className="font-medium">Supporting Document</Label>
                                            <a href={selectedRequest.document.startsWith('/uploads/') ? selectedRequest.document : `/uploads/${selectedRequest.document.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View Document</a>
                                          </div>
                                        )}
                                      </div>

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
                                            onClick={() => handleRejectRequest(selectedRequest)}
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
                                    onClick={() => handleRejectRequest(request)}
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
          ))}

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
                      <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-lg">{request.full_name ?? '-'}</h3>
                              {request.cnic_number && (<Badge variant="outline">{formatCNIC(request.cnic_number)}</Badge>)}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span><b>ID:</b> {request.id}</span>
                              <span><b>User ID:</b> {request.user_id}</span>
                              <span><b>Type:</b> {request.type}</span>
                              <span><b>Status:</b> {request.status}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{request.reason ?? request.description ?? ''}</p>
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

                        <div className="text-sm text-gray-500 mt-2">
                          <p><b>Submitted:</b> {new Date(request.created_at).toLocaleString()}</p>
                        </div>

                          {/* Summary view only; full details available in dialog */}

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Full
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Request Details</DialogTitle>
                                  <DialogDescription>Complete information</DialogDescription>
                                </DialogHeader>
                                {selectedRequest && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="font-medium">Applicant Name</Label>
                                        <p>{selectedRequest.full_name ?? '-'}</p>
                                      </div>
                                      <div>
                                        <Label className="font-medium">CNIC</Label>
                                        <p>{selectedRequest.cnic_number ? formatCNIC(selectedRequest.cnic_number) : '-'}</p>
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
                                      <div>
                                        <Label className="font-medium">Submitted</Label>
                                        <p>{new Date(selectedRequest.created_at).toLocaleDateString()}</p>
                                      </div>
                                    </div>

                                    <div>
                                      <Label className="font-medium">Reason</Label>
                                      <p>{selectedRequest.reason ?? selectedRequest.description ?? ''}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                      {selectedRequest.father_name && (
                                        <div>
                                          <Label className="font-medium">Father Name</Label>
                                          <p>{selectedRequest.father_name}</p>
                                        </div>
                                      )}
                                      {selectedRequest.marital_status && (
                                        <div>
                                          <Label className="font-medium">Marital Status</Label>
                                          <p>{selectedRequest.marital_status}</p>
                                        </div>
                                      )}
                                      {selectedRequest.family_count !== null && (
                                        <div>
                                          <Label className="font-medium">Family Count</Label>
                                          <p>{selectedRequest.family_count}</p>
                                        </div>
                                      )}
                                      {selectedRequest.adult_member !== null && (
                                        <div>
                                          <Label className="font-medium">Adult Members</Label>
                                          <p>{selectedRequest.adult_member}</p>
                                        </div>
                                      )}
                                      {selectedRequest.matric_member !== null && (
                                        <div>
                                          <Label className="font-medium">Matric Members</Label>
                                          <p>{selectedRequest.matric_member}</p>
                                        </div>
                                      )}
                                      {selectedRequest.home_rent && (
                                        <div>
                                          <Label className="font-medium">Home Rent</Label>
                                          <p>{selectedRequest.home_rent}</p>
                                        </div>
                                      )}
                                      {selectedRequest.fridge && (
                                        <div>
                                          <Label className="font-medium">Fridge</Label>
                                          <p>{selectedRequest.fridge}</p>
                                        </div>
                                      )}
                                      {selectedRequest.monthly_income !== null && (
                                        <div>
                                          <Label className="font-medium">Monthly Income</Label>
                                          <p>PKR {selectedRequest.monthly_income.toLocaleString()}</p>
                                        </div>
                                      )}
                                      {selectedRequest.repayment_time && (
                                        <div>
                                          <Label className="font-medium">Repayment Time</Label>
                                          <p>{selectedRequest.repayment_time}</p>
                                        </div>
                                      )}
                                    </div>

                                    <div className="space-y-2">
                                      {selectedRequest.cnic_front && (
                                        <div>
                                          <Label className="font-medium">CNIC Front</Label>
                                          <a href={selectedRequest.cnic_front.startsWith('/uploads/') ? selectedRequest.cnic_front : `/uploads/${selectedRequest.cnic_front.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View CNIC Front</a>
                                        </div>
                                      )}
                                      {selectedRequest.cnic_back && (
                                        <div>
                                          <Label className="font-medium">CNIC Back</Label>
                                          <a href={selectedRequest.cnic_back.startsWith('/uploads/') ? selectedRequest.cnic_back : `/uploads/${selectedRequest.cnic_back.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View CNIC Back</a>
                                        </div>
                                      )}
                                      {selectedRequest.document && (
                                        <div>
                                          <Label className="font-medium">Supporting Document</Label>
                                          <a href={selectedRequest.document.startsWith('/uploads/') ? selectedRequest.document : `/uploads/${selectedRequest.document.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View Document</a>
                                        </div>
                                      )}
                                    </div>

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
                                          onClick={() => handleRejectRequest(selectedRequest)}
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
                                  onClick={() => handleRejectRequest(request)}
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
                      <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-lg">{request.full_name ?? '-'}</h3>
                              {request.cnic_number && (<Badge variant="outline">{formatCNIC(request.cnic_number)}</Badge>)}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span><b>ID:</b> {request.id}</span>
                              <span><b>User ID:</b> {request.user_id}</span>
                              <span><b>Type:</b> {request.type}</span>
                              <span><b>Status:</b> {request.status}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{request.reason ?? request.description ?? ''}</p>
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

                        <div className="text-sm text-gray-500 mt-2">
                          <p><b>Submitted:</b> {new Date(request.created_at).toLocaleString()}</p>
                        </div>

                          {/* Summary view only; full details available in dialog */}

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Full
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Request Details</DialogTitle>
                                  <DialogDescription>Complete information</DialogDescription>
                                </DialogHeader>
                                {selectedRequest && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="font-medium">Applicant Name</Label>
                                        <p>{selectedRequest.full_name ?? '-'}</p>
                                      </div>
                                      <div>
                                        <Label className="font-medium">CNIC</Label>
                                        <p>{selectedRequest.cnic_number ? formatCNIC(selectedRequest.cnic_number) : '-'}</p>
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
                                      <div>
                                        <Label className="font-medium">Submitted</Label>
                                        <p>{new Date(selectedRequest.created_at).toLocaleDateString()}</p>
                                      </div>
                                    </div>

                                    <div>
                                      <Label className="font-medium">Reason</Label>
                                      <p>{selectedRequest.reason ?? selectedRequest.description ?? ''}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                      {selectedRequest.father_name && (
                                        <div>
                                          <Label className="font-medium">Father Name</Label>
                                          <p>{selectedRequest.father_name}</p>
                                        </div>
                                      )}
                                      {selectedRequest.marital_status && (
                                        <div>
                                          <Label className="font-medium">Marital Status</Label>
                                          <p>{selectedRequest.marital_status}</p>
                                        </div>
                                      )}
                                      {selectedRequest.family_count !== null && (
                                        <div>
                                          <Label className="font-medium">Family Count</Label>
                                          <p>{selectedRequest.family_count}</p>
                                        </div>
                                      )}
                                      {selectedRequest.adult_member !== null && (
                                        <div>
                                          <Label className="font-medium">Adult Members</Label>
                                          <p>{selectedRequest.adult_member}</p>
                                        </div>
                                      )}
                                      {selectedRequest.matric_member !== null && (
                                        <div>
                                          <Label className="font-medium">Matric Members</Label>
                                          <p>{selectedRequest.matric_member}</p>
                                        </div>
                                      )}
                                      {selectedRequest.home_rent && (
                                        <div>
                                          <Label className="font-medium">Home Rent</Label>
                                          <p>{selectedRequest.home_rent}</p>
                                        </div>
                                      )}
                                      {selectedRequest.fridge && (
                                        <div>
                                          <Label className="font-medium">Fridge</Label>
                                          <p>{selectedRequest.fridge}</p>
                                        </div>
                                      )}
                                      {selectedRequest.monthly_income !== null && (
                                        <div>
                                          <Label className="font-medium">Monthly Income</Label>
                                          <p>PKR {selectedRequest.monthly_income.toLocaleString()}</p>
                                        </div>
                                      )}
                                      {selectedRequest.repayment_time && (
                                        <div>
                                          <Label className="font-medium">Repayment Time</Label>
                                          <p>{selectedRequest.repayment_time}</p>
                                        </div>
                                      )}
                                    </div>

                                    <div className="space-y-2">
                                      {selectedRequest.cnic_front && (
                                        <div>
                                          <Label className="font-medium">CNIC Front</Label>
                                          <a href={selectedRequest.cnic_front.startsWith('/uploads/') ? selectedRequest.cnic_front : `/uploads/${selectedRequest.cnic_front.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View CNIC Front</a>
                                        </div>
                                      )}
                                      {selectedRequest.cnic_back && (
                                        <div>
                                          <Label className="font-medium">CNIC Back</Label>
                                          <a href={selectedRequest.cnic_back.startsWith('/uploads/') ? selectedRequest.cnic_back : `/uploads/${selectedRequest.cnic_back.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View CNIC Back</a>
                                        </div>
                                      )}
                                      {selectedRequest.document && (
                                        <div>
                                          <Label className="font-medium">Supporting Document</Label>
                                          <a href={selectedRequest.document.startsWith('/uploads/') ? selectedRequest.document : `/uploads/${selectedRequest.document.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View Document</a>
                                        </div>
                                      )}
                                    </div>

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
                                          onClick={() => handleRejectRequest(selectedRequest)}
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
                                  onClick={() => handleRejectRequest(request)}
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
                      <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-lg">{request.full_name ?? '-'}</h3>
                              {request.cnic_number && (<Badge variant="outline">{formatCNIC(request.cnic_number)}</Badge>)}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span><b>ID:</b> {request.id}</span>
                              <span><b>User ID:</b> {request.user_id}</span>
                              <span><b>Type:</b> {request.type}</span>
                              <span><b>Status:</b> {request.status}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{request.reason ?? request.description ?? ''}</p>
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

                        <div className="text-sm text-gray-500 mt-2">
                          <p><b>Submitted:</b> {new Date(request.created_at).toLocaleString()}</p>
                        </div>

                          {/* Summary view only; full details available in dialog */}

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Full
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Request Details</DialogTitle>
                                  <DialogDescription>Complete information</DialogDescription>
                                </DialogHeader>
                                {selectedRequest && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="font-medium">Applicant Name</Label>
                                        <p>{selectedRequest.full_name ?? '-'}</p>
                                      </div>
                                      <div>
                                        <Label className="font-medium">CNIC</Label>
                                        <p>{selectedRequest.cnic_number ? formatCNIC(selectedRequest.cnic_number) : '-'}</p>
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
                                      <div>
                                        <Label className="font-medium">Submitted</Label>
                                        <p>{new Date(selectedRequest.created_at).toLocaleDateString()}</p>
                                      </div>
                                    </div>

                                    <div>
                                      <Label className="font-medium">Reason</Label>
                                      <p>{selectedRequest.reason ?? selectedRequest.description ?? ''}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                      {selectedRequest.father_name && (
                                        <div>
                                          <Label className="font-medium">Father Name</Label>
                                          <p>{selectedRequest.father_name}</p>
                                        </div>
                                      )}
                                      {selectedRequest.marital_status && (
                                        <div>
                                          <Label className="font-medium">Marital Status</Label>
                                          <p>{selectedRequest.marital_status}</p>
                                        </div>
                                      )}
                                      {selectedRequest.family_count !== null && (
                                        <div>
                                          <Label className="font-medium">Family Count</Label>
                                          <p>{selectedRequest.family_count}</p>
                                        </div>
                                      )}
                                      {selectedRequest.adult_member !== null && (
                                        <div>
                                          <Label className="font-medium">Adult Members</Label>
                                          <p>{selectedRequest.adult_member}</p>
                                        </div>
                                      )}
                                      {selectedRequest.matric_member !== null && (
                                        <div>
                                          <Label className="font-medium">Matric Members</Label>
                                          <p>{selectedRequest.matric_member}</p>
                                        </div>
                                      )}
                                      {selectedRequest.home_rent && (
                                        <div>
                                          <Label className="font-medium">Home Rent</Label>
                                          <p>{selectedRequest.home_rent}</p>
                                        </div>
                                      )}
                                      {selectedRequest.fridge && (
                                        <div>
                                          <Label className="font-medium">Fridge</Label>
                                          <p>{selectedRequest.fridge}</p>
                                        </div>
                                      )}
                                      {selectedRequest.monthly_income !== null && (
                                        <div>
                                          <Label className="font-medium">Monthly Income</Label>
                                          <p>PKR {selectedRequest.monthly_income.toLocaleString()}</p>
                                        </div>
                                      )}
                                      {selectedRequest.repayment_time && (
                                        <div>
                                          <Label className="font-medium">Repayment Time</Label>
                                          <p>{selectedRequest.repayment_time}</p>
                                        </div>
                                      )}
                                    </div>

                                    <div className="space-y-2">
                                      {selectedRequest.cnic_front && (
                                        <div>
                                          <Label className="font-medium">CNIC Front</Label>
                                          <a href={selectedRequest.cnic_front.startsWith('/uploads/') ? selectedRequest.cnic_front : `/uploads/${selectedRequest.cnic_front.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View CNIC Front</a>
                                        </div>
                                      )}
                                      {selectedRequest.cnic_back && (
                                        <div>
                                          <Label className="font-medium">CNIC Back</Label>
                                          <a href={selectedRequest.cnic_back.startsWith('/uploads/') ? selectedRequest.cnic_back : `/uploads/${selectedRequest.cnic_back.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View CNIC Back</a>
                                        </div>
                                      )}
                                      {selectedRequest.document && (
                                        <div>
                                          <Label className="font-medium">Supporting Document</Label>
                                          <a href={selectedRequest.document.startsWith('/uploads/') ? selectedRequest.document : `/uploads/${selectedRequest.document.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View Document</a>
                                        </div>
                                      )}
                                    </div>

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
                                          onClick={() => handleRejectRequest(selectedRequest)}
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
                                  onClick={() => handleRejectRequest(request)}
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donor-requests">
            <Card>
              <CardHeader>
                <CardTitle>Donor Requests</CardTitle>
                <CardDescription>Approve or reject donor signups</CardDescription>
              </CardHeader>
              <CardContent>
                {donors.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No donor requests</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>CNIC</TableHead>
                          <TableHead>Organization</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {donors.map((d) => (
                          <TableRow key={d.id}>
                            <TableCell className="font-medium">{d.name}</TableCell>
                            <TableCell>{d.email}</TableCell>
                            <TableCell>{formatCNIC(String(d.cnic ?? ""))}</TableCell>
                            <TableCell>{d.organization_name || "-"}</TableCell>
                            <TableCell>
                              <Badge className={
                                d.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : d.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                              }>
                                {d.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button size="sm" variant="outline" onClick={() => updateDonorStatus(d.id, 'PENDING')}>Pending</Button>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => updateDonorStatus(d.id, 'ACTIVE')}>Approve</Button>
                              <Button size="sm" variant="destructive" onClick={() => updateDonorStatus(d.id, 'REJECTED')}>Reject</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accepted-requests">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Accepted Requests
                </CardTitle>
                <CardDescription>View all approved welfare applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests
                    .filter((r) => r.status === "approved")
                    .map((request) => (
                      <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-green-50">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-lg">{request.full_name ?? '-'}</h3>
                              {request.cnic_number && (<Badge variant="outline">{formatCNIC(request.cnic_number)}</Badge>)}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span><b>ID:</b> {request.id}</span>
                              <span><b>User ID:</b> {request.user_id}</span>
                              <span><b>Type:</b> {request.type}</span>
                              <span><b>Status:</b> {request.status}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{request.reason ?? request.description ?? ''}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-100 text-green-800">
                              <div className="flex items-center space-x-1">
                                <CheckCircle className="h-4 w-4" />
                                <span className="capitalize">{request.status}</span>
                              </div>
                            </Badge>
                          </div>
                        </div>

                        <div className="text-sm text-gray-500 mt-2">
                          <p><b>Submitted:</b> {new Date(request.created_at).toLocaleString()}</p>
                          <p><b>Approved:</b> {new Date(request.updated_at).toLocaleString()}</p>
                        </div>

                          {/* Summary view only; full details available in dialog */}

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Full
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Request Details</DialogTitle>
                                  <DialogDescription>Complete information</DialogDescription>
                                </DialogHeader>
                                {selectedRequest && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="font-medium">Applicant Name</Label>
                                        <p>{selectedRequest.full_name ?? '-'}</p>
                                      </div>
                                      <div>
                                        <Label className="font-medium">CNIC</Label>
                                        <p>{selectedRequest.cnic_number ? formatCNIC(selectedRequest.cnic_number) : '-'}</p>
                                      </div>
                                      <div>
                                        <Label className="font-medium">Request Type</Label>
                                        <p className="capitalize">{selectedRequest.type}</p>
                                      </div>
                                      <div>
                                        <Label className="font-medium">Status</Label>
                                        <Badge className="bg-green-100 text-green-800">
                                          {selectedRequest.status}
                                        </Badge>
                                      </div>
                                      <div>
                                        <Label className="font-medium">Submitted</Label>
                                        <p>{new Date(selectedRequest.created_at).toLocaleDateString()}</p>
                                      </div>
                                      <div>
                                        <Label className="font-medium">Approved</Label>
                                        <p>{new Date(selectedRequest.updated_at).toLocaleDateString()}</p>
                                      </div>
                                    </div>

                                    <div>
                                      <Label className="font-medium">Reason</Label>
                                      <p>{selectedRequest.reason ?? selectedRequest.description ?? ''}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                      {selectedRequest.father_name && (
                                        <div>
                                          <Label className="font-medium">Father Name</Label>
                                          <p>{selectedRequest.father_name}</p>
                                        </div>
                                      )}
                                      {selectedRequest.marital_status && (
                                        <div>
                                          <Label className="font-medium">Marital Status</Label>
                                          <p>{selectedRequest.marital_status}</p>
                                        </div>
                                      )}
                                      {selectedRequest.family_count !== null && (
                                        <div>
                                          <Label className="font-medium">Family Count</Label>
                                          <p>{selectedRequest.family_count}</p>
                                        </div>
                                      )}
                                      {selectedRequest.adult_member !== null && (
                                        <div>
                                          <Label className="font-medium">Adult Members</Label>
                                          <p>{selectedRequest.adult_member}</p>
                                        </div>
                                      )}
                                      {selectedRequest.matric_member !== null && (
                                        <div>
                                          <Label className="font-medium">Matric Members</Label>
                                          <p>{selectedRequest.matric_member}</p>
                                        </div>
                                      )}
                                      {selectedRequest.home_rent && (
                                        <div>
                                          <Label className="font-medium">Home Rent</Label>
                                          <p>{selectedRequest.home_rent}</p>
                                        </div>
                                      )}
                                      {selectedRequest.fridge && (
                                        <div>
                                          <Label className="font-medium">Fridge</Label>
                                          <p>{selectedRequest.fridge}</p>
                                        </div>
                                      )}
                                      {selectedRequest.monthly_income !== null && (
                                        <div>
                                          <Label className="font-medium">Monthly Income</Label>
                                          <p>PKR {selectedRequest.monthly_income.toLocaleString()}</p>
                                        </div>
                                      )}
                                      {selectedRequest.repayment_time && (
                                        <div>
                                          <Label className="font-medium">Repayment Time</Label>
                                          <p>{selectedRequest.repayment_time}</p>
                                        </div>
                                      )}
                                    </div>

                                    <div className="space-y-2">
                                      {selectedRequest.cnic_front && (
                                        <div>
                                          <Label className="font-medium">CNIC Front</Label>
                                          <a href={selectedRequest.cnic_front.startsWith('/uploads/') ? selectedRequest.cnic_front : `/uploads/${selectedRequest.cnic_front.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View CNIC Front</a>
                                        </div>
                                      )}
                                      {selectedRequest.cnic_back && (
                                        <div>
                                          <Label className="font-medium">CNIC Back</Label>
                                          <a href={selectedRequest.cnic_back.startsWith('/uploads/') ? selectedRequest.cnic_back : `/uploads/${selectedRequest.cnic_back.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View CNIC Back</a>
                                        </div>
                                      )}
                                      {selectedRequest.document && (
                                        <div>
                                          <Label className="font-medium">Supporting Document</Label>
                                          <a href={selectedRequest.document.startsWith('/uploads/') ? selectedRequest.document : `/uploads/${selectedRequest.document.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View Document</a>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejected-requests">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <XCircle className="h-5 w-5 mr-2 text-red-600" />
                  Rejected Requests
                </CardTitle>
                <CardDescription>View all rejected welfare applications with rejection reasons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests
                    .filter((r) => r.status === "rejected")
                    .map((request) => (
                      <div key={request.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-red-50">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-lg">{request.full_name ?? '-'}</h3>
                              {request.cnic_number && (<Badge variant="outline">{formatCNIC(request.cnic_number)}</Badge>)}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span><b>ID:</b> {request.id}</span>
                              <span><b>User ID:</b> {request.user_id}</span>
                              <span><b>Type:</b> {request.type}</span>
                              <span><b>Status:</b> {request.status}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{request.reason ?? request.description ?? ''}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-red-100 text-red-800">
                              <div className="flex items-center space-x-1">
                                <XCircle className="h-4 w-4" />
                                <span className="capitalize">{request.status}</span>
                              </div>
                            </Badge>
                          </div>
                        </div>

                        <div className="text-sm text-gray-500 mt-2">
                          <p><b>Submitted:</b> {new Date(request.created_at).toLocaleString()}</p>
                          <p><b>Rejected:</b> {new Date(request.updated_at).toLocaleString()}</p>
                        </div>

                        {/* Rejection Reason */}
                        {request.rejection_reason && (
                          <div className="mt-3 p-3 bg-red-100 rounded-lg">
                            <div className="text-sm font-medium text-red-800 mb-1">Rejection Reason:</div>
                            <div className="text-sm text-red-700">{request.rejection_reason}</div>
                          </div>
                        )}

                        {/* Summary view only; full details available in dialog */}

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                                  <Eye className="h-4 w-4 mr-1" />
                                    View Full
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle>Request Details</DialogTitle>
                                  <DialogDescription>Complete information</DialogDescription>
                                </DialogHeader>
                                {selectedRequest && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <Label className="font-medium">Applicant Name</Label>
                                        <p>{selectedRequest.full_name ?? '-'}</p>
                                      </div>
                                      <div>
                                        <Label className="font-medium">CNIC</Label>
                                        <p>{selectedRequest.cnic_number ? formatCNIC(selectedRequest.cnic_number) : '-'}</p>
                                      </div>
                                      <div>
                                        <Label className="font-medium">Request Type</Label>
                                        <p className="capitalize">{selectedRequest.type}</p>
                                      </div>
                                      <div>
                                        <Label className="font-medium">Status</Label>
                                        <Badge className="bg-red-100 text-red-800">
                                          {selectedRequest.status}
                                        </Badge>
                                      </div>
                                      <div>
                                        <Label className="font-medium">Submitted</Label>
                                        <p>{new Date(selectedRequest.created_at).toLocaleDateString()}</p>
                                      </div>
                                      <div>
                                        <Label className="font-medium">Rejected</Label>
                                        <p>{new Date(selectedRequest.updated_at).toLocaleDateString()}</p>
                                      </div>
                                    </div>

                                    <div>
                                      <Label className="font-medium">Reason</Label>
                                      <p>{selectedRequest.reason ?? selectedRequest.description ?? ''}</p>
                                    </div>

                                    {selectedRequest.rejection_reason && (
                                      <div>
                                        <Label className="font-medium">Rejection Reason</Label>
                                        <div className="p-3 bg-red-100 rounded-lg">
                                          <p className="text-red-800">{selectedRequest.rejection_reason}</p>
                                        </div>
                                      </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                      {selectedRequest.father_name && (
                                        <div>
                                          <Label className="font-medium">Father Name</Label>
                                          <p>{selectedRequest.father_name}</p>
                                        </div>
                                      )}
                                      {selectedRequest.marital_status && (
                                        <div>
                                          <Label className="font-medium">Marital Status</Label>
                                          <p>{selectedRequest.marital_status}</p>
                                        </div>
                                      )}
                                      {selectedRequest.family_count !== null && (
                                        <div>
                                          <Label className="font-medium">Family Count</Label>
                                          <p>{selectedRequest.family_count}</p>
                                        </div>
                                      )}
                                      {selectedRequest.adult_member !== null && (
                                        <div>
                                          <Label className="font-medium">Adult Members</Label>
                                          <p>{selectedRequest.adult_member}</p>
                                        </div>
                                      )}
                                      {selectedRequest.matric_member !== null && (
                                        <div>
                                          <Label className="font-medium">Matric Members</Label>
                                          <p>{selectedRequest.matric_member}</p>
                                        </div>
                                      )}
                                      {selectedRequest.home_rent && (
                                        <div>
                                          <Label className="font-medium">Home Rent</Label>
                                          <p>{selectedRequest.home_rent}</p>
                                        </div>
                                      )}
                                      {selectedRequest.fridge && (
                                        <div>
                                          <Label className="font-medium">Fridge</Label>
                                          <p>{selectedRequest.fridge}</p>
                                        </div>
                                      )}
                                      {selectedRequest.monthly_income !== null && (
                                        <div>
                                          <Label className="font-medium">Monthly Income</Label>
                                          <p>PKR {selectedRequest.monthly_income.toLocaleString()}</p>
                                        </div>
                                      )}
                                      {selectedRequest.repayment_time && (
                                        <div>
                                          <Label className="font-medium">Repayment Time</Label>
                                          <p>{selectedRequest.repayment_time}</p>
                                        </div>
                                      )}
                                    </div>

                                    <div className="space-y-2">
                                      {selectedRequest.cnic_front && (
                                        <div>
                                          <Label className="font-medium">CNIC Front</Label>
                                          <a href={selectedRequest.cnic_front.startsWith('/uploads/') ? selectedRequest.cnic_front : `/uploads/${selectedRequest.cnic_front.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View CNIC Front</a>
                                        </div>
                                      )}
                                      {selectedRequest.cnic_back && (
                                        <div>
                                          <Label className="font-medium">CNIC Back</Label>
                                          <a href={selectedRequest.cnic_back.startsWith('/uploads/') ? selectedRequest.cnic_back : `/uploads/${selectedRequest.cnic_back.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View CNIC Back</a>
                                        </div>
                                      )}
                                      {selectedRequest.document && (
                                        <div>
                                          <Label className="font-medium">Supporting Document</Label>
                                          <a href={selectedRequest.document.startsWith('/uploads/') ? selectedRequest.document : `/uploads/${selectedRequest.document.replace(/^.*[\\/]/,'')}`} target="_blank" className="text-blue-700 underline">View Document</a>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Rejection Dialog */}
      <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this request.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rejection-reason" className="text-right">
                Reason
              </Label>
              <Textarea
                id="rejection-reason"
                value={rejectionReason}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setRejectionReason(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectionDialog(false)}>Cancel</Button>
            <Button onClick={confirmRejection}>Reject</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
