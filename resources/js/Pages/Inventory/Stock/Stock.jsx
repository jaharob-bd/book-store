import React, { useState, useEffect, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import ReactToPrint from 'react-to-print';

export default function Stock({ auth, stocks }) {
    const componentRef = useRef();
    const { t } = useTranslation();
    const [stockLists, setStockLists] = useState(stocks);

    useEffect(() => {
        fetchStockInfo();
        console.log('Updated stockLists:', stockLists); // Log the updated stockLists
    }, [stockLists]);

    const fetchStockInfo = async () => {
        try {
            const response = await fetch(`/get-stocks`);
            const data = await response.json();
            // console.log(data);
            setStockLists(data);
        } catch (error) {
            console.error('Error fetching voucher info:', error);
        }
    };

    const groupedStocks = stockLists.reduce((acc, stock) => {
        if (!acc[stock.product_name]) {
            acc[stock.product_name] = [];
        }
        acc[stock.product_name].push(stock);
        return acc;
    }, {});

    return (
        <AuthenticatedLayout user={auth.user} header={'stocks List'}>
            <Head title="Stock List" />
            <div className="mx-auto sm:px-2">
                <div className="flex gap-2 justify-between items-center max-sm:flex-wrap">
                    <p className="text-xl text-gray-800 dark:text-white font-bold"> stocks </p>
                    <div className="flex gap-x-2.5 items-center">
                        <div>
                            <Link
                                className="text-gray-900 text-gray-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                < i className="ri-export-fill"></i>
                                Export
                            </Link>
                        </div>
                        <ReactToPrint
                            trigger={() => (
                                <button
                                    className="select-none rounded-lg bg-amber-500 py-1 px-2 mr-2 text-center align-middle font-sans text-xs text-black shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                >
                                    <i className="ri-printer-line p-1"></i>
                                    Print
                                </button>
                            )}
                            content={() => componentRef.current}
                        />
                    </div>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md overflow-hidden">
                        <table ref={componentRef} className="min-w-full leading-normal border-collapse border border-black">
                            <thead>
                                <tr>
                                    <th className="px-2 py-2 border-b-2 border-black bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th className="px-2 py-2 border-b-2 border-black bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Variant
                                    </th>
                                    <th className="px-2 py-2 border-b-2 border-black bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Quantity
                                    </th>
                                    <th className="px-2 py-2 border-b-2 border-black bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Last Updated
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(groupedStocks).map((productName) => {
                                    const stocks = groupedStocks[productName];
                                    const rowspan = stocks.length;

                                    return stocks.map((stock, index) => (
                                        <tr key={stock.id}>
                                            {index === 0 && (
                                                <td
                                                    className="border-b border-black bg-white text-sm text-nowrap"
                                                    rowSpan={rowspan}
                                                >
                                                    {productName}
                                                </td>
                                            )}
                                            <td className="border border-black bg-white text-sm text-nowrap">
                                                {stock.variant_name}
                                            </td>
                                            <td className="border border-black bg-white text-sm text-nowrap">
                                                {stock.quantity}
                                            </td>
                                            <td className=" border-b border-black bg-white text-sm">
                                                {stock.last_updated}
                                            </td>
                                        </tr>
                                    ));
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
