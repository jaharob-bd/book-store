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
    console.log(order);
    const { t } = useTranslation();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [actionButton, setActionButton] = useState('');
    const [actionPaymentMethod, setActionPaymentMethod] = useState('Cash');
    const [isLoading, setIsLoading] = useState(false);
    const [totalDueAmount, setTotalDueAmount] = useState(order.total_amount - order.paid_amount);
    const fileName = order.order_no;
    // payment details
    // const [paymentDetails, setPaymentDetails] = useState({
    //     bankName      : '',   // Bank
    //     accountNumber : '',   // Account number
    //     mobileNumber  : '',   // mobile
    //     transactionId : '',   // transaction ID
    //     cardNumber    : '',   // Card
    //     cardExpiryDate: '',
    //     cardCVV       : '',
    // });

    const [statusData, setStatusData] = useState({
        id            : order.id,                                         // Order ID
        status        : actionButton,                                     // Current action button status
        remarks       : '',                                               // User remarks
        carrierName   : '',                                               // Name of the shipping carrier
        trackingNumber: actionButton == 'Shipped' ? order.order_no: '',   // Tracking number for the order
        source        : '',
        paymentMethod : actionPaymentMethod,                              // Payment method
        amount        : totalDueAmount,                                   // cash
        bankName      : '',                                               // Bank
        accountNumber : '',
        mobileNumber  : '',                                               // mobile
        transactionId : '',
        cardNumber    : '',                                               // Card
        cardExpiryDate: '',
        cardCVV       : '',
        totalAmount   : order.total_amount,
        items         : order.order_details                               // Details of the items in the order
    });
    // console.log(statusData);

    useEffect(() => {
        setStatusData((prevData) => ({
            ...prevData,
            status: actionButton,
            paymentMethod: actionPaymentMethod,
        }));
    }, [actionButton, actionPaymentMethod]);

    const closeModal = () => {
        setIsOpenModal(false);
        setActionButton('');
    }

    const openModal = (actionButton) => {
        setIsOpenModal(true);
        setActionButton(actionButton);
    };

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
        const blob       = await pdf(<OrderInvoiceDownload {...{ order }} />).toBlob();
        const url        = URL.createObjectURL(blob);
        const a          = document.createElement('a');
              a.href     = url;
              a.download = fileName + '.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        SwalAlert('success', 'Download successfully');
        setIsLoading(false);
        URL.revokeObjectURL(url); // Clean up the URL object
    }

    const handleOnchange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        setStatusData((prevData) => {
            // Validate the amount condition
            if (name === 'amount' && parseFloat(value) > totalDueAmount) {
                SwalAlert('warning', 'Amount should not exceed total due amount', 'center');
                // Return the previous data without updating the state
                return { ...prevData };
            }

            // Update the state with the new value
            return { ...prevData, [name]: value };
        });
    };

    // Validation helper functions
    const validateCancelledAction = () => {
        if (actionButton === 'Cancelled' && statusData.remarks.trim() === '') {
            SwalAlert('warning', 'Please add a reason', 'center');
            return false;
        }
        return true;
    };

    const validatePaymentAction = () => {
        if (actionButton !== 'Payment') return true; // Skip if not a Payment action
        if (actionPaymentMethod === 'Cash' && (isNaN(parseFloat(statusData.amount)) || parseFloat(statusData.amount) <= 0)) {
            SwalAlert('warning', 'Please enter a valid cash amount', 'center');
            return false;
        }
        if (actionPaymentMethod === 'Mobile' && (!statusData.mobileNumber || !statusData.transactionId)) {
            SwalAlert('warning', 'Mobile payment requires mobile number and transaction ID', 'center');
            return false;
        }
        if (actionPaymentMethod === 'Bank' && (!statusData.bankName || !statusData.accountNumber)) {
            SwalAlert('warning', 'Bank payment requires bank name and account number', 'center');
            return false;
        }
        if (actionPaymentMethod === 'Card' && (!statusData.cardNumber || !statusData.cardExpiryDate)) {
            SwalAlert('warning', 'Card payment requires card number and expiry date', 'center');
            return false;
        }
        return true;
    };
    // submit cancel data
    const handleSubmit = (e) => {
        e.preventDefault();
        // Main validation
        if (!validateCancelledAction() || !validatePaymentAction()) {
            return false;
        }

        try {
            router.post('/status-update', statusData, {
                preserveScroll: true,
                onSuccess: ({ props }) => {
                    SwalAlert('success', 'Order cancelled successfully!', 'center');
                    setTotalDueAmount(totalDueAmount - statusData.amount);
                    setStatusData((prevData) => ({
                        ...prevData,
                        // id            : prevData.id,
                        // status        : prevData.status,
                        // trackingNumber: actionButton == 'Shipped' ? prevData.order_no: '',
                        // remarks       : '',                                                 // User remarks
                        // carrierName   : '',
                        // bankName      : '',                                                 // Bank
                        // accountNumber : '',
                        // mobileNumber  : '',                                                 // mobile
                        // transactionId : '',
                        // cardNumber    : '',                                                 // Card
                        // cardExpiryDate: '',
                        // cardCVV       : '',
                        // paymentMethod : prevData.paymentMethod,
                        amount: totalDueAmount - prevData.amount,
                        // items         : prevData.order_details
                    }));
                    console.log(statusData);
                    setIsOpenModal(false);
                },
                onError: (errors) => {
                    console.error('Failed to submit:', errors);
                },
            });
        } catch (error) {
            console.error('Failed:', error);
        }
    };

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
                        {...{ order, openModal, handleDownload, isLoading, sendEmail }}
                    />
                </div>
                <div className="flex flex-col md:flex-row w-full h-full">
                    <OrderItemDetails {...{ order }} />
                    <OrderOtherDetails {...{ order }} />
                </div>
            </div>
            <Modal
                show={isOpenModal}
                title={`${actionButton} Order`}
                maxWidth="2xl"
                onClose={closeModal}
            >
                <OrderStatus
                    {...{ statusData, totalDueAmount, actionButton, actionPaymentMethod, setActionPaymentMethod, handleOnchange, handleSubmit }}
                />
            </Modal>
        </AuthenticatedLayout >
    );
}
