"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Heart, Lock } from "lucide-react";
import Link from "next/link";

export default function DonorLoginPage() {
  const router = useRouter();
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/donor/login", { cnic, password });

      if (res.status === 200) {
        router.push("/dashboard/donor");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-blue-100">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center mb-3 shadow-md">
            <Lock className="text-white w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-blue-800">Donor Login</h2>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back to <span className="font-semibold">Khair Welfare</span>
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CNIC <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              placeholder="e.g. 35202-1234567-1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 py-2 px-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center mt-4 text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/donor/signup" className="text-blue-700 hover:underline font-medium">
              Sign up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
