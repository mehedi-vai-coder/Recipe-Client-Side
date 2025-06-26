import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [error, setError] = useState(null);

    // Stable fetch function (fixes useEffect dependency warning)
    const fetchRecipe = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `https://recipe-server-side-five.vercel.app/recipes/${id}`
            );
            setRecipe(res.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch recipe.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchRecipe();
    }, [fetchRecipe]);

    const handleLike = async () => {
        if (liked || !recipe) return;

        setLiked(true);
        try {
            const res = await axios.patch(
                `https://recipe-server-side-five.vercel.app/recipes/${id}/like`
            );
            setRecipe(res.data);
        } catch (err) {
            console.error("Failed to like recipe", err);
            setLiked(false);

            // Optimistic UI update fallback
            setRecipe((prev) => ({
                ...prev,
                likeCount: (prev?.likeCount || 0) + 1,
            }));
        }
    };

    if (loading)
        return (
            <p className="p-6 text-center text-gray-500 dark:text-gray-400 animate-pulse">
                Loading...
            </p>
        );
    if (error)
        return (
            <p className="p-6 text-center text-red-600 dark:text-red-400 font-semibold">
                {error}
            </p>
        );
    if (!recipe)
        return (
            <p className="p-6 text-center text-gray-500 dark:text-gray-400">
                Recipe not found.
            </p>
        );

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-md transition-opacity duration-700 ease-in opacity-100">
            <img
                src={recipe.image || "https://via.placeholder.com/600x400"}
                alt={recipe.title || "Recipe Image"}
                className="w-full h-64 object-cover rounded-lg mb-6 shadow-md hover:scale-105 transition-transform duration-500 ease-in-out"
                loading="lazy"
            />
            <h2 className="text-3xl font-extrabold mb-3 tracking-wide">{recipe.title || "Untitled Recipe"}</h2>

            <div className="space-y-3 text-lg leading-relaxed">
                <p>
                    <span className="font-semibold">Cuisine:</span> {recipe.cuisineType || "Unknown"}
                </p>
                <p>
                    <span className="font-semibold">Categories:</span>{" "}
                    {Array.isArray(recipe.categories) ? recipe.categories.join(", ") : recipe.categories || "N/A"}
                </p>
                <p>
                    <span className="font-semibold">Ingredients:</span> {recipe.ingredients || "N/A"}
                </p>
                <p>
                    <span className="font-semibold">Cook Time:</span> {recipe.prepTime ? `${recipe.prepTime} mins` : "N/A"}
                </p>
                <p>
                    <span className="font-semibold">Instructions:</span>
                    <br />
                    <span className="whitespace-pre-line">{recipe.instructions || "N/A"}</span>
                </p>
            </div>

            <p className="mt-6 text-xl font-semibold text-pink-600 flex items-center gap-2 select-none">
                <span>❤️</span> {recipe.likeCount || 0} Likes
            </p>

            <button
                onClick={handleLike}
                disabled={liked}
                className={`mt-6 w-full md:w-auto px-8 py-3 rounded-lg font-semibold text-white transition-shadow duration-300 ${liked
                        ? "bg-red-500 cursor-not-allowed shadow-inner"
                        : "bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl"
                    }`}
                aria-label={liked ? "Already liked" : "Like this recipe"}
            >
                {liked ? "Liked ❤️" : "Like ❤️"}
            </button>
        </div>
    );
};

export default RecipeDetails;
