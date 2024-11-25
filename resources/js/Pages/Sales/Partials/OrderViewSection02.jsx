import React from 'react'

export const OrderViewSection02 = ({ saleData, customerData }) => {
    return (
        <div className="w-full md:w-4/12 flex-grow flex px-3">
            <div className="bg-white rounded-3xl flex flex-col w-full py-6">
                <div className="card border border-indigo-500 mt-2">
                    <div className="card-header bg-indigo-500 text-white pl-2 p-1">
                        Customer Details
                    </div>
                    <div className="p-2">
                        <p>Name: {customerData.name}</p>
                        <p>Email: {customerData.email}</p>
                        <p>Phone: {customerData.phone}</p>
                        <p>Created at: {customerData.created_at}</p>
                        <p>Customer Type: {customerData.customer_group_name}</p>
                    </div>
                </div>
                <div className="card border border-indigo-500 mt-2">
                    <div className="card-header bg-indigo-500 text-white pl-2 p-1">
                        Shipment Details
                    </div>
                    <div className="p-2">
                        <p>1. Checking the network cables, modem, and router</p>
                        <p>2. Reconnecting to Wi-Fi</p>
                        <p>3. Running Windows Network Diagnostics</p>
                    </div>
                </div>
                <div className="card border border-indigo-500 mt-2">
                    <div className="card-header bg-indigo-500 text-white pl-2 p-1">
                        Refund Details
                    </div>
                    <div className="p-2">
                        <p>1. Checking the network cables, modem, and router</p>
                        <p>2. Reconnecting to Wi-Fi</p>
                        <p>3. Running Windows Network Diagnostics</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
