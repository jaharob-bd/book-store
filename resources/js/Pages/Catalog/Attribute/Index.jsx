import React, { useState, useReducer } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { SwalAlert }  from '@/Components/Alert/SwalAlert';
import axios from 'axios';

export default function Index({ auth, attributes }) {
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
    const [currentAttrId, setCurrentAttrId] = useState(null);
    const [attrList, setAttrList] = useState(attributes);

    const closeModal = () => {
        setIsOpenModal(false);
        dispatch({ type: 'RESET' });
        setIsEditMode(false);
        setCurrentAttrId(null);
    };

    const openModal = (attr = null) => {
        if (attr) {
            setIsEditMode(true);
            setCurrentAttrId(attr.id);
            dispatch({ type: 'SET_FIELD', field: 'name', value: attr.name });
        } else {
            setIsEditMode(false);
            setCurrentAttrId(null);
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
            SwalAlert('warning', 'Attribute name is required.');
            return;
        }

        try {
            const url = isEditMode ? `/attribute-update/${currentAttrId}` : '/attribute-store';
            const method = isEditMode ? axios.post : axios.post;

            const response = await method(url, { name: state.name });

            if (response.data.status) {
                SwalAlert('success', isEditMode ? 'Attribute updated!' : 'Attribute added!');
                setAttrList([...attrList, response.data.attribute]);
                closeModal();
            } else {
                SwalAlert('warning', response.data.message || 'Something went wrong!');
            }
        } catch (error) {
            SwalAlert('warning', 'Server error! Please try again.');
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={'Attribute List'}>
            <Head title="Attributes" />
            <div className="flex gap-2 justify-between items-center max-sm:flex-wrap">
                <p className="text-xl text-gray-800 dark:text-white font-bold">Attributes</p>
                <div className="flex gap-x-2.5 items-center">
                    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2" onClick={() => openModal()}>
                        Create Attribute
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
                                <th className="p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attrList.map((attr) => (
                                <tr key={attr.id} className="border-b bg-white hover:bg-gray-50">
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center w-20">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-left">{attr.name}</td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                        <button
                                            onClick={() => openModal(attr)}
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

            <Modal show={isOpenModal} title={isEditMode ? 'Edit Attribute' : 'Create New Attribute'} onClose={closeModal}>
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="mb-3">
                        <label className="block text-gray-700">Attribute Name <span className="text-red-500">*</span></label>
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
