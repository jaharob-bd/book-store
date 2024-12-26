import React from 'react'

export const OrderStatus = ({ actionButton, handleOnchange, handleSubmitCancel }) => {
    const handleSubmit = () => {
        switch (actionButton) {
            case 'Cancel':
                handleSubmitCancel();
                break;
            case 'Invoice':
                // Add Invoice-specific logic
                break;
            case 'Shipped':
                // Add Shipped-specific logic
                break;
            case 'Refund':
                // Add Refund-specific logic
                break;
            default:
                break;
        }
    };

    return (
        <div>
            <form className="p-2 mx-auto" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-1">
                    <div>
                        <label className="dark:text-gray-800" htmlFor="name">Remarks <span className="text-red-600">*</span></label>
                        <textarea
                            name="remarks"
                            type="text"
                            rows={4}
                            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            onChange={handleOnchange}
                        >
                        </textarea >
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 leading-5 transition-colors duration-200 transform bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br"
                    >
                        {actionButton}
                    </button>
                </div>
            </form>
        </div>
    );
};