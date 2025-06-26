import React from 'react';
import { Outlet } from 'react-router';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const HomeLayout = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 font-sans">
            {/* Header Section */}
            <header className="border-b border-gray-200 dark:border-gray-800">
                <Header />
                <Navbar />
            </header>

            {/* Main Content Section */}
            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Optional Sidebar layout */}
                {/* <aside className="hidden lg:block w-1/4"> Left Nav Here </aside> */}

                <section className="w-full">
                    <Outlet />
                </section>
            </main>

            {/* Footer Section */}
            <footer className="border-t border-gray-200 dark:border-gray-800 mt-10 py-8 px-4 sm:px-6 lg:px-8">
                <Footer />
            </footer>
        </div>
    );
};

export default HomeLayout;
