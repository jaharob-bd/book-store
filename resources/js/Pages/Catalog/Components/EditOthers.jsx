import React from 'react'

export const EditOthers = () => {
    return (
        <div>
            <hr className="bg-gray-300 my-3" />
            <h2 id="videos" className="font-sans font-bold break-normal text-gray-700 px-2 pb-3 text-xl">Videos</h2>
            <div className="p-8 mt-6 lg:mt-0 rounded shadow bg-gray-100">
                <blockquote className="border-l-4 border-indigo-600 italic my-4 pl-8 md:pl-12">Final confirmation disclaimer message etc</blockquote>
                <div className="pt-8">
                    <button className="shadow bg-indigo-700 hover:bg-indigo-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mr-4" type="button">
                        Save
                    </button>
                    <button className="shadow bg-indigo-100 hover:bg-indigo-200 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded mr-4" type="button">
                        Additional Action
                    </button>
                    <button className="shadow bg-indigo-100 hover:bg-indigo-200 focus:shadow-outline focus:outline-none text-gray-700 font-bold py-2 px-4 rounded" type="button">
                        Additional Action
                    </button>
                </div>
            </div>
        </div>
    )
}
