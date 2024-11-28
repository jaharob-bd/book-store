import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import WebLayout from './Layout/WebLayout';
import secureLocalStorage from "react-secure-storage";

export default function Cart({ auth, products }) {
    const [cart, setCart] = useState(() => {
        const storedCart = secureLocalStorage.getItem("cart");
        return storedCart ? storedCart : [];
    });

    // Save cart to local storage whenever it changes
    useEffect(() => {
        secureLocalStorage.setItem("cart", cart);
    }, [cart]);

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
        const prevCart = [...cart];
        const newCart = prevCart.filter(item => item.id !== product_id);
        setCart(newCart);
    };

    return (
        <WebLayout auth={auth}>
            <section id="shop">
                <div className="container mx-auto px-4 py-8">
                    {/* <h1 className="text-3xl font-bold text-center mb-8">Cart</h1> */}
                    <div className="flex flex-wrap lg:flex-nowrap -mx-4">
                        {/* Left Section: Cart List */}
                        <div className="w-full lg:w-2/3 px-4">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                                {cart.length === 0 ? (
                                    <p>Your cart is empty.</p>
                                ) : (
                                    <ul className="divide-y divide-gray-200">
                                        {cart.map((item, i) => (
                                            <li className="flex justify-between py-3" key={item.id}>
                                                <div>
                                                    <span className="font-semibold">{i + 1}. {item.name}</span>
                                                    <p className="text-sm text-gray-500">৳ {item.sale_price} x {item.quantity}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeCart(item.id)}
                                                    className="text-red-700 hover:text-red-900"
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Right Section: Order Summary */}
                        <div className="w-full lg:w-1/3 px-4 mt-6 lg:mt-0">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                                <ul className="space-y-3">
                                    <li className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>৳ {cart.reduce((total, item) => total + item.sale_price * item.quantity, 0)}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Delivery Fee</span>
                                        <span>৳ 50</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Online Fee</span>
                                        <span>৳ 10</span>
                                    </li>
                                    <li className="flex justify-between font-bold">
                                        <span>Total</span>
                                        <span>৳ {cart.reduce((total, item) => total + item.sale_price * item.quantity, 0) + 50 + 10}</span>
                                    </li>
                                </ul>

                                <div className="mt-6">
                                    <Link href={route('checkout')}>
                                        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition mb-4">
                                            Process to Checkout
                                        </button>
                                    </Link>
                                    <Link href={route('gift')}>
                                        <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
                                            Order as Gift
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Suggested Products Section */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-center mb-6">Products for you</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {products.map((product) => (
                                <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-2 rounded-md" />
                                    <h3 className="text-lg font-medium">{product.name}</h3>
                                    <p className="text-gray-500">৳ {product.sale_price}</p>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="w-full mt-2 bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600 transition"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </WebLayout>
    );
}