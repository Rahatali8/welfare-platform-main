
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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

  function handleAccept(id: string) {
    // TODO: Implement accept logic
    alert(`Accepted request ${id}`);
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
    <div className="min-h-screen bg-gray-50">
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
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main dashboard content */}
          <div className="flex-1">
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
                  <TabsContent key={type} value={type} className="space-y-4">
                    {requests.length === 0 ? (
                      <div className="text-gray-500">No requests for this type.</div>
                    ) : requests.map((request) => (
                      <Card key={request.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold text-lg">{request.user?.fullName || "-"}</span>
                                <div className="flex gap-1">
                                  <Badge variant="outline">{formatCNIC(request.user?.cnic || "")}</Badge>
                                  <Badge className={getTypeColor(request.type)}>{request.type}</Badge>
                                  <Badge className={
                                    request.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : request.status === "approved"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }>{request.status}</Badge>
                                </div>
                              </div>
                              <div className="mb-2 text-gray-700">{request.reason || request.description}</div>
                              {request.amount && (
                                <div className="font-semibold text-blue-700">Need: PKR {request.amount.toLocaleString()}</div>
                              )}
                              {/* Show all available details */}
                              <div className="text-xs text-gray-500 mt-2">
                                <div><b>Request ID:</b> {request.id}</div>
                                <div><b>Status:</b> {request.status}</div>
                                <div><b>Type:</b> {request.type}</div>
                                <div><b>User Email:</b> {request.user?.email || '-'}</div>
                                <div><b>User Phone:</b> {request.user?.phone || '-'}</div>
                                <div><b>User Address:</b> {request.user?.address || '-'}</div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2 min-w-[180px] items-end">
                              {/* Show user-submitted images: request image, cnic front, cnic back, with labels */}
                              {request.image && (
                                <div className="mb-2 w-full flex flex-col items-end">
                                  <span className="text-xs text-gray-500 mb-1">Request Image</span>
                                  <img
                                    src={request.image.startsWith("/uploads/") ? request.image : `/uploads/${request.image.replace(/^.*[\\/]/, '')}`}
                                    alt="Request Image"
                                    className="rounded-md max-h-24 border object-contain"
                                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                  />
                                </div>
                              )}
                              {(request.cnic_front || request.cnic_back) && (
                                <div className="mb-2 w-full flex flex-row gap-2 items-end justify-end">
                                  {request.cnic_front && (
                                    <div className="flex flex-col items-center">
                                      <span className="text-xs text-gray-500 mb-1">CNIC Front</span>
                                      <img
                                        src={request.cnic_front.startsWith("/uploads/") ? request.cnic_front : `/uploads/${request.cnic_front.replace(/^.*[\\/]/, '')}`}
                                        alt="CNIC Front"
                                        className="rounded-md max-h-24 border object-contain"
                                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                      />
                                    </div>
                                  )}
                                  {request.cnic_back && (
                                    <div className="flex flex-col items-center">
                                      <span className="text-xs text-gray-500 mb-1">CNIC Back</span>
                                      <img
                                        src={request.cnic_back.startsWith("/uploads/") ? request.cnic_back : `/uploads/${request.cnic_back.replace(/^.*[\\/]/, '')}`}
                                        alt="CNIC Back"
                                        className="rounded-md max-h-24 border object-contain"
                                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                              {request.document && (
                                <div className="mb-2 w-full flex flex-col items-end">
                                  <span className="text-xs text-gray-500 mb-1">Supporting Document</span>
                                  <img
                                    src={request.document.startsWith("/uploads/") ? request.document : `/uploads/${request.document.replace(/^.*[\\/]/, '')}`}
                                    alt="Supporting Document"
                                    className="rounded-md max-h-24 border object-contain"
                                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                  />
                                </div>
                              )}
                              {request.status === "pending" && (
                                <>
                                  <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleAccept(request.id)}>
                                    Accept
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => handleForward(request.id)}>
                                    Forward to Admin
                                  </Button>
                                </>
                              )}
                              {request.status === "approved" && (
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                  Donate
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>
          {/* Donor profile card on right */}
          <aside className="w-full md:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 sticky top-28">
              <div className="flex flex-col items-center">
                {profileLoading ? (
                  <div className="py-10">Loading profile...</div>
                ) : !donor ? (
                  <div className="text-red-500">Profile not found</div>
                ) : (
                  <>
                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-2 overflow-hidden">
                      <span className="text-4xl font-bold text-blue-600">{donor.name?.charAt(0) || "D"}</span>
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
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

