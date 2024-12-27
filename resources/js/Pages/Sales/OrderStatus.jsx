import React from 'react'

export const OrderStatus = ({ actionButton, handleOnchange, handleSubmit }) => {
    const getButtonText = () => {
        switch (actionButton) {
            case 'Processing':
                return 'Invoice Created';
            case 'Shipped':
                return 'Mark as Shipped';
            case 'Cancelled':
                return 'Cancelled';
            case 'Refunded':
                return 'Refund Issued';
            default:
                return '';
        }
    };
    //  `status` enum('Pending','Processing','Shipped','Delivered','Cancelled','Refunded') DEFAULT 'Pending',

    // const handleSubmit = () => {
    //     switch (actionButton) {
    //         case 'Cancel':
    //             handleSubmitCancel();
    //             break;
    //         case 'Invoice':
    //             // Add Invoice-specific logic
    //             break;
    //         case 'Shipped':
    //             // Add Shipped-specific logic
    //             break;
    //         case 'Refund':
    //             // Add Refund-specific logic
    //             break;
    //         default:
    //             break;
    //     }
    // };

    return (
        <div>
            <form className="p-2 mx-auto" onSubmit={handleSubmit}>
                {
                    actionButton === 'Shipped' && (
                        <div>
                            {/* Carrier Name Input */}
                            <div className="grid grid-cols-1 gap-1 sm:grid-cols-1">
                                <div>
                                    <label className="dark:text-gray-800" htmlFor="carrierName">
                                        Carrier Name
                                    </label>
                                    <input
                                        name="carrierName"
                                        type="text"
                                        className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500"
                                        onChange={handleOnchange}
                                    />
                                </div>
                            </div>

                            {/* Tracking Number Input */}
                            <div className="grid grid-cols-1 gap-1 sm:grid-cols-1">
                                <div>
                                    <label className="dark:text-gray-800" htmlFor="trackingNumber">
                                        Tracking Number
                                    </label>
                                    <input
                                        name="trackingNumber"
                                        type="text"
                                        className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500"
                                        onChange={handleOnchange}
                                    />
                                </div>
                            </div>

                            {/* Source Select */}
                            <div className="grid grid-cols-1 gap-1 sm:grid-cols-1">
                                <div>
                                    <label className="dark:text-gray-800" htmlFor="source">
                                        Source <span className="text-red-600">*</span>
                                    </label>
                                    <select
                                        name="source"
                                        className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500"
                                        onChange={handleOnchange}
                                    >
                                        <option value="admin">Default</option>
                                        <option value="consumer">Consumer</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-1">
                    <div>
                        <label className="dark:text-gray-800" htmlFor="name">Remarks <span className="text-red-600">*</span></label>
                        <textarea
                            name="remarks"
                            type="text"
                            rows={4}
                            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 "
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
                        {getButtonText()}
                    </button>
                </div>
            </form>
        </div>
    );
};