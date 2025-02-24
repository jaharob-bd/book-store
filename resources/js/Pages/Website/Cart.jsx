import { Link } from '@inertiajs/react';
import WebLayout from './Layout/WebLayout';
import { CartContext } from './context/CartContext';
import { useContext } from 'react';
import ProductLink from './Components/ProductLink';
import WishLink from './Components/WishLink';
import AddToCartLink from './Components/AddToCartLink';
import Breadcrumb from './Components/Breadcrumb';

export default function Cart({ auth, products }) {
    const { cart, addToCart, removeCart } = useContext(CartContext);

    return (
        <WebLayout auth={auth}>
            <Breadcrumb title="Cart" />
            <div>
                <div className="container mx-auto mt-10">
                    <div className="flex shadow-md my-10">
                        <div className="w-3/4 bg-white px-10 py-10">
                            <div className="flex justify-between border-b pb-8">
                                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                                <h2 className="font-semibold text-2xl">{cart.length} Items</h2>
                            </div>
                            <div className="flex mt-10 mb-5">
                                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                                <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                            </div>
                            {cart.length === 0 ? (
                                <p>Your cart is empty.</p>
                            ) : (
                                <>
                                    {
                                        cart.map((item, i) => (
                                            <div key={item.id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                                                <div className="flex w-2/5"> {/* product */}
                                                    <div className="w-20">
                                                        <img className="h-24" src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z" alt />
                                                    </div>
                                                    <div className="flex flex-col justify-between ml-4 flex-grow">
                                                        <span className="font-bold text-sm">{item.name}</span>
                                                        <span className="text-red-500 text-xs">Apple</span>
                                                        <a onClick={() => removeCart(item.id)} className="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center w-1/5">
                                                    <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512"><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                                    </svg>
                                                    <input className="mx-2 border text-center w-8" type="text" value={item.quantity} />
                                                    <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                                    </svg>
                                                </div>
                                                <span className="text-center w-1/5 font-semibold text-sm">{item.price}</span>
                                                <span className="text-center w-1/5 font-semibold text-sm">{item.price * item.quantity}</span>
                                            </div>
                                        ))
                                    }
                                </>
                            )}

                            <Link href={route('shop')} className="flex font-semibold text-indigo-600 text-sm mt-10">
                                <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                                Continue Shopping
                            </Link>
                        </div>
                        <div id="summary" className="w-1/4 px-8 py-10">
                            <p className="font-bold">ORDER SUMMARY</p>
                            <div className="flex justify-between mt-10 mb-5">
                                <p className="font-semibold text-sm uppercase">Subtotal</p>
                                <p className="font-semibold text-sm">${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                            </div>
                            <div className="flex justify-between border-b py-5">
                                <p className="font-semibold text-sm uppercase">Delivery Fee</p>
                                <p className="font-semibold text-sm">৳ 50</p>
                            </div>
                            {/* <div className="flex justify-between border-b py-5">
                                <p className="font-semibold text-sm uppercase">Online Fee</p>
                                <p className="font-semibold text-sm">৳ 10</p>
                            </div> */}
                            <div className="py-10">
                                <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                                <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
                            </div>
                            <div class="border-t mt-8">
                                <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                                    <span>Total cost</span>
                                    <span>${cart.reduce((total, item) => total + item.price * item.quantity, 0) + 50}</span>
                                </div>
                                <Link href={route('checkout')}>
                                    <button class="bg-indigo-600 font-semibold hover:bg-indigo-500 py-3 text-sm text-white uppercase w-full mb-4">Checkout</button>
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
            </div>

            <section id="shop">
                <div className="container mx-auto px-4 py-8">
                    {/* <h1 className="text-3xl font-bold text-center mb-8">Cart</h1> */}
                    {/* Suggested Products Section */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-center mb-6">Products for you</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {products.slice(0, 4).map((product, index) => (
                                <div key={index} className="bg-white shadow rounded overflow-hidden group">
                                    <div className="relative">
                                        <img src="image.png" alt="product 1" className="w-full" />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                            <ProductLink slug={product.url_key} />
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