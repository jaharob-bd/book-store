import { router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

export const EditImageUpload = (props) => {
    const [baseUrl, setBaseUrl] = useState(props.url.base_url);
    const [productId, setProductId] = useState(props.product.id);
    const { data, setData, post, processing, errors } = useForm({
        images: []
    });

    const handleFileChange = (event) => {
        setData('images', Array.from(event.target.files));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        data.images.forEach(file => {
            formData.append('images[]', file);
        });

        try {
            router.post(`/product-image-upload/${productId}`, formData, {
                preserveScroll: true,
                onSuccess: () => {
                    // Handle success response
                    console.log('Images uploaded successfully');
                },
                onError: (errors) => {
                    // Handle error response
                    console.error('Error uploading images:', errors);
                },
            });
        } catch (error) {
            console.error('Error uploading images:', error);
        }
    };

    return (
        <div>
            <hr className="bg-gray-300 my-3" />
            <h2 id="image" className="font-sans font-bold break-normal text-gray-700 px-2 pb-3 text-xl">Image</h2>
            <div className="p-8 mt-6 lg:mt-0 rounded shadow bg-gray-100">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 mb-2">
                        {/* Upload section */}
                        <div className="mt-1 flex justify-center px-1 pt-1 pb-1 border-2 border-black border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-black" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <div className="flex text-sm text-black">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                        <span>Upload a file</span>
                                        <input id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                            multiple
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                    <p className="pl-1 text-black">or drag and drop</p>
                                </div>
                                <p className="text-xs text-black">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                            </div>
                        </div>
                        {/* Preview section */}
                        {props.product.images.map((image, index) => (
                            <div key={index} className="mt-1 flex justify-center px-1 pt-1 pb-2 border-2 border-black border-dashed rounded-md">
                                <img
                                    src={baseUrl + '/' + image.img_src}
                                    alt={image.img_alt || `preview-${index}`}
                                    className="h-24 w-24 object-cover" />
                            </div>
                        ))}
                        {/* Additional divs if there are fewer than 4 images */}
                        {Array.from({ length: 3 - props.product.images.length }).map((_, index) => (
                            <div key={'index'} className="mt-1 flex justify-center px-14 pt-5 pb-6 border-2 border-black border-dashed rounded-md">
                                <svg className="mx-auto h-12 w-12 text-black" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        ))}

                        <div className="mt-1 flex justify-center pl-0 px-14 pt-05 pb-0">
                            <button type="submit" disabled={processing}>
                                <span className="text-5xl"><i className="ri-upload-cloud-line"></i></span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
