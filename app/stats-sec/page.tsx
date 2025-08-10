'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Users, Home, BookOpen } from 'lucide-react';
import {
  BarChart as DayBarChart,
  Bar as DayBar,
  XAxis as DayXAxis,
  YAxis as DayYAxis,
  Tooltip as DayTooltip,
  ResponsiveContainer as DayResponsiveContainer,
  Legend as DayLegend,
  LineChart as SignupLineChart,
  Line as SignupLine
} from 'recharts';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';




const COLORS = ['#38bdf8', '#06b6d4', '#fbbf24', '#f472b6', '#a3e635', '#f87171'];

const statusColors: Record<string, string> = {
  approved: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  rejected: 'bg-red-100 text-red-700',
};

export default function DashboardAnalytics() {
  const [dailyRequests, setDailyRequests] = useState<{date: string, count: number}[]>([]);
  const [dailyByType, setDailyByType] = useState<any[]>([]);
  const [requestTypes, setRequestTypes] = useState<string[]>([]);
  const [signupsDaily, setSignupsDaily] = useState<{date: string, count: number}[]>([]);
  useEffect(() => {
    async function fetchDaily() {
      const res = await fetch('/api/stats/requests-daily');
      const data = await res.json();
      setDailyRequests(data.daily || []);
      setDailyByType(data.dailyByType || []);
      setRequestTypes(data.types || []);
    }
    fetchDaily();
    const interval = setInterval(fetchDaily, 10000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    async function fetchSignups() {
      const res = await fetch('/api/stats/signups-daily');
      const data = await res.json();
      setSignupsDaily(data.daily || []);
    }
    fetchSignups();
    const interval = setInterval(fetchSignups, 10000);
    return () => clearInterval(interval);
  }, []);

  const [requests, setRequests] = useState<any>({ total: 0, weekly: [], byType: [], latest: [] });
  const [signups, setSignups] = useState<any>({ total: 0, weekly: [] });
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const reqRes = await fetch('/api/stats/requests-full').then(r => r.json());
      const signRes = await fetch('/api/stats/signups').then(r => r.json());
      setRequests(reqRes);
      setSignups(signRes);
      setCategories(reqRes.byType.map((t: any) => t.name));
      setSelectedCategory(reqRes.byType[0]?.name || '');
      setLoading(false);
    }
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredRequests = requests.latest.filter((r: any) =>
    r.type === selectedCategory
  );


  if (loading) return <div className="text-center py-12">Loading stats...</div>;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-b-3xl shadow-xl mb-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-600 opacity-80 z-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-white space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
              <span className="bg-gradient-to-r from-yellow-300 via-white to-blue-200 bg-clip-text text-transparent">Live Welfare Platform</span>
              <br />
              <span className="text-white">Stats & Analytics Dashboard</span>
            </h1>
            <p className="text-lg md:text-2xl font-medium opacity-90 max-w-2xl">
              Get real-time insights into all welfare requests, user signups, and platform activity. Visualize trends, monitor impact, and make data-driven decisions for a better tomorrow.
            </p>
            <div className="flex gap-4 mt-4">
              <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-base font-semibold shadow text-white border border-white/30">Auto-updating Live Data</span>
              <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-base font-semibold shadow text-white border border-white/30">VIP Analytics</span>
            </div>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img src="/welfare-work.png" alt="Welfare Analytics" className="w-[340px] h-[340px] object-cover rounded-3xl shadow-2xl border-4 border-white/30 bg-white/10" />
          </div>
        </div>
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[120vw] h-40 bg-gradient-to-t from-blue-100/60 to-transparent rounded-b-3xl z-0" />
      </section>

      {/* Intro Section */}
      <section className="max-w-4xl mx-auto px-4 mb-10">
        <div className="bg-white/80 rounded-2xl shadow p-6 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-2">Welcome to the Welfare Platform Analytics</h2>
          <p className="text-gray-700 text-lg mb-2">Track every request, every user, and every impact—live and in detail. Our dashboard empowers you to see the real difference your organization is making, with beautiful charts and up-to-the-minute data.</p>
          <p className="text-blue-700 font-semibold">All stats update automatically. No refresh needed!</p>
        </div>
      </section>
  {/* Chart Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
    {/* Day-wise Request Type Distribution (Stacked Bar) */}
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4 text-center">Request Type Distribution (Day-wise)</h2>
      <DayResponsiveContainer width="100%" height={250}>
        <DayBarChart data={dailyByType.map(row => {
          // flatten types array to keys
          const out: any = { date: row.date };
          row.types.forEach((t: any) => { out[t.type] = t.count });
          return out;
        })}>
          <DayXAxis dataKey="date" tick={{fontSize: 12}}/>
          <DayYAxis allowDecimals={false} />
          <DayTooltip />
          <DayLegend />
          {requestTypes.map((type, idx) => (
            <DayBar key={type} dataKey={type} stackId="a" fill={COLORS[idx % COLORS.length]} />
          ))}
        </DayBarChart>
      </DayResponsiveContainer>
    </div>
    {/* Day-wise Requests Bar Chart */}
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4 text-center">Requests per Day (Last 14 Days)</h2>
      <DayResponsiveContainer width="100%" height={250}>
        <DayBarChart data={dailyRequests}>
          <DayXAxis dataKey="date" tick={{fontSize: 12}}/>
          <DayYAxis allowDecimals={false} />
          <DayTooltip />
          <DayBar dataKey="count" fill="#38bdf8" radius={[10, 10, 0, 0]} />
        </DayBarChart>
      </DayResponsiveContainer>
    </div>
    {/* Day-wise User Signups Line Chart */}
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-lg font-semibold mb-4 text-center">User Signups per Day</h2>
      <DayResponsiveContainer width="100%" height={250}>
        <SignupLineChart data={signupsDaily}>
          <DayXAxis dataKey="date" tick={{fontSize: 12}}/>
          <DayYAxis allowDecimals={false} />
          <DayTooltip />
          <DayLegend />
          <SignupLine type="monotone" dataKey="count" stroke="#06b6d4" strokeWidth={3} dot={{ r: 5 }} />
        </SignupLineChart>
      </DayResponsiveContainer>
    </div>
      </div>

  {/* Filter & Request Cards Section */}
  <div className="bg-white/90 shadow-xl rounded-2xl p-8 max-w-7xl mx-auto mt-10">
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full border transition ${
                selectedCategory === cat
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

  <h3 className="text-2xl font-bold mb-6 text-center text-blue-900 tracking-wide drop-shadow">{selectedCategory} Requests</h3>
        {filteredRequests.length === 0 ? (
          <p className="text-center text-gray-500">No requests found for this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredRequests.map((req: any, index: number) => {
              const genderImg = req.gender === 'female' ? '/user-female.jpg' : '/user-male.png';
              return (
                <div
                  key={index}
                  className="flex items-center gap-5 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative">
                    <img
                      src={genderImg}
                      className="w-16 h-16 rounded-full object-cover border-4 border-blue-200 group-hover:scale-105 transition-transform bg-white"
                      alt={req.full_name || 'User'}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-extrabold text-blue-900 truncate flex items-center gap-2">
                      <Users className="inline w-5 h-5 text-blue-400" /> {req.full_name}
                    </h4>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-1 mb-1">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{req.user?.city || 'No city'}</span>
                      <span className="flex items-center gap-1"><Phone className="w-4 h-4" />{req.user?.phone || 'No phone'}</span>
                      {req.material && <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{req.material}</span>}
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {req.user?.address || 'No address'} <span className="font-semibold text-blue-700">– PKR {req.monthly_income?.toLocaleString?.() ?? req.monthly_income}</span>
                    </p>
                    <span
                      className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-semibold shadow ${
                        statusColors[req.status?.toLowerCase?.() || 'pending']
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
      {/* Platform Highlights Cards Section */}
      <div className="max-w-7xl mx-auto px-4 mt-16 mb-10 ml-10 mr-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-blue-900 mb-8 text-center tracking-wide drop-shadow">Platform Highlights</h2>
        <div
          className="grid grid-cols-3 gap-6 auto-rows-[minmax(140px,auto)]"
          style={{ gridAutoFlow: 'dense' }}
        >
          {/* Card 1 */}
          <div className="col-span-2 row-span-1 bg-gradient-to-br from-blue-100 via-white to-cyan-100 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border-t-4 border-blue-400 hover:scale-105 transition-transform min-h-[140px]">
            <Users className="w-10 h-10 text-blue-500 mb-2" />
            <h3 className="font-bold text-lg text-blue-900 mb-1">Thousands of Users</h3>
            <p className="text-gray-700 text-sm">Join a growing community making a real impact every day.</p>
          </div>
          {/* Card 2 */}
          <div className="col-span-1 row-span-2 bg-gradient-to-br from-yellow-100 via-white to-orange-100 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border-t-4 border-yellow-400 hover:scale-105 transition-transform min-h-[220px]">
            <BookOpen className="w-10 h-10 text-yellow-600 mb-2" />
            <h3 className="font-bold text-lg text-yellow-900 mb-1">Diverse Requests</h3>
            <p className="text-gray-700 text-sm">Support for food, education, health, and more—tailored to real needs.</p>
          </div>
          {/* Card 3 */}
          <div className="col-span-1 row-span-1 bg-gradient-to-br from-pink-100 via-white to-fuchsia-100 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border-t-4 border-pink-400 hover:scale-105 transition-transform min-h-[140px]">
            <Home className="w-10 h-10 text-pink-500 mb-2" />
            <h3 className="font-bold text-lg text-pink-900 mb-1">Nationwide Reach</h3>
            <p className="text-gray-700 text-sm">Connecting donors and recipients across all major cities in Pakistan.</p>
          </div>
          {/* Card 4 */}
          <div className="col-span-2 row-span-1 bg-gradient-to-br from-green-100 via-white to-lime-100 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border-t-4 border-green-400 hover:scale-105 transition-transform min-h-[140px]">
            <svg className="w-10 h-10 text-green-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h3 className="font-bold text-lg text-green-900 mb-1">Live Analytics</h3>
            <p className="text-gray-700 text-sm">Real-time stats, trends, and insights—always up to date, always transparent.</p>
          </div>
          {/* Card 5 */}
          <div className="col-span-1 row-span-1 bg-gradient-to-br from-purple-100 via-white to-indigo-100 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border-t-4 border-purple-400 hover:scale-105 transition-transform min-h-[140px]">
            <svg className="w-10 h-10 text-purple-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h3 className="font-bold text-lg text-purple-900 mb-1">Verified Requests</h3>
            <p className="text-gray-700 text-sm">Every request is checked for authenticity and urgency before approval.</p>
          </div>
          {/* Card 6 */}
          <div className="col-span-2 row-span-1 bg-gradient-to-br from-red-100 via-white to-orange-100 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border-t-4 border-red-400 hover:scale-105 transition-transform min-h-[140px]">
            <svg className="w-10 h-10 text-red-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <h3 className="font-bold text-lg text-red-900 mb-1">Instant Notifications</h3>
            <p className="text-gray-700 text-sm">Stay updated with every new request, approval, and donation in real time.</p>
          </div>
          {/* Card 7 */}
          <div className="col-span-1 row-span-2 bg-gradient-to-br from-cyan-100 via-white to-blue-100 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border-t-4 border-cyan-400 hover:scale-105 transition-transform min-h-[220px]">
            <svg className="w-10 h-10 text-cyan-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2z" /></svg>
            <h3 className="font-bold text-lg text-cyan-900 mb-1">Secure & Private</h3>
            <p className="text-gray-700 text-sm">Your data and donations are protected with top-tier security and privacy.</p>
          </div>
          {/* Card 8 */}
          <div className="col-span-1 row-span-1 bg-gradient-to-br from-gray-100 via-white to-blue-50 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border-t-4 border-gray-400 hover:scale-105 transition-transform min-h-[140px]">
            <svg className="w-10 h-10 text-gray-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 10c-4.418 0-8-1.79-8-4V7a4 4 0 014-4h8a4 4 0 014 4v7c0 2.21-3.582 4-8 4z" /></svg>
            <h3 className="font-bold text-lg text-gray-900 mb-1">Community Driven</h3>
            <p className="text-gray-700 text-sm">Built for the people, by the people—your feedback shapes our future.</p>
          </div>
        </div>
      </div>
    </>
  );
}
