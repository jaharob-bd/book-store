import React, { forwardRef, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import WebLayout from "./Layout/WebLayout";
import ReactToPrint from 'react-to-print';

const OrderDetails = ({ auth, order, organization }) => {
    // console.log(order);
    const componentRef        = useRef();
    const { props }           = usePage();
    const logo                = props.url?.base_url + '/company-logo.svg'
    const calculateSubtotal   = () => order.items.reduce((total, item) => total + item.quantity * item.price, 0);
    const calculateVAT        = (subtotal) => (subtotal * order.vatRate) / 100;
    const calculateGrandTotal = (subtotal, vat, discount, fee) => subtotal - discount + vat + fee;
    const subtotal            = calculateSubtotal();
    const vat                 = calculateVAT(subtotal);
    const grandTotal          = calculateGrandTotal(subtotal, vat, order.discount, order.shippingFee);

    return (
        <WebLayout auth={auth}>
            <div className="p-8 bg-gray-100 min-h-screen">
                <div ref={componentRef} className="max-w-4xl mx-auto p-8 bg-white rounded-lg">
                    <div className="flex flex-col items-center border-b border-gray-400 pb-4 mb-4">
                        <div className="flex items-center mb-1">
                            <h1 className="text-lg font-bold ml-2 text-center">{organization.org_name}</h1>
                        </div>
                        <p className="text-gray-600 text-sm text-center">{organization.addr1}</p>
                    </div>
                    <div className="flex justify-between mb-4">
                        <div>
                            <p className="font-bold text-gray-700">Bill to:</p>
                            <p className="text-gray-700">{order.customer.name}</p>
                            <p className="text-gray-700">Mobile: {order.customer.phone}</p>
                            {order.customer.email && <p className="text-gray-700">Email: {order.customer.email}</p>}
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-gray-700">Invoice No: {order.id}</p>
                            <p className="text-gray-700">Invoice date: {order.date}</p>
                            <p className="text-gray-700">
                                {order?.shippingAddress ? (
                                    <>
                                        <strong>Shipping to:</strong> {order.shippingAddress.city ?? ''}
                                        {order.shippingAddress.district ? ',' : ''}
                                        {order.shippingAddress.district ?? ''}
                                    </>
                                ) : ''}
                            </p>
                            <p className="text-gray-700">{order?.shippingAddress && (order?.shippingAddress?.address ?? '')}</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <table className="w-full border-collapse border border-gray-300 text-sm mb-2">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border border-gray-300 w-1/12">#</th>
                                    <th className="border border-gray-300 text-left">Item</th>
                                    <th className="border border-gray-300 text-right">Quantity</th>
                                    <th className="border border-gray-300 text-right">Price</th>
                                    <th className="border border-gray-300 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 text-center font-bold">{index + 1}</td>
                                        <td className="border border-gray-300 text-left">{item.name}</td>
                                        <td className="border border-gray-300 text-right">{item.quantity}</td>
                                        <td className="border border-gray-300 text-right">{item.price}</td>
                                        <td className="border border-gray-300 text-right">{item.quantity * item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="grid grid-cols-2 gap-4">
                            {/* Payment Details */}
                            <table className="w-full border-collapse border border-gray-300 text-sm">
                                <thead>
                                    <tr>
                                        <th className="text-center bg-gray-200" colSpan={4}>Payment Method</th>
                                    </tr>
                                    {order.payments && order.payments.length > 0 && (
                                        <tr>
                                            <th className="border border-gray-300 text-center">#</th>
                                            <th className="border border-gray-300 text-left">Method</th>
                                            <th className="border border-gray-300 text-center">Date</th>
                                            <th className="border border-gray-300 text-right">Amount</th>
                                        </tr>
                                    )}
                                </thead>
                                <tbody>
                                    {order.payments && order.payments.length > 0 ? (
                                        <>
                                            {order.payments.map((method, index) => (
                                                <tr key={index}>
                                                    <td className="border border-gray-300 text-center font-bold">{index + 1}</td>
                                                    <td className="border border-gray-300 text-left">{method.payment_method}</td>
                                                    <td className="border border-gray-300 text-center">{method.payment_date}</td>
                                                    <td className="border border-gray-300 text-right">
                                                        {parseFloat(method.amount).toFixed(2)}
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr>
                                                <td className="border border-gray-300 text-right font-semibold" colSpan={3}>Total Payment:</td>
                                                <td className="border border-gray-300 text-right font-semibold">
                                                    {order.payments.reduce((sum, method) => sum + parseFloat(method.amount), 0).toFixed(2)}
                                                </td>
                                            </tr>
                                        </>
                                    ) : (
                                        <tr>
                                            <td className="border border-gray-300 text-center font-bold text-red-600" colSpan={4}>
                                                Not found payment data.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <table className="w-full border-collapse border border-gray-300 text-sm">
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 text-right font-bold">Subtotal</td>
                                        <td className="border border-gray-300 text-right font-bold">{subtotal.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 text-right font-bold">Discount</td>
                                        <td className="border border-gray-300 text-right font-bold">{(order.discount).toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 text-right font-bold">VAT</td>
                                        <td className="border border-gray-300 text-right font-bold">{vat.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 text-right font-bold">Shipping Fee</td>
                                        <td className="border border-gray-300 text-right font-bold">50.00</td>
                                    </tr>
                                    <tr className="bg-gray-200">
                                        <td className="border border-gray-300 text-right font-bold">Grand Total</td>
                                        <td className="border border-gray-300 text-right font-bold">{grandTotal.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Terms and condition */}
                    <div className="flex justify-between pt-7">
                        <div className="">
                            <h2 className="text-lg font-bold">Terms & Conditions:</h2>
                            <p className="text-gray-700">1. Delivery of products will be made within 30 days from the invoice date.</p>
                            <p className="text-gray-700">2. All products are subject to 5% sales tax.</p>
                            <p className="text-gray-700">3. Please provide the invoice copy along with the payment receipt.</p>
                            <p className="text-gray-700">4. If you have any questions or need additional information, please contact us at {order.customer.email}.</p>
                            {/* <p className="text-gray-700">5. You will be charged a 10% service fee on the invoice amount.</p>
                            <p className="text-gray-700">6. Please ensure that all necessary documents are attached in the invoice.</p> */}
                        </div>
                    </div>
                    <div className="mt-4 text-center text-gray-500 text-sm border-t border-gray-300 pt-2 print:absolute print:bottom-3 print:w-full print:text-center">
                        Thank You.
                    </div>
                </div>
                <center>
                    <ReactToPrint
                        trigger={() => (
                            <button
                                className="hover:text-white hover:bg-blue-600 text-red-600 font-bold py-1 px-1 rounded uppercase"
                                type="button"
                            >
                                <i className="ri-printer-line text-lg mr-1"></i>
                                Print Invoice
                            </button>
                        )}
                        content={() => componentRef.current}
                    />
                </center>

            </div>
        </WebLayout>
    );
};

export default OrderDetails;
