import React, { useState, useReducer } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import SwalAlert from '@/Components/Alert/SwalAlert';
import axios from 'axios';

export default function ValueIndex({ auth, attributes }) {
    const initialState = {
        name: '',
        value: '',
        newValue: '',
        values: [],
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'SET_FIELD':
                return { ...state, [action.field]: action.value };
            case 'SET_FIELDS': // New case to handle multiple fields
                return { ...state, ...action.payload };
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
    console.log(state); // Debugging
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
            dispatch({
                type: 'SET_FIELDS',
                payload: {
                    name: attr.name,
                    newValue: '',
                    values: { ...attr.valueArray } // Create a fresh copy
                }
            });
        } else {
            setIsEditMode(false);
            setCurrentAttrId(null);
            dispatch({ type: 'RESET' });
        }
        setIsOpenModal(true);
    };
    
    const handleChange = (e) => {
        dispatch({
            type: 'SET_FIELD',
            field: 'newValue',
            value: e.target.value
        });
    };
    
    const handleKeyPress = (e) => {
        if (e.key === "Enter" && state.newValue.trim() !== "") {
            // Ensure values exist and find the next unique key
            const existingKeys = Object.keys(state.values).map(Number);
            const nextKey = existingKeys.length > 0 ? Math.max(...existingKeys) + 1 : 1;
    
            dispatch({
                type: "SET_FIELDS",
                payload: {
                    values: { 
                        ...state.values, 
                        [nextKey]: state.newValue.trim() // Ensure unique numeric index
                    },
                    newValue: "" // Reset input field
                },
            });
        }
    };
    
    const removeAttribute = (id) => {
        dispatch({
            type: "SET_FIELD",
            field: "values",
            value: Object.fromEntries(
                Object.entries(state.values).filter(([key]) => Number(key) !== id)
            )
        });
    };

    // Handle the attribute value submission
    const handleAttributeValueSubmit = async (e) => {
        e.preventDefault();

        if (!state.value.trim()) {
            SwalAlert('warning', 'Attribute value is required.');
            return;
        }

        try {
            const response = await axios.post('/attribute-value-store', {
                attribute_id: currentAttrId,
                value: state.value,
            });

            if (response.data.status) {
                SwalAlert('success', 'Attribute value added!');
                setAttrList((prevList) => {
                    return prevList.map((attr) =>
                        attr.id === currentAttrId
                            ? { ...attr, values: [...attr.values, response.data.attribute_value] }
                            : attr
                    );
                });
                dispatch({ type: 'SET_FIELD', field: 'value', value: '' });
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
                    <button
                        type="button"
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2"
                        onClick={() => openModal()}
                    >
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
                                <th className="p-2 text-center">Values</th>
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
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-left">
                                        {attr.values}
                                    </td>
                                    <td className="p-2 border-l border-r border-b border-indigo-500 text-center">
                                        <button
                                            onClick={() => openModal(attr)}
                                            className="bg-green-500 p-1 rounded-sm text-white ml-2 hover:underline"
                                        >
                                            Add Value
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for adding attribute values */}
            <Modal show={isOpenModal} title="Add Attribute Value" onClose={closeModal}>
                <form onSubmit={handleAttributeValueSubmit} className="p-4">
                    <div className="flex flex-wrap gap-2 pb-4">
                        {
                            Object.entries(state.values).map(([id, value]) => (
                                <span
                                    key={id}
                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded flex items-center"
                                >
                                    {value}
                                    <button
                                        onClick={() => removeAttribute(Number(id))}
                                        className="ml-2 bg-red-500 text-white rounded-full px-2 hover:bg-red-700 transition"
                                    >
                                        ✕
                                    </button>
                                </span>
                            ))
                        }
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700">Attribute Value <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            name="newValue"
                            value={state.newValue}
                            onChange={handleChange}
                            onKeyDown={handleKeyPress}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            Add Value
                        </button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
