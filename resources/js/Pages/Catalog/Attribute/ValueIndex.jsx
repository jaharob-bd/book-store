import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import SwalAlert from '@/Components/Alert/SwalAlert';
import axios from 'axios';
import React, { useState, useReducer, useCallback, useEffect } from "react";
import { useRef } from "react";

export default function ValueIndex({ auth, attributes }) {
    const initialState = {
        attributeId: "",
        name: "",
        newValue: "",
        oldValues: [],
        newValues: [],
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case "SET_FIELD":
                return { ...state, [action.field]: action.value };
            case "SET_FIELDS":
                return { ...state, ...action.payload };
            case "RESET":
                return initialState;
            default:
                return state;
        }
    };

    const inputRef = useRef(null); // Step 1: Create ref
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [currentAttrId, setCurrentAttrId] = useState(null);
    const [attrList, setAttrList] = useState(attributes);

    const closeModal = () => {
        setIsOpenModal(false);
        dispatch({ type: "RESET" });
        setCurrentAttrId(null);
    };

    const openModal = (attr = null) => {
        if (attr) {
            setCurrentAttrId(attr.attribute_id);
            dispatch({
                type: "SET_FIELDS",
                payload: {
                    attributeId: attr.attribute_id,
                    name: attr.name,
                    newValue: "",
                    oldValues: attr.valueArray,
                    newValues: [],
                },
            });
        } else {
            setCurrentAttrId(null);
            dispatch({ type: "RESET" });
        }
        setIsOpenModal(true);
    };

    const handleChange = (e) => {
        dispatch({
            type: "SET_FIELD",
            field: "newValue",
            value: e.target.value,
        });
    };

    const handleAddAttribute = (e) => {
        e.preventDefault();
        const newValue = state.newValue.trim();
        if (!newValue) {
            SwalAlert('warning', 'Attribute value is required.');
            return;
        }

        // Proper duplicate check in both newValues and oldValues
        if (
            state.newValues.some(item => item.value.toLowerCase() === newValue.toLowerCase()) ||
            state.oldValues.some(item => item.value.toLowerCase() === newValue.toLowerCase())
        ) {
            SwalAlert('warning', 'Attribute value already exists.');
            return;
        }

        // Collect all existing ids from oldValues and newValues
        const existingKeys = new Set([
            ...state.oldValues.map(item => item.id),
            ...state.newValues.map(item => item.id),
        ]);

        // Find the smallest available unique id
        let nextKey = 1;
        while (existingKeys.has(nextKey)) {
            nextKey++;
        }

        dispatch({
            type: "SET_FIELDS",
            payload: {
                newValues: [...state.newValues, {
                    id: nextKey,
                    value: newValue,
                }],
                newValue: "",
            },
        });
        setTimeout(() => {
            inputRef.current?.focus(); // Step 3: Refocus input
        }, 10);
    };

    const removeAttribute = (id, type) => {
        if (type === 'new') {
            dispatch({
                type: "SET_FIELDS",
                payload: {
                    newValues: state.newValues.filter(
                        (item) => item.id !== id
                    ),
                },
            });
        } else {
            dispatch({
                type: "SET_FIELDS",
                payload: {
                    oldValues: state.oldValues.filter(
                        (item) => item.id !== id
                    ),
                },
            });
        }
    };

    // Handle the attribute value submission
    const handleAttributeValueSubmit = async (e) => {
        e.preventDefault();

        if (state.newValues.length === 0) {
            SwalAlert('warning', 'Please add attribute value.');
            return;
        }

        try {
            const url = '/attribute-values-store';
            const method = axios.post;
            const response = await method(url, state);
            if (response.data.status === true) {
                setAttrList((prevList) => {
                    const updatedList = prevList.map((attr) => {
                        return attr.attribute_id === currentAttrId
                            ? {
                                ...attr,
                                values: response.data.values, // Handle empty values case
                                valueArray: response.data.valueArray, // Ensure valueArray exists
                            }
                            : attr;
                    });

                    return updatedList;
                });

                SwalAlert('success', 'Attribute value added!');
                closeModal(); // Optionally close modal after successful addition
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
                <form className="">
                    <span className="w-full p-1 bg-green-600 text-white border border-green-300 rounded flex justify-center gap-2 pb-2 font-bold">{state.name}</span>


                    {
                        state.oldValues.length > 0 &&
                        <div className="mb-3 pt-6">
                            <label className="block text-gray-700">
                                Old Attribute Values <span className="text-red-600 items-justify-end semi-bold">(x for remove)</span>
                            </label>
                            <div className="w-full p-2 border border-red-300 rounded flex flex-wrap gap-2 pb-2">
                                {
                                    state.oldValues?.map((attr, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded flex items-center"
                                        >
                                            {attr.value}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeAttribute(attr.id, 'old')
                                                }}
                                                className="ml-2 bg-red-500 text-white rounded-full px-2 hover:bg-red-700 transition"
                                            >
                                                ✕
                                            </button>
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                    }

                    <div className="mb-3">
                        <label className="block text-gray-700">New Attribute Values</label>
                        <div className="w-full h-13 p-2 border border-red-300 rounded flex flex-wrap gap-2 pb-2">
                            {
                                state.newValues.length > 0 ?
                                    state.newValues?.map((attr, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-700 px-3 py-1 rounded flex items-center"
                                        >
                                            {attr.value}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent bubbling
                                                    removeAttribute(attr.id, 'new');
                                                }}
                                                className="ml-2 bg-red-500 text-white rounded-full px-2 hover:bg-red-700 transition"
                                            >
                                                ✕
                                            </button>
                                        </span>
                                    ))
                                    : <span className="text-red-600 flex justify-center gap-2 font-bold uppercase">Not add new values</span>
                            }
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 mr-2">
                            Attribute Value <span className="text-red-500">*</span>
                        </label>
                        <div className=" flex items-center">
                            <input
                                ref={inputRef} // Step 2: Assign ref to input
                                type="text"
                                name="newValue"
                                value={state.newValue}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded mr-2" // Added margin-right
                            />
                            <button onClick={handleAddAttribute} className="bg-gray-900 text-white p-2 rounded">+</button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            onClick={handleAttributeValueSubmit}
                            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            Save Value
                        </button>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
