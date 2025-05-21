import React from 'react';
import Slider from '../Slider/Slider';
import { useLoaderData } from 'react-router';

const Home = () => {

    const recipies = useLoaderData();
    console.log(recipies);
    
    return (
        <div>
            <section>
                 <Slider></Slider>
            </section>
        </div>
    );
};

export default Home;