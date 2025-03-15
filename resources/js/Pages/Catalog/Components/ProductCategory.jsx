import React, { useState, useEffect } from 'react';
import SwalAlert from '@/Components/Alert/SwalAlert';
import axios from 'axios';

const ProductCategory = ({ categories, setCategories, formData, setFormData }) => {
    const [newCategory, setNewCategory] = useState("");

    const handleCategoryChange = (category) => {
        setFormData(prev => {
            const isSelected = prev.categories.some(cat => cat.id === category.id);
            const updatedCategories = isSelected
                ? prev.categories.filter(cat => cat.id !== category.id) // Remove category by id
                : [...prev.categories, category]; // Add category if not selected
    
            return { ...prev, categories: updatedCategories };
        });
    };

    const insertCategory = async (categoryName) => {
        try {
            const response = await axios.post('/category-store', { name: categoryName, status: 1}, {
                withCredentials: true
            });
            console.log(response);
            if (response.data.status && response.data.categoryId) {
                const newCatObj = { id: response.data.categoryId, name: newCategory };
                setCategories(prev => [...prev, newCatObj]);
                setFormData(prev => ({ ...prev, categories: [...prev.categories, newCatObj] }));
                setNewCategory(""); // Clear the input only after a successful addition
                SwalAlert('success', 'Category added successfully!');
            } else {
                SwalAlert('warning', 'Category add failed! Please try again.');
            }
        } catch (error) {
            console.error('Error adding category:', error);
            SwalAlert('error', 'There was an error while adding the category. Please try again later.');
        }
    }

    const addCategory = () => {
        if (!newCategory) {
            SwalAlert('warning', 'Category name cannot be empty');
            return;
        }

        // Check for duplicates in the current list before making the API request
        if (categories.some(cat => cat.name.toLowerCase() === newCategory.toLowerCase())) {
            SwalAlert('warning', 'Category already exists');
        } else {
            insertCategory(newCategory);
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
