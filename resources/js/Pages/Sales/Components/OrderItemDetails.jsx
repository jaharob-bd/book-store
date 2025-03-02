import React from 'react'

export const OrderItemDetails = (props) => {
    const order = props.order;
    const subTotal = order.order_details.reduce((total, item) => {
        const itemTotal = item.quantity * item.price;
        return total + itemTotal;
    }, 0);
    const grandTotal = subTotal + parseFloat(order.tax_amount) + parseFloat(order.shipping_fee) - parseFloat(order.discount_amount);
    const totalPaymentAmount = order?.payment_details.reduce((total, item) => {
        return total + parseFloat(item.amount);
    }, 0);
    return (
        <div className="w-full md:w-8/12 flex-grow flex">
            <div className="flex flex-col bg-blue-gray-50 h-full w-full py-2">
                <div className="h-full overflow-hidden mt-4">
                    <div className="p-1">
                        <p className="font-bold">
                            INVOICE : <span className="text-red-500">{order.order_no}</span>
                            [Grand Total : <span className="">{grandTotal}</span>]
                            <span className="text-green-600 uppercase">{grandTotal === totalPaymentAmount ? '  Full Paid' : ''}</span>
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
                                {order.order_details.map((item, index) => {
                                    const itemTotal = item.quantity * item.price;
                                    return (
                                        <tr key={index} className="border-b border-gray-200">
                                            <td className="pl-1 border-l border-r border-b border-indigo-500">{index + 1}</td>
                                            <td className="pl-1 border-l border-r border-b border-indigo-500">
                                                <div className="font-medium text-gray-900">
                                                    {item.product.name}
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
                                        Sub Total:
                                    </th>
                                    <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">
                                        {subTotal.toFixed(2)}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" colSpan={4} className="pl-1 text-right">
                                        Discount:
                                    </th>
                                    <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">
                                        {order.discount_amount}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" colSpan={4} className="pl-1 text-right">
                                        VAT:
                                    </th>
                                    <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">
                                        {order.tax_amount}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" colSpan={4} className="pl-1 text-right">
                                        Shipping Fee:
                                    </th>
                                    <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">
                                        {order.shipping_fee}
                                    </td>
                                </tr>
                                <tr>
                                    <th colSpan={4} scope="row" className="pl-1 text-right">
                                        Grand Total:
                                    </th>
                                    <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">
                                        {grandTotal.toFixed(2)}
                                    </td>
                                </tr>
                                <tr>
                                    <th colSpan={4} scope="row" className="pl-1 text-right">
                                        Toal Paid:
                                    </th>
                                    <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">
                                        {totalPaymentAmount.toFixed(2)}
                                    </td>
                                </tr>
                                <tr>
                                    <th colSpan={4} scope="row" className="pl-1 text-right">
                                        Toal Payable:
                                    </th>
                                    <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">
                                        {(grandTotal - totalPaymentAmount).toFixed(2)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="py-2 mt-4 font-bold">
                            <span className="uppercase">Payment Details: </span>
                        </div>
                        {
                            order?.payment_details?.length ?
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
                                            order?.payment_details.map((method, index) => (
                                                <tr key={index} className="px-2 py-2 border-b border-gray-300">
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500">
                                                        {index + 1}
                                                    </td>
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500">
                                                        {method.transaction_id}
                                                    </td>
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500">
                                                        {method.amount}
                                                    </td>
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500">
                                                        {
                                                            (method.payment_method)
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
                                <span className="text-red-600 font-bold text-2xl">No payment found</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}