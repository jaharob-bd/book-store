import React, { useState, useEffect } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';
import EditSideBar from './Partials/EditSideBar';
import { EditImageUpload } from './Partials/EditImageUpload';
import EditPrice from './Partials/EditPrice';
import { EditSetting } from './Partials/EditSetting';
import { CategoriesDropDrown } from './Partials/CategoriesDropDrown';

const COUNTRIES = [
    "Austria",
    "Belgium",
    "Croatia",
    "Bulgaria",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Ireland",
    "Italy",
    "Latvia",
    "Lithuania",
    "Luxembourg",
    "Malta",
    "Netherlands",
    "Poland",
    "Portugal",
    "Romania",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Ukraine",
];
// import EditOthers from './Partials/EditOthers';
// import EditVideo from './Partials/EditVideo';

const Edit = (props) => {
    const [user, setUser] = useState(props.auth.user);
    const [initial, setInitial] = useState(props.product);
    const { data, setData, reset, post } = useForm(initial);

    const createSlug = (name) => {
        return name
            .toLowerCase()  // Convert to lowercase
            .replace(/ /g, '-')  // Replace spaces with hyphens
            .replace(/[^\w-]+/g, '');  // Remove all non-word characters
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...data, [name]: value };
        if (name === 'name' || name === 'url_key') {
            updatedData.url_key = createSlug(value);
        }
        setData(updatedData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        router.patch(`/product-update/${props.product.id}`, data, {
            preserveScroll: true,
            onSuccess: () => { // successfully msg
                setData(data);
            },
            onError: (errors) => { // error msg

            },
        });
    };

    return (
        <AuthenticatedLayout user={user} header={'Product List'}>
            <Head title={`Edit - ` + data.name} />
            <div className="container w-full flex flex-wrap mx-auto px-1 pt-1 lg:pt-1">
                <EditSideBar />
                <section className="w-full lg:w-5/6">
                    <h2 id="general" className="font-sans font-bold break-normal text-gray-700 px-2 pb-3 text-xl">General </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="p-8 mt-6 lg:mt-0 leading-normal rounded shadow bg-gray-100">
                            <div className="md:flex mb-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor="my-textfield">
                                        Name <span className="text-red-600">*</span>
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input
                                        className="form-input block w-full focus:bg-white p-1"
                                        type="text"
                                        name="name"
                                        value={data?.name || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="md:flex mb-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor="my-textfield">
                                        Url Key <span className="text-red-600">*</span>
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="form-input block w-full focus:bg-white p-1"
                                        type="text"
                                        name="url_key"
                                        value={data?.url_key || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="md:flex mb-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor="my-textfield">
                                        SKU <span className="text-red-600">*</span>
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input
                                        className="form-input block w-full focus:bg-white p-1"
                                        type="text"
                                        name="sku"
                                        value={data?.sku || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="md:flex mb-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor="my-textfield">
                                        Product Code <span className="text-red-600">*</span>
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input
                                        className="form-input block w-full focus:bg-white p-1"
                                        name="product_code"
                                        type="text"
                                        value={data?.product_code || ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            {/* multi categories start */}
                            <div className="md:flex mb-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor="my-textfield">
                                        Product Categories <span className="text-red-600">*</span>
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <CategoriesDropDrown
                                        formFieldName={"countries"}
                                        options={props.categories}
                                        onChange={(selectedCountries) => {
                                            console.debug("selectedCategories", selectedCountries);
                                        }}
                                        prompt="Select one or more categories"
                                    />
                                </div>
                            </div>
                           
                            {/* end */}
                        </div>
                        <hr className="bg-gray-300 my-3" />
                        <h2 id="description" className="font-sans font-bold break-normal text-gray-700 px-2 pb-3 text-xl">Description</h2>
                        <div className="p-8 mt-6 lg:mt-0 rounded shadow bg-gray-100">
                            <div className="md:flex mb-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor="my-textarea">
                                        Short Description
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <textarea
                                        className="form-textarea block w-full focus:bg-white"
                                        name="short_description"
                                        value={data?.short_description || ''} rows={4}
                                        onChange={handleChange}
                                    />
                                    <p className="py-2 text-sm text-gray-600">add notes about populating the field</p>
                                </div>
                            </div>
                            <div className="md:flex mb-2">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4" htmlFor="my-textarea">
                                        Description
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <textarea
                                        className="form-textarea block w-full focus:bg-white"
                                        name="description"
                                        value={data?.description || ''} rows={8}
                                        onChange={handleChange}
                                    />
                                    <p className="py-2 text-sm text-gray-600">add notes about populating the field</p>
                                </div>
                            </div>
                            <div className="md:flex md:datas-center">
                                <div className="md:w-1/3" />
                                <div className="md:w-2/3">
                                    <button className="shadow bg-indigo-700 hover:bg-indigo-500 focus:shadow-outline focus:outline-none text-white font-bold py-1 px-4 rounded">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    <EditImageUpload {...props} />
                    <EditPrice {...props} />
                    {/* <EditOthers /> */}
                    {/* <EditVideo /> */}
                    <EditSetting product={props.product} />

                </section>
                <div className="w-full lg:w-5/6 lg:ml-auto text-base md:text-sm text-gray-600 px-4 py-24 mb-12">
                    <span className="text-base text-indigo-600 font-bold">&lt;</span> <a href="#" className="text-base md:text-sm text-indigo-600 font-bold no-underline hover:underline">Back link</a>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Edit