import Modal from "@/Components/Modal/Modal";
import { FiUser, FiX } from "react-icons/fi";

export default function PreviewEmailModal({ show, onClose, data }) {
    const firstLetter = data.sender_email ? data.sender_email.charAt(0).toUpperCase() : "U";

    const colors = ["bg-blue-500", "bg-green-500", "bg-red-500", "bg-yellow-500", "bg-purple-500"];
    const colorClass = colors[data.sender_email ? data.sender_email.charCodeAt(0) % colors.length : 0];

    return (
        <Modal show={show} maxWidth="4xl">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {/* Header Section */}
                <div className="border-b pb-3 mb-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <FiUser className="text-blue-500 text-xl" />
                            <h2 className="text-lg font-semibold text-gray-700">Preivew Email</h2>
                        </div>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <FiX className="text-2xl" />
                        </button>
                    </div>
                </div>

                {/* Preview Section */}
                <div>
                    {/* Template Name */}
                    <div className="px-4 py-2 bg-gray-50 border-b">
                        <p className="text-sm text-gray-600">Template: {data.template_name}</p>
                    </div>

                    {/* Subject */}
                    <div className="px-6 py-4 border-b">
                        <h1 className="text-2xl font-bold text-gray-900">{data.subject}</h1>
                    </div>

                    {/* Sender Info */}
                    <div className="flex items-center px-6 py-3 border-b space-x-3">
                        <div className={`h-10 w-10 flex items-center justify-center rounded-full text-white font-bold ${colorClass}`}>
                            {firstLetter}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-800">{data.sender_email}</p>
                            {Array.isArray(data.cc) && data.cc.length > 0 && (
                                <p className="text-xs text-gray-500">Cc: {data.cc.join(", ")}</p>
                            )}
                        </div>
                    </div>

                    {/* Email Body */}
                    <div className="px-6 py-6 text-gray-800 text-sm leading-relaxed">
                        <div
                            dangerouslySetInnerHTML={{ __html: data.body }}
                            className="prose max-w-none"
                        />
                    </div>

                    {/* Footer with buttons */}
                    <div className="px-6 py-4 border-t bg-gray-50 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                        <div className="text-xs text-gray-500">
                            This is a preview of the email content.
                        </div>
                        <div className="flex space-x-3">
                            <button className="text-sm text-blue-500 hover:underline">Reply</button>
                            <button className="text-sm text-blue-500 hover:underline">Reply All</button>
                            <button className="text-sm text-blue-500 hover:underline">Forward</button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
