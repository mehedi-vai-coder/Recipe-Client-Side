import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router";

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const user = JSON.parse(localStorage.getItem("user")); // {_id, name}

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/recipies/${id}`);
                setRecipe(res.data);
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleLike = async () => {
        if (!recipe || recipe.addedBy === user?._id) {
            toast.warning("You can't like your own recipe!");
            return;
        }

        try {
            await axios.patch(`http://localhost:3000/recipies/${id}/like`);
            setRecipe((prev) => ({
                ...prev,
                likeCount: prev.likeCount + 1,
            }));
            toast.success("Thanks for your interest!");
        } catch (error) {
            toast.error("Failed to like the recipe!");
            console.log(error)
        }
    };

    if (!recipe) return <div className="text-center py-20 text-xl">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white mt-10 rounded-xl shadow-xl">
            <h2 className="text-lg text-gray-500 mb-4">
                ❤️ {recipe.likeCount} people interested in this recipe
            </h2>

            <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-80 object-cover rounded-xl mb-6"
            />

            <div className="space-y-4">
                <h2 className="text-3xl font-bold text-indigo-600">{recipe.title}</h2>
                <p className="text-gray-600">⏱️ {recipe.preparationTime} mins</p>
                <p className="text-gray-600">🌍 Cuisine: {recipe.cuisineType}</p>

                <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">🧾 Ingredients:</h3>
                    <p className="text-gray-700">{recipe.ingredients}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">👩‍🍳 Instructions:</h3>
                    <p className="text-gray-700">{recipe.instructions}</p>
                </div>

                <button
                    onClick={handleLike}
                    disabled={recipe.addedBy === user?._id}
                    className={`mt-4 px-4 py-2 rounded-lg flex items-center gap-2 text-white ${recipe.addedBy === user?._id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-pink-600 hover:bg-pink-700"
                        }`}
                >
                    <FaHeart />
                    Like ({recipe.likeCount})
                </button>
            </div>
        </div>
    );
};

export default RecipeDetails;
