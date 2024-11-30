// context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';

// Create Cart Context
export const CartContext = createContext();

// Create the CartProvider
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = secureLocalStorage.getItem("cart");
        return storedCart ? storedCart : [];
    });

    // Sync cart to localStorage
    useEffect(() => {
        secureLocalStorage.setItem("cart", cart);
    }, [cart]);
    console.log('cart loaded', cart);

    // Function to add items to the cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
