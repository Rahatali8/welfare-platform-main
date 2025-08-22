'use client';

import React, { useState, useRef } from 'react';
import axios from 'axios';

export default function UnifiedRequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

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
        setSubmitted(true);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong.');
      setLoading(false);
    }
  };

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
          Thank you for your request. It has been received and is currently under review.
        </p>

        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-200 shadow-lg"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

 return (
  <div className="max-w-4xl mx-auto p-6 sm:p-10 bg-white rounded-3xl shadow-xl border border-gray-200">
    <h2 className="text-3xl font-extrabold text-[#1B0073] mb-6 text-center">Submit Your Request</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: 'full_name', placeholder: 'Full Name', type: 'text' },
          { name: 'father_name', placeholder: 'Father Name', type: 'text' },
          {
            name: 'cnic_number',
            placeholder: 'CNIC Number must be 13 digits',
            type: 'text',
            title: 'CNIC must be in the format ',
          },
          {
            name: 'phone_number',
            placeholder: 'Phone Number must be 11 digits',
            type: 'tel',
            title: 'Phone number must be 11 digits and start with 03',
          },
          { name: 'family_count', placeholder: 'Family Count', type: 'number' },
          { name: 'matric_member', placeholder: 'Matric Members', type: 'number' },
          { name: 'monthly_income', placeholder: 'Monthly Income', type: 'text' },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            value={formData[field.name as keyof typeof formData]}
            onChange={handleChange}
            required
            placeholder={field.placeholder}
            title={field.title}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A5E0] focus:border-transparent transition"
          />
        ))}

        {/* Selects */}
        <select
          name="marital_status"
          value={formData.marital_status}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A5E0] focus:border-transparent transition"
        >
          <option value="" disabled>
            Marital Status
          </option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
        </select>

        <input
          type="number"
          name="adult_member"
          value={formData.adult_member}
          onChange={handleChange}
          required
          placeholder="18+ Members"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A5E0] focus:border-transparent transition"
        />

        <select
          name="home_rent"
          value={formData.home_rent}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A5E0] focus:border-transparent transition"
        >
          <option value="" disabled>
            Is your home on rent?
          </option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <select
          name="fridge"
          value={formData.fridge}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A5E0] focus:border-transparent transition"
        >
          <option value="" disabled>
            Do you have a fridge?
          </option>
          <option>No</option>
          <option>Yes</option>
        </select>

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A5E0] focus:border-transparent transition"
        >
          <option value="" disabled>
            Assistance Type
          </option>
          <option value="Loan">Loan</option>
          <option value="Aid">Aid</option>
          <option value="Microfinance">Microfinance</option>
          <option value="Education Support">Education Support</option>
          <option value="Medical Help">Medical Help</option>
          <option value="Marriage Support">Marriage Support</option>
        </select>
      </div>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        placeholder="Brief Description of Your Situation"
        className="w-full rounded-xl border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A5E0] focus:border-transparent transition resize-none"
      />

      {formData.type === 'Loan' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="reason"
            placeholder="Reason for Loan"
            value={formData.reason}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A5E0] focus:border-transparent transition"
          />
          <input
            name="repayment_time"
            placeholder="Repayment Time (e.g., 6 months)"
            value={formData.repayment_time}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A5E0] focus:border-transparent transition"
          />
        </div>
      )}

      {/* File Uploads */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-2 text-gray-700 font-medium">CNIC Front</label>
          <input
            ref={cnicFrontRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange(setCnicFront)}
            className="w-full text-sm text-gray-600"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-medium">CNIC Back</label>
          <input
            ref={cnicBackRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange(setCnicBack)}
            className="w-full text-sm text-gray-600"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-gray-700 font-medium">Upload Applicant Image</label>
          <input
            ref={documentRef}
            type="file"
            onChange={handleFileChange(setDocument)}
            className="w-full text-sm text-gray-600"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-gradient-to-r from-[#1B0073] to-[#00A5E0] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
    </div>
  );
}
