import React from 'react'

export const ListVariantPrice = ({variants}) => {
    return (
        <table className="table-fixed w-full border border-gray-300 pt-2">
            <thead>
                <tr className="border-b border-gray-300">
                    <th className="border-r border-gray-300">Variant</th>
                    <th className="border-r border-gray-300">Buy Price</th>
                    <th className="border-r border-gray-300">Sale Price</th>
                    <th className="border-r border-gray-300">MRP Price</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {variants &&
                    variants?.map((vPrice, index) => {
                        return (
                            <tr key={index} className="border-b border-gray-300">
                                <td className="border-r border-gray-300">{vPrice.variant_name}</td>
                                <td className="border-r border-gray-300">{vPrice.buy_price}</td>
                                <td className="border-r border-gray-300">{vPrice.sale_price}</td>
                                <td className="border-r border-gray-300">{vPrice.mrp_price}</td>
                                <td className="border-r border-gray-300">
                                    <i className="ri-close-circle-fill" />
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
