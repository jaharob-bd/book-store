import React from "react";
import WebLayout from "./Layout/WebLayout";

const OrderDetails = ({auth, order}) => {
    // Calculate subtotal
    const calculateSubtotal = () =>
        order.items.reduce((total, item) => total + item.quantity * item.price, 0);

    // Calculate VAT
    const calculateVAT = (subtotal) => (subtotal * order.vatRate) / 100;

    // Calculate grand total
    const calculateGrandTotal = (subtotal, vat, discount, fee) => subtotal - discount + vat + fee; 

    const subtotal = calculateSubtotal();
    const vat = calculateVAT(subtotal);
    const grandTotal = calculateGrandTotal(subtotal, vat, order.discount, order.shippingFee);

    return (
        <WebLayout auth={auth}>
            <div className="bg-gray-100 min-h-screen p-6 flex items-center justify-center">
                <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Invoice</h1>
                            <p className="text-gray-600">Order ID: {order.id}</p>
                            <p className="text-gray-600">Date: {order.date}</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Your Company</h2>
                            <p className="text-gray-600">123 Business St, City</p>
                            <p className="text-gray-600">Email: support@company.com</p>
                            <p className="text-gray-600">Phone: +123 456 7890</p>
                        </div>
                    </div>

                    {/* Customer Details */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">Customer Details</h3>
                        <p className="text-gray-600">Name: {order.customer.name}</p>
                        <p className="text-gray-600">Email: {order.customer.email}</p>
                        <p className="text-gray-600">Phone: {order.customer.phone}</p>
                        <p className="text-gray-600">Address: {order.customer.address}</p>
                    </div>

                    {/* Invoice Items */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">Order Summary</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100 text-left">
                                        <th className="border border-gray-200 p-2">#</th>
                                        <th className="border border-gray-200 p-2">Item</th>
                                        <th className="border border-gray-200 p-2">Quantity</th>
                                        <th className="border border-gray-200 p-2">Price</th>
                                        <th className="border border-gray-200 p-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map((item, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-200 p-2 text-center">
                                                {index + 1}
                                            </td>
                                            <td className="border border-gray-200 p-2">{item.name}</td>
                                            <td className="border border-gray-200 p-2 text-center">
                                                {item.quantity}
                                            </td>
                                            <td className="border border-gray-200 p-2 text-right">
                                                ${item.price.toFixed(2)}
                                            </td>
                                            <td className="border border-gray-200 p-2 text-right">
                                                ${(item.quantity * item.price).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Totals */}
                    <div className="mt-6">
                        <div className="flex justify-end border-t pt-4">
                            <div className="w-full max-w-md">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Discount:</span>
                                    <span className="font-semibold text-gray-800">-${order.discount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">VAT ({order.vatRate}%):</span>
                                    <span className="font-semibold text-gray-800">${vat.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Shipp Fee (50):</span>
                                    <span className="font-semibold text-gray-800">${order.shippingFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between mt-4 border-t pt-4">
                                    <span className="text-lg font-bold text-gray-800">Grand Total:</span>
                                    <span className="text-lg font-bold text-green-500">${grandTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
};

export default OrderDetails;
