import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import SwalAlert from '@/Components/Alert/SwalAlert';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const Edit = (props) => {
    // console.log(props.response);
    const [activeTab, setActiveTab] = useState("general");
    const user = props.auth.user; // user
    const [product, setProduct] = useState(props.product); // product
    // console.log(product);
    const today = new Date().toISOString().slice(0, 10);
    // const categories = props.categories;
    // const [categories, setCategories] = useState([ // categories
    //     "Cat ipsum", "Cat lorem", "Cat Product", "Category", "Ipsum", "Ipsum cat", "Ipsum Lorem", "Lorem"
    // ]);
    const [categories, setCategories] = useState(props.categories);
    const [newCategory, setNewCategory] = useState("");
    console.log(newCategory);
    const [newTag, setNewTag] = useState(""); // tags
    const [specInput, setSpecInput] = useState('');
    // images function 
    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const newImages = files.map(file => Object.assign(file, {
            // id: 0,
            preview: URL.createObjectURL(file)
        }));
        setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    };

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        handleFiles(files);
    };

    const removeImage = (index) => {
        setFormData(prev => prev?.formData?.images.filter((_, i) => i !== index));
    };

    // categories function
    const handleCategoryChange = (category) => {
        setFormData(prev => {
            const updatedCategories = prev.categories.includes(category)
                ? prev.categories.filter(cat => cat !== category) // Remove category if already selected
                : [...prev.categories, category]; // Add category if not selected

            return { ...prev, categories: updatedCategories };
        });
    };

    // const addCategory = () => {
    //     if (newCategory && !categories.includes(newCategory)) {
    //         const countTotalCategory = formData.categories.length;
    //         // console.log(countTotalCategory);
    //         setFormData(prev => ({ ...prev, categories: [...prev.categories, {id: countTotalCategory + 1, name: newCategory }] }));
    //         setNewCategory("");
    //     } else {
    //         SwalAlert('warning', 'Category are already existing');
    //     }
    // };

    const addCategory = () => {
        if (newCategory && !categories.some(cat => cat.name === newCategory)) {
            const newId = categories.length + 1;
            const newCatObj = { id: newId, name: newCategory };

            // Update both state variables
            setCategories(prev => [...prev, newCatObj]);
            setFormData(prev => ({ ...prev, categories: [...prev.categories, newCatObj] }));

            setNewCategory("");
        } else {
            SwalAlert('warning', 'Category already exists');
        }
    };

    // tags function
    const addTag = () => {
        if (newTag && !formData.tags.includes(newTag)) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, { id: 0, name: newTag }] }));
            setNewTag("");
        } else {
            SwalAlert('warning', 'Tags are already existing');
        }
    };

    const removeTag = (index) => {
        setFormData(prev => prev.formData.tags.filter((_, i) => i !== index));
    }

    // specipication
    const addSpecification = () => {
        if (specInput.trim() !== '') {
            setFormData(prev => ({ ...prev, specifications: [...prev.specifications, specInput] }));
            setSpecInput('');
        }
    };

    const removeSpecification = (index) => {
        setFormData(prev => prev.formData.specifications.filter((_, i) => i !== index));
    };

    const createSlug = (name) => {
        return name
            .toLowerCase()  // Convert to lowercase
            .replace(/ /g, '-')  // Replace spaces with hyphens
            .replace(/[^\w-]+/g, '');  // Remove all non-word characters
    }
    // set initial value
    const initial = {
        product_id: product.id,
        name: product.name || '',
        description: product.description,
        shortDescription: product.short_description,
        status: 1,
        newProduct: 1,
        featured: 0,
        meta: {
            metaTitle: product.meta_title || '',
            metaDescription: product.meta_description || '',
            metaKeywords: product.meta_keywords || '',
        },
        general: {
            productUrl: product.product_url,
            productType: product.product_type,
            regularPrice: product.regular_price,
            salePrice: product.sale_price,
            mrpPrice: product.mrp_price,
            taxStatus: product.tax_status,
            taxClass: product.tax_class,
            taxIncluded: product.tax_included || 0,
            expiryDate: product.expiry_date,
        },
        inventory: {
            sku: product.sku,
            stockQuantity: product.stock_quantity || 0,
            manageStock: product.manage_stock || 0,
            stockStatus: product.stock_status || 0,
        },
        publish: {
            publishedAt: product.published_at || today,
            visibleIndividually: 1,
        },
        categories: product.categories,
        tags: product.tags,
        images: product.images,
        specifications: [],
        attributes: [],                   // future 
        variants: []                    // future
    };
    const [formData, setFormData] = useState(initial);
    console.log(formData);
    // submit use axios
    const submit = async () => {
        // const formDataToSend = FormData;
        // --- Create a new FormData instance to send data with the image files if not need image upload could not use formDataToSend --
        const formDataToSend = new FormData();
        // Append all key-value pairs from formData state
        Object.keys(formData).forEach((key) => {
            // Check if value is an array to send as an array in Laravel
            if (Array.isArray(formData[key])) {
                // Append arrays correctly
                formData[key].forEach((value) => {
                    formDataToSend.append(`${key}[]`, value); // Send as an array in Laravel
                });
            } else if (typeof formData[key] === "object" && formData[key] !== null) {
                // Handle nested object (general)
                Object.keys(formData[key]).forEach((subKey) => {
                    formDataToSend.append(`${key}[${subKey}]`, formData[key][subKey]);
                });
            } else {
                // Append other fields normally
                formDataToSend.append(key, formData[key]);
            }
        });
        // -- end of formDataToSend
        try {
            const response = await axios.post('/product-update', formDataToSend, { withCredentials: true });
            // router.push('/product-edit/' + formData.general.productUrl);
            if (response.data.status) {
                // change url to current
                // console.log('Navigating to:', '/product-edit/' + formData.general.productUrl);
                // router.visit('/product-edit/' + formData.general.productUrl);
                SwalAlert('success', response.data.message, 'center');
            } else {
                SwalAlert('warning', 'Add failed', 'center');
            }
        } catch (error) {
            console.error('Failed to place order:', error);
            SwalAlert('error', 'Failed to place order. Please try again.', 'center');
        }
    };

    return (
        <AuthenticatedLayout user={user} header={'Product List'}>
            <Head title={`Edit - ` + ''} />
            <div className="bg-gray-100 h-screen">
                <div className="mx-auto flex">
                    {/* Main Section (70%) */}
                    <section className="w-3/4 bg-white shadow-lg pl-4 pr-4">
                        {/* product name, description */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full p-2 border border-gray-300"
                                placeholder="Enter product name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value, general: { ...prev.general, productUrl: createSlug(e.target.value) } }))}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Description</label>
                            <textarea
                                className="w-full p-2 border border-gray-300"
                                placeholder="Enter product description"
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            />
                        </div>
                        {/* tab start */}
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
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-medium">Product URL</label>
                                            <input type="url"
                                                className="w-full p-2 border border-gray-300"
                                                placeholder="Enter external URL"
                                                value={formData.general?.productUrl}
                                                onChange={(e) => setFormData(prev => ({ ...prev, general: { ...prev.general, productUrl: createSlug(e.target.value) } }))}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-gray-700 font-medium">Regular Price ($)</label>
                                                <input type="number"
                                                    className="w-full p-2 border border-gray-300"
                                                    value={formData.general.regularPrice}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, general: { ...prev.general, regularPrice: e.target.value } }))}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-700 font-medium">Sale Price ($)</label>
                                                <input type="number"
                                                    className="w-full p-2 border border-gray-300"
                                                    placeholder="Enter sale price"
                                                    value={formData.general.salePrice}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, general: { ...prev.general, salePrice: e.target.value } }))}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4 mt-4">
                                            <label className="block text-gray-700 font-medium">Tax Status</label>
                                            <select className="w-full p-2 border border-gray-300"
                                                value={formData.general?.taxStatus}
                                                onChange={(e) => setFormData(prev => ({ ...prev, general: { ...prev.general, taxStatus: e.target.value } }))}
                                            >
                                                <option selected>Taxable</option>
                                                <option>None</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-medium">Tax Class</label>
                                            <select
                                                className="w-full p-2 border border-gray-300"
                                                value={formData.general?.taxClass}
                                                onChange={(e) => setFormData(prev => ({ ...prev, general: { ...prev.general, taxClass: e.target.value } }))}
                                            >
                                                <option selected>Standard</option>
                                                <option>Reduced Rate</option>
                                                <option>Zero Rate</option>
                                            </select>
                                        </div>
                                        {/* add more */}
                                    </div>
                                )}
                                {activeTab === "inventory" && <div>
                                    <form>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-medium">SKU</label>
                                            <input type="url"
                                                className="w-full p-2 border border-gray-300"
                                                placeholder="Enter external URL"
                                                value={formData.inventory.sku}
                                                onChange={(e) => setFormData(prev => ({ ...prev, inventory: { ...prev.inventory, sku: e.target.value } }))}
                                            />
                                        </div>
                                        <div className="mb-4 flex items-center">
                                            <input type="checkbox" id="manage-stock" className="mr-2"
                                                value={formData.inventory.manageStock}
                                                onChange={(e) => setFormData(prev => ({ ...prev, inventory: { ...prev.inventory, manageStock: e.target.checked } }))}
                                            />
                                            <label htmlFor="manage-stock" className="text-gray-700">Enable stock management at product level</label>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-700 font-semibold">Stock status</label>
                                            <select className="w-full p-2 border focus:ring focus:ring-blue-300"
                                                value={formData.inventory.stockStatus}
                                                onChange={(e) => setFormData(prev => ({ ...prev, inventory: { ...prev.inventory, stockStatus: e.target.value } }))}
                                            >
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
                                            {data.specifications.map((spec, index) => (
                                                <div key={index} className="flex justify-between items-center text-gray-700 bg-gray-100 p-2 rounded-sm mt-1">
                                                    <span>{index + 1}. {spec.name}</span>
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
                        {/* tab end */}
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Short Description</label>
                            <textarea
                                className="w-full p-2 border border-gray-300"
                                placeholder="Enter short description"
                                value={formData.shortDescription}
                                onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Meta Title</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300"
                                placeholder="Enter product meta title"
                                value={formData.meta?.metaTitle}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    meta: { ...prev.meta, metaTitle: e.target.value }
                                }))}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Meta Description</label>
                            <textarea
                                className="w-full p-2 border border-gray-300"
                                placeholder="Enter product meta description"
                                value={formData.meta?.metaDescription}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    meta: { ...prev.meta, metaDescription: e.target.value }
                                }))}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Review</label>
                            <textarea
                                className="w-full p-2 border border-gray-300"
                                placeholder="Enter product review"
                                value={formData?.review}
                                onChange={(e) => setFormData(prev => ({ ...prev, review: e.target.value }))}
                            />
                        </div>
                    </section>

                    {/* Right Section (30%) */}
                    <section className="w-1/4 bg-white shadow-lg p-6">
                        <div className="flex justify-center pb-2">
                            <button className="w-[80%] bg-green-600 text-white py-1 hover:bg-green-700" onClick={submit}>
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
                                <label htmlFor="visibility">Visibility: Public</label>
                            </div>
                            {/* radio publish */}
                            <div className="flex items-center mt-4">
                                <input type="checkbox" name="visibility" id="visibility" className="mr-2" />
                                <label htmlFor="visibility">Status: Published</label>
                            </div>
                            {/* published on */}
                            <div className="flex items-center mt-4">
                                <label className="mr-2">Published on: {today} </label>
                                <i className="ri-edit-2-fill"></i>
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
                                {
                                    formData.images.map((image, index) => (
                                        <div key={index} className="relative">
                                            <img src={image.preview} alt="Preview" className="w-full h-24 object-cover rounded" />
                                            <button
                                                className="absolute top-0 right-0 bg-red-500 text-white p-1"
                                                onClick={() => removeImage(index)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="border p-4 mb-4 mx-auto bg-white overflow-hidden shadow-lg">
                            <h3 className="font-bold border-b">Product Categories</h3>
                            <div className="max-h-40 overflow-y-auto mt-2">
                                {categories.map((category, index) => (
                                    <label key={index} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.categories.some(cat => cat.id === category.id)}
                                            onChange={() => handleCategoryChange(category)}
                                        />
                                        <span>{category.name}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="flex items-center pt-2 space-x-2">
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
                                    <i className="ri-add-circle-line"></i>
                                </button>
                            </div>
                        </div>
                        <div className="border p-4 mb-4 mx-auto bg-white overflow-hidden shadow-lg">
                            <h3 className="font-bold border-b pb-2">Product Tags</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {
                                    formData.tags.map((tag, index) => (
                                        <span key={index} className="bg-gray-200 px-2 py-1 rounded">
                                            {tag.name} <button className="bg-red-500 text-white px-1 ml-1 rounded" onClick={() => removeTag(index)}>✕</button>
                                        </span>
                                    ))
                                }
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
                                    <i className="ri-add-circle-line"></i>
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