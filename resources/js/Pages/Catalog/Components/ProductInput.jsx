import React from "react";

function ProductInput({ label, name, type = "text", value, setFormData }) {
    const handleChange = (e) => {
        const newValue = e.target.value;
        setFormData((prev) =>
            typeof setFormData === "function"
                ? setFormData(() => newValue) // For nested state updates
                : { ...prev, [name]: newValue }
        );
    };

    return (
        <div className="mb-4">
            <label className="block text-gray-700 font-medium">{label}</label>
            {type === "text" && (
                <input
                    type="text"
                    name={name}
                    className="w-full p-2 border border-gray-300"
                    placeholder={`Enter ${label.toLowerCase()}`}
                    value={value}
                    onChange={handleChange}
                />
            )}
            {type === "textarea" && (
                <textarea
                    name={name}
                    className="w-full p-2 border border-gray-300"
                    placeholder={`Enter ${label.toLowerCase()}`}
                    value={value}
                    onChange={handleChange}
                    rows={2}
                />
            )}
        </div>
    );
}

export default ProductInput;
