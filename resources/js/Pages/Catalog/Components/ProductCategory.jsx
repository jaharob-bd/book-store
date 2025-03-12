import React, { useState, useEffect } from 'react';
import SwalAlert from '@/Components/Alert/SwalAlert';

const ProductCategory = ({ categories, formData, setFormData }) => {
    const [newCategory, setNewCategory] = useState("");

    const handleCategoryChange = (category) => {
        setFormData(prev => {
            const updatedCategories = prev.categories.includes(category)
                ? prev.categories.filter(cat => cat !== category) // Remove category if already selected
                : [...prev.categories, category]; // Add category if not selected

            return { ...prev, categories: updatedCategories };
        });
    };
    const addCategory = () => {
        if (newCategory && !categories.some(cat => cat.name === newCategory)) {
            const newId = categories.length + 1;
            const newCatObj = { id: newId, name: newCategory };

            // Update both state variables
            setCategories(prev => [...prev, newCatObj]);
            setFormData(prev => ({ ...prev, categories: [...prev.categories, newCatObj] }));

            setNewCategory("");
        } else {
            SwalAlert('warning', 'Category already exists');
        }
    };

    return (
        <div className="border p-4 mb-4 mx-auto bg-white overflow-hidden shadow-lg">
            <h3 className="font-bold border-b">Product Categories</h3>
            <div className="max-h-40 overflow-y-auto mt-2">
                {categories.map((category, index) => (
                    <label key={index} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={formData.categories.some(cat => cat.id === category.id)}
                            onChange={() => handleCategoryChange(category)}
                        />
                        <span>{category.name}</span>
                    </label>
                ))}
            </div>
            <div className="flex items-center pt-2 space-x-2">
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Add new category"
                    className="border p-1 w-full"
                />
                <button
                    onClick={addCategory}
                    className="bg-blue-500 text-white px-3 p-1"
                >
                    {/* plus icon */}
                    <i className="ri-add-circle-line"></i>
                </button>
            </div>
        </div>
    );
}

export default ProductCategory;
