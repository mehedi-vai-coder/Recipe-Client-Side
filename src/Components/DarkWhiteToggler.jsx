// src/components/DarkWhiteToggler.jsx

import { useDarkMode } from '../Context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const DarkWhiteToggler = () => {
    const { darkMode, setDarkMode } = useDarkMode();

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative w-17 h-8 rounded-full transition duration-300 bg-gray-300 dark:bg-gray-700 p-1 flex items-center"
        >
            <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white dark:bg-black transform transition-transform duration-300 ${darkMode ? 'translate-x-8' : ''
                    }`}
            ></div>

            <div className="flex justify-between w-full px-2 z-10 text-yellow-500 dark:text-blue-300">
                <Sun size={18} />
                <Moon size={18} />
            </div>
        </button>
    );
};

export default DarkWhiteToggler;
