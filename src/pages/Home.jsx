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

            {/* Everyday Deals */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold uppercase tracking-wider mb-12 border-b-2 border-primary inline-block pb-2">
                    Everyday Deals
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Denim Days",
                            tag: "Flash Sale",
                            img: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800"
                        },
                        {
                            title: "Summer Essentials",
                            tag: "New Arrival",
                            img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800"
                        },
                        {
                            title: "Accessory Bloom",
                            tag: "Best Seller",
                            img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800"
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="h-64 bg-gray-200 rounded-xl overflow-hidden group relative cursor-pointer">
                            <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <span className="text-sm font-bold uppercase bg-primary px-2 py-1 mb-2 inline-block">
                                    {item.tag}
                                </span>
                                <h3 className="text-2xl font-black">{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Trending Products */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold uppercase tracking-wider mb-12 border-b-2 border-primary inline-block pb-2">
                    Trending This Week
                </h2>
                <TrendingProducts />
            </section>
        </div>
    );
};

const TrendingProducts = () => {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        import('axios').then(axios => {
            axios.default
                .get('https://jsonplaceholder.typicode.com/posts?_limit=4')
                .then(res => {

                    const images = [
                        "https://images.unsplash.com/photo-1521334884684-d80222895322",
                        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
                        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
                        "https://images.unsplash.com/photo-1520975916090-3105956dac38"
                    ];

                    const mockTrending = res.data.map((post, idx) => ({
                        id: post.id + 100,
                        name: post.title.split(' ').slice(0, 3).join(' '),
                        price: 1500 + (idx * 200),
                        image: `${images[idx]}?q=80&w=600`,
                        category: "Trending"
                    }));

                    setTrending(mockTrending);
                    setLoading(false);
                });
        });
    }, []);

    if (loading) {
        return <div className="text-center py-10 font-bold text-gray-400">Fetching trends...</div>;
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {trending.map(item => (
                <Link to={`/product/${item.id}`} key={item.id} className="group relative">
                    <div className="aspect-[3/4] overflow-hidden rounded">
                        <img
                            src={item.image}
                            alt={item.name}
                            onError={(e) => {
                                e.target.src = "https://via.placeholder.com/600x800?text=No+Image";
                            }}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
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