import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Footer({ auth }) {
    const { props } = usePage();
    const logo = props.url?.base_url + '/company-logo.svg'
    return (
        <div>
            <div>
                {/* footer */}
                <footer className="bg-gray-800 pt-16 pb-12 border-t border-gray-100">
                    <div className="container grid grid-cols-1 ">
                        <div className="col-span-1 space-y-4">
                            <span className="text-white"><img src={logo} alt="logo" className="w-30" /></span>
                            <div className="mr-2">
                                <p className="text-white">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, hic?
                                </p>
                            </div>
                            <div className="flex space-x-5">
                                <a href="#" className="text-white hover:text-white"><i className="fa-brands fa-facebook-square" /></a>
                                <a href="#" className="text-white hover:text-white"><i className="fa-brands fa-instagram-square" /></a>
                                <a href="#" className="text-white hover:text-white"><i className="fa-brands fa-twitter-square" /></a>
                                <a href="#" className="text-white hover:text-white">
                                    <i className="fa-brands fa-github-square" />
                                </a>
                            </div>
                        </div>
                        <div className="col-span-2 grid grid-cols-2 gap-4">
                            <div className="grid grid-cols-2 gap-4 md:gap-8">
                                <div>
                                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Solutions</h3>
                                    <div className="mt-4 space-y-4">
                                        <a href="#" className="text-base text-white hover:text-red-600 block">Marketing</a>
                                        <a href="#" className="text-base text-white hover:text-red-600 block">Analitycs</a>
                                        <a href="#" className="text-base text-white hover:text-red-600 block">Commerce</a>
                                        <a href="#" className="text-base text-white hover:text-red-600 block">Insights</a>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Support</h3>
                                    <div className="mt-4 space-y-4">
                                        <a href="#" className="text-base text-white hover:text-red-600 block">Pricing</a>
                                        {/* <a href="#" class="text-base text-white hover:text-red-600 block">Documentation</a> */}
                                        <a href="#" className="text-base text-white hover:text-red-600 block">Guides</a>
                                        <a href="#" className="text-base text-white hover:text-red-600 block">API Status</a>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Solutions</h3>
                                    <div className="mt-4 space-y-4">
                                        <a href="#" className="text-base text-white hover:text-red-600 block">Marketing</a>
                                        <a href="#" className="text-base text-white hover:text-red-600 block">Analitycs</a>
                                        <a href="#" className="text-base text-white hover:text-red-600 block">Commerce</a>
                                        <a href="#" className="text-base text-white hover:text-red-600 block">Insights</a>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Support</h3>
                                    <div className="mt-4 space-y-4">
                                        <a href="#" className="text-base text-white hover:text-red-600 block">Pricing</a>
                                        {/* <a href="#" class="text-base text-white hover:text-red-600 block">Documentation</a> */}
                                        <a href="#" className="text-base text-white hover:text-red-600 block">Guides</a>
                                        <a href="#" className="text-base text-white hover:text-red-600 block">API Status</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                {/* ./footer */}
                {/* copyright */}
                <div className="bg-gray-800 py-4">
                    <div className="container flex items-center justify-between">
                        <p className="text-white">© TailCommerce - All Right Reserved</p>
                        <div>
                            {/* <img src="assets/images/methods.png" alt="methods" className="h-5" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}