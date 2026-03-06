import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] bg-gray-900 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0"
                >
                    <img
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
                        alt="Hero"
                        className="w-full h-full object-cover opacity-60"
                    />
                </motion.div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-6xl md:text-8xl font-black mb-6 uppercase tracking-tight"
                    >
                        Spring Sale
                    </motion.h1>
                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-xl md:text-2xl mb-10 max-w-2xl font-light"
                    >
                        Upgrade your wardrobe with our latest collection. Up to 70% off on premium brands.
                    </motion.p>
                    <Link to="/shop">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors duration-300"
                        >
                            Shop Now
                        </motion.button>
                    </Link>
                </div>
            </section>

            {/* Everyday Deals Section */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold uppercase tracking-wider mb-12 border-b-2 border-primary inline-block pb-2">Everyday Deals</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="h-64 bg-gray-200 rounded-xl overflow-hidden group relative cursor-pointer">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <span className="text-sm font-bold uppercase bg-primary px-2 py-1 mb-2 inline-block">Flash Sale</span>
                            <h3 className="text-2xl font-black">Denim Days</h3>
                        </div>
                    </div>
                    <div className="h-64 bg-gray-200 rounded-xl overflow-hidden group relative cursor-pointer">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <span className="text-sm font-bold uppercase bg-primary px-2 py-1 mb-2 inline-block">New Arrival</span>
                            <h3 className="text-2xl font-black">Summer Essentials</h3>
                        </div>
                    </div>
                    <div className="h-64 bg-gray-200 rounded-xl overflow-hidden group relative cursor-pointer">
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                            <span className="text-sm font-bold uppercase bg-primary px-2 py-1 mb-2 inline-block">Best Seller</span>
                            <h3 className="text-2xl font-black">Accessory Bloom</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Products */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold uppercase tracking-wider mb-12 border-b-2 border-primary inline-block pb-2">Trending This Week</h2>
                <TrendingProducts />
            </section>
        </div>
    );
};

const TrendingProducts = () => {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating Axios fetch from dummy API
        import('axios').then(axios => {
            axios.default.get('https://jsonplaceholder.typicode.com/posts?_limit=4')
                .then(res => {
                    // Mapping mock posts to products
                    const mockTrending = res.data.map((post, idx) => ({
                        id: post.id + 100,
                        name: post.title.split(' ').slice(0, 3).join(' '),
                        price: 1500 + (idx * 200),
                        image: `https://images.unsplash.com/photo-${1560000000000 + (idx * 1000000)}?q=80&w=600`,
                        category: "Trending"
                    }));
                    setTrending(mockTrending);
                    setLoading(false);
                });
        });
    }, []);

    if (loading) return <div className="text-center py-10 font-bold text-gray-400">Fetching trends...</div>;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trending.map(item => (
                <Link to={`/product/${item.id}`} key={item.id} className="group relative">
                    <div className="aspect-[3/4] overflow-hidden rounded">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                    </div>
                    <div className="mt-4">
                        <h3 className="font-bold text-xs uppercase truncate">{item.name}</h3>
                        <p className="font-bold text-gray-700">Rs. {item.price}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Home;
