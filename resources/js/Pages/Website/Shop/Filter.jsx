import React, { useState, useEffect } from "react";

function Filter(props) {
    const { setProducts, categories, authors, publishers } = props;

    const [filters, setFilters] = useState({
        authors: [],
        categories: [],
        publishers: [],
        price: "",
    });

    // Initialize filters from URL query parameters
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setFilters({
            authors: params.get("author")?.split(",") || [],
            categories: params.get("category")?.split(",") || [],
            publishers: params.get("publisher")?.split(",") || [],
            price: params.get("price") || "",
        });
    }, []);

    // Apply filters whenever the filter state changes
    useEffect(() => {
        applyFilters();
    }, [filters]);

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

        if (/^\d*$/.test(value)) { // Ensure only numeric input
            setFilters((prev) => ({
                ...prev,
                price: updatedPrice,
            }));
        }
    };

    const applyFilters = () => {
        const params = new URLSearchParams();
        if (filters.price) params.set("price", filters.price);
        if (filters.authors.length) params.set("author", filters.authors.join("_"));
        if (filters.categories.length) params.set("category", filters.categories.join("_"));
        if (filters.publishers.length) params.set("publisher", filters.publishers.join("_"));
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState(null, "", newUrl);
        filteredProducts(params.toString());
    };

    const filteredProducts = (params) => {
        fetch(`/shop/filter?${params.toString()}`)
            .then((response) => {
                console.log('Response:', response); // Log the raw response
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Convert response to JSON
            })
            .then((data) => {
                console.log("Filtered Products:", data); // Log the parsed data
                setProducts(data); // Ensure setProducts is a valid state setter
            })
            .catch((error) => {
                console.error("Error fetching products:", error.message);
            });
    };

    return (
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden hidden md:block">
            <div className="divide-y divide-gray-200 space-y-5">
                {/* Categories Filter */}
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

                {/* Authors Filter */}
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

                {/* Publishers Filter */}
                <div className="pt-4">
                    <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">Publishers</h3>
                    <div className="space-y-2">
                        {publishers.map((publisher) => (
                            <div key={publisher.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={filters.publishers.includes(String(publisher.id))}
                                    onChange={() => handleCheckboxChange("publishers", String(publisher.id))}
                                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                />
                                <label className="text-gray-600 ml-3 cursor-pointer">{publisher.name}</label>
                                <div className="ml-auto text-gray-600 text-sm">({publisher.products_count})</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Price Filter */}
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
            </div>
        </div>
    );
}

export default Filter;
