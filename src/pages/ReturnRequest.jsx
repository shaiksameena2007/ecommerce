import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ReturnRequest = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reason, setReason] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Return Request Submitted!");
        navigate('/profile');
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-bold mb-8 text-center uppercase tracking-tighter">Return Request</h2>
            <div className="bg-white border p-10 rounded-lg shadow-md">
                <p className="mb-6 text-gray-600">Requesting return for Order ID: <span className="font-bold">#ORD-{id || 'TEST'}</span></p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="font-bold uppercase text-xs">Reason for Return</label>
                        <select
                            className="w-full border p-4 rounded outline-none focus:border-primary"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        >
                            <option value="">Select a reason</option>
                            <option value="size">Size mismatch</option>
                            <option value="quality">Quality not as expected</option>
                            <option value="damaged">Product is damaged</option>
                            <option value="wrong">Received wrong item</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="font-bold uppercase text-xs">Additional Details</label>
                        <textarea placeholder="Tell us more..." className="w-full border p-4 rounded h-32 focus:border-primary outline-none" />
                    </div>
                    <button className="w-full bg-primary text-white py-4 rounded font-bold uppercase tracking-widest shadow-lg shadow-primary/20">
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReturnRequest;
