import React, { useState } from 'react';
import SwalWarning from '@/Components/Alert/SwalWarning';
import { formatDate } from '@/Utils/helper';

export const EditSetting = ({ product }) => {
    const [newProduct, setNewProduct] = useState(product.new_product === 1);
    const [featured, setFeatured] = useState(product.featured === 1);
    const [visibility, setVisibility] = useState(product.visible_individually === 1);
    const [activeStatus, setActiveStatus] = useState(product.status === 1);
    const [manageStock, setManageStock] = useState(product.manage_stock === 1);
    const [published, setPublished] = useState(formatDate(product.released_on));
    const [data, setData] = useState({});

    const handleCheckboxChange = (event) => {
        const { name, checked, value } = event.target;
        if (name === 'active_status') {
            setActiveStatus(checked);
        } else if (name === 'featured') {
            setFeatured(checked);
        } else if (name === 'visible_individually') {
            setVisibility(checked);
        } else if (name === 'new_product') {
            setNewProduct(checked);
        } else if (name === 'manage_stock') {
            setManageStock(checked);
        } else if (name === 'released_on') {
            const inputDate = new Date(value).getTime(); // Convert input date to timestamp
            const todayDate = new Date().setHours(0, 0, 0, 0); // Get today's date and reset the time to midnight

            if (inputDate < todayDate) {
                SwalWarning('Release date cannot be less than today.');
                return false;
            }

            setPublished(value); // No need to format again, `value` is already in YYYY-MM-DD format
        }
        let updateData = { [name]: checked ? checked : value }
        setData(updateData);
    };

    return (
        <div>
            <hr className="bg-gray-300 my-3" />
            <h2 id="settings" className="font-sans font-bold break-normal text-gray-700 px-2 pb-3 text-xl">Settings</h2>
            <div className="p-8 mt-6 lg:mt-0 rounded shadow bg-gray-100">
                <h3 className="px-2 pb-3 font-bold">General Setting: </h3>
                <label className="inline-flex items-center mb-5 cursor-pointer px-2">
                    <input
                        type="checkbox"
                        name="new_product"
                        className="sr-only peer"
                        checked={newProduct}
                        onChange={handleCheckboxChange}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">New</span>
                </label>
                <label className="inline-flex items-center mb-5 cursor-pointer px-2">
                    <input
                        type="checkbox"
                        name="featured"
                        className="sr-only peer"
                        checked={featured}
                        onChange={handleCheckboxChange}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Featured</span>
                </label>
                <label className="inline-flex items-center mb-5 cursor-pointer px-2">
                    <input
                        type="checkbox"
                        name="visible_individually"
                        className="sr-only peer"
                        checked={visibility}
                        onChange={handleCheckboxChange}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Visible Individually</span>
                </label>
                <label className="inline-flex items-center mb-5 cursor-pointer px-2">
                    <input
                        type="checkbox"
                        name="active_status"
                        className="sr-only peer"
                        checked={activeStatus}
                        onChange={handleCheckboxChange}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Active Status</span>
                </label>
                <h3 className="px-2 pb-3 font-bold">Inventories: </h3>
                <label className="inline-flex items-center mb-5 cursor-pointer px-2">
                    <input
                        type="checkbox"
                        name="manage_stock"
                        className="sr-only peer"
                        checked={manageStock}
                        onChange={handleCheckboxChange}
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Manage Stock</span>
                </label>
                <h3 className="px-2 pb-3 font-bold">Published on: </h3>
                <div className="flex items-center px-2">
                    <input
                        className="form-input block focus:bg-white p-1"
                        type="date"
                        value={published || ''} // here 2024-05-28 20:29:50 but not show 
                        name="released_on"
                        onChange={handleCheckboxChange}
                    />
                    <button className="ml-2 bg-blue-500 text-white px-2 py-1 p-1 rounded hover:bg-blue-700">
                        <i className="ri-add-line" />
                    </button>
                </div>
            </div>
        </div>
    );
};
