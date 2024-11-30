import { useState, useEffect } from 'react';
import WebLayout from './Layout/WebLayout';
import { Link } from '@inertiajs/react';
import Filter from './Partials/Filter';
import TopFilter from './Partials/TopFilter';
import secureLocalStorage from "react-secure-storage";
import Banner from './Home/Banner';
import Features from './Home/Features';
import Categories from './Home/Categories';
import NewArrival from './Home/NewArrival';
import Ads from './Home/Ads';

export default function Index({ auth, products }) {
    // Initialize cart state with data from secureLocalStorage
    const [cart, setCart] = useState(() => {
        const storedCart = secureLocalStorage.getItem("cart");
        return storedCart ? storedCart : [];
    });

    // Save cart to local storage whenever it changes
    useEffect(() => {
        secureLocalStorage.setItem("cart", cart);
    }, [cart]);

    // Function to handle adding products to the cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                // If product exists, update its quantity
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // If product doesn't exist, add it to the cart
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeCart = (product_id) => {
        // remove from cart
        const prevCart = [...cart];
        const newCart = prevCart.filter(item => item.id !== product_id);
        setCart(newCart);
    };

    return (
        <WebLayout auth={auth}>
            <Banner />
            <Features />
            <Categories />
            <NewArrival />
            <Ads />
            <div className="container pb-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">recomended for you</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <div key={index} className="bg-white shadow rounded overflow-hidden group">
                            <div className="relative">
                                <img src="assets/images/products/product1.jpg" alt="product 1" className="w-full" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                    <a href="#" className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="view product">
                                        <i className="fa-solid fa-magnifying-glass" />
                                    </a>
                                    <a href="#" className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="add to wishlist">
                                        <i className="fa-solid fa-heart" />
                                    </a>
                                </div>
                            </div>
                            <div className="pt-4 pb-3 px-4">
                                <a href="#">
                                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">{product.name}</h4>
                                </a>
                                <div className="flex items-baseline mb-1 space-x-2">
                                    <p className="text-xl text-primary font-semibold">{product.sale_price}</p>
                                    <p className="text-sm text-gray-400 line-through">{product.mrp_price}</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex gap-1 text-sm text-yellow-400">
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                    </div>
                                    <div className="text-xs text-gray-500 ml-3">(150)</div>
                                </div>
                            </div>
                            <button onClick={() => addToCart(product)} href="#" className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">
                                Add to cart
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </WebLayout>
    );
}