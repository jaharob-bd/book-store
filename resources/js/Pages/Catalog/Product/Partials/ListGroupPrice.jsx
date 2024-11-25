import React from 'react'

export const ListGroupPrice = ({ groups }) => {
    return (
        <table className="table-fixed w-full border border-gray-300 pt-2">
            <thead>
                <tr className="border-b border-gray-300">
                    <th className="border-r border-gray-300">Group</th>
                    <th className="border-r border-gray-300">Dis. Type</th>
                    <th className="border-r border-gray-300">Qty</th>
                    <th className="border-r border-gray-300">Amount</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {groups &&
                    groups.map((gPrice, index) => {
                        return (
                            <tr key={index} className="border-b border-gray-300">
                                <td className="border-r border-gray-300">{gPrice.customer_group_id}</td>
                                <td className="border-r border-gray-300">{gPrice.discount_type}</td>
                                <td className="border-r border-gray-300">{gPrice.qty}</td>
                                <td className="border-r border-gray-300">{gPrice.amount}</td>
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
