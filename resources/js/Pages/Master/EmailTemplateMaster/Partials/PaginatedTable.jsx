import { useState, useEffect } from "react";
import EditAndDeleteModal from "../EmailTemplateComponents/EditAndDeleteModal";
import PaginationButton from "@/Components/Button/PaginationButton";
import { ToastContainer } from "react-toastify";
import { route } from 'ziggy-js';
import axios from 'axios';
import { motion } from "framer-motion";

export default function PaginatedTable({ rowsPerPage, filterStatus, filterSearch, refreshTable, setRefreshTable, rules }) {
    const [selectedEmailTemplate, setSelectedEmailTemplate] = useState({});
    const [showEditAndDeleteModal, setShowEditAndDeleteModal] = useState(false);
    const [emailTemplates, setEmailTemplates] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [hoveredRow, setHoveredRow] = useState(null);

    const fetchData = async (page = 1) => {
        try {
            const response = await axios.post(route('master.email.template.filter.data'), {
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

    const handleRowClick = (data) => {
        setSelectedEmailTemplate(data);
        setShowEditAndDeleteModal(true);
    };

    const onDelete = (id) => {
        console.log('Delete Sucess:'+id);
    };

    const onUpdate = (data) => {
        console.log('Update Sucess:'+data);
    };

    return (
        <div className="w-full">
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-300 text-sm">
                        <th className="px-4 py-2 text-left">#</th>
                        <th className="px-4 py-2 text-left">Template Name</th>
                        <th className="px-4 py-2 text-left">Subject</th>
                        <th className="px-4 py-2 text-left">Sender Email</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    {emailTemplates.length > 0 ? (
                        emailTemplates.map((value) => (
                            <motion.tr
                                key={value.id}
                                className={`border-b cursor-pointer ${hoveredRow === value.id ? "bg-gray-300 text-black" : ""
                                    }`}
                                onDoubleClick={() => handleRowClick(value)}
                                onMouseEnter={() => setHoveredRow(value.id)}
                                onMouseLeave={() => setHoveredRow(null)} // Remove this if you want it to stay even after leaving
                            >
                                <td className="px-4 py-2">{value.id}</td>
                                <td className="px-4 py-2">{value.template_name}</td>
                                <td className="px-4 py-2">{value.subject}</td>
                                <td className="px-4 py-2">{value.sender_email}</td>
                            </motion.tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-gray-500">
                                No Email Template found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <PaginationButton 
                currentPage={currentPage} 
                lastPage={lastPage}
                totalPages={totalPages}
                data={emailTemplates}
                fetchData={fetchData}
            />

            <EditAndDeleteModal 
                show={showEditAndDeleteModal} 
                data={selectedEmailTemplate} 
                onDelete={(data) => onDelete(data)} 
                onUpdate={(data) => onUpdate(data)} 
                onClose={() => setShowEditAndDeleteModal(false)} 
                rules={rules}
            />

            <ToastContainer />
        </div>
    );
}
