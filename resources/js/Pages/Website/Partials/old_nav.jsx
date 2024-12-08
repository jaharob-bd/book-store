import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Nav_old({ auth }) {
    // console.log('auth', auth);
    return (
        <div>
            <nav className="bg-gray-800">
                <div className="container flex">
                    <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
                        <span className="text-white">
                            <i className="fa-solid fa-bars" />
                        </span>
                        <span className="capitalize ml-2 text-white hidden">All Categories</span>
                        {/* dropdown */}
                        <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
                            <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <img src="assets/images/icons/sofa.svg" alt="sofa" className="w-5 h-5 object-contain" />
                                <span className="ml-6 text-gray-600 text-sm">Sofa</span>
                            </a>
                            <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <img src="assets/images/icons/terrace.svg" alt="terrace" className="w-5 h-5 object-contain" />
                                <span className="ml-6 text-gray-600 text-sm">Terarce</span>
                            </a>
                            <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <img src="assets/images/icons/bed.svg" alt="bed" className="w-5 h-5 object-contain" />
                                <span className="ml-6 text-gray-600 text-sm">Bed</span>
                            </a>
                            <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <img src="assets/images/icons/office.svg" alt="office" className="w-5 h-5 object-contain" />
                                <span className="ml-6 text-gray-600 text-sm">office</span>
                            </a>
                            <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <img src="assets/images/icons/outdoor-cafe.svg" alt="outdoor" className="w-5 h-5 object-contain" />
                                <span className="ml-6 text-gray-600 text-sm">Outdoor</span>
                            </a>
                            <a href="#" className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <img src="assets/images/icons/bed-2.svg" alt="Mattress" className="w-5 h-5 object-contain" />
                                <span className="ml-6 text-gray-600 text-sm">Mattress</span>
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
                        <div className="flex items-center space-x-6 capitalize">
                            <Link href="/" className="text-gray-200 hover:text-white transition">Home</Link>
                            <Link href={route('shop')} className="text-gray-200 hover:text-white transition">Shop</Link>
                            <a href="#" className="text-gray-200 hover:text-white transition">About us</a>
                            <a href="#" className="text-gray-200 hover:text-white transition">Contact us</a>
                        </div>
                        {auth ? (
                            <>  </>
                            // <Link href={route('logout')} className="text-gray-200 hover:text-white transition">Logout</Link>
                        ) : (
                            <Link href={route('register')} className="flex items-center space-x-2 text-gray-200 hover:text-white transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0 2c-3.18 0-6 1.64-6 4v2h12v-2c0-2.36-2.82-4-6-4zm8-2v2m0 0h2m-2 0h-2" />
                                </svg>
                                <span>Sign Up</span>
                            </Link>
                        )}
                    </div>
                </div>
            </nav >
        </div >
    )
}