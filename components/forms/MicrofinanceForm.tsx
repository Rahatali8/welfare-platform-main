'use client';
import { useState } from 'react';
import axios from 'axios';

export default function MicrofinanceForm() {
  const [formData, setFormData] = useState({
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
    type: 'MICROFINANCE',
  });

  const [cnicFront, setCnicFront] = useState<File | null>(null);
  const [cnicBack, setCnicBack] = useState<File | null>(null);
  const [document, setDocument] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value.toString());
      });

      if (cnicFront) form.append('cnic_front', cnicFront);
      if (cnicBack) form.append('cnic_back', cnicBack);
      if (document) form.append('document', document);

      const res = await axios.post('/api/requests/submit', form);
      alert('Form submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} className="input" placeholder="Full Name" required />
          <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} className="input" placeholder="Father Name" required />
          <input type="text" name="cnic_number" value={formData.cnic_number} onChange={handleChange} className="input" placeholder="CNIC Number" required />
          <select name="marital_status" value={formData.marital_status} onChange={handleChange} className="input" required>
            <option value="">Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Household Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="number" name="family_count" value={formData.family_count} onChange={handleChange} className="input" placeholder="Family Member Count" required />
          <input type="number" name="adult_member" value={formData.adult_member} onChange={handleChange} className="input" placeholder="Members 18+" required />
          <input type="number" name="matric_member" value={formData.matric_member} onChange={handleChange} className="input" placeholder="Matric-Passed Members" required />
          <select name="home_rent" value={formData.home_rent} onChange={handleChange} className="input" required>
            <option value="">Paying Rent?</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          <select name="fridge" value={formData.fridge} onChange={handleChange} className="input" required>
            <option value="">Has Fridge?</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
          <input type="number" name="monthly_income" value={formData.monthly_income} onChange={handleChange} className="input" placeholder="Monthly Income" required />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Upload Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="file" accept="image/*" onChange={(e) => setCnicFront(e.target.files?.[0] || null)} className="input" required />
          <input type="file" accept="image/*" onChange={(e) => setCnicBack(e.target.files?.[0] || null)} className="input" required />
          <input type="file" accept=".pdf,.doc,.docx,image/*" onChange={(e) => setDocument(e.target.files?.[0] || null)} className="input" />
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          type="submit"
          className={`bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </div>
    </form>
  );
}
