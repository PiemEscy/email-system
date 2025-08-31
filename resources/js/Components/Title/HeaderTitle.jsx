import { useState, useEffect, useRef } from "react";
import { FaAngleDoubleRight, FaAngleDown, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

export default function HeaderTitle({ user, windowLogo, windowType, header, headerDescription }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Get the first letter of the user's name (uppercase)
    const firstLetter = user?.name?.charAt(0).toUpperCase() || "?";

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="border-b border-gray-300 p-2 m-4 mt-0 mb-0">
            <div className="flex justify-between items-center">
                {/* Left Side: Logo, Title, and Window Type */}
                <div className="flex items-center space-x-2">
                    {windowLogo}
                    {windowType && <span className="text-base text-gray-900">{windowType}</span>}
                    <FaAngleDoubleRight className="text-gray-800 inline-block ml-1 mr-1 w-4 h-4" />
                    <h2 className="text-base text-gray-900">{header}</h2>
                </div>

                {/* Right Side: User Profile Button with Dropdown */}
                <div ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-900 focus:outline-none"
                    >
                        <div className="h-7 w-7 flex items-center justify-center rounded-full bg-blue-900 text-white text-sm font-medium">
                            {firstLetter}
                        </div>
                        <span>{user.email} <FaAngleDown className="inline-block ml-1 h-3 w-3" /></span>
                    </button>

                    {/* Dropdown */}
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-md z-50">
                            <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <FaUser className="w-4 h-4 text-gray-600" />
                                User Profile
                            </button>
                            <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <FaCog className="w-4 h-4 text-gray-600" />
                                Settings
                            </button>
                            <button className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                <FaSignOutAlt className="w-4 h-4 text-red-500" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <p className="text-sm text-gray-700">{headerDescription}</p>
        </div>
    );
}
