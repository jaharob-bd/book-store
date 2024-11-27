import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import WebLayout from './Layout/WebLayout';
import secureLocalStorage from "react-secure-storage";

export default function Gift({ auth }) {
    const [cart, setCart] = useState(() => {
        const storedCart = secureLocalStorage.getItem("cart");
        return storedCart ? storedCart : [];
    });

    // Save cart to local storage whenever it changes
    useEffect(() => {
        secureLocalStorage.setItem("cart", cart);
    }, [cart]);

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
                    <div className="container mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold text-center mb-8">Order as Gift</h1>
                        <div className="flex flex-wrap -mx-4">
                            {/* Billing Information */}
                            <div className="w-full lg:w-2/3 px-4 mb-4 lg:mb-0">
                                <h2 className="text-2xl font-semibold mb-4">Billing Details</h2>
                                <form id="billing-form" className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                                            <input type="text" id="name" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe" required />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                                            <input type="email" id="email" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="john@example.com" required />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
                                        <input type="text" id="address" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="123 Main Street" required />
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="mb-4">
                                            <label htmlFor="city" className="block text-gray-700 font-medium mb-2">City</label>
                                            <input type="text" id="city" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="City" required />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="country" className="block text-gray-700 font-medium mb-2">Country</label>
                                            <select id="country" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" required>
                                                <option value="" disabled selected>Choose...</option>
                                                <option>Bangladesh</option>
                                                <option>India</option>
                                                <option>USA</option>
                                                <option>UK</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="zip" className="block text-gray-700 font-medium mb-2">Zip Code</label>
                                        <input type="text" id="zip" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="12345" required />
                                    </div>
                                </form>
                            </div>

                            {/* Order Summary */}
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
                                </div>
                            </div>
                        </div>

                        {/* Payment Method Selection */}
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold mb-4">Select Payment Method</h2>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="space-y-4">
                                    {/* Cash on Delivery */}
                                    <div className="flex items-center">
                                        <input type="radio" id="cod" name="paymentMethod" className="mr-3" />
                                        <label htmlFor="cod" className="text-lg">Cash on Delivery</label>
                                    </div>

                                    {/* Mobile Payment */}
                                    <div className="flex items-center">
                                        <input type="radio" id="mobile" name="paymentMethod" className="mr-3" />
                                        <label htmlFor="mobile" className="text-lg">Mobile Payment</label>
                                    </div>

                                    {/* Credit/Debit Card */}
                                    <div className="flex items-center">
                                        <input type="radio" id="card" name="paymentMethod" className="mr-3" />
                                        <label htmlFor="card" className="text-lg">Credit/Debit Card</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex justify-between">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition w-full md:w-auto">
                                Place Order
                            </button>
                            <Link href={'/'}
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition w-full md:w-auto">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </section>

            </WebLayout>
        </div>
    );
}