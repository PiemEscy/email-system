import { useState, useEffect } from "react";
import EditAndDeleteModal from "../EmailTemplateComponents/EditAndDeleteModal";
import PaginationButton from "@/Components/Button/PaginationButton";
import { ToastContainer } from "react-toastify";
import { route } from "ziggy-js";
import axios from "axios";
import { motion } from "framer-motion";

export default function PaginatedCards({
    rowsPerPage,
    filterStatus,
    filterSearch,
    refreshTable,
    setRefreshTable,
    rules,
}) {
    const [selectedEmailTemplate, setSelectedEmailTemplate] = useState({});
    const [showEditAndDeleteModal, setShowEditAndDeleteModal] = useState(false);
    const [emailTemplates, setEmailTemplates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = async (page = 1) => {
        try {
            const response = await axios.post(route("master.email.template.filter.data"), {
                filterStatus,
                filterSearch,
                rowsPerPage,
                page,
            });
            setEmailTemplates(response.data.data.data);
            setCurrentPage(response.data.data.current_page);
            setLastPage(response.data.data.last_page);
            setTotalPages(response.data.data.total);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData(1);
        setRefreshTable(false);
    }, [filterStatus, filterSearch, rowsPerPage, refreshTable]);

    const handleCardClick = (data) => {
        setSelectedEmailTemplate(data);
        setShowEditAndDeleteModal(true);
    };

    const onDelete = async (id) => {
        try {
            await axios.delete(route('master.email.template.delete.data', { id: id }));
            setRefreshTable(true);
        } catch (error) {
            console.error("Failed to delete. Please try again", error);

            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error("Failed to delete. Please try again.");
            }
        }
    };

    const onUpdate = async (data) => {
        try {
            await axios.patch(route('master.email.template.update.data', { id: data.id }), data);
            setRefreshTable(true);
        } catch (error) {
            console.error("Failed to update. Please try again", error);

            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            } else {
                throw new Error("Failed to update. Please try again.");
            }
        }
    };

    return (
        <div className="w-full">
            {/* Grid of Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 py-2 bg-gray-50">
                {emailTemplates.length > 0 ? (
                    emailTemplates.map((value, index) => {
                        const firstLetter = value.sender_email
                            ? value.sender_email.charAt(0).toUpperCase()
                            : "?";

                        // Pick a color from a fixed palette (so it’s not too random each time)
                        const colors = [
                            "bg-blue-600",
                            "bg-green-600",
                            "bg-red-600",
                            "bg-indigo-600",
                            "bg-purple-600",
                            "bg-pink-600",
                            "bg-yellow-600",
                            "bg-gray-600",
                        ];
                        const colorClass = colors[index % colors.length]; // cycle through colors

                        return (
                            <motion.div
                                key={value.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => handleCardClick(value)}
                                className="relative cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm hover:shadow-md hover:border-gray-400 transition"
                            >
                                {/* Accent bar */}
                                <div className="absolute left-0 top-0 h-full w-1 bg-gray-500 rounded-l-xl"></div>

                                <div className="flex items-start gap-3 pl-3">
                                    {/* Profile Circle */}
                                    <div
                                        className={`h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-full text-white text-sm font-semibold ${colorClass}`}
                                    >
                                        {firstLetter}
                                    </div>

                                    <div className="flex-1 overflow-hidden">
                                        <h3 className="text-md font-semibold text-gray-800 truncate">
                                            {value.template_name}
                                        </h3>
                                        <p className="text-sm text-gray-600 truncate">{value.subject}</p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Sender:{" "}
                                            <span className="font-medium break-all">{value.sender_email}</span>
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            CC:{" "}
                                            <span className="text-sm break-words">
                                                {Array.isArray(value.cc) && value.cc.length > 0
                                                    ? value.cc.join(", ")
                                                    : typeof value.cc === "string" && value.cc.trim() !== ""
                                                        ? value.cc
                                                        : "none"}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                ) : (
                    <div className="col-span-full text-center py-6 text-gray-500">
                        No Email Template found.
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="mt-6">
                <PaginationButton
                    currentPage={currentPage}
                    lastPage={lastPage}
                    totalPages={totalPages}
                    data={emailTemplates}
                    fetchData={fetchData}
                />
            </div>

            {/* Edit/Delete Modal */}
            <EditAndDeleteModal
                show={showEditAndDeleteModal}
                data={selectedEmailTemplate}
                onDelete={onDelete}
                onUpdate={onUpdate}
                onClose={() => setShowEditAndDeleteModal(false)}
                rules={rules}
            />

            <ToastContainer />
        </div>
    );
}
