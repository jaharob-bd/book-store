import { useState, useEffect } from 'react';
import WebLayout from './Layout/WebLayout';
import { Link } from '@inertiajs/react';
import Filter from './Partials/Filter';
import TopFilter from './Partials/TopFilter';
import secureLocalStorage from "react-secure-storage";

export default function Index({ auth, products }) {
    // const [cart, setCart] = useState([]);
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
        // const product = prevCart.find(item => item.id === product_id);
        // // Remove from cart
        const newCart = prevCart.filter(item => item.id !== product_id);
        setCart(newCart);
        // setCart(prevCart => prevCart.map(item => item.id === product_id ? { ...item, quantity: item.quantity - 1 } : item));
    };

    return (
        <div>
            <WebLayout auth={auth}>
                <section id="shop">
                    <div className="card-header cart justify-center p-4 bg-slate-300">
                        <h2>Cart: <span className="bg-red-500 bg-rounded p-1 rounded-full">{cart.length}</span></h2>
                        {cart.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            <ul>
                                {cart.map((item, i) => (
                                    <li className="p-1" key={item.id}>
                                        {i + 1}. {item.name} -  ৳ {item.sale_price} x {item.quantity}
                                        <button onClick={() => removeCart(item.id)} className="rounded-full bg-red-700 px-1"> x </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <Link href={route('checkout')}>
                        checkout
                    </Link>
                    <div className="container mx-auto">
                        {/* <TopFilter /> */}
                        <div className="flex flex-col md:flex-row">
                            {/* <Filter /> */}
                            {/* Products List */}
                            <div className="w-full md:w-3/4 p-4">
                                {/* Products grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {/* products map */}
                                    {products.map((product, index) => (
                                        <div key={index} className="bg-white p-2 rounded-lg shadow">
                                            <Link href={`shop/${product.url_key}`}>
                                                <img src="assets/images/default.png" alt="Product 1" className="w-full object-cover mb-4 rounded-lg" />
                                                <a href="#" className="text-lg font-semibold mb-2">{product.name}</a>
                                                <p className="my-2">{product.category_name}</p>
                                                <div className="flex items-center mb-4">
                                                    <span className="text-lg font-bold text-gray-900">{product.sale_price}</span>
                                                </div>
                                            </Link>
                                            <button
                                                onClick={() => addToCart(product)} // Corrected the function call
                                                className="bg-indigo-500 border border-indigo-500 hover:bg-red-500 hover:border-primary text-white hover:text-primary font-semibold py-2 px-4 rounded-full w-full"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {/* Pagination */}
                                <div className="flex justify-center mt-8">
                                    <nav aria-label="Page navigation">
                                        <ul className="inline-flex space-x-2">
                                            <li>
                                                <a href="#" className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full">1</a>
                                            </li>
                                            <li>
                                                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary hover:text-white">2</a>
                                            </li>
                                            <li>
                                                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary hover:text-white">3</a>
                                            </li>
                                            <li>
                                                <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full">Next</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </WebLayout>
        </div >
    );
}