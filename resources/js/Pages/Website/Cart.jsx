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

            <section className="container mx-auto flex-grow max-w-[1200px] border-b py-5 lg:flex lg:flex-row lg:py-10">
                {/* Mobile cart table  */}
                <section className="container mx-auto my-3 flex w-full flex-col gap-3 px-4 md:hidden">
                    {/* 1 */}
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            {
                                cart.map((item, i) => (
                                    <div key={item.id} className="flex w-full border px-4 py-4">
                                        <img className="self-start object-contain" width="90px" src="./assets/images/bedroom.png" alt="bedroom image" />
                                        <div className="ml-3 flex w-full flex-col justify-center">
                                            <div className="flex items-center justify-between">
                                                <p className="text-xl font-bold">{i + 1}. {item.name}</p>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                                    <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                                                </svg>
                                            </div>
                                            <p className="text-sm text-gray-400">Size: XL</p>
                                            <p className="py-3 text-xl font-bold text-violet-900">{item.sale_price}</p>
                                            <div className="mt-2 flex w-full items-center justify-between">
                                                <div className="flex items-center justify-center">
                                                    <button className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500">
                                                        −
                                                    </button>
                                                    <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                                                        {item.quantity}
                                                    </div>
                                                    <button className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500">
                                                        +
                                                    </button>
                                                </div>
                                                <button onClick={() => removeCart(item.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="m-0 h-5 w-5 cursor-pointer">
                                                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    )}














                </section>
                {/* /Mobile cart table  */}
                {/* Desktop cart table  */}
                <section className="hidden h-[600px] w-full max-w-[1200px] grid-cols-1 gap-3 px-5 pb-10 md:grid">
                    <table className="table-fixed">
                        <thead className="h-16 bg-neutral-100">
                            <tr>
                                <th>ITEM</th>
                                <th>PRICE</th>
                                <th>QUANTITY</th>
                                <th>TOTAL</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {/* 1 */}


                            {cart.length === 0 ? (
                                <p>Your cart is empty.</p>
                            ) : (
                                <>
                                    {
                                        cart.map((item, i) => (
                                            <tr key={item.id} className="h-[100px] border-b">
                                                <td className="align-middle">
                                                    <div className="flex">
                                                        <img className="w-[90px]" src="./assets/images/bedroom.png" alt="bedroom image" />
                                                        <div className="ml-3 flex flex-col justify-center">
                                                            <p className="text-xl font-bold">{item.name}</p>
                                                            <p className="text-sm text-gray-400">Size: XL</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="mx-auto text-center">{item.sale_price}</td>
                                                <td className="align-middle">
                                                    <div className="flex items-center justify-center">
                                                        <button className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500">
                                                            −
                                                        </button>
                                                        <div className="flex h-8 w-8 cursor-text items-center justify-center border-t border-b active:ring-gray-500">
                                                            {item.quantity}
                                                        </div>
                                                        <button className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500">
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="mx-auto text-center">{item.sale_price * item.quantity}</td>
                                                <td className="align-middle">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="m-0 h-5 w-5 cursor-pointer">
                                                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                                                    </svg>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </>

                            )}





                        </tbody>
                    </table>
                </section>
                {/* /Desktop cart table  */}
                {/* Summary  */}
                <section className="mx-auto w-full px-4 md:max-w-[400px]">
                    <div className>
                        <div className="border py-5 px-4 shadow-md">
                            <p className="font-bold">ORDER SUMMARY</p>
                            <div className="flex justify-between border-b py-5">
                                <p>Subtotal</p>
                                <p>${cart.reduce((total, item) => total + item.sale_price * item.quantity, 0)}</p>
                            </div>
                            <div className="flex justify-between border-b py-5">
                                <p>Delivery Fee</p>
                                <p>৳ 50</p>
                            </div>
                            <div className="flex justify-between border-b py-5">
                                <p>Online Fee</p>
                                <p>৳ 10</p>
                            </div>
                            <div className="flex justify-between py-5">
                                <p>Total</p>
                                <p>${cart.reduce((total, item) => total + item.sale_price * item.quantity, 0) + 50 + 10}</p>
                            </div>
                            <Link href={route('checkout')}>
                                <button className="w-full bg-violet-900 px-5 py-2 text-white mb-4">
                                    Proceed to checkout
                                </button>
                            </Link>
                            <Link href={route('gift')}>
                                <button className="block w-full py-2 text-center text-white bg-indigo-600 border border-indigo-600 rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium">
                                    Order as Gift
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>
            </section>



















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