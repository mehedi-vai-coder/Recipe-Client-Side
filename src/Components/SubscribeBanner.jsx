import React from "react";
import { motion } from "framer-motion";

const SubscribeBanner = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="py-16 px-6 md:px-16 rounded-3xl mt-20 mb-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900 shadow-2xl text-white"
        >
            <div className="max-w-4xl mx-auto text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                    💌 Subscribe to Get Delicious Recipes
                </h2>
                <p className="text-sm md:text-base text-white/90 max-w-xl mx-auto">
                    Join 10,000+ food lovers and get weekly updates, cooking tips, and tasty inspirations right in your inbox!
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto mt-6">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-5 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/40 shadow-md"
                    />
                    <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition shadow-md hover:scale-105">
                        Subscribe
                    </button>
                </div>
            </div>
        </motion.section>
    );
};

export default SubscribeBanner;
