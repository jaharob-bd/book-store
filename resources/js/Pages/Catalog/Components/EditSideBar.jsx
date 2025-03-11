import { Link } from '@inertiajs/react'
import React from 'react'

function EditSideBar() {
    return (

        <div className="w-full lg:w-1/6 px-1 text-xl text-gray-800 leading-normal">
            <p className="text-base font-bold py-2 lg:pb-6 text-gray-700"><Link href={route('products')}><i className="ri-arrow-left-circle-line"></i></Link> Product Edit</p>
            <div className="block lg:hidden sticky inset-0">
                <button id="menu-toggle" className="flex w-full justify-end px-3 py-3 bg-white lg:bg-transparent border rounded border-gray-600 hover:border-indigo-600 appearance-none focus:outline-none">
                    <svg className="fill-current h-3 float-right" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </button>
            </div>
            <div className="w-full sticky inset-0 hidden max-h-90 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-1 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20" style={{ top: '6em' }} id="menu-content">
                <ul className="list-reset py-1 md:py-0">
                    <li className="py-1 md:my-1 hover:bg-indigo-100 lg:hover:bg-transparent border-l-4 border-transparent font-bold border-indigo-600">
                        <a href="#general" className="block pl-4 align-middle text-gray-700 no-underline hover:text-indigo-600">
                            <span className="pb-1 md:pb-0 text-sm">General</span>
                        </a>
                    </li>
                    <li className="py-1 md:my-1 hover:bg-indigo-100 lg:hover:bg-transparent border-l-4 border-transparent">
                        <a href="#description" className="block pl-4 align-middle text-gray-700 no-underline hover:text-indigo-600">
                            <span className="pb-1 md:pb-0 text-sm">Description</span>
                        </a>
                    </li>
                    <li className="py-1 md:my-1 hover:bg-indigo-100 lg:hover:bg-transparent border-l-4 border-transparent">
                        <a href="#image" className="block pl-4 align-middle text-gray-700 no-underline hover:text-indigo-600">
                            <span className="pb-1 md:pb-0 text-sm">Image</span>
                        </a>
                    </li>
                    <li className="py-1 md:my-1 hover:bg-indigo-100 lg:hover:bg-transparent border-l-4 border-transparent">
                        <a href="#price" className="block pl-4 align-middle text-gray-700 no-underline hover:text-indigo-600">
                            <span className="pb-1 md:pb-0 text-sm">Price</span>
                        </a>
                    </li>
                    {/* <li className="py-1 md:my-1 hover:bg-indigo-100 lg:hover:bg-transparent border-l-4 border-transparent">
                        <a href="#videos" className="block pl-4 align-middle text-gray-700 no-underline hover:text-indigo-600">
                            <span className="pb-1 md:pb-0 text-sm">Videos</span>
                        </a>
                    </li>
                    <li className="py-1 md:my-1 hover:bg-indigo-100 lg:hover:bg-transparent border-l-4 border-transparent">
                        <a href="#others" className="block pl-4 align-middle text-gray-700 no-underline hover:text-indigo-600">
                            <span className="pb-1 md:pb-0 text-sm">Others</span>
                        </a>
                    </li> */}
                    <li className="py-1 md:my-1 hover:bg-indigo-100 lg:hover:bg-transparent border-l-4 border-transparent">
                        <a href="#settings" className="block pl-4 align-middle text-gray-700 no-underline hover:text-indigo-600">
                            <span className="pb-1 md:pb-0 text-sm">Settings</span>
                        </a>
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default EditSideBar