import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { List } from './List';
import Swal from 'sweetalert2';

export default function Index({ auth, products }) {
    // initial value for set form
    const initialValues = { name: '', url_key: '', sku: '', product_code: '' }
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [item, setItem] = useState(products);
    const { data, setData, processing, reset, post, errors } = useForm(initialValues);
    // console.log(errors);
    const { t } = useTranslation();

    // Function to create slug from title
    const createSlug = (name) => {
        return name
            .toLowerCase()  // Convert to lowercase
            .replace(/ /g, '-')  // Replace spaces with hyphens
            .replace(/[^\w-]+/g, '');  // Remove all non-word characters
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data, [name]: value };

        if (name === 'name' || name === 'url_key') {
            updatedData.url_key = createSlug(value);
        }
        setData(updatedData);
        // console.log("url_key", updatedData.url_key);
    };

    const closeModal = () => {
        setIsOpenModal(false);
        reset();
    };
    const openModal = () => {
        setIsOpenModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allFieldsFilled = Object.values(data).every(field => field.trim() !== '');
        if (allFieldsFilled) {
            post(route('product-store'), {
                preserveScroll: true,
                onSuccess: () => { // successfully msg
                    reset();
                    setIsOpenModal(false);
                    setData(initialValues);
                },
                onError: (errors) => { // error msg

                },
            });
        } else {
            Swal.fire({
                text: 'Required all fields.',
                icon: 'warning',
                timer: 2000, // 5000 milliseconds (5 seconds)
                timerProgressBar: true, // Display a progress bar indicating the time remaining
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={'Product List'}>
            <Head title="Product" />
            <List openModal={openModal} products={products} />
            <Modal show={isOpenModal} title='Create New Product' maxWidth='2xl' onClose={closeModal}>
                <div>
                    <form onSubmit={handleSubmit} className="p-2 mx-auto dark:bg-gray-800">
                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                            <div>
                                <label className="dark:text-gray-200" htmlFor="name">Name <span className="text-red-600">*</span></label>
                                <input
                                    name="name"
                                    type="text"
                                    className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    value={data.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="dark:text-gray-200" htmlFor="url_key">URL Key <span className="text-red-600">* {data.url_key}</span></label>
                                <input
                                    name="url_key"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    value={data.url_key}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="dark:text-gray-200" htmlFor="sku">SKU <span className="text-red-600">*</span></label>
                                <input
                                    name="sku"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    value={data.sku}
                                    onChange={handleChange} />
                            </div>
                            <div>
                                <label className="dark:text-gray-200" htmlFor="product_code">Product Code <span className="text-red-600">*</span></label>
                                <input
                                    name="product_code"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    value={data.product_code}
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button className="px-6 py-2 leading-5 transition-colors duration-200 transform  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br">
                                Save Product
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
