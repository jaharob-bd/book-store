import React, { useState, useEffect, forwardRef, useRef } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import Modal from '@/Components/Modal';
import ReactToPrint from 'react-to-print';
import PrintComponent from '@/Components/PrintComponent';

export default function OrderLists({ auth, sales }) {
    const componentRef = useRef();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [saleLists, setSaleLists] = useState(sales);

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
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">

                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Invoice No
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider text-nowrap">
                                        Sub Total
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Discount
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        VAT
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider text-nowrap">
                                        Grand Total
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Paid
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Due
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {saleLists.map((sale) => (
                                    <tr key={sale.id}>
                                        <td className="border-b border-gray-200 bg-white text-sm text-center text-nowrap">
                                            <Link href={`/sales/order/view/${sale.id}`}
                                                className="select-none rounded-lg bg-blue-500 py-1 px-1 mr-1 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                type="button"
                                            >
                                                <i class="ri-apps-2-add-fill"></i>
                                            </Link>
                                        </td>
                                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm text-nowrap">
                                            {sale.sale_uid}
                                        </td>
                                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm text-nowrap">
                                            {sale.customer.name}
                                        </td>
                                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm text-nowrap">
                                            {sale.sale_date}
                                        </td>
                                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                                            {sale.sub_total}
                                        </td>
                                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                                            {sale.discount_amt}
                                        </td>
                                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                                            {sale.VAT_amt}
                                        </td>
                                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                                            {sale.grand_total}
                                        </td>
                                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                                            {sale.paid_amt}
                                        </td>
                                        <td className="px-2 py-2 border-b border-gray-200 bg-white text-sm">
                                            {sale.due_amt}
                                        </td>
                                        <td className="px-2 py-2 border-b border-gray-200 bg-white text">
                                            {sale.status}
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
