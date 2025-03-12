import React from 'react';

const ProductImage = ({ formData, setFormData }) => {
    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        handleFiles(files);
    };

    const handleFiles = (files) => {
        const newImages = files.map(file => Object.assign(file, {
            // id: 0,
            preview: URL.createObjectURL(file)
        }));
        setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    };

    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        handleFiles(files);
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
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
                {
                    formData.images.map((image, index) => (
                        <div key={index} className="relative">
                            <img src={image.preview} alt="Preview" className="w-full h-24 object-cover rounded" />
                            <button
                                className="absolute top-0 right-0 bg-red-500 text-white p-1"
                                onClick={() => removeImage(index)}
                            >
                                ✕
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ProductImage;
