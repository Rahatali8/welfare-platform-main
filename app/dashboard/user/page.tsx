
"use client";

import { useState } from "react";
import { Users, BadgeCheck, Award, HelpCircle } from "lucide-react";

export default function UserDashboard() {
  const [cnic, setCnic] = useState("");
  const [requestData, setRequestData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError("");
    setRequestData(null);
    setLoading(true);
    if (!cnic || cnic.length < 13) {
      setError("Valid CNIC (13 digits) is required.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`/api/user/search?cnic=${cnic}`);
      const data = await res.json();
      if (res.ok && data.requests?.length > 0) {
        setRequestData(data.requests[0]);
      } else {
        setError(data.message || "No record found.");
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pb-10">
      {/* Section: Community Impact */}
      <section className="w-full bg-gradient-to-r from-blue-100 via-white to-cyan-100 py-12 mb-0">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-3 flex items-center gap-2">
              <Users className="w-10 h-10 text-blue-500" />
              Join a Thriving Community
            </h2>
            <p className="text-lg text-blue-800 mb-2">Thousands of users, one mission: helping each other. Every request, every donation, every story matters here.</p>
            <ul className="text-base text-blue-700 list-disc list-inside pl-2">
              <li>Real people, real impact</li>
              <li>Verified stories and transparent process</li>
              <li>Support and hope for all</li>
            </ul>
          </div>
          <div className="flex-1 flex justify-center">
            <img src="/welfare-work.png" alt="Community Impact" className="w-64 h-64 object-cover rounded-2xl shadow-xl border-4 border-blue-200 bg-white" />
          </div>
        </div>
      </section>


      
      {/* Section: Verified & Secure */}
      <section className="w-full bg-gradient-to-r from-yellow-100 via-white to-orange-100 py-12 mb-0">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row-reverse items-center gap-10">
          <div className="flex-1 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-extrabold text-yellow-900 mb-3 flex items-center gap-2">
              <BadgeCheck className="w-10 h-10 text-yellow-600" />
              Verified & Secure
            </h2>
            <p className="text-lg text-yellow-800 mb-2">Every request is checked for authenticity and urgency. Your data and journey are protected with top-tier security.</p>
            <ul className="text-base text-yellow-700 list-disc list-inside pl-2">
              <li>Manual review and phone verification</li>
              <li>End-to-end encrypted data</li>
              <li>Trusted by thousands of families</li>
            </ul>
          </div>
          <div className="flex-1 flex justify-center">
            <img src="/user-male.png" alt="Verified Requests" className="w-64 h-64 object-cover rounded-2xl shadow-xl border-4 border-yellow-200 bg-white" />
          </div>
        </div>
      </section>

 <section className="w-full max-w-6xl mx-auto px-2 py-10">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex-1 flex items-center gap-2">
              <input
                type="text"
                name="cnic"
                value={cnic}
                onChange={e => setCnic(e.target.value)}
                placeholder="Search by CNIC..."
                className="w-full md:w-80 px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 outline-none text-lg bg-blue-50"
                maxLength={13}
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Search
              </button>
            </div>
            {/* Example filter dropdown (not functional, for UI) */}
            <div className="flex items-center gap-2">
              <select className="px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-200">
                <option>All Status</option>
                <option>Approved</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
            </div>
          </form>
          <div className="overflow-x-auto rounded-2xl">
            <table className="min-w-full bg-white rounded-2xl">
              <thead>
                <tr className="bg-blue-50 text-blue-900 text-left text-sm">
                  <th className="py-3 px-4 font-semibold">User ID</th>
                  <th className="py-3 px-4 font-semibold">Customer</th>
                  <th className="py-3 px-4 font-semibold">Address</th>
                  <th className="py-3 px-4 font-semibold">Product</th>
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center">
                      <span className="inline-block animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full"></span>
                    </td>
                  </tr>
                )}
                {error && !loading && (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-red-600 font-semibold">{error}</td>
                  </tr>
                )}
                {requestData && !loading && (
                  <>
                    <tr className="hover:bg-blue-50 transition">
                      <td className="py-4 px-4 font-mono text-blue-900">{requestData.id || requestData.orderId || '—'}</td>
                      <td className="py-4 px-4 flex items-center gap-2">
                        <img
                          src={requestData.gender === 'female' ? '/user-female.jpg' : '/user-male.png'}
                          alt="User"
                          className="w-8 h-8 rounded-full object-cover border-2 border-blue-200 shadow"
                        />
                        <span className="font-semibold text-blue-900">{requestData.full_name || requestData.name}</span>
                      </td>
                      <td className="py-4 px-4 text-blue-800">{requestData.city || requestData.address || '—'}</td>
                      <td className="py-4 px-4 text-blue-800">{requestData.type || requestData.product || '—'}</td>
                      <td className="py-4 px-4 text-blue-800">{requestData.created_at ? new Date(requestData.created_at).toLocaleDateString() : (requestData.date || '—')}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-md ${((requestData.status || '').toLowerCase() === 'approved') ? 'bg-green-100 text-green-700' : ((requestData.status || '').toLowerCase() === 'pending') ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{requestData.status}</span>
                      </td>
                    </tr>
                    {((requestData.status || '').toLowerCase() === 'rejected') && requestData.rejection_reason && (
                      <tr>
                        <td colSpan={6} className="py-4 px-4">
                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                            <div className="font-semibold mb-1">Rejection Reason</div>
                            <div>{requestData.rejection_reason}</div>
                            {requestData.updated_at && (
                              <div className="text-xs text-red-700 mt-1">Rejected on: {new Date(requestData.updated_at).toLocaleString()}</div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                )}
                {!loading && !requestData && !error && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">No requests found. Please search by CNIC.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section: VIP Experience */}
      <section className="w-full bg-gradient-to-r from-pink-100 via-white to-fuchsia-100 py-12 mb-0">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-extrabold text-pink-900 mb-3 flex items-center gap-2">
              <Award className="w-10 h-10 text-pink-500" />
              VIP Experience
            </h2>
            <p className="text-lg text-pink-800 mb-2">A modern, fast, and beautiful way to check your status. Designed for ease, clarity, and a touch of luxury.</p>
            <ul className="text-base text-pink-700 list-disc list-inside pl-2">
              <li>Instant results, no login needed</li>
              <li>Mobile-friendly and accessible</li>
              <li>24/7 support and guidance</li>
            </ul>
          </div>
          <div className="flex-1 flex justify-center">
            <img src="/user-female.jpg" alt="VIP Experience" className="w-64 h-64 object-cover rounded-2xl shadow-xl border-4 border-pink-200 bg-white" />
          </div>
        </div>
      </section>

      {/* Request Status Table Section */}
     
      {/* Info/FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 mb-12 mt-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Card 1: Need Help? */}
          <div className="flex-1 bg-gradient-to-br from-cyan-100 via-white to-blue-100 rounded-2xl shadow-xl p-6 md:p-8 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-blue-900 mb-2 flex items-center gap-2"><HelpCircle className="w-6 h-6 text-cyan-500" /> Need Help?</h2>
            <ul className="text-gray-700 text-base space-y-2 pl-2">
              <li><span className="font-semibold text-blue-700">•</span> Enter your 13-digit CNIC to instantly check your latest request status.</li>
              <li><span className="font-semibold text-blue-700">•</span> No login or signup required—just pure convenience.</li>
              <li><span className="font-semibold text-blue-700">•</span> All data is secure and private, visible only to you.</li>
              <li><span className="font-semibold text-blue-700">•</span> For any issues, contact our support team at <a href="mailto:support@khairwelfare.org" className="underline text-cyan-700">support@khairwelfare.org</a></li>
            </ul>
          </div>
          {/* Card 2: How to Use */}
          <div className="flex-1 bg-gradient-to-br from-blue-100 via-white to-cyan-100 rounded-2xl shadow-xl p-6 md:p-8 flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-blue-900 mb-2 flex items-center gap-2"><span className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center mr-1">?</span> How to Use</h2>
            <ol className="list-decimal list-inside text-gray-700 text-base space-y-2 pl-2">
              <li>Type your 13-digit CNIC number in the search box above.</li>
              <li>Click the <span className="font-semibold text-blue-700">Search</span> button.</li>
              <li>See your latest request status instantly in the table.</li>
              <li>If you need more help, contact our support team.</li>
            </ol>
            <a href="mailto:support@khairwelfare.org" className="mt-2 inline-block px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-center w-fit">Contact Support</a>
          </div>
        </div>
      </section>
      <footer className="text-center text-gray-400 text-xs pb-4">Powered by <span className="font-bold text-blue-700">Al-Khair Welfare Platform</span> — Making a difference, one request at a time.</footer>
    </div>
  );
}
