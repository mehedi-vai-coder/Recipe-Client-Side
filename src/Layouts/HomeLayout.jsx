import React from 'react';
import Header from '../Components/Header';
import { Outlet } from 'react-router';
import Slider from '../Slider/Slider';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const HomeLayout = () => {
    return (
        <div className='px-30 mx-auto  text-black dark:text-white  bg-white dark:bg-black'>
            <header>
                <Header></Header>
            </header>
            <nav>
                <Navbar></Navbar>
            </nav>
            <main>
                <section className='left_nav'>

                </section>
                <section className='main'>
                    <Outlet></Outlet>
                </section>
            </main>
            <footer className='mt-20'>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default HomeLayout;