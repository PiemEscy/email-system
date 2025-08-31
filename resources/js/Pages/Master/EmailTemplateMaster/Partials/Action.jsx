import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import { FaFilter, FaPlus, FaPrint, FaFileExcel, FaUpload, FaSearch } from "react-icons/fa";

import InputLabel from '@/Components/Input/InputLabel';
import TextInput from '@/Components/Input/TextInput';
import TextSelect from '@/Components/Input/TextSelect';
import CreateModal from "../EmailTemplateComponents/CreateModal";

export default function Action({
    filterStatus,
    setFilterStatus,
    rowsPerPage,
    setRowsPerPage,
    filterSearch,
    setFilterSearch,
    setRefreshTable,
    rules,
}) {
    const [showFilters, setShowFilters] = useState(false);
    const [showCreateModal, setCreateModal] = useState(false);

    const onCreate = async (data) => {
        try {
            await axios.post(route('master.email.template.store.data'), data);
            setRefreshTable(true);
        } catch (error) {
            console.error("Failed to create. Please try again", error);

            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error("Failed to create. Please try again.");
            }
        }
    };

    return (
        <div className="bg-white pb-3 shadow-md">
            {/* Top Actions (Search & Buttons) */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
                {/* Search Box */}
                <div className="flex-1 relative">
                    <TextInput
                        type="text"
                        placeholder="Search data..."
                        className="text-sm border border-gray-300 py-1.5 w-full sm:w-3/5 md:w-2/3 lg:w-3/5 pl-8 pr-10"
                        onChange={(e) => setFilterSearch(e.target.value)}
                        value={filterSearch}
                    />
                    <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <FaSearch />
                    </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-1 w-auto sm:w-max">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center justify-center px-2.5 py-1.5 text-gray-700 bg-gray-300 border border-gray-300 hover:bg-gray-600 hover:text-white"
                        title="Filter"
                    >
                        <FaFilter />
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="flex items-center justify-center px-2.5 py-1.5 text-gray-700 bg-gray-300 border border-gray-300 hover:bg-gray-600 hover:text-white"
                        title="Print"
                    >
                        <FaPrint />
                    </button>
                    <button
                        className="flex items-center justify-center px-2.5 py-1.5 text-gray-700 bg-gray-300 border border-gray-300 hover:bg-gray-600 hover:text-white"
                        title="Export to Excel"
                    >
                        <FaFileExcel />
                    </button>
                    <button
                        className="flex items-center justify-center px-2.5 py-1.5 text-gray-700 bg-gray-300 border border-gray-300 hover:bg-gray-600 hover:text-white"
                        title="Import"
                    >
                        <FaUpload />
                    </button>
                    <button
                        onClick={() => setCreateModal(true)}
                        className="text-sm flex items-center justify-center px-2.5 py-1.5 text-gray-900 bg-green-300 border border-green-400 hover:bg-green-600 hover:text-white"
                        title="Create"
                    >
                        <FaPlus className="mr-2" /> Create
                    </button>
                </div>
            </div>

            {/* Animated Filter Options */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="mt-3 p-3 border border-gray-300 bg-gray-50 overflow-hidden">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                More Filter Options
                            </h3>
                            <div className="flex flex-col sm:flex-row gap-3">
                                {/* Row Number */}
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="filter_row_number"
                                        value="Page Number"
                                        className="block text-xs font-medium text-gray-600 mb-1"
                                    />
                                    <TextSelect
                                        name="filter_row_number"
                                        className="text-sm border border-gray-300 px-2.5 py-1.5 w-full"
                                        value={rowsPerPage}
                                        onChange={(e) => setRowsPerPage(Number(e.target.value))}
                                    >
                                        <option value="5">5 rows</option>
                                        <option value="10">10 rows</option>
                                        <option value="15">15 rows</option>
                                        <option value="20">20 rows</option>
                                        <option value="30">30 rows</option>
                                        <option value="50">50 rows</option>
                                        <option value="100">100 rows</option>
                                    </TextSelect>
                                </div>

                                {/* Status */}
                                <div className="w-full">
                                    <InputLabel
                                        htmlFor="filter_status"
                                        value="Status"
                                        className="block text-xs font-medium text-gray-600 mb-1"
                                    />
                                    <TextSelect
                                        name="filter_status"
                                        className="text-sm border border-gray-300 px-2.5 py-1.5 w-full"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <option value="">All</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="blacklisted">Blacklisted</option>
                                    </TextSelect>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal */}
            <CreateModal
                show={showCreateModal}
                onClose={() => setCreateModal(false)}
                onCreate={(createdData) => onCreate(createdData)}
                rules={rules}
            />
        </div>
    );
}
