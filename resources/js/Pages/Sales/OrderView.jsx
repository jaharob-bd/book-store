import React, { useRef, useState, useEffect, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import Modal from '@/Components/Modal';
import { OrderViewActionButton } from './Partials/OrderViewActionButton';
import { OrderViewSection01 } from './Partials/OrderViewSection01';
import { OrderViewSection02 } from './Partials/OrderViewSection02';
import { calculateSubTotal } from '@/Utils/PriceCalculation';
import { calculateDiscount } from '@/Utils/PriceCalculation';
import { calculateVAT } from '@/Utils/PriceCalculation';
import { calculateGrandTotal } from '@/Utils/PriceCalculation';
import { OrderCancel } from './OrderCancel';
import SwalAlert from '@/Components/Alert/SwalAlert'
import { pdf } from '@react-pdf/renderer';
import OrderInvoiceDownload from './OrderInvoiceDownload';

export default function OrderView({ auth, sales }) {
    const { t } = useTranslation();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [saleData, setSaleData] = useState(sales);
    const [customerData, setCustomerData] = useState(sales.customer_details);
    // default cancel values
    const [cancelData, setCancelData] = useState({ id: saleData.id, status: 'canceled', remarks: '', items: saleData.sale_details });

    const subTotal = useMemo(() => calculateSubTotal(saleData.sale_details), [saleData]);
    const discountAmount = useMemo(() => calculateDiscount(subTotal, saleData.discount_type, saleData.discount_amt), [subTotal, saleData]);
    const vatAmount = useMemo(() => calculateVAT(subTotal, discountAmount, saleData.VAT_type, saleData.VAT_amt), [subTotal, discountAmount, saleData]);
    const totalAmount = calculateGrandTotal(subTotal, discountAmount, vatAmount);

    // download invoice 
    const [isLoading, setIsLoading] = useState(false);
    // const [fileName, setFileName] = useState('INV- ' + Math.floor(Math.random() * 100));
    const [fileName, setFileName] = useState(saleData.sale_uid);

    // const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const handleDownload = async () => {
        setIsLoading(true);
        const blob = await pdf(<OrderInvoiceDownload />).toBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName + '.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        SwalAlert('success', 'Download successfully');
        setIsLoading(false);
        URL.revokeObjectURL(url); // Clean up the URL object
    }

    const sendEmail = (e) => {
        e.preventDefault();
        const clientEmail = 'mdalibd511@gmail.com';
        router.post('/send-email', { clientEmail }, {
            onSuccess: () => {
                // SwalAlert('success', 'Email sent successfully');
            },
        });
    };

    // modal opening and closing
    const closeModal = () => setIsOpenModal(false);
    const openModal = () => setIsOpenModal(true);

    // onchange handle input  
    const handleOnchange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setCancelData((prevData) => ({ ...prevData, [name]: value }));
        console.log(cancelData)
    };

    // submit cancel data
    const handleSubmitCancel = (e) => {
        e.preventDefault();
        // cancel the order
        console.log('cancelData', cancelData);
        if (cancelData.remarks === '') {
            SwalAlert('warning', 'Please add cancel reason', 'center');
            return;
        }

        try {
            router.post('/order-cancel', cancelData, {
                preserveScroll: true,
                onSuccess: () => {
                    SwalAlert('success', 'Order Cancel Successfully!!', 'center');
                    // usdate saleData state status update
                    // setSaleData(saleData.status = 'canceled'); // not working
                    setSaleData((prevData) => ({ ...prevData, status: 'canceled' }));
                    setCancelData({});
                    setIsOpenModal(false);
                },
                onError: (errors) => {
                    console.error('Failed price insert:', '');
                },
            });
        } catch (error) {
            console.error('Failed :', error);
        }
    }
    return (
        <AuthenticatedLayout user={auth.user} header={'sales List'}>
            <Head title="Order View" />
            <div className="mx-auto sm:px-4">
                <div className="flex gap-2 justify-between items-center max-sm:flex-wrap">
                    <p className="text-xl text-gray-800 dark:text-white font-bold w-full sm:w-auto">
                        View Orders
                    </p>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 uppercase">{saleData?.status}</span>

                    <OrderViewActionButton
                        saleData={saleData}
                        openModal={openModal}
                        handleDownload={handleDownload}
                        isLoading={isLoading}
                        sendEmail={sendEmail}
                    />
                </div>
                <div className="flex flex-col md:flex-row w-full h-full">
                    {/* section 1 product section */}
                    <OrderViewSection01
                        saleData={saleData}
                        subTotal={subTotal}
                        discountAmount={discountAmount}
                        vatAmount={vatAmount}
                        totalAmount={totalAmount}
                    />
                    {/* section 2 info section */}
                    <OrderViewSection02
                        saleData={saleData}
                        customerData={customerData}
                    />
                </div>
            </div>

            <Modal
                show={isOpenModal}
                title='Cancel Order'
                maxWidth='2xl'
                onClose={closeModal}
            >
                <OrderCancel
                    handleOnchange={handleOnchange}
                    handleSubmitCancel={handleSubmitCancel}
                />
            </Modal>
        </AuthenticatedLayout >
    );
}
