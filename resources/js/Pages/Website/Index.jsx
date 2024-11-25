import { useState } from 'react';
import WebLayout from './Layout/WebLayout';

export default function Index({ auth, products }) {
    // console.log(products);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMenDropdownOpen, setIsMenDropdownOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleMenDropdown = () => {
        setIsMenDropdownOpen(!isMenDropdownOpen);
    };

    return (
        <div>
            <WebLayout auth={auth}>
                <section id="shop">
                    <div className="container mx-auto">
                        {/* Top Filter */}
                        <div className="flex flex-col md:flex-row justify-between items-center py-4">
                            <div className="flex items-center space-x-2">
                                <button className="bg-primary text-dark hover:bg-transparent hover:text-primary border hover:border-primary px-4 rounded-full focus:outline-none">Show On Sale</button>
                                <button className="bg-primary text-dark hover:bg-transparent hover:text-primary border hover:border-primary px-4 rounded-full focus:outline-none">List View</button>
                                <button className="bg-primary text-dark hover:bg-transparent hover:text-primary border hover:border-primary px-4 rounded-full focus:outline-none">Grid View</button>
                            </div>
                            <div className="flex mt-2 md:mt-0 space-x-4">
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-white border  hover:border-primary px-4 py-1 pr-8 rounded-full shadow leading-tight focus:outline-none focus:shadow-outline">
                                        <option>Sort by Latest</option>
                                        <option>Sort by Popularity</option>
                                        <option>Sort by A-Z</option>
                                    </select>
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
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {/* Product 1 */}

                                    {/* products map */}
                                    {products.map((product, index) => (
                                        <div key={index} className="bg-white p-2 rounded-lg shadow">
                                            <img src="assets/images/products/7.jpg" alt="Product 1" className="w-full object-cover mb-4 rounded-lg" />
                                            <a href="#" className="text-lg font-semibold mb-2">{product.name}</a>
                                            <p className="my-2">{product.category_name}</p>
                                            <div className="flex items-center mb-4">
                                                <span className="text-lg font-bold text-gray-900">{product.sale_price}</span>
                                            </div>
                                            <button className="bg-primary border border-transparent hover:bg-transparent hover:border-primary text-white hover:text-primary font-semibold py-2 px-4 rounded-full w-full">Add to Cart</button>
                                        </div>
                                    ))}
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
            </WebLayout>
        </div>
    );
}