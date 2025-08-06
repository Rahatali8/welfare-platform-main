'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function UnifiedRequestForm() {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setter(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            form.append(key, value);
        });

        if (cnicFront) form.append('cnic_front', cnicFront);
        if (cnicBack) form.append('cnic_back', cnicBack);
        if (document) form.append('document', document);

        try {
            await axios.post('/api/requests/submit', form);
            alert('Request submitted successfully!');
        } catch (error) {
            console.error('Submission error:', error);
            alert('Something went wrong.');
        }
    };

    return (
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
                    <option value="">18+ Members?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <input name="matric_member" placeholder="Matric Members" value={formData.matric_member} onChange={handleChange} required className="input" />
                <select name="home_rent" value={formData.home_rent} onChange={handleChange} required className="input">
                    <option value="">Home on Rent?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <select name="fridge" value={formData.fridge} onChange={handleChange} required className="input">
                    <option value="">Have Fridge?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
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
                    <input type="file" name="cnic_front" accept="image/*" onChange={handleFileChange(setCnicFront)} required />
                </div>
                <div>
                    <label>CNIC Back</label>
                    <input type="file" name="cnic_back" accept="image/*" onChange={handleFileChange(setCnicBack)} required />
                </div>
                <div>
                    <label>Supporting Document</label>
                    <input type="file" name="document" onChange={handleFileChange(setDocument)} required />
                </div>
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Submit Request
            </button>
        </form>
    );
}
