export default function Filter() {
    return (
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
    )
}