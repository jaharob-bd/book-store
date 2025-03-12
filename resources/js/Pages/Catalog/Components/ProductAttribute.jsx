import { useState } from "react";
import Select from "react-select";
import SwalAlert from '@/Components/Alert/SwalAlert';

const ProductAttribute = ({ formData, setFormData }) => {
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);

  const attributeOptions = {
    Color          : ["Red", "Blue", "Green", "Yellow", "Black"],
    Size           : ["Small", "Medium", "Large", "Large", "X-Large"],
    Material       : ["Cotton", "Polyester", "Linen", "Wool"],
    Pattern        : ["Striped", "Checked", "Floral", "Printed"],
    Season         : ["Summer", "Winter", "Spring", "Fall"],
    FashionStyle   : ["Casual", "Dressy", "Vintage", "Streetwear"],
    Occasion       : ["Work", "School", "Vacation", "Holiday"],
    Brand          : ["Nike", "Adidas", "Puma", "Reebok", "Asics"],
    Type           : ["Shirt", "Pants", "Jacket", "Shoes", "Accessories"],
    AgeGroup       : ["Adult", "Kid", "Teenager", "Senior", "Infant"],
    Gender         : ["Male", "Female", "Unisex"],
    MaterialQuality: ["Good", "Average", "Poor", "New"],
    Fabric         : ["Cotton", "Polyester", "Linen", "Wool"],
    Weight         : ["Light", "Medium", "Heavy"],
    Fit            : ["Regular", "Slim", "Skinny", "Loose"],
    SleeveLength   : ["Short Sleeve", "Long Sleeve", "Sleeveless"],
    Neckline       : ["V-Neck", "Round Neck", "Crew Neck", "Boat Neck"],
    Closure        : ["Button", "Zipper", "Lace-Up", "Slip-On"],
    Style          : ["Casual", "Formal", "Sporty", "Boho"],
    MaterialType   : ["Cotton", "Polyester", "Linen", "Wool"],
    Length         : ["Short", "Regular", "Long"],
    HeelHeight     : ["Flat", "Low", "Medium", "High"],
    ToeShape       : ["Round", "Square", "Pointed", "Open"],
    HeelType       : ["Block", "Cone", "Wedge", "Stiletto"],
    BootHeight     : ["Ankle", "Knee", "Thigh"],
    Waistline      : ["High", "Mid", "Low"],
    Rise           : ["High", "Mid", "Low"],
    Wash           : ["Light", "Medium", "Dark"],
    Stretch        : ["High", "Medium", "Low"],
    Belt           : ["With Belt", "Without Belt"],
    Collar         : ["Mandarin", "Spread", "Notched", "Shawl"],
    Lining         : ["Fully Lined", "Partially Lined", "Unlined"],
    Features       : ["Pockets", "Hooded", "Belted", "Embroidered"],
    Design         : ["Printed", "Embroidered", "Solid", "Striped"],
  };

  const addAttribute = () => {
    // Validation checks
    if (!selectedAttribute) {
      SwalAlert("warning", "Please select an attribute");
      return;
    }
    if (selectedValues.length === 0) {
      SwalAlert("warning", "Please select at least one value");
      return;
    }
    if (formData.attributes.some(attr => attr.attribute === selectedAttribute)) {
      SwalAlert("warning", "Attribute already exists");
      return;
    }

    // Add attribute
    setFormData(prev => ({
      ...prev,
      attributes: [
        ...prev.attributes,
        { attribute: selectedAttribute, values: selectedValues }
      ],
    }));

    // Reset selections
    setSelectedAttribute("");
    setSelectedValues([]);
  };

  const removeAttribute = (index) => {
    setFormData(prev => ({
      ...prev,
      attributes: prev.attributes.filter((_, i) => i !== index),
    }));
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold">Product Attributes</label>
        <div className="flex space-x-2">
          {/* Attribute Select */}
          <Select
            className="w-full"
            options={Object.keys(attributeOptions)
              .filter(attr => !formData.attributes.some(a => a.attribute === attr))
              .map(attr => ({ value: attr, label: attr }))}
            value={selectedAttribute ? { value: selectedAttribute, label: selectedAttribute } : null}
            onChange={(option) => setSelectedAttribute(option.value)}
            placeholder="Select an attribute..."
          />

          {/* Attribute Values Multi-Select */}
          {selectedAttribute && (
            <Select
              className="w-full"
              isMulti
              options={attributeOptions[selectedAttribute].map(value => ({ value, label: value }))}
              value={selectedValues.map(value => ({ value, label: value }))}
              onChange={(options) => setSelectedValues(options.map(opt => opt.value))}
              placeholder="Select values..."
            />
          )}

          {/* Add Button */}
          <button
            className="px-2 py-1 bg-green-600 text-white"
            onClick={addAttribute}
          >
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
                  <td className="border border-gray-300 p-1">{attr.values.join(", ")}</td>
                  <td className="border border-gray-300 p-1 text-center">
                    <button
                      className="bg-red-600 text-white p-1 rounded-sm"
                      onClick={() => removeAttribute(index)}
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
};

export default ProductAttribute;
