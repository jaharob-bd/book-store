import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Nav({ auth }) {
    const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);

    const toggleMenu = () => {
        setDesktopMenuOpen((prev) => !prev);
    };

    return (
        <div>
            <nav className="relative bg-violet-900">
                <div className="mx-auto hidden h-12 w-full max-w-[1200px] items-center md:flex">
                    <button
                        className="ml-5 flex h-full w-40 cursor-pointer items-center justify-center bg-amber-400"
                        onClick={toggleMenu}
                    >
                        <div className="flex justify-around">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="mx-1 h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                            All categories
                        </div>
                    </button>
                    <div className="mx-7 flex gap-8">
                        <Link href="/" className="font-light text-white duration-100 hover:text-yellow-400 hover:underline">Home</Link>
                        <Link href={route('shop')} className="font-light text-white duration-100 hover:text-yellow-400 hover:underline">Shop</Link>
                        <Link href={route('about')} className="font-light text-white duration-100 hover:text-yellow-400 hover:underline">About Us</Link>
                        <Link href={route('contact')} className="font-light text-white duration-100 hover:text-yellow-400 hover:underline">Contact Us</Link>
                    </div>
                    <div className="ml-auto flex gap-4 px-5">

                        {auth ? (
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="font-light text-white duration-100 hover:text-yellow-400 hover:underline"
                            >
                                Logout
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="font-light text-white duration-100 hover:text-yellow-400 hover:underline">
                                    Login
                                </Link>
                                <span className="text-white">|</span>
                                <Link
                                    href={route('register')} className="font-light text-white duration-100 hover:text-yellow-400 hover:underline">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            {/* Menu */}
            {desktopMenuOpen && (
                <section className="absolute left-0 right-0 z-10 w-full border-b border-r border-l bg-white">
                    <div className="mx-auto flex max-w-[1200px] py-10">
                        <div className="w-[300px] border-r">
                            <ul className="px-5">
                                <li className="active:blue-900 flex items-center gap-2 bg-amber-400 py-2 px-3 active:bg-amber-400">
                                    {/* <img width="15px" height="15px" src="./assets/images/bed.svg" alt="Bedroom icon" /> */}
                                    Bedroom
                                    <span className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                    </span>
                                </li>
                                <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-amber-400">
                                    {/* <img width="15px" height="15px" src="./assets/images/sleep.svg" alt="bedroom icon" /> */}
                                    Matrass
                                    <span className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                    </span>
                                </li>
                                <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-amber-400">
                                    {/* <img width="15px" height="15px" src="./assets/images/outdoor.svg" alt="bedroom icon" /> */}
                                    Outdoor
                                    <span className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                    </span>
                                </li>
                                <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-amber-400">
                                    {/* <img width="15px" height="15px" src="./assets/images/sofa.svg" alt="bedroom icon" /> */}
                                    Sofa
                                    <span className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                    </span>
                                </li>
                                <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-amber-400">
                                    {/* <img width="15px" height="15px" src="./assets/images/kitchen.svg" alt="bedroom icon" /> */}
                                    Kitchen
                                    <span className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                    </span>
                                </li>
                                <li className="active:blue-900 flex items-center gap-2 py-2 px-3 hover:bg-neutral-100 active:bg-amber-400">
                                    {/* <img width="15px" height="15px" src="./assets/images/food.svg" alt="Food icon" /> */}
                                    Living room
                                    <span className="ml-auto"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        {/* Menu content */}
                        <div className="flex w-full justify-between">
                            <div className="flex gap-6">
                                <div className="mx-5">
                                    <p className="font-medium text-gray-500">BEDS</p>
                                    <ul className="text-sm leading-8">
                                        <li><a href="product-overview.html">Italian bed</a></li>
                                        <li><a href="product-overview.html">Queen-size bed</a></li>
                                        <li><a href="product-overview.html">Wooden craft bed</a></li>
                                        <li><a href="product-overview.html">King-size bed</a></li>
                                    </ul>
                                </div>
                                <div className="mx-5">
                                    <p className="font-medium text-gray-500">LAMPS</p>
                                    <ul className="leading-8 text-sm">
                                        <li>
                                            <a href="/product-overview.html">Italian Purple Lamp</a>
                                        </li>
                                        <li>
                                            <a href="/product-overview.html">APEX Lamp</a>
                                        </li>
                                        <li>
                                            <a href="/product-overview.html">PIXAR lamp</a>
                                        </li>
                                        <li>
                                            <a href="/product-overview.html">Ambient Nightlamp</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mx-5">
                                    <p className="font-medium text-gray-500">BEDSIDE TABLES</p>
                                    <ul className="text-sm leading-8">
                                        <li><a href="product-overview.html">Purple Table</a></li>
                                        <li><a href="product-overview.html">Easy Bedside</a></li>
                                        <li><a href="product-overview.html">Soft Table</a></li>
                                        <li><a href="product-overview.html">Craft Table</a></li>
                                    </ul>
                                </div>
                                <div className="mx-5">
                                    <p className="font-medium text-gray-500">SPECIAL</p>
                                    <ul className="text-sm leading-8">
                                        <li><a href="product-overview.html">Humidifier</a></li>
                                        <li><a href="product-overview.html">Bed Cleaner</a></li>
                                        <li><a href="product-overview.html">Vacuum Cleaner</a></li>
                                        <li><a href="product-overview.html">Pillow</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
