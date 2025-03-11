import React from 'react';

export const FormVarinantPrice = ({ onChangeInput, handleSubmit }) => {
    return (
        <div>
            <form onSubmit={handleSubmit} className="p-2 mx-auto dark:bg-gray-800">
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-4">
                    <div>
                        <label className="dark:text-gray-200" htmlFor="variant_name">Variant Name <span className="text-red-600">*</span></label>
                        <input
                            name="variant_name"
                            onChange={onChangeInput}
                            type="text"
                            className="form-input block w-full focus:bg-white p-1"
                        />
                    </div>
                    <div>
                        <label className="dark:text-gray-200" htmlFor="buy_price">Buying Price <span className="text-red-600">*</span></label>
                        <input
                            name="buy_price"
                            onChange={onChangeInput}
                            type="number"
                            className="form-input block w-full focus:bg-white p-1"
                        />
                    </div>
                    <div>
                        <label className="dark:text-gray-200" htmlFor="sale_price">Sale Price <span className="text-red-600">*</span></label>
                        <input
                            name="sale_price"
                            onChange={onChangeInput}
                            type="number"
                            className="form-input block w-full focus:bg-white p-1"
                        />
                    </div>
                    <div>
                        <label className="dark:text-gray-200" htmlFor="mrp_price">MRP Price</label>
                        <input
                            name="mrp_price"
                            onChange={onChangeInput}
                            type="number"
                            className="form-input block w-full focus:bg-white p-1"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button className="shadow bg-indigo-700 hover:bg-indigo-500 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded">
                        Add
                    </button>
                </div>
            </form>
        </div>
    );
};
