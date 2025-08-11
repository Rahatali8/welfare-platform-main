
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

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


// Placeholder helpers (replace with real logic as needed)
function getTypeIcon(type: string) {
  return <Heart className="h-5 w-5 text-red-500" />;
}
function getTypeColor(type: string) {
  return "bg-blue-100 text-blue-800";
}
function formatCNIC(cnic: string) {
  return cnic;
}

export default function DonorDashboardPage() {
  const [groupedRequests, setGroupedRequests] = useState<{ [type: string]: RequestType[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/donor/requests");
        if (!res.ok) throw new Error("Failed to fetch requests");
        const data = await res.json();
  setGroupedRequests(data.requests || {});
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, []);

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
        // Refresh requests
        window.location.reload();
      } else {
        alert(data.error || 'Failed to accept request');
      }
    } catch (e) {
      alert('Server error');
    }
  }
  function handleForward(id: string) {
    // TODO: Implement forward logic
    alert(`Forwarded request ${id}`);
  }


  const [donor, setDonor] = useState<any>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  useEffect(() => {
    async function fetchProfile() {
      setProfileLoading(true);
      try {
        const res = await fetch("/api/donor/profile");
        const data = await res.json();
        setDonor(data.donor);
      } catch (e) {
        setDonor(null);
      } finally {
        setProfileLoading(false);
      }
    }
    fetchProfile();
  }, []);

  return (
  <div className="min-h-screen bg-gradient-to-br from-white via-[#f1f5f9] to-[#e0e7ef] font-sans">
  <header className="bg-white/80 backdrop-blur-xl shadow-2xl border-b border-blue-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center py-6">
        <div className="flex items-center space-x-4">
          <Heart className="h-10 w-10 text-yellow-500 drop-shadow" />
          <div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-700 to-blue-900 drop-shadow-lg tracking-tight uppercase">VIP Donor Dashboard</h1>
            <p className="text-lg text-blue-900 font-semibold italic mt-1">Empower change with your generosity</p>
          </div>
        </div>
        {/* Donor profile avatar in header, right side */}
        {profileLoading ? (
          <div className="py-2 px-4 text-gray-400">Loading...</div>
        ) : !donor ? (
          <div className="text-red-500">Profile not found</div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <button className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center shadow-lg border-2 border-blue-200 hover:scale-105 transition-all focus:outline-none ml-4">
                <span className="text-2xl font-bold text-blue-600">{donor.name?.charAt(0) || "D"}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="p-0 border-0 bg-transparent shadow-none">
              <div className="bg-white rounded-2xl shadow-xl p-6 w-80">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-2 overflow-hidden">
                    <span className="text-3xl font-bold text-blue-600">{donor.name?.charAt(0) || "D"}</span>
                  </div>
                  <div className="font-bold text-xl text-gray-900 mb-1">{donor.name}</div>
                  <div className="text-sm text-gray-500 mb-2">{donor.email}</div>
                  <div className="w-full border-b border-gray-200 my-2"></div>
                  <div className="w-full flex flex-col gap-2 text-gray-700 text-base">
                    <div><b>CNIC:</b> {donor.cnic}</div>
                    <div><b>Contact:</b> {donor.contact_number}</div>
                    <div><b>Org:</b> {donor.organization_name || '-'}</div>
                  </div>
                  <div className="w-full border-b border-gray-200 my-2"></div>
                  <div className="w-full flex flex-col gap-2 text-blue-900 text-base">
                    <div><b>Total Donated:</b> PKR {donor.totalDonated?.toLocaleString()}</div>
                    <div><b>Accepted Requests:</b> {donor.acceptedRequests}</div>
                    <div><b>Total Requests:</b> {donor.totalRequests}</div>
                  </div>
                  <button
                    className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition text-lg shadow"
                    onClick={async () => {
                      await fetch("/api/logout", { method: "POST" });
                      window.location.href = "/";
                    }}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Main dashboard content */}
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-blue-900 mb-2 tracking-wide flex items-center gap-2"><span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-300 to-blue-500 rounded-full mr-2"></span>Requests Overview</h2>
              <p className="text-gray-500 text-base mb-2">All your donation requests, grouped by type, with full details and actions.</p>
            </div>
            {loading ? (
              <div className="text-center py-10 text-gray-500">Loading requests...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">{error}</div>
            ) : Object.keys(groupedRequests).length === 0 ? (
              <div className="text-gray-500">No requests found.</div>
            ) : (
              <Tabs defaultValue={Object.keys(groupedRequests)[0]} className="w-full">
                <TabsList className="mb-6 flex flex-wrap gap-2">
                  {Object.keys(groupedRequests).map((type) => (
                    <TabsTrigger key={type} value={type} className="capitalize">
                      {getTypeIcon(type)} {type}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {Object.entries(groupedRequests).map(([type, requests]) => (
                  <TabsContent key={type} value={type}>
                    {requests.length === 0 ? (
                      <div className="text-gray-500">No requests for this type.</div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {requests.map((request) => (
                          <Card key={request.id} className="bg-white/80 shadow-lg rounded-2xl border border-blue-100 hover:shadow-xl hover:scale-[1.01] transition-all duration-200 ring-1 ring-blue-100">
                            <CardContent className="p-4 min-h-[140px]">
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-bold text-base text-blue-900 truncate max-w-[120px]">{request.user?.fullName || "-"}</span>
                                  <Badge variant="outline" className="border-blue-400 text-blue-700 bg-blue-50 font-semibold shadow text-xs">{formatCNIC(request.user?.cnic || "")}</Badge>
                                  <Badge className={getTypeColor(request.type) + " font-semibold shadow bg-blue-50 border-blue-200 text-xs"}>{request.type}</Badge>
                                  <Badge className={
                                    request.status?.toLowerCase() === "pending"
                                      ? "bg-blue-200 text-blue-900 border border-blue-400 font-semibold shadow text-xs"
                                      : request.status === "approved"
                                      ? "bg-green-200 text-green-900 border border-green-400 font-semibold shadow text-xs"
                                      : "bg-red-200 text-red-900 border border-red-400 font-semibold shadow text-xs"
                                  }>{request.status}</Badge>
                                </div>
                                <div className="text-blue-900 italic text-sm font-medium mb-1 truncate max-w-full">{request.reason || request.description}</div>
                                {request.amount && (
                                  <div className="font-bold text-sm text-blue-700 bg-blue-50 rounded px-2 py-1 inline-block border border-blue-200">Need: PKR {request.amount.toLocaleString()}</div>
                                )}
                                <div className="text-xs text-blue-900/70 font-medium flex flex-wrap gap-x-2 gap-y-0.5">
                                  <span><b>ID:</b> {request.id}</span>
                                  <span><b>Status:</b> {request.status}</span>
                                  <span><b>Type:</b> {request.type}</span>
                                  <span><b>Email:</b> {request.user?.email || '-'}</span>
                                  <span><b>Phone:</b> {request.user?.phone || '-'}</span>
                                  <span><b>Address:</b> {request.user?.address || '-'}</span>
                                </div>
                                {/* Image links on next line */}
                                <div className="flex flex-wrap gap-3 mt-1">
                                  {request.image && (
                                    <a
                                      href={request.image.startsWith('/uploads/') ? request.image : `/uploads/${request.image.replace(/^.*[\\/]/, '')}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-700 underline hover:text-blue-900 text-xs"
                                    >
                                      Request Image
                                    </a>
                                  )}
                                  {request.cnic_front && (
                                    <a
                                      href={request.cnic_front.startsWith('/uploads/') ? request.cnic_front : `/uploads/${request.cnic_front.replace(/^.*[\\/]/, '')}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-700 underline hover:text-blue-900 text-xs"
                                    >
                                      CNIC Front
                                    </a>
                                  )}
                                  {request.cnic_back && (
                                    <a
                                      href={request.cnic_back.startsWith('/uploads/') ? request.cnic_back : `/uploads/${request.cnic_back.replace(/^.*[\\/]/, '')}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-700 underline hover:text-blue-900 text-xs"
                                    >
                                      CNIC Back
                                    </a>
                                  )}
                                  {request.document && (
                                    <a
                                      href={request.document.startsWith('/uploads/') ? request.document : `/uploads/${request.document.replace(/^.*[\\/]/, '')}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-700 underline hover:text-blue-900 text-xs"
                                    >
                                      Supporting Document
                                    </a>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {/* Buttons below details */}
                                  {request.status?.toLowerCase() === "pending" && (
                                    <Button size="sm" className="bg-blue-600 text-white font-semibold rounded-md px-4 py-1 shadow hover:bg-blue-700 transition-all" onClick={() => handleAccept(request)}>
                                      Accept
                                    </Button>
                                  )}
                                  {request.status?.toLowerCase() === "pending" && (
                                    <Button size="sm" variant="outline" className="border-blue-400 text-blue-800 font-semibold rounded-md px-4 py-1 shadow hover:bg-blue-100 transition-all" onClick={() => handleForward(request.id)}>
                                      Forward
                                    </Button>
                                  )}
                                  {request.status === "approved" && (
                                    <Button size="sm" className="bg-blue-500 text-white font-semibold rounded-md px-4 py-1 shadow hover:bg-blue-700 transition-all">
                                      Donate
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
    </div>
  );
}

