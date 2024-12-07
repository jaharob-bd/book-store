// context/WishListContext.js
import React, { createContext, useState, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';

// Create WishList Context
export const WishListContext = createContext([]);

// Create the WishListProvider
export const WishListProvider = ({ children }) => {
    const [wishList, setWishList] = useState(() => {
        const storedWishList = secureLocalStorage.getItem("wishList");
        return storedWishList ? storedWishList : [];
    });
    // Sync WishList to localStorage
    useEffect(() => {
        secureLocalStorage.setItem("wishList", wishList);
    }, [wishList]);


    const addToWishList = (product) => {
        setWishList((prevWishList) => {
            const existingProduct = prevWishList.find((item) => item.id === product.id);
            if (existingProduct) {
                // If product exists, update its quantity
                return prevWishList.map((item) =>
                    item.id === product.id
                        ? { ...item }
                        : item
                );
            } else {
                // If product doesn't exist, add it to the WishList
                return [...prevWishList, { ...product }];
            }
        });
    };

    const removeWishList = (product_id) => {
        const prevWishList = [...wishList];
        const newWishList = prevWishList.filter(item => item.id !== product_id);
        setWishList(newWishList);
    };

    return (
        <WishListContext.Provider value={{ wishList, setWishList, addToWishList, removeWishList }}>
            {children}
        </WishListContext.Provider>
    );
};
