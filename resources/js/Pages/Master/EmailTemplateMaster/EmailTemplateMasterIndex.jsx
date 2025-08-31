import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Table from './Partials/Table';
import { Head } from '@inertiajs/react';
import Card from "@/Components/DivCard/Card";
import { FiUser } from "react-icons/fi";
import { motion } from "framer-motion";

export default function EmailTemplateMasterIndex({ auth, status, windowTitle, windowType }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            windowLogo={<FiUser className="text-blue-500 text-xl" />}
            header={windowTitle}
            windowType={windowType}
        >
            <Head title={windowTitle} />
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
                <Card>
                    <Table />
                </Card>
            </motion.div>


        </AuthenticatedLayout>
    );
}
