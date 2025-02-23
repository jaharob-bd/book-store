import { Link } from '@inertiajs/react';
import { useState, useEffect, useMemo } from 'react';
import WebLayout from './Layout/WebLayout';
import Breadcrumb from './Components/Breadcrumb';
import { Head, router, useForm } from '@inertiajs/react';
import SwalAlert from '@/Components/Alert/SwalAlert';
import { useContext } from 'react';
import { CartContext } from './context/CartContext';


export default function Checkout(props) {
    const { auth, customer }  = props;
    const { cart, setCart }                 = useContext(CartContext);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [district, setDistrict]           = useState(customer.district || '');
    const [city, setCity]                   = useState(customer.city || '');
    const [address, setAddress]             = useState(customer.street_address || '');
    // console.log(distruct);
    // Calculate amounts using useMemo for performance optimization
    const subAmount = useMemo(() =>
        cart.reduce((total, item) => total + item.salePrice * item.quantity, 0),
        [cart]
    );

    const shippingFee = 50;
    const discountAmount = 0;
    const taxAmount = 0;

    const totalAmount = useMemo(() =>
        subAmount + discountAmount + taxAmount + shippingFee,
        [subAmount, discountAmount, taxAmount, shippingFee]
    );

    // district array 
    const districts = [
        { value: "", label: "-- Select district --" },
        { value: "dhaka", label: "Dhaka" },
        { value: "chittagong", label: "Chittagong" },
        { value: "rajshahi", label: "Rajshahi" },
        { value: "sylhet", label: "Sylhet" },
        { value: "barisal", label: "Barisal" },
        { value: "khulna", label: "Khulna" },
        { value: "mymensingh", label: "Mymensingh" },
        { value: "noakhali", label: "Noakhali" },
        { value: "rangpur", label: "Rangpur" },
        { value: "comilla", label: "Comilla" }
    ];


    // Data for submission
    const data = {
        subAmount,
        discountAmount,
        taxAmount,
        shippingFee,
        totalAmount,
        paymentMethod,
        orderDetails: cart,
        shippingAddress: {
            district,
            city,
            address,
        }
    };

    const submit = () => {
        try {
            if (!paymentMethod || cart.length === 0) {
                SwalAlert('warning', 'Select Payment Method and add items to the cart');
                return;
            }

            router.post('/order-store', data, {
                preserveScroll: true,
                onSuccess: ({ props }) => {
                    // console.log('Flash Success:', props.flash.success);
                    if (props.flash.success) {
                        SwalAlert('success', props.flash.success, 'center');
                        setCart([]);
                    } else if (props.flash.failed) {
                        SwalAlert('warning', props.flash.failed, 'center');
                    }
                },
                onError: (errors) => {
                    console.error('Failed to place order:', errors);
                    SwalAlert('error', 'Failed to place order. Please try again.', 'center');
                },
            });
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    };

    return (
        <WebLayout auth={auth}>
            <Breadcrumb title="Checkout" />
            {/* wrapper */}
            <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
                <div className="col-span-8 border border-gray-200 p-4 rounded">
                    <h3 className="text-lg font-medium capitalize mb-4">Shipping Address</h3>
                    <div className="flex gap-4">
                        <select name="" className="input-box" onChange={(e) => setDistrict(e.target.value)}>
                            {
                                districts.map((dist) => (
                                    <option
                                        key={dist.value}
                                        value={dist.value}
                                        selected={dist.value === district ? 'selected' : ''}
                                    >
                                        {dist.label}
                                    </option>
                                ))
                            }
                        </select>
                        <input type="text" className="input-box" placeholder="City or Village" value={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="flex gap-4 pt-2 pb-4">
                        <textarea className="input-box" placeholder="Street Address" onChange={(e) => setAddress(e.target.value)}>{address}</textarea>
                    </div>
                    <h3 className="text-lg font-medium capitalize mb-4">Payment Method</h3>
                    <div className="flex gap-4">
                        {/* Cash on Delivery */}
                        <div className="border border-primary rounded-sm px-3 py-6 flex items-center gap-3">
                            <input
                                type="radio"
                                id="cod"
                                name="paymentMethod"
                                onChange={(e) => setPaymentMethod('Cash on Delivery')}
                                value="cash"
                                className="mr-3"
                            />
                            <label htmlFor="cod" className="flex items-center gap-3 text-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 8h6M9 12h6m-3-9a9 9 0 11-9 9 9 9 0 019-9zM16 16v2a2 2 0 01-2 2H8a2 2 0 01-2-2v-2a2 2 0 012-2h6a2 2 0 012 2zm3-1l1.5-1.5M19 15l1.5 1.5" />
                                </svg>
                                Cash on Delivery
                            </label>
                        </div>

                        {/* Mobile Payment: Bikash */}
                        <div className="border border-primary rounded-sm px-3 py-6 flex items-center gap-3">
                            <input
                                type="radio"
                                id="bikash"
                                name="paymentMethod"
                                value="bikash"
                                onChange={(e) => setPaymentMethod('PayPal')}
                                className="mr-3"
                            />
                            <label htmlFor="bikash" className="flex items-center gap-3 text-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm7 14h3m-1-1v2m-5-4a2 2 0 100-4 2 2 0 000 4zm1-4V7m0 6h3" />
                                </svg>
                                Mobile Payment (Bkash)
                            </label>
                        </div>
                        {/* Mobile Payment: Nagad */}
                        <div className="border border-primary rounded-sm px-3 py-6 flex items-center gap-3">
                            <input
                                type="radio"
                                id="nagad"
                                name="paymentMethod"
                                onChange={(e) => setPaymentMethod('PayPal')}
                                value="nagad"
                                className="mr-3"
                            />
                            <label htmlFor="nagad" className="flex items-center gap-3 text-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 2h10a2 2 0 012 2v16a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2zm5 9h3l-4 4-4-4h3V7h2v4z" />
                                </svg>
                                Mobile Payment (Nagad)
                            </label>
                        </div>

                        {/* Credit/Debit Card */}
                        <div className="border border-primary rounded-sm px-3 py-6 flex items-center gap-3">
                            <input
                                type="radio"
                                id="card"
                                name="paymentMethod"
                                value="card"
                                onChange={(e) => setPaymentMethod('Credit Card')}
                                className="mr-3"
                            />
                            <label htmlFor="card" className="flex items-center gap-3 text-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h18a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2zm0 4h18M7 15h2m4 0h2" />
                                </svg>
                                Credit/Debit Card
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 border border-gray-200 p-4 rounded">
                    <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">order summary</h4>
                    <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                        <p>subtotal</p>
                        <p>৳ {subAmount}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                        <p>shipping</p>
                        <p>৳ 50</p>
                    </div>
                    {/* <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                        <p>Online Fee</p>
                        <p>৳ 10</p>
                    </div> */}
                    <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
                        <p className="font-semibold">Total</p>
                        <p>৳ {totalAmount}</p>
                    </div>
                    <div className="flex items-center mb-4 mt-2">
                        <input type="checkbox" name="aggrement" id="aggrement" className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3" />
                        <label htmlFor="aggrement" className="text-gray-600 ml-3 cursor-pointer text-sm">I agree to the <a href="#" className="text-primary">terms &amp; conditions</a></label>
                    </div>

                    <div className="mt-6">
                        <button onClick={() => submit()} className="block w-full py-3 px-4 text-center text-white bg-indigo-500 border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium mb-4">
                            Order Placed
                        </button>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
}