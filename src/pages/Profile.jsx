import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, LogOut, Package, Heart, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useApp();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(user || { name: 'Guest', email: 'guest@example.com' });

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleSave = () => {
        setIsEditing(false);
        alert("Profile Updated!");
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
            <aside className="w-full md:w-64 border-r pr-6 space-y-2">
                <h3 className="font-bold uppercase text-xs text-gray-400 mb-4 px-4">Account</h3>
                <button className="w-full flex items-center space-x-4 px-4 py-3 text-primary bg-primary/5 rounded font-bold transition">
                    <User size={18} /> <span>Overview</span>
                </button>
                <button className="w-full flex items-center space-x-4 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded font-semibold transition">
                    <Package size={18} /> <span>Orders</span>
                </button>
                <button className="w-full flex items-center space-x-4 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded font-semibold transition">
                    <Heart size={18} /> <span>Wishlist</span>
                </button>
                <button className="w-full flex items-center space-x-4 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded font-semibold transition">
                    <MapPin size={18} /> <span>Addresses</span>
                </button>
                <hr className="my-4" />
                <button onClick={handleLogout} className="w-full flex items-center space-x-4 px-4 py-3 text-red-500 hover:bg-red-50 rounded font-bold transition">
                    <LogOut size={18} /> <span>Logout</span>
                </button>
            </aside>

            <main className="flex-grow">
                <div className="bg-white border p-10 rounded shadow-sm">
                    <div className="flex justify-between items-start mb-8">
                        <h2 className="text-xl font-bold uppercase tracking-wider">Profile Details</h2>
                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className="text-primary font-bold uppercase text-sm border-2 border-primary px-6 py-2 rounded hover:bg-primary hover:text-white transition"
                        >
                            {isEditing ? 'Save' : 'Edit'}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-1">
                            <label className="text-xs text-gray-400 font-bold uppercase">Full Name</label>
                            {isEditing ? (
                                <input type="text" className="w-full border p-2 rounded outline-none" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            ) : (
                                <p className="font-semibold text-lg">{formData.name}</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-gray-400 font-bold uppercase">Email ID</label>
                            {isEditing ? (
                                <input type="email" className="w-full border p-2 rounded outline-none" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            ) : (
                                <p className="font-semibold text-lg">{formData.email}</p>
                            )}
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-gray-400 font-bold uppercase">Mobile Number</label>
                            <p className="font-semibold text-lg text-gray-500">{formData.contact || 'Not Provided'}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
