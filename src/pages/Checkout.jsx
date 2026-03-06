import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart } = useApp();
    const navigate = useNavigate();
    const [address, setAddress] = useState('');

    const handlePlaceOrder = () => {
        alert("Order Placed Successfully!");
        navigate('/order-tracking');
    };

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h2 className="text-2xl font-bold mb-10 text-center uppercase border-b pb-4">Checkout</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h3 className="font-bold text-lg">Shipping Address</h3>
                    <textarea
                        placeholder="Enter full address"
                        className="w-full border p-4 rounded h-32 focus:border-primary outline-none"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg">Payment Method</h3>
                        <div className="space-y-2">
                            <label className="flex items-center space-x-3 border p-4 rounded cursor-pointer">
                                <input type="radio" name="payment" defaultChecked />
                                <span>Cash On Delivery</span>
                            </label>
                            <label className="flex items-center space-x-3 border p-4 rounded cursor-pointer opacity-50 cursor-not-allowed">
                                <input type="radio" name="payment" disabled />
                                <span>Credit / Debit Card (Offline)</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-lg h-fit">
                    <h3 className="font-bold text-lg mb-6">Price Summary</h3>
                    <div className="space-y-4 text-sm mb-6">
                        <div className="flex justify-between">
                            <span>Total Items</span>
                            <span>{cart.length}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery Fee</span>
                            <span className="text-green-600">FREE</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-bold text-xl">
                            <span>Amount To Pay</span>
                            <span className="text-primary">Rs. {total}</span>
                        </div>
                    </div>
                    <button
                        onClick={handlePlaceOrder}
                        className="w-full bg-primary text-white py-4 rounded font-bold uppercase tracking-widest"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
