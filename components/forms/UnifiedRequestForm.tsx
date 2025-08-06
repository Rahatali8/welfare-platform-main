'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function UnifiedRequestForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        fatherName: '',
        cnicNumber: '',
        phoneNumber: '', // ✅ updated
        maritalStatus: '',
        familyCount: '',
        adultMember: '',
        matricMember: '',
        homeRent: '',
        fridge: '',
        monthlyIncome: '',
        type: '',
        description: '',
        reason: '',
        repayment_time: '',
    });

    const [cnicFront, setCnicFront] = useState<File | null>(null);
    const [cnicBack, setCnicBack] = useState<File | null>(null);
    const [document, setDocument] = useState<File | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (setter: React.Dispatch<React.SetStateAction<File | null>>) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
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
            const res = await axios.post('/api/requests/submit', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Request submitted successfully');
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('Failed to submit request');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required className="input" />
                <input name="fatherName" placeholder="Father Name" value={formData.fatherName} onChange={handleChange} required className="input" />
                <input name="cnicNumber" placeholder="CNIC Number" value={formData.cnicNumber} onChange={handleChange} required className="input" />
                <input name="phoneNumber"placeholder="Phone Number"value={formData.phoneNumber} onChange={handleChange} required className="input"/>        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} required className="input">
                    <option value="">Marital Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                </select>
                <input name="familyCount" placeholder="Family Member Count" value={formData.familyCount} onChange={handleChange} required className="input" />
                <select name="adultMember" value={formData.adultMember} onChange={handleChange} required className="input">
                    <option value="">18+ Members?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <input name="matricMember" placeholder="Matric Passed Members" value={formData.matricMember} onChange={handleChange} required className="input" />
                <select name="homeRent" value={formData.homeRent} onChange={handleChange} required className="input">
                    <option value="">Home on Rent?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <select name="fridge" value={formData.fridge} onChange={handleChange} required className="input">
                    <option value="">Have Fridge?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <input name="monthlyIncome" placeholder="Monthly Income" value={formData.monthlyIncome} onChange={handleChange} required className="input" />
                <select name="type" value={formData.type} onChange={handleChange} required className="input">
                    <option value="">Select Request Type</option>
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
                placeholder="Description / Situation"
                value={formData.description}
                onChange={handleChange}
                className="input w-full"
                required
            />

            {formData.type === 'Loan' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="reason" placeholder="Reason for Loan" value={formData.reason} onChange={handleChange} required className="input" />
                    <input name="repayment_time" placeholder="Loan Repayment Time" value={formData.repayment_time} onChange={handleChange} required className="input" />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block mb-1">CNIC Front Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange(setCnicFront)} required className="input" />
                </div>
                <div>
                    <label className="block mb-1">CNIC Back Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange(setCnicBack)} required className="input" />
                </div>
                <div>
                    <label className="block mb-1">Supporting Document</label>
                    <input type="file" onChange={handleFileChange(setDocument)} required className="input" />
                </div>
            </div>

            <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Submit Request
            </button>
        </form>
    );
}
