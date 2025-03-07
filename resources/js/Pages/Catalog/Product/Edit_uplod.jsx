import { useState } from "react";
import { router } from '@inertiajs/react';
// import Categories from "@/Pages/Website/Home/Categories";

const Edit = (props) => {
    const [formData, setFormData] = useState({
        name: 'edit',
        discription: '',
        images: [],
        tag: [1, 2],
        categories: [3,5,7],
    });

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        handleFiles(files);
    };

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const newImages = files.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const submit = async () => {
        const formDataToSend = new FormData();

        // Append all key-value pairs from formData state
        Object.keys(formData).forEach((key) => {
            // Check if value is an array to send as an array in Laravel
            if (Array.isArray(formData[key])) {
                // Append arrays correctly
                formData[key].forEach((value) => {
                    formDataToSend.append(`${key}[]`, value); // Send as an array in Laravel
                });
            }else if (typeof formData[key] === "object" && formData[key] !== null) {
                // Handle nested object (general)
                Object.keys(formData[key]).forEach((subKey) => {
                    formDataToSend.append(`${key}[${subKey}]`, formData[key][subKey]);
                });
            } else if (typeof formData[key] === "object" && formData[key] !== null) {
                // Handle nested object (general)
                Object.keys(formData[key]).forEach((subKey) => {
                    formDataToSend.append(`${key}[${subKey}]`, formData[key][subKey]);
                });
            } else {
                // Append other fields normally
                formDataToSend.append(key, formData[key]);
            }
        });
        console.log(formDataToSend);
        try {
            const response = await axios.post('/product-update', formDataToSend, { withCredentials: true });
            // console.log(response)
            if (response.data.status) {
                SwalAlert('success', response.data.message, 'center');
            } else {
                SwalAlert('warning', 'Add failed', 'center');
            }
        } catch (error) {
            console.error('Failed to place order:', error);
            SwalAlert('error', 'Failed to place order. Please try again.', 'center');
        }
    };

    const handleSubmit = async () => {
        const formDataToSend = new FormData();
    
        // Append all key-value pairs from formData state
        Object.keys(formData).forEach((key) => {
            // Check if value is an array to send as an array in Laravel
            if (Array.isArray(formData[key])) {
                // Append arrays correctly
                formData[key].forEach((value) => {
                    formDataToSend.append(`${key}[]`, value); // Send as an array in Laravel
                });
            } else {
                // Append other fields normally
                formDataToSend.append(key, formData[key]);
            }
        });
    
        // Debugging: Check FormData content
        for (let pair of formDataToSend.entries()) {
            console.log(pair[0], pair[1]);
        }
    
        router.post(`/product-image-upload`, formDataToSend, {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Form data uploaded successfully');
            },
            onError: (errors) => {
                console.error('Error uploading form data:', errors);
            },
        });
    };

    return (
        <div className="border p-4 mb-4 mx-auto bg-white overflow-hidden shadow-lg">
            <h3 className="font-bold border-b pb-2">Product Images</h3>
            <div
                className="border-dashed border-2 border-gray-300 p-6 mt-2 text-center cursor-pointer rounded-md"
                onDrop={handleDrop}
                onDragOver={(event) => event.preventDefault()}
                onClick={() => document.getElementById("fileInput").click()}
            >
                <p className="text-gray-700 mt-2">Drag and drop images here or click to upload.</p>
                <input
                    id="fileInput"
                    type="file"
                    multiple
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
                {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                        <img src={image.preview} alt="Preview" className="w-full h-24 object-cover rounded" />
                        <button
                            className="absolute top-0 right-0 bg-red-500 text-white p-1"
                            onClick={() => removeImage(index)}
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Upload Images
            </button>
        </div>
    );
};

export default Edit;