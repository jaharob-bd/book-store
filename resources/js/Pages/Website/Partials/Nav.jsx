import { useState } from 'react';
export default function Nav({isMobileMenuOpen, isMenDropdownOpen, toggleMenDropdown}) {

    // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // const [isMenDropdownOpen, setIsMenDropdownOpen] = useState(false);

    // const toggleMobileMenu = () => {
    //     setIsMobileMenuOpen(!isMobileMenuOpen);
    // };

    // const toggleMenDropdown = () => {
    //     setIsMenDropdownOpen(!isMenDropdownOpen);
    // };

    // console.log(isMobileMenuOpen + ' menu open');
    // console.log(toggleMenDropdown + ' toggle open');
    // console.log(isMenDropdownOpen + ' drop down open');
    return (
        <div>
            <nav
                id="mobile-menu"
                className={`lg:hidden flex flex-col items-center space-y-8 ${isMobileMenuOpen ? 'block' : 'hidden'
                    }`}
            >
                <ul className="w-full text-center">
                    <li><a href="index.html" className="hover:text-secondary font-bold block py-2">Home</a></li>
                    {/* Men Dropdown */}
                    <li className="relative group" x-data="{ open: false }">
                        <button
                            onClick={toggleMenDropdown}
                            className="hover:text-secondary font-bold flex justify-center items-center w-full"
                        >
                            <span>Men</span>
                            <span>
                            </span>
                        </button>
                        <ul className={`pl-4 ${isMenDropdownOpen ? 'block' : 'hidden'}`}>
                            <li><a href="shop.html" className="hover:text-secondary font-bold block pt-2 pb-3">Shop Men</a></li>
                            <li><a href="single-product-page.html" className="hover:text-secondary font-bold block py-2">Men item 1</a></li>
                            <li><a href="single-product-page.html" className="hover:text-secondary font-bold block py-2">Men item 2</a></li>
                            <li><a href="single-product-page.html" className="hover:text-secondary font-bold block py-2">Men item 3</a></li>
                        </ul>
                    </li>
                    {/* Women Dropdown */}
                    <li className="relative group" x-data="{ open: false }">
                        <a className="hover:text-secondary font-bold block py-2 justify-center items-center cursor-pointer">
                            <span>Women</span>
                            <span >

                            </span>
                        </a>
                        <ul className="mobile-dropdown-menu" x-show="open" x-transition>
                            <li><a href="shop.html" className="hover:text-secondary font-bold block py-2">Shop Women</a></li>
                            <li><a href="single-product-page.html" className="hover:text-secondary font-bold block py-2">Women item 1</a></li>
                            <li><a href="single-product-page.html" className="hover:text-secondary font-bold block py-2">Women item 2</a></li>
                            <li><a href="single-product-page.html" className="hover:text-secondary font-bold block py-2">Women item 3</a></li>
                        </ul>
                    </li>
                    <li><a href="shop.html" className="hover:text-secondary font-bold block py-2">Shop</a></li>
                    <li><a href="single-product-page.html" className="hover:text-secondary font-bold block py-2">Product</a></li>
                    <li><a href="404.html" className="hover:text-secondary font-bold block py-2">404 page</a></li>
                    <li><a href="checkout.html" className="hover:text-secondary font-bold block py-2">Checkout</a></li>
                </ul>
                <div className="flex flex-col mt-6 space-y-2 items-center">
                    <a href="register.html" className="bg-primary hover:bg-transparent text-white hover:text-primary border border-primary font-semibold px-4 py-2 rounded-full flex items-center justify-center min-w-[110px]">Register</a>
                    <a href="register.html" className="bg-primary hover:bg-transparent text-white hover:text-primary border border-primary font-semibold px-4 py-2 rounded-full flex items-center justify-center min-w-[110px]">Login</a>
                    <a href="register.html" className="bg-primary hover:bg-transparent text-white hover:text-primary border border-primary font-semibold px-4 py-2 rounded-full flex items-center justify-center min-w-[110px]">Cart -&nbsp;<span>5</span>&nbsp;items</a>
                </div>
                {/* Search field */}
                <div className="  top-full right-0 mt-2 w-full bg-white shadow-lg p-2 rounded">
                    <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Search for products..." />
                </div>
            </nav>
        </div>
    )
}