import { Link } from '@inertiajs/react';

export default function Header({ auth, toggleMobileMenu }) {

    return (
        <div>
            <header className="bg-indigo-500 sticky top-0 z-10">
                <div className="container mx-auto flex justify-between items-center py-4">
                    {/* Left section: Logo */}
                    <a href="index.html" className="flex items-center">
                        <div>
                            <img src="assets/images/template-white-logo.png" alt="Logo" className="h-14 w-auto mr-4" />
                        </div>
                    </a>
                    {/* Hamburger menu (for mobile) */}
                    <div className="flex lg:hidden">
                        <button
                            id="hamburger"
                            onClick={toggleMobileMenu}
                            className="text-white focus:outline-none lg:hidden"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                    {/* Desktop Menu */}
                    <nav className="hidden lg:flex">
                        <ul className="flex justify-center space-x-4 text-white">
                            <li><a href="index.html" className="hover:text-secondary font-semibold">Home</a></li>
                            {/* Men Dropdown */}
                            <li className="relative group" x-data="{ open: false }">
                                <a href="shop.html" className="hover:text-secondary font-semibold flex items-center">
                                    Men

                                </a>
                            </li>
                            {/* Women Dropdown */}
                            <li className="relative group" x-data="{ open: false }">
                                <a href="shop.html" className="hover:text-secondary font-semibold flex items-center">
                                    Women
                                </a>
                            </li>
                            <li><a href="shop.html" className="hover:text-secondary font-semibold">Shop</a></li>
                            <li><a href="single-product-page.html" className="hover:text-secondary font-semibold">Product</a></li>
                            <li><a href="404.html" className="hover:text-secondary font-semibold">404 page</a></li>
                            <li><a href="checkout.html" className="hover:text-secondary font-semibold">Checkout</a></li>
                        </ul>
                    </nav>
                    {/* Right section: Buttons (for desktop) */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="bg-primary border border-primary hover:bg-transparent text-white hover:text-primary font-semibold px-4 py-2 rounded-full inline-block"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="bg-primary border border-primary hover:bg-transparent text-white hover:text-primary font-semibold px-4 py-2 rounded-full inline-block"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="bg-primary border border-primary hover:bg-transparent text-white hover:text-primary font-semibold px-4 py-2 rounded-full inline-block"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                        <div className="relative group cart-wrapper">
                            <a href="/cart.html">
                                <img src="assets/images/cart-shopping.svg" alt="Cart" className="h-6 w-6 group-hover:scale-120" />
                            </a>
                            {/* Cart dropdown */}
                            <div className="absolute right-0 mt-1 w-80 bg-white shadow-lg p-4 rounded hidden group-hover:block">
                                <div className="space-y-4">
                                    {/* product item */}
                                    <div className="flex items-center justify-between pb-4 border-b border-gray-line">
                                        <div className="flex items-center">
                                            <img src="/assets/images/single-product/1.jpg" alt="Product" className="h-12 w-12 object-cover rounded mr-2" />
                                            <div>
                                                <p className="font-semibold">Summer black dress</p>
                                                <p className="text-sm">Quantity: 1</p>
                                            </div>
                                        </div>
                                        <p className="font-semibold">$25.00</p>
                                    </div>
                                    {/* product item */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <img src="/assets/images/single-product/2.jpg" alt="Product" className="h-12 w-12 object-cover rounded mr-2" />
                                            <div>
                                                <p className="font-semibold">Black suit</p>
                                                <p className="text-sm">Quantity: 1</p>
                                            </div>
                                        </div>
                                        <p className="font-semibold">$125.00</p>
                                    </div>
                                </div>
                                <a href="/cart.html" className="block text-center mt-4 border border-primary bg-primary hover:bg-transparent text-white hover:text-primary py-2 rounded-full font-semibold">Go to Cart</a>
                            </div>
                        </div>
                        <a id="search-icon" href="javascript:void(0);" className="text-white hover:text-secondary group">
                            <img src="assets/images/search-icon.svg" alt="Search" className="h-6 w-6 transition-transform transform group-hover:scale-120" />
                        </a>
                        {/* Search field */}
                        <div id="search-field" className="hidden absolute top-full right-0 mt-2 w-full bg-white shadow-lg p-2 rounded">
                            <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Search for products..." />
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}