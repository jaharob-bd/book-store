import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };



    // <link rel="preconnect" href="https://fonts.googleapis.com">
    // <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    // <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet">

    // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">    
    // <link rel="stylesheet" href="assets/css/styles.css">
    // <link rel="stylesheet" href="node_modules/swiper/swiper-bundle.css">
    // <link rel="stylesheet" href="assets/css/custom.css"></link>

    return (
        <div>
            {/* Header */}
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
                        <button id="hamburger" className="text-white focus:outline-none">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                    {/* Center section: Menu */}
                    <nav className="hidden lg:flex md:flex-grow justify-center">
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
                    <div className="hidden lg:flex items-center space-x-4 relative">
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
            {/* Mobile menu */}
            <nav id="mobile-menu-placeholder" className="mobile-menu flex flex-col items-center space-y-8 lg:hidden">
                <ul className="w-full">
                    <li><a href="index.html" className="hover:text-secondary font-bold block py-2">Home</a></li>
                    {/* Men Dropdown */}
                    <li className="relative group" x-data="{ open: false }">
                        <a className="hover:text-secondary font-bold  py-2 flex justify-center items-center cursor-pointer">
                            <span>Men</span>
                            <span>
                            </span>
                        </a>
                        <ul className="mobile-dropdown-menu" x-show="open" x-transition>
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
            {/* Shop */}
            <section id="shop">
                <div className="container mx-auto">
                    {/* Top Filter */}
                    <div className="flex flex-col md:flex-row justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <button className="bg-primary text-white hover:bg-transparent hover:text-primary border hover:border-primary py-2 px-4 rounded-full focus:outline-none">Show
                                On
                                Sale</button>
                            <button className="bg-primary text-white hover:bg-transparent hover:text-primary border hover:border-primary py-2 px-4 rounded-full focus:outline-none">List
                                View</button>
                            <button className="bg-primary text-white hover:bg-transparent hover:text-primary border hover:border-primary py-2 px-4 rounded-full focus:outline-none">Grid
                                View</button>
                        </div>
                        <div className="flex mt-5 md:mt-0 space-x-4">
                            <div className="relative">
                                <select className="block appearance-none w-full bg-white border  hover:border-primary px-4 py-2 pr-8 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline">
                                    <option>Sort by Latest</option>
                                    <option>Sort by Popularity</option>
                                    <option>Sort by A-Z</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center px-2">
                                    <img id="arrow-down" className="h-4 w-4" src="/assets/images/filter-down-arrow.svg" alt="filter arrow" />
                                    <img id="arrow-up" className="h-4 w-4 hidden" src="/assets/images/filter-up-arrow.svg" alt="filter arrow" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Filter Toggle Button for Mobile */}
                    <div className="block md:hidden text-center mb-4">
                        <button id="products-toggle-filters" className="bg-primary text-white py-2 px-4 rounded-full focus:outline-none">Show Filters</button>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        {/* Filters */}
                        <div id="filters" className="w-full md:w-1/4 p-4 hidden md:block">
                            {/* Category Filter */}
                            <div className="mb-6 pb-8 border-b border-gray-line">
                                <h3 className="text-lg font-semibold mb-6">Category</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox custom-checkbox" />
                                        <span className="ml-2">T-Shirts</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox custom-checkbox" />
                                        <span className="ml-2">Hoodies</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox custom-checkbox" />
                                        <span className="ml-2">Accessories</span>
                                    </label>
                                </div>
                            </div>
                            {/* Size Filter */}
                            <div className="mb-6 pb-8 border-b border-gray-line">
                                <h3 className="text-lg font-semibold mb-6">Size</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox custom-checkbox" />
                                        <span className="ml-2">S (30)</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox custom-checkbox" />
                                        <span className="ml-2">M (44)</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox custom-checkbox" />
                                        <span className="ml-2">L (22)</span>
                                    </label>
                                </div>
                            </div>
                            {/* Color Filter */}
                            <div className="mb-6 pb-8 border-b border-gray-line">
                                <h3 className="text-lg font-semibold mb-6">Color</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center custom-color-checkbox" data-color="#ff0000">
                                        <input type="checkbox" className="form-checkbox custom-checkbox" />
                                        <span className="ml-2">Red</span>
                                    </label>
                                    <label className="flex items-center custom-color-checkbox" data-color="#0000ff">
                                        <input type="checkbox" className="form-checkbox custom-checkbox" />
                                        <span className="ml-2">Blue</span>
                                    </label>
                                    <label className="flex items-center custom-color-checkbox" data-color="#00ff00">
                                        <input type="checkbox" className="form-checkbox custom-checkbox" />
                                        <span className="ml-2">Green</span>
                                    </label>
                                </div>
                            </div>
                            {/* Brand Filter */}
                            <div className="mb-6 pb-8 border-b border-gray-line">
                                <h3 className="text-lg font-semibold mb-6">Brand</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox custom-checkbox" />
                                        <span className="ml-2">Nike</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox custom-checkbox" />
                                        <span className="ml-2">Adidas</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox custom-checkbox" />
                                        <span className="ml-2">Puma</span>
                                    </label>
                                </div>
                            </div>
                            {/* Rating Filter */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-6">Rating</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox custom-checkbox" />
                                        <span className="ml-2">★★★★★</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox custom-checkbox" />
                                        <span className="ml-2">★★★★☆</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="form-checkbox custom-checkbox" />
                                        <span className="ml-2">★★★☆☆</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* Products List */}
                        <div className="w-full md:w-3/4 p-4">
                            {/* Products grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* Product 1 */}
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <img src="assets/images/products/5.jpg" alt="Product 1" className="w-full object-cover mb-4 rounded-lg" />
                                    <a href="#" className="text-lg font-semibold mb-2">Blue women's suit</a>
                                    <p className=" my-2">Women</p>
                                    <div className="flex items-center mb-4">
                                        <span className="text-lg font-bold text-primary">$19.99</span>
                                        <span className="text-sm line-through ml-2">$24.99</span>
                                    </div>
                                    <button className="bg-primary border border-transparent hover:bg-transparent hover:border-primary text-white hover:text-primary font-semibold py-2 px-4 rounded-full w-full">Add
                                        to Cart</button>
                                </div>
                                {/* Product 2 */}
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <img src="assets/images/products/6.jpg" alt="Product 2" className="w-full object-cover mb-4 rounded-lg" />
                                    <a href="#" className="text-lg font-semibold mb-2">White shirt with long sleeves</a>
                                    <p className=" my-2">Women</p>
                                    <div className="flex items-center mb-4">
                                        <span className="text-lg font-bold text-gray-900">$29.99</span>
                                    </div>
                                    <button className="bg-primary border border-transparent hover:bg-transparent hover:border-primary text-white hover:text-primary font-semibold py-2 px-4 rounded-full w-full">Add
                                        to Cart</button>
                                </div>
                                {/* Product 3 */}
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <img src="assets/images/products/7.jpg" alt="Product 3" className="w-full object-cover mb-4 rounded-lg" />
                                    <a href="#" className="text-lg font-semibold mb-2">Yellow men's suit</a>
                                    <p className="my-2">Men</p>
                                    <div className="flex items-center mb-4">
                                        <span className="text-lg font-bold text-gray-900">$15.99</span>
                                        <span className="text-sm line-through  ml-2">$19.99</span>
                                    </div>
                                    <button className="bg-primary border border-transparent hover:bg-transparent hover:border-primary text-white hover:text-primary font-semibold py-2 px-4 rounded-full w-full">Add
                                        to Cart</button>
                                </div>
                                {/* Product 4 */}
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <img src="assets/images/products/8.jpg" alt="Product 4" className="w-full object-cover mb-4 rounded-lg" />
                                    <a href="#" className="text-lg font-semibold mb-2">Red dress</a>
                                    <p className="my-2">Women</p>
                                    <div className="flex items-center mb-4">
                                        <span className="text-lg font-bold text-primary">$39.99</span>
                                        <span className="text-sm line-through ml-2">$49.99</span>
                                    </div>
                                    <button className="bg-primary border border-transparent hover:bg-transparent hover:border-primary text-white hover:text-primary font-semibold py-2 px-4 rounded-full w-full">Add
                                        to Cart</button>
                                </div>
                                {/* Product 5 */}
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <img src="assets/images/products/4.jpg" alt="Product 4" className="w-full object-cover mb-4 rounded-lg" />
                                    <a href="#" className="text-lg font-semibold">Black leather jacket</a>
                                    <p className="my-2">Women</p>
                                    <div className="flex items-center mb-4">
                                        <span className="text-lg font-bold text-primary">$39.99</span>
                                        <span className="text-sm line-through ml-2">$49.99</span>
                                    </div>
                                    <button className="bg-primary border border-transparent hover:bg-transparent hover:border-primary text-white hover:text-primary font-semibold py-2 px-4 rounded-full w-full">Add
                                        to Cart</button>
                                </div>
                                {/* Product 6 */}
                                <div className="bg-white p-4 rounded-lg shadow">
                                    <img src="assets/images/products/3.jpg" alt="Product 3" className="w-full object-cover mb-4 rounded-lg" />
                                    <a href="#" className="text-lg font-semibold mb-2">Black long dress</a>
                                    <p className=" my-2">Women, Accessories</p>
                                    <div className="flex items-center mb-4">
                                        <span className="text-lg font-bold text-gray-900">$15.99</span>
                                        <span className="text-sm line-through  ml-2">$19.99</span>
                                    </div>
                                    <button className="bg-primary border border-transparent hover:bg-transparent hover:border-primary text-white hover:text-primary font-semibold py-2 px-4 rounded-full w-full">Add
                                        to Cart</button>
                                </div>
                            </div>
                            {/* Pagination */}
                            <div className="flex justify-center mt-8">
                                <nav aria-label="Page navigation">
                                    <ul className="inline-flex space-x-2">
                                        <li>
                                            <a href="#" className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full">1</a>
                                        </li>
                                        <li>
                                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary hover:text-white">2</a>
                                        </li>
                                        <li>
                                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary hover:text-white">3</a>
                                        </li>
                                        <li>
                                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Shop category description */}
            <section id="shop-category-description" className="py-8">
                <div className="container mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Shirts Category</h2>
                        <p className="mb-4">
                            Discover our wide range of shirts, perfect for any occasion. Whether you're looking for something
                            casual
                            or formal, we have the perfect shirt for you. Our collection includes a variety of styles, colors,
                            and
                            sizes to suit everyone's taste.
                        </p>
                        <p>
                            Browse through our selection and find your new favorite shirt today. All our shirts are made from
                            high-quality materials and are designed to provide both comfort and style. Shop now and elevate your
                            wardrobe with our premium shirts.
                        </p>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="border-t border-gray-line">
                {/* Top part */}
                <div className="container mx-auto px-4 py-10">
                    <div className="flex flex-wrap -mx-4">
                        {/* Menu 1 */}
                        <div className="w-full sm:w-1/6 px-4 mb-8">
                            <h3 className="text-lg font-semibold mb-4">Shop</h3>
                            <ul>
                                <li><a href="/shop.html" className="hover:text-primary">Shop</a></li>
                                <li><a href="/single-product-page.html" className="hover:text-primary">Women</a></li>
                                <li><a href="/shop.html" className="hover:text-primary">Men</a></li>
                                <li><a href="/single-product-page.html" className="hover:text-primary">Shoes</a></li>
                                <li><a href="/single-product-page.html" className="hover:text-primary">Accessories</a></li>
                            </ul>
                        </div>
                        {/* Menu 2 */}
                        <div className="w-full sm:w-1/6 px-4 mb-8">
                            <h3 className="text-lg font-semibold mb-4">Pages</h3>
                            <ul>
                                <li><a href="/shop.html" className="hover:text-primary">Shop</a></li>
                                <li><a href="/single-product-page.html" className="hover:text-primary">Product</a></li>
                                <li><a href="/checkout.html" className="hover:text-primary">Checkout</a></li>
                                <li><a href="/404.html" className="hover:text-primary">404</a></li>
                            </ul>
                        </div>
                        {/* Menu 3 */}
                        <div className="w-full sm:w-1/6 px-4 mb-8">
                            <h3 className="text-lg font-semibold mb-4">Account</h3>
                            <ul>
                                <li><a href="/cart.html" className="hover:text-primary">Cart</a></li>
                                <li><a href="/register.html" className="hover:text-primary">Registration</a></li>
                                <li><a href="/register.html" className="hover:text-primary">Login</a></li>
                            </ul>
                        </div>
                        {/* Social Media */}
                        <div className="w-full sm:w-1/6 px-4 mb-8">
                            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                            <ul>
                                <li className="flex items-center mb-2">
                                    <img src="/assets/images/social_icons/facebook.svg" alt="Facebook" className="w-4 h-4 transition-transform transform hover:scale-110 mr-2" />
                                    <a href="#" className="hover:text-primary">Facebook</a>
                                </li>
                                <li className="flex items-center mb-2">
                                    <img src="/assets/images/social_icons/twitter.svg" alt="Twitter" className="w-4 h-4 transition-transform transform hover:scale-110 mr-2" />
                                    <a href="#" className="hover:text-primary">Twitter</a>
                                </li>
                                <li className="flex items-center mb-2">
                                    <img src="/assets/images/social_icons/instagram.svg" alt="Instagram" className="w-4 h-4 transition-transform transform hover:scale-110 mr-2" />
                                    <a href="#" className="hover:text-primary">Instagram</a>
                                </li>
                                <li className="flex items-center mb-2">
                                    <img src="/assets/images/social_icons/pinterest.svg" alt="Instagram" className="w-4 h-4 transition-transform transform hover:scale-110 mr-2" />
                                    <a href="#" className="hover:text-primary">Pinterest</a>
                                </li>
                                <li className="flex items-center mb-2">
                                    <img src="/assets/images/social_icons/youtube.svg" alt="Instagram" className="w-4 h-4 transition-transform transform hover:scale-110 mr-2" />
                                    <a href="#" className="hover:text-primary">YouTube</a>
                                </li>
                            </ul>
                        </div>
                        {/* Contact Information */}
                        <div className="w-full sm:w-2/6 px-4 mb-8">
                            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                            <p><img src="assets/images/template-logo.png" alt="Logo" className="h-[60px] mb-4" /></p>
                            <p>123 Street Name, Paris, France</p>
                            <p className="text-xl font-bold my-4">Phone: (123) 456-7890</p>
                            <a href="mailto:info@company.com" className="underline">Email: info@company.com</a>
                        </div>
                    </div>
                </div>
                {/* Bottom part */}
                <div className="py-6 border-t border-gray-line">
                    <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
                        {/* Copyright and Links */}
                        <div className="w-full lg:w-3/4 text-center lg:text-left mb-4 lg:mb-0">
                            <p className="mb-2 font-bold">© 2024 Your Company. All rights reserved.</p>
                            <ul className="flex justify-center lg:justify-start space-x-4 mb-4 lg:mb-0">
                                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-primary">FAQ</a></li>
                            </ul>
                            <p className="text-sm mt-4">Your shop's description goes here. This is a brief introduction to your shop
                                and what you offer.</p>
                        </div>
                        {/* Payment Icons */}
                        <div className="w-full lg:w-1/4 text-center lg:text-right">
                            <img src="/assets/images/social_icons/paypal.svg" alt="PayPal" className="inline-block h-8 mr-2" />
                            <img src="/assets/images/social_icons/stripe.svg" alt="Stripe" className="inline-block h-8 mr-2" />
                            <img src="/assets/images/social_icons/visa.svg" alt="Visa" className="inline-block h-8" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>

    );
}
