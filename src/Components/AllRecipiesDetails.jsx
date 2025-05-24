import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router";

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
            const res = await axios.get(`http://localhost:3000/recipes/${id}`);
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
            const res = await axios.patch(`http://localhost:3000/recipes/${id}/like`);
           
            setRecipe(res.data); 
        } catch (err) {
            console.error("Failed to like recipe", err);
            setLiked(false); 

           
            setRecipe((prev) => ({
                ...prev,
                likeCount: (prev?.likeCount || 1) + 1,
            }));
        }
    };


    if (loading) return <p className="p-6">Loading...</p>;
    if (error) return <p className="p-6 text-red-600">{error}</p>;
    if (!recipe) return <p className="p-6">Recipe not found.</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-black text-black dark:text-white rounded-lg shadow-md">
            <img
                src={recipe.image || "https://via.placeholder.com/600x400"}
                alt={recipe.title || "Recipe Image"}
                className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-3xl font-bold mb-2">{recipe.title || "Untitled Recipe"}</h2>
            <p><b>Cuisine:</b> {recipe.cuisineType || "Unknown"}</p>
            <p><b>Description:</b> {recipe.categories || "N/A"}</p>
            <p><b>Ingredients:</b> {recipe.ingredients || "N/A"}</p>
            <p><b>Cook Time:</b> {recipe.prepTime || "N/A"}</p>
            <p><b>Instructions:</b> {recipe.instructions || "N/A"}</p>
            <p className="mt-2 text-lg font-semibold text-pink-600">
                ❤️ {recipe.likeCount || 0} Likes
            </p>

            <button
                onClick={handleLike}
                disabled={liked}
                className={`mt-4 px-6 py-2 rounded-lg font-bold text-white transition ${liked ? "bg-red-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
            >
                {liked ? "Liked ❤️" : "Like ❤️"}
            </button>
        </div>
    );
};

export default RecipeDetails;
