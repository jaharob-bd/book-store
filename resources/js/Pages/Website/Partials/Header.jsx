// partials/Header.js
import { useState, useEffect, useContext } from 'react';
import { Link } from '@inertiajs/react';
import { CartContext } from '../context/CartContext';
import { WishListContext } from '../context/WishListContext';

export default function Header({ auth }) {
    const { cart } = useContext(CartContext);
    const { WishList } = useContext(WishListContext);

    return (
        <header className="py-4 shadow-sm bg-white">
            <div className="container flex items-center justify-between">
                <a href="index.html">
                    {/* <img src="assets/images/logo.svg" alt="Logo" className="w-32" /> */}
                </a>
                <div className="w-full max-w-xl relative flex">
                    <span className="absolute left-4 top-3 text-lg text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11 4a7 7 0 105.29 12.29l4.71 4.71a1 1 0 001.42-1.42l-4.71-4.71A7 7 0 0011 4zm0 2a5 5 0 110 10A5 5 0 0111 6z" />
                        </svg>
                    </span>
                    <input type="text" name="search" id="search" className="w-full border border-indigo-600 border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex" placeholder="search" />
                    <button className="bg-indigo-600 border border-indigo-600 text-white px-8 pt-3 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex">
                        Search
                    </button>
                </div>
                <div className="flex items-center space-x-4">
                    <Link href={route('Wishlist')} className="text-center text-gray-700 hover:text-primary transition relative">
                        <div className="text-2xl">
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
                        </div>
                        <div className="text-xs leading-3">Wishlist</div>
                        <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                            {WishList.length}
                        </div>
                    </Link>
                    <Link href={route('cart')} className="text-center text-gray-700 hover:text-primary transition relative">
                        <div className="text-2xl">
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
                        </div>
                        <div className="text-xs leading-3">Cart</div>
                        <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                            {cart.length}
                        </div>
                    </Link>
                    {/* if logdin then else login */}
                    {auth ? (
                        // If authenticated
                        <div className="flex items-center space-x-4">
                            {/* Profile Link */}
                            <Link href="" className="text-center text-gray-700 hover:text-primary transition relative">
                                <div className="text-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A8.966 8.966 0 0012 20a8.966 8.966 0 006.879-2.196M12 12a4 4 0 100-8 4 4 0 000 8zm0 0c-2.5 0-4.5 2-4.5 4.5S9.5 21 12 21s4.5-2 4.5-4.5S14.5 12 12 12z" />
                                    </svg>
                                </div>
                                <div className="text-xs leading-3">{auth.name}</div>
                            </Link>
                            {/* Logout Link */}
                            <Link href={route('logout')}
                                method="post"
                                as="button"
                                className="text-center text-gray-700 hover:text-primary transition relative"
                            >
                                <div className="text-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H9m-6 4V8a2 2 0 012-2h4" />
                                    </svg>
                                </div>
                                <div className="text-xs leading-3">Logout</div>
                            </Link>
                        </div>
                    ) : (
                        // If not authenticated
                        <Link href={route('login')} className="text-center text-gray-700 hover:text-primary transition relative">
                            <div className="text-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A8.966 8.966 0 0012 20a8.966 8.966 0 006.879-2.196M12 12a4 4 0 100-8 4 4 0 000 8zm0 0c-2.5 0-4.5 2-4.5 4.5S9.5 21 12 21s4.5-2 4.5-4.5S14.5 12 12 12z" />
                                </svg>
                            </div>
                            <div className="text-xs leading-3">Login</div>
                        </Link>
                        
                    )}
                </div>
            </div>
        </header>
    )
}