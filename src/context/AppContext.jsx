import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);

    // Authentication
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

    // Cart Management
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existing = prevCart.find((item) => item.id === product.id);
            if (existing) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    };

    // Wishlist Management
    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                return prev.filter((item) => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    // Load state from local storage on init
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) setUser(JSON.parse(savedUser));

        const savedCart = localStorage.getItem('cart');
        if (savedCart) setCart(JSON.parse(savedCart));

        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    }, []);

    // Save state to local storage
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
                loading,
                setLoading
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
