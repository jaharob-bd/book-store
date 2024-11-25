import React, { useState } from 'react'
import { priceFormat, numberFormat } from '../Utils/helper'

const RightSidebar = (props) => {
  const { cartItems, addToCart, clearCart, removeFromCart, getTotalPrice, addCash, cash, change, submit } = props;
  const moneys = [2000, 5000, 10000, 20000, 50000, 100000]
  console.log(cartItems.length);

  return (
    <div className="w-3/12 flex flex-col bg-blue-gray-50 h-6 bg-white pr-4 pl-2 py-1">
      <div className="bg-white rounded-3xl flex flex-col h-6">
        {cartItems.length > 0 ? (
          <div>
            <div className="flex-1 w-full opacity-25 select-none flex flex-col flex-wrap content-center justify-center">
              <div className="pl-8 text-left text-lg py-4 relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div className="text-center absolute bg-cyan-500 text-white w-5 h-5 text-xs p-0 leading-5 rounded-full -right-2 top-3">
                  {cartItems.reduce((a, b) => a + (b['qty'] || 0), 0)}
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
        )}

        <table className="w-full totalCalculation">
          <thead>
            <tr className="bg-slate-600 h-10 border border-indigo-500 text-white">
              <th className="text-left w-2/5">MRP Total</th>
              <th className="text-left">:</th>
              <th className="text-right">1000</th>
            </tr>
            <tr className="bg-slate-600 h-10 border border-indigo-500 text-white">
              <th className="text-left w-2/5">(+) VAT</th>
              <th className="text-left">:</th>
              <th className="text-right">10</th>
            </tr>
            <tr className="bg-slate-600 h-10 border border-indigo-500 text-white">
              <th className="text-left w-2/5">(-) Discount</th>
              <th className="text-left">:</th>
              <th className="text-right">15</th>
            </tr>
            <tr className="bg-slate-600 h-10 border border-indigo-500 text-white">
              <th className="text-left w-2/5">Total </th>
              <th className="text-left">:</th>
              <th className="text-right">1025</th>
            </tr>
          </thead>
        </table>
        <br />
        <table className="w-full totalCalculation">
          <thead>
            <tr>
              <th className="border border-slate-500 text-left w-2/5">Bank Receive</th>
              <th className="border border-slate-500 text-right">10000</th>
            </tr>
            <tr>
              <th className="border border-slate-500 text-left w-2/5">e Com Cash</th>
              <th className="border border-slate-500 text-right"></th>
            </tr>
            <tr>
              <th className="border border-slate-500 text-left w-2/5">Cell fin</th>
              <th className="border border-slate-500 text-right"></th>
            </tr>
            <tr>
              <th className="border border-slate-500 text-left w-2/5">Nagad</th>
              <th className="border border-slate-500 text-right"></th>
            </tr>
            <tr>
              <th className="border border-slate-500 text-left w-2/5">Upay</th>
              <th className="border border-slate-500 text-right"></th>
            </tr>
            <tr>
              <th className="border border-slate-500 text-left w-2/5">Payable Amount</th>
              <th className="border border-slate-500 text-right bg-indigo-500 text-white">65</th>
            </tr>
            <tr>
              <th className="border border-slate-500 text-left w-2/5">Cash Receive</th>
              <th className="border border-slate-500 text-right"></th>
            </tr>
            <tr>
              <th className="border border-slate-500 text-left w-2/5">Change Amount </th>
              <th className="border border-slate-500 text-right bg-indigo-500 text-white">100</th>
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
    </div >
  )
}

export default RightSidebar
