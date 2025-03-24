import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { SwalAlert }  from '@/Components/Alert/SwalAlert';
import axios from 'axios';
import ProductAttribute from '../Components/ProductAttribute';
import ProductTag from '../Components/ProductTag';
import ProductSpecification from '../Components/ProductSpecification';
import ProductInventory from '../Components/ProductInventory';
import ProductGeneral from '../Components/ProductGeneral';
import ProductImage from '../Components/ProductImage';
import ProductCategory from '../Components/ProductCategory';
import ProductPublished from '../Components/ProductPublished';
import ProductSubmition from '../Components/ProductSubmition';
import ProductInput from '../Components/ProductInput';

const Edit = (props) => {
    // console.log(props.response);
    const [activeTab, setActiveTab] = useState("general");
    const user = props.auth.user; // user
    const today = new Date().toISOString().slice(0, 10);
    const [categories, setCategories] = useState(props.categories);
    const [tags, setTags] = useState(props.tags);
    const [specifications, setSpecifications] = useState(props.specifications);

    const product = props.product;
    const initial = {
        productId: product.productId,
        name: product.name || '',
        description: product.description,
        shortDescription: product.shortDescription,
        status: product.status || 1,
        newProduct: product.newProduct,
        featured: product.featured,
        meta: {
            metaTitle: product.metaTitle || '',
            metaDescription: product.metaDescription || '',
            metaKeywords: product.metaKeywords || '',
        },
        general: {
            productUrl: props.productQ.productUrl,
            productType: props.productQ.productType,
            regularPrice: props.productQ.regularPrice,
            salePrice: props.productQ.salePrice,
            mrpPrice: props.productQ.mrpPrice,
            taxStatus: product.taxStatus,
            taxClass: product.taxClass,
            taxIncluded: product.taxIncluded || 0,
            expiryDate: product.expiryDate ?? '',
        },
        inventory: {
            sku: product.sku,
            stockQuantity: product.stockQuantity || 0,
            manageStock: product.manageStock || 0,
            stockStatus: product.stockStatus || 0,
        },
        publish: {
            visibleIndividually: product.visibleIndividually || 0,
            publishedStatus    : product.publishedStatus,
            publishedAt        : product.publishedAt || today,
        },
        categories    : product.categories,
        tags          : product.tags,
        images        : product.images,
        imageIds     : [],
        specifications: [],
        attributes    : [],
        variants      : []
    };
    const [formData, setFormData] = useState(props.product);
    // console.log(formData);
    // categories function

    const createSlug = (name) => {
        return name
            .toLowerCase()  // Convert to lowercase
            .replace(/ /g, '-')  // Replace spaces with hyphens
            .replace(/[^\w-]+/g, '');  // Remove all non-word characters
    }

    // submit use axios
    const submit = async () => {
        const formDataToSend = new FormData();
        console.log(formData);

        Object.keys(formData).forEach((key) => {
            const value = formData[key];
            if (key === "images" && Array.isArray(value)) {
                value.forEach((item) => {
                    if (item instanceof File) {
                        // ফাইল থাকলে `images[]` হিসেবে পাঠানো হবে
                        formDataToSend.append("images[]", item);
                    } else if (typeof item === "object" && item !== null && item.id) {
                        // ID থাকলে `image_ids[]` হিসেবে পাঠানো হবে
                        formDataToSend.append("imageIds[]", item.id);
                    }
                });
            } else if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (typeof item === "object" && item !== null) {
                        Object.keys(item).forEach((subKey) => {
                            formDataToSend.append(`${key}[${index}][${subKey}]`, item[subKey]);
                        });
                    } else {
                        formDataToSend.append(`${key}[]`, item);
                    }
                });
            } else if (typeof value === "object" && value !== null) {
                Object.keys(value).forEach((subKey) => {
                    formDataToSend.append(`${key}[${subKey}]`, value[subKey]);
                });
            } else {
                formDataToSend.append(key, value);
            }
        });
        console.log(formDataToSend);
      
        // -- end of formDataToSend
        try {
            const response = await axios.post('/product-update', formDataToSend, {
                withCredentials: true
            });
            console.log('Success:', response.data);
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
                                {
                                    activeTab === "general" &&
                                    <ProductGeneral {...{ formData, setFormData }} />
                                }
                                {
                                    activeTab === "inventory" &&
                                    <ProductInventory {...{ formData, setFormData }} />
                                }
                                {
                                    activeTab === "linked-products" &&
                                    <div><h3 className="text-xl font-semibold">Linked Products</h3><p className="text-gray-700">Configure upsells, cross-sells, and grouping here.</p></div>}
                                {
                                    activeTab === "attributes" &&
                                    <ProductAttribute {...{ formData, setFormData }} />
                                }
                                {
                                    activeTab === "specification" &&
                                    <ProductSpecification {...{ specifications, formData, setFormData }} />
                                }
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
                        <ProductSubmition {...{ submit }} />
                        <ProductPublished {...{ formData, setFormData, today }} />
                        <ProductImage {...{ formData, setFormData }} />
                        <ProductCategory {...{ categories, setCategories, formData, setFormData }} />
                        <ProductTag {...{ tags, formData, setFormData }} />
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;