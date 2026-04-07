import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, User, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar = () => {
    const { cart, wishlist, user } = useApp();

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="text-2xl font-bold text-primary tracking-tighter uppercase italic">
                    Trendify
                </Link>

                <div className="hidden md:flex space-x-8 font-semibold text-sm uppercase">
                    
                    <Link to="/shop" className="hover:text-primary transition">Studio</Link>
                </div>

                <div className="flex-grow max-w-md mx-8 relative hidden lg:block">
                    <input
                        type="text"
                        placeholder="Search for products, brands and more"
                        className="w-full bg-gray-100 py-2 pl-10 pr-4 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>

                <div className="flex items-center space-x-6">
                    <Link to="/profile" className="flex flex-col items-center group">
                        <User size={20} className="group-hover:text-primary transition" />
                        <span className="text-[10px] font-bold uppercase group-hover:text-primary transition">Profile</span>
                    </Link>
                    <Link to="/wishlist" className="flex flex-col items-center group relative">
                        <Heart size={20} className="group-hover:text-primary transition" />
                        <span className="text-[10px] font-bold uppercase group-hover:text-primary transition">Wishlist</span>
                        {wishlist.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                                {wishlist.length}
                            </span>
                        )}
                    </Link>
                    <Link to="/cart" className="flex flex-col items-center group relative">
                        <ShoppingCart size={20} className="group-hover:text-primary transition" />
                        <span className="text-[10px] font-bold uppercase group-hover:text-primary transition">Bag</span>
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                                {cart.reduce((acc, item) => acc + item.quantity, 0)}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
