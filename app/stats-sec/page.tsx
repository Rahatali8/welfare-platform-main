'use client';

import React, { useState } from 'react';
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

// Type Definitions
type StatusType = 'Approved' | 'Pending' | 'Rejected';

interface RequestData {
  name: string;
  address: string;
  state: string;
  type: string;
  status: StatusType;
  image: string;
  amountRequested: string;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00C49F', '#FFBB28'];

const requestTypeData = [
  { name: 'Loan', value: 12 },
  { name: 'Aid', value: 8 },
  { name: 'Medical', value: 5 },
  { name: 'Education', value: 6 },
  { name: 'Marriage', value: 4 },
  { name: 'Business', value: 7 },
];

const approvedLoanAmountData = [
  { month: 'Jan', amount: 120000 },
  { month: 'Feb', amount: 95000 },
  { month: 'Mar', amount: 135000 },
  { month: 'Apr', amount: 110000 },
  { month: 'May', amount: 165000 },
  { month: 'Jun', amount: 142000 },
];

const businessDevelopmentData = [
  { month: 'Jan', requests: 2 },
  { month: 'Feb', requests: 3 },
  { month: 'Mar', requests: 1 },
  { month: 'Apr', requests: 4 },
  { month: 'May', requests: 5 },
  { month: 'Jun', requests: 6 },
];

const requestData: RequestData[] = [
  {
    name: 'Lubna Asif',
    address: 'Skardu, Gilgit Baltistan',
    state: 'GB',
    type: 'Marriage Support',
    status: 'Pending',
    image: '/user-female.jpg',
    amountRequested: 'PKR 28,000',
  },
  {
    name: 'Ali Raza',
    address: 'Lyari, Karachi',
    state: 'Sindh',
    type: 'Loan',
    status: 'Approved',
    image: '/user-male.png',
    amountRequested: 'PKR 50,000',
  },
  {
    name: 'Zainab Bibi',
    address: 'Multan, Punjab',
    state: 'Punjab',
    type: 'Medical Support',
    status: 'Pending',
    image: '/user-female.jpg',
    amountRequested: 'PKR 18,000',
  },
  {
    name: 'Ahsan Qureshi',
    address: 'Lahore, Punjab',
    state: 'Punjab',
    type: 'Educational Support',
    status: 'Rejected',
    image: '/user-male.png',
    amountRequested: 'PKR 40,000',
  },
  {
    name: 'Sadia Noor',
    address: 'Peshawar, KPK',
    state: 'KPK',
    type: 'Business Development',
    status: 'Approved',
    image: '/user-female.jpg',
    amountRequested: 'PKR 65,000',
  },
];

const categories = [
  'Loan',
  'Aid',
  'Medical Support',
  'Educational Support',
  'Marriage Support',
  'Business Development',
];

const statusColors: Record<StatusType, string> = {
  Approved: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Rejected: 'bg-red-100 text-red-700',
};

export default function DashboardAnalytics() {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);

  const filteredRequests = requestData.filter((r) =>
    r.type.toLowerCase().includes(selectedCategory.toLowerCase())
  );

  return (
    <div className="space-y-10 p-6">
      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-center">Request Type Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={requestTypeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {requestTypeData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-center">Approved Loan Amount</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={approvedLoanAmountData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#8884d8" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-center">Business Development Requests</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={businessDevelopmentData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="requests"
                stroke="#00C49F"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filter & Request Cards Section */}
      <div className="bg-white shadow rounded-xl p-6">
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

        <h3 className="text-xl font-semibold mb-4 text-center">{selectedCategory} Requests</h3>
        {filteredRequests.length === 0 ? (
          <p className="text-center text-gray-500">No requests found for this category.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRequests.map((req, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl shadow p-4 flex gap-4 items-center"
              >
                <img
                  src={req.image}
                  className="w-16 h-16 rounded-full object-cover"
                  alt={req.name}
                />
                <div>
                  <h4 className="text-lg font-bold">{req.name}</h4>
                  <p className="text-sm text-gray-600">
                    {req.address} – {req.amountRequested}
                  </p>
                  <span
                    className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${
                      statusColors[req.status]
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
