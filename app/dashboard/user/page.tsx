"use client";

import { useState } from "react";

export default function UserDashboard() {
  const [cnic, setCnic] = useState("");
  const [requestData, setRequestData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setError("");
    setRequestData(null);

    if (!cnic || cnic.length < 13) {
      setError("Valid CNIC enter karo (13 digits)");
      return;
    }

    try {
      const res = await fetch(`/api/user/search?cnic=${cnic}`);
      const data = await res.json();

      if (res.ok && data.requests?.length > 0) {
        setRequestData(data.requests[0]); // latest request
      } else {
        setError(data.message || "Koi record nahi mila.");
      }
    } catch (err) {
      setError("Error searching CNIC.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter CNIC e.g. 35202..."
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {requestData && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <h2 className="text-xl font-medium mb-2">Latest Request</h2>
          <p><strong>Full Name:</strong> {requestData.full_name}</p>
          <p><strong>CNIC:</strong> {requestData.cnic_number}</p>
          <p><strong>Type:</strong> {requestData.type}</p>
          <p><strong>Status:</strong> {requestData.status}</p>
          <p><strong>Submitted At:</strong> {new Date(requestData.created_at).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
