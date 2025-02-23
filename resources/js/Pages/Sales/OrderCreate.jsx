import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import Select from 'react-select';
import SwalAlert from '@/Components/Alert/SwalAlert';

const OrderCreate = (props) => {
    const auth = props.auth;
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0); // Initialize subtotal
    const [discount, setDiscount] = useState(0);
    const [VAT, setVAT] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [changeAmount, setChangeAmount] = useState(0);
    const [dueAmount, setDueAmount] = useState(0);
    const [payments, setPayments] = useState({ cash: 0, card: 0, mobile: 0 });
    const [customer, setCustomer] = useState({ name: "", phone: "" });
    const initial = [
        {
            discount    : discount,
            VAT         : VAT,
            subTotal    : subtotal,
            grandTotal  : grandTotal,
            changeAmount: changeAmount,
            dueAmount   : dueAmount,
            items       : cart,
            payments    : payments,
            customer    : customer,
        }
    ];
    const [data, setData] = useState(initial);
    console.log(data);
    // const [products1, setProducts1] = useState(props.products);
    // const [customers, setCustomers] = useState(props.customers);
    useEffect(() => {
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        const vat = subtotal * 0.05;
        const total = subtotal + vat - discount;

        setSubtotal(subtotal);
        setVAT(vat);
        setGrandTotal(total);
    }, [cart, discount]); // Runs when cart or discount changes

    const products = [
        { id: 1, name: "Product 1", price: 50 },
        { id: 2, name: "Product 2", price: 30 },
        { id: 3, name: "Product 3", price: 30 },
        { id: 4, name: "Product 4", price: 30 },
        { id: 6, name: "Product 5", price: 30 },
        { id: 7, name: "Product 6", price: 30 },
        { id: 8, name: "Product 7", price: 30 },
        { id: 9, name: "Product 8", price: 30 },
        { id: 10, name: "Product 9", price: 30 },
        { id: 11, name: "Product 10", price: 30 },
        { id: 12, name: "Product 11", price: 30 },
        { id: 13, name: "Product 12", price: 30 },
        { id: 14, name: "Product 13", price: 30 },
        { id: 15, name: "Product 14", price: 30 },
        { id: 5, name: "Product 15", price: 40 }
    ];

    const addToCart = (event) => {
        const [id, name, price] = event.target.value.split(",");
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.name === name ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prevCart, { id, name, price: parseFloat(price), qty: 1 }];
        });
    };

    const updateQty = (index, amount) => {
        setCart((prevCart) => {
            return prevCart.map((item, i) =>
                i === index ? { ...item, qty: Math.max(1, item.qty + amount) } : item
            );
        });
    };

    // const calculateTotal = () => {
    //     const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    //     const vat = subtotal * 0.05;
    //     const total = subtotal + vat - discount;
    //     setSubTotal(subtotal);
    //     setVAT(vat);
    //     setGrandTotal(total);
    //     return { subtotal, vat, total };
    // };

    const updatePayments = (e) => {
        setPayments({ ...payments, [e.target.name]: parseFloat(e.target.value) || 0 });
    };

    const totalPaid = payments.cash + payments.card + payments.mobile;
    const due = Math.max(0, grandTotal - totalPaid);
    const change = Math.max(0, totalPaid - grandTotal);

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
                            <option key={index} value={`${product.id},${product.name},${product.price}`}>{product.name} - ${product.price}</option>
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
                                            <th className="p-2 text-center">Qty</th>
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
                                                        <button onClick={() => updateQty(index, -1)} className="bg-gray-300 px-2 rounded">-</button>
                                                        <span className="px-2">{item.qty}</span>
                                                        <button onClick={() => updateQty(index, 1)} className="bg-gray-300 px-2 rounded">+</button>
                                                    </td>
                                                    <td className="p-3 text-right border-l border-r border-b border-indigo-500">${(item.price * item.qty).toFixed(2)}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            ) : (
                                <div className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
                                    <div className="w-full text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <input type="text" placeholder="Customer Name" className="border p-3 w-full rounded-lg mb-3"
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
                    <input type="text" placeholder="Phone Number" className="border p-3 w-full rounded-lg mb-3"
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />

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

                    <button className="mt-6 bg-purple-600 text-white p-3 w-full rounded-lg">Order</button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default OrderCreate;
