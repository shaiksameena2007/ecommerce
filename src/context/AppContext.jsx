import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);

    // 🔥 Normalize product data
    const formatProduct = (product) => ({
        id: product.id,
        name: product.name || product.title,
        image: product.image || product.thumbnail || product.images?.[0],
        category: product.category,
        price: product.price,
    });

    // ================= AUTH =================
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const signup = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // ================= CART =================
    const addToCart = (product) => {
        const formatted = formatProduct(product);

        setCart((prevCart) => {
            const existing = prevCart.find((item) => item.id === formatted.id);

            if (existing) {
                return prevCart.map((item) =>
                    item.id === formatted.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevCart, { ...formatted, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            )
        );
    };

    // ================= WISHLIST =================
    const toggleWishlist = (product) => {
        const formatted = formatProduct(product);

        setWishlist((prev) => {
            const exists = prev.find((item) => item.id === formatted.id);

            if (exists) {
                return prev.filter((item) => item.id !== formatted.id);
            }

            return [...prev, formatted];
        });
    };

    // 🔥 NEW: Move to Cart + Remove from Wishlist
    const moveToCart = (product) => {
        const formatted = formatProduct(product);

        // Add to cart
        setCart((prevCart) => {
            const existing = prevCart.find((item) => item.id === formatted.id);

            if (existing) {
                return prevCart.map((item) =>
                    item.id === formatted.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevCart, { ...formatted, quantity: 1 }];
        });

        // Remove from wishlist
        setWishlist((prev) => prev.filter((item) => item.id !== formatted.id));
    };

    // ================= LOAD =================
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) setUser(JSON.parse(savedUser));

        const savedCart = localStorage.getItem('cart');
        if (savedCart) setCart(JSON.parse(savedCart));

        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    }, []);

    // ================= SAVE =================
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    return (
        <AppContext.Provider
            value={{
                user,
                login,
                logout,
                signup,
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                wishlist,
                toggleWishlist,
                moveToCart, // ✅ NEW FUNCTION
                loading,
                setLoading
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);