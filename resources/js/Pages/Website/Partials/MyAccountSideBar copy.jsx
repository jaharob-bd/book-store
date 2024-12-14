import { Link, usePage } from '@inertiajs/react'
import React from 'react'

function MyAccountSideBar({ auth }) {
    const { url } = usePage();
    return (
        <>
            <div className="px-4 py-3 shadow flex items-center gap-4">
                <div className="flex-shrink-0">
                    <img src="image.png" alt="profile" className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover" />
                </div>
                <div className="flex-grow">
                    <p className="text-gray-600">Hello,</p>
                    <h4
                        className="text-gray-800 font-medium">
                        {auth?.user?.name}
                    </h4>
                </div>
            </div>
            <div className="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
                <div className="space-y-1 pl-8">
                    <a href="#" className="block font-medium capitalize transition">
                        <span className="absolute -left-8 top-0 text-base">
                            <i className="fa-regular fa-address-card" />
                        </span>
                        Manage account
                    </a>
                    <a href="#" className="relative hover:text-primary block capitalize transition">
                        Profile information
                    </a>
                    <a href="#" className="relative hover:text-primary block capitalize transition">
                        Manage addresses
                    </a>
                    <Link
                        href={route('user.my-change-password')}
                        className={`relative hover:text-primary block font-medium capitalize transition ${url === '/user/my-change-password' ? 'text-primary' : 'text-gray-500'}`}
                    >
                        Change password
                    </Link>
                </div>
                <div className="space-y-1 pl-8 pt-4">
                    <Link
                        href={route('user.my-order-history')}
                        className={`relative hover:text-primary block font-medium capitalize transition ${url === '/user/my-order-history' ? 'text-primary' : 'text-gray-500'}`}
                    >
                        <span className="absolute -left-8 top-0 text-base">
                            <i className="fa-solid fa-box-archive" />
                        </span>
                        My order history
                    </Link>
                    {/* <a href="#" className="relative hover:text-primary block capitalize transition">
                        My returns
                    </a>
                    <a href="#" className="relative hover:text-primary block capitalize transition">
                        My Cancellations
                    </a>
                    <a href="#" className="relative hover:text-primary block capitalize transition">
                        My reviews
                    </a> */}
                </div>
                <div className="space-y-1 pl-8 pt-4">
                    <a href="#" className="relative hover:text-primary block font-medium capitalize transition">
                        <span className="absolute -left-8 top-0 text-base">
                            <i className="fa-regular fa-credit-card" />
                        </span>
                        Payment methods
                    </a>
                    <a href="#" className="relative hover:text-primary block capitalize transition">
                        voucher
                    </a>
                </div>
                <div className="space-y-1 pl-8 pt-4">
                    <Link
                        href={route('user.my-wish-list')}
                        className={`relative hover:text-primary block font-medium capitalize transition ${url === '/user/my-wish-list' ? 'text-primary' : 'text-gray-500'}`}
                    >
                        <span className="absolute -left-8 top-0 text-base">
                            <i className="fa-regular fa-heart" />
                        </span>
                        My wishlist
                    </Link>
                </div>
                <div className="space-y-1 pl-8 pt-4">
                    <Link href={route('logout')}
                        method="post"
                        as="button" className="relative hover:text-primary block font-medium capitalize transition">
                        <span className="absolute -left-8 top-0 text-base">
                            <i className="fa-solid fa-right-from-bracket" />
                        </span>
                        Logout
                    </Link>
                </div>
            </div>
        </>
    )
}

export default MyAccountSideBar
