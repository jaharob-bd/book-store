import { Link } from '@inertiajs/react'
import React from 'react'
export const EmployeeList = ({ openModal, employees }) => {
    return (
        <div className="mx-auto sm:px-2">
            <div className="flex gap-2 justify-between items-center max-sm:flex-wrap">
                <p className="text-xl text-gray-800 dark:text-white font-bold"> List </p>
                <div className="flex gap-x-2.5 items-center">
                    <div>
                        <div>
                            <div>
                                <Link href="hrm"
                                    className="text-gray-900 text-gray-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                    <i className="ri-export-fill"></i>
                                    Export
                                </Link>
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
                                <th className="p-2 text-center">ID</th>
                                <th className="p-2 text-center">Name</th>
                                <th className="p-2 text-center">Email</th>
                                <th className="p-2 text-center">Phone</th>
                                <th className="p-2 text-center">DOB</th>
                                <th className="p-2 text-center">Position</th>
                                <th className="p-2 text-center">Department</th>
                                <th className="p-2 text-center">Status</th>
                                <th className="p-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center w-10">
                                        <input type="checkbox" className="from-control" />
                                    </td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">{employee.id}</td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">{employee.full_name}</td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">{employee.email}</td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">{employee.mobile_number}</td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">{employee.date_of_birth}</td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">{employee.position?.name}</td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">{employee.department?.name}</td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">{employee.status ? 'Active': 'Inactive'}</td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                        <Link href={`/employee-edit/${employee.id}`}>Edit</Link>
                                        <a href="#" className="ml-2">Delete</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}
