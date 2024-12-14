import { useContext } from 'react';
import { WishListContext } from './context/WishListContext';
import { Link } from '@inertiajs/react';
import AddToCartLink from './Components/AddToCartLink';
import Breadcrumb from './Components/Breadcrumb';
import MyAccount from './Layout/MyAccount';

export default function MyWishList({ auth, products }) {
    const { wishList } = useContext(WishListContext);

    return (
        <div>
            <MyAccount auth={auth} title="Wish List" >
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
                {/* ./wrapper */}
            </MyAccount>
        </div>

    );
}