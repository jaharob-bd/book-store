import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import Select from 'react-select';
import SwalAlert from '@/Components/Alert/SwalAlert';

const OrderCreate = (props) => {
    const auth = props.auth;
    const [cart, setCart] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [VAT, setVAT] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [changeAmount, setChangeAmount] = useState(0);
    const [dueAmount, setDueAmount] = useState(0);
    const [store, setStore] = useState(props.stores[0]);
    const [payments, setPayments] = useState({ cash: 0, card: 0, mobile: 0 });
    const [customer, setCustomer] = useState({ name: "", phone: "" });
    const initial = [
        {
            discount      : discount,
            VAT           : VAT,
            subTotal     : '',
            grand_total   : '',
            change_amount : '',
            due_amount    : '',
            items         : cart,
            payments      : payments,
            customer      : customer,
        }
    ];
    const [data, setData] = useState(initial);
    const [products1, setProducts1] = useState(props.products);
    const [customers, setCustomers] = useState(props.customers);


    const products = [
        { id:1, name: "Product 1", price: 50 },
        { id:2, name: "Product 2", price: 30 },
        { id:3, name: "Product 3", price: 30 },
        { id:4, name: "Product 4", price: 30 },
        { id:6, name: "Product 5", price: 30 },
        { id:7, name: "Product 6", price: 30 },
        { id:8, name: "Product 7", price: 30 },
        { id:9, name: "Product 8", price: 30 },
        { id:10, name: "Product 9", price: 30 },
        { id:11, name: "Product 10", price: 30 },
        { id:12, name: "Product 11", price: 30 },
        { id:13, name: "Product 12", price: 30 },
        { id:14, name: "Product 13", price: 30 },
        { id:15, name: "Product 14", price: 30 },
        { id:5, name: "Product 15", price: 40 }
    ];

    const addToCart = (event) => {
        const [name, price] = event.target.value.split(",");
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.name === name);
            if (existingItem) {
                return prevCart.map(item =>
                    item.name === name ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prevCart, { name, price: parseFloat(price), qty: 1 }];
        });
    };

    const updateQty = (index, amount) => {
        setCart((prevCart) => {
            return prevCart.map((item, i) =>
                i === index ? { ...item, qty: Math.max(1, item.qty + amount) } : item
            );
        });
    };

    const calculateTotal = () => {
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
        const vat = subtotal * 0.05;
        const total = subtotal + vat - discount;
        setSubTotal(subtotal);
        setVAT(vat);
        setGrandTotal(total);
        return { subtotal, vat, total };
    };

    const updatePayments = (e) => {
        setPayments({ ...payments, [e.target.name]: parseFloat(e.target.value) || 0 });
    };

    const { subtotal, vat, total } = calculateTotal();
    const totalPaid = payments.cash + payments.card + payments.mobile;
    const due = Math.max(0, total - totalPaid);
    const change = Math.max(0, totalPaid - total);

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
                            <option key={index} value={`${product.name},${product.price}`}>{product.name} - ${product.price}</option>
                        ))}
                    </select>

                    {/* Cart Table */}
                    <div className="mt-0 bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
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
                        <div className="flex justify-between p-2"><span>VAT (5%):</span><span>${vat.toFixed(2)}</span></div>
                        <div className="flex justify-between p-2 font-semibold text-lg"><span>Total:</span><span>${total.toFixed(2)}</span></div>
                    </div>

                    <div className="mt-6 bg-gray-100 p-5 rounded-lg">
                        <h3 className="text-lg font-semibold border-b pb-2">Payment Method</h3>
                        {Object.keys(payments).map((method) => (
                            <div className="flex justify-between p-2" key={method}>
                                <span>{method.charAt(0).toUpperCase() + method.slice(1)}:</span>
                                <input type="number" name={method} value={payments[method]} onChange={updatePayments} className="w-16 p-1 border rounded text-right" />
                            </div>
                        ))}
                        <div className="flex justify-between p-2"><span>Change:</span><span>${change.toFixed(2)}</span></div>
                        <div className="flex justify-between p-2"><span>Due:</span><span>${due.toFixed(2)}</span></div>
                    </div>

                    <button className="mt-6 bg-purple-600 text-white p-3 w-full rounded-lg">Order</button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default OrderCreate;
