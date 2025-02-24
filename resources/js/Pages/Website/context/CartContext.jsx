// context/CartContext.js
import SwalAlert from '@/Components/Alert/SwalAlert';
import React, { createContext, useState, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
// Create Cart Context
export const CartContext = createContext([]);

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

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);

            if (existingProduct) {
                SwalAlert('success', product.name + ' updated quantity');
                // Update only the `quantity` column
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 } // Only `quantity` is updated
                        : item
                );
            } else {
                // alert success
                SwalAlert('success', product.name + ' Add to cart');
                // Add new product with specific columns
                return [
                    ...prevCart,
                    {
                        id: product.id,
                        name: product.name,
                        price: product.sale_price,
                        mrpPrice: product.mrp_price,
                        categoryName: product.category_name,
                        quantity: 1, // Set initial quantity
                    },
                ];
            }
        });
    };

    const removeCart = (product_id) => {
        const prevCart = [...cart];
        const newCart = prevCart.filter(item => item.id !== product_id);
        setCart(newCart);
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeCart }}>
            {children}
        </CartContext.Provider>
    );
};
