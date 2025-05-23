import React from "react";

const SubscribeBanner = () => {
    return (
        <section className="bg-indigo-600 text-white py-12 px-6 md:px-16 rounded-2xl shadow-xl mt-16 mb-10">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    💌 Subscribe to Get Delicious Recipes
                </h2>
                <p className="mb-6 text-white/90 text-sm md:text-base">
                    Join 10,000+ food lovers and get weekly updates, cooking tips, and new recipes directly to your inbox!
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 rounded-full text-gray-800 focus:outline-none"
                    />
                    <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SubscribeBanner;
