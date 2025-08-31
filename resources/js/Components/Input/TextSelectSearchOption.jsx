import { useState, useRef, useEffect } from "react";
import { FiX } from "react-icons/fi"; // Import an icon for the clear button

export default function TextSelectSearchOption({ options = [], value, onChange, className = "" }) {

    const [search, setSearch] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Ensure options is always an array
    const filteredOptions = options.filter((option) =>
        option?.label?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Search Input with Clear Button */}
            <div className="relative">
                <input
                    type="text"
                    className={`w-full p-2 border rounded text-gray-900 border-gray-400 focus:outline-none ${className}`}
                    value={search}
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                />
                {search && (
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => {
                            setSearch("");
                            onChange(""); // Reset selection
                        }}
                    >
                        <FiX size={16} />
                    </button>
                )}
            </div>

            {/* Dropdown List */}
            {isOpen && (
                <ul className="text-gray-900 absolute left-0 w-full border border-gray-400 bg-white rounded-md shadow-lg max-h-40 overflow-y-auto z-10">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <li
                                key={option.value}
                                className={`text-sm p-1 hover:bg-indigo-500 hover:text-white cursor-pointer ${value === option.value ? "" : ""
                                    }`}
                                onClick={() => {
                                    onChange(option.value);
                                    setSearch(option.label);
                                    setIsOpen(false);
                                }}
                            >
                                {option.label}
                            </li>
                        ))
                    ) : (
                        <li className="p-2 text-gray-500">No results found</li>
                    )}
                </ul>
            )}
        </div>
    );
}


{/* 
    const StatusOptions = [
        { value: "", label: "All" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
        { value: "blacklisted", label: "Blacklisted" },
    ];

    <TextSelectSearchOption
    options={StatusOptions}
    name="filter_status"
    className="text-sm border border-gray-300 px-2.5 py-1.5 w-full"
    value={""}
    onChange={(newValue) => setFilterStatus(newValue)}

/> */
}
