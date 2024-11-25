import React, { useState, useEffect } from 'react'
// import web from '@/utils/web'
import { priceFormat } from '@/Utils/helper'
// import ContentLoader from 'react-content-loader'

const ProductMode = (props) => {
    const initItem = [
        {
            'code': 1001,
            'id': 1,
            'name': 'Burger Asiatique',
            'note': 'Extra Sauce',
            'price': 12.5,
            'devise': '$',
            'available': 12,
            'urlImage': '/products/br-1.jpeg',
            'id_category': 1,

        },
        {
            'code': 1002,
            'id': 2,
            'name': 'Burger Afrique',
            'note': 'Extra Egg',
            'price': 12.5,
            'devise': '$',
            'available': 20,
            'urlImage': '/products/br-2.jpeg',
            'id_category': 1,

        },
        {
            'code': 1003,
            'id': 3,
            'name': 'Burger French',
            'note': 'With Mayo',
            'price': 20.5,
            'devise': '$',
            'available': 10,
            'urlImage': '/products/br-3.jpeg',
            'id_category': 1,

        },
        {
            'code': 1004,
            'id': 4,
            'name': 'Burger Indian',
            'note': 'with Mustard',
            'price': 9.5,
            'devise': '$',
            'available': 10,
            'urlImage': '/products/br-4.jpeg',
            'id_category': 1,

        }
    ]
    const [items, setItems] = useState(initItem);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const { addToCart } = props

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const result = await web('/products')
            setProducts(result.data)
            setIsLoading(false)
        }
        fetchData()
        // setProducts(result.data)
    }, [])

    

    return (
        <div className="w-6/12 flex-grow flex">
            <div className="flex flex-col bg-blue-gray-50 h-full w-full py-4">
                <div className="flex px-2 flex-row relative">
                    <div className="absolute left-5 top-3 px-2 py-1 bg-cyan-500 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input onChange={(e) => setSearch(e.target.value)} type="text" className="bg-white shadow text-lg full w-full h-10 py-2 pl-16 transition-shadow focus:shadow-2xl focus:outline-none" placeholder="Scan Item Code or Name ..." />
                </div>
                <div className="h-full overflow-hidden mt-4">
                    <div className="h-full overflow-y-auto px-2">
                        {/* invoice */}

                        {
                            items.length > 0 ?
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-indigo-500 h-10 border border-indigo-500 text-white">
                                            <th className="border-l border-r border-b border-indigo-500">Sl. No</th>
                                            <th className="border-l border-r border-b border-indigo-500">Product Name</th>
                                            <th className="border-l border-r border-b border-indigo-500">Unit Price</th>
                                            <th className="border-l border-r border-b border-indigo-500">Quantity</th>
                                            <th className="p-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            items.map((item, i) => {
                                                return (
                                                    <tr key={item.id} className="font-bold">
                                                        <td className="pl-1 border-l border-r border-b border-indigo-500">{i + 1}</td>
                                                        <td className="pl-1 border-l border-r border-b border-indigo-500">{item.name}</td>
                                                        <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">{item.price}</td>
                                                        <td className="pl-1 border-l border-r border-b border-indigo-500 text-right">1</td>
                                                        <td className="pl-1 border-l border-r border-b border-indigo-500"></td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                                :
                                <div className="select-none bg-blue-gray-100 rounded-3xl flex flex-wrap content-center justify-center h-full opacity-25">
                                    <div className="w-full text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <p className="text-xl">
                                            CART IS EMPTY !!
                                        </p>
                                    </div>
                                </div>

                            // products
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductMode
