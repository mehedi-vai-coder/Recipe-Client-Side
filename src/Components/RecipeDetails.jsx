import React from "react";
import { Link, useLoaderData } from "react-router-dom";

const RecipeDetails = () => {
    const data = useLoaderData();
    const { image, title, cuisineType, instructions, ingredients, _id } = data;

    return (
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg mt-12 mb-16 overflow-hidden">
            <div className="flex flex-col md:flex-row">
                {/* Image Section */}
                <figure className="md:w-1/2 w-full h-64 md:h-auto overflow-hidden">
                    <img
                        src={image || "https://via.placeholder.com/600x400?text=No+Image"}
                        alt={title}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                    />
                </figure>

                {/* Content Section */}
                <div className="md:w-1/2 p-8 flex flex-col justify-between text-gray-900 dark:text-white">
                    <div>
                        <h1 className="text-4xl font-extrabold mb-4">{title}</h1>
                        <p className="text-lg leading-relaxed mb-6 whitespace-pre-line">{instructions}</p>

                        <div className="mb-4">
                            <h3 className="text-2xl font-semibold mb-1">Cuisine Type:</h3>
                            <p className="text-indigo-600 text-lg">{cuisineType || "N/A"}</p>
                        </div>

                        <div>
                            <h3 className="text-2xl font-semibold mb-1">Ingredients:</h3>
                            <p className="text-gray-700 dark:text-gray-300">{ingredients || "N/A"}</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Link to="/myrecipe">
                            <button className="btn btn-success px-6 py-3 rounded-lg hover:brightness-110 transition">
                                ← Back to All My Recipes
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;
