"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface DonorProfile {
  name: string;
  organization_name: string;
  totalAcceptedRequests: number;
  totalDonated: number;
  acceptedRequests: Array<{
    id: number;
    reason: string;
    amount: number;
    status: string;
    submittedAt: string;
  }>;
  donations: Array<{
    id: number;
    requestReason: string;
    amount: number;
    donatedAt: string;
  }>;
}

export default function DonorProfilePage() {
  const [profile, setProfile] = useState<DonorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // TODO: Fetch donor profile data from API
    // Dummy data for structure
    setProfile({
      name: "Ali Raza",
      organization_name: "ABC Foundation",
      totalAcceptedRequests: 5,
      totalDonated: 120000,
      acceptedRequests: [
        { id: 1, reason: "Medical Help", amount: 20000, status: "approved", submittedAt: "2025-07-01" },
        { id: 2, reason: "Education Support", amount: 30000, status: "approved", submittedAt: "2025-07-10" },
      ],
      donations: [
        { id: 1, requestReason: "Medical Help", amount: 20000, donatedAt: "2025-07-02" },
        { id: 2, requestReason: "Education Support", amount: 30000, donatedAt: "2025-07-11" },
      ],
    });
    setLoading(false);
  }, []);

  const handleSignOut = () => {
    // TODO: Sign out logic
    router.push("/");
  };

  if (loading || !profile) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Donor Profile</h1>
            <p className="text-lg text-gray-700 font-semibold">{profile.name}</p>
            <p className="text-md text-gray-500">{profile.organization_name}</p>
          </div>
          <Button variant="destructive" onClick={handleSignOut}>Sign Out</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Requests Accepted</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{profile.totalAcceptedRequests}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Donated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">PKR {profile.totalDonated.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Accepted Requests</h2>
          <div className="space-y-4">
            {profile.acceptedRequests.length === 0 ? (
              <p className="text-gray-500">No accepted requests yet.</p>
            ) : (
              profile.acceptedRequests.map((req) => (
                <div key={req.id} className="border rounded p-4 bg-blue-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-blue-800">{req.reason}</p>
                      <p className="text-gray-600">Amount: PKR {req.amount.toLocaleString()}</p>
                      <p className="text-gray-500 text-sm">Approved: {new Date(req.submittedAt).toLocaleDateString()}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">{req.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-900 mb-4">My Donations</h2>
          <div className="space-y-4">
            {profile.donations.length === 0 ? (
              <p className="text-gray-500">No donations yet.</p>
            ) : (
              profile.donations.map((don) => (
                <div key={don.id} className="border rounded p-4 bg-green-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-green-800">{don.requestReason}</p>
                      <p className="text-gray-600">Amount: PKR {don.amount.toLocaleString()}</p>
                      <p className="text-gray-500 text-sm">Donated: {new Date(don.donatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
