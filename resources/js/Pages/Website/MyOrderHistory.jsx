import React from 'react';
import MyAccount from './Layout/MyAccount';
import { Link } from '@inertiajs/react';

const MyOrderHistory = ({ auth, orders }) => {
    return (
        <MyAccount auth={auth} title="My Order History">
            <div className="container mx-auto my-4">
                <h2 className="mb-4 text-2xl font-semibold">My Order History</h2>
                <table className="min-w-full table-auto border border-gray-200">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="py-2 px-4 border">#</th>
                            <th className="py-2 px-4 border">Order No</th>
                            <th className="py-2 px-4 border">Order Date</th>
                            <th className="py-2 px-4 border">Subtotal (USD)</th>
                            <th className="py-2 px-4 border">Shipping Fee (USD)</th>
                            <th className="py-2 px-4 border">Total Amount (USD)</th>
                            <th className="py-2 px-4 border">Status</th>
                            <th className="py-2 px-4 border">Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.id} className="bg-white text-gray-700 border-b">
                                <td className="py-2 px-4 border text-center">{index + 1}</td>
                                <td className="py-2 px-4 border text-center">{order.order_no}</td>
                                <td className="py-2 px-4 border text-center">{new Date(order.order_date).toLocaleString()}</td>
                                <td className="py-2 px-4 border text-right">{parseFloat(order.sub_amount).toFixed(2)}</td>
                                <td className="py-2 px-4 border text-right">{parseFloat(order.shipping_fee).toFixed(2)}</td>
                                <td className="py-2 px-4 border text-right">{parseFloat(order.total_amount).toFixed(2)}</td>
                                <td className="py-2 px-4 border text-center">{order.status}</td>
                                <td className="py-2 px-4 border text-center">
                                    <Link
                                        className="flex items-center gap-2 px-4 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                                        href={route('order-details', order.order_no)}
                                    >
                                        <i className="ri-arrow-right-wide-line"></i>
                                        <span>View</span>
                                    </Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </MyAccount>

    );
};

export default MyOrderHistory;

