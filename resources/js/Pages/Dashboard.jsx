import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Cards from '@/Components/DivCard/Card';
import { FaUsers, FaDollarSign, FaShoppingCart, FaChartLine, FaTasks, FaStar } from 'react-icons/fa';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={"Dashboard"}
        >
            <Head title="Dashboard" />

            
        </AuthenticatedLayout>
    );
}
