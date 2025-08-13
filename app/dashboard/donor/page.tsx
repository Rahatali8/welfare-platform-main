
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target, 
  Award,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  ArrowUpRight,
  Star,
  Crown,
  Sparkles
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";

type RequestUser = {
  id: string;
  fullName: string;
  cnic: string;
  phone?: string;
  email?: string;
  address?: string;
};

type RequestType = {
  id: string;
  user: RequestUser;
  type: string;
  status: string;
  reason?: string;
  description?: string;
  amount?: number;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
};

interface DonorAnalytics {
  totalDonated: number;
  acceptedRequests: number;
  totalRequests: number;
  monthlyDonations: number;
  impactScore: number;
  donationHistory: Array<{
    month: string;
    amount: number;
  }>;
  requestStats: {
    pending: number;
    approved: number;
    rejected: number;
  };
  topCategories: Array<{
    type: string;
    count: number;
    amount: number;
  }>;
}

// Placeholder helpers (replace with real logic as needed)
function getTypeIcon(type: string) {
  const icons = {
    loan: <DollarSign className="h-5 w-5 text-green-500" />,
    microfinance: <TrendingUp className="h-5 w-5 text-blue-500" />,
    general: <Heart className="h-5 w-5 text-red-500" />,
  };
  return icons[type as keyof typeof icons] || <Heart className="h-5 w-5 text-red-500" />;
}

function getTypeColor(type: string) {
  const colors = {
    loan: "bg-green-100 text-green-800 border-green-200",
    microfinance: "bg-blue-100 text-blue-800 border-blue-200",
    general: "bg-red-100 text-red-800 border-red-200",
  };
  return colors[type as keyof typeof colors] || "bg-blue-100 text-blue-800 border-blue-200";
}

function formatCNIC(cnic: string) {
  return cnic;
}

function calculateImpactScore(totalDonated: number, acceptedRequests: number): number {
  const baseScore = Math.min(totalDonated / 1000, 100); // Base on amount donated
  const requestBonus = acceptedRequests * 10; // Bonus for each accepted request
  return Math.min(baseScore + requestBonus, 100);
}

export default function DonorDashboardPage() {
  const [groupedRequests, setGroupedRequests] = useState<{ [type: string]: RequestType[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [donor, setDonor] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [analytics, setAnalytics] = useState<DonorAnalytics | null>(null);

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/donor/requests");
        if (!res.ok) throw new Error("Failed to fetch requests");
        const data = await res.json();
        
        // Filter only pending requests
        const filteredRequests: { [type: string]: RequestType[] } = {};
        Object.entries(data.requests || {}).forEach(([type, requests]) => {
          const typedRequests = requests as RequestType[];
          const pendingRequests = typedRequests.filter((req: RequestType) => 
            req.status?.toLowerCase() === 'pending'
          );
          if (pendingRequests.length > 0) {
            filteredRequests[type] = pendingRequests;
          }
        });
        
        setGroupedRequests(filteredRequests);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      setProfileLoading(true);
      try {
        const res = await fetch("/api/donor/profile");
        const data = await res.json();
        setDonor(data.donor);
        
        // Generate analytics from donor data
        if (data.donor) {
          const impactScore = calculateImpactScore(data.donor.totalDonated, data.donor.acceptedRequests);
          
          // Generate mock donation history (replace with real data)
          const donationHistory = [
            { month: "Jan", amount: Math.floor(data.donor.totalDonated * 0.1) },
            { month: "Feb", amount: Math.floor(data.donor.totalDonated * 0.15) },
            { month: "Mar", amount: Math.floor(data.donor.totalDonated * 0.2) },
            { month: "Apr", amount: Math.floor(data.donor.totalDonated * 0.12) },
            { month: "May", amount: Math.floor(data.donor.totalDonated * 0.18) },
            { month: "Jun", amount: Math.floor(data.donor.totalDonated * 0.25) },
          ];

          // Generate request stats from grouped requests
          const requestStats = {
            pending: 0,
            approved: 0,
            rejected: 0,
          };

          Object.values(groupedRequests).forEach((requests: RequestType[]) => {
            requests.forEach((req) => {
              const status = req.status?.toLowerCase();
              if (status === 'pending') requestStats.pending++;
              else if (status === 'approved') requestStats.approved++;
              else if (status === 'rejected') requestStats.rejected++;
            });
          });

          // Generate top categories
          const topCategories = Object.entries(groupedRequests).map(([type, requests]) => ({
            type,
            count: requests.length,
            amount: requests.reduce((sum, req) => sum + (req.amount || 0), 0),
          })).sort((a, b) => b.amount - a.amount).slice(0, 3);

          setAnalytics({
            totalDonated: data.donor.totalDonated,
            acceptedRequests: data.donor.acceptedRequests,
            totalRequests: data.donor.totalRequests,
            monthlyDonations: Math.floor(data.donor.totalDonated / 6), // Mock monthly average
            impactScore,
            donationHistory,
            requestStats,
            topCategories,
          });
        }
      } catch (e) {
        setDonor(null);
      } finally {
        setProfileLoading(false);
      }
    }
    fetchProfile();
  }, [groupedRequests]);

  async function handleAccept(request: RequestType) {
    const amount = window.prompt(
      `Enter amount to donate (max PKR ${request.amount?.toLocaleString() || '0'}) or leave blank to fulfill full request:`
    );
    if (amount === null) return;
    let donateAmount = Number(amount);
    if (!amount || isNaN(donateAmount) || donateAmount >= (request.amount || 0)) {
      donateAmount = request.amount || 0;
    }
    try {
      const res = await fetch('/api/donor/accept-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId: request.id, amount: donateAmount })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Request accepted and donation recorded!');
        window.location.reload();
      } else {
        alert(data.error || 'Failed to accept request');
      }
    } catch (e) {
      alert('Server error');
    }
  }

  function handleForward(id: string) {
    alert(`Forwarded request ${id}`);
  }

  async function handleLogout() {
    try {
      await fetch("/api/logout", { method: "POST" });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/";
    }
  }

  const getVIPLevel = (impactScore: number) => {
    if (impactScore >= 90) return { level: "Diamond", color: "text-purple-500", icon: <Crown className="h-5 w-5" /> };
    if (impactScore >= 70) return { level: "Platinum", color: "text-gray-500", icon: <Star className="h-5 w-5" /> };
    if (impactScore >= 50) return { level: "Gold", color: "text-yellow-500", icon: <Award className="h-5 w-5" /> };
    if (impactScore >= 30) return { level: "Silver", color: "text-gray-400", icon: <Sparkles className="h-5 w-5" /> };
    return { level: "Bronze", color: "text-orange-500", icon: <Heart className="h-5 w-5" /> };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-sans">
      {/* VIP Header */}
      <header className="bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 text-white shadow-2xl">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-6">
        <div className="flex items-center space-x-4">
              <div className="relative">
                <Heart className="h-12 w-12 text-yellow-400 drop-shadow-lg animate-pulse" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
              </div>
          <div>
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 drop-shadow-lg tracking-tight uppercase">
                  VIP Donor Dashboard
                </h1>
                <p className="text-lg text-blue-200 font-semibold italic mt-1 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Empowering change through generosity
                  <Sparkles className="h-4 w-4" />
                </p>
          </div>
        </div>
            
            {/* Profile Circle in header (replaces logout button) */}
            {donor && (
          <Popover>
            <PopoverTrigger asChild>
                  <button className="relative group">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl border-4 border-white/20 hover:scale-110 transition-all duration-300">
                      <span className="text-xl md:text-2xl font-bold text-white">{donor.name?.charAt(0) || "D"}</span>
                    </div>
                    {analytics && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] md:text-xs px-2 py-0.5 rounded-full font-bold shadow-lg">
                        {getVIPLevel(analytics.impactScore).level}
                      </div>
                    )}
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="p-0 border-0 bg-transparent shadow-none">
                  <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 w-80 md:w-96 border border-gray-200">
                <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center overflow-hidden shadow-xl">
                          <span className="text-3xl md:text-4xl font-bold text-white">{donor.name?.charAt(0) || "D"}</span>
                        </div>
                        {analytics && (
                          <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg flex items-center gap-1">
                            {getVIPLevel(analytics.impactScore).icon}
                            {getVIPLevel(analytics.impactScore).level}
                          </div>
                        )}
                      </div>
                      <div className="font-bold text-xl md:text-2xl text-gray-900 mb-1">{donor.name}</div>
                      <div className="text-sm text-gray-500 mb-4">{donor.email}</div>

                      {analytics && (
                        <div className="w-full bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-4">
                          <div className="text-center mb-3">
                            <div className="text-2xl md:text-3xl font-bold text-blue-900">{analytics.impactScore}</div>
                            <div className="text-sm text-blue-600">Impact Score</div>
                          </div>
                          <Progress value={analytics.impactScore} className="h-2" />
                  </div>
                      )}

                      <div className="w-full border-b border-gray-200 my-4"></div>
                      <div className="w-full grid grid-cols-2 gap-4 text-gray-700 text-sm">
                    <div><b>CNIC:</b> {donor.cnic}</div>
                    <div><b>Contact:</b> {donor.contact_number}</div>
                    <div><b>Org:</b> {donor.organization_name || '-'}</div>
                        <div><b>Member Since:</b> {new Date(donor.created_at).toLocaleDateString()}</div>
                      </div>

                      {analytics && (
                        <>
                          <div className="w-full border-b border-gray-200 my-4"></div>
                          <div className="w-full grid grid-cols-1 gap-3 text-blue-900 text-base">
                            <div className="flex justify-between items-center">
                              <span><b>Total Donated:</b></span>
                              <span className="font-bold">PKR {analytics.totalDonated.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span><b>Accepted Requests:</b></span>
                              <span className="font-bold">{analytics.acceptedRequests}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span><b>Monthly Average:</b></span>
                              <span className="font-bold">PKR {analytics.monthlyDonations.toLocaleString()}</span>
                  </div>
                  </div>
                        </>
                      )}

                  <button
                        className="mt-6 w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all text-lg shadow-lg"
                        onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analytics Overview */}
        {analytics && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Donated */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-800">Total Donated</CardTitle>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-700">PKR {analytics.totalDonated.toLocaleString()}</div>
                  <p className="text-xs text-green-600">Lifetime contributions</p>
                </CardContent>
              </Card>

              {/* Impact Score */}
              <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-800">Impact Score</CardTitle>
                  <Target className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-700">{analytics.impactScore}</div>
                  <p className="text-xs text-purple-600">{getVIPLevel(analytics.impactScore).level} Level</p>
                </CardContent>
              </Card>

              {/* Accepted Requests */}
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-800">Accepted Requests</CardTitle>
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-700">{analytics.acceptedRequests}</div>
                  <p className="text-xs text-blue-600">Successful donations</p>
                </CardContent>
              </Card>

              {/* Monthly Average */}
              <Card className="bg-gradient-to-br from-orange-50 to-red-100 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-800">Monthly Average</CardTitle>
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-700">PKR {analytics.monthlyDonations.toLocaleString()}</div>
                  <p className="text-xs text-orange-600">Average per month</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Donation History Chart */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Donation History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics.donationHistory.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">{item.month}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(item.amount / Math.max(...analytics.donationHistory.map(d => d.amount))) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold text-gray-900">PKR {item.amount.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Request Statistics */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Request Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium">Pending</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">{analytics.requestStats.pending}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Approved</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">{analytics.requestStats.approved}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-medium">Rejected</span>
                      </div>
                      <span className="text-lg font-bold text-red-600">{analytics.requestStats.rejected}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Categories */}
            <Card className="bg-white shadow-lg border-0 mb-8">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Top Donation Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {analytics.topCategories.map((category, index) => (
                    <div key={index} className="text-center p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                      <div className="text-2xl font-bold text-gray-900 mb-2">{category.type}</div>
                      <div className="text-lg font-semibold text-blue-600 mb-1">{category.count} requests</div>
                      <div className="text-sm text-gray-600">PKR {category.amount.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Requests Section */}
            <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <h2 className="text-3xl font-bold text-gray-900">Active Requests</h2>
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1">
              {Object.values(groupedRequests).reduce((total, requests) => total + requests.length, 0)} Total
            </Badge>
            </div>
          
            {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading requests...</p>
            </div>
            ) : error ? (
            <div className="text-center py-20">
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600">{error}</p>
            </div>
            ) : Object.keys(groupedRequests).length === 0 ? (
            <div className="text-center py-20">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No requests available at the moment.</p>
            </div>
            ) : (
              <Tabs defaultValue={Object.keys(groupedRequests)[0]} className="w-full">
              <TabsList className="mb-6 bg-white shadow-lg border border-gray-200 p-1 rounded-xl">
                  {Object.keys(groupedRequests).map((type) => (
                  <TabsTrigger key={type} value={type} className="capitalize data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(type)}
                      {type}
                      <Badge className="ml-1 bg-blue-100 text-blue-800 text-xs">
                        {groupedRequests[type].length}
                      </Badge>
                    </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              
                {Object.entries(groupedRequests).map(([type, requests]) => (
                  <TabsContent key={type} value={type}>
                    {requests.length === 0 ? (
                    <div className="text-center py-20">
                      <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No {type} requests available.</p>
                    </div>
                    ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {requests.map((request) => (
                        <Card key={request.id} className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-0 group">
                          <CardContent className="p-6">
                            <div className="flex flex-col gap-4">
                              {/* Header */}
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="font-bold text-lg text-gray-900 truncate">{request.user?.fullName || "-"}</h3>
                                  <p className="text-sm text-gray-500">{formatCNIC(request.user?.cnic || "")}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <Badge className={`${getTypeColor(request.type)} text-xs font-semibold`}>
                                    {getTypeIcon(request.type)} {request.type}
                                  </Badge>
                                  <Badge className={
                                    request.status?.toLowerCase() === "pending"
                                      ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                                      : request.status === "approved"
                                      ? "bg-green-100 text-green-800 border-green-200"
                                      : "bg-red-100 text-red-800 border-red-200"
                                  }>
                                    {request.status}
                                  </Badge>
                                </div>
                              </div>

                              {/* Description */}
                              <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-gray-700 text-sm italic line-clamp-2">
                                  {request.reason || request.description || "No description provided"}
                                </p>
                                </div>

                              {/* Amount */}
                                {request.amount && (
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-200">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-600">Requested Amount:</span>
                                    <span className="font-bold text-lg text-blue-700">PKR {request.amount.toLocaleString()}</span>
                                  </div>
                                </div>
                              )}

                              {/* Contact Info */}
                              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                <div><b>Email:</b> {request.user?.email || '-'}</div>
                                <div><b>Phone:</b> {request.user?.phone || '-'}</div>
                                </div>

                              {/* Document Links */}
                              <div className="flex flex-wrap gap-2">
                                  {request.image && (
                                  <Button size="sm" variant="outline" className="text-xs">
                                    <Eye className="h-3 w-3 mr-1" />
                                    Image
                                  </Button>
                                  )}
                                  {request.cnic_front && (
                                  <Button size="sm" variant="outline" className="text-xs">
                                    <Eye className="h-3 w-3 mr-1" />
                                      CNIC Front
                                  </Button>
                                  )}
                                  {request.cnic_back && (
                                  <Button size="sm" variant="outline" className="text-xs">
                                    <Eye className="h-3 w-3 mr-1" />
                                      CNIC Back
                                  </Button>
                                  )}
                                  {request.document && (
                                  <Button size="sm" variant="outline" className="text-xs">
                                    <Eye className="h-3 w-3 mr-1" />
                                    Document
                                  </Button>
                                  )}
                                </div>

                              {/* Action Buttons */}
                              <div className="flex gap-2 pt-2">
                                  {request.status?.toLowerCase() === "pending" && (
                                  <>
                                    <Button 
                                      size="sm" 
                                      className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:from-green-600 hover:to-emerald-600 transition-all flex-1"
                                      onClick={() => handleAccept(request)}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                      Accept
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline" 
                                      className="border-blue-300 text-blue-700 hover:bg-blue-50 transition-all"
                                      onClick={() => handleForward(request.id)}
                                    >
                                      <ArrowUpRight className="h-4 w-4" />
                                    </Button>
                                  </>
                                  )}
                                  {request.status === "approved" && (
                                  <Button 
                                    size="sm" 
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all w-full"
                                  >
                                    <DollarSign className="h-4 w-4 mr-1" />
                                    Donate Now
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            )}
        </div>
      </div>
    </div>
  );
}

