import React, { useState, useEffect, useRef } from "react";

export const CategoriesDropDrown = ({
    formFieldName,
    options,
    onChange,
    prompt = "Select one or more options",
}) => {
    const [isJsEnabled, setIsJsEnabled] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const optionsListRef = useRef(null);

    useEffect(() => {
        setIsJsEnabled(true);
    }, []);

    const handleChange = (e) => {
        const isChecked = e.target.checked;
        const option = e.target.value;

        const selectedOptionSet = new Set(selectedOptions);

        if (isChecked) {
            selectedOptionSet.add(option);
        } else {
            selectedOptionSet.delete(option);
        }

        const newSelectedOptions = Array.from(selectedOptionSet);

        setSelectedOptions(newSelectedOptions);
        onChange(newSelectedOptions);
    };

    const isSelectAllEnabled = selectedOptions.length < options.length;

    const handleSelectAllClick = (e) => {
        e.preventDefault();

        const optionsInputs = optionsListRef.current.querySelectorAll("input");
        optionsInputs.forEach((input) => {
            input.checked = true;
        });

        setSelectedOptions([...options]);
        onChange([...options]);
    };

    const isClearSelectionEnabled = selectedOptions.length > 0;

    const handleClearSelectionClick = (e) => {
        e.preventDefault();

        const optionsInputs = optionsListRef.current.querySelectorAll("input");
        optionsInputs.forEach((input) => {
            input.checked = false;
        });

        setSelectedOptions([]);
        onChange([]);
    };

    return (
        <label className="relative">
            <input type="checkbox" className="hidden peer" />
            <div className="cursor-pointer after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform inline-flex border px-5 py-1 w-full border border-gray-300 dark:text-gray-300 border-gray-600 focus:border-blue-500 dark:focus:border-blue-500">
                {prompt}
                {isJsEnabled && selectedOptions.length > 0 && (
                    <span className="ml-1 text-blue-500">{`(${selectedOptions.length} selected)`}</span>
                )}
            </div>

            <div className="absolute bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto w-full max-h-60 overflow-y-scroll">
                {isJsEnabled && (
                    <ul>
                        <li className="flex">
                            <button
                                onClick={handleSelectAllClick}
                                disabled={!isSelectAllEnabled}
                                className="text-left px-2 py-1 text-blue-600 disabled:opacity-50 mr-1 font-bold"
                            >
                                {"Select All"}
                            </button>
                            <button
                                onClick={handleClearSelectionClick}
                                disabled={!isClearSelectionEnabled}
                                className="text-left px-2 py-1 text-blue-600 disabled:opacity-50 font-bold"
                            >
                                {"Clear"}
                            </button>
                        </li>

                    </ul>
                )}
                <ul ref={optionsListRef}>
                    {options.map((option, i) => {
                        return (
                            <li key={option.id}>
                                <label
                                    className={`flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200`}
                                >
                                    <input
                                        type="checkbox"
                                        name={formFieldName}
                                        value={option.id}
                                        className="cursor-pointer"
                                        onChange={handleChange}
                                    />
                                    <span className="ml-1">{option.name}</span>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </label>
    );
}

