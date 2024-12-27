import React from 'react';
import WebLayout from './Layout/WebLayout';

const MyOrderTracking = ({ auth, order, tracking }) => {
    // console.log(auth);
    return (
        <WebLayout auth={auth}>
            <section className="py-8 antialiased md:py-16">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Track the delivery of order #{order.order_no}</h2>
                    <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
                        <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">

                            {
                                // map order.orderDetails
                                order.order_details.map(item => (
                                    <div key={item.id} className="space-y-4 p-6">
                                        <div className="flex items-center gap-6">
                                            <a href="#" className="h-14 w-14 shrink-0">
                                                <img className="h-full w-full" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                                                <img className="hidden h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                                            </a>
                                            <a href="#" className="min-w-0 flex-1 font-medium text-gray-900 hover:underline ">
                                                {item.product.name}
                                            </a>
                                        </div>
                                        <div className="flex items-center justify-between gap-4">
                                            <p className="text-sm font-normal text-gray-500 "><span className="font-medium text-gray-900 ">Product ID:</span> BJ8364850</p>
                                            <div className="flex items-center justify-end gap-4">
                                                <p className="text-base font-normal text-gray-900">x{item.quantity}</p>
                                                <p className="text-xl font-bold leading-tight text-gray-900">{item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }

                            <div className="space-y-4 bg-gray-50 text-gray-900 p-6">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-900 ">Original price</dt>
                                        <dd className="font-medium text-gray-900 ">{order.order_details.reduce((total, item) => total + item.price * item.quantity, 0)}</dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-900 ">Discount</dt>
                                        <dd className="text-base font-medium text-green-500">-{order.discount_amount}</dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-900 ">VAT</dt>
                                        <dd className="font-medium text-gray-900 ">{order.tax_amount}</dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="font-normal text-gray-900 ">Delivery Fee</dt>
                                        <dd className="font-medium text-gray-900 ">{order.shipping_fee}</dd>
                                    </dl>
                                </div>
                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-lg font-bold text-gray-900 ">Total</dt>
                                    <dd className="text-lg font-bold text-gray-900 ">{order.order_details.reduce((total, item) => total + item.price * item.quantity, 0) + parseFloat(order.shipping_fee)}</dd>
                                </dl>
                            </div>
                        </div>
                        <div className="mt-6 grow sm:mt-8 lg:mt-0">
                            <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                <h3 className="text-xl font-semibold text-gray-900 ">Order history</h3>
                                <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">
                                    <li className="mb-10 ms-6">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                            <svg className="h-4 w-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                                            </svg>
                                        </span>
                                        <h4 className="mb-0.5 text-base font-semibold text-gray-900 ">Created order in {tracking?.Pending?.statusUpdatedAt || tracking?.Pending?.statusUpdatedAt}</h4>
                                        <p className="text-sm font-normal text-gray-500 ">Order Pending</p>
                                    </li>
                                    <li className="mb-10 ms-6">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                            <svg className="h-4 w-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                                            </svg>
                                        </span>
                                        <h4 className="mb-0.5 text-base font-semibold text-gray-900 ">
                                            {tracking?.Processing?.statusUpdatedAt ? `Order Confirm in ${tracking?.Processing?.statusUpdatedAt}` : 'Please wait...'}
                                        </h4>
                                        <p className="text-sm font-normal text-gray-500 ">Order Processing</p>
                                    </li>
                                    <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                            <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11.917 9.724 16.5 19 7.5" />
                                            </svg>
                                        </span>
                                        <h4 className="mb-0.5 text-base font-semibold">
                                            {tracking?.Shipped?.statusUpdatedAt ? `Order Shipping in ${tracking?.Shipped?.statusUpdatedAt}` : 'Please wait...'}
                                        </h4>
                                        <p className="text-sm">Products delivered to the courier
                                            {tracking?.Shipped?.carrierName ? `- ${tracking?.Shipped?.carrierName}` : ''}
                                        </p>
                                    </li>
                                    <li className="mb-10 ms-6">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                            <svg className="h-4 w-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5" />
                                            </svg>
                                        </span>
                                        <h4 className="mb-0.5 text-base font-semibold text-gray-900 ">
                                            {tracking?.Shipped?.estimatedDeliveryDate ? `Estimated delivery in  ${tracking?.Shipped?.estimatedDeliveryDate}` : 'Please wait...'}
                                        </h4>
                                        <p className="text-sm font-normal text-gray-500 ">Products delivered</p>
                                    </li>
                                    <li className="mb-10 ms-6">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
                                            <svg className="h-4 w-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                            </svg>
                                        </span>
                                        <h4 className="mb-0.5 text-base font-semibold text-gray-900 ">{tracking?.Delivered?.statusUpdatedAt ? `Order Delivered in ' ${tracking?.Delivered}`?.statusUpdatedAt : 'Please wait...'}</h4>
                                        <p className="text-sm font-normal text-gray-500 ">Products being delivered</p>
                                    </li>
                                    <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                            <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11.917 9.724 16.5 19 7.5" />
                                            </svg>
                                        </span>
                                        <h4 className="mb-0.5 font-semibold">{tracking?.Payment?.statusUpdatedAt ? `Payment in ${tracking?.Payment?.statusUpdatedA}` : 'Please wait...'}</h4>
                                        <p className="text-sm">Payment accepted - {tracking?.Payment?.statusUpdatedAt ? 'VISA Credit Card' : 'Not Payment'}</p>
                                    </li>
                                    <li className="ms-6 text-primary-700 dark:text-primary-500">
                                        <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
                                            <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11.917 9.724 16.5 19 7.5" />
                                            </svg>
                                        </span>
                                        <div>
                                            <h4 className="mb-0.5 font-semibold">{tracking?.Placed?.statusUpdatedAt ? tracking?.Placed?.statusUpdatedAt : 'Please wait...'}</h4>
                                            <a href="#" className="text-sm font-medium hover:underline">Order placed {tracking?.Placed?.statusUpdatedAt ? '- Receipt #647563' : ''}</a>
                                        </div>
                                    </li>
                                </ol>
                                <div className="gap-4 sm:flex sm:items-center">
                                    <button type="button" className="w-full rounded-lg  border border-gray-200 px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:hover:text-gray-600">Cancel the order</button>
                                    <button href="#" className="mt-2 flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0">Order details</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </WebLayout>
    );
}

export default MyOrderTracking;
