import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import Select from 'react-select';
import SwalAlert from '@/Components/Alert/SwalAlert';
import OrderPrint from './OrderPrint';

const OrderCreate = (props) => {
    const auth = props?.auth;
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);                                // Initialize subtotal
    const [discount, setDiscount] = useState(0);
    const [VAT, setVAT] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [changeAmount, setChangeAmount] = useState(0);
    const [dueAmount, setDueAmount] = useState(0);
    const [payments, setPayments] = useState({ Cash: 0, Card: 0, Mobile: 0 });
    const [customer, setCustomer] = useState({ id:"", name: "", phone: "" });
    const [isPrint, setIsPrint] = useState(false);
    const initial = {
        invoicFrom: 'panel',
        discountAmount: discount,
        vatAmount: VAT,
        subAmount: subtotal,
        totalAmount: grandTotal,
        changeAmount: changeAmount,
        dueAmount: dueAmount,
        orderDetails: cart,
        paymentMethod: payments,
        customer,
        shippingAddress: {
            district: '',
            city: '',
            address: '',
        },
    };
    const [data, setData] = useState(initial);
    // console.log(data);
    const [products, setProducts] = useState(props.products);
    // const [customers, setCustomers] = useState(props.customers);
    useEffect(() => {
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const vat = subtotal * 0.05;
        const total = subtotal + vat - discount;
        const totalPaid = payments.Cash + payments.Card + payments.Mobile;
        const due = Math.max(0, total - totalPaid);
        const change = Math.max(0, totalPaid - total);
        setSubtotal(subtotal);
        setVAT(vat);
        setGrandTotal(total);
        setDueAmount(due);
        setChangeAmount(change);

        // Update data state
        setData({
            submitFrom: 'panel',
            discountAmount: discount,
            vatAmount: vat,
            subAmount: subtotal,
            totalAmount: total,
            changeAmount: change,
            dueAmount: due,
            orderDetails: cart,
            paymentMethods: payments,
            customer,
            shippingAddress: {
                district: '',
                city: '',
                address: '',
            },
        }
        );

    }, [cart, discount, payments, customer]);
    
    const removeFromCart = (id) => {
        setCart(cart.filter((item) => item.id!== id));
    };

    const handleCustomerChange = async (event) => {
        try {
            const phone = event.target.value;
            const response = await fetch(`/get-customer-data/${phone}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const resData = await response.json();
            if(resData.id){
                setCustomer({ id:resData.id, name: resData.name, phone });
            }else{
                setCustomer({ id: '', name: '', phone });
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const handleCustomerChange_22 = (event) => {
        const phone = event.target.value;
// use fetch instead
        fetch('/get-customer-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phone }),
        })
        .then(response => response.json())
        .then(data => {
            setCustomer({ name: data.name, phone });
        })
        .catch(error => {
            console.error('Failed to fetch customer data:', error);
        });
return false;
        router.get('/get-customer-data', {phone}, {
            preserveScroll: true,
            onSuccess: ({ props }) => {
                console.log(props);
                // alert(props);
                // setCustomer({ name: props.name, phone });
            },
            onError: (errors) => {
                console.error('Failed to place order:', errors);
                SwalAlert('error', 'Failed to place order. Please try again.', 'center');
            },
        });

        setCustomer(event.target.value);
    };

    const addToCart = (event) => {
        const [id, name, price] = event.target.value.split(",");
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.name === name ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { id, name, price: parseFloat(price), quantity: 1 }];
        });
    };

    const updatequantity = (index, amount) => {
        setCart((prevCart) => {
            return prevCart.map((item, i) =>
                i === index ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
            );
        });
    };

    const updatePayments = (e) => {
        const updatedPayments = { ...payments, [e.target.name]: parseFloat(e.target.value) || 0 };
        setPayments(updatedPayments);
    };

    const submit = () => {
        try {
            if (cart.length === 0) {
                SwalAlert('warning', 'Please add to cart product', 'center');
                return;
            }
            // if (customer.phone === '') {
            //     SwalAlert('warning', 'Please add to customer', 'center');
            //     return;
            // }

            router.post('/order-store', data, {
                preserveScroll: true,
                onSuccess: ({ props }) => {
                    if (props.flash.success) {
                        SwalAlert('success', props.flash.success, 'center');
                        setIsPrint(true);
                        // setCart([]);
                        // setPayments({ Cash: 0, Card: 0, Mobile: 0 });
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
        <AuthenticatedLayout user={auth.user} header={'Purchases Invoice'}>
            <Head title="Sales Order" />
            <div className="flex flex-col md:flex-row w-full h-full">
                {/* Main Content */}
                <div className="w-4/5 p-6">
                    {/* <h2 className="text-xl font-semibold mb-4">Select Product</h2> */}
                    <select className="border p-2 w-full rounded" onChange={addToCart}>
                        <option value="" disabled selected>Select an item</option>
                        {products.map((product, index) => (
                            <option key={index} value={`${product.id},${product.name},${product.sale_price}`}>{product.id} - {product.name} - ${product.sale_price}</option>
                        ))}
                    </select>

                    {/* Cart Table */}
                    <div className="mt-0 bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
                        {
                            cart.length > 0 ? (
                                <table className="w-full border-collapse bg-gray-100 rounded-md">
                                    <thead className="bg-gray-200">
                                        <tr className="bg-indigo-500 h-6 border border-indigo-500 text-white">
                                            <th className="p-2 text-left w-1">#</th>
                                            <th className="p-2 text-left">Product</th>
                                            <th className="p-2 text-left">Price</th>
                                            <th className="p-2 text-center">quantity</th>
                                            <th className="p-2 text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cart.map((item, index) => (
                                                <tr key={index} className="border-t">
                                                    <td className="p-2 border-l border-r border-b border-indigo-500 w-1">{index + 1}</td>
                                                    <td className="p-2 border-l border-r border-b border-indigo-500">{item.name}</td>
                                                    <td className="p-2 border-l border-r border-b border-indigo-500">${item.price.toFixed(2)}</td>
                                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                                        <button onClick={() => updatequantity(index, -1)} className="bg-gray-300 px-2 rounded">-</button>
                                                        <span className="px-2">{item.quantity}</span>
                                                        <button onClick={() => updatequantity(index, 1)} className="bg-gray-300 px-2 rounded">+</button>
                                                    </td>
                                                    <td className="p-3 text-right border-l border-r border-b border-indigo-500">${(item.price * item.quantity).toFixed(2)}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            ) : (
                                <div className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
                                    <div className="w-full text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-40 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <p className="text-xl">
                                            CART IS EMPTY !!
                                        </p>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>

                {/* Right Section */}
                <div className="w-1/5 bg-white p-6 shadow-2xl rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Customer Details</h2>

                    <input
                        type="text"
                        placeholder="Phone Number"
                        className="border p-3 w-full rounded-lg mb-3"
                        onChange={handleCustomerChange} />
                    <input
                        type="text"
                        placeholder="Customer Name"
                        className="border p-3 w-full rounded-lg mb-3"
                        value={customer.name}
                        readOnly/>

                    <div className="mt-6 bg-gray-100 p-5 rounded-lg">
                        <h3 className="text-lg font-semibold border-b pb-2">Order Summary</h3>
                        <div className="flex justify-between p-2"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between p-2"><span>Discount:</span><input type="number" className="w-16 p-1 border rounded text-right" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} /></div>
                        <div className="flex justify-between p-2"><span>VAT (5%):</span><span>${VAT.toFixed(2)}</span></div>
                        <div className="flex justify-between p-2 font-semibold text-lg"><span>Total:</span><span>${grandTotal.toFixed(2)}</span></div>
                    </div>
                    <div className="mt-6 bg-gray-100 p-5 rounded-lg">
                        <h3 className="text-lg font-semibold border-b pb-2">Payment Method</h3>
                        {Object.keys(payments).map((method) => (
                            <div className="flex justify-between p-2" key={method}>
                                <span>{method.charAt(0).toUpperCase() + method.slice(1)}:</span>
                                <input type="number" name={method} value={payments[method]} onChange={updatePayments} className="w-16 p-1 border rounded text-right" />
                            </div>
                        ))}
                        <div className="flex justify-between p-2"><span>Change:</span><span>${changeAmount.toFixed(2)}</span></div>
                        <div className="flex justify-between p-2"><span>Due:</span><span>${dueAmount.toFixed(2)}</span></div>
                    </div>
                    <button onClick={() => submit()} className={"text-white text-lg w-full py-2 bg-indigo-500"}>Order</button>
                </div>
            </div>
            {
                isPrint && <OrderPrint {... { cart, subtotal, discount, VAT, grandTotal, payments, changeAmount, dueAmount, isPrint, setIsPrint, setCart, setPayments }} />
            }

        </AuthenticatedLayout>
    );
};

export default OrderCreate;
