import React from 'react'

function ProductSubmition({ submit }) {
    return (
        <div className="flex justify-center pb-2">
            <button className="w-[80%] bg-green-600 text-white py-1 hover:bg-green-700" onClick={submit}>
                Update
            </button>
            <button className="w-[20%] bg-gray-600 text-white py-1 hover:bg-green-700 ml-2">
                Add New
            </button>
        </div>
    )
}

export default ProductSubmition
