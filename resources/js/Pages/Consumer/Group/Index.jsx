import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { List } from './Partials/List';
import SwalWarning from '@/Components/Alert/SwalWarning';
import { useTranslation } from 'react-i18next';

export default function Index({ auth, customerGroups }) {
    // Initial form values
    const initialValues = {
        name: '',
        code: '',
        notes: '',
        status: '1',
    };

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentGroupId, setCurrentGroupId] = useState(null);
    const { t } = useTranslation();

    const { data, setData, processing, reset, post, put, errors } = useForm(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const closeModal = () => {
        setIsOpenModal(false);
        reset();
        setIsEditMode(false);
        setCurrentGroupId(null);
    };

    const openModal = (group = null) => {
        if (group) {
            setIsEditMode(true);
            setCurrentGroupId(group.id);
            setData({
                name: group.name,
                code: group.code,
                notes: group.notes,
                status: group.status.toString(),
            });
        } else {
            setIsEditMode(false);
            setCurrentGroupId(null);
            setData(initialValues);
        }
        setIsOpenModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allFieldsFilled = Object.values(data).every(field => field.trim() !== '');
        if (allFieldsFilled) {
            if (isEditMode) {
                router.post(`/customer-group-update/${currentGroupId}`, data, {
                    onSuccess: () => {
                        reset();
                        setIsOpenModal(false);
                        setIsEditMode(false);
                        setCurrentGroupId(null);
                    },
                    onError: (errors) => {
                        // Handle errors here
                    },
                });
            } else {
                post(route('customer-group-store'), {
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
            SwalWarning(t('All fields are required.'));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={'Customer Groups'}>
            <Head title="Customer Groups" />
            <List openModal={openModal} customerGroups={customerGroups} />
            <Modal show={isOpenModal} title={isEditMode ? t('Edit Customer Group') : t('Create New Customer Group')} maxWidth='2xl' onClose={closeModal}>
                <div>
                    <form onSubmit={handleSubmit} className="p-2 mx-auto">
                        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                            <div>
                                <label className="dark:text-gray-800" htmlFor="name">{t('Name')} <span className="text-red-600">*</span></label>
                                <input
                                    name="name"
                                    type="text"
                                    className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    value={data.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="dark:text-gray-800" htmlFor="code">{t('Code')}</label>
                                <input
                                    name="code"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                    value={data.code}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="dark:text-gray-800" htmlFor="notes">{t('Notes')}</label>
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
                                {isEditMode ? t('Update Customer Group') : t('Save Customer Group')}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
