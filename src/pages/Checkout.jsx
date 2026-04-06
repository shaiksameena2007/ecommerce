import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Checkout = () => {
    const { cart } = useApp();
    const navigate = useNavigate();
    const location = useLocation();

    const [address, setAddress] = useState('');

    // ✅ Get Buy Now product (if exists)
    const buyNowProduct = location.state?.product;

    // ✅ Decide what to display
    const items = buyNowProduct
        ? [{ ...buyNowProduct, quantity: 1 }]
        : cart;

    // ✅ 🛑 EMPTY STATE HANDLING
    if (!items || items.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold">No items to checkout</h2>
                <button
                    onClick={() => navigate("/shop")}
                    className="mt-4 bg-primary text-white px-6 py-2 rounded"
                >
                    Go to Shop
                </button>
            </div>
        );
    }

    const handlePlaceOrder = () => {
        if (!address.trim()) {
            alert("Please enter delivery address!");
            return;
        }

        alert("Order Placed Successfully!");
        navigate('/order-tracking');
    };

    // ✅ Calculate total
    const total = items.reduce(
        (acc, item) => acc + item.price * (item.quantity || 1),
        0
    );

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h2 className="text-2xl font-bold mb-10 text-center uppercase border-b pb-4">
                Checkout
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* LEFT SIDE */}
                <div className="space-y-6">
                    <h3 className="font-bold text-lg">Shipping Address</h3>

                    <textarea
                        placeholder="Enter full address"
                        className="w-full border p-4 rounded h-32 focus:border-primary outline-none"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    {/* Payment */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg">Payment Method</h3>

                        <div className="space-y-2">
                            <label className="flex items-center space-x-3 border p-4 rounded cursor-pointer">
                                <input type="radio" name="payment" defaultChecked />
                                <span>Cash On Delivery</span>
                            </label>

                            <label className="flex items-center space-x-3 border p-4 rounded opacity-50 cursor-not-allowed">
                                <input type="radio" name="payment" disabled />
                                <span>Credit / Debit Card (Coming Soon)</span>
                            </label>
                        </div>
                    </div>

                    {/* ✅ Items Preview */}
                    <div className="space-y-4 pt-6">
                        <h3 className="font-bold text-lg">Order Items</h3>

                        {items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 border p-3 rounded">
                                <img
                                    src={item.thumbnail || item.images?.[0]}
                                    alt={item.title}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-grow">
                                    <p className="text-sm font-bold">{item.title}</p>
                                    <p className="text-xs text-gray-500">
                                        Qty: {item.quantity || 1}
                                    </p>
                                </div>
                                <p className="font-bold">Rs. {item.price}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="bg-gray-50 p-8 rounded-lg h-fit">
                    <h3 className="font-bold text-lg mb-6">Price Summary</h3>

                    <div className="space-y-4 text-sm mb-6">
                        <div className="flex justify-between">
                            <span>Total Items</span>
                            <span>{items.length}</span>
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
                        className="w-full bg-primary text-white py-4 rounded font-bold uppercase tracking-widest hover:opacity-90"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;