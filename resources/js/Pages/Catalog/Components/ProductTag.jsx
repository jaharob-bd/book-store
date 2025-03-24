import React, { useState } from "react";
import { SwalAlert }  from "@/Components/Alert/SwalAlert";

const ProductTag = ({ tags, formData, setFormData }) => {
    const [newTag, setNewTag] = useState("");
    const [suggestedTags, setSuggestedTags] = useState([]);

    // ✅ Function to add a tag
    const addTag = () => {
        if (!newTag.trim()) return;
        
        // Prevent duplicate tags
        if (formData.tags.some(tag => tag.name.toLowerCase() === newTag.toLowerCase())) {
            SwalAlert("warning", "Tag already exists");
            return;
        }

        // Update formData
        setFormData(prev => ({
            ...prev,
            tags: [...prev.tags, { tag_id: "", name: newTag.trim() }]
        }));

        // Clear input and suggestions
        setNewTag("");
        setSuggestedTags([]);
    };

    // ✅ Handle input change for tags
    const inputTag = (e) => {
        const tagValue = e.target.value;
        setNewTag(tagValue);

        if (tagValue.length < 3) {
            setSuggestedTags([]);
            return;
        }

        // Filter suggested tags
        const filteredTags = tags.filter(tag => tag.name.toLowerCase().includes(tagValue.toLowerCase().trim()));
        setSuggestedTags(filteredTags);
    };

    // ✅ Function to add tag from suggestions
    const addTagFromSuggestion = (tag) => {
        if (formData.tags.some(t => t.name === tag.name)) {
            SwalAlert("warning", "Tag already exists");
            return;
        }

        setFormData(prev => ({
            ...prev,
            tags: [...prev.tags, { tag_id: tag.id, name: tag.name }]
        }));

        setNewTag("");
        setSuggestedTags([]);
    };

    // ✅ Fix removeTag function
    const removeTag = (index) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter((_, i) => i !== index)
        }));
    };

    // ✅ Handle Enter key to add tag
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag();
        }
        console.log(formData);
    };

    return (
        <div className="border p-4 mb-4 mx-auto bg-white overflow-hidden shadow-lg rounded-lg">
            <h3 className="font-bold border-b pb-2 text-lg">Product Tags</h3>

            {/* Display selected tags */}
            <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded flex items-center">
                        {tag.name}
                        <button
                            className="ml-2 bg-red-500 text-white rounded-full px-2 hover:bg-red-700 transition"
                            onClick={() => removeTag(index)}
                        >
                            ✕
                        </button>
                    </span>
                ))}
            </div>

            {/* Tag input field */}
            <div className="mt-4 flex items-center space-x-2">
                <input
                    type="text"
                    value={newTag}
                    onChange={inputTag}
                    onKeyDown={handleKeyPress}
                    placeholder="Add new tag"
                   className="border p-1 w-full"
                />
                <button
                    onClick={addTag}
                    className="bg-blue-500 text-white px-3 p-1"
                >
                    <i className="ri-add-circle-line"></i>
                </button>
            </div>

            {/* Suggested tags */}
            {suggestedTags.length > 0 && (
                <div className="mt-2">
                    <p className="text-gray-600 text-sm">Suggested Tags:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {suggestedTags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-gray-200 text-gray-800 px-3 py-1 rounded cursor-pointer hover:bg-gray-300 transition"
                                onClick={() => addTagFromSuggestion(tag)}
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductTag;
