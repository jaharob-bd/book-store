import React from 'react'

function OrderPrint(props) {
    const { cart, subtotal, discount, VAT, grandTotal, payments, changeAmount, dueAmount } = props;
    return (
        <div className="w-80 bg-white shadow-lg p-4 text-center border border-gray-300">
            <h1 className="text-xl font-bold">RANSTEAD</h1>
            <p className="text-sm">WELCOME-TO-STORE</p>
            <p className="text-xs mt-2">Pay: CRO - Receipt: <span className="font-semibold">2012-11117-000016</span></p>
            <p className="text-xs">Cashier: 2 - 12/11/2020</p>
            <hr className="my-2 border-gray-400" />
            {
                cart.length > 0 ? (
                    <div className="text-left text-xs">
                        {
                            cart.map((item, index) => (
                                <div className="flex justify-between">
                                    <span>{item.quantity}. </span>
                                    <span>{item.name}</span>
                                    <span className="ml-auto">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
                        <div className="w-full text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <p className="text-xl">
                                CART IS EMPTY !!
                            </p>
                        </div>
                    </div>
                )
            }
            <hr className="my-2 border-gray-400" />
            <div className="text-xs">
                <p className="flex justify-between"><span className="w-1/2 text-right">Gross:</span> <span className="w-1/2 text-right">{subtotal.toFixed(2)}</span></p>
                <p className="flex justify-between"><span className="w-1/2 text-right">Discount:</span> <span className="w-1/2 text-right">{discount.toFixed(2)}</span></p>
                <p className="flex justify-between"><span className="w-1/2 text-right">Tax:</span> <span className="w-1/2 text-right">{VAT.toFixed(2)}</span></p>
                <p className="flex justify-between font-semibold"><span className="w-1/2 text-right">Nett:</span> <span className="w-1/2 text-right">{grandTotal.toFixed(2)}</span></p>
                {Object.keys(payments).map((method) => (
                    <p key={method} className="flex justify-between"><span className="w-1/2 text-right">{method.toUpperCase() } Paid:</span> <span className="w-1/2 text-right">{payments[method].toFixed(2)}</span></p>
                ))}
                <p className="flex justify-between"><span className="w-1/2 text-right">Change:</span> <span className="w-1/2 text-right">{changeAmount.toFixed(2)}</span></p>
                <p className="flex justify-between"><span className="w-1/2 text-right">Due:</span> <span className="w-1/2 text-right">{dueAmount.toFixed(2)}</span></p>
            </div>
            <hr className="my-2 border-gray-400" />
            <p className="text-xs font-semibold">2012-11117-000016</p>
            <div className="flex justify-center mt-2">
                <img src="https://barcode.tec-it.com/barcode.ashx?data=2012-11117-000016&code=Code128" alt="Barcode" className="h-10" />
            </div>
            <p className="text-xs mt-2">Thanks For Shopping</p>
            <p className="text-xs">Visit Again</p>
            <p className="text-xs font-bold mt-2">THANK-YOU</p>
        </div>

    )
}

export default OrderPrint
