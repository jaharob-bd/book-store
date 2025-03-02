import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
const Edit = (props) => {
    const [activeTab, setActiveTab] = useState("general");
    const [user, setUser] = useState(props.auth.user);
    const [initial, setInitial] = useState(props.product);
    const { data, setData, reset, post } = useForm(initial);

    return (
        <>
            <Head title={`Edit - ` + data.name} />
            <div className="bg-gray-100 h-screen">
                {/* Header */}
                {/* <div className="bg-gray-800 text-white">
                    <div className="max-w-6xl mx-auto flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Product Management</h1>
                        <a href="#" className="text-white hover:underline">Logout</a>
                    </div>
                </div> */}

                <div className="mx-auto flex">
                    {/* Main Section (70%) */}
                    <section className="w-3/4 bg-white shadow-lg p-3">
                        {/* <div className="flex justify-between mb-6">
                            <h2 className="text-2xl font-bold">Edit Product</h2>
                            <button className="bg-blue-600 text-white py-2 px-4 hover:bg-blue-700">Add New</button>
                        </div> */}
                        {/* product name, description */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Product Name</label>
                            <input type="text" className="w-full p-2 border border-gray-300" placeholder="Enter product name" defaultValue="Moriyam Paper" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Description</label>
                            <textarea className="w-full p-2 border border-gray-300" placeholder="Enter product description" defaultValue="Moriyam Paper is a high-quality, durable paper, suitable for various purposes." />
                        </div>

                        <div className="flex pb-3">
                            {/* Sidebar (Tabs) */}
                            <div className="w-1/4 bg-gray-200 p-6">
                                <h3 className="text-lg font-bold mb-4">Product Data</h3>
                                <ul className="space-y-2">
                                    {['general', 'inventory', 'linked-products', 'attributes', 'advanced'].map(tab => (
                                        <li key={tab}>
                                            <button
                                                className={`block py-2 px-4 w-full text-left ${activeTab === tab ? 'bg-blue-600 text-white' : 'hover:bg-gray-300'}`}
                                                onClick={() => setActiveTab(tab)}
                                            >
                                                {tab.replace("-", " ").replace(/\b\w/g, c => c.toUpperCase())}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Content */}
                            <div className="w-3/4 p-6">
                                {activeTab === "general" && (
                                    <div>
                                        <form>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-medium">Product URL</label>
                                                <input type="url" className="w-full p-2 border border-gray-300" placeholder="Enter external URL" defaultValue="https://mercantile.wordpress.org/product/wordpress" />
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-medium">Button Text</label>
                                                <input type="text" className="w-full p-2 border border-gray-300" placeholder="Enter button text" defaultValue="Buy on the WordPress swag store!" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Regular Price ($)</label>
                                                    <input type="number" className="w-full p-2 border border-gray-300" defaultValue="11.55" />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 font-medium">Sale Price ($)</label>
                                                    <input type="number" className="w-full p-2 border border-gray-300" placeholder="Enter sale price" />
                                                </div>
                                            </div>
                                            <div className="mb-4 mt-4">
                                                <label className="block text-gray-700 font-medium">Tax Status</label>
                                                <select className="w-full p-2 border border-gray-300">
                                                    <option selected>Taxable</option>
                                                    <option>None</option>
                                                </select>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-gray-700 font-medium">Tax Class</label>
                                                <select className="w-full p-2 border border-gray-300">
                                                    <option selected>Standard</option>
                                                    <option>Reduced Rate</option>
                                                    <option>Zero Rate</option>
                                                </select>
                                            </div>
                                            {/* <div className="flex justify-end pb-2">
                                                <button className="w-20 bg-green-600 text-white py-1 hover:bg-green-700">
                                                    save
                                                </button>
                                            </div> */}
                                        </form>
                                    </div>
                                )}
                                {activeTab === "inventory" && <div><h3 className="text-xl font-semibold">Inventory Settings</h3><p className="text-gray-700">Manage stock, SKU, and inventory settings here.</p></div>}
                                {activeTab === "linked-products" && <div><h3 className="text-xl font-semibold">Linked Products</h3><p className="text-gray-700">Configure upsells, cross-sells, and grouping here.</p></div>}
                                {activeTab === "attributes" && <div><h3 className="text-xl font-semibold">Product Attributes</h3><p className="text-gray-700">Manage product attributes such as size and color.</p></div>}
                                {activeTab === "advanced" && <div><h3 className="text-xl font-semibold">Advanced Options</h3><p className="text-gray-700">Configure advanced product settings here.</p></div>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Short Description</label>
                            <textarea className="w-full p-2 border border-gray-300" placeholder="Enter product description" defaultValue="Moriyam Paper is a high-quality, durable paper, suitable for various purposes." />
                        </div>
                    </section>

                    {/* Right Section (30%) */}
                    <section className="w-1/4 bg-white shadow-lg p-6">
                        <div className="flex justify-center pb-2">
                            <button className="w-[80%] bg-green-600 text-white py-1 hover:bg-green-700">
                                Update
                            </button>
                            <button className="w-[20%] bg-gray-600 text-white py-1 hover:bg-green-700 ml-2">
                                Add New 
                            </button>
                        </div>

                        {/* // div publish with border */}
                        <div className="border p-4 mb-4">
                            <h3 className="text-xl font-bold">Publish</h3>
                            {/* radio visible */}
                            <div className="flex items-center mt-4">
                                <input type="checkbox" name="visibility" id="visibility" className="mr-2" />
                                <label for="visibility">Visibility: Public</label>
                            </div>
                            {/* radio publish */}
                            <div className="flex items-center mt-4">
                                <input type="checkbox" name="visibility" id="visibility" className="mr-2" />
                                <label for="visibility">Status: Published</label>
                            </div>
                            {/* published on */}
                            <div className="flex items-center mt-4">
                                <label className="mr-2">Published on:</label>
                                <input type="date" className="p-1" value="" />
                            </div>
                        </div>
                        <div className="border p-4 mb-4">
                            <h3 className="text-xl font-bold">Product Categories</h3>
                            <p className="text-gray-700 mt-2">Select product categories here.</p>
                        </div>
                        <div className="border p-4 mb-4">
                            <h3 className="text-xl font-bold">Product Tags</h3>
                            <p className="text-gray-700 mt-2">Add product tags here.</p>
                        </div>
                        {/* <div className="border p-4 mb-4">
                            <h3 className="text-xl font-bold">Product Attributes</h3>
                            <p className="text-gray-700 mt-2">Add product attributes here.</p>
                        </div> */}
                        <div className="border p-4 mb-4">
                            <h3 className="text-xl font-bold">Product Variations</h3>
                            <p className="text-gray-700 mt-2">Add product variations here.</p>
                        </div>
                        {/* <div className="border p-4 mb-4">
                            <h3 className="text-xl font-bold">Product Downloads</h3>
                            <p className="text-gray-700 mt-2">Add product downloads here.</p>
                        </div> */}
                        {/* <div className="border p-4 mb-4">
                            <h3 className="text-xl font-bold">Product Reviews</h3>
                            <p className="text-gray-700 mt-2">Add product reviews here.</p>
                        </div> */}
                        <div className="border p-4 mb-4">
                            <h3 className="text-xl font-bold">Product Images</h3>
                            <p className="text-gray-700 mt-2">Add product images here.</p>
                        </div>
                        <div className="border p-4 mb-4">
                            <h3 className="text-xl font-bold">Product Meta</h3>
                            <p className="text-gray-700 mt-2">Add product meta here.</p>
                        </div>
                        <div className="border p-4 mb-4">
                            <h3 className="text-xl font-bold">Product Settings</h3>
                            <p className="text-gray-700 mt-2">Configure product settings here.</p>
                        </div>

                    </section>
                </div>
            </div>
        </>
    );
};

export default Edit;