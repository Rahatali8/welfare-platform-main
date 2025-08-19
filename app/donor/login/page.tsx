"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
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
      const res = await axios.post("/api/donor/login", {
        cnic,
        password,
        securityQuestion,
        securityAnswer,
      });
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
      {/* ================= Top Banner ================= */}
      <div className="w-full max-w-6xl p-8 bg-gradient-to-r from-blue-700 to-cyan-500 rounded-3xl text-white shadow-xl text-center animate-fadeIn">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">Support Khair Welfare</h1>
        <p className="text-white/90 text-lg md:text-xl mb-4 max-w-3xl mx-auto leading-relaxed">
          Become a donor and help provide education, healthcare, and essential support
          to families in need. Together, we can bring hope and lasting change.
        </p>
      </div>

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl border border-blue-100 flex flex-col md:flex-row overflow-hidden">

        <div className="relative md:w-1/2 h-80 md:h-auto group overflow-hidden">
          {/* Image with blur effect on hover */}
          <img
            src="/hero1.jpg"
            alt="Welfare Support"
            className="w-full h-full object-cover transition duration-700 ease-in-out group-hover:blur-sm"
          />

          {/* Hidden Text Card that slides up on hover */}
          <div className="absolute bottom-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-lg p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out">
            <h2 className="text-2xl font-bold text-blue-700">Donor Login</h2>
            <p className="mt-2 text-gray-700">
              Welcome back to <span className="font-semibold">Himayyat by Idara Al-Khair Welfare</span>.
              Your one act of kindness can bring hope, light, and a new life to someone in need.
              It is in the small gestures of care that hearts find peace, families regain strength,
              and dreams begin to bloom again. By standing together in compassion, we turn pain into
              resilience and despair into hope, building a future where every life shines with dignity and possibility.
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <form
          onSubmit={handleLogin}
          className="md:w-1/2 flex flex-col justify-center p-10 space-y-5 bg-white"
        >
          {/* CNIC */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              CNIC <span className="text-red-500">*</span>
            </label>
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Security Question <span className="text-red-500">*</span>
            </label>
            <select
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Security Answer <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
              placeholder="One word only"
              pattern="^\w+$"
              title="Please enter only one word (letters or numbers, no spaces)"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
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
            className={`w-full bg-gradient-to-r from-blue-700 to-cyan-500 hover:from-cyan-500 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/donor/signup" className="text-blue-700 hover:underline font-semibold">
              Sign up here
            </Link>
          </p>
        </form>
      </div>

      {/* ================= Bottom Section ================= */}
      <div className="w-full max-w-6xl p-8 bg-gradient-to-r from-cyan-500 to-blue-700 rounded-3xl text-white shadow-xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Your Support Matters</h2>
        <p className="text-white/90 mb-4 text-lg max-w-3xl mx-auto">
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
