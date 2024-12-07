import React from 'react';

const NewArrival = () => {
    const products = [
        { id: 1, name: 'Guyer Chair', price: 45.00, oldPrice: 55.90, rating: 5, image: 'default.png' },
        { id: 2, name: 'Modern Lamp', price: 30.00, oldPrice: 40.90, rating: 4, image: 'default.png' },
        { id: 3, name: 'Stylish Sofa', price: 250.00, oldPrice: 300.90, rating: 5, image: 'default.png' },
        { id: 4, name: 'Contemporary Table', price: 100.00, oldPrice: 120.90, rating: 4, image: 'default.png' },
        // Add more products if needed
    ];

    return (
        <div>
            <div className="container pb-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                    Top New Arrival
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {products.slice(0, 4).map(product => (
                        <div key={product.id} className="bg-white shadow rounded overflow-hidden group">
                            <div className="relative">
                                <img src={product.image} alt={product.name} className="w-full" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                    <a href="#" className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="view product">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12c0 1.656-1.343 3-3 3s-3-1.344-3-3 1.343-3 3-3 3 1.344 3 3z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.522 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S3.732 16.057 2.458 12z" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition" title="add to wishlist">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3.172 3.172a4 4 0 015.656 0l.172.172.172-.172a4 4 0 115.656 5.656L12 12.172l-3.828-3.828a4 4 0 00-5.656 0 4 4 0 000 5.656L12 21.828l9.172-9.172a4 4 0 00-5.656-5.656L12 3.172"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div className="pt-4 pb-3 px-4">
                                <a href="#">
                                    <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">{product.name}</h4>
                                </a>
                                <div className="flex items-baseline mb-1 space-x-2">
                                    <p className="text-xl text-primary font-semibold">${product.price.toFixed(2)}</p>
                                    <p className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex gap-1 text-sm text-yellow-400">
                                        {[...Array(product.rating)].map((_, i) => (
                                            <span key={i}><i className="fa-solid fa-star" /></span>
                                        ))}
                                    </div>
                                    <div className="text-xs text-gray-500 ml-3">(150)</div>
                                </div>
                            </div>
                            <a href="#" className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">Add to cart</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NewArrival;
