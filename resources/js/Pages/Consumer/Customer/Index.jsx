import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import SwalWarning from '@/Components/Alert/SwalWarning';
import { useTranslation } from 'react-i18next';
import { List } from './Partials/List';

export default function Index({ auth, customers }) {
    // console.log(customers);
    // Initial form values
    const initialValues = {
        name: '',
        email: '',
        phone: '',
        gender: '',
        dob: '',
        status: '1',
    };

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentCustomerId, setCurrentCustomerId] = useState(null);
    const { t } = useTranslation();

    const { data, setData, reset, post } = useForm(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const closeModal = () => {
        setIsOpenModal(false);
        reset();
        setIsEditMode(false);
        setCurrentCustomerId(null);
    };

    const openModal = (customer = null) => {
        if (customer) {
            setIsEditMode(true);
            setCurrentCustomerId(customer.id);
            setData({
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                gender: customer.gender,
                dob: customer.dob,
                status: customer.status.toString(),
            });
        } else {
            setIsEditMode(false);
            setCurrentCustomerId(null);
            setData(initialValues);
        }
        setIsOpenModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allFieldsFilled = Object.values(data).every((field) => field.trim() !== '');
        if (allFieldsFilled) {
            if (isEditMode) {
                router.post(`/customer-update/${currentCustomerId}`, data, {
                    onSuccess: () => {
                        reset();
                        setIsOpenModal(false);
                        setIsEditMode(false);
                        setCurrentCustomerId(null);
                    },
                    onError: (errors) => {
                        // Handle errors here
                    },
                });
            } else {
                post(route('customer-store'), {
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
        <AuthenticatedLayout user={auth.user} header={'Customer List'}>
            <Head title="Customer" />
            <List openModal={openModal} customers={customers} />
            <Modal show={isOpenModal} title={isEditMode ? 'Edit Customer' : 'Create New Customer'} maxWidth='2xl' onClose={closeModal}>
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
                                <label className="dark:text-gray-800" htmlFor="email">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="dark:text-gray-800" htmlFor="phone">Phone <span className="text-red-600">*</span></label>
                                <input
                                    name="phone"
                                    type="tel"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    value={data.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="dark:text-gray-800" htmlFor="gender">Gender</label>
                                <input
                                    name="gender"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    value={data.gender}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="dark:text-gray-800" htmlFor="dob">Date of Birth</label>
                                <input
                                    name="dob"
                                    type="date"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    value={data.dob}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button className="px-6 py-2 leading-5 transition-colors duration-200 transform bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br">
                                {isEditMode ? 'Update Customer' : 'Save Customer'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
