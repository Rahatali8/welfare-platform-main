// components/forms/LoanForm.tsx

'use client';
import { useState } from 'react';

export default function LoanForm() {
  const [form, setForm] = useState({
    fullName: '',
    fatherName: '',
    cnicNumber: '',
    maritalStatus: '',
    familyCount: '',
    adultMember: '',
    matricMember: '',
    homeRent: '',
    fridge: '',
    monthlyIncome: '',
    type: 'loan',
    description: '',
    reason: '',
    repaymentTime: '',
    phone: '',
  });

  const [cnicFront, setCnicFront] = useState<File | null>(null);
  const [cnicBack, setCnicBack] = useState<File | null>(null);
  const [document, setDocument] = useState<File | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (cnicFront) formData.append('cnicFront', cnicFront);
    if (cnicBack) formData.append('cnicBack', cnicBack);
    if (document) formData.append('document', document);

    const res = await fetch('/api/requests/submit', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="fullName" placeholder="Full Name" onChange={handleChange} />
      <input name="fatherName" placeholder="Father Name" onChange={handleChange} />
      <input name="cnicNumber" placeholder="CNIC Number" onChange={handleChange} />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
      <input name="maritalStatus" placeholder="Marital Status" onChange={handleChange} />
      <input name="familyCount" placeholder="Family Members" onChange={handleChange} />
      <input name="adultMember" placeholder="18+ Members" onChange={handleChange} />
      <input name="matricMember" placeholder="Matric Passed" onChange={handleChange} />
      <input name="homeRent" placeholder="Home Rent (yes/no)" onChange={handleChange} />
      <input name="fridge" placeholder="Fridge (yes/no)" onChange={handleChange} />
      <input name="monthlyIncome" placeholder="Monthly Income" onChange={handleChange} />
      <input name="reason" placeholder="Reason for Loan" onChange={handleChange} />
      <input name="repaymentTime" placeholder="Repayment Time" onChange={handleChange} />
      <input name="description" placeholder="Description" onChange={handleChange} />

      <label>CNIC Front Image: <input type="file" onChange={(e) => setCnicFront(e.target.files?.[0] || null)} /></label>
      <label>CNIC Back Image: <input type="file" onChange={(e) => setCnicBack(e.target.files?.[0] || null)} /></label>
      <label>Supporting Document: <input type="file" onChange={(e) => setDocument(e.target.files?.[0] || null)} /></label>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Submit Request</button>
    </form>
  );
}
