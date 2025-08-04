'use client';
import { useState } from 'react';
import axios from 'axios';

export default function LoanForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    cnic: '',
    phone: '',
    income: '',
    loanAmount: '',
    reason: '',
  });

  const [cnicFront, setCnicFront] = useState<File | null>(null);
  const [cnicBack, setCnicBack] = useState<File | null>(null);
  const [document, setDocument] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    if (cnicFront) form.append('cnicFront', cnicFront);
    if (cnicBack) form.append('cnicBack', cnicBack);
    if (document) form.append('document', document);

    try {
      const res = await axios.post('/api/requests/submit', form);
      alert('Form submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div>
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>
          <div>
            <label className="block font-medium">CNIC Number</label>
            <input
              type="text"
              name="cnic"
              value={formData.cnic}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              placeholder="XXXXX-XXXXXXX-X"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Financial Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Monthly Income</label>
            <input
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Loan Amount Required</label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block font-medium">Reason for Loan</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            rows={3}
            required
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Upload Applier Image</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">CNIC Front Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCnicFront(e.target.files?.[0] || null)}
              className="w-full border px-3 py-2 mt-1"
              required
            />
          </div>
          <div>
            <label className="block font-medium">CNIC Back Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCnicBack(e.target.files?.[0] || null)}
              className="w-full border px-3 py-2 mt-1"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Supporting Document</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,image/*"
              onChange={(e) => setDocument(e.target.files?.[0] || null)}
              className="w-full border px-3 py-2 mt-1"
            />
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Loan Application
        </button>
      </div>
    </form>
  );
}
