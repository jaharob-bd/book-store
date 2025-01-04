import React, { useState } from 'react';
export const OrderStatus = (props) => {
    const { statusData, totalDueAmount, actionButton, actionPaymentMethod, setActionPaymentMethod, handleOnchange, handleSubmit } = props;
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
            case 'Payment':
                return 'Payment';
            default:
                return '';
        }
    };

    const renderTabContent = () => {
        switch (actionPaymentMethod) {
            case 'Cash':
                return (
                    <div></div>
                );
            case 'Bank':
                return (
                    <div>
                        <label className="dark:text-gray-800" htmlFor="bankName">
                            Bank Name
                            <span className="text-red-600">*</span>
                        </label>
                        <input
                            name="bankName"
                            type="text"
                            value={statusData.bankName}
                            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500"
                            onChange={handleOnchange}
                        />
                        <label className="dark:text-gray-800" htmlFor="accountNumber">
                            Account Number
                            <span className="text-red-600">*</span>
                        </label>
                        <input
                            name="accountNumber"
                            type="text"
                            value={statusData.accountNumber}
                            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500"
                            onChange={handleOnchange}
                        />
                    </div>
                );
            case 'Mobile':
                return (
                    <div>
                        <label className="dark:text-gray-800" htmlFor="mobileNumber">
                            Mobile Number
                            <span className="text-red-600">*</span>
                        </label>
                        <input
                            name="mobileNumber"
                            type="text"
                            value={statusData.mobileNumber}
                            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500"
                            onChange={handleOnchange}
                        />
                        <label className="dark:text-gray-800" htmlFor="transactionId">
                            Transaction ID
                            <span className="text-red-600">*</span>
                        </label>
                        <input
                            name="transactionId"
                            type="text"
                            value={statusData.transactionId}
                            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500"
                            onChange={handleOnchange}
                        />
                    </div>
                );
            case 'Card':
                return (
                    <div>
                        <label className="dark:text-gray-800" htmlFor="cardNumber">
                            Card Number
                            <span className="text-red-600">*</span>
                        </label>
                        <input
                            name="cardNumber"
                            type="text"
                            value={statusData.cardNumber}
                            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500"
                            onChange={handleOnchange}
                        />
                        <label className="dark:text-gray-800" htmlFor="cardExpiryDate">
                            Expiry Date
                            <span className="text-red-600">*</span>
                        </label>
                        <input
                            name="cardExpiryDate"
                            type="month"
                            value={statusData.cardExpiryDate}
                            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500"
                            onChange={handleOnchange}
                        />
                        <label className="dark:text-gray-800" htmlFor="cardCVV">CVV</label>
                        <input
                            name="cardCVV"
                            type="password"
                            value={statusData.cardCVV}
                            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500"
                            onChange={handleOnchange}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <form className="p-2 mx-auto" onSubmit={handleSubmit}>

                {actionButton === 'Payment' && (
                    <div>
                        {/* Tabs */}
                        <div className="flex justify-center mb-2">
                            <span
                                className="px-4 py-2 mx-1 rounded-md bg-red-600 font-bold text-white"
                            >Total Due Amount {totalDueAmount}</span>
                            {['Cash', 'Bank', 'Mobile', 'Card'].map((tab) => (
                                <button
                                    key={tab}
                                    type="button"
                                    className={`px-4 py-2 mx-1 rounded-md ${actionPaymentMethod === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                                    onClick={() => setActionPaymentMethod(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div>
                            <label className="dark:text-gray-800" htmlFor="amount">Amount
                                <span className="text-red-600">*</span>
                            </label>
                            <input
                                name="amount"
                                type="number"
                                value={statusData.amount}
                                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500"
                                onChange={handleOnchange}
                            />
                        </div>
                        {/* Tab Content */}
                        <div className="rounded-md">
                            {renderTabContent()}
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-1">
                    <div>
                        <label className="dark:text-gray-800" htmlFor="remarks">Remarks</label>
                        <textarea
                            name="remarks"
                            type="text"
                            rows={4}
                            className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500"
                            onChange={handleOnchange}
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br"
                    >
                        {getButtonText()}
                    </button>
                </div>
            </form>
        </div>
    );
};
