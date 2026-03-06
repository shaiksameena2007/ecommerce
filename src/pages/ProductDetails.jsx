import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../utils/mockData';
import { useApp } from '../context/AppContext';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCcw, Camera } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart, toggleWishlist, wishlist } = useApp();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [tryOnImage, setTryOnImage] = useState(null);
    const [showTryOnModal, setShowTryOnModal] = useState(false);
    const [stockCheckResult, setStockCheckResult] = useState(null);

    useEffect(() => {
        const foundProduct = products.find(p => p.id === parseInt(id));
        setProduct(foundProduct);
        if (foundProduct) setSelectedSize(foundProduct.sizes[0]);
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
                <span className="text-secondary">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Gallery */}
                <div className="grid grid-cols-2 gap-4 h-fit">
                    <img src={product.image} alt={product.name} className="w-full h-[500px] object-cover rounded cursor-zoom-in" />
                    <img src={product.image} alt={product.name} className="w-full h-[500px] object-cover rounded cursor-zoom-in brightness-90" />
                </div>

                {/* Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tight mb-1">{product.name}</h1>
                        <p className="text-xl text-gray-500 font-light">{product.description}</p>
                    </div>

                    <div className="flex items-center space-x-4 border px-4 py-1 rounded w-fit font-bold">
                        <span className="flex items-center">{product.rating} <Star size={16} className="ml-1 fill-green-600 stroke-green-600" /></span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500 uppercase text-xs">{product.reviews} Ratings</span>
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
                                    className={`h-12 w-12 rounded-full border-2 flex items-center justify-center font-bold text-sm transition ${selectedSize === size ? 'border-primary text-primary' : 'hover:border-primary border-gray-200'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex space-x-4 pt-4">
                        <button
                            onClick={() => addToCart(product)}
                            className="flex-grow flex items-center justify-center space-x-3 bg-primary text-white py-4 rounded font-bold uppercase tracking-widest hover:opacity-90 transition"
                        >
                            <ShoppingBag size={20} />
                            <span>Add to Bag</span>
                        </button>
                        <button
                            onClick={() => toggleWishlist(product)}
                            className={`flex-grow flex items-center justify-center space-x-3 border-2 py-4 rounded font-bold uppercase tracking-widest transition ${wishlist.some(i => i.id === product.id) ? 'bg-secondary border-secondary text-white' : 'border-gray-200 hover:border-secondary'}`}
                        >
                            <Heart size={20} />
                            <span>{wishlist.some(i => i.id === product.id) ? 'Wishlisted' : 'Wishlist'}</span>
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
                    {stockCheckResult && <p className="text-xs font-bold text-green-600 animate-bounce">{stockCheckResult}</p>}

                    <div className="pt-8 space-y-4 text-sm">
                        <div className="flex items-center space-x-4">
                            <Truck size={20} className="text-gray-400" />
                            <span className="font-bold">Get it by Mon, Feb 24</span>
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

            {/* Try-On Modal */}
            {showTryOnModal && (
                <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6">
                    <div className="bg-white max-w-2xl w-full rounded-xl overflow-hidden relative">
                        <button onClick={() => setShowTryOnModal(false)} className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black transition">X</button>
                        <div className="flex flex-col md:flex-row h-[500px]">
                            <div className="flex-grow bg-gray-100 relative">
                                <img src={tryOnImage} alt="User" className="w-full h-full object-contain" />
                                <img
                                    src={product.image}
                                    alt="Overlay"
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-auto opacity-70 mix-blend-multiply pointer-events-none"
                                />
                            </div>
                            <div className="w-full md:w-64 p-8 flex flex-col justify-center text-center">
                                <h3 className="text-xl font-black uppercase mb-4">AI Magic!</h3>
                                <p className="text-sm text-gray-500 mb-8">Visualization of how this product might look on you.</p>
                                <button onClick={() => setShowTryOnModal(false)} className="bg-primary text-white py-3 rounded font-bold uppercase text-xs tracking-widest">Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews Section */}
            <section className="mt-20 border-t pt-20">
                <h2 className="text-2xl font-bold uppercase mb-10 tracking-widest">Ratings & Reviews</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <div className="flex items-baseline space-x-4">
                            <span className="text-5xl font-light">{product.rating}</span>
                            <Star size={32} className="fill-green-600 stroke-green-600" />
                        </div>
                        <p className="text-gray-500">Verified buyers have rated this product.</p>
                        {/* Progress bars placeholder */}
                        {[5, 4, 3, 2, 1].map(star => (
                            <div key={star} className="flex items-center space-x-2 text-xs font-bold">
                                <span>{star}</span> <Star size={10} className="fill-gray-400 stroke-gray-400" />
                                <div className="flex-grow h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="bg-green-600 h-full" style={{ width: `${star * 15}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-8">
                        <h4 className="font-bold uppercase text-sm border-b pb-4">Customer Reviews</h4>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="bg-green-600 text-white text-[10px] px-1 rounded flex items-center font-bold">5 <Star size={8} className="ml-0.5 fill-white" /></div>
                                    <span className="text-sm font-bold">Best Purchase!</span>
                                </div>
                                <p className="text-sm text-gray-600">The quality of the fabric is amazing. Fits perfectly!</p>
                                <p className="text-xs text-gray-400 uppercase font-bold">Zayan | 20 Feb 2026</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <div className="bg-green-600 text-white text-[10px] px-1 rounded flex items-center font-bold">4 <Star size={8} className="ml-0.5 fill-white" /></div>
                                    <span className="text-sm font-bold">Great fit.</span>
                                </div>
                                <p className="text-sm text-gray-600">Reallyชอบ color and the design. Highly recommend.</p>
                                <p className="text-xs text-gray-400 uppercase font-bold">Deepak | 18 Feb 2026</p>
                            </div>
                        </div>
                        <button className="text-primary font-bold uppercase text-sm hover:underline">View all reviews</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetails;
