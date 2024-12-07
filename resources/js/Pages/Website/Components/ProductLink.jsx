import React from 'react';
import { Link } from '@inertiajs/react';
const ProductLink = ({ slug }) => {
    return (
        <Link 
            href={`shop/${slug}`} 
            className="text-white text-lg w-9 h-8 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-gray-800 transition" 
            title="view product"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12c0 1.656-1.343 3-3 3s-3-1.344-3-3 1.343-3 3-3 3 1.344 3 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.522 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S3.732 16.057 2.458 12z" />
            </svg>
        </Link>
    );
}

export default ProductLink;
