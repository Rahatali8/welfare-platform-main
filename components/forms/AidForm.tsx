'use client';
import { useState } from 'react';
import axios from 'axios';

export default function AidForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    cnic: '',
    phone: '',
    reason: '',
    amount: '',
    address: '',
  });

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      form.append('type', 'aid');
      form.append('fullName', formData.fullName);
      form.append('cnic', formData.cnic);
      form.append('phone', formData.phone);
      form.append('reason', formData.reason);
      form.append('amount', formData.amount);
      form.append('address', formData.address);
      if (image) form.append('document', image);

      const res = await axios.post('/api/requests/submit', form);
      if (res.status === 200) {
        setSubmitted(true);
        setFormData({
          fullName: '',
          cnic: '',
          phone: '',
          reason: '',
          amount: '',
          address: '',
        });
        setImage(null);
      }
    } catch (err) {
      console.error('Submission failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-8 border w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Aid Request Form</h2>

      {submitted && (
        <div className="bg-green-100 text-green-700 px-4 py-2 mb-4 rounded">
          Request submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required
            className="w-full border px-4 py-2 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block mb-1 font-medium">CNIC</label>
            <input type="text" name="cnic" value={formData.cnic} onChange={handleChange} required
              className="w-full border px-4 py-2 rounded" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required
              className="w-full border px-4 py-2 rounded" />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required
            className="w-full border px-4 py-2 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Reason for Aid</label>
          <textarea name="reason" value={formData.reason} onChange={handleChange} required
            className="w-full border px-4 py-2 rounded h-24 resize-none" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Requested Amount</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required
            className="w-full border px-4 py-2 rounded" />
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Applier Image(optional)</label>
          <input type="file" accept="image/*,application/pdf" onChange={handleFileChange}
            className="w-full border px-4 py-2 rounded" />
        </div>

        <button type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
}
