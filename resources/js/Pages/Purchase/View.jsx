import React, { useRef, useState, useEffect, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import Modal from '@/Components/Modal';
import ReactToPrint from 'react-to-print';
import PrintComponent from '@/Components/PrintComponent';

export default function View({ auth, purchases }) {
    console.log(purchases);
    const componentRef = useRef();
    const [purchaseData, setPurchaseData] = useState(purchases);


    const calculateSubTotal = (items) => {
        return items.reduce((total, item) => total + item.quantity * item.price, 0);
    };

    const calculateGrandTotal = (subTotal, discount, vat) => {
        return parseInt(subTotal) - parseInt(discount) + parseInt(vat);
    };

    const calculateDiscount = (subTotal, discountType, discount) => {
        if (discountType === 2) {
            return discount || 0;
        }
        return discount ? (subTotal * discount) / 100 : 0;
    };

    const calculateVAT = (subTotal, discount, vatType, vat) => {
        if (vatType === 2) {
            return vat || 0;
        }
        return vat ? ((subTotal - discount) * vat) / 100 : 0;
    };





    // const calculateSubTotal = (purchaseDetails) => {
    //     return purchaseDetails.reduce((total, item) => total + item.quantity * item.price, 0);
    // };

    // const calculateDiscount = (subTotal, discountType, discount) => {
    //     return discountType === 1 ? (subTotal * discount) / 100 : discount;
    // };

    // const calculateVAT = (subTotal, discountAmount, vatType, vat) => {
    //     return vatType === 1 ? ((subTotal - discountAmount) * vat) / 100 : vat;
    // };

    const subTotal = useMemo(() => calculateSubTotal(purchaseData.purchase_details), [purchaseData]);
    console.log('subTotal: ', subTotal)
    const discountAmount = useMemo(() => calculateDiscount(subTotal, purchaseData.discount_type, purchaseData.discount_amt), [subTotal, purchaseData]);
    console.log('discount: ', discountAmount)
    const vatAmount = useMemo(() => calculateVAT(subTotal, discountAmount, purchaseData.VAT_type, purchaseData.VAT_amt), [subTotal, discountAmount, purchaseData]);

    const totalAmount = calculateGrandTotal(subTotal, discountAmount, vatAmount);

    const { t } = useTranslation();
    return (
        <AuthenticatedLayout user={auth.user} header={'Purchases List'}>
            <Head title="Purchase View" />
            <div className="mx-auto sm:px-2">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow-md overflow-hidden">
                        <div>
                            <ReactToPrint
                                trigger={() => (
                                    <button
                                        className="select-none rounded-lg bg-amber-500 py-1 px-2 mr-1 text-center align-middle font-sans text-xs font-bold uppercase text-black shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:shadow-amber-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="button"
                                    >
                                        <i className="ri-printer-line"></i>
                                    </button>
                                )}
                                content={() => componentRef.current}
                            />
                            <div ref={componentRef} className="print-container">
                                <div className="max-w-3xl mx-auto p-10 my-4" id="invoice">
                                    <div className="flex flex-col items-center border-b pb-4">
                                        <div className="flex items-center mb-4">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="company-logo" height={50} width={50} />
                                            <p className="ml-2 text-center font-bold">
                                                Tailwind Inc.
                                            </p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-gray-500 text-sm">
                                                sales@tailwindcss.com, +41-442341232,  VAT: 8657671212
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 items-center mt-1">
                                        <div>
                                            <p className="font-bold text-gray-800">
                                                Bill to :
                                            </p>
                                            <p className="text-gray-500">
                                                {purchaseData.supplier_details.name}
                                                <br />
                                                {purchaseData.supplier_details.address}
                                            </p>
                                            {/* <p className="text-gray-500">
                                                {purchaseData.supplier_details.email}
                                            </p> */}
                                        </div>
                                        <div className="text-right">
                                            <p className>
                                                Invoice number:
                                                <span className="text-gray-500">
                                                    {purchaseData.purchase_uid}
                                                </span>
                                            </p>
                                            <p>
                                                Invoice date: <span className="text-gray-500">
                                                    {purchaseData.purchase_date}
                                                </span>
                                                {/* <br /> */}
                                                {/* Due date:<span className="text-gray-500">31/07/2023</span> */}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="-mx-4 mt-2 flow-root sm:mx-0">
                                        <table className="min-w-full">
                                            <colgroup>
                                                <col className="w-full sm:w-1/2" />
                                                <col className="sm:w-1/6" />
                                                <col className="sm:w-1/6" />
                                                <col className="sm:w-1/6" />
                                            </colgroup>
                                            <thead className="border-b border-gray-300 text-gray-900">
                                                <tr>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Items</th>
                                                    <th scope="col" className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">
                                                        Quantity</th>
                                                    <th scope="col" className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell">Price
                                                    </th>
                                                    <th scope="col" className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {purchaseData.purchase_details.map((item, index) => {
                                                    const itemTotal = item.quantity * item.price;

                                                    return (
                                                        <tr key={index} className="border-b border-gray-200">
                                                            <td className="max-w-0 pl-2 pr-2 text-sm sm:pl-0 border-black">
                                                                <div className="font-medium text-gray-900">
                                                                    {item.product_name} {item.variant_name}
                                                                </div>
                                                            </td>
                                                            <td className="hidden text-right text-sm text-gray-500 sm:table-cell border-black">
                                                                {item.quantity}
                                                            </td>
                                                            <td className="hidden text-right text-sm text-gray-500 sm:table-cell border-black">
                                                                ${item.price}
                                                            </td>
                                                            <td className="pl-1 pr-2 text-right text-sm text-gray-500 sm:pr-0 border-black">
                                                                ${itemTotal.toFixed(2)}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th scope="row" colSpan={3} className="hidden text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0 border-black">
                                                        Subtotal
                                                    </th>
                                                    <th scope="row" className=" text-left text-sm font-normal text-gray-500 sm:hidden border-black">
                                                        Subtotal
                                                    </th>
                                                    <td className=" text-right text-sm text-gray-500 sm:pr-0 border-black">
                                                        ${subTotal.toFixed(2)}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" colSpan={3} className="hidden  text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0 border-black">
                                                        Discount {purchaseData.discount_type === 1 ? ' (%)' : ' ($)'}
                                                    </th>
                                                    <th scope="row" className=" text-left text-sm font-normal text-gray-500 sm:hidden border-black">
                                                        Discount
                                                    </th>
                                                    <td className=" text-right text-sm text-gray-500 sm:pr-0 border-black">
                                                        ${discountAmount || discountAmount.toFixed(2)}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row" colSpan={3} className="hidden text-right text-sm font-normal text-gray-500 sm:table-cell sm:pl-0 border-black">
                                                        VAT {purchaseData.VAT_type === 1 ? ' (%)' : ' ($)'}
                                                    </th>
                                                    <th scope="row" className="text-left text-sm font-normal text-gray-500 sm:hidden border-black">
                                                        VAT
                                                    </th>
                                                    <td className="text-right text-sm text-gray-500 sm:pr-0 border-black">
                                                        ${vatAmount.toFixed(2)}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colSpan={3} className="hidden text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0 border-black">
                                                        Grand Total
                                                    </th>
                                                    <th scope="row" className="text-right text-sm font-semibold text-gray-900 sm:hidden border-black">
                                                        Grand Total
                                                    </th>
                                                    <td className="text-right text-sm font-semibold text-gray-900 sm:pr-0 border-black">
                                                        ${totalAmount.toFixed(2)}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colSpan={3} className="hidden text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0 border-black">
                                                        Total Due
                                                    </th>
                                                    <th scope="row" className="text-right text-sm font-semibold text-gray-900 sm:hidden border-black">
                                                        Total Due
                                                    </th>
                                                    <td className="text-right text-sm font-semibold text-gray-900 sm:pr-0 border-black">
                                                        ${purchaseData?.due_amt}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th colSpan={2} className="hidden text-left text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0 border-black">
                                                        Payment Details:
                                                    </th>
                                                    <th scope="row" className="hidden text-right text-sm font-semibold text-gray-900 sm:table-cell sm:pl-0 border-black">
                                                        Total Paid
                                                    </th>
                                                    <th scope="row" className="text-left text-sm font-semibold text-gray-900 sm:hidden border-black">
                                                        Total Paid
                                                    </th>
                                                    <td className="text-right text-sm font-semibold text-gray-900 sm:pr-0 border-black">
                                                        ${purchaseData?.paid_amt}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                        {
                                            purchaseData?.payment_details?.length ?
                                                <table className="border border-gray-300">
                                                    <thead className="border-b border-gray-300">
                                                        <tr>
                                                            <th scope="col" className="text-left font-medium text-gray-900 sm:table-cell sm:pl-0 border-r border-gray-300">Payment ID</th>
                                                            <th scope="col" className="text-center text-sm font-medium text-gray-900 sm:table-cell sm:pl-0 border-r border-gray-300">Amount</th>
                                                            <th scope="col" className="text-center text-sm font-medium text-gray-900 sm:table-cell sm:pl-0">Payment Date</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            purchaseData?.payment_details.map((method, index) => (
                                                                <tr key={index} className="px-2 py-2 border-b border-gray-300">
                                                                    <td className="text-sm font-medium text-gray-900 sm:table-cell sm:pl-0 border-r border-gray-300">
                                                                        {method.payment_uid}
                                                                    </td>
                                                                    <td className="px-2 py-2 text-center text-sm text-gray-500 sm:table-cell sm:pl-0 border-r border-gray-300">
                                                                        {method.payment_amt}
                                                                    </td>
                                                                    <td className="px-2 py-2 text-right text-sm text-gray-500 sm:table-cell sm:pl-0">
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
                                    {/* <div className="bottom-0 w-full border-t-2 pt-2 text-xs text-gray-500 items-center">
                                        Please pay the invoice before the due date. You can pay the invoice by logging in to your account from our client portal.
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout >
    );
}
