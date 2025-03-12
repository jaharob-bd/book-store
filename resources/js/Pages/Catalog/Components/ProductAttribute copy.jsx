import { useState } from "react";
import Select from "react-select";

const ProductAttribute = () => {
  const [attributes, setAttributes] = useState([]);

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
    const availableAttributes = Object.keys(attributeOptions).filter(
      (attr) => !attributes.some((a) => a.attribute === attr)
    );

    if (availableAttributes.length > 0) {
      setAttributes([
        ...attributes,
        { id: attributes.length + 1, attribute: "", values: [] },
      ]);
    }
  };

  const removeAttribute = (id) => {
    setAttributes(attributes.filter((attr) => attr.id !== id));
  };

  const handleAttributeChange = (id, selectedOption) => {
    setAttributes(
      attributes.map((attr) =>
        attr.id === id ? { ...attr, attribute: selectedOption.value, values: [] } : attr
      )
    );
  };

  const handleValueChange = (id, selectedOptions) => {
    setAttributes(
      attributes.map((attr) =>
        attr.id === id ? { ...attr, values: selectedOptions.map((opt) => opt.value) } : attr
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", attributes);
  };

  return (
    <div>
      <div className="mb-4">
        <form onSubmit={handleSubmit}>
          <table className="w-full border bg-white">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-1 border">Attribute</th>
                <th className="p-1 border">Values</th>
                <th className="p-1 border text-center">
                  <button
                    type="button"
                    onClick={addAttribute}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    disabled={attributes.length >= Object.keys(attributeOptions).length}
                  >
                    +
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {attributes.map((attr) => (
                <tr key={attr.id}>
                  <td className="p-2 border">
                    <Select
                      options={Object.keys(attributeOptions)
                        .filter(
                          (option) =>
                            !attributes.some((a) => a.attribute === option && a.id !== attr.id)
                        )
                        .map((option) => ({ value: option, label: option }))}
                      value={attr.attribute ? { value: attr.attribute, label: attr.attribute } : null}
                      onChange={(selectedOption) =>
                        handleAttributeChange(attr.id, selectedOption)
                      }
                      className="w-full"
                    />
                  </td>
                  <td className="p-2 border">
                    {attr.attribute && (
                      <Select
                        isMulti
                        options={attributeOptions[attr.attribute].map((value) => ({
                          value,
                          label: value,
                        }))}
                        value={attr.values.map((value) => ({ value, label: value }))}
                        onChange={(selectedOptions) => handleValueChange(attr.id, selectedOptions)}
                        className="w-full"
                      />
                    )}
                  </td>
                  <td className="p-2 border text-center">
                    <button
                      type="button"
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => removeAttribute(attr.id)}
                    >
                      -
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default ProductAttribute;
