import { Link } from '@inertiajs/react';
import WebLayout from './Layout/WebLayout';
import { CartContext } from './context/CartContext';
import { useContext } from 'react';
import ProductLink from './Components/ProductLink';
import WishLink from './Components/WishLink';
import AddToCartLink from './Components/AddToCartLink';

export default function Cart({ auth, products }) {
    const { cart, addToCart, removeCart } = useContext(CartContext);

    return (
        <WebLayout auth={auth}>
            <section id="shop">
                <div className="container mx-auto px-4 py-8">
                    {/* <h1 className="text-3xl font-bold text-center mb-8">Cart</h1> */}
                    <div className="flex flex-wrap lg:flex-nowrap -mx-4">
                        {/* Left Section: Cart List */}
                        <div className="w-full lg:w-2/3 px-4">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
                                {cart.length === 0 ? (
                                    <p>Your cart is empty.</p>
                                ) : (
                                    <ul className="divide-y divide-gray-200">
                                        {cart.map((item, i) => (
                                            <li className="flex justify-between py-3" key={item.id}>
                                                <div>
                                                    <span className="font-semibold">{i + 1}. {item.name}</span>
                                                    <p className="text-sm text-gray-500">৳ {item.sale_price} x {item.quantity}</p>
                                                </div>
                                                <button
                                                    onClick={() => removeCart(item.id)}
                                                    className="text-red-700 hover:text-red-900"
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                        {/* Right Section: Order Summary */}
                        <div className="w-full lg:w-1/3 px-4 mt-6 lg:mt-0">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                                <ul className="space-y-3">
                                    <li className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>৳ {cart.reduce((total, item) => total + item.sale_price * item.quantity, 0)}</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Delivery Fee</span>
                                        <span>৳ 50</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span>Online Fee</span>
                                        <span>৳ 10</span>
                                    </li>
                                    <li className="flex justify-between font-bold">
                                        <span>Total</span>
                                        <span>৳ {cart.reduce((total, item) => total + item.sale_price * item.quantity, 0) + 50 + 10}</span>
                                    </li>
                                </ul>

                                <div className="mt-6">
                                    <Link href={route('checkout')}>
                                        <button className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium mb-4">
                                            Process to Checkout
                                        </button>
                                    </Link>
                                    <Link href={route('gift')}>
                                        <button className="block w-full py-2 text-center text-white bg-indigo-600 border border-indigo-600 rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                                            Order as Gift
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Suggested Products Section */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-center mb-6">Products for you</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {products.map((product, index) => (
                                <div key={index} className="bg-white shadow rounded overflow-hidden group">
                                    <div className="relative">
                                        <img src="image.png" alt="product 1" className="w-full" />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                            <ProductLink slug={product.product_url} />
                                            <WishLink product={product} />
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
                                    <AddToCartLink product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </WebLayout>
    );
}