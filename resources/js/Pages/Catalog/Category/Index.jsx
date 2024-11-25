import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import { useTranslation } from "react-i18next";
import Modal from '@/Components/Modal';
import { List } from './Partials/List';
import SwalWarning from '@/Components/Alert/SwalWarning';

export default function Index({ auth, categories }) {
    const initialValues = {
        name: '',
        cat_code: '',
        notes: '',
        status: '1',
    };

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentCategoryId, setCurrentCategoryId] = useState(null);
    const [item, setItem] = useState(categories);
    const { data, setData, processing, reset, post, put, errors } = useForm(initialValues);
    const { t } = useTranslation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const closeModal = () => {
        setIsOpenModal(false);
        reset();
        setIsEditMode(false);
        setCurrentCategoryId(null);
    };

    const openModal = (category = null) => {
        if (category) {
            setIsEditMode(true);
            setCurrentCategoryId(category.id);
            setData({
                name: category.name,
                cat_code: category.cat_code,
                notes: category.notes,
                status: category.status.toString(),
            });
        } else {
            setIsEditMode(false);
            setCurrentCategoryId(null);
            setData(initialValues);
        }
        setIsOpenModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allFieldsFilled = Object.values(data).every(field => field.trim() !== '');
        if (allFieldsFilled) {
            if (isEditMode) {
                router.post(`/category-update/${currentCategoryId}`, data, {
                    preserveScroll: true,
                    onSuccess: () => {
                        reset();
                        setIsOpenModal(false);
                        setIsEditMode(false);
                        setCurrentCategoryId(null);
                    },
                    onError: (errors) => {
                        // Handle errors here
                    },
                });
            } else {
                post(route('category-store'), {
                    preserveScroll: true,
                    onSuccess: () => {
                        reset();
                        setIsOpenModal(false);
                    },
                    onError: (errors) => {
                        // Handle errors here
                    },
                });
            }
        } else {
            SwalWarning('All fields are required.');
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={'Category List'}>
            <Head title="Category" />
            <List openModal={openModal} categories={categories} />
            <Modal show={isOpenModal} title={isEditMode ? 'Edit Category' : 'Create New Category'} maxWidth='2xl' onClose={closeModal}>
                <div>
                    <form onSubmit={handleSubmit} className="p-2 mx-auto">
                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                            <div>
                                <label className="dark:text-gray-800" htmlFor="name">Name <span className="text-red-600">*</span></label>
                                <input
                                    name="name"
                                    type="text"
                                    className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    value={data.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="dark:text-gray-800" htmlFor="cat_code">Category Code</label>
                                <input
                                    name="cat_code"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    value={data.cat_code}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="dark:text-gray-800" htmlFor="notes">Notes</label>
                                <textarea
                                    name="notes"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    value={data.notes}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>
                        <div className="flex justify-end mt-6">
                            <button className="px-6 py-2 leading-5 transition-colors duration-200 transform bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br">
                                {isEditMode ? 'Update Category' : 'Save Category'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
