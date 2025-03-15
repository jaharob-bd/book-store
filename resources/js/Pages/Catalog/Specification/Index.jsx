import React, { useState, useReducer } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import SwalAlert from '@/Components/Alert/SwalAlert';
import axios from 'axios';

export default function Index({ auth, specifications }) {
    const initialState = {
        name: '',
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_FIELD':
                return { ...state, [action.field]: action.value };
            case 'RESET':
                return initialState;
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentSpecId, setCurrentSpecId] = useState(null);
    const [specList, setSpecList] = useState(specifications);

    const closeModal = () => {
        setIsOpenModal(false);
        dispatch({ type: 'RESET' });
        setIsEditMode(false);
        setCurrentSpecId(null);
    };

    const openModal = (spec = null) => {
        if (spec) {
            setIsEditMode(true);
            setCurrentSpecId(spec.id);
            dispatch({ type: 'SET_FIELD', field: 'name', value: spec.name });
        } else {
            setIsEditMode(false);
            setCurrentSpecId(null);
            dispatch({ type: 'RESET' });
        }
        setIsOpenModal(true);
    };

    const handleChange = (e) => {
        dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!state.name.trim()) {
            SwalAlert('warning', 'Specification name is required.');
            return;
        }

        try {
            const url = isEditMode ? `/specification-update/${currentSpecId}` : '/specification-store';
            const method = isEditMode ? axios.post : axios.post; // Using POST as per your routes

            const response = await method(url, { name: state.name });

            if (response.data.status) {
                SwalAlert('success', isEditMode ? 'Specification updated!' : 'Specification added!');
                setSpecList([...specList, response.data.specification]);
                closeModal();
            } else {
                SwalAlert('warning', response.data.message || 'Something went wrong!');
            }
        } catch (error) {
            SwalAlert('warning', 'Server error! Please try again.');
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={'Specification List'}>
            <Head title="Specifications" />
            <div className="flex gap-2 justify-between items-center max-sm:flex-wrap">
                <p className="text-xl text-gray-800 dark:text-white font-bold">Specifications</p>
                <div className="flex gap-x-2.5 items-center">
                    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2" onClick={() => openModal()}>
                        Create Specification
                    </button>
                </div>
            </div>

            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow-md overflow-hidden">
                    <table className="w-full border-collapse bg-gray-100 rounded-md">
                        <thead className="bg-gray-200">
                            <tr className="bg-indigo-500 h-6 border border-indigo-500 text-white">
                                <th className="p-2 text-center">
                                    <input type="checkbox" />
                                </th>
                                <th className="p-2 px-3 text-left">Name</th>
                                <th className="p-2 text-center">Status</th>
                                <th className="p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {specList.map((spec) => (
                                <tr key={spec.id} className="border-b bg-white hover:bg-gray-50">
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center w-20">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-left">{spec.name}</td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                        {spec.status === 1 ? (
                                            <span className="text-green-600">Active</span>
                                        ) : (
                                            <span className="text-red-600">Inactive</span>
                                        )}
                                    </td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                        <button
                                            onClick={() => openModal(spec)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal show={isOpenModal} title={isEditMode ? 'Edit Specification' : 'Create New Specification'} onClose={closeModal}>
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-3">
                        <label className="block text-gray-700">Specification Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="name"
                            value={state.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            {isEditMode ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
