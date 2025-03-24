import { useState } from "react";
import Select from "react-select";
import { SwalAlert }  from "@/Components/Alert/SwalAlert";

const ProductAttribute = ({ formData, setFormData }) => {
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);
  console.log(formData);
  const attributeOptions = {
    Color: [
      { id: 1, value: "Red" },
      { id: 2, value: "Blue" },
      { id: 3, value: "Green" },
      { id: 4, value: "Yellow" },
      { id: 5, value: "Black" },
    ],
    Size: [
      { id: 6, value: "Small" },
      { id: 7, value: "Medium" },
      { id: 8, value: "Large" },
      { id: 9, value: "X-Large" },
    ],
    Material: [
      { id: 10, value: "Cotton" },
      { id: 11, value: "Polyester" },
      { id: 12, value: "Linen" },
      { id: 13, value: "Wool" },
    ],
    Pattern: [
      { id: 14, value: "Striped" },
      { id: 15, value: "Checked" },
      { id: 16, value: "Floral" },
      { id: 17, value: "Printed" },
    ],
  };

  const addAttribute = () => {
    if (!selectedAttribute) {
      SwalAlert("warning", "Please select an attribute");
      return;
    }
    if (selectedValues.length === 0) {
      SwalAlert("warning", "Please select at least one value");
      return;
    }

    // Check if the selected attribute already exists in formData
    if (formData.attributes.some((attr) => attr.attribute === selectedAttribute.value)) {
      SwalAlert("warning", "Attribute already exists");
      return;
    }

    // Map selected values to a comma-separated string of ids
    const selectedValueIds = selectedValues.map((v) => v.value.id).join(",");

    // Map selected values to a comma-separated string of names (e.g., "Red, Black, Green")
    const selectedValueNames = selectedValues.map((v) => v.value.value).join(", ");

    // Add the new attribute along with selected value ids and names to formData
    setFormData((prev) => ({
      ...prev,
      attributes: [
        ...prev.attributes,
        {
          attribute: selectedAttribute.value,
          attribute_value_id: selectedValueIds,  // Store IDs as a string
          attribute_values: selectedValueNames,  // Store names as a string
        },
      ],
    }));

    setSelectedAttribute(null);
    setSelectedValues([]);
  };


  const removeAttribute = (index) => {
    setFormData((prev) => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index),
    }));
  };

  // Filter out already selected attributes
  const filteredAttributeOptions = Object.keys(attributeOptions)
    .filter(
      (attr) => !formData.attributes.some((a) => a.attribute === attr)
    )
    .map((attr) => ({ value: attr, label: attr }));

  // Prevent selecting duplicate values for an attribute
  const handleValuesChange = (newValues) => {
    // Filter out duplicate values by comparing ids
    const uniqueValues = newValues.filter(
      (value, index, self) =>
        index === self.findIndex((v) => v.value.id === value.value.id)
    );
    setSelectedValues(uniqueValues);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Product Attributes</label>
        <div className="flex space-x-2">
          {/* Attribute Select */}
          <Select
            className="w-full"
            options={filteredAttributeOptions}
            value={selectedAttribute}
            onChange={setSelectedAttribute}
            placeholder="Select an attribute..."
          />

          {/* Attribute Values Multi-Select */}
          {selectedAttribute && (
            <Select
              className="w-full"
              isMulti
              options={attributeOptions[selectedAttribute.value].map((option) => ({
                value: option,
                label: option.value,
              }))}
              value={selectedValues}
              onChange={handleValuesChange}
              placeholder="Select values..."
            />
          )}

          {/* Add Button */}
          <button className="px-2 py-1 bg-green-600 text-white" onClick={addAttribute}>
            Add
          </button>
        </div>

        {/* Attribute List Table */}
        <div className="mt-2">
          <table className="w-full border-collapse border mt-1">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-1 w-10">#</th>
                <th className="border border-gray-300 p-1 w-40">Attribute</th>
                <th className="border border-gray-300 p-1 w-60">Values</th>
                <th className="border border-gray-300 p-1 w-5"></th>
              </tr>
            </thead>
            <tbody>
              {formData.attributes.map((attr, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-1 text-center">{index + 1}</td>
                  <td className="border border-gray-300 p-1">{attr.attribute}</td>
                  <td className="border border-gray-300 p-1">{attr.attribute_values}</td>
                  <td className="border border-gray-300 p-1 text-center">
                    <button className="bg-red-600 text-white p-1 rounded-sm" onClick={() => removeAttribute(index)}>
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
};

export default ProductAttribute;
