import React from 'react'
import WebLayout from './Layout/WebLayout';

const OrderSuccess = ({ auth, order_no }) => {
    if (!order_no) {
        return <p>Order number is missing.</p>;
    }

    return (
        <WebLayout auth={auth}>
            <div className="flex items-center justify-center min-h-[50vh] bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                    <div className="flex justify-center items-center mb-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <svg
                                className="w-10 h-10 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-xl font-bold text-gray-800">Order Placed Successfully!</h1>
                    <p className="text-gray-600 mt-2">
                        Thank you for your purchase. Your order number is:
                    </p>
                    <p className="text-lg font-semibold text-gray-800 mt-2">
                        {order_no ? order_no : "N/A"}
                    </p>

                    <div className="mt-6 flex justify-center space-x-4">
                        <a
                            href="/order-details"
                            className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition"
                        >
                            View Order
                        </a>
                        <a
                            href="/"
                            className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300 transition"
                        >
                            Back to Homepage
                        </a>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
};

export default OrderSuccess;
