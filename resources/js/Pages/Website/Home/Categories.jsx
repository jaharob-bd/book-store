import React from 'react';

const Categories = () => {
    return (
        <div>
            <div className="container py-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">shop by category</h2>
                <div className="grid grid-cols-3 gap-3">
                    <div className="relative rounded-sm overflow-hidden group">
                        <img src="image.png" alt="category 1" className="w-full" />
                        <a href="#" className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Bedroom</a>
                    </div>
                    <div className="relative rounded-sm overflow-hidden group">
                        {/* <img src="default.png" alt="category 1" className="w-full" /> */}
                        <a href="#" className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Mattrass</a>
                    </div>
                    <div className="relative rounded-sm overflow-hidden group">
                        {/* <img src="default.png" alt="category 1" className="w-full" /> */}
                        <a href="#" className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Outdoor
                        </a>
                    </div>
                    <div className="relative rounded-sm overflow-hidden group">
                        {/* <img src="default.png" alt="category 1" className="w-full" /> */}
                        <a href="#" className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Sofa</a>
                    </div>
                    <div className="relative rounded-sm overflow-hidden group">
                        
                        {/* <img src="default.png" alt="category 1" className="w-full" /> */}
                        <a href="#" className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Living
                            Room</a>
                    </div>
                    <div className="relative rounded-sm overflow-hidden group">
                        {/* <img src="default.png" alt="category 1" className="w-full" /> */}
                        <a href="#" className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">Kitchen</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Categories;
