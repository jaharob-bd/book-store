import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import WebLayout from './Layout/WebLayout';
import secureLocalStorage from "react-secure-storage";

export default function Checkout({ auth }) {
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
                        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
                        <div className="flex flex-wrap -mx-4">
                            {/* Billing Information */}
                            <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                                <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
                                <form id="billing-form" className="bg-white p-6 rounded-lg shadow-md">
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                                        <input type="text" id="name" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe" required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                                        <input type="email" id="email" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="john@example.com" required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
                                        <input type="text" id="address" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="123 Main Street" required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="city" className="block text-gray-700 font-medium mb-2">City</label>
                                        <input type="text" id="city" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="City" required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="country" className="block text-gray-700 font-medium mb-2">Country</label>
                                        <select id="country" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" required>
                                            <option value disabled selected>Choose...</option>
                                            <option>Bangladesh</option>
                                            <option>India</option>
                                            <option>USA</option>
                                            <option>UK</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="zip" className="block text-gray-700 font-medium mb-2">Zip Code</label>
                                        <input type="text" id="zip" className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder={12345} required />
                                    </div>
                                </form>
                            </div>
                            {/* Order Summary */}
                            <div className="w-full lg:w-1/2 px-4">
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                                    {cart.length === 0 ? (
                                        <p>Your cart is empty.</p>
                                    ) : (
                                        <ul className="divide-y divide-gray-200 mb-6">
                                            {cart.map((item, i) => (
                                                <li className="flex justify-between py-3" key={item.id}>
                                                    <span>{i + 1}. {item.name} </span> <span> ৳ {item.sale_price} x {item.quantity}</span>
                                                    <button onClick={() => removeCart(item.id)} className="rounded-full bg-red-700 px-1"> x </button>
                                                </li>
                                            ))}
                                            <li className="flex justify-between py-3 font-semibold">
                                                <span>Total</span>
                                                <span>৳ {cart.reduce((total, item) => total + item.sale_price * item.quantity, 0)}</span>
                                            </li>
                                        </ul>
                                    )}

                                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                                    <div className="space-y-3 mb-6">
                                        <div>
                                            <input type="radio" id="creditCard" name="paymentMethod" defaultValue="credit" className="mr-2" />
                                            <label htmlFor="creditCard">Credit Card</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="paypal" name="paymentMethod" defaultValue="paypal" className="mr-2" />
                                            <label htmlFor="paypal">PayPal</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="cod" name="paymentMethod" defaultValue="cod" className="mr-2" />
                                            <label htmlFor="cod">Cash on Delivery</label>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="flex flex-col md:flex-row md:justify-between">
                                        <button type="submit" form="billing-form" className="w-full md:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition mb-2 md:mb-0">Place Order</button>
                                        <Link href={'/'} className="w-full md:w-auto bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition text-center">
                                            Continue Shopping
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </WebLayout>
        </div>
    );
}