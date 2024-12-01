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
                    {/* breadcrumb */}
                    <div className="container py-4 flex items-center gap-3">
                        <a href="../index.html" className="text-primary text-base">
                            <i className="fa-solid fa-house" />
                        </a>
                        <span className="text-sm text-gray-400">
                            <i className="fa-solid fa-chevron-right" />
                        </span>
                        <p className="text-gray-600 font-medium">Order as Gift</p>
                    </div>
                    {/* ./breadcrumb */}
                    {/* wrapper */}
                    <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
                        <div className="col-span-8 border border-gray-200 p-4 rounded">
                            <h3 className="text-lg font-medium capitalize mb-4">Order as Gift</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="first-name" className="text-gray-600">First Name <span className="text-primary">*</span></label>
                                        <input type="text" name="first-name" id="first-name" className="input-box" />
                                    </div>
                                    <div>
                                        <label htmlFor="last-name" className="text-gray-600">Last Name <span className="text-primary">*</span></label>
                                        <input type="text" name="last-name" id="last-name" className="input-box" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="phone" className="text-gray-600">Phone number</label>
                                        <input type="text" name="phone" id="phone" className="input-box" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="text-gray-600">Email address</label>
                                        <input type="email" name="email" id="email" className="input-box" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="address" className="text-gray-600">Street address</label>
                                        <input type="text" name="address" id="address" className="input-box" />
                                    </div>
                                    <div>
                                        <label htmlFor="city" className="text-gray-600">City</label>
                                        <input type="text" name="city" id="city" className="input-box" />
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-lg font-medium capitalize mb-4 pt-4">Payment Method</h3>
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
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h11M9 21V3m-6 4h6M15 9h5m0 0l-3 3m3-3l-3-3" />
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
                                            <img src="/icons/bikash-logo.svg" alt="Bikash" className="w-6 h-6" />
                                            Mobile Payment (Bikash)
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
                                            <img src="/icons/nagad-logo.svg" alt="Nagad" className="w-6 h-6" />
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
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h11M9 21V3m-6 4h6M15 9h5m0 0l-3 3m3-3l-3-3" />
                                            </svg>
                                            Credit/Debit Card
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 border border-gray-200 p-4 rounded">
                            <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">order summary</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <div>
                                        <h5 className="text-gray-800 font-medium">Italian shape sofa</h5>
                                        <p className="text-sm text-gray-600">Size: M</p>
                                    </div>
                                    <p className="text-gray-600">
                                        x3
                                    </p>
                                    <p className="text-gray-800 font-medium">$320</p>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <h5 className="text-gray-800 font-medium">Italian shape sofa</h5>
                                        <p className="text-sm text-gray-600">Size: M</p>
                                    </div>
                                    <p className="text-gray-600">
                                        x3
                                    </p>
                                    <p className="text-gray-800 font-medium">$320</p>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <h5 className="text-gray-800 font-medium">Italian shape sofa</h5>
                                        <p className="text-sm text-gray-600">Size: M</p>
                                    </div>
                                    <p className="text-gray-600">
                                        x3
                                    </p>
                                    <p className="text-gray-800 font-medium">$320</p>
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <h5 className="text-gray-800 font-medium">Italian shape sofa</h5>
                                        <p className="text-sm text-gray-600">Size: M</p>
                                    </div>
                                    <p className="text-gray-600">
                                        x3
                                    </p>
                                    <p className="text-gray-800 font-medium">$320</p>
                                </div>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                                <p>Subtotal</p>
                                <p>৳ {cart.reduce((total, item) => total + item.sale_price * item.quantity, 0)}</p>
                            </div>
                            <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                                <p>Delivery Fee</p>
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

                            <div className="grid grid-cols-2 gap-4">
                                <a href="#" className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium">Place
                                    Place Order
                                </a>
                                <Link href={route('shop')}
                                    className="block w-full py-3 px-4 text-center text-white bg-orange-400 border border-orange-400 rounded-md hover:bg-transparent hover:text-primary transition font-medium">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </WebLayout>
        </div>
    );
}