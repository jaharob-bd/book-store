import WebLayout from './Layout/WebLayout';
import { useContext } from 'react';
import { WishListContext } from './context/WishListContext';
import { Link } from '@inertiajs/react';
import AddToCartLink from './Components/AddToCartLink';

export default function Wishlist({ auth, products }) {
    const { wishList } = useContext(WishListContext);

    return (
        <div>
            <WebLayout auth={auth}>
                {/* breadcrumb */}
                <div className="container py-4 flex items-center gap-3">
                    <a href="../index.html" className="text-primary text-base">
                        <i className="fa-solid fa-house" />
                    </a>
                    <span className="text-sm text-gray-400">
                        <i className="fa-solid fa-chevron-right" />
                    </span>
                    <p className="text-gray-600 font-medium">Profile</p>
                </div>
                {/* ./breadcrumb */}
                {/* wrapper */}
                <div className="container grid grid-cols-12 items-start gap-6 pt-4 pb-16">
                    {/* sidebar */}
                    <div className="col-span-3">
                        <div className="px-4 py-3 shadow flex items-center gap-4">
                            <div className="flex-shrink-0">
                                <img src="../assets/images/avatar.png" alt="profile" className="rounded-full w-14 h-14 border border-gray-200 p-1 object-cover" />
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
                                <a href="#" className="relative hover:text-primary block capitalize transition">
                                    Change password
                                </a>
                            </div>
                            <div className="space-y-1 pl-8 pt-4">
                                <a href="#" className="relative hover:text-primary block font-medium capitalize transition">
                                    <span className="absolute -left-8 top-0 text-base">
                                        <i className="fa-solid fa-box-archive" />
                                    </span>
                                    My order history
                                </a>
                                <a href="#" className="relative hover:text-primary block capitalize transition">
                                    My returns
                                </a>
                                <a href="#" className="relative hover:text-primary block capitalize transition">
                                    My Cancellations
                                </a>
                                <a href="#" className="relative hover:text-primary block capitalize transition">
                                    My reviews
                                </a>
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
                                <a href="#" className="relative text-primary block font-medium capitalize transition">
                                    <span className="absolute -left-8 top-0 text-base">
                                        <i className="fa-regular fa-heart" />
                                    </span>
                                    My wishlist
                                </a>
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
                    </div>
                    {/* ./sidebar */}
                    {/* wishlist */}
                    <div className="col-span-9 space-y-4">
                        {wishList.map((item, index) => (
                            <div key={index} className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
                                <div className="w-28">
                                    <img src="image.png" alt={`product ${item.id}`} className="w-full" />
                                </div>
                                <div className="w-1/3">
                                    <h2 className="text-gray-800 text-xl font-medium uppercase">{item.name}</h2>
                                    <p className="text-gray-500 text-sm">Availability: <span className="text-green-600">In Stock</span></p>
                                </div>
                                <div className="text-primary text-lg font-semibold">${item.sale_price}</div>
                                <AddToCartLink product={item} className="px-6 py-2 text-center text-sm text-white bg-indigo-600 border border-indigo-600 rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium" />
                                <div className="text-gray-600 cursor-pointer hover:text-primary">
                                    <i className="fa-solid fa-trash" />
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* ./wishlist */}
                </div>
                {/* ./wrapper */}
            </WebLayout>
        </div>

    );
}