import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function Filter(props) {
    const { categories, authors, publishers } = props;
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        authors   : searchParams.get("author")?.split(",") || [],
        categories: searchParams.get("category")?.split(",") || [],
        publishers: searchParams.get("publisher")?.split(",") || [],
        price     : searchParams.get("price") || "",
    });

    const handleCheckboxChange = (type, id) => {
        const selected = new Set(filters[type]);
        if (selected.has(id)) {
            selected.delete(id);
        } else {
            selected.add(id);
        }
        setFilters((prev) => ({
            ...prev,
            [type]: Array.from(selected),
        }));
    };

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        const [min, max] = filters.price.split("-").map((v) => v.trim());
        const updatedPrice = name === "min" ? `${value}-${max || ""}` : `${min || ""}-${value}`;
        setFilters((prev) => ({
            ...prev,
            price: updatedPrice,
        }));
    };

    const applyFilters = () => {
        const params = {};
        if (filters.authors.length) params.author = filters.authors.join(",");
        if (filters.categories.length) params.category = filters.categories.join(",");
        if (filters.publishers.length) params.publisher = filters.publishers.join(",");
        if (filters.price) params.price = filters.price;
        setSearchParams(params);
    };

    return (
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden hidden md:block">
            <div className="divide-y divide-gray-200 space-y-5">
                <div>
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Categories</h3>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <div key={category.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={filters.categories.includes(String(category.id))}
                                    onChange={() => handleCheckboxChange("categories", String(category.id))}
                                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                />
                                <label className="text-gray-600 ml-3 cursor-pointer">{category.name}</label>
                                <div className="ml-auto text-gray-600 text-sm">({category.products_count})</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pt-4">
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Authors</h3>
                    <div className="space-y-2">
                        {authors.map((author) => (
                            <div key={author.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={filters.authors.includes(String(author.id))}
                                    onChange={() => handleCheckboxChange("authors", String(author.id))}
                                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                />
                                <label className="text-gray-600 ml-3 cursor-pointer">{author.name}</label>
                                <div className="ml-auto text-gray-600 text-sm">({author.products_count})</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pt-4">
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Price</h3>
                    <div className="mt-4 flex items-center">
                        <input
                            type="text"
                            name="min"
                            value={filters.price.split("-")[0] || ""}
                            onChange={handlePriceChange}
                            className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                            placeholder="min"
                        />
                        <span className="mx-3 text-gray-500">-</span>
                        <input
                            type="text"
                            name="max"
                            value={filters.price.split("-")[1] || ""}
                            onChange={handlePriceChange}
                            className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                            placeholder="max"
                        />
                    </div>
                </div>
                <div className="pt-4">
                    <button
                        onClick={applyFilters}
                        className="bg-primary text-white px-4 py-2 rounded shadow"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Filter;
