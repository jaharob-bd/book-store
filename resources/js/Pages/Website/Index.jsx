import React, { useState, useEffect, useContext, Suspense } from 'react';
import WebLayout from './Layout/WebLayout';
import { CartContext } from './context/CartContext';

const Banner = React.lazy(() => import('./Home/Banner'));
const Features = React.lazy(() => import('./Home/Features'));
const Categories = React.lazy(() => import('./Home/Categories'));
const NewArrival = React.lazy(() => import('./Home/NewArrival'));
const Ads = React.lazy(() => import('./Home/Ads'));
const ProductLink = React.lazy(() => import('./Components/ProductLink'));
const WishLink = React.lazy(() => import('./Components/WishLink'));
const AddToCartLink = React.lazy(() => import('./Components/AddToCartLink'));

export default function Index({ auth, products }) {
    const { addToCart } = useContext(CartContext);

    return (
        <WebLayout auth={auth}>
            {/* Use Suspense for lazy-loaded components */}
            <Suspense fallback={<div>Loading...</div>}>
                <Banner />
                <Features />
                <Categories />
                <NewArrival products={products} />
                <Ads />

                <div className="container pb-16">
                    <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">recomended for you</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
            </Suspense>
        </WebLayout>
    );
}


// root
// import React, { useState, useEffect, useContext } from 'react';
// import WebLayout from './Layout/WebLayout';
// import Banner from './Home/Banner';
// import Features from './Home/Features';
// import Categories from './Home/Categories';
// import NewArrival from './Home/NewArrival';
// import Ads from './Home/Ads';
// import { CartContext } from './context/CartContext';
// import ProductLink from './Components/ProductLink';
// import WishLink from './Components/WishLink';
// import AddToCartLink from './Components/AddToCartLink';
// const ComponentName = React.lazy(() => import('./ComponentName'));

// export default function Index({ auth, products }) {
//     const { addToCart } = useContext(CartContext);
//     return (
//         <WebLayout auth={auth}>
//             <Banner />
//             <Features />
//             <Categories />
//             <NewArrival products={products} />
//             <Ads />
//             <div className="container pb-16">
//                 <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">recomended for you</h2>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                     {products.map((product, index) => (
//                         <div key={index} className="bg-white shadow rounded overflow-hidden group">
//                             <div className="relative">
//                                 <img src="image.png" alt="product 1" className="w-full" />
//                                 <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
//                                     <ProductLink slug={product.url_key} />
//                                     <WishLink product={product} />
//                                 </div>
//                             </div>
//                             <div className="pt-4 pb-3 px-4">
//                                 <a href="#">
//                                     <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">{product.name}</h4>
//                                 </a>
//                                 <div className="flex items-baseline mb-1 space-x-2">
//                                     <p className="text-xl text-primary font-semibold">{product.sale_price}</p>
//                                     <p className="text-sm text-gray-400 line-through">{product.mrp_price}</p>
//                                 </div>
//                                 <div className="flex items-center">
//                                     <div className="flex gap-1 text-sm text-yellow-400">
//                                         <span><i className="fa-solid fa-star" /></span>
//                                         <span><i className="fa-solid fa-star" /></span>
//                                         <span><i className="fa-solid fa-star" /></span>
//                                         <span><i className="fa-solid fa-star" /></span>
//                                         <span><i className="fa-solid fa-star" /></span>
//                                     </div>
//                                     <div className="text-xs text-gray-500 ml-3">(150)</div>
//                                 </div>
//                             </div>
//                             <AddToCartLink product={product} />
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </WebLayout>
//     );
// }