import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import Slider from "../Slider/Slider";
import SubscribeBanner from "./SubscribeBanner";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";

const TopRecipes = () => {
    const [topRecipes, setTopRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTop = async () => {
            try {
                const res = await axios.get("https://recipe-server-side-five.vercel.app/top-recipes");
                setTopRecipes(res.data);
            } catch (error) {
                console.error("Failed to load top recipes", error);
            }
        };
        fetchTop();
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
            {/* Hero Slider */}
            <section>
                <Slider />
            </section>

            {/* Top Recipes */}
            <section className="py-16 px-4 sm:px-8 md:px-16">
                <motion.h2
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-3xl md:text-4xl font-extrabold text-center text-indigo-700 dark:text-indigo-400 mb-10"
                >
                    🔥 Top 6 Most Liked Recipes
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {topRecipes.map((recipe, index) => (
                        <motion.div
                            key={recipe._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-white/5 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden hover:scale-[1.03] hover:shadow-indigo-400/30 transition-all duration-300"
                        >
                            <img
                                src={recipe.image || "https://via.placeholder.com/300x200?text=No+Image"}
                                alt={recipe.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-5 space-y-2">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{recipe.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">🌍 {recipe.cuisine}</p>
                                <p className="text-sm text-red-500 flex items-center gap-1">
                                    <FaHeart className="animate-pulse" /> {recipe.likeCount} likes
                                </p>
                                <Link
                                    to={`/specificrecipedetails/${recipe._id}`}
                                    className="inline-block mt-2 text-indigo-600 dark:text-indigo-300 hover:underline font-medium"
                                >
                                    View Details →
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Button */}
                <motion.div
                    className="text-center mt-14"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <button
                        onClick={() => navigate("/allrecipe")}
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-md hover:scale-105 transition-transform duration-300"
                    >
                        See All Recipes
                    </button>
                </motion.div>
            </section>

            {/* Newsletter / CTA */}
            <section>
                <SubscribeBanner />
            </section>
        </div>
    );
};

export default TopRecipes;
