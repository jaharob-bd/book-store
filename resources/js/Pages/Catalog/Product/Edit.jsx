import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import SwalAlert from '@/Components/Alert/SwalAlert';
const Edit = (props) => {
    const [activeTab, setActiveTab] = useState("general");
    const [user, setUser] = useState(props.auth.user);
    const [initial, setInitial] = useState(props.product);
    const [categories, setCategories] = useState([
        "Cat ipsum", "Cat lorem", "Cat Product", "Category", "Ipsum", "Ipsum cat", "Ipsum Lorem", "Lorem"
    ]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");

    // tags 
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    // publish 
    const today = new Date().toISOString().slice(0, 10);
    const { data, setData, reset, post } = useForm(initial);
    // image loading
    const [images, setImages] = useState([]);

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const newImages = files.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        setImages(prevImages => [...prevImages, ...newImages]);
    };

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        handleFiles(files);
    };

    const removeImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    // categories
    const handleCategoryChange = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(cat => cat !== category) : [...prev, category]
        );
    };

    const addCategory = () => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setNewCategory("");
        } else {
            SwalAlert('warning', 'Category are already existing');
        }
    };

    // tags
    const addTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag("");
        } else {
            SwalAlert('warning', 'Tags are already existing');
        }
    };
    // remove tag
    const removeTag = (index) => {
        setTags(prevTags => prevTags.filter((_, i) => i !== index));
    }
    // specipication
    const [specifications, setSpecifications] = useState([]);
    const [specInput, setSpecInput] = useState('');

    const addSpecification = () => {
        if (specInput.trim() !== '') {
            setSpecifications([...specifications, specInput]);
            setSpecInput('');
        }
    };

    const removeSpecification = (index) => {
        setSpecifications(specifications.filter((_, i) => i !== index));
    };

    return (
        <AuthenticatedLayout user={user} header={'Product List'}>
            <Head title={`Edit - ` + data.name} />
            <div className="bg-gray-100 h-screen">
                <div className="mx-auto flex">
                    {/* Main Section (70%) */}
                    <section className="w-3/4 bg-white shadow-lg pl-4 pr-4">
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
                                {/* <h3 className="text-lg font-bold mb-4">Product Data</h3> */}
                                <ul className="space-y-2">
                                    {['general', 'inventory', 'attributes', 'specification', 'linked-products'].map(tab => (
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
                                            {/* add more */}
                                        </form>
                                    </div>
                                )}
                                {activeTab === "inventory" && <div>
                                    <form>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-medium">SKU</label>
                                            <input type="url" className="w-full p-2 border border-gray-300" placeholder="Enter external URL" defaultValue="https://mercantile.wordpress.org/product/wordpress" />
                                        </div>
                                        <div className="mb-4 flex items-center">
                                            <input type="checkbox" id="manage-stock" className="mr-2" />
                                            <label htmlFor="manage-stock" className="text-gray-700">Enable stock management at product level</label>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-semibold">Stock status</label>
                                            <select className="w-full p-2 border focus:ring focus:ring-blue-300">
                                                <option>In stock</option>
                                                <option>Out of stock</option>
                                                <option>On backorder</option>
                                            </select>
                                        </div>
                                        <div className="mb-4 flex items-center">
                                            <input type="checkbox" id="sold-individually" className="mr-2" />
                                            <label htmlFor="sold-individually" className="text-gray-700">Enable this to only allow one of this item to be bought in a single order</label>
                                        </div>
                                    </form>
                                </div>}
                                {activeTab === "linked-products" && <div><h3 className="text-xl font-semibold">Linked Products</h3><p className="text-gray-700">Configure upsells, cross-sells, and grouping here.</p></div>}
                                {activeTab === "attributes" && <div>
                                    <form>
                                        <div classname="mb-4">
                                            <label className="block text-gray-700 font-semibold">Product data</label>
                                            <select className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300">
                                                <option>Variable product</option>
                                            </select>
                                        </div>
                                        <div className="flex space-x-2 mb-4 pt-2">
                                            <button className="px-2 py-2 bg-blue-600 text-white hover:bg-blue-700">Add new</button>
                                            <button className="px-2 py-2 bg-gray-200 text-gray-700 cursor-not-allowed">Add existing</button>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-semibold">Color</label>
                                            <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-gray-100">
                                                <span className="px-2 py-1 bg-gray-300 rounded-md">Blue</span>
                                                <span className="px-2 py-1 bg-gray-300 rounded-md">Gray</span>
                                                <span className="px-2 py-1 bg-gray-300 rounded-md">Green</span>
                                                <span className="px-2 py-1 bg-gray-300 rounded-md">Red</span>
                                                <span className="px-2 py-1 bg-gray-300 rounded-md">Yellow</span>
                                            </div>
                                            <div className="flex space-x-2 mt-2">
                                                <button className="text-blue-600">Select all</button>
                                                <button className="text-blue-600">Select none</button>
                                                <button className="px-2 py-1 bg-gray-200 rounded-md">Create value</button>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-semibold">Size</label>
                                            <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-gray-100">
                                                <span className="px-2 py-1 bg-gray-300 rounded-md">Large</span>
                                                <span className="px-2 py-1 bg-gray-300 rounded-md">Medium</span>
                                                <span className="px-2 py-1 bg-gray-300 rounded-md">Small</span>
                                            </div>
                                            <div className="flex space-x-2 mt-2">
                                                <button className="text-blue-600">Select all</button>
                                                <button className="text-blue-600">Select none</button>
                                                <button className="px-2 py-1 bg-gray-200 rounded-md">Create value</button>
                                            </div>
                                        </div>
                                        <button className="w-100 p-2 bg-blue-600 flex items-end text-white hover:bg-blue-700">Save</button>
                                    </form>
                                </div>}
                                {activeTab === "specification" && <div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-semibold">Product Specification</label>
                                        <div className="flex space-x-2">
                                            <textarea
                                                className="w-full p-2 border focus:ring focus:ring-blue-300"
                                                rows="2"
                                                placeholder="Enter product specifications..."
                                                value={specInput}
                                                onChange={(e) => setSpecInput(e.target.value)}
                                            ></textarea>
                                            <button
                                                className="px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700"
                                                onClick={addSpecification}
                                            >
                                                Add
                                            </button>
                                        </div>
                                        <div className="mt-2">
                                            {specifications.map((spec, index) => (
                                                <div key={index} className="flex justify-between items-center text-gray-700 bg-gray-100 p-2 rounded-sm mt-1">
                                                    <span>{index +1}. {spec}</span>
                                                    <button
                                                        className="ml-2 bg-red-600 text-white p-1 rounded-sm hover:text-white-700"
                                                        onClick={() => removeSpecification(index)}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Short Description</label>
                            <textarea className="w-full p-2 border border-gray-300" placeholder="Enter product description" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Meta title</label>
                            <input type="text" className="w-full p-2 border border-gray-300" placeholder="Enter product meta" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Meta Description</label>
                            <textarea className="w-full p-2 border border-gray-300" placeholder="Enter product description" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Review</label>
                            <textarea className="w-full p-2 border border-gray-300" placeholder="Enter product review" />
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
                        {/* div publish with border */}
                        <div className="border p-4 mb-4 mx-auto bg-white overflow-hidden shadow-lg">
                            <h3 className="font-bold border-b">Publish</h3>
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
                                <label className="mr-2">Published on: {today} </label>
                                <i class="ri-edit-2-fill"></i>
                            </div>
                        </div>
                        <div className="border p-4 mb-4 mx-auto bg-white overflow-hidden shadow-lg">
                            <h3 className="font-bold border-b pb-2">Product Images</h3>
                            <div
                                className="border-dashed border-2 border-gray-300 p-6 mt-2 text-center cursor-pointer rounded-md"
                                onDrop={handleDrop}
                                onDragOver={(event) => event.preventDefault()}
                                onClick={() => document.getElementById("fileInput").click()}
                            >
                                <p className="text-gray-700 mt-2">Drag and drop images here or click to upload.</p>
                                <input
                                    id="fileInput"
                                    type="file"
                                    multiple
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                />
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-2">
                                {images.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img src={image.preview} alt="Preview" className="w-full h-24 object-cover rounded" />
                                        <button
                                            className="absolute top-0 right-0 bg-red-500 text-white p-1"
                                            onClick={() => removeImage(index)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="border p-4 mb-4 mx-auto bg-white overflow-hidden shadow-lg">
                            <h3 className="font-bold border-b">Product Categories</h3>
                            <div className="max-h-40 overflow-y-auto mt-2">
                                {categories.map((category, index) => (
                                    <label key={index} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                        />
                                        <span>{category}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="flex items-center pt-2 space-x-2">
                                {/* <i class="ri-edit-2-fill"></i> */}
                                <input
                                    type="text"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    placeholder="Add new category"
                                    className="border p-1 w-full"
                                />
                                <button
                                    onClick={addCategory}
                                    className="bg-blue-500 text-white px-3 p-1"
                                >
                                    {/* plus icon */}
                                    <i class="ri-add-circle-line"></i>
                                </button>
                            </div>
                        </div>
                        <div className="border p-4 mb-4 mx-auto bg-white overflow-hidden shadow-lg">
                            <h3 className="font-bold border-b pb-2">Product Tags</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {tags.map((tag, index) => (
                                    <span key={index} className="bg-gray-200 px-2 py-1 rounded">
                                        {tag} <button className="bg-red-500 text-white px-1 ml-1 rounded" onClick={() => removeTag(index)}>✕</button>
                                    </span>
                                ))}
                            </div>
                            <div className="mt-4 flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="Add new tag"
                                    className="border p-1 rounded w-full"
                                />
                                <button
                                    onClick={addTag}
                                    className="bg-blue-500 text-white px-3 p-1"
                                >
                                    <i class="ri-add-circle-line"></i>
                                </button>
                            </div>
                        </div>
                        {/* add more information */}

                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;