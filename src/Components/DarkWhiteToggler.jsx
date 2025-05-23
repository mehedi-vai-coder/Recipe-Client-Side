import React from 'react';
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useDarkMode } from '../Context/ThemeContext';

const DarkWhiteToggler = () => {
    const {darkMode, setDarkMode} = useDarkMode()
    return (
        <div>
           <button onClick={() => setDarkMode(!darkMode)} className='cursor-pointer'>
            {darkMode ? <MdDarkMode size={30} />: <CiLight size={30} />}
           </button>
        </div>
    );
};

export default DarkWhiteToggler;