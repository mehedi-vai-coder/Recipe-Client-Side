import { format } from 'date-fns';
import React from 'react';
import { Typewriter } from 'react-simple-typewriter'
const Header = () => {
    return (
        <div className='text-center space-y-4 
        text-black dark:text-white  bg-white dark:bg-black
            <Typewriter
         ' style={{ paddingTop: '1rem', fontSize: '2rem', margin: 'auto 0', fontWeight: 'bold' }}>
          
                <Typewriter
                    words={['Savor Every Step — From Scratch to Served.']}
                    loop={10}
                    cursor
                    cursorStyle='_'
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                />

                <p className='text-xl text-amber-800'>Your ultimate digital kitchen companion. Discover, save, and share delicious moments.</p>
                <p className='font-semibold'>{format(new Date(), "EEEE, MMMM MM, yyyy")}</p>


        </div>
    );
};

export default Header;