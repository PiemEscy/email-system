import Modal from '@/Components/Modal/Modal';
import { FiSave, FiXCircle } from "react-icons/fi";

export default function DefaultUpdateConfirmModal({ show = false, maxWidth = '2xl', name, processing, handleUpdate, onClose = () => { } }) {

    return (
        <Modal show={show} maxWidth={maxWidth}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {/* Header Section */}
                <div className="border-b pb-3 mb-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <FiSave className="text-blue-500 text-xl" />
                            <h2 className="text-lg font-semibold text-gray-700">Update Confirmation</h2>
                        </div>
                    </div>
                </div>
                <p>Are you sure you want to Update <strong>{name}</strong>?</p>

                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        className={`px-4 py-2 rounded flex items-center space-x-2 border ${processing
                            ? "text-gray-500 bg-blue-300 border-blue-400 opacity-50 cursor-not-allowed"
                            : "text-gray-900 bg-blue-300 border-blue-400 hover:bg-blue-600 hover:text-white"
                            }`}
                        onClick={handleUpdate}
                        disabled={processing}
                    >
                        <FiSave />
                        <span>{(processing) ? 'Updating... ' : 'Yes, Update'}</span>
                    </button>
                    <button
                        className={`px-4 py-2 rounded flex items-center space-x-2 border ${processing
                            ? "text-gray-500 bg-gray-300 border-gray-400 opacity-50 cursor-not-allowed"
                            : "text-gray-900 bg-gray-300 border-gray-400 hover:bg-gray-600 hover:text-white"
                            }`}
                        onClick={onClose}
                        disabled={processing}
                    >
                        <FiXCircle />
                        <span>Cancel</span>
                    </button>
                </div>
            </div>
        </Modal>
    );
}
