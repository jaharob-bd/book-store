import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import Select from 'react-select';
import SwalAlert from '@/Components/Alert/SwalAlert';

const OrderCreate = (props) => {
    const auth = props.auth;
    const initial = [
        {
            customer_id: '',
            discount_type: 2, // 1 = percentage 2 = amount
            vat_type: 1, // 1 = percentage 2 = amount
            discount: '',
            vat: '',
            sub_total: '',
            grand_total: '',
            cash_in_hand: '',
            card_in_bank: '',
            online_banking: '',
            change_amount: '',
            due_amount: '',
            items: [
                // { variant_id: '', variant_name: '', product_id: '', product_name: '', variant_price: '', quantity: '', total_price: '' },
            ]
        }
    ];
    const [data, setData] = useState(initial);
    const [products, setProducts] = useState(props.products);
    const [customers, setCustomers] = useState(props.customers);
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [popoverData, setPopoverData] = useState(null);
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
    const options = products.map((product) => ({
        value: product.id,
        label: product.name,
        variant: product.variant_prices
    }));
    // customer options
    const customerOptions = customers.map((customer) => ({
        value: customer.id,
        label: customer.name
    }));
    // Log data whenever it updates
    useEffect(() => {
        // console.log(data);
    }, [data]);
    // customer options
    const handleCartItemCustomer = (selectedOption) => {
        console.log(selectedOption);
        setData((prevData) => {
            const updatedData = [...prevData];
            updatedData[0].customer_id = selectedOption ? selectedOption.value : '';
            return updatedData;
        });
        console.log(data)
        // setSearch(selectedOption ? selectedOption.value : '');
    }

    const handleMouseEnter = (event, data) => {
        const rect = event.target.getBoundingClientRect();
        setPopoverPosition({ top: rect.top, left: 300 });
        setPopoverData(data);
        setPopoverVisible(true);
    };

    const handleMouseLeave = () => {
        setPopoverVisible(false);
    };

    const CustomOption = (props) => (
        <div
            onMouseEnter={(e) => handleMouseEnter(e, props.data)}
            onMouseLeave={handleMouseLeave}
            onChange={(e) => handleCartItem(e, props.data)}
            {...props.innerProps}
            className="p-2 cursor-pointer hover:bg-gray-100"
        >
            {props.data.label + ' [' + props.data.variant.length + '] '}
            [
            {props.data.variant.length === 1
                ? props.data.variant[0].variant_name
                : props.data.variant.map(variant => variant.variant_name).join(', ')
            }
            ]
        </div>
    );
    const handleCartItem = (item) => {
        if (item.variant.length !== 1) {
            SwalAlert('warning', 'Please select product variant.');
            return;
        }

        const variantData = item.variant[0];
        const updatedItem = {
            variant_id: variantData.id,
            variant_name: variantData.variant_name,
            product_id: item.value,
            product_name: item.label,
            variant_price: variantData.sale_price,
            quantity: 1,
            total_price: variantData.sale_price
        };

        const discount = data[0].discount || 0;
        const vat = data[0].vat || 0;
        const itemIndex = data[0].items.findIndex(i => i.variant_id === variantData.id);

        if (itemIndex !== -1) {
            setPopoverVisible(false);
            SwalAlert('warning', 'Duplicate variant_id found. No update performed.');
            return;
        }

        setData((prevData) => {
            const updatedData = [...prevData];
            updatedData[0].items = updatedData[0].items.filter(i => i.variant_id);
            updatedData[0].items.push(updatedItem);

            const subTotal = calculateSubTotal(updatedData[0].items);
            updatedData[0].sub_total = subTotal;
            const grandTotal = calculateGrandTotal(subTotal, discount, vat);
            const cashInHand = updatedData[0].cash_in_hand || 0;
            const onlineBanking = updatedData[0].online_banking || 0;
            const cardInBank = updatedData[0].card_in_bank || 0;
            updatedData[0].grand_total = grandTotal;
            updatedData[0].change_amount = calculateChangeAmount(grandTotal, cashInHand, onlineBanking, cardInBank);
            updatedData[0].due_amount = calculateDueAmount(grandTotal, cashInHand, onlineBanking, cardInBank);

            return updatedData;
        });

        console.log(data);
        SwalAlert('success', `${item.label} ${variantData.variant_name} is Added`);
    };
    // ----- end variant propups -----
    // general state change batch_no, customer_id, store_id -----
    const calculateSubTotal = (items) => {
        return items.reduce((a, b) => a + Number(b.total_price || 0), 0);
    };

    const calculateGrandTotal = (subTotal, discount, vat) => {
        return parseInt(subTotal) - parseInt(discount) + parseInt(vat);
    };

    const calculateDiscount = (sub_total, discount, discount_type) => {
        if (discount_type === 2) {
            return discount || 0;
        }
        return discount ? (sub_total * discount) / 100 : 0;
    };

    const calculateVAT = (sub_total, discount, vat, vat_type) => {
        if (vat_type === 2) {
            return vat || 0;
        }
        return vat ? ((sub_total - discount) * vat) / 100 : 0;
    };
    // calculateDueAmount for
    const calculateDueAmount = (grandTotal, cashInHand, onlineBanking, cardInBank) => {
        let dueAmount = (grandTotal - cashInHand - onlineBanking - cardInBank);
        if (dueAmount < 0) return 0;
        return dueAmount;
    };
    // calculateChangeAmount
    const calculateChangeAmount = (grandTotal, cashInHand, onlineBanking, cardInBank) => {
        const changeAmount = parseInt(cashInHand) + parseInt(onlineBanking) + parseInt(cardInBank) - parseInt(grandTotal);
        if (changeAmount < 0) return 0;
        return changeAmount;
    }

    const resetDiscountOrVat = (item, type, value) => {
        if (type === 'discount_type') item.discount = value;
        if (type === 'vat_type') item.vat = value;
    };

    const handleQuantity = (e, variant_id) => {
        const { value } = e.target;
        const variant = variant_id;
        // update quantity where variant_id
        setData((prevData) => {
            const updatedData = [...prevData];
            updatedData[0].items = updatedData[0].items.map((item) =>
                item.variant_id === variant ? { ...item, quantity: value, total_price: (parseInt(item.variant_price) * value) } : item
            );

            const subTotal = calculateSubTotal(updatedData[0].items);
            updatedData[0].sub_total = subTotal;
            const discount = calculateDiscount(subTotal, updatedData[0].discount, updatedData[0].discount_type);
            const vat = calculateVAT(subTotal, discount, updatedData[0].vat, updatedData[0].vat_type);
            const grandTotal = calculateGrandTotal(subTotal, discount, vat);
            const cashInHand = updatedData[0].cash_in_hand || 0;
            const onlineBanking = updatedData[0].online_banking || 0;
            const cardInBank = updatedData[0].card_in_bank || 0;
            updatedData[0].grand_total = grandTotal;
            updatedData[0].change_amount = calculateChangeAmount(grandTotal, cashInHand, onlineBanking, cardInBank);
            updatedData[0].due_amount = calculateDueAmount(grandTotal, cashInHand, onlineBanking, cardInBank);

            return updatedData;
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData((prevData) => {
            const updatedData = [...prevData];
            const item = { ...updatedData[0], [name]: value };

            const subTotal = item.sub_total || 0;
            const discount = calculateDiscount(subTotal, item.discount, item.discount_type);
            const vat = calculateVAT(subTotal, discount, item.vat, item.vat_type);
            const grandTotal = calculateGrandTotal(subTotal, discount, vat);
            const cashInHand = item.cash_in_hand || 0;
            const onlineBanking = item.online_banking || 0;
            const cardInBank = item.card_in_bank || 0;
            item.grand_total = grandTotal;
            item.change_amount = calculateChangeAmount(grandTotal, cashInHand, onlineBanking, cardInBank);
            item.due_amount = calculateDueAmount(grandTotal, cashInHand, onlineBanking, cardInBank);
            updatedData[0] = item;

            return updatedData;
        });
        console.log(data)
    };

    const handleDiscountVatTypeChange = (e) => {
        const { name, checked } = e.target;
        const newType = checked ? 1 : 2;

        setData((prevData) => {
            const updatedData = [...prevData];
            const item = { ...updatedData[0], [name]: newType };

            resetDiscountOrVat(item, name, '');

            const subTotal = item.sub_total || 0;
            const discount = calculateDiscount(subTotal, item.discount, item.discount_type);
            const vat = calculateVAT(subTotal, discount, item.vat, item.vat_type);
            const grandTotal = calculateGrandTotal(subTotal, discount, vat);
            const cashInHand = item.cash_in_hand || 0;
            const onlineBanking = item.online_banking || 0;
            const cardInBank = item.card_in_bank || 0;
            item.grand_total = grandTotal;
            item.change_amount = calculateChangeAmount(grandTotal, cashInHand, onlineBanking, cardInBank);
            item.due_amount = calculateDueAmount(grandTotal, cashInHand, onlineBanking, cardInBank);
            updatedData[0] = item;

            return updatedData;
        });
    };

    const submit = () => {
        if (data[0].grand_total === '' || data[0].grand_total < 0) {
            SwalAlert('warning', 'Please add to card product', 'center');
            return;
        }
        if (data[0].customer_id === '') {
            SwalAlert('warning', 'Please add to customer', 'center');
            return;
        }

        try {
            router.post('/order-store', data, {
                preserveScroll: true,
                onSuccess: () => {
                    SwalAlert('success', 'Add Successfully!!', 'center');
                    setData(initial);
                },
                onError: (errors) => {
                    // Handle error response
                    // if (props.errors && Object.keys(props.errors).length > 0) {
                    //     const errorMessages = '<ul>' + Object.values(props.errors).map(err => `<li>${err}</li>`).join('') + '</ul>';
                    //     Swal.fire({
                    //         title: 'Error!',
                    //         html: errorMessages,
                    //         icon: 'error',
                    //         confirmButtonText: 'Cool'
                    //     });
                    // }
                    console.error('Failed price insert:', props.errors);
                },
            });
        } catch (error) {
            console.error('Failed :', error);
        }
    }
    return (
        <AuthenticatedLayout user={auth.user} header={'Purchases Invoice'}>
            <Head title="Sales Order" />
            <div className="flex flex-col md:flex-row w-full h-full">
                {/* Section 1 */}
                <div className="w-full md:w-7/12 flex-grow flex">
                    <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
                        <div className="flex px-2 flex-row relative">
                            <Select
                                options={options}
                                // onChange={(option) => console.log(option)}
                                onChange={handleCartItem}
                                classNamePrefix="react-select"
                                className="bg-white shadow text-lg w-full h-10 transition-shadow focus:shadow-2xl focus:outline-none"
                                placeholder="Select or Type Name ..."
                                components={{ Option: CustomOption }}
                            />
                            <div className="flex-1 w-full opacity-25 select-none flex flex-col flex-wrap content-center justify-center">
                                <div className="pl-2 text-left text-lg relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <div className="text-center absolute bg-cyan-500 text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-0">
                                        {data[0].items.length || 0}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {popoverVisible && popoverData.variant.length > 1 && (
                            <div
                                id="popover-content"
                                role="tooltip"
                                className="absolute z-50 text-sm text-gray-500 bg-white border border-indigo-600 rounded-lg shadow-sm w-70 dark:text-gray-400 dark:bg-gray-800 dark:border-indigo-600"
                                style={{ top: popoverPosition.top, left: popoverPosition.left }}
                            >
                                <div className="p-3">
                                    <div className="flex">
                                        <div>
                                            <p className="mb-1 text-base font-semibold leading-none text-gray-900 dark:text-white">
                                                <a href="#" className="hover:underline">
                                                    {popoverData.value + ' . ' + popoverData.label}
                                                </a>
                                                <button className="close"
                                                    onClick={handleMouseLeave}
                                                    aria-label="Close">X</button>

                                            </p>
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="bg-indigo-500 h-6 border border-indigo-500 text-white">
                                                        <th></th>
                                                        <th className="border-l border-r border-b border-indigo-500">Sl. No</th>
                                                        <th className="border-l border-r border-b border-indigo-500">Variant</th>
                                                        <th className="border-l border-r border-b border-indigo-500">Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        popoverData.variant.map((variant, i) => {
                                                            const productData = {
                                                                value: popoverData.value,
                                                                label: popoverData.label,
                                                                variant: [variant]
                                                            };

                                                            return (
                                                                <tr key={variant.id} className="font-bold h-4">
                                                                    <td
                                                                        className="border-l border-r border-b border-indigo-500"
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            onChange={(e) => handleCartItem(productData)}
                                                                        />
                                                                    </td>
                                                                    <td className="pl-1 border-l border-r border-b border-indigo-500">{i + 1}</td>
                                                                    <td className="pl-1 border-l border-r border-b border-indigo-500">{variant.variant_name}</td>
                                                                    <td className="pl-1 border-l border-r border-b border-indigo-500">{variant.sale_price}</td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div data-popper-arrow />
                            </div>
                        )}

                        <div className="h-full overflow-hidden mt-4">
                            <div className="h-full overflow-y-auto px-2">
                                {data[0].items.length > 0 ? (
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-indigo-500 h-6 border border-indigo-500 text-white">
                                                <th className="border-l border-r border-b border-indigo-500">Sl. No</th>
                                                <th className="border-l border-r border-b border-indigo-500">Name [Variant Name]</th>
                                                <th className="border-l border-r border-b border-indigo-500">Unit Price</th>
                                                <th className="border-l border-r border-b border-indigo-500">Quantity</th>
                                                <th className="border-l border-r border-b border-indigo-500">Total Price</th>
                                                <th className="p-2"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data[0].items.map((item, i) => (
                                                <tr key={item.variant_id} className="font-bold h-4">
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500">{i + 1}</td>
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500">{item.product_name + ' [' + item.variant_name + ']'}</td>
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">{item.variant_price}</td>
                                                    <td className="w-11 border-l border-r border-b border-indigo-500 text-center">
                                                        <input
                                                            type="text"
                                                            name="quantity"
                                                            className="w-full h-6 border-none text-center"
                                                            value={item.quantity}
                                                            onChange={(e) => handleQuantity(e, item.variant_id)}
                                                        />
                                                    </td>
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500">{item.total_price}</td>
                                                    <td className="pl-1 border-l border-r border-b border-indigo-500">x</td>
                                                </tr>
                                            ))}
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
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Section 2 */}
                <div className="w-full md:w-5/12 flex-grow flex px-3">
                    <div className="bg-white rounded-3xl flex flex-col w-full">
                        {/* {data[0].items.length > 0 ? (
                            <div>
                                <div className="flex-1 w-full opacity-25 select-none flex flex-col flex-wrap content-center justify-center">
                                    <div className="pl-8 text-left text-lg py-4 relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <div className="text-center absolute bg-cyan-500 text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3">
                                            {data[0].items.length || 0}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="flex-1 w-full p-4 opacity-25 select-none flex flex-col flex-wrap content-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <p>
                                        CART EMPTY!
                                    </p>
                                </div>
                            </div>
                        )} */}
                        {/* general information */}
                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                            <div className="sm:col-span-2 pb-2">
                                <Select
                                    name="customer_id"
                                    type="text"
                                    options={customerOptions}
                                    onChange={handleCartItemCustomer}
                                    classNamePrefix="react-select"
                                    placeholder="Select customer"
                                    className="block w-full mt-1 text-gray-900 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-100 dark:focus:border-blue-100 focus:outline-none focus:ring"
                                />

                            </div>
                        </div>
                        <table className="w-full totalCalculation">
                            <thead>
                                <tr className="bg-slate-600 h-10 border border-indigo-500 text-white">
                                    <th className="text-left w-2/5">Sub Total</th>
                                    <th className="text-left">:</th>
                                    <th className="text-right pr-7"> {data[0].sub_total}</th>
                                </tr>
                                <tr className="bg-slate-600 h-10 border border-indigo-500 text-white">
                                    <th className="text-left w-2/5">
                                        (-) Discount
                                        <label className="inline-flex items-center cursor-pointer pl-3 pt-2">
                                            <input
                                                type="checkbox"
                                                name="discount_type"
                                                className="sr-only peer p-8"
                                                checked={data[0].discount_type === 1}
                                                onChange={handleDiscountVatTypeChange}
                                            />
                                            <div className="relative w-11 h-4 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 pr-4" />
                                            <span className="ms-3 text-sm font-medium text-white dark:text-gray-300">{data[0].discount_type == 1 ? '(%)' : '($)'}</span>
                                        </label>

                                    </th>
                                    <th className="text-left">:</th>
                                    <th className="text-right"><input type="number" name="discount" className="bg-slate-600 text-right" value={data[0].discount} onChange={handleChange} /></th>
                                </tr>
                                <tr className="bg-slate-600 h-10 border border-indigo-500 text-white">
                                    <th className="text-left w-2/5">
                                        (+) VAT
                                        <label className="inline-flex items-center cursor-pointer pl-3 pt-2">
                                            <input type="checkbox"
                                                name="vat_type"
                                                className="sr-only peer p-8"
                                                checked={data[0].vat_type === 1}
                                                onChange={handleDiscountVatTypeChange}
                                            />
                                            <div className="relative w-11 h-4 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 pr-4" />
                                            <span className="ms-3 text-sm font-medium text-white dark:text-gray-300">{data[0].vat_type == 1 ? '(%)' : '($)'}</span>
                                        </label>
                                    </th>
                                    <th className="text-left">:</th>
                                    <th className="text-right"><input type="number" name="vat" className="bg-slate-600 text-right" value={data[0].vat} onChange={handleChange} /></th>
                                </tr>
                                <tr className="bg-slate-600 h-10 border border-indigo-500 text-white">
                                    <th className="text-left w-2/5">Grand Total</th>
                                    <th className="text-left">:</th>
                                    <th className="text-right pr-7">{data[0].grand_total}</th>
                                </tr>
                            </thead>
                        </table>
                        <table className="w-full totalCalculation pl-2">
                            <thead>
                                <tr>
                                    <th className="border border-slate-500 text-left w-2/5">Cash Received</th>
                                    <th className="border border-slate-500 text-right">
                                        <input type="number" name="cash_in_hand" value={data[0].cash_in_hand} className="w-full text-right border-none pr-4" onChange={handleChange} />
                                    </th>
                                </tr>
                                <tr>
                                    <th className="border border-slate-500 text-left w-2/5">Online Banking</th>
                                    <th className="border border-slate-500 text-right">
                                        <input type="number" name="online_banking" value={data[0].online_banking} className="w-full text-right border-none pr-4" onChange={handleChange} />
                                    </th>
                                </tr>
                                <tr>
                                    <th className="border border-slate-500 text-left w-2/5">VISA/Master Card</th>
                                    <th className="border border-slate-500 text-right">
                                        <input type="number" name="card_in_bank" value={data[0].card_in_bank} className="w-full text-right border-none pr-4" onChange={handleChange} />
                                    </th>
                                </tr>
                                <tr>
                                    <th className="border border-slate-500 text-left w-2/5">Change Amount </th>
                                    <th className="border border-slate-500 text-right bg-indigo-500 text-white">{data[0].change_amount}</th>
                                </tr>
                                <tr>
                                    <th className="border border-slate-500 text-left w-2/5">Due Amount </th>
                                    <th className="border border-slate-500 text-right bg-red-400 text-white">{data[0].due_amount}</th>
                                </tr>
                            </thead>
                        </table>

                        <div className="select-none h-auto w-full text-center pt-1 pb-2 px-2">
                            <div className="flex justify-center mb-3 text-lg font-semibold bg-cyan-50 text-cyan-700 py-2 px-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                            </div>
                            <button onClick={() => submit()} className={"text-white text-lg w-full py-2 bg-indigo-500"}>
                                SUBMIT
                            </button>
                            {/* <button onClick={() => submit()} disabled={change < 0 || cartItems.length <= 0} className={"text-white rounded-2xl text-lg w-full py-3 focus:outline-none " + (change >= 0 && cartItems.length > 0 ? "bg-cyan-500 hover:bg-cyan-600" : "bg-blue-gray-200")}>
                                SUBMIT
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default OrderCreate;
