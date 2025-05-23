import { useContext } from "react";

import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "../Provider/ThemeProvider";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-4 right-4 p-2 bg-gray-200 dark:bg-gray-800 rounded-full shadow z-50"
        >
            {theme === "dark" ? <FaSun className="text-yellow-400" /> : <FaMoon />}
        </button>
    );
};

export default ThemeToggle;
