import { useState, useEffect } from "react";
import { FiUser, FiX, FiSave, FiTrash2, FiXCircle } from "react-icons/fi"; // Importing icons
import { toast } from "react-toastify";

import InputLabel from '@/Components/Input/InputLabel';
import TextInput from '@/Components/Input/TextInput';
import TextArea from '@/Components/Input/TextArea';
import MultiEmailInput from '@/Components/Input/MultiEmailInput';
import Modal from "@/Components/Modal/Modal";
import InputError from '@/Components/Input/InputError';
import DefaultUpdateConfirmModal from "@/Components/Modal/DefaultUpdateConfirmModal";
import DefaultDeleteConfirmModal from "@/Components/Modal/DefaultDeleteConfirmModal";
import { getValue, validateData, toCamelCase } from "@/CommonJsFunction/CommonJsFunction";

export default function EditAndDeleteModal({ show, data, onClose, onDelete, onUpdate, rules }) {

    const [formData, setFormData] = useState({ ...data });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (data) {
            setProcessing(false);
            setFormData({ ...data });
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDelete = async () => {
        setProcessing(true);
        onClose();
        setShowDeleteConfirm(false);
        const toastId = toast.loading("Processing..."); // Show progress toast

        setTimeout(async () => {
            try {
                await onDelete(data.id);
                toast.update(toastId, {
                    render: "Deleted Successfully!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            } catch (error) {
                toast.update(toastId, {
                    render: error.message || "Something went wrong!",
                    type: "error",
                    isLoading: false,
                    autoClose: 5000,
                });
            } finally {
                setProcessing(false);
            }
        }, 1000);
    };

    const handleUpdate = async () => {
        setProcessing(true);
        const errors = validateData(formData, rules);
        console.log(errors);
        
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            const toastId = toast.loading("Processing..."); // Show progress toast
            setShowUpdateConfirm(false);
            onClose();

            try {
                await onUpdate(formData);
                toast.update(toastId, {
                    render: "Updated Successfully!",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
            } catch (error) {
                toast.update(toastId, {
                    render: error.message || "Something went wrong!",
                    type: "error",
                    isLoading: false,
                    autoClose: 5000,
                });
            } finally {
                setProcessing(false);
            }
        }else {
            setProcessing(false);
            setShowUpdateConfirm(false);
        }
    };

    return (
        <>
            {/* onClose={onClose} */}
            <Modal show={show} maxWidth="4xl">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    {/* Header Section */}
                    <div className="border-b pb-3 mb-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <FiUser className="text-blue-500 text-xl" />
                                <h2 className="text-lg font-semibold text-gray-700">Edit</h2>
                            </div>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                                <FiX className="text-2xl" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500">Please make sure all fields are filled in correctly.</p>
                    </div>

                    {/* Form Inputs */}
                    <div className="flex flex-col space-y-6">
                        <div className="relative w-full">
                            <TextInput
                                type="text"
                                name="template_name"
                                id="template_name"
                                value={getValue(formData, 'template_name')}
                                onChange={handleChange}
                                required
                                isFocused
                                autoComplete="template_name"
                                className="peer w-full p-3 border rounded"
                            />
                            <InputLabel
                                htmlFor="template_name"
                                value={toCamelCase("template_name")}
                                className="absolute left-3 -top-3 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base"
                            />
                            <InputError message={errors.template_name} />
                        </div>

                        <div className="relative w-full">
                            <TextInput
                                type="text"
                                name="subject"
                                id="subject"
                                value={getValue(formData, 'subject')}
                                onChange={handleChange}
                                required
                                autoComplete="subject"
                                className="peer w-full p-3 border rounded"
                            />
                            <InputLabel
                                htmlFor="subject"
                                value={toCamelCase("subject")}
                                className="absolute left-3 -top-3 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base"
                            />
                            <InputError message={errors.subject} />
                        </div>

                        <div className="relative w-full">
                            <TextArea
                                name="body"
                                id="body"
                                value={getValue(formData, 'body')}
                                onChange={handleChange}
                                required
                                rows={6}
                                autoComplete="body"
                                className="peer w-full p-3 border rounded"
                            />
                            <InputLabel
                                htmlFor="body"
                                value={toCamelCase("body")}
                                className="absolute left-3 -top-3 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base"
                            />
                            <InputError message={errors.body} className="-mt-2" />
                        </div>

                        <div className="relative w-full">
                            <TextInput
                                type="text"
                                name="sender_email"
                                id="sender_email"
                                value={getValue(formData, 'sender_email')}
                                onChange={handleChange}
                                required
                                autoComplete="sender_email"
                                className="peer w-full p-3 border rounded"
                            />
                            <InputLabel
                                htmlFor="sender_email"
                                value={toCamelCase("sender_email")}
                                className="absolute left-3 -top-3 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base"
                            />
                            <InputError message={errors.sender_email} />
                        </div>

                        <div className="relative w-full">
                            <MultiEmailInput
                                value={
                                    Array.isArray(formData.cc)
                                        ? formData.cc
                                        : (formData.cc ? formData.cc.split(/[,\s]+/).map(s => s.trim()).filter(Boolean) : [])
                                }
                                onChange={(emails) => setFormData({ ...formData, cc: emails })}
                                className="w-full p-2 border rounded"
                            />
                            <InputLabel
                                htmlFor="cc"
                                value="Carbon Copy (cc)"
                                className="absolute left-3 -top-3 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base"
                            />
                            <InputError message={errors.cc} />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex justify-end space-x-2">
                        <button
                            className={`px-4 py-2 rounded flex items-center space-x-2 border ${processing
                                ? "text-gray-500 bg-blue-300 border-blue-400 opacity-50 cursor-not-allowed"
                                : "text-gray-900 bg-blue-300 border-blue-400 hover:bg-blue-600 hover:text-white"
                                }`}
                            onClick={() => setShowUpdateConfirm(true)}
                            disabled={processing}
                        >
                            <FiSave />
                            <span>Update</span>
                        </button>
                        <button
                            className={`px-4 py-2 rounded flex items-center space-x-2 border ${processing
                                ? "text-gray-500 bg-red-300 border-red-400 opacity-50 cursor-not-allowed"
                                : "text-gray-900 bg-red-300 border-red-400 hover:bg-red-600 hover:text-white"
                                }`}
                            onClick={() => setShowDeleteConfirm(true)}
                            disabled={processing}
                        >
                            <FiTrash2 />
                            <span>Delete</span>
                        </button>
                        <button
                            className={`px-4 py-2 rounded flex items-center space-x-2 border ${processing
                                ? "text-gray-500 bg-gray-300 border-gray-400 opacity-50 cursor-not-allowed"
                                : "text-gray-900 bg-gray-300 border-gray-400 hover:bg-gray-600 hover:text-white"
                                }`}
                            onClick={() => onClose()}
                            disabled={processing}
                        >
                            <FiXCircle />
                            <span>Cancel</span>
                        </button>
                    </div>

                </div>
            </Modal>

            {/* Delete Confirmation Modal */}
            <DefaultDeleteConfirmModal
                show={showDeleteConfirm}
                name={formData?.name}
                processing={processing}
                handleDelete={handleDelete}
                onClose={() => setShowDeleteConfirm(false)}
            />

            {/* Update Confirmation Modal */}
            <DefaultUpdateConfirmModal
                show={showUpdateConfirm}
                name={formData?.name}
                processing={processing}
                handleUpdate={handleUpdate}
                onClose={() => setShowUpdateConfirm(false)}
            />

        </>
    );
}
