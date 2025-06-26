import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';

import slide1 from '../assets/BIR-recipe-book-spreads.jpg';
import slide2 from '../assets/76c1cc119666285.60a3d5c3a5081.jpg';
import slide3 from '../assets/AM-Natural-Living-My-Recipe-Book-For-Own-Recipes-Top-Down-View-With-Photo-1.jpg';
import slide4 from '../assets/fea9c0119666285.60a2b5b9ebea0.jpg';

const Slider = () => {
    return (
        <section className="px-4 py-10 lg:p-10 rounded-3xl bg-white dark:bg-gray-950 transition-colors duration-300">
            <div className="max-w-6xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white border-b-2 inline-block pb-2 border-primary">
                    Recipe Book Showcase
                </h2>

                <Swiper
                    spaceBetween={30}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    loop={true}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    effect="coverflow"
                    coverflowEffect={{
                        rotate: 30,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    modules={[Autoplay, Pagination, EffectCoverflow]}
                    className="w-full"
                >
                    {[slide1, slide2, slide3, slide4, slide1, slide2, slide3, slide4].map((slide, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="flex justify-center">
                                <img
                                    src={slide}
                                    alt={`Slide ${idx + 1}`}
                                    className="rounded-2xl w-full max-w-[400px] shadow-xl hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Slider;