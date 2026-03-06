import React, { useState } from 'react';
import { products, categories } from '../utils/mockData';
import { useApp } from '../context/AppContext';
import { Filter, Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Shop = () => {

    const { addToCart, toggleWishlist, wishlist } = useApp();
    const [selectedCategory, setSelectedCategory] = useState("All");

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search") || "";

    const filteredProducts = products.filter(product => {

        const matchesCategory =
            selectedCategory === "All" || product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">

            {/* Sidebar */}
            <aside className="w-full md:w-64 space-y-8">

                <div>
                    <h3 className="text-lg font-bold uppercase mb-4 flex items-center">
                        <Filter size={18} className="mr-2" /> Filters
                    </h3>

                    <div className="space-y-4">

                        <h4 className="font-semibold text-sm uppercase">
                            Categories
                        </h4>

                        <div className="space-y-2">

                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={selectedCategory === "All"}
                                    onChange={() => setSelectedCategory("All")}
                                />
                                <span className="text-sm">All</span>
                            </label>

                            {categories.map(cat => (
                                <label key={cat} className="flex items-center space-x-2 cursor-pointer">

                                    <input
                                        type="radio"
                                        name="category"
                                        checked={selectedCategory === cat}
                                        onChange={() => setSelectedCategory(cat)}
                                    />

                                    <span className="text-sm">{cat}</span>

                                </label>
                            ))}

                        </div>
                    </div>
                </div>
            </aside>


            {/* Product Grid */}
            <main className="flex-grow">

                <div className="flex justify-between items-center mb-8">

                    <h2 className="text-xl font-bold">
                        {filteredProducts.length} Items Found
                    </h2>

                    <select className="border p-2 rounded text-sm outline-none">
                        <option>Sort by: Recommended</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                    </select>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                    {filteredProducts.map(product => (

                        <div key={product.id} className="group relative">

                            <Link
                                to={`/product/${product.id}`}
                                className="block overflow-hidden relative border rounded-lg"
                            >

                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
                                />

                                <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-0.5 rounded flex items-center text-xs font-bold">
                                    {product.rating}
                                    <Star size={10} className="ml-1 fill-yellow-400 stroke-yellow-400" />
                                    | {product.reviews}
                                </div>

                            </Link>


                            <div className="mt-4 space-y-1">

                                <h3 className="font-bold text-sm truncate">
                                    {product.name}
                                </h3>

                                <p className="text-gray-500 text-xs">
                                    {product.category}
                                </p>

                                <div className="flex items-center space-x-2">

                                    <span className="font-bold">
                                        Rs. {product.price}
                                    </span>

                                    <span className="text-gray-400 line-through text-xs">
                                        Rs. {product.price + 500}
                                    </span>

                                    <span className="text-orange-500 text-xs font-bold">
                                        (50% OFF)
                                    </span>

                                </div>

                            </div>


                            <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition duration-300">

                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleWishlist(product);
                                    }}
                                    className={`p-2 rounded-full shadow-md ${
                                        wishlist.some(i => i.id === product.id)
                                            ? 'bg-primary text-white'
                                            : 'bg-white text-gray-600'
                                    }`}
                                >

                                    <Star size={18} />

                                </button>

                            </div>


                            <button
                                onClick={() => addToCart(product)}
                                className="w-full mt-4 bg-primary text-white font-bold py-2 rounded uppercase tracking-wider text-xs opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition duration-300"
                            >

                                Add to Bag

                            </button>

                        </div>

                    ))}

                </div>

            </main>

        </div>
    );
};

export default Shop;