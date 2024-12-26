import React, { useRef, useState, useEffect, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import Modal from '@/Components/Modal';
import { OrderViewActionButton } from './Partials/OrderViewActionButton';
import { OrderItemDetails } from './Partials/OrderItemDetails';
import { OrderOtherDetails } from './Partials/OrderOtherDetails';
import { calculateSubTotal } from '@/Utils/PriceCalculation';
import { calculateDiscount } from '@/Utils/PriceCalculation';
import { calculateVAT } from '@/Utils/PriceCalculation';
import { calculateGrandTotal } from '@/Utils/PriceCalculation';
import { OrderStatus } from './OrderStatus';
import SwalAlert from '@/Components/Alert/SwalAlert'
import { pdf } from '@react-pdf/renderer';
import OrderInvoiceDownload from './OrderInvoiceDownload';

export default function OrderView({ auth, order }) {
    const { t } = useTranslation();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [actionButton, setActionButton] = useState('');
    const [cancelData, setCancelData] = useState({ id: order.id, status: 'canceled', remarks: '', items: order.order_details });

    const closeModal = () => setIsOpenModal(false);
    const openModal = (actionButton) => {
        setIsOpenModal(true);
        setActionButton(actionButton);
    };
    const [isLoading, setIsLoading] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();
        const clientEmail = 'mdalibd511@gmail.com';
        router.post('/send-email', { clientEmail }, {
            onSuccess: () => {
                // SwalAlert('success', 'Email sent successfully');
            },
        });
    };

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
                    // setSaleData((prevData) => ({ ...prevData, status: 'canceled' }));
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
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium ml-2 me-3 px-5 py-1 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 uppercase">
                            {order?.status}
                        </span>
                    </p>
                    <OrderViewActionButton
                        order={order}
                        openModal={openModal}
                        handleDownload={handleDownload}
                        isLoading={isLoading}
                        sendEmail={sendEmail}
                    />
                </div>
                <div className="flex flex-col md:flex-row w-full h-full">
                    <OrderItemDetails order={order} />
                    <OrderOtherDetails order={order} />
                </div>
            </div>
            <Modal
                show={isOpenModal}
                title={`${actionButton} Order`}
                maxWidth="2xl"
                onClose={closeModal}
            >
                <OrderStatus
                    actionButton={actionButton}
                    handleOnchange={handleOnchange}
                    handleSubmitCancel={handleSubmitCancel}
                />
            </Modal>
        </AuthenticatedLayout >
    );
}
