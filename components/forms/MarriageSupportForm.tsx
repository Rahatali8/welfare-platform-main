'use client';

import { useState } from 'react';
import axios from 'axios';

export default function MarriageSupportForm() {
  const [form, setForm] = useState({
    full_name: '',
    father_name: '',
    cnic_number: '',
    marital_status: '',
    family_count: '',
    adult_member: '',
    matric_member: '',
    home_rent: '',
    fridge: '',
    monthly_income: '',
    type: 'Marriage Support',
    description: '',
  });

  const [cnicFront, setCnicFront] = useState<File | null>(null);
  const [cnicBack, setCnicBack] = useState<File | null>(null);
  const [document, setDocument] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0] || null;
    if (type === 'cnicFront') setCnicFront(file);
    if (type === 'cnicBack') setCnicBack(file);
    if (type === 'document') setDocument(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (cnicFront) formData.append('cnic_front', cnicFront);
    if (cnicBack) formData.append('cnic_back', cnicBack);
    if (document) formData.append('document', document);

    try {
      const res = await axios.post('/api/requests/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      alert('Request submitted successfully!');
      setForm({
        full_name: '',
        father_name: '',
        cnic_number: '',
        marital_status: '',
        family_count: '',
        adult_member: '',
        matric_member: '',
        home_rent: '',
        fridge: '',
        monthly_income: '',
        type: 'Marriage Support',
        description: '',
      });
      setCnicFront(null);
      setCnicBack(null);
      setDocument(null);
    } catch (error) {
      console.error(error);
      alert('Submission failed!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold">Marriage Support Form</h2>

      <input name="full_name" placeholder="Full Name" value={form.full_name} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input name="father_name" placeholder="Father Name" value={form.father_name} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input name="cnic_number" placeholder="CNIC Number" value={form.cnic_number} onChange={handleChange} required className="w-full p-2 border rounded" />

      <select name="marital_status" value={form.marital_status} onChange={handleChange} required className="w-full p-2 border rounded">
        <option value="">Select Marital Status</option>
        <option value="Single">Single</option>
        <option value="Married">Married</option>
        <option value="Widowed">Widowed</option>
      </select>

      <input name="family_count" placeholder="Family Member Count" value={form.family_count} onChange={handleChange} type="number" required className="w-full p-2 border rounded" />
      <select name="adult_member" value={form.adult_member} onChange={handleChange} required className="w-full p-2 border rounded">
        <option value="">Any member 18+?</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <input name="matric_member" placeholder="Matric-Passed Members" value={form.matric_member} onChange={handleChange} type="number" required className="w-full p-2 border rounded" />

      <select name="home_rent" value={form.home_rent} onChange={handleChange} required className="w-full p-2 border rounded">
        <option value="">Do you pay rent?</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <select name="fridge" value={form.fridge} onChange={handleChange} required className="w-full p-2 border rounded">
        <option value="">Do you own a fridge?</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <input name="monthly_income" placeholder="Monthly Income" value={form.monthly_income} onChange={handleChange} type="number" required className="w-full p-2 border rounded" />

      <textarea name="description" placeholder="Why you need marriage support?" value={form.description} onChange={handleChange} required className="w-full p-2 border rounded" />

      <div>
        <label>CNIC Front:</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'cnicFront')} required />
      </div>

      <div>
        <label>CNIC Back:</label>
        <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'cnicBack')} required />
      </div>

      <div>
        <label>Supporting Document:</label>
        <input type="file" onChange={(e) => handleFileChange(e, 'document')} />
      </div>

      <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-4 py-2 rounded">
        {submitting ? 'Submitting...' : 'Submit Request'}
      </button>
    </form>
  );
}
