'use client';
import React, { useState } from 'react';
import UnifiedRequestForm from '@/components/forms/UnifiedRequestForm';
// import other forms as needed

const FORM_TYPES = [
  { label: 'Loan', value: 'loan' },
  { label: 'Aid', value: 'aid' },
  { label: 'Microfinance', value: 'microfinance' },
  { label: 'Education Support', value: 'education' },
  { label: 'Medical Help', value: 'medical' },
  { label: 'Marriage Support', value: 'marriage' },
];

export default function ApplyFormPage() {
  const [activeForm, setActiveForm] = useState('loan');

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Submit Your Request</h1>

      <div className="flex flex-wrap gap-2 justify-center mb-8 border-b pb-3">
        {FORM_TYPES.map((form) => (
          <button
            key={form.value}
            onClick={() => setActiveForm(form.value)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition 
              ${
                activeForm === form.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {form.label}
          </button>
        ))}
      </div>

      <div className="bg-white shadow-md rounded-md p-6">
        {activeForm === 'loan' && <UnifiedRequestForm />}
        {/* Add other form components here similarly */}
      </div>
    </div>
  );
}
