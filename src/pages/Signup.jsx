import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', contact: '' });
    const { signup } = useApp();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData);
        navigate('/');
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-pink-50 px-6 py-10">
            <div className="bg-white w-full max-w-md p-10 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-8 text-center uppercase tracking-wider text-secondary">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        required
                        className="w-full border p-3 rounded outline-none focus:border-primary"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="w-full border p-3 rounded outline-none focus:border-primary"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Contact Number"
                        required
                        className="w-full border p-3 rounded outline-none focus:border-primary"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full border p-3 rounded outline-none focus:border-primary"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button className="w-full bg-primary text-white py-3 font-bold uppercase rounded tracking-widest hover:opacity-90 transition mt-4">
                        Register
                    </button>
                </form>
                <p className="mt-8 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/login" className="text-primary font-bold">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
