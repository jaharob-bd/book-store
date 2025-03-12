import React from 'react';

const ProductGeneral = ({formData, setFormData }) => {
    return (
        <div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Product URL</label>
                <input type="url"
                    className="w-full p-2 border border-gray-300"
                    placeholder="Enter external URL"
                    value={formData.general?.productUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, general: { ...prev.general, productUrl: createSlug(e.target.value) } }))}
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 font-medium">Regular Price ($)</label>
                    <input type="number"
                        className="w-full p-2 border border-gray-300"
                        value={formData.general.regularPrice}
                        onChange={(e) => setFormData(prev => ({ ...prev, general: { ...prev.general, regularPrice: e.target.value } }))}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Sale Price ($)</label>
                    <input type="number"
                        className="w-full p-2 border border-gray-300"
                        placeholder="Enter sale price"
                        value={formData.general.salePrice}
                        onChange={(e) => setFormData(prev => ({ ...prev, general: { ...prev.general, salePrice: e.target.value } }))}
                    />
                </div>
            </div>
            <div className="mb-4 mt-4">
                <label className="block text-gray-700 font-medium">Tax Status</label>
                <select className="w-full p-2 border border-gray-300"
                    value={formData.general?.taxStatus}
                    onChange={(e) => setFormData(prev => ({ ...prev, general: { ...prev.general, taxStatus: e.target.value } }))}
                >
                    <option selected>Taxable</option>
                    <option>None</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Tax Class</label>
                <select
                    className="w-full p-2 border border-gray-300"
                    value={formData.general?.taxClass}
                    onChange={(e) => setFormData(prev => ({ ...prev, general: { ...prev.general, taxClass: e.target.value } }))}
                >
                    <option selected>Standard</option>
                    <option>Reduced Rate</option>
                    <option>Zero Rate</option>
                </select>
            </div>
            {/* add more */}
        </div>
    );
}

export default ProductGeneral;
