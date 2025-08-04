'use client';
import { useState } from 'react';
import axios from 'axios';

export default function MedicalHelpForm() {
  const [formData, setFormData] = useState({
    patientName: '',
    cnic: '',
    phone: '',
    hospitalName: '',
    diagnosis: '',
    amount: '',
    address: '',
  });
  const [document, setDocument] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    e.target.files?.length && setDocument(e.target.files[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append('type', 'medical');
      Object.entries(formData).forEach(([key, value]) => form.append(key, value));
      if (document) form.append('document', document);

      const res = await axios.post('/api/requests/submit', form);
      if (res.status === 200) {
        setSubmitted(true);
        setFormData({
          patientName: '',
          cnic: '',
          phone: '',
          hospitalName: '',
          diagnosis: '',
          amount: '',
          address: '',
        });
        setDocument(null);
      }
    } catch (err) {
      console.error('Submit failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Medical Help Form</h2>
      {submitted && <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">Request submitted successfully!</div>}
      <form onSubmit={handleSubmit} className="space-y-5">
        {Object.entries(formData).map(([name, value]) => (
          <div key={name}>
            <label className="block mb-1 font-medium capitalize">{name.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type={name === 'amount' ? 'number' : 'text'}
              name={name}
              value={value}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
          </div>
        ))}
        <div>
          <label className="block mb-1 font-medium">Upload Document</label>
          <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="w-full" />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
