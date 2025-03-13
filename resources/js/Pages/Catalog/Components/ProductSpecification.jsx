import React, { useState, useEffect } from 'react';
import SwalAlert from '@/Components/Alert/SwalAlert';
const ProductSpecification = ({ specifications, formData, setFormData }) => {
    const [spec, setSpec] = useState('');
    const [specInput, setSpecInput] = useState('');

    // specipication
    const addSpecification = () => {
        // valiation alert
        if (specInput.trim() === '') {
            SwalAlert('warning', 'Please enter specification value');
            return;
        }
        // validation alert
        if (!spec) {
            SwalAlert('warning', 'Please select specification');
            return;
        }
        // validation alert
        if (formData.specifications.some(s => s.specification_id == spec && s.value === specInput)) {
            SwalAlert('warning', 'Specification already exists');
            return;
        }

        // Add specification to form data
        if (specInput.trim() !== '' && spec) {
            const selectedSpec = specifications.find(s => s.id == spec);// ID দিয়ে নাম খুঁজে বের 
            setFormData(prev => ({
                ...prev,
                specifications: [...prev.specifications, {
                    specification_id: spec,
                    name: selectedSpec ? selectedSpec.name : '',
                    value: specInput
                }]
            }));
            setSpec('');
            setSpecInput('');
        }
    };

    const removeSpecification = (index) => {
        setFormData(prev => ({
            ...prev,
            specifications: prev.specifications.filter((_, i) => i !== index)
        }));
    };

    return (
        <div>
            <div className="mb-4">
                <label className="block text-gray-700 font-semibold">Product Specification</label>
                <div className="flex space-x-2">
                    <select
                        className="w-full p-2 border focus:ring focus:ring-blue-300"
                        placeholder="Enter product specifications..."
                        value={spec}
                        onChange={(e) => setSpec(e.target.value)}
                    >
                        <option value="">Select specification...</option>
                        {
                            specifications
                                .filter(s => !formData.specifications.some(fs => fs.specification_id == s.id)) // আগের থেকে থাকা `specification_id` ফিল্টার করা
                                .map((spec, index) => (
                                    <option key={index} value={spec.id}>{spec.name}</option>
                                ))
                        }
                    </select>

                    <input
                        className="w-full p-2 border focus:ring focus:ring-blue-300"
                        placeholder="Enter specifications value..."
                        value={specInput}
                        onChange={(e) => setSpecInput(e.target.value)}
                    />
                    <button
                        className="px-2 py-1 bg-green-600 text-white"
                        onClick={addSpecification}
                    >
                        Add
                    </button>
                </div>
                <div className="mt-2">
                    <table className="w-full border-collapse border mt-1">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 p-1 w-10">#</th>
                                <th className="border border-gray-300 p-1 w-40">Specification Name</th>
                                <th className="border border-gray-300 p-1 w-40">Value</th>
                                <th className="border border-gray-300 p-1 w-5"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {formData.specifications.map((spec, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 p-1 text-center">{index + 1}</td>
                                    <td className="border border-gray-300 p-1">{spec.name}</td>
                                    <td className="border border-gray-300 p-1 text-center">{spec.value}</td>
                                    <td className="border border-gray-300 p-1 text-center">
                                        <button
                                            className="bg-red-600 text-white p-1 rounded-sm"
                                            onClick={() => removeSpecification(index)}
                                        >
                                            X
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProductSpecification;
