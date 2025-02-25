import React, { useState, useEffect, forwardRef, useRef } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import Modal from '@/Components/Modal';
import ReactToPrint from 'react-to-print';
import PrintComponent from '@/Components/PrintComponent';

export default function OrderLists({ auth, orders }) {
    const componentRef = useRef();
    const [isOpenModal, setIsOpenModal] = useState(false);
    // const [orders, setOrders] = useState(orders);

    // console.log(errors);
    const { t } = useTranslation();

    const closeModal = () => {
        setIsOpenModal(false);
        reset();
    };
    const openModal = () => {
        setIsOpenModal(true);
    };

    return (
        <AuthenticatedLayout user={auth.user} header={'Purchases List'}>
            <Head title="Order List" />
            <div className="mx-auto sm:px-2">
                <div className="flex gap-2 justify-between items-center max-sm:flex-wrap">
                    <p className="text-xl text-gray-800 dark:text-white font-bold"> Sales Orders List </p>
                    <div className="flex gap-x-2.5 items-center">
                        <div>
                            <Link
                                className="text-gray-900 text-gray-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                < i className="ri-export-fill"></i>
                                Export
                            </Link>
                        </div>
                        <div>
                            <Link
                                href={route('order.create')}
                                type="button"
                                className="text-white bg-gradient-to-r from-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 active:bg-gray-900/20 via-blue-600 to-blue-700">
                                <i className="ri-add-circle-line p-1"></i>
                                Create Order
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md overflow-hidden">
                        <table className="w-full border-collapse bg-gray-100 rounded-md">
                            <thead className="bg-gray-200">
                                <tr className="bg-indigo-500 h-6 border border-indigo-500 text-white">
                                    <th className="p-2 text-left w-1">
                                        #
                                    </th>
                                    <th className="p-2 text-left">
                                        Invoice No
                                    </th>
                                    <th className="p-2 text-center">
                                        Customer
                                    </th>
                                    <th className="p-2 text-center">
                                        Date
                                    </th>
                                    <th className="p-2 text-center text-nowrap">
                                        Sub Total
                                    </th>
                                    <th className="p-2 text-center">
                                        Discount
                                    </th>
                                    <th className="p-2 text-center">
                                        VAT
                                    </th>
                                    <th className="p-2 text-center text-nowrap">
                                        Shipping Fee
                                    </th>
                                    <th className="p-2 text-center text-nowrap">
                                        Grand Total
                                    </th>
                                    <th className="p-2 text-center">
                                        Paid
                                    </th>
                                    <th className="p-2 text-center">
                                        Due
                                    </th>
                                    <th className="p-2 text-center">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="p-2 border-l border-r border-b border-indigo-500">
                                            <Link href={`/sales/order/view/${order.id}`}
                                                className="select-none rounded-lg bg-blue-500 py-1 px-1 mr-1 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                type="button"
                                            >
                                                <i class="ri-apps-2-add-fill"></i>
                                            </Link>
                                        </td>
                                        <td className="p-2 border-l border-r border-b border-indigo-500">
                                            {order.order_no}
                                        </td>
                                        <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                            {order.customer.name}
                                        </td>
                                        <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                            {order.order_date}
                                        </td>
                                        <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                            {order.sub_amount}
                                        </td>
                                        <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                            {order.discount_amount}
                                        </td>
                                        <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                            {order.tax_amount}
                                        </td>
                                        <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                            {order.shipping_fee}
                                        </td>
                                        <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                            {order.total_amount}
                                        </td>
                                        <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                            {order.paid_amt}
                                        </td>
                                        <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                            {order.due_amt}
                                        </td>
                                        <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                            {order.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={isOpenModal} title='View Purchase' maxWidth='2xl' modalPosition='items-top' onClose={closeModal}>
                <PrintComponent ref={componentRef} />
            </Modal>
        </AuthenticatedLayout>
    );
}
