import React from 'react';

export const List = ({ openModal, suppliers }) => {
    return (
        <div className="mx-auto sm:px-2">
            <div className="flex gap-2 justify-between items-center max-sm:flex-wrap">
                <p className="text-xl text-gray-800 dark:text-white font-bold">Suppliers</p>
                <div className="flex gap-x-2.5 items-center">
                    <div>
                        <button
                            className="text-gray-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                            <i className="ri-export-fill"></i>
                            Export
                        </button>
                    </div>
                    <div>
                        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2" onClick={() => openModal()}>Create Supplier</button>
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
                                    Name
                                </th>
                                <th className="p-2 text-left">
                                    Contact Person
                                </th>
                                <th className="p-2 text-center">
                                    Email
                                </th>
                                <th className="p-2 text-center">
                                    Phone
                                </th>
                                <th className="p-2 text-center">
                                    Address
                                </th>
                                <th className="p-2 text-center">
                                    Status
                                </th>
                                <th className="p-2 text-center" />
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers?.map((supplier) => (
                                <tr key={supplier.id} className="supplier">
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center w-10">
                                        <input type="checkbox" className="form-control" />
                                    </td>
                                    <td className="p-2 px-3 border-l border-r border-b border-indigo-500 text-left">
                                        {supplier.name}
                                    </td>
                                    <td className="p-2 px-3 border-l border-r border-b border-indigo-500 text-left">
                                        {supplier.contact_person}
                                    </td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                        {supplier.email}
                                    </td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                        {supplier.phone}
                                    </td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                        {supplier.address}
                                    </td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                        <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${supplier.status === 1 ? 'text-green-900' : 'text-red-900'}`}>
                                            <span aria-hidden className={`absolute inset-0 ${supplier.status === 1 ? 'bg-green-200' : 'bg-red-200'} opacity-50 rounded-full`} />
                                            <span className="relative">{supplier.status === 1 ? 'Active' : 'Inactive'}</span>
                                        </span>
                                    </td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                        <button onClick={() => openModal(supplier)} type="button" className="inline-block text-gray-500 hover:text-gray-700">
                                            <i className="ri-edit-circle-line"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
