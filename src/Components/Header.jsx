import { format } from 'date-fns';
import React from 'react';

const Header = () => {
    return (
        <div className='text-center space-y-4'>
            <h2 className='lg:text-4xl test-3xl font-bold  mt-3'>Savor Every Step — From Scratch to Served</h2>
            <p className=' text-amber-800'>Your ultimate digital kitchen companion. Discover, save, and share delicious moments.</p>
            <p className='font-semibold'>{format(new Date(), "EEEE, MMMM MM, yyyy")}</p>
        </div>
    );
};

export default Header;