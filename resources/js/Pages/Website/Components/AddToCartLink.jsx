import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext';

function AddToCartLink({ product }) {
    const { addToCart } = useContext(CartContext);
    return (
        <button onClick={() => addToCart(product)} href="#" className="block w-full py-1 text-center text-white bg-indigo-600 border border-indigo-600 rounded-b hover:bg-transparent hover:text-primary transition">
            Add to cart
        </button>
    )
}

export default AddToCartLink
