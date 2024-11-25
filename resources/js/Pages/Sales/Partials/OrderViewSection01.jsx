import React from 'react'

export const OrderViewSection01 = ({ saleData, subTotal, discountAmount, vatAmount, totalAmount }) => {
    return (
        <div className="w-full md:w-8/12 flex-grow flex">
            <div className="flex flex-col bg-blue-gray-50 h-full w-full py-2">
                <div className="h-full overflow-hidden mt-4">
                    <div className="p-1">
                        <p className="font-bold">
                            INVOICE : <span className="text-red-500">{saleData.sale_uid}</span>
                        </p>
                        <p>
                            Date : <span className="">{saleData.sale_date}</span>
                        </p>
                        {/* <p>
                            Order Status : <span className="uppercase">{saleData?.status}</span>
                        </p> */}
                        <p>
                            Payment Status : <span className="">{saleData?.due_amt > 0 ? 'Unpaid' : 'Full Paid'}</span>
                        </p>
                    </div>
                    <div className="-mx-4 mt-2 flow-root sm:mx-0">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-indigo-500 h-6 border border-indigo-500 text-white">
                                    <th className="border-l border-r border-b border-indigo-500">Sl.</th>
                                    <th className="border-l border-r border-b border-indigo-500">Name [Variant Name]</th>
                                    <th className="border-l border-r border-b border-indigo-500">Price</th>
                                    <th className="border-l border-r border-b border-indigo-500">Qty</th>
                                    <th className="border-l border-r border-b border-indigo-500">Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {saleData.sale_details.map((item, index) => {
                                    const itemTotal = item.quantity * item.price;
                                    return (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="pl-1 border-l border-r border-b border-indigo-500">{index + 1}</td>
                                            <td className="pl-1 border-l border-r border-b border-indigo-500">
                                                <div className="font-medium text-gray-900">
                                                    {item.product_name} {item.variant_name}
                                                </div>
                                            </td>

                                            <td className="pl-1 border-l border-r border-b border-indigo-500">
                                                {item.price}
                                            </td>
                                            <td className="pl-1 border-l border-r border-b border-indigo-500 text-center">
                                                {item.quantity}
                                            </td>
                                            <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">
                                                {itemTotal.toFixed(2)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th scope="row" colSpan={4} className="pl-1 text-right">
                                        Sub Total
                                    </th>
                                    <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">
                                        ${subTotal.toFixed(2)}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" colSpan={4} className="pl-1 text-right">
                                        Discount {saleData.discount_type === 1 ? ' (%)' : ' ($)'}
                                    </th>
                                    <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">
                                        ${discountAmount || discountAmount.toFixed(2)}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" colSpan={4} className="pl-1 text-right">
                                        VAT {saleData.VAT_type === 1 ? ' (%)' : ' ($)'}
                                    </th>
                                    <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">
                                        ${vatAmount.toFixed(2)}
                                    </td>
                                </tr>
                                <tr>
                                    <th colSpan={4} scope="row" className="pl-1 text-right">
                                        Grand Total
                                    </th>
                                    <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">
                                        ${totalAmount.toFixed(2)}
                                    </td>
                                </tr>
                                <tr>
                                    <th colSpan={4} className="pl-1 text-right">
                                        Paid
                                    </th>
                                    <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">
                                        ${saleData?.paid_amt}
                                    </td>
                                </tr>
                                <tr>
                                    <th colSpan={4} className="pl-1 text-right">
                                        Due
                                    </th>
                                    <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">
                                        ${saleData?.due_amt}
                                    </td>
                                </tr>
                                <tr>
                                    <th colSpan={4} className="pl-1 border-b border-r border-b border-indigo-500 text-right">
                                        Change Amt
                                    </th>
                                    <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">
                                        ${saleData?.change_amt}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="py-2 mt-4 font-bold">
                            Payment Details:
                        </div>

                        {
                            saleData?.payment_details?.length ?
                                <table className="border border-gray-300">
                                    <thead className="border-b border-gray-300">
                                        <tr className="bg-indigo-500 h-6 border border-indigo-500 text-white">
                                            <th className="border-l border-r border-b border-indigo-500">Sl</th>
                                            <th scope="col" className="border-l border-r border-b border-indigo-500">ID</th>
                                            <th scope="col" className="tborder-l border-r border-b border-indigo-500">Amount</th>
                                            <th scope="col" className="border-l border-r border-b border-indigo-500">Details</th>
                                            <th scope="col" className="border-l border-r border-b border-indigo-500">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            saleData?.payment_details.map((method, index) => (
                                                <tr key={index} className="px-2 py-2 border-b border-gray-300">
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500">
                                                        {index + 1}
                                                    </td>
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500">
                                                        {method.payment_uid}
                                                    </td>
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500">
                                                        {method.payment_amt}
                                                    </td>
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500">
                                                        {
                                                            (method.payment_details)
                                                        }
                                                    </td>
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500">
                                                        {method.payment_date}
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                                :
                                'No payment found'
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}