import React from 'react'

export const FormGroupPrice = ({ onChangeInput, handleSubmit }) => {
    return (
        <div>
            <form onSubmit={handleSubmit} className="p-2 mx-auto dark:bg-gray-800">
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-4">
                    <div>
                        <label className="dark:text-gray-200" htmlFor="name">Group Name <span className="text-red-600">*</span></label>
                        <select
                            name="customer_group_id"
                            onChange={onChangeInput}
                            className="form-input block w-full focus:bg-white p-1"
                        >
                            <option value="">-Select-</option>
                            <option value="1">Wholesaler</option>
                            <option value="2">Resaler</option>
                            <option value="3">Premium Customer</option>
                            <option value="4">Golden Customer</option>
                        </select>
                    </div>
                    <div>
                        <label className="dark:text-gray-200" htmlFor="url_key">Discount Type <span className="text-red-600">*</span></label>
                        <select
                            name="discount_type"
                            onChange={onChangeInput}
                            className="form-input block w-full focus:bg-white p-1"
                        >
                            <option value="">-Select-</option>
                            <option value="1">Fixed</option>
                            <option value="2">Percentage</option>
                        </select>
                    </div>
                    <div>
                        <label className="dark:text-gray-200" htmlFor="sku">Quantity <span className="text-red-600">*</span></label>
                        <input
                            name="qty"
                            type="number"
                            onChange={onChangeInput}
                            className="form-input block w-full focus:bg-white p-1"
                        />
                    </div>
                    <div>
                        <label className="dark:text-gray-200" htmlFor="product_code">Amount
                            <span className="text-red-600">*</span>
                        </label>
                        <input
                            name="amount"
                            type="number"
                            onChange={onChangeInput}
                            className="form-input block w-full focus:bg-white p-1"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button className="px-6 py-2 leading-5 transition-colors duration-200 transform  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br">
                        Add
                    </button>
                </div>
            </form>
        </div>
    )
}
