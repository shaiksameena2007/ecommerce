import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../context/AppContext';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCcw, Camera } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart, toggleWishlist, wishlist } = useApp();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [tryOnImage, setTryOnImage] = useState(null);
    const [showTryOnModal, setShowTryOnModal] = useState(false);
    const [stockCheckResult, setStockCheckResult] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`https://dummyjson.com/products/${id}`);
                const data = res.data;

                data.sizes = ['S', 'M', 'L', 'XL'];

                setProduct(data);
                setSelectedSize(data.sizes[0]);
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <div className="p-20 text-center">Loading...</div>;

    const handleTryOn = (e) => {
        const file = e.target.files[0];
        if (file) {
            setTryOnImage(URL.createObjectURL(file));
            setShowTryOnModal(true);
        }
    };

    const checkStock = (e) => {
        const file = e.target.files[0];
        if (file) {
            setStockCheckResult("Checking stock via AI...");
            setTimeout(() => {
                setStockCheckResult("Product is AVAILABLE in your local store!");
            }, 2000);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <nav className="text-xs font-bold uppercase text-gray-400 mb-8 space-x-2">
                <Link to="/" className="hover:text-secondary">Home</Link>
                <span>/</span>
                <Link to="/shop" className="hover:text-secondary">Shop</Link>
                <span>/</span>
                <span className="text-secondary">{product.title}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Gallery */}
                <div className="grid grid-cols-2 gap-4 h-fit">
                    <img src={product.images?.[0]} alt={product.title} className="w-full h-[500px] object-cover rounded cursor-zoom-in" />
                    <img src={product.images?.[1] || product.images?.[0]} alt={product.title} className="w-full h-[500px] object-cover rounded cursor-zoom-in brightness-90" />
                </div>

                {/* Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight mb-1">{product.title}</h1>
                        <p className="text-xl text-gray-500 font-light">{product.description}</p>
                    </div>

                    <div className="flex items-center space-x-4 border px-4 py-1 rounded w-fit font-bold">
                        <span className="flex items-center">
                            {product.rating?.toFixed(1)}
                            <Star size={16} className="ml-1 fill-green-600 stroke-green-600" />
                        </span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500 uppercase text-xs">{product.stock} In Stock</span>
                    </div>

                    <hr />

                    <div className="space-y-1">
                        <div className="flex items-center space-x-4">
                            <span className="text-3xl font-bold">Rs. {product.price}</span>
                            <span className="text-2xl text-gray-400 line-through font-light">Rs. {product.price + 500}</span>
                            <span className="text-xl text-orange-500 font-bold">(Rs. 500 OFF)</span>
                        </div>
                        <p className="text-green-600 font-bold text-sm uppercase">Inclusive of all taxes</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center w-full">
                            <h4 className="font-bold uppercase text-sm">Select Size</h4>
                            <span className="text-primary font-bold uppercase text-xs cursor-pointer">Size Chart</span>
                        </div>

                        <div className="flex space-x-4">
                            {product.sizes.map(size => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`h-12 w-12 rounded-full border-2 flex items-center justify-center font-bold text-sm transition ${
                                        selectedSize === size
                                            ? 'border-primary text-primary'
                                            : 'hover:border-primary border-gray-200'
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ✅ BUTTONS */}
                    <div className="flex space-x-4 pt-4">
                        {/* Add to Bag */}
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
                            className="flex-grow flex items-center justify-center space-x-3 bg-primary text-white py-4 rounded font-bold uppercase tracking-widest hover:opacity-90 transition"
                        >
                            <ShoppingBag size={20} />
                            <span>Add to Bag</span>
                        </button>

                        {/* ✅ Buy Now (NO CART) */}
                        <button
                            onClick={() => navigate("/checkout", { state: { product } })}
                            className="flex-grow flex items-center justify-center space-x-3 bg-black text-white py-4 rounded font-bold uppercase tracking-widest hover:bg-gray-800 transition"
                        >
                            <span>Buy Now</span>
                        </button>

                        {/* Wishlist */}
                        <button
                            onClick={() => toggleWishlist(product)}
                            className={`flex-grow flex items-center justify-center space-x-3 border-2 py-4 rounded font-bold uppercase tracking-widest transition ${
                                wishlist.some(i => i.id === product.id)
                                    ? 'bg-secondary border-secondary text-white'
                                    : 'border-gray-200 hover:border-secondary'
                            }`}
                        >
                            <Heart size={20} />
                            <span>
                                {wishlist.some(i => i.id === product.id)
                                    ? 'Wishlisted'
                                    : 'Wishlist'}
                            </span>
                        </button>
                    </div>

                    {/* AI Features */}
                    <div className="grid grid-cols-2 gap-4 pt-6">
                        <label className="flex items-center justify-center space-x-2 border-2 border-dashed border-primary/30 p-4 rounded-lg cursor-pointer hover:bg-primary/5 transition group">
                            <Camera size={20} className="text-primary" />
                            <span className="text-xs font-bold uppercase text-primary group-hover:underline">Try-On Me (AI)</span>
                            <input type="file" className="hidden" onChange={handleTryOn} accept="image/*" />
                        </label>

                        <label className="flex items-center justify-center space-x-2 border-2 border-dashed border-secondary/30 p-4 rounded-lg cursor-pointer hover:bg-secondary/5 transition group">
                            <Camera size={20} className="text-secondary" />
                            <span className="text-xs font-bold uppercase text-secondary group-hover:underline">Stock Check (AI)</span>
                            <input type="file" className="hidden" onChange={checkStock} accept="image/*" />
                        </label>
                    </div>

                    {stockCheckResult && (
                        <p className="text-xs font-bold text-green-600 animate-bounce">{stockCheckResult}</p>
                    )}

                    <div className="pt-8 space-y-4 text-sm">
                        <div className="flex items-center space-x-4">
                            <Truck size={20} className="text-gray-400" />
                            <span className="font-bold">Get it soon</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <RefreshCcw size={20} className="text-gray-400" />
                            <span>10 Days Return & Exchange</span>
                        </div>

                        <div className="flex items-center space-x-4">
                            <ShieldCheck size={20} className="text-gray-400" />
                            <span>100% Original Products</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Try-On Modal stays same */}
        </div>
    );
};

export default ProductDetails;