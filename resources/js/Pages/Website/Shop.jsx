import WebLayout from './Layout/WebLayout';
import Sidebar from './Shop/Sidebar';
import Drawer from './Shop/Drawer';
import ProductLink from './Components/ProductLink';
import WishLink from './Components/WishLink';
import AddToCartLink from './Components/AddToCartLink';

export default function Shop({ auth, products }) {
    return (
        <WebLayout auth={auth}>
            {/* breadcrumb */}
            <div className="container py-4 flex items-center gap-3">
                <a href="/" className="text-primary text-base">
                    <i className="fa-solid fa-house" />
                </a>
                <span className="text-sm text-gray-400">
                    <i className="fa-solid fa-chevron-right" />
                </span>
                <p className="text-gray-600 font-medium">Shop</p>
            </div>
            {/* ./breadcrumb */}
            {/* shop wrapper */}
            <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
                {/* sidebar */}
                {/* drawer init and toggle */}
                <div className="text-center md:hidden">
                    <button className="text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block md:hidden" type="button" data-drawer-target="drawer-example" data-drawer-show="drawer-example" aria-controls="drawer-example">
                        <ion-icon name="grid-outline" />
                    </button>
                </div>
                {/* drawer component */}
                <Drawer />
                {/* ./sidebar */}
                <Sidebar />
                {/* products */}
                <div className="col-span-3">
                    <div className="flex items-center mb-4">
                        <select name="sort" id="sort" className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary">
                            <option value>Default sorting</option>
                            <option value="price-low-to-high">Price low to high</option>
                            <option value="price-high-to-low">Price high to low</option>
                            <option value="latest">Latest product</option>
                        </select>
                        <div className="flex gap-2 ml-auto">
                            <div className="border border-primary w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 7a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 7a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM18 5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 7a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 7a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                </svg>
                            </div>
                            <div className="border border-gray-300 w-10 h-9 flex items-center justify-center text-gray-600 rounded cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M3 6h2v2H3V6zm4 0h14v2H7V6zm-4 5h2v2H3v-2zm4 0h14v2H7v-2zm-4 5h2v2H3v-2zm4 0h14v2H7v-2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
                        {/* Products */}
                        {products.map((product, index) => (
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
        </WebLayout>
    );
}