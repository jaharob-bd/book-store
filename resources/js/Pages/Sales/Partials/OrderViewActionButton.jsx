import React from 'react'
import ReactToPrint from 'react-to-print';
import { Head, Link } from '@inertiajs/react';

export const OrderViewActionButton = (props) => {
    const { order, openModal, handleDownload, isLoading, sendEmail } = props;
    return (
        <div className="flex flex-wrap gap-2.5 items-center">
            <div>
                {
                    order?.status != 'Processing' && order?.status != 'Cancelled' && order?.status != 'Shipped' ?
                        <button
                            className="bg-green-700 text-green-100 hover:bg-green-800 select-none rounded-lg py-1 px-2 mr-1 text-center align-middle font-sans text-xs uppercase text-black shadow-md shadow-green-400/20 transition-all hover:shadow-lg hover:shadow-green-400/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled"
                            onClick={() => openModal('Processing')}
                        >
                            <i className="ri-bill-line pr-1"></i>
                            Invoice
                        </button>
                        :
                        null
                }
                {
                    order?.status == 'Processing' && order?.status != 'Cancelled' ?
                        <button
                            className="bg-red-700 text-green-100 hover:bg-red-800 select-none rounded-lg py-1 px-2 mr-1 text-center align-middle font-sans text-xs uppercase text-black shadow-md shadow-green-400/20 transition-all hover:shadow-lg hover:shadow-green-400/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled"
                            onClick={() => openModal('Shipped')}
                        >
                            <i className="ri-bill-line pr-1"></i>
                            Shipment
                        </button>
                        :
                        null
                }
                {
                    order?.status != 'Refunded' && order?.status != 'Cancelled' ?
                        <button
                            className="bg-blue-500 hover:bg-blue-600 select-none rounded-lg py-1 px-2 mr-1 text-center align-middle font-sans text-xs uppercase text-black shadow-md shadow-yellow-500/20 transition-all hover:shadow-lg hover:shadow-yellow-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            onClick={() => openModal('Payment')}
                        >
                            <i className="ri-refund-line pr-1"></i>
                            Payment
                        </button>
                        :
                        null
                }
                {
                    order?.status != 'Refunded' && order?.status != 'Cancelled' && order.paid_amt > 0 ?
                        <button
                            className="bg-yellow-500 hover:bg-yellow-600 select-none rounded-lg py-1 px-2 mr-1 text-center align-middle font-sans text-xs uppercase text-black shadow-md shadow-yellow-500/20 transition-all hover:shadow-lg hover:shadow-yellow-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            onClick={() => openModal('Refunded')}
                        >
                            <i className="ri-refund-line pr-1"></i>
                            Refund
                        </button>
                        :
                        null
                }
                {
                    order?.status != 'canceled' ?
                        <button
                            className="bg-red-600 text-red-100 hover:bg-red-700 select-none rounded-lg py-1 px-2 mr-1 text-center align-middle font-sans text-xs uppercase text-black shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            onClick={() => openModal('Cancelled')}
                        >
                            <i className="ri-close-circle-line pr-1"></i>
                            Cancel
                        </button>
                        :
                        null
                }
                <ReactToPrint
                    trigger={() => (
                        <button
                            className="bg-blue-500 text-blue-100 hover:bg-blue-600 select-none rounded-lg py-1 px-2 mr-1 text-center align-middle font-sans text-xs uppercase text-black shadow-md shadow-blue-400/20 transition-all hover:shadow-lg hover:shadow-blue-400/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            <i className="ri-printer-line pr-1"></i>
                            Print
                        </button>
                    )}
                    content={() => componentRef.current}
                />

                <Link
                    className="bg-indigo-700 text-indigo-100 hover:bg-indigo-800 select-none rounded-lg py-1 px-2 mr-1 text-center align-middle font-sans text-xs uppercase text-black shadow-md shadow-indigo-400/20 transition-all hover:shadow-lg hover:shadow-indigo-400/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    onClick={handleDownload} disabled={isLoading}
                >
                    <i className="ri-file-download-line pr-1"></i>
                    {isLoading ? 'Downloading......' : 'Download'}
                </Link>
                <Link
                    className="bg-orange-500 text-orange-100 hover:bg-orange-800 select-none rounded-lg py-1 px-2 mr-1 text-center align-middle font-sans text-xs uppercase text-black shadow-md shadow-orange-400/20 transition-all hover:shadow-lg hover:shadow-orange-400/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    onClick={sendEmail}
                >
                    <i className="ri-mail-send-line pr-1"></i>
                    Send Email
                </Link>
                <Link
                    href={route('orders')}
                    type="button"
                    className="bg-gray-900 text-gray-100 select-none rounded-lg py-1 px-2 mr-1 text-center align-middle font-sans text-xs uppercase text-black shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    <i className="ri-arrow-go-back-line pr-1"></i>
                    Back
                </Link>
            </div>
        </div>
    )
}
