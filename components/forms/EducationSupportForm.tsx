
'use client';
import { useState } from 'react';
import axios from 'axios';

export default function EducationSupportForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    cnic: '',
    maritalStatus: '',
    familyMembers: '',
    over18: '',
    matricMembers: '',
    homeRent: '',
    hasFridge: '',
    income: '',
    assistanceType: 'EducationSupport'
  });

  const [cnicFront, setCnicFront] = useState<File | null>(null);
  const [cnicBack, setCnicBack] = useState<File | null>(null);
  const [document, setDocument] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="input" placeholder="Full Name" required />
          <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className="input" placeholder="Father Name" required />
          <input type="text" name="cnic" value={formData.cnic} onChange={handleChange} className="input" placeholder="CNIC Number" required />
          <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="input" required>
            <option value="">Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Household Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="number" name="familyMembers" value={formData.familyMembers} onChange={handleChange} className="input" placeholder="Family Member Count" required />
          <select name="over18" value={formData.over18} onChange={handleChange} className="input" required>
            <option value="">Any Member 18+?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <input type="number" name="matricMembers" value={formData.matricMembers} onChange={handleChange} className="input" placeholder="Matric-Passed Members" required />
          <select name="homeRent" value={formData.homeRent} onChange={handleChange} className="input" required>
            <option value="">Paying Rent?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <select name="hasFridge" value={formData.hasFridge} onChange={handleChange} className="input" required>
            <option value="">Has Fridge?</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <input type="number" name="income" value={formData.income} onChange={handleChange} className="input" placeholder="Monthly Income" required />
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
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Submit Application
        </button>
      </div>
    </form>
  );
}
