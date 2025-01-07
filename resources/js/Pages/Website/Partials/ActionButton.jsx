import React from 'react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from '@inertiajs/react';
import { WishListContext } from '../context/WishListContext';

const ActionButton = () => {
    const { cart } = useContext(CartContext);
    const { wishList } = useContext(WishListContext);
    const cartCount = cart.length;
    const wishlistCount = wishList.length;
    const loveCount = 0;

    return (
        <div>
            <div className="fixed z-50 top-1/2 transform -translate-y-1/2 right-4 flex flex-col justify-center items-center space-y-6 w-20">
                <div className="relative">
                    <Link href={route('cart')}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-4 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                                <path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z" clipRule="evenodd" />
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
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
