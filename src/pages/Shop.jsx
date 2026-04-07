import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Filter, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Shop = () => {
    const { addToCart, toggleWishlist, wishlist } = useApp();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(["All"]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOption, setSortOption] = useState("Recommended");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch all products from DummyJSON
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('https://dummyjson.com/products?limit=0');
                const allProducts = res.data.products;
                setProducts(allProducts);

                // Extract unique categories
                const catList = ["All", ...new Set(allProducts.map(p => p.category))];
                setCategories(catList);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching products:", err);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Filter products by selected category
    const filteredProducts = selectedCategory === "All"
        ? products
        : products.filter(p => p.category === selectedCategory);

    // Apply sorting
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === "Price: Low to High") return a.price - b.price;
        if (sortOption === "Price: High to Low") return b.price - a.price;
        return 0; // Recommended: keep original order
    });

    if (loading) return <div className="text-center py-10">Loading products...</div>;

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
            {/* Sidebar */}
            <aside className="w-full md:w-64 space-y-8">
                <div>
                    <h3 className="text-lg font-bold uppercase mb-4 flex items-center">
                        <Filter size={18} className="mr-2" /> Filters
                    </h3>
                    <div className="space-y-4">
                        <h4 className="font-semibold text-sm uppercase">Categories</h4>
                        <div className="space-y-2">
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
                    <h2 className="text-xl font-bold">{sortedProducts.length} Items Found</h2>
                    <select
                        className="border p-2 rounded text-sm outline-none"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    > 
                        <option>Recommended</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sortedProducts.map(product => (
                        <div key={product.id} className="group relative">
                            <Link to={`/product/${product.id}`} className="block overflow-hidden relative border rounded-lg">
                                <img
                                    src={product.thumbnail || product.images?.[0]}
                                    alt={product.title}
                                    className="w-full h-80 object-cover group-hover:scale-110 transition duration-500"
                                />
                                <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-0.5 rounded flex items-center text-xs font-bold">
                                    {product.rating?.toFixed(1)}
                                    <Star size={10} className="ml-1 fill-yellow-400 stroke-yellow-400" />
                                    | {product.stock}
                                </div>
                            </Link>

                            <div className="mt-4 space-y-1">
                                <h3 className="font-bold text-sm truncate">{product.title}</h3>
                                <p className="text-gray-500 text-xs">{product.category}</p>
                                <div className="flex items-center space-x-2">
                                    <span className="font-bold">Rs. {product.price}</span>
                                    <span className="text-gray-400 line-through text-xs">Rs. {product.price + 500}</span>
                                    <span className="text-orange-500 text-xs font-bold">(50% OFF)</span>
                                </div>
                            </div>

                            {/* Wishlist */}
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

                            {/* Buttons */}
                            <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition duration-300">
                                <button
                                    onClick={() =>
                                         addToCart({
                                                      id: product.id,
                                                      name: product.title,
                                                      image: product.thumbnail || product.images?.[0],
                                                      category: product.category,
                                                      price: product.price,
                                                      quantity: 1
                                                    })
                                             }
                                    className="w-1/2 bg-primary text-white font-bold py-2 rounded uppercase tracking-wider text-xs hover:opacity-90"
                                >
                                    Add to Bag
                                </button>
                               <button
    onClick={() => navigate("/checkout", { state: { product } })}
    className="w-1/2 bg-black text-white font-bold py-2 rounded uppercase tracking-wider text-xs hover:bg-gray-800"
>
    Buy Now
</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Shop;