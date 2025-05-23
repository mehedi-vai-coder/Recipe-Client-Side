import React, { useEffect, useState } from "react";

import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Slider from "../Slider/Slider";
import SubscribeBanner from "./SubscribeBanner";

const TopRecipes = () => {
    const [topRecipes, setTopRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTop = async () => {
            try {
                const res = await axios.get("http://localhost:3000/recipies");
                setTopRecipes(res.data);
            } catch (error) {
                console.error("Failed to load top recipes", error);
            }
        };

        fetchTop();
    }, []);

    return (
        <div>
            <section className="bg-gray-50 py-12 px-6 md:px-16 all_recipe">
                <h2 className="text-3xl font-bold text-center text-indigo-700 mb-10">🔥 Top Recipes</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {topRecipes.map((recipe) => (
                        <div key={recipe._id} className="bg-white shadow-lg rounded-xl overflow-hidden">
                            <img
                                src={recipe.image || "https://via.placeholder.com/300x200"}
                                alt={recipe.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800">{recipe.title}</h3>
                                <p className="text-sm text-gray-500 mb-1">🌍 {recipe.cuisineType}</p>
                                <p className="text-sm text-pink-600 mb-2 flex items-center gap-1">
                                    <FaHeart className="text-red-500" /> {recipe.likeCount} likes
                                </p>
                                <Link
                                    to={`/specificrecipedetails/${recipe._id}`}
                                    // to={`/recipes/${recipe._id}`}
                                    className="inline-block mt-2 text-indigo-600 hover:text-indigo-800 font-medium"
                                >
                                    View Details →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <button
                        onClick={() => navigate("/allrecipe")}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
                    >
                        See All Recipes
                    </button>
                </div>

            </section>
            <section>
                <Slider></Slider>
            </section>
            <section>
                <SubscribeBanner></SubscribeBanner>
            </section>
        </div>
    );
};

export default TopRecipes;
