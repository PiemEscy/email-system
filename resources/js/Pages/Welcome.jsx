import { Link, Head } from '@inertiajs/react';
import { useState } from 'react';
import ApplicationLogo from '@/Components/Image/ApplicationLogo';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Welcome({ auth, laravelVersion, phpVersion, appName }) {

    const [isLoading, setIsLoading] = useState(false);

    const handleLoginClick = () => {
        setIsLoading(true);
        // You can add a timeout to wait for the animation before routing
        setTimeout(() => {
            window.location.href = route('login');
        }, 500); // Delay to allow animation to finish
    };

    return (
        <GuestLayout>
            <Head title="Welcome" />


            {/* Main Content Area */}
            <div className="flex flex-col justify-center items-center space-y-6 text-center">
                <h1 className="text-4xl text-gray-700 sm:text-4xl">
                    Welcome to {appName}
                </h1>

                <p className="text-lg text-gray-700 opacity-80">
                    A simple, powerful way to manage your business. Explore the features of the app and get started today.
                </p>

                {/* Display version info for the Laravel app */}
                <p className="text-sm text-gray-700 opacity-60">
                    Laravel Version: {laravelVersion} | PHP Version: {phpVersion}
                </p>

                <div className="mt-6">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="inline-block px-6 py-2 text-white bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                onClick={handleLoginClick}
                                className="inline-block px-6 py-2 text-white bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md mr-4"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="inline-block px-6 py-2 text-white bg-gray-800 hover:bg-gray-700 rounded-lg shadow-md"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>

        </GuestLayout>

    );
}

