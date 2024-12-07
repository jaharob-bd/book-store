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
        const prevCart = [...cart];
        const newCart = prevCart.filter(item => item.id !== product_id);
        setCart(newCart);
    };

    return (
        <WebLayout auth={auth}>

            {/* breadcrumb */}
            <div className="container py-4 flex items-center gap-3">
                <a href="../index.html" className="text-primary text-base">
                    <i className="fa-solid fa-house" />
                </a>
                <span className="text-sm text-gray-400">
                    <i className="fa-solid fa-chevron-right" />
                </span>
                <p className="text-gray-600 font-medium">Checkout</p>
            </div>
            {/* ./breadcrumb */}
            {/* wrapper */}
            <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
                <div className="col-span-8 border border-gray-200 p-4 rounded">
                    <h3 className="text-lg font-medium capitalize mb-4">Payment Method</h3>
                    <div className="grid grid-cols-1 gap-4 space-y-4">
                        {/* Cash on Delivery */}
                        <div className="border border-primary rounded-sm px-3 py-6 flex justify-right items-right gap-5">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="cod"
                                    name="paymentMethod"
                                    value="cash"
                                    className="mr-3"
                                />
                                <label htmlFor="cod" className="flex items-center gap-3 text-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 8h6M9 12h6m-3-9a9 9 0 11-9 9 9 9 0 019-9zM16 16v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2a2 2 0 012-2h6a2 2 0 012 2zm3-1l1.5-1.5M19 15l1.5 1.5" />
                                    </svg>
                                    Cash on Delivery
                                </label>
                            </div>
                        </div>
                        {/* Mobile Payment: Bikash */}
                        <div className="border border-primary rounded-sm px-3 py-6 flex justify-right items-right gap-5">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="bikash"
                                    name="paymentMethod"
                                    value="bikash"
                                    className="mr-3"
                                />
                                <label htmlFor="bikash" className="flex items-center gap-3 text-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm7 14h3m-1-1v2m-5-4a2 2 0 100-4 2 2 0 000 4zm1-4V7m0 6h3" />
                                    </svg>
                                    Mobile Payment (Bkash)
                                </label>
                            </div>
                        </div>
                        {/* Mobile Payment: Nagad */}
                        <div className="border border-primary rounded-sm px-3 py-6 flex justify-right items-right gap-5">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="nagad"
                                    name="paymentMethod"
                                    value="nagad"
                                    className="mr-3"
                                />
                                <label htmlFor="nagad" className="flex items-center gap-3 text-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm5 9h3l-4 4-4-4h3V7h2v4z" />
                                    </svg>
                                    Mobile Payment (Nagad)
                                </label>
                            </div>
                        </div>

                        {/* Credit/Debit Card */}
                        <div className="border border-primary rounded-sm px-3 py-6 flex justify-right items-right gap-5">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="card"
                                    name="paymentMethod"
                                    value="card"
                                    className="mr-3"
                                />
                                <label htmlFor="card" className="flex items-center gap-3 text-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h18a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2zm0 4h18M7 15h2m4 0h2" />
                                    </svg>
                                    Credit/Debit Card
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 border border-gray-200 p-4 rounded">
                    <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">order summary</h4>
                    <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                        <p>subtotal</p>
                        <p>৳ {cart.reduce((total, item) => total + item.sale_price * item.quantity, 0)}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                        <p>shipping</p>
                        <p>৳ 50</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                        <p>Online Fee</p>
                        <p>৳ 10</p>
                    </div>
                    <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
                        <p className="font-semibold">Total</p>
                        <p>৳ {cart.reduce((total, item) => total + item.sale_price * item.quantity, 0) + 50 + 10}</p>
                    </div>
                    <div className="flex items-center mb-4 mt-2">
                        <input type="checkbox" name="aggrement" id="aggrement" className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3" />
                        <label htmlFor="aggrement" className="text-gray-600 ml-3 cursor-pointer text-sm">I agree to the <a href="#" className="text-primary">terms &amp; conditions</a></label>
                    </div>

                    <div className="mt-6">
                        <Link href={route('checkout')}>
                            <button className="block w-full py-3 px-4 text-center text-white bg-indigo-500 border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium mb-4">
                                Process to Checkout
                            </button>
                        </Link>
                        <Link href={route('gift')}>
                            <button className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">
                                Order as Gift
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}