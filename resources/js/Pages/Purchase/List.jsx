import React, { useState, useEffect, forwardRef, useRef } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import Modal from '@/Components/Modal';
import ReactToPrint from 'react-to-print';
import PrintComponent from '@/Components/PrintComponent';

export default function List({ auth, purchases }) {
    const componentRef = useRef();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [purchaseLists, setPurchaseLists] = useState(purchases);

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
            <Head title="Purchases" />
            <div className="mx-auto sm:px-2">
                <div className="flex gap-2 justify-between items-center max-sm:flex-wrap">
                    <p className="text-xl text-gray-800 dark:text-white font-bold"> Purchases </p>
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
                                href={route('purchases')}
                                type="button"
                                className="text-white bg-gradient-to-r from-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2 active:bg-gray-900/20 via-blue-600 to-blue-700">
                                <i className="ri-add-circle-line p-1"></i>
                                Create Purchases
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        <input type="checkbox" />
                                    </th> */}
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Invoice No
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Batch No
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Purchase Date
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Sub Total
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Discount
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        VAT
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Grand Total
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Paid Total
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Due Total
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchaseLists.map((purchase) => (
                                    <tr key={purchase.id}>
                                        {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <input type="checkbox" className="form-control" />
                                        </td> */}
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-nowrap">
                                            {purchase.purchase_uid}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-nowrap">
                                            {purchase.batch_no}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-nowrap">
                                            {purchase.purchase_date}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {purchase.sub_total}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {purchase.discount_amt}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {purchase.VAT_amt}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {purchase.grand_total}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {purchase.paid_amt}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {purchase.due_amt}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text">
                                            {purchase.status}
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text text-nowrap	">
                                            {/* <ReactToPrint
                                                trigger={() => (
                                                    <button
                                                        className="select-none rounded-lg bg-amber-500 py-1 px-2 mr-1 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                        type="button"
                                                    >
                                                        <i className="ri-printer-line"></i>
                                                    </button>
                                                )}
                                                content={() => componentRef.current}
                                            /> */}
                                            <Link href={`/purchase-list/${purchase.id}`}
                                                className="select-none rounded-lg bg-blue-500 py-1 px-2 mr-1 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                type="button"
                                            >
                                                <i className="ri-eye-line"></i>
                                                show
                                            </Link>
                                            {/* <button
                                                className="select-none rounded-lg bg-blue-500 py-1 px-2 mr-1 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                type="button"
                                                onClick={openModal}
                                            >
                                                <i className="ri-eye-line"></i>
                                            </button> */}
                                            <button
                                                className="select-none rounded-lg bg-green-500 py-1 px-2 mr-1 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                type="button"
                                            >
                                                <i className="ri-pencil-line"></i>

                                            </button>
                                            <button
                                                className="select-none rounded-lg bg-red-500 py-1 px-2 mr-1 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                                type="button"
                                            >
                                                <i className="ri-delete-bin-line"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={isOpenModal} title='View Purchase' maxWidth='6xl' modalPosition='items-top' onClose={closeModal}>
                <PrintComponent ref={componentRef} />
            </Modal>
        </AuthenticatedLayout>
    );
}
