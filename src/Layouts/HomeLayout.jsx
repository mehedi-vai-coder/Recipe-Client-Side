import React from 'react';
import Header from '../Components/Header';
import { Outlet } from 'react-router';
import Slider from '../Slider/Slider';

const HomeLayout = () => {
    return (
        <div className='w-11/12 mx-auto'>
            <header>
                <Header></Header>
                <Slider></Slider>
            </header>
            <main>
                <section className='left_nav'>

                </section>
                <section className='main'>
                  <Outlet></Outlet>
                </section>
            </main>
        </div>
    );
};

export default HomeLayout;