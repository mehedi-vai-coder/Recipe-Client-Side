import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import slide1 from '../assets/BIR-recipe-book-spreads.jpg'
import slide2 from '../assets/76c1cc119666285.60a3d5c3a5081.jpg'
import slide3 from '../assets/AM-Natural-Living-My-Recipe-Book-For-Own-Recipes-Top-Down-View-With-Photo-1.jpg'
import slide4 from '../assets/fea9c0119666285.60a2b5b9ebea0.jpg'


const Slider = () => {
    return (
        <div className='lg:p-5  rounded-3xl text-center mt-5 border bg-white dark:bg-gray-900  '>
            <h1 className='text-3xl font-semibold   mb-5 border-b-2 pb-2'>Recipe Book</h1>
            <Swiper
                spaceBetween={30}
                slidesPerView={3}
                pagination={{
                    clickable: true,
                }}
                modules={[Navigation,Autoplay]}
                loop={true}
                autoplay={{delay:2000}}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className='flex justify-center'>
                        <img src={slide1} alt="" />
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex justify-center'>
                        <img src={slide2} alt="" />
                    </div></SwiperSlide>
                <SwiperSlide>
                    <div className='flex justify-center'>
                        <img src={slide3} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex justify-center'>
                        <img src={slide4} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex justify-center'>
                        <img src={slide1} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex justify-center'>
                        <img src={slide4} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex justify-center'>
                        <img src={slide3} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex justify-center'>
                        <img src={slide4} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='flex justify-center'>
                        <img src={slide2} alt="" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;