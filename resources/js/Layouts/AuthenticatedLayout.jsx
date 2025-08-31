import { useState, useEffect } from 'react';
import ApplicationDarkLogo from '@/Components/Image/ApplicationDarkLogo';
import ApplicationLogo from '@/Components/Image/ApplicationLogo';
import ResponsiveNavLink from '@/Components/NavLink/ResponsiveNavLink';
import LinkButton from '@/Components/Button/LinkButton';
import { Link, useForm } from '@inertiajs/react';
import { FaBars, FaTimes, FaHome, FaUser, FaMailBulk, FaCheckCircle, FaBoxes, FaSignOutAlt } from 'react-icons/fa';
import Modal from '@/Components/Modal/Modal';
import { usePage } from '@inertiajs/react';
import HeaderTitle from '@/Components/Title/HeaderTitle';
import { FiUser } from "react-icons/fi";


export default function Authenticated({ user, windowLogo, header, headerDescription, windowType, children, ...props }) {
    const { url } = usePage();
    const [showingSidebar, setShowingSidebar] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const { post } = useForm();

    const handleLogout = () => {
        post(route('logout'));
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setShowingSidebar(false);
            } else {
                setShowingSidebar(true);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []); // set [] to run once

    return (
        <div className="flex h-screen bg-gray-100" {...props}>
            {/* Sidebar */}
            <div className={`sidebar ${showingSidebar ? 'z-20' : 'z-10'} fixed top-0 left-0 h-full bg-gray-900 text-white shadow-lg flex flex-col transition-all duration-300 ${showingSidebar ? 'w-80' : 'hidden'} md:w-80 overflow-hidden md:relative`}>
                {/* Logo */}
                <div className="flex items-center justify-center py-4 mb-1 bg-gray-900 rounded-r-lg">
                    <Link href="/">
                        <ApplicationDarkLogo className="w-40 h-40 object-contain border rounded-full" />
                    </Link>
                </div>

                {/* Sidebar Links (Scrollable) */}
                <div className="flex-1 overflow-y-auto px-1 py-6 border-t border-gray-700 sidebar-scrollbar">
                    <nav className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-400">Main</h3>
                            <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                                <FaHome className="inline-block mr-2" />
                                Dashboard
                            </ResponsiveNavLink>
                        </div>
                        {/* Transactions */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-400">Transactions</h3>
                            <ResponsiveNavLink>
                                <FaMailBulk className="inline-block mr-2" />
                                Bulk Email
                            </ResponsiveNavLink>
                        </div>

                        {/* Reports */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-400">Reports</h3>
                            <ResponsiveNavLink>
                                <FaCheckCircle className="inline-block mr-2" />
                                Email Status Report
                            </ResponsiveNavLink>
                        </div>

                        {/* Master */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-400">Master</h3>
                            <ResponsiveNavLink href={route('master.email.template.index')}>
                                <FaBoxes className="inline-block mr-2" />
                                Email Template
                            </ResponsiveNavLink>
                        </div>
                    </nav>
                </div>

                {/* User Info */}
                <div className="shrink-0 p-4 border-t border-gray-700 bg-gray-900">
                    <div className="text-lg font-bold">{user.name}</div>
                    <div className="text-sm text-gray-400 mb-2">{user.email}</div>
                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route('profile.edit')} active={route().current('profile.edit')}>
                            <FaUser className="inline-block mr-2" />
                            Profile
                        </ResponsiveNavLink>
                        <LinkButton
                            onClick={() => setShowLogoutModal(true)}
                        >
                            <FaSignOutAlt className="inline-block mr-2" />
                            Log Out
                        </LinkButton>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-screen bg-gray-200">

                {/* Navbar */}
                <header className={`flex items-center justify-between md:hidden transition-all duration-300 ${showingSidebar ? 'ml-80' : 'ml-0'}`}>
                    <button onClick={() => setShowingSidebar(!showingSidebar)} className="p-1 bg-gray-900 text-gray-200 border border-gray-900 focus:outline-none">
                        {showingSidebar ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </header>

                {/* Page Header */}
                {header && (
                    <HeaderTitle
                        user={user}
                        windowLogo={windowLogo}
                        windowType={windowType}
                        header={header}
                        headerDescription={headerDescription}
                    />

                )}

                {/* Scrollable Main Content */}
                <main className={`{sidebar ${showingSidebar ? 'z-10' : 'z-20'} max-w-[95vw] sm:max-w-1xl md:max-w-xl lg:max-w-full xl:max-w-full p-1 m-2 flex-1 overflow-y-auto rounded-lg`}>
                    {children}
                </main>


                {/* Footer */}
                <footer className="p-1 m-2 rounded-lg">
                    <div className="max-w-7xl mx-auto text-center text-gray-700">
                        <p>&copy; {new Date().getFullYear()} Email Management System. All rights reserved.</p>
                    </div>
                </footer>
            </div>

            {/* Logout Confirmation Modal */}
            <Modal
                show={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                maxWidth="sm" // Set the max width of the modal
            >
                <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Are you sure you want to log out?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        You are about to log out your account {user.name}. Are you sure you want to continue?
                    </p>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => setShowLogoutModal(false)}
                            className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                        >
                            Yes, Log Out
                        </button>
                    </div>
                </div>
            </Modal>

        </div>



    );
}
