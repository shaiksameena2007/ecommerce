import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

const Wishlist = () => {
    const { wishlist, toggleWishlist, addToCart } = useApp();

    if (wishlist.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
                <h2 className="text-2xl font-bold">Your Wishlist is Empty</h2>
                <p className="text-gray-500">Save items that you like in your wishlist.</p>
                <Link to="/shop" className="border-2 border-primary text-primary px-10 py-3 font-bold uppercase rounded hover:bg-primary hover:text-white transition">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h2 className="text-xl font-bold mb-8 uppercase">My Wishlist ({wishlist.length} Items)</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {wishlist.map(product => (
                    <div key={product.id} className="border rounded relative group">
                        <button
                            onClick={() => toggleWishlist(product)}
                            className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-gray-400 hover:text-red-500 transition z-10"
                        >
                            <X size={18} />
                        </button>
                        <div className="aspect-[3/4] overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                        </div>
                        <div className="p-4 space-y-2">
                            <h3 className="font-bold text-sm truncate">{product.name}</h3>
                            <p className="font-bold">Rs. {product.price}</p>
                            <button
                                onClick={() => addToCart(product)}
                                className="w-full border border-primary text-primary py-2 text-xs font-bold uppercase rounded hover:bg-primary hover:text-white transition"
                            >
                                Move to Bag
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
