import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import SwalAlert from '@/Components/Alert/SwalAlert';
import axios from 'axios';
import React, { useState, useReducer, useCallback } from "react";

export default function ValueIndex({ auth, attributes }) {
    const initialState = {
        name: "",
        newValue: "",
        oldValue: [],
        newValueArray: [],
        // oldValueArray: [],
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

    const [state, dispatch] = useReducer(reducer, initialState);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [currentAttrId, setCurrentAttrId] = useState(null);
    const [attrList, setAttrList] = useState(attributes);

    console.log(state); // Debugging

    const closeModal = () => {
        setIsOpenModal(false);
        dispatch({ type: "RESET" });
        setCurrentAttrId(null);
    };

    const openModal = (attr = null) => {
        // console.log(attr); // Debugging
        if (attr) {
            setCurrentAttrId(attr.id);
            dispatch({
                type: "SET_FIELDS",
                payload: {
                    name: attr.name,
                    newValue: "",
                    oldValue: attr.valueArray,
                    newValueArray: [],
                    // oldValueArray: attr.valueArray,
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
    const handleKeyPress = useCallback(
        (e) => {
            if (e.type === "click" || (e.key === "Enter" && state.newValue.trim() !== "")) {
                const newValue = state.newValue.trim();

                // Collect all existing attribute_ids from oldValue and newValueArray
                const existingKeys = new Set([
                    ...state.oldValue.map(item => item.attribute_id),
                    ...state.newValueArray.map(item => item.attribute_id),
                ]);

                // Find the smallest available unique attribute_id
                let nextKey = 1;
                while (existingKeys.has(nextKey)) {
                    nextKey++;
                }

                console.log("Updating state with:", newValue, "nextKey", nextKey);

                dispatch({
                    type: "SET_FIELDS",
                    payload: {
                        newValueArray: [
                            ...state.newValueArray,
                            { attribute_id: nextKey, value: newValue },
                        ],
                        newValue: "",
                    },
                });
            }
        },
        [state.newValue, state.newValueArray, state.oldValue]
    );

    const removeAttribute = (e, id, type) => {
        e.stopPropagation(); // Prevents unintended event bubbling
        console.log(e, type, id, "removeAttribute");

        if (type === 'new') {
            dispatch({
                type: "SET_FIELDS",
                payload: {
                    newValueArray: state.newValueArray.filter(
                        (item) => item.attribute_id !== id
                    ),
                },
            });
        } else {
            // dispatch({
            //     type: "SET_FIELDS",
            //     payload: {
            //         oldValue: state.oldValue.filter(
            //             (item) => item.attribute_id !== id
            //         ),
            //     },
            // });
        }
    };


    // Handle the attribute value submission
    const handleAttributeValueSubmit = async (e) => {
        e.preventDefault();

        // if (!state.value.trim()) {
        //     SwalAlert('warning', 'Attribute value is required.');
        //     return;
        // }
        return false;

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
                <form onSubmit={handleAttributeValueSubmit} className="">
                    <span className="w-full p-1 bg-green-600 text-white border border-green-300 rounded flex justify-center gap-2 pb-2 font-bold">{state.name}</span>
                    <div className="mb-3 pt-6">
                        <label className="block text-gray-700">
                            Old Attribute Values <span className="text-red-600 items-justify-end semi-bold">(x for remove)</span>
                        </label>
                        <div className="w-full p-2 border border-red-300 rounded flex flex-wrap gap-2 pb-2">
                            {
                                Array.isArray(state.oldValue) &&
                                state.oldValue?.map((attr, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded flex items-center"
                                    >
                                        {attr.value}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent bubbling
                                                removeAttribute(e, attr.attribute_id, 'old')
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
                    <div className="mb-3">
                        <label className="block text-gray-700">New Attribute Values</label>
                        <div className="w-full p-2 border border-red-300 rounded flex flex-wrap gap-2 pb-2">
                            {
                                Array.isArray(state.newValueArray) &&
                                state.newValueArray?.map((attr, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded flex items-center"
                                    >
                                        {attr.value}
                                        <button
                                            // onClick={() => removeAttribute(Number(attr.attribute_id))}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent bubbling
                                                removeAttribute(e, attr.attribute_id, 'new');
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
                    <div className="mb-3">
                        <label className="block text-gray-700 mr-2">
                            Attribute Value <span className="text-red-500">*</span>
                        </label>
                        <div className=" flex items-center">
                            <input
                                type="text"
                                name="newValue"
                                value={state.newValue}
                                onChange={handleChange}
                                onKeyDown={handleKeyPress}
                                className="w-full p-2 border border-gray-300 rounded mr-2" // Added margin-right
                            />
                            <button onClick={handleKeyPress} className="bg-gray-900 text-white p-2 rounded">+</button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
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
