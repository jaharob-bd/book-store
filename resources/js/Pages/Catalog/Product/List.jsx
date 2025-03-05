import { Link } from '@inertiajs/react'
import React from 'react'

export const List = ({ openModal, products }) => {
    return (
        <div className="mx-auto sm:px-2">
            <div className="flex gap-2 justify-between items-center max-sm:flex-wrap">
                <p className="text-xl text-gray-800 dark:text-white font-bold"> Products </p>
                <div className="flex gap-x-2.5 items-center">
                    <div>
                        <div>
                            <div>
                                <button
                                    className="text-gray-900 text-gray-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                    < i className="ri-export-fill"></i>
                                    Export
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2" onClick={openModal}> Create Product </button>
                    </div>
                </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow-md overflow-hidden">
                    <table className="w-full border-collapse bg-gray-100 rounded-md">
                        <thead className="bg-gray-200">
                            <tr className="bg-indigo-500 h-6 border border-indigo-500 text-white">
                                <th className="p-2 text-center w-10">
                                    <input type="checkbox" />
                                </th>
                                <th className="p-2 text-left">
                                    Client / Invoice
                                </th>
                                <th className="p-2 text-center">
                                    Amount
                                </th>
                                <th className="p-2 text-center">
                                    Issued / Due
                                </th>
                                <th className="p-2 text-center">
                                    Status
                                </th>
                                <th className="p-2 text-center" />
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map(product =>
                                (
                                    <tr key={product.id} className="product">
                                        <td className="p-2 border-l border-r border-b border-indigo-500 text-center w-10"><input type="checkbox" className="from-control" /></td>
                                        <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                            <div className="flex">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img className="w-full h-full rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80" alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-gray-600 whitespace-no-wrap"> {product.sku}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                            <p className="text-gray-900 whitespace-no-wrap">$20,000</p>
                                            <p className="text-gray-600 whitespace-no-wrap">USD</p>
                                        </td>
                                        <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                            <p className="text-gray-900 whitespace-no-wrap">Sept 28, 2019</p>
                                            <p className="text-gray-600 whitespace-no-wrap">Due in 3 days</p>
                                        </td>
                                        <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                                <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full" />
                                                <span className="relative">Paid</span>
                                            </span>
                                        </td>
                                        <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                            <Link href={`product-edit/${product.product_url}`} type="button" className="inline-block text-gray-500 hover:text-gray-700">
                                                < i className="ri-edit-circle-line"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
