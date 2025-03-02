import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm, Link } from '@inertiajs/react';
import Select from 'react-select';
import SwalAlert from '@/Components/Alert/SwalAlert';
import OrderPrint from './OrderPrint';
import OrderLayout from '@/Layouts/InvoiceLayout';
const logo = 'assets/images/company-logo.svg'
import axios from 'axios';

const OrderCreate = (props) => {
    const auth = props?.auth;
    const [lastOrderNo, setLastOrderNo] = useState(props.lastOrderNo);
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);                                // Initialize subtotal
    const [discount, setDiscount] = useState(0);
    const [VAT, setVAT] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [changeAmount, setChangeAmount] = useState(0);
    const [dueAmount, setDueAmount] = useState(0);
    const [payments, setPayments] = useState({ Cash: 0, Card: 0, Mobile: 0 });
    const [customer, setCustomer] = useState({ id: "", name: "", phone: "" });
    const [isPrint, setIsPrint] = useState(false);
    const [barcode, setBarcode] = useState("");
    console.log(cart);
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
    // console.log(products);
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
        setCart(cart.filter((item) => item.id !== id)); // remove from cart list
    };
    // cart clear
    const clearCart = () => {
        setCart([]);
        setSubtotal(0);
        setVAT(0);
        setGrandTotal(0);
        setDueAmount(0);
        setChangeAmount(0);
        setCustomer({ id: '', name: '', phone: '' });
        setBarcode('');
    };

    const handleCustomerChange = async (event) => {
        try {
            const phone = event.target.value;
            const response = await axios.get(`/get-customer-data/${phone}`);

            if (response.data.id) {
                setCustomer({ id: response.data.id, name: response.data.name, phone });
            } else {
                setCustomer({ id: '', phone });
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const handleInputChange = (event) => {
        setBarcode(event.target.value.trim());
    };

    // Function to handle Enter key press
    const handleKeyUp = (event) => {
        if (event.keyCode === 13) { // Check if Enter key is pressed
            event.preventDefault(); // Prevent default action (e.g., form submission)
            addCartFromBarcode(); // Call the function to add to cart
            setBarcode(''); // Clear the barcode input field
        }
    };
    // barcode scran add cart
    const addCartFromBarcode = () => {
        const product = products.find((product) => product.barcode === barcode);

        if (!product) {
            SwalAlert('warning', 'Product not found');
            return false;
        }

        const { id, name, sale_price } = product; // Correct way to extract values
        const stringId = String(id, 10); // Ensure id is always an String
        const price = parseFloat(sale_price);

        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === stringId);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === stringId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { id: stringId, name, price: price, quantity: 1 }];
        });
    };

    const addToCart = (event) => {
        const [id, name, price] = event.target.value.split(",");
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
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

    const submit = async () => {
        try {
            if (cart.length === 0) {
                SwalAlert('warning', 'Please add to cart product', 'center');
                return;
            }
            const response = await axios.post('/order-store', data, { withCredentials: true });
            // console.log(response)
            if (response.data.status) {
                setLastOrderNo(response.data.orderNo);
                SwalAlert('success', response.data.message, 'center');
                setIsPrint(true);
                // setCart([]);
                // setPayments({ Cash: 0, Card: 0, Mobile: 0 });
            } else {
                SwalAlert('warning', 'Add failed', 'center');
            }

        } catch (error) {
            console.error('Failed to place order:', error);
            SwalAlert('error', 'Failed to place order. Please try again.', 'center');
        }
    };

    const submitRouter = () => {
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
        <OrderLayout user={auth.user} header={'Purchases Invoice'}>
            <Head title="Sales Order" />
            <div className="h-screen flex flex-col">
                {/* Header */}
                <div className="bg-gray-200 p-2 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <img src="/abdullah_logo.png" alt="Outlet Logo" className="h-10 w-[180px]" />
                    </div>
                    <div className="text-xl font-bold">Outlet: Uttra 10 Outlet</div>
                    <div className="text-sm">User: {auth?.user?.uid}</div>
                    <div className="text-sm">
                        Terminal: DB/POS16N
                        <br />
                        <span className="text-gray-600 font-bold text-xl">Last Order No: {lastOrderNo}</span>
                    </div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="bg-indigo-500 rounded-sm m-1 p-2 text-sm"
                        title="Logout"
                    >
                        <i class="ri-contract-right-line"></i>
                    </Link>
                </div>
                <div className="flex flex-col md:flex-row w-full h-full">
                    {/* Main Content */}
                    <div className="w-4/5 p-6">
                        {/* section 1 == selected items */}
                        <div className="flex gap-4 mb-2">
                            <select className="border p-2 w-1/2" onChange={addToCart}>
                                <option value="" disabled selected>Select an item</option>
                                {products.map((product, index) => (
                                    <option key={index} value={`${product.id},${product.name},${product.sale_price}`}>{product.id} - {product.name} - ${product.sale_price}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                className="border p-2 w-1/2"
                                placeholder="Scan barcode or enter product ID"
                                value={barcode}
                                onChange={handleInputChange}
                                onKeyUp={handleKeyUp} // Attach the keyup event handler
                            />
                        </div>

                        {/* section 2== Cart items */}
                        <div className="h-[74%] bg-white shadow-lg p-2 overflow-hidden">
                            <h2 className="text-lg font-semibold mb-2">Shopping Cart</h2>
                            {
                                cart.length > 0 ? (
                                    <table className="w-full border-collapse bg-gray-100 rounded-md">
                                        <thead className="bg-gray-200">
                                            <tr className="bg-indigo-500 h-6 border border-indigo-500 text-white">
                                                <th className="p-2 text-left w-1">#</th>
                                                <th className="p-2 text-left">Product</th>
                                                <th className="p-2 text-left">Price</th>
                                                <th className="p-2 text-center">Quantity</th>
                                                <th className="p-2 text-right">Total</th>
                                                <th className="p-2 text-right"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cart.map((item, index) => (
                                                    <tr key={index} className="border-">
                                                        <td className="border-l border-r border-b border-indigo-500 w-1">{index + 1}</td>
                                                        <td className="border-l border-r border-b border-indigo-500">{item.name}</td>
                                                        <td className="border-l border-r border-b border-indigo-500">${item.price.toFixed(2)}</td>
                                                        <td className="border-l border-r border-b border-indigo-500 text-center">
                                                            <button onClick={() => updatequantity(index, -1)} className="bg-gray-300 px-1 rounded">-</button>
                                                            <span className="px-2">{item.quantity}</span>
                                                            <button onClick={() => updatequantity(index, 1)} className="bg-gray-300 px-1 rounded">+</button>
                                                        </td>
                                                        <td className="text-right border-l border-r border-b border-indigo-500">${(item.price * item.quantity).toFixed(2)}</td>
                                                        {/* removeFromCart button */}
                                                        <td className="border-l border-r border-b border-indigo-500 text-center w-10">
                                                            <button onClick={() => removeFromCart(item.id)} className="bg-red-500 p-1 text-white">X</button>
                                                        </td>
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
                        {/* Free Items - 20% Height */}
                        <div className="h-[20%] mt-2 bg-white shadow-lg p-2">
                            <h2 className="text-lg font-semibold">Free Items</h2>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="w-1/5 bg-white p-5 shadow-2xl rounded-lg">
                        {/* number of item button */}
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold mb-2 pb-2 border p-2">Number of Items ({cart.length})</h2>
                            <button onClick={clearCart} className="text-white text-sx mb-2 p-2 bg-red-600">Clear Cart</button>
                        </div>
                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="border p-1 w-full mb-3"
                            onChange={handleCustomerChange}
                            value={customer.phone ? customer.phone : ''}
                        />
                        <input
                            type="text"
                            placeholder="Customer Name"
                            className="border p-1 w-full mb-3"
                            style={customer.id ? { backgroundColor: 'green', color: 'white' } : {}}
                            value={customer.phone ? customer.name : 'Walking Customer'}
                            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                            readOnly={!!customer.id}  // Makes the input read-only if customer.id is not null
                        />

                        <div className="mt-2 bg-gray-100 p-2">
                            <h3 className="text-l font-semibold border-b pb-1">Order Summary</h3>
                            <div className="flex justify-between p-2"><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
                            <div className="flex justify-between p-1"><span>Discount:</span><input type="number" className="w-16 p-1 border text-right" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} /></div>
                            <div className="flex justify-between p-2"><span>VAT (5%):</span><span>${VAT.toFixed(2)}</span></div>
                            <div className="flex justify-between p-2 font-semibold text-lg"><span>Total:</span><span>${grandTotal.toFixed(2)}</span></div>
                        </div>
                        <div className="mt-2 bg-gray-100 p-2">
                            <h3 className="text-l font-semibold border-b pb-1">Payment Method</h3>
                            {Object.keys(payments).map((method) => (
                                <div className="flex justify-between p-1" key={method}>
                                    <span>{method.charAt(0).toUpperCase() + method.slice(1)}:</span>
                                    <input type="number" name={method} value={payments[method]} onChange={updatePayments} className="w-16 p-1 border text-right" />
                                </div>
                            ))}
                            <div className="flex justify-between p-2"><span>Change:</span><span>${changeAmount.toFixed(2)}</span></div>
                            <div className="flex justify-between p-2"><span>Due:</span><span>${dueAmount.toFixed(2)}</span></div>
                        </div>

                        <div className="flex gap-2 items-center justify-between">
                            <button onClick={() => submit()} className="text-white text-lg w-full py-2 bg-indigo-500">Order</button>
                            {/* <button className="bg-indigo-500 text-white m-1 px-4 py-2 hover:bg-indigo-400 focus:outline-none">VOID</button> */}
                            <Link className="bg-red-500 text-white m-1 px-4 py-2 hover:bg-red-700 focus:outline-none">EXIT</Link>
                        </div>
                    </div>
                </div>
                {
                    isPrint && <OrderPrint {... { cart, subtotal, discount, VAT, grandTotal, payments, changeAmount, dueAmount, isPrint, setIsPrint, setCart, setPayments, setCustomer }} />
                }
            </div>
        </OrderLayout>
    );
};

export default OrderCreate;
