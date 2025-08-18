'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Lock } from "lucide-react";
import Link from "next/link";

export default function DonorLoginPage() {
  const router = useRouter();
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/donor/login", { cnic, password, securityQuestion, securityAnswer });
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-10 flex flex-col items-center gap-10">

      {/* ================= Top Motivational Section ================= */}
      <div className="w-full max-w-5xl p-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl text-white shadow-lg text-center animate-fadeIn">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Support Khair Welfare</h1>
        <p className="text-white/90 text-lg md:text-xl mb-4">
          Become a donor and help provide education, healthcare, and essential support to families in need.
        </p>
        <ul className="text-left max-w-2xl mx-auto space-y-2 list-disc list-inside text-white/90">
          <li>Your contribution directly impacts communities.</li>
          <li>Secure and transparent donation process.</li>
          <li>Join hundreds of donors making a real difference.</li>
        </ul>
      </div>

      {/* ================= Middle Form Section ================= */}
      <div className="w-full max-w-5xl p-8 bg-white rounded-3xl shadow-2xl border border-blue-100 hover:shadow-3xl transition-shadow duration-500 flex flex-col md:flex-row gap-6">
        
        {/* Left Info Panel */}
        <div className="md:w-1/2 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-700 to-cyan-500 rounded-2xl text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Lock className="text-white w-7 h-7" />
          </div>
          <h2 className="text-3xl font-extrabold text-white text-center">Donor Login</h2>
          <p className="text-white/80 text-center mt-2 text-sm">
            Welcome back to <span className="font-semibold">Khair Welfare</span>
          </p>
        </div>

        {/* Right Form Panel */}
        <form onSubmit={handleLogin} className="md:w-1/2 flex flex-col justify-center space-y-4">
          {/* CNIC */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CNIC <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              placeholder="e.g. 35202-1234567-1"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              required
            />
          </div>

          {/* Security Question */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Security Question <span className="text-red-500">*</span></label>
            <select
              value={securityQuestion}
              onChange={e => setSecurityQuestion(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            >
              <option value="">Select a question</option>
              <option value="donation-city">In which city did you make your first donation?</option>
              <option value="primary-school">What is your primary school name?</option>
              <option value="fav-organization">What is your favorite Organization?</option>
            </select>
          </div>

          {/* Security Answer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Security Answer <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              placeholder="One word answer only"
              pattern="^\w+$"
              title="Please enter only one word (letters or numbers, no spaces)"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password <span className="text-red-500">*</span></label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              required
            />
          </div>

          {/* Error */}
          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 py-2 px-3 rounded-xl border border-red-200 shadow-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-700 to-cyan-500 hover:from-cyan-500 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center mt-2 text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/donor/signup" className="text-blue-700 hover:underline font-medium">
              Sign up here
            </Link>
          </div>
        </form>
      </div>

      {/* ================= Bottom Encouragement Section ================= */}
      <div className="w-full max-w-5xl p-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl text-white shadow-lg text-center animate-fadeIn">
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">Why Your Support Matters</h2>
        <p className="text-white/90 mb-4 text-lg">
          Every donation helps us deliver education, health services, and basic necessities to those who need it most.
        </p>
        <ul className="text-left max-w-2xl mx-auto space-y-2 list-disc list-inside text-white/90">
          <li>Help provide meals and healthcare for families.</li>
          <li>Support children’s education and school supplies.</li>
          <li>Empower communities through sustainable programs.</li>
        </ul>
      </div>
    </div>
  );
}
