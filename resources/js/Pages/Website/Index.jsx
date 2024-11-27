import { useState, useEffect } from 'react';
import WebLayout from './Layout/WebLayout';
import { Link } from '@inertiajs/react';
import Filter from './Partials/Filter';
import TopFilter from './Partials/TopFilter';
import secureLocalStorage from "react-secure-storage";

export default function Index({ auth, products }) {
    // const [cart, setCart] = useState([]);
    // Initialize cart state with data from secureLocalStorage
    const [cart, setCart] = useState(() => {
        const storedCart = secureLocalStorage.getItem("cart");
        return storedCart ? storedCart : [];
    });

    // Save cart to local storage whenever it changes
    useEffect(() => {
        secureLocalStorage.setItem("cart", cart);
    }, [cart]);

    // Function to handle adding products to the cart
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);

            if (existingProduct) {
                // If product exists, update its quantity
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // If product doesn't exist, add it to the cart
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

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
                {/* banner */}
                <div className="bg-cover bg-no-repeat bg-center py-36" style={{ backgroundImage: 'url("assets/images/banner-bg.jpg")' }}>
                    <div className="container">
                        <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
                            best collection for <br /> home decoration
                        </h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam <br />
                            accusantium perspiciatis, sapiente
                            magni eos dolorum ex quos dolores odio</p>
                        <div className="mt-12">
                            <a href="#" className="bg-primary border border-primary text-white px-8 py-3 font-medium 
              rounded-md hover:bg-transparent hover:text-primary">Shop Now</a>
                        </div>
                    </div>
                </div>
                {/* ./banner */}
                {/* features */}
                <div className="container py-16">
                    <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
                        <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                            <img src="assets/images/icons/delivery-van.svg" alt="Delivery" className="w-12 h-12 object-contain" />
                            <div>
                                <h4 className="font-medium capitalize text-lg">Free Shipping</h4>
                                <p className="text-gray-500 text-sm">Order over $200</p>
                            </div>
                        </div>
                        <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                            <img src="assets/images/icons/money-back.svg" alt="Delivery" className="w-12 h-12 object-contain" />
                            <div>
                                <h4 className="font-medium capitalize text-lg">Money Rturns</h4>
                                <p className="text-gray-500 text-sm">30 days money returs</p>
                            </div>
                        </div>
                        <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                            <img src="assets/images/icons/service-hours.svg" alt="Delivery" className="w-12 h-12 object-contain" />
                            <div>
                                <h4 className="font-medium capitalize text-lg">24/7 Support</h4>
                                <p className="text-gray-500 text-sm">Customer support</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ./features */}
                {/* categories */}
                <div className="container py-16">
                    <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">shop by category</h2>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="relative rounded-sm overflow-hidden group">
                            <img src="assets/images/category/category-1.jpg" alt="category 1" className="w-full" />
                            <a href="#" className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Bedroom</a>
                        </div>
                        <div className="relative rounded-sm overflow-hidden group">
                            <img src="assets/images/category/category-2.jpg" alt="category 1" className="w-full" />
                            <a href="#" className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Mattrass</a>
                        </div>
                        <div className="relative rounded-sm overflow-hidden group">
                            <img src="assets/images/category/category-3.jpg" alt="category 1" className="w-full" />
                            <a href="#" className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Outdoor
                            </a>
                        </div>
                        <div className="relative rounded-sm overflow-hidden group">
                            <img src="assets/images/category/category-4.jpg" alt="category 1" className="w-full" />
                            <a href="#" className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Sofa</a>
                        </div>
                        <div className="relative rounded-sm overflow-hidden group">
                            <img src="assets/images/category/category-5.jpg" alt="category 1" className="w-full" />
                            <a href="#" className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Living
                                Room</a>
                        </div>
                        <div className="relative rounded-sm overflow-hidden group">
                            <img src="assets/images/category/category-6.jpg" alt="category 1" className="w-full" />
                            <a href="#" className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Kitchen</a>
                        </div>
                    </div>
                </div>
                {/* ./categories */}
                {/* new arrival */}
                <div className="container pb-16">
                    <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">top new arrival</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white shadow rounded overflow-hidden group">
                            <div className="relative">
                                <img src="assets/images/products/product1.jpg" alt="product 1" className="w-full" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
              justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                    <a href="#" className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="view product">
                                        <i className="fa-solid fa-magnifying-glass" />
                                    </a>
                                    <a href="#" className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="add to wishlist">
                                        <i className="fa-solid fa-heart" />
                                    </a>
                                </div>
                            </div>
                            <div className="pt-4 pb-3 px-4">
                                <a href="#">
                                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">Guyer
                                        Chair</h4>
                                </a>
                                <div className="flex items-baseline mb-1 space-x-2">
                                    <p className="text-xl text-primary font-semibold">$45.00</p>
                                    <p className="text-sm text-gray-400 line-through">$55.90</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex gap-1 text-sm text-yellow-400">
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                    </div>
                                    <div className="text-xs text-gray-500 ml-3">(150)</div>
                                </div>
                            </div>
                            <a href="#" className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">Add
                                to cart</a>
                        </div>
                        <div className="bg-white shadow rounded overflow-hidden group">
                            <div className="relative">
                                <img src="assets/images/products/product4.jpg" alt="product 1" className="w-full" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
              justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                    <a href="#" className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="view product">
                                        <i className="fa-solid fa-magnifying-glass" />
                                    </a>
                                    <a href="#" className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="add to wishlist">
                                        <i className="fa-solid fa-heart" />
                                    </a>
                                </div>
                            </div>
                            <div className="pt-4 pb-3 px-4">
                                <a href="#">
                                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">Bed
                                        King Size</h4>
                                </a>
                                <div className="flex items-baseline mb-1 space-x-2">
                                    <p className="text-xl text-primary font-semibold">$45.00</p>
                                    <p className="text-sm text-gray-400 line-through">$55.90</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex gap-1 text-sm text-yellow-400">
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                    </div>
                                    <div className="text-xs text-gray-500 ml-3">(150)</div>
                                </div>
                            </div>
                            <a href="#" className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">Add
                                to cart</a>
                        </div>
                        <div className="bg-white shadow rounded overflow-hidden group">
                            <div className="relative">
                                <img src="assets/images/products/product2.jpg" alt="product 1" className="w-full" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
              justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                    <a href="#" className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="view product">
                                        <i className="fa-solid fa-magnifying-glass" />
                                    </a>
                                    <a href="#" className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="add to wishlist">
                                        <i className="fa-solid fa-heart" />
                                    </a>
                                </div>
                            </div>
                            <div className="pt-4 pb-3 px-4">
                                <a href="#">
                                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                                        Couple Sofa</h4>
                                </a>
                                <div className="flex items-baseline mb-1 space-x-2">
                                    <p className="text-xl text-primary font-semibold">$45.00</p>
                                    <p className="text-sm text-gray-400 line-through">$55.90</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex gap-1 text-sm text-yellow-400">
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                    </div>
                                    <div className="text-xs text-gray-500 ml-3">(150)</div>
                                </div>
                            </div>
                            <a href="#" className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">Add
                                to cart</a>
                        </div>
                        <div className="bg-white shadow rounded overflow-hidden group">
                            <div className="relative">
                                <img src="assets/images/products/product3.jpg" alt="product 1" className="w-full" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
              justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                    <a href="#" className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="view product">
                                        <i className="fa-solid fa-magnifying-glass" />
                                    </a>
                                    <a href="#" className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="add to wishlist">
                                        <i className="fa-solid fa-heart" />
                                    </a>
                                </div>
                            </div>
                            <div className="pt-4 pb-3 px-4">
                                <a href="#">
                                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                                        Mattrass X</h4>
                                </a>
                                <div className="flex items-baseline mb-1 space-x-2">
                                    <p className="text-xl text-primary font-semibold">$45.00</p>
                                    <p className="text-sm text-gray-400 line-through">$55.90</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex gap-1 text-sm text-yellow-400">
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                        <span><i className="fa-solid fa-star" /></span>
                                    </div>
                                    <div className="text-xs text-gray-500 ml-3">(150)</div>
                                </div>
                            </div>
                            <a href="#" className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">Add
                                to cart</a>
                        </div>
                    </div>
                </div>
                {/* ./new arrival */}
                {/* ads */}
                <div className="container pb-16">
                    <a href="#">
                        <img src="assets/images/offer.jpg" alt="ads" className="w-full" />
                    </a>
                </div>
                {/* ./ads */}
                {/* product */}
                <div className="container pb-16">
                    <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">recomended for you</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {products.map((product, index) => (
                            <div key={index} className="bg-white shadow rounded overflow-hidden group">
                                <div className="relative">
                                    <img src="assets/images/products/product1.jpg" alt="product 1" className="w-full" />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                        <a href="#" className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="view product">
                                            <i className="fa-solid fa-magnifying-glass" />
                                        </a>
                                        <a href="#" className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="add to wishlist">
                                            <i className="fa-solid fa-heart" />
                                        </a>
                                    </div>
                                </div>
                                <div className="pt-4 pb-3 px-4">
                                    <a href="#">
                                        <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">{product.name}</h4>
                                    </a>
                                    <div className="flex items-baseline mb-1 space-x-2">
                                        <p className="text-xl text-primary font-semibold">{product.sale_price}</p>
                                        <p className="text-sm text-gray-400 line-through">{product.mrp_price}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex gap-1 text-sm text-yellow-400">
                                            <span><i className="fa-solid fa-star" /></span>
                                            <span><i className="fa-solid fa-star" /></span>
                                            <span><i className="fa-solid fa-star" /></span>
                                            <span><i className="fa-solid fa-star" /></span>
                                            <span><i className="fa-solid fa-star" /></span>
                                        </div>
                                        <div className="text-xs text-gray-500 ml-3">(150)</div>
                                    </div>
                                </div>
                                <button onClick={() => addToCart(product)} href="#" className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">
                                    Add to cart
                                </button>
                            </div>
                        ))}

                        {/* {products.map((product, index) => (
                            <div key={index} className="bg-white p-2 rounded-lg shadow">
                                <Link href={`shop/${product.url_key}`}>
                                    <img src="assets/images/default.png" alt="Product 1" className="w-full object-cover mb-4 rounded-lg" />
                                    <a href="#" className="text-lg font-semibold mb-2">{product.name}</a>
                                    <p className="my-2">{product.category_name}</p>
                                    <div className="flex items-center mb-4">
                                        <span className="text-lg font-bold text-gray-900">{product.sale_price}</span>
                                    </div>
                                </Link>
                                <button
                                    onClick={() => addToCart(product)} // Corrected the function call
                                    className="bg-indigo-500 border border-indigo-500 hover:bg-red-500 hover:border-primary text-white hover:text-primary font-semibold py-2 px-4 rounded-full w-full"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))} */}


                    </div>
                </div>
                {/* ./product */}
            </WebLayout>
        </div >
    );
}