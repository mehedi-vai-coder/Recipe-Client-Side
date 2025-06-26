import { format } from 'date-fns';
import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const Header = () => {
    return (
        <header className="bg-white text-gray-900 dark:bg-gray-950 dark:text-white transition-colors duration-300 py-16">
            <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
                {/* Main Typewriter Title */}
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                    <Typewriter
                        words={['Savor Every Step — From Scratch to Served.']}
                        loop={0}
                        cursor
                        cursorStyle="|"
                        typeSpeed={80}
                        deleteSpeed={50}
                        delaySpeed={2000}
                    />
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-amber-600 dark:text-amber-400">
                    Your ultimate digital kitchen companion. Discover, save, and share delicious moments.
                </p>

                {/* Date */}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {format(new Date(), 'EEEE, MMMM d, yyyy')}
                </p>
            </div>
        </header>
    );
};

export default Header;
