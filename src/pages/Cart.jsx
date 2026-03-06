import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity } = useApp();

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
                <img src="https://constant.myntassets.com/checkout/assets/img/empty-bag.webp" alt="Empty Bag" className="w-64" />
                <h2 className="text-2xl font-bold">Hey, it feels so light!</h2>
                <p className="text-gray-500">There is nothing in your bag. Let's add some items.</p>
                <Link to="/shop" className="border-2 border-primary text-primary px-10 py-3 font-bold uppercase rounded hover:bg-primary hover:text-white transition">
                    Go to Shop
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-bold border-b pb-4 uppercase">My Shopping Bag ({cart.length} Items)</h2>
                {cart.map(item => (
                    <div key={item.id} className="flex gap-6 border p-4 rounded-lg relative group">
                        <img src={item.image} alt={item.name} className="w-32 h-40 object-cover rounded" />
                        <div className="flex-grow space-y-2">
                            <h3 className="font-bold">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.category}</p>
                            <div className="flex items-center space-x-4">
                                <span className="font-bold">Rs. {item.price}</span>
                            </div>
                            <div className="flex items-center space-x-4 mt-4">
                                <div className="flex items-center border rounded">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-100"><Minus size={16} /></button>
                                    <span className="px-4 font-bold">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-100"><Plus size={16} /></button>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold border-b pb-4 uppercase">Coupons</h2>
                <div className="flex items-center space-x-2">
                    <input type="text" placeholder="Enter Coupon Code" className="flex-grow border p-3 rounded text-sm outline-none focus:border-primary" />
                    <button className="text-primary font-bold uppercase text-sm border-2 border-primary px-6 py-2.5 rounded hover:bg-primary hover:text-white transition">Apply</button>
                </div>

                <h2 className="text-xl font-bold border-b pb-4 uppercase">Price Details</h2>
                <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                        <span>Total MRP</span>
                        <span>Rs. {total}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                        <span>Discount on MRP</span>
                        <span>- Rs. {total > 2000 ? 500 : 0}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Convenience Fee</span>
                        <span className="text-green-600 underline cursor-pointer">Know More</span>
                        <span>Rs. 99</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total Amount</span>
                        <span>Rs. {total - (total > 2000 ? 500 : 0) + (total > 0 ? 99 : 0)}</span>
                    </div>
                </div>
                <Link to="/checkout" className="block w-full bg-primary text-white text-center py-4 rounded font-bold uppercase tracking-wider hover:opacity-90 transition">
                    Place Order
                </Link>
            </div>
        </div>
    );
};

export default Cart;
