"use client"

import { useState, useEffect, ReactNode } from "react"
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
  rejection_reason?: string | null
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
  updated_at?: string
  user: {
    full_name: ReactNode
    fullName: string
    cnic: string
    address: string
  }
}

interface AcceptedByDonorItem {
  id: number
  amount: number
  isFullfill: boolean
  acceptedAt: string
  donor: {
    id?: number
    name?: string
    email?: string
    cnic?: string
    contact_number?: string
    organization_name?: string | null
  }
  request: Request
}

interface Donor {
  id: number
  name: string
  email: string
  cnic: string
  contact_number?: string | null
  organization_name?: string | null
  status: "PENDING" | "ACTIVE" | "REJECTED"
  created_at: string
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
  const [activeTab, setActiveTab] = useState("pending")
  const [typeFilter, setTypeFilter] = useState("all")
  const [donors, setDonors] = useState<Donor[]>([])
  const [isLoadingDonors, setIsLoadingDonors] = useState(false)
  const [acceptedByDonors, setAcceptedByDonors] = useState<AcceptedByDonorItem[]>([])
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchRequests()
    fetchAnalytics()
    fetchDonors()
    // Load donor-accepted items from localStorage (client-only)
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('acceptedByDonors') : null
      if (raw) setAcceptedByDonors(JSON.parse(raw))
    } catch {}
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

  const fetchDonors = async () => {
    try {
      setIsLoadingDonors(true)
      const res = await fetch("/api/admin/donors")
      if (res.ok) {
        const data = await res.json()
        setDonors(data.donors || [])
      }
    } catch (e) {
      console.error("Error fetching donors:", e)
    } finally {
      setIsLoadingDonors(false)
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
        if (status === 'approved') setActiveTab('approved')
        if (status === 'rejected') setActiveTab('rejected')
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

  const updateDonorStatus = async (donorId: number, status: "ACTIVE" | "PENDING" | "REJECTED") => {
    try {
      const res = await fetch("/api/admin/donors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donorId, status }),
      })
      if (res.ok) {
        toast({ title: "Donor Updated", description: `Status set to ${status}` })
        fetchDonors()
      } else {
        toast({ title: "Failed", description: "Could not update donor", variant: "destructive" })
      }
    } catch (e) {
      toast({ title: "Error", description: "Failed to update donor", variant: "destructive" })
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

  const getStatusTintClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50"
      case "approved":
        return "bg-green-50"
      case "rejected":
        return "bg-red-50"
      default:
        return "bg-white"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        
        {/* Glowing Orbit Loader */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-b-transparent border-indigo-400 animate-[spin_1.5s_linear_reverse_infinite]"></div>
          <div className="absolute inset-4 rounded-full border-4 border-l-transparent border-cyan-300 animate-spin"></div>
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-blue-400 blur-xl opacity-30 animate-pulse"></div>
        </div>

        {/* Loading Text with Shimmer */}
        <div className="relative">
          <p className="text-xl font-semibold text-gray-700 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent animate-[shimmer_2s_infinite]">
            Loading Admin Dashboard...
          </p>
        </div>
      </div>

      {/* Shimmer Animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 align-center">
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

          </div>
        )}

        <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="approved">Accepted</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="all-requests">All Requests</TabsTrigger>
            <TabsTrigger value="accepted-by-donors">Accepted by Donors</TabsTrigger>
            <TabsTrigger value="donors">Donors</TabsTrigger>
          </TabsList>

          {/* Pending */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>Review and take action on pending applications</CardDescription>
              </CardHeader>
              <CardContent>
                {requests.filter((r) => r.status === "pending").length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No pending requests</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {requests
                      .filter((r) => r.status === "pending")
                      .map((request) => (
                        <div key={request.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${getStatusTintClass(request.status)}`}>
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold text-lg">{request.user.fullName}</h3>
                                <Badge variant="outline">{formatCNIC(request.user.cnic)}</Badge>
                              </div>
                              <p className="text-gray-600 capitalize">{request.type} Request</p>
                              <p className="text-sm text-gray-500">{request.reason}</p>
                              {request.amount && (
                                <p className="text-sm font-medium text-green-600">Amount: PKR {request.amount.toLocaleString()}</p>
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

                                      <div className="grid grid-cols-2 gap-3 border rounded-md p-3 bg-gray-50">
                                        {Object.entries(selectedRequest.additionalData || {}).map(([key, value]) => (
                                          value ? (
                                            <div key={key} className="text-sm">
                                              <span className="font-medium capitalize mr-2">{key.replace(/_/g, " ")}</span>
                                              <span className="text-gray-700">{String(value)}</span>
                                            </div>
                                          ) : null
                                        ))}
                                      </div>

                                      {(selectedRequest.additionalData?.cnic_front || selectedRequest.additionalData?.cnic_back || selectedRequest.additionalData?.document) && (
                                        <div className="space-y-2">
                                          <Label className="font-medium">Documents</Label>
                                          <ul className="list-disc list-inside text-sm">
                                            {selectedRequest.additionalData?.cnic_front && (
                                              <li>
                                                <a className="text-blue-600 hover:underline" href={selectedRequest.additionalData.cnic_front} target="_blank" rel="noreferrer">View CNIC Front</a>
                                              </li>
                                            )}
                                            {selectedRequest.additionalData?.cnic_back && (
                                              <li>
                                                <a className="text-blue-600 hover:underline" href={selectedRequest.additionalData.cnic_back} target="_blank" rel="noreferrer">View CNIC Back</a>
                                              </li>
                                            )}
                                            {selectedRequest.additionalData?.document && (
                                              <li>
                                                <a className="text-blue-600 hover:underline" href={selectedRequest.additionalData.document} target="_blank" rel="noreferrer">View Document</a>
                                              </li>
                                            )}
                                          </ul>
                                        </div>
                                      )}

                                      {selectedRequest.status === "pending" && (
                                        <div className="flex space-x-2 pt-2">
                                          <Button onClick={() => updateRequestStatus(selectedRequest.id, "approved")} className="bg-green-600 hover:bg-green-700">
                                            <CheckCircle className="h-4 w-4 mr-2" />
                                            Approve
                                          </Button>
                                          <Button
                                            onClick={() => {
                                              const reason = prompt("Please enter rejection reason") || ""
                                              if (!reason.trim()) return
                                              updateRequestStatus(selectedRequest.id, "rejected", reason)
                                              setActiveTab("rejected")
                                            }}
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
                                onClick={() => {
                                  const reason = prompt("Please enter rejection reason") || ""
                                  if (!reason.trim()) return
                                  updateRequestStatus(request.id, "rejected", reason)
                                  setActiveTab("rejected")
                                }}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accepted by Donors (client-only via localStorage) */}
          <TabsContent value="accepted-by-donors">
            <Card>
              <CardHeader>
                <CardTitle>Accepted by Donors</CardTitle>
                <CardDescription>Requests donors pledged to fulfill</CardDescription>
              </CardHeader>
              <CardContent>
                {acceptedByDonors.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No donor-accepted requests yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {acceptedByDonors.map((item) => (
                      <div key={item.id} className={`border rounded-lg p-4 ${getStatusTintClass('approved')}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-lg">{item.request.user.fullName}</h3>
                              <Badge variant="outline">{formatCNIC(item.request.user.cnic)}</Badge>
                            </div>
                            <p className="text-gray-600 capitalize">{item.request.type} Request</p>
                            <p className="text-sm text-gray-500">{item.request.reason}</p>
                            {item.request.amount && (
                              <p className="text-sm text-gray-600">Requested: PKR {item.request.amount.toLocaleString()}</p>
                            )}
                            <p className="text-sm font-medium text-green-700">
                              Donor pledged: {item.isFullfill ? `Full amount (PKR ${item.amount.toLocaleString()})` : `PKR ${item.amount.toLocaleString()}`}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Accepted at: {new Date(item.acceptedAt).toLocaleString()}</p>
                            <p className="text-xs text-gray-600">
                              Donor: {item.donor?.name || '—'}
                              {item.donor?.email ? ` • ${item.donor.email}` : ''}
                              {item.donor?.cnic ? ` • ${item.donor.cnic}` : ''}
                              {item.donor?.contact_number ? ` • ${item.donor.contact_number}` : ''}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="text-sm text-gray-500">
                            <p>Submitted: {item.request.submittedAt ? new Date(item.request.submittedAt).toLocaleDateString() : ''}</p>
                            <p>Address: {item.request.currentAddress}</p>
                          </div>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedRequest(item.request)}>
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
                                      <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-md">
                                        {Object.entries(selectedRequest.additionalData)
                                          .filter(([_, v]) => v !== null && v !== undefined && v !== '')
                                          .map(([k, v]) => {
                                            const isLinkKey = ['cnic_front', 'cnic_back', 'document'].includes(k)
                                            const label = k.replace(/_/g, ' ')
                                            if (isLinkKey) {
                                              return (
                                                <div key={k} className="text-sm col-span-2">
                                                  <a className="text-blue-600 hover:underline" href={String(v)} target="_blank" rel="noreferrer">
                                                    View {label}
                                                  </a>
                                                </div>
                                              )
                                            }
                                            return (
                                              <div key={k} className="text-sm">
                                                <span className="font-medium capitalize mr-2">{label}</span>
                                                <span className="text-gray-700">{String(v)}</span>
                                              </div>
                                            )
                                          })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          {/* Accepted */}
          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <CardTitle>Accepted by Donors</CardTitle>
                <CardDescription>Requests accepted by donors with full details</CardDescription>
              </CardHeader>
              <CardContent>
                {requests.filter((r) => r.status === "approved").length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No approved requests</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {requests.filter((r) => r.status === "approved").map((request) => (
                      <div key={request.id} className={`border rounded-lg p-4 ${getStatusTintClass(request.status)}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-lg">{request.user.fullName}</h3>
                              <Badge variant="outline">{formatCNIC(request.user.cnic)}</Badge>
                            </div>
                            <p className="text-gray-600 capitalize">{request.type} Request</p>
                            <p className="text-sm text-gray-500">{request.reason}</p>
                            {request.amount && (
                              <p className="text-sm font-medium text-green-600">Amount: PKR {request.amount.toLocaleString()}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">Approved at: {request.updated_at ? new Date(request.updated_at).toLocaleString() : "—"}</p>
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
                                    <div>
                                      <Label className="font-medium">Approved At</Label>
                                      <p>{selectedRequest.updated_at ? new Date(selectedRequest.updated_at).toLocaleString() : "—"}</p>
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
                                      <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-md">
                                        {Object.entries(selectedRequest.additionalData)
                                          .filter(([_, v]) => v !== null && v !== undefined && v !== "")
                                          .map(([k, v]) => {
                                            const isLinkKey = ["cnic_front", "cnic_back", "document"].includes(k)
                                            const label = k.replace(/_/g, " ")
                                            if (isLinkKey) {
                                              return (
                                                <div key={k} className="text-sm col-span-2">
                                                  <a className="text-blue-600 hover:underline" href={String(v)} target="_blank" rel="noreferrer">
                                                    View {label}
                                                  </a>
                                                </div>
                                              )
                                            }
                                            return (
                                              <div key={k} className="text-sm">
                                                <span className="font-medium capitalize mr-2">{label}</span>
                                                <span className="text-gray-700">{String(v)}</span>
                                              </div>
                                            )
                                          })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rejected */}
          <TabsContent value="rejected">
            <Card>
              <CardHeader>
                <CardTitle>Rejected Requests</CardTitle>
                <CardDescription>Applications with rejection reasons</CardDescription>
              </CardHeader>
              <CardContent>
                {requests.filter((r) => r.status === "rejected").length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No rejected requests</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {requests.filter((r) => r.status === "rejected").map((request) => (
                      <div key={request.id} className={`border rounded-lg p-4 ${getStatusTintClass(request.status)}`}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-lg">{request.user.fullName}</h3>
                              <Badge variant="outline">{formatCNIC(request.user.cnic)}</Badge>
                            </div>
                            <p className="text-gray-600 capitalize">{request.type} Request</p>
                            <p className="text-sm text-gray-500">{request.reason}</p>
                            <p className="text-sm text-red-600">Rejected reason: {request.rejection_reason || 'N/A'}</p>
                            <p className="text-xs text-gray-500 mt-1">Rejected at: {request.updated_at ? new Date(request.updated_at).toLocaleString() : '—'}</p>
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
                                    <div>
                                      <Label className="font-medium">Rejected At</Label>
                                      <p>{selectedRequest.updated_at ? new Date(selectedRequest.updated_at).toLocaleString() : '—'}</p>
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
                                      <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-md">
                                        {Object.entries(selectedRequest.additionalData)
                                          .filter(([_, v]) => v !== null && v !== undefined && v !== '')
                                          .map(([k, v]) => {
                                            const isLinkKey = ['cnic_front', 'cnic_back', 'document'].includes(k)
                                            const label = k.replace(/_/g, ' ')
                                            if (isLinkKey) {
                                              return (
                                                <div key={k} className="text-sm col-span-2">
                                                  <a className="text-blue-600 hover:underline" href={String(v)} target="_blank" rel="noreferrer">
                                                    View {label}
                                                  </a>
                                                </div>
                                              )
                                            }
                                            return (
                                              <div key={k} className="text-sm">
                                                <span className="font-medium capitalize mr-2">{label}</span>
                                                <span className="text-gray-700">{String(v)}</span>
                                              </div>
                                            )
                                          })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

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
                      <div key={request.id} className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${getStatusTintClass(request.status)}`}>
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
                                          <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-md">
                                            {Object.entries(selectedRequest.additionalData)
                                              .filter(([_, v]) => v !== null && v !== undefined && v !== "")
                                              .map(([k, v]) => {
                                                const isLinkKey = ["cnic_front", "cnic_back", "document"].includes(k)
                                                const label = k.replace(/_/g, " ")
                                                if (isLinkKey) {
                                                  return (
                                                    <div key={k} className="text-sm col-span-2">
                                                      <a className="text-blue-600 hover:underline" href={String(v)} target="_blank" rel="noreferrer">
                                                        View {label}
                                                      </a>
                                        </div>
                                                  )
                                                }
                                                return (
                                                  <div key={k} className="text-sm">
                                                    <span className="font-medium capitalize mr-2">{label}</span>
                                                    <span className="text-gray-700">{String(v)}</span>
                                      </div>
                                                )
                                              })}
                                          </div>
                                      </div>
                                    )}

                                      {/* Removed large CNIC image preview; using links above instead */}

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

          <TabsContent value="donors">
            <Card>
              <CardHeader>
                <CardTitle>Donor Approvals</CardTitle>
                <CardDescription>Approve or reject donor accounts</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingDonors ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto" />
                    <p className="text-gray-600 mt-3">Loading donors...</p>
                          </div>
                ) : donors.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No donors found</p>
                        </div>
                ) : (
                <div className="space-y-4">
                    {donors.map((d) => (
                      <div key={d.id} className="border rounded-lg p-4 flex justify-between items-start">
                          <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{d.name}</h3>
                            <Badge variant="outline">{d.cnic}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{d.email} {d.contact_number ? `• ${d.contact_number}` : ""}</p>
                          {d.organization_name && (
                            <p className="text-sm text-gray-500">Org: {d.organization_name}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">Joined: {new Date(d.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={
                            d.status === "PENDING" ? "bg-yellow-100 text-yellow-800" :
                            d.status === "ACTIVE" ? "bg-green-100 text-green-800" :
                            "bg-red-100 text-red-800"
                          }>
                            {d.status}
                          </Badge>
                          {d.status === "PENDING" && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => updateDonorStatus(d.id, "ACTIVE")}>Approve</Button>
                              <Button size="sm" variant="destructive" onClick={() => updateDonorStatus(d.id, "REJECTED")}>Reject</Button>
                            </>
                          )}
                          {d.status === "ACTIVE" && (
                            <Button size="sm" variant="outline" onClick={() => updateDonorStatus(d.id, "PENDING")}>Move to Pending</Button>
                          )}
                          {d.status === "REJECTED" && (
                            <Button size="sm" variant="outline" onClick={() => updateDonorStatus(d.id, "PENDING")}>Move to Pending</Button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Removed loan/microfinance/general tabs as requested */}
        </Tabs>
      </div>
    </div>
  )
}
