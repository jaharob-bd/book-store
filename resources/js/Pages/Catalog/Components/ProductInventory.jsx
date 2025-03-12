import React from 'react';

const ProductInventory = ({formData, setFormData }) => {
    return (
        <div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">SKU</label>
                <input type="url"
                    className="w-full p-2 border border-gray-300"
                    placeholder="Enter external URL"
                    value={formData.inventory.sku}
                    onChange={(e) => setFormData(prev => ({ ...prev, inventory: { ...prev.inventory, sku: e.target.value } }))}
                />
            </div>
            <div className="mb-4 flex items-center">
                <input type="checkbox" id="manage-stock" className="mr-2"
                    value={formData.inventory.manageStock}
                    onChange={(e) => setFormData(prev => ({ ...prev, inventory: { ...prev.inventory, manageStock: e.target.checked } }))}
                />
                <label htmlFor="manage-stock" className="text-gray-700">Enable stock management at product level</label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Stock status</label>
                <select className="w-full p-2 border focus:ring focus:ring-blue-300"
                    value={formData.inventory.stockStatus}
                    onChange={(e) => setFormData(prev => ({ ...prev, inventory: { ...prev.inventory, stockStatus: e.target.value } }))}
                >
                    <option>In stock</option>
                    <option>Out of stock</option>
                    <option>On backorder</option>
                </select>
            </div>
            <div className="mb-4 flex items-center">
                <input type="checkbox" id="sold-individually" className="mr-2" />
                <label htmlFor="sold-individually" className="text-gray-700">Enable this to only allow one of this item to be bought in a single order</label>
            </div>
        </div>
    );
}

export default ProductInventory;
