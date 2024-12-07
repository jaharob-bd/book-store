import React, { useContext } from 'react';
import { WishListContext } from '../context/WishListContext';

const WishLink = ({ product }) => {
    const { addToWishList } = useContext(WishListContext);
    return (
        <button
            onClick={() => addToWishList(product)}
            className="text-white text-lg w-9 h-8 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-gray-800 transition" title="add to wishlist">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.172 3.172a4 4 0 015.656 0l.172.172.172-.172a4 4 0 115.656 5.656L12 12.172l-3.828-3.828a4 4 0 00-5.656 0 4 4 0 000 5.656L12 21.828l9.172-9.172a4 4 0 00-5.656-5.656L12 3.172"
                />
            </svg>
        </button>
    );
}

export default WishLink;
