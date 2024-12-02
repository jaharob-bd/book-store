import React from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from '@inertiajs/react';
import { WishListContext } from '../context/WishListContext';

const ActionButton = () => {
    const { cart } = useContext(CartContext);
    const { WishList } = useContext(WishListContext);
    const cartCount = cart.length;
    const wishlistCount = WishList.length;
    const loveCount = 0;

    return (
        <div>
            <div className="fixed top-1/2 transform -translate-y-1/2 right-4 flex flex-col justify-center items-center space-y-6 w-20">
                <div className="relative">
                    <Link href={route('cart')}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-4 rounded-full flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l1.35-7H5.65M7 13l-.35 2M17 13l.35 2m-10.7 0h10.7m-6 4h2m-2-4a4 4 0 100 8h-2a4 4 0 100-8h2z"
                                />
                            </svg>
                        </button>
                    </Link>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                        {cartCount}
                    </span>
                </div>

                {/* Wishlist Button */}
                <div className="relative">
                    <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold p-4 rounded-full flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3.172 3.172a4 4 0 015.656 0l.172.172.172-.172a4 4 0 115.656 5.656L12 12.172l-3.828-3.828a4 4 0 00-5.656 0 4 4 0 000 5.656L12 21.828l9.172-9.172a4 4 0 00-5.656-5.656L12 3.172"
                            />
                        </svg>
                    </button>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                        {wishlistCount}
                    </span>
                </div>

                {/* Love Button */}
                <div className="relative">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold p-4 rounded-full flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 15l7-7 7 7"
                            />
                        </svg>
                    </button>
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                        {loveCount}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ActionButton;
