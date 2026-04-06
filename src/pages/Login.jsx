import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useApp();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ email, name: email.split('@')[0] });
        navigate('/');
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-pink-50 px-6">
            <div className="bg-white w-full max-w-md p-10 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-8 text-center uppercase tracking-wider text-secondary">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                        type="email"
                        placeholder="Email Address"
                        required
                        className="w-full border p-3 rounded outline-none focus:border-primary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="w-full border p-3 rounded outline-none focus:border-primary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="w-full bg-primary text-white py-3 font-bold uppercase rounded tracking-widest hover:opacity-90 transition">
                        Continue
                    </button>
                </form>
                <p className="mt-8 text-center text-sm text-gray-600">
                    Don't have an account? <Link to="/signup" className="text-primary font-bold">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
