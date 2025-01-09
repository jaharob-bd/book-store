import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper core styles
import 'swiper/css/navigation'; // Swiper navigation styles
import 'swiper/css/pagination'; // Swiper pagination styles
import { Navigation, Pagination } from 'swiper/modules';
import ProductLink from '../Components/ProductLink';
import WishLink from '../Components/WishLink';
import AddToCartLink from '../Components/AddToCartLink';

const NewArrival = ({ products }) => {
    return (
        <div>
            <div className="container pb-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                    Top New Arrival
                </h2>
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                >
                    {products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <div className="bg-white shadow rounded overflow-hidden group">
                                <div className="relative">
                                    <img src={`image.png`} alt={product.name} className="w-full" />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                        <ProductLink product={product} />
                                        <WishLink product={product} />
                                    </div>
                                </div>
                                <div className="pt-4 pb-3 px-4">
                                    <a href="#">
                                        <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                                            {product.name}
                                        </h4>
                                    </a>
                                    <div className="flex items-baseline mb-1 space-x-2">
                                        <p className="text-xl text-primary font-semibold">${product.sale_price}</p>
                                        <p className="text-sm text-gray-400 line-through">${product.mrp_price}</p>
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
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default NewArrival;
