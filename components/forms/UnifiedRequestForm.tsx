'use client';

import React, { useState, useRef } from 'react';
import axios from 'axios';

export default function UnifiedRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // 🔁 new

  const [formData, setFormData] = useState({
    full_name: '',
    father_name: '',
    cnic_number: '',
    phone_number: '',
    marital_status: '',
    family_count: '',
    adult_member: '',
    matric_member: '',
    home_rent: '',
    fridge: '',
    monthly_income: '',
    type: '',
    description: '',
    reason: '',
    repayment_time: '',
  });

  const [cnicFront, setCnicFront] = useState<File | null>(null);
  const [cnicBack, setCnicBack] = useState<File | null>(null);
  const [document, setDocument] = useState<File | null>(null);

  const cnicFrontRef = useRef<HTMLInputElement>(null);
  const cnicBackRef = useRef<HTMLInputElement>(null);
  const documentRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange =
    (setter: React.Dispatch<React.SetStateAction<File | null>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setter(e.target.files[0]);
      }
    };

  const resetForm = () => {
    setFormData({
      full_name: '',
      father_name: '',
      cnic_number: '',
      phone_number: '',
      marital_status: '',
      family_count: '',
      adult_member: '',
      matric_member: '',
      home_rent: '',
      fridge: '',
      monthly_income: '',
      type: '',
      description: '',
      reason: '',
      repayment_time: '',
    });

    setCnicFront(null);
    setCnicBack(null);
    setDocument(null);

    if (cnicFrontRef.current) cnicFrontRef.current.value = '';
    if (cnicBackRef.current) cnicBackRef.current.value = '';
    if (documentRef.current) documentRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // 🔁 Start loading

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    if (cnicFront) form.append('cnic_front', cnicFront);
    if (cnicBack) form.append('cnic_back', cnicBack);
    if (document) form.append('document', document);

    try {
      await axios.post('/api/requests/submit', form);
      resetForm();

      setTimeout(() => {
        setSubmitted(true); // ✅ Show success card
        setLoading(false);  // 🔁 Stop loading
      }, 1000);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong.');
      setLoading(false);
    }
  };

  // ✅ If submitted, show success card
  if (submitted) {
  return (
    <div className="p-8 bg-gradient-to-r from-green-100 to-green-50 border-l-4 border-green-500 rounded-xl shadow-lg text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-green-500 p-4 rounded-full shadow-md">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-green-800 mb-2">Request Successfully Submitted</h2>
      <p className="text-green-700 text-lg">
        Thank you for your request. It has been received and is currently under review. You’ll hear from us shortly.
      </p>

      <button
        onClick={() => setSubmitted(false)}
        className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-200"
      >
        Submit Another Request
      </button>

      <div className="mt-6 border-t pt-4 text-gray-500 text-sm">
        <p>We're committed to supporting you — submit another request if needed — we are here for your Help</p>
      </div>
    </div>
  );
}

  // 🧾 Main form render
  return (
    <div className="">
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="full_name" placeholder="Full Name" value={formData.full_name} onChange={handleChange} required className="input" />
          <input name="father_name" placeholder="Father Name" value={formData.father_name} onChange={handleChange} required className="input" />
          <input name="cnic_number" placeholder="CNIC Number" value={formData.cnic_number} onChange={handleChange} required className="input" />
          <input name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} required className="input" />
          <select name="marital_status" value={formData.marital_status} onChange={handleChange} required className="input">
            <option value="">Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
          <input name="family_count" placeholder="Family Count" value={formData.family_count} onChange={handleChange} required className="input" />
          <select name="adult_member" value={formData.adult_member} onChange={handleChange} required className="input">
            <option value="">Select 18+ Members</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4+</option>
          </select>
          <input name="matric_member" placeholder="Matric Members" value={formData.matric_member} onChange={handleChange} required className="input" />
          <select name="home_rent" value={formData.home_rent} onChange={handleChange} required className="input">
            <option value="">Is your home on rent?</option>
            <option>Yes</option>
            <option>No</option>
          </select>
          <select name="fridge" value={formData.fridge} onChange={handleChange} required className="input">
            <option value="">Do you have a fridge?</option>
            <option>No</option>
            <option>Yes</option>
          </select>
          <input name="monthly_income" placeholder="Monthly Income" value={formData.monthly_income} onChange={handleChange} required className="input" />
          <select name="type" value={formData.type} onChange={handleChange} required className="input">
            <option value="">Type</option>
            <option value="Loan">Loan</option>
            <option value="Aid">Aid</option>
            <option value="Microfinance">Microfinance</option>
            <option value="Education Support">Education Support</option>
            <option value="Medical Help">Medical Help</option>
            <option value="Marriage Support">Marriage Support</option>
          </select>
        </div>

        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="input w-full" />

        {formData.type === 'Loan' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="reason" placeholder="Loan Reason" value={formData.reason} onChange={handleChange} required className="input" />
            <input name="repayment_time" placeholder="Repayment Time" value={formData.repayment_time} onChange={handleChange} required className="input" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>CNIC Front</label>
            <input ref={cnicFrontRef} type="file" name="cnic_front" accept="image/*" onChange={handleFileChange(setCnicFront)} required />
          </div>
          <div>
            <label>CNIC Back</label>
            <input ref={cnicBackRef} type="file" name="cnic_back" accept="image/*" onChange={handleFileChange(setCnicBack)} required />
          </div>
          <div>
            <label>Supporting Document</label>
            <input ref={documentRef} type="file" name="document" onChange={handleFileChange(setDocument)} required />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white px-4 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}
