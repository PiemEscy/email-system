import ApplicationDarkLogo from '@/Components/Image/ApplicationDarkLogo';

export default function Guest({ children }) {
    return (
        <div className="relative w-full h-screen bg-gray-100 font-poppins overflow-hidden">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30 z-0" />

            {/* Main Container */}
            <div className="relative z-10 w-full h-full grid grid-cols-1 md:grid-cols-2 bg-white bg-opacity-90 shadow-2xl transition-all duration-300">

                {/* Left Image Section */}
                <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-theme-color via-theme-color/80 to-gray-700 p-6">
                    <ApplicationDarkLogo className="w-full max-w-xs object-contain animate-fade-in" />
                </div>

                {/* Right Content Section */}
                <div className="flex items-center justify-center p-8">
                    <div className="w-full max-w-xl">
                        {children}
                    </div>
                </div>

            </div>
        </div>
    );
}
